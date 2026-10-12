/* S.C.A.L.E. Academy client: enrollment, progress, exercises, AI tutor (text + voice), read-aloud, certificate. */
(function () {
  'use strict';
  var KEY = 'scale_academy_v1';
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
  var S = load(); S.done = S.done || {}; S.notes = S.notes || {};
  var $ = function (q, r) { return (r || document).querySelector(q); };
  var $$ = function (q, r) { return [].slice.call((r || document).querySelectorAll(q)); };
  var page = document.body.getAttribute('data-academy') || '';
  var week = parseInt(document.body.getAttribute('data-week') || '0', 10);

  function api(payload) {
    return fetch('/api/academy', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json(); })
      .catch(function () { return { error: 'Network problem. Please check your connection and try again.' }; });
  }
  function track(name, params) { try { if (typeof gtag === 'function') gtag('event', name, params || {}); } catch (e) {} }

  // ---------------------------------------------------------------- progress
  function renderProgress() {
    $$('[data-week-link]').forEach(function (a) {
      var n = a.getAttribute('data-week-link');
      a.classList.toggle('is-done', !!S.done[n]);
      a.classList.toggle('is-here', String(week) === n);
    });
    var count = Object.keys(S.done).filter(function (k) { return S.done[k]; }).length;
    $$('[data-progress-count]').forEach(function (el) { el.textContent = count; });
    $$('[data-progress-bar]').forEach(function (el) { el.style.width = (count / 6 * 100) + '%'; });
    var btn = $('#complete-btn');
    if (btn) { btn.textContent = S.done[week] ? 'Week ' + week + ' complete ✓' : 'Mark week ' + week + ' complete'; btn.classList.toggle('is-done', !!S.done[week]); }
    var cert = $('#cert-box');
    if (cert) {
      var all = [1, 2, 3, 4, 5, 6].every(function (n) { return S.done[n]; });
      cert.hidden = !all; var lock = $('#cert-locked'); if (lock) lock.hidden = all;
      if (S.cert) { var link = $('#cert-link'); if (link) { link.href = S.cert; link.hidden = false; } }
    }
    $$('[data-cta-start]').forEach(function (a) {
      if (!S.email) return;
      var next = 1; for (var i = 1; i <= 6; i++) { if (!S.done[i]) { next = i; break; } if (i === 6) next = 6; }
      a.href = '/academy/week-' + next; a.textContent = count ? 'Continue with week ' + next + ' →' : 'Start week 1 →';
    });
  }

  // ---------------------------------------------------------------- enrollment
  function enrolled() { return !!S.email; }
  $$('form[data-enroll]').forEach(function (f) {
    if (enrolled() && f.hasAttribute('data-hide-when-enrolled')) { f.hidden = true; var w = $('[data-enrolled-msg]'); if (w) w.hidden = false; }
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = (f.email.value || '').trim(), name = (f.name ? f.name.value : '').trim(), biz = (f.business ? f.business.value : '').trim();
      var msg = $('.form-msg', f), btn = $('button', f);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { msg.textContent = 'Please enter a valid email address.'; return; }
      btn.disabled = true; msg.textContent = 'Enrolling…';
      api({ action: 'enroll', email: email, name: name, business: biz }).then(function (d) {
        btn.disabled = false;
        if (d.error) { msg.textContent = d.error; return; }
        S.email = email.toLowerCase(); S.name = name; S.business = biz; if (d.t) S.t = d.t; save(S);
        track('generate_lead', { event_category: 'lead', event_label: 'academy_enroll', value: 10 });
        var go = f.getAttribute('data-next');
        if (go) { location.href = go; return; }
        var gate = $('#gate'); if (gate) gate.hidden = true;
        document.body.classList.remove('gated');
        msg.textContent = 'You are enrolled. Check your inbox for the welcome email.';
        renderProgress();
      });
    });
  });
  function syncProgress() { if (S.t) api({ action: 'progress', t: S.t, done: S.done }); }
  function gateIfNeeded() { if (week && !enrolled()) { document.body.classList.add('gated'); var g = $('#gate'); if (g) g.hidden = false; } }

  // Personal return link from the email: /academy?t=...  restores the student on any device.
  var tParam = new URLSearchParams(location.search).get('t');
  if (tParam) {
    history.replaceState(null, '', location.pathname + location.hash);
    api({ action: 'resume', t: tParam }).then(function (d) {
      if (d.error) { var m = $('[data-resume-msg]'); if (m) { m.hidden = false; m.textContent = d.error; } gateIfNeeded(); return; }
      S.email = d.email; S.t = d.t; if (d.name) S.name = d.name; if (d.business) S.business = d.business;
      Object.keys(d.done || {}).forEach(function (k) { if (d.done[k]) S.done[k] = true; });
      if (d.cert) S.cert = d.cert;
      save(S); syncProgress();
      var gate = $('#gate'); if (gate) gate.hidden = true; document.body.classList.remove('gated');
      $$('form[data-hide-when-enrolled]').forEach(function (f) { f.hidden = true; });
      var w = $('[data-enrolled-msg]'); if (w) w.hidden = false;
      var lf = $('#link-form'); if (lf) lf.hidden = true;
      var hello = $('[data-welcome-back]'); if (hello) { hello.hidden = false; hello.textContent = 'Welcome back' + (S.name ? ', ' + S.name.split(' ')[0] : '') + '. Your progress is restored.'; }
      renderProgress();
    });
  } else { gateIfNeeded(); }

  // "Already enrolled? Email me my link"
  var lf = $('#link-form');
  if (lf) {
    if (enrolled()) lf.hidden = true;
    lf.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = $('.form-msg', lf), em = (lf.email.value || '').trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em)) { msg.textContent = 'Please enter a valid email address.'; return; }
      $('button', lf).disabled = true; msg.textContent = 'Sending…';
      api({ action: 'link', email: em }).then(function (d) {
        $('button', lf).disabled = false;
        msg.textContent = d.error || 'If that email is enrolled, your personal link is on its way. Check your inbox.';
      });
    });
  }

  // ---------------------------------------------------------------- exercises
  $$('textarea[data-note]').forEach(function (t) {
    var k = t.getAttribute('data-note');
    t.value = S.notes[k] || '';
    var timer; t.addEventListener('input', function () { clearTimeout(timer); timer = setTimeout(function () { S.notes[k] = t.value; save(S); var s = $('#saved-note'); if (s) { s.textContent = 'Saved on this device'; } }, 400); });
  });
  var copyBtn = $('#copy-notes');
  if (copyBtn) copyBtn.addEventListener('click', function () {
    var out = $$('textarea[data-note]').map(function (t) { return t.getAttribute('aria-label') + '\n' + (t.value || '—'); }).join('\n\n');
    (navigator.clipboard ? navigator.clipboard.writeText(out) : Promise.reject()).then(function () { copyBtn.textContent = 'Copied ✓'; }, function () { copyBtn.textContent = 'Copy failed'; });
  });

  // ---------------------------------------------------------------- complete
  var cb = $('#complete-btn');
  if (cb) cb.addEventListener('click', function () {
    S.done[week] = !S.done[week]; save(S); renderProgress(); syncProgress();
    if (S.done[week]) { track('academy_week_complete', { event_category: 'academy', value: week }); var nx = $('#next-week'); if (nx) nx.focus(); }
  });

  // ---------------------------------------------------------------- read aloud
  var synth = window.speechSynthesis;
  var readBtn = $('#read-btn');
  if (readBtn) {
    if (!synth) { readBtn.hidden = true; }
    else {
      var reading = false;
      readBtn.addEventListener('click', function () {
        if (reading) { synth.cancel(); reading = false; readBtn.textContent = '▶ Listen to this lesson'; return; }
        var text = $$('.lesson-body h2, .lesson-body p, .lesson-body li, .lesson-body blockquote').map(function (n) { return n.textContent; }).join('. ');
        var chunks = text.match(/[^.!?]+[.!?]+/g) || [text];
        reading = true; readBtn.textContent = '■ Stop reading';
        var i = 0;
        (function next() {
          if (!reading || i >= chunks.length) { reading = false; readBtn.textContent = '▶ Listen to this lesson'; return; }
          var u = new SpeechSynthesisUtterance(chunks[i++].trim()); u.lang = 'en-US'; u.rate = 1; u.onend = next; u.onerror = next; synth.speak(u);
        })();
        track('academy_listen', { event_category: 'academy', value: week });
      });
    }
  }

  // ---------------------------------------------------------------- AI tutor
  var log = $('#tutor-log'), form = $('#tutor-form');
  if (log && form) {
    var hist = [];
    try { hist = JSON.parse(sessionStorage.getItem('scale_tutor_' + week)) || []; } catch (e) {}
    var langSel = $('#tutor-lang'), speakChk = $('#tutor-speak'), micBtn = $('#tutor-mic'), input = $('#tutor-input');
    function bubble(role, text) {
      var d = document.createElement('div'); d.className = 'msg msg-' + role;
      text.split(/\n{2,}/).forEach(function (para) { var p = document.createElement('p'); p.textContent = para.replace(/\*\*/g, ''); d.appendChild(p); });
      log.appendChild(d); log.scrollTop = log.scrollHeight; return d;
    }
    if (!hist.length) bubble('ai', 'Hi' + (S.name ? ' ' + S.name.split(' ')[0] : '') + ", I'm your tutor for week " + week + '. Ask me about the lesson, or tell me about your business and I\'ll help you apply it.');
    hist.forEach(function (m) { bubble(m.role === 'user' ? 'user' : 'ai', m.content); });
    function speak(text) {
      if (!synth || !speakChk || !speakChk.checked) return;
      synth.cancel();
      var u = new SpeechSynthesisUtterance(text.replace(/\*\*/g, '')); u.lang = langSel ? langSel.value : 'en-US'; synth.speak(u);
    }
    function ask(q) {
      q = (q || '').trim(); if (!q) return;
      hist.push({ role: 'user', content: q }); bubble('user', q); input.value = '';
      var wait = bubble('ai', 'Thinking…'); wait.classList.add('is-wait');
      form.querySelector('button[type=submit]').disabled = true;
      var ctx = S.business ? ' (My business: ' + S.business + ')' : '';
      var send = hist.map(function (m, i) { return (i === 0 && m.role === 'user') ? { role: 'user', content: m.content + ctx } : m; });
      api({ action: 'tutor', week: week, messages: send }).then(function (d) {
        form.querySelector('button[type=submit]').disabled = false;
        wait.remove();
        if (d.error) { bubble('ai', d.error); hist.pop(); return; }
        hist.push({ role: 'assistant', content: d.text }); bubble('ai', d.text); speak(d.text);
        try { sessionStorage.setItem('scale_tutor_' + week, JSON.stringify(hist.slice(-12))); } catch (e) {}
      });
      track('academy_tutor', { event_category: 'academy', value: week });
    }
    form.addEventListener('submit', function (e) { e.preventDefault(); ask(input.value); });
    $$('[data-suggest]').forEach(function (b) { b.addEventListener('click', function () { ask(b.textContent); }); });
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR && micBtn) { micBtn.hidden = true; }
    if (SR && micBtn) {
      var rec = null;
      micBtn.addEventListener('click', function () {
        if (rec) { rec.stop(); return; }
        rec = new SR(); rec.lang = langSel ? langSel.value : 'en-US'; rec.interimResults = true; rec.maxAlternatives = 1;
        micBtn.classList.add('is-on'); micBtn.setAttribute('aria-pressed', 'true'); if (speakChk) speakChk.checked = true;
        var finalText = '';
        rec.onresult = function (ev) { var t = ''; for (var i = 0; i < ev.results.length; i++) t += ev.results[i][0].transcript; input.value = t; if (ev.results[ev.results.length - 1].isFinal) finalText = t; };
        rec.onerror = function () {};
        rec.onend = function () { micBtn.classList.remove('is-on'); micBtn.setAttribute('aria-pressed', 'false'); rec = null; if (finalText || input.value) ask(finalText || input.value); };
        rec.start();
      });
    }
  }

  // ---------------------------------------------------------------- certificate claim
  var cf = $('#cert-form');
  if (cf) {
    if (S.name && cf.fullname) cf.fullname.value = S.name;
    cf.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = $('.form-msg', cf), btn = $('button', cf), name = cf.fullname.value.trim();
      if (!S.email) { msg.textContent = 'Please enroll first (top of the page).'; return; }
      if (name.length < 2) { msg.textContent = 'Enter your full name as it should appear.'; return; }
      btn.disabled = true; msg.textContent = 'Issuing your certificate…';
      api({ action: 'cert', email: S.email, name: name }).then(function (d) {
        btn.disabled = false;
        if (d.error) { msg.textContent = d.error; return; }
        S.cert = d.url; save(S); track('academy_certificate', { event_category: 'academy' });
        location.href = d.url;
      });
    });
  }

  // ---------------------------------------------------------------- certificate page
  if (page === 'certificate') {
    var id = (new URLSearchParams(location.search).get('id') || '').toUpperCase();
    var box = $('#cert'), err = $('#cert-error');
    if (!id) { err.hidden = false; }
    else api({ action: 'certGet', id: id }).then(function (d) {
      if (d.error) { err.hidden = false; err.querySelector('p').textContent = d.error; return; }
      $('#c-name').textContent = d.name; $('#c-course').textContent = d.course; $('#c-id').textContent = d.id;
      var dt = new Date(d.date + 'T12:00:00Z');
      $('#c-date').textContent = dt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      document.title = d.name + ' — S.C.A.L.E. Academy certificate';
      var url = 'https://siamakconsulting.com/academy/certificate?id=' + d.id;
      var li = 'https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=' + encodeURIComponent('S.C.A.L.E. Framework: Growth Strategy for the AI Era') +
        '&organizationName=' + encodeURIComponent('Siamak Kalhor Consulting') + '&issueYear=' + dt.getUTCFullYear() + '&issueMonth=' + (dt.getUTCMonth() + 1) +
        '&certUrl=' + encodeURIComponent(url) + '&certId=' + encodeURIComponent(d.id);
      $('#c-linkedin').href = li;
      $('#c-share').addEventListener('click', function () {
        if (navigator.share) navigator.share({ title: 'My S.C.A.L.E. Academy certificate', url: url }).catch(function () {});
        else if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { $('#c-share').textContent = 'Link copied ✓'; });
      });
      $('#c-print').addEventListener('click', function () { window.print(); });
      box.hidden = false;
    });
  }

  renderProgress();
})();
