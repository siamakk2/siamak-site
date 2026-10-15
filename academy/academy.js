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
  var T0 = performance.now(); // fill time is sent with a new sign-up; bots submit instantly
  function enrolled() { return !!S.email; }
  $$('form[data-enroll]').forEach(function (f) {
    if (enrolled() && f.hasAttribute('data-hide-when-enrolled')) { f.hidden = true; var w = $('[data-enrolled-msg]'); if (w) w.hidden = false; }
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = (f.email.value || '').trim(), name = (f.name ? f.name.value : '').trim(), biz = (f.business ? f.business.value : '').trim();
      var msg = $('.form-msg', f), btn = $('button', f);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { msg.textContent = 'Please enter a valid email address.'; return; }
      btn.disabled = true; msg.textContent = 'Enrolling…';
      var hp = f.website ? f.website.value : '';
      api({ action: 'enroll', email: email, name: name, business: biz, website: hp, ft: Math.round(performance.now() - T0) }).then(function (d) {
        btn.disabled = false;
        if (d.error) { msg.textContent = d.error; return; }
        S.email = email.toLowerCase(); S.name = name; S.business = biz; if (d.t) S.t = d.t; S.paid = !!d.paid; save(S);
        track('generate_lead', { event_category: 'lead', event_label: 'academy_enroll', value: 10 });
        var go = f.getAttribute('data-next');
        if (go) { location.href = go; return; }
        var gate = $('#gate'); if (gate) gate.hidden = true;
        document.body.classList.remove('gated');
        msg.textContent = 'You are enrolled. Check your inbox for the welcome email.';
        applyAccess(); renderProgress();
      });
    });
  });
  function syncProgress() { if (S.t) api({ action: 'progress', t: S.t, done: S.done }); }
  function gateIfNeeded() { if (week && !enrolled()) { document.body.classList.add('gated'); var g = $('#gate'); if (g) g.hidden = false; } }
  // Weeks 2-6 need the full course; week 1 is free.
  function applyAccess() {
    var pw = $('#paywall'); if (!pw) return;
    var lock = week >= 2 && enrolled() && !S.paid;
    pw.hidden = !lock;
    if (lock) document.body.classList.add('gated');
    else if (enrolled()) document.body.classList.remove('gated');
  }
  function signedIn(d, hello) {
    S.email = d.email || S.email; if (d.t) S.t = d.t; if (d.name) S.name = d.name; if (d.business) S.business = d.business;
    if (typeof d.paid === 'boolean') S.paid = d.paid;
    Object.keys(d.done || {}).forEach(function (k) { if (d.done[k]) S.done[k] = true; });
    if (d.cert) S.cert = d.cert;
    save(S); syncProgress();
    var gate = $('#gate'); if (gate) gate.hidden = true; document.body.classList.remove('gated');
    $$('form[data-hide-when-enrolled]').forEach(function (f) { f.hidden = true; });
    var w = $('[data-enrolled-msg]'); if (w) w.hidden = false;
    var lf0 = $('#link-form'); if (lf0) lf0.hidden = true;
    var h = $('[data-welcome-back]'); if (h && hello) { h.hidden = false; h.textContent = hello; }
    applyAccess(); renderProgress();
  }

  var qs = new URLSearchParams(location.search), tParam = qs.get('t'), paidParam = qs.get('paid');
  if (tParam || paidParam) history.replaceState(null, '', location.pathname + location.hash);
  if (paidParam) {
    // Back from Stripe Checkout.
    api({ action: 'confirm', session_id: paidParam }).then(function (d) {
      if (d.error) { var m = $('[data-resume-msg]'); if (m) { m.hidden = false; m.textContent = d.error; } if (tParam) api({ action: 'resume', t: tParam }).then(function (r) { if (!r.error) signedIn(r); }); return; }
      d.paid = true; signedIn(d, 'Payment received. The full course is unlocked. Welcome!');
      track('purchase', { currency: 'USD', value: 197, items: [{ item_name: 'S.C.A.L.E. Academy' }] });
    });
  } else if (tParam) {
    // Personal return link from an email: restores the student on any device.
    api({ action: 'resume', t: tParam }).then(function (d) {
      if (d.error) { var m = $('[data-resume-msg]'); if (m) { m.hidden = false; m.textContent = d.error; } gateIfNeeded(); return; }
      signedIn(d, 'Welcome back' + (d.name ? ', ' + d.name.split(' ')[0] : '') + '. Your progress is restored.');
    });
  } else if (enrolled()) {
    // Refresh access quietly (also gives students from before return links a token).
    applyAccess();
    (S.t ? api({ action: 'resume', t: S.t }) : api({ action: 'enroll', email: S.email, name: S.name || '', business: S.business || '' }))
      .then(function (d) { if (!d.error) { if (!d.email) d.email = S.email; signedIn(d); } });
  } else { gateIfNeeded(); }

  var payBtn = $('#pay-btn');
  if (payBtn) payBtn.addEventListener('click', function () {
    var msg = $('#pay-msg');
    if (!S.t) { msg.textContent = 'One moment, setting up your account…'; return; }
    payBtn.disabled = true; msg.textContent = 'Opening secure checkout…';
    track('begin_checkout', { currency: 'USD', value: 197 });
    api({ action: 'checkout', t: S.t }).then(function (d) {
      if (d.already) { S.paid = true; save(S); applyAccess(); return; }
      if (d.url) { location.href = d.url; return; }
      payBtn.disabled = false; msg.textContent = d.error || 'Checkout is unavailable right now. Please try again.';
    });
  });

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
      api({ action: 'tutor', week: week, t: S.t || '', messages: send }).then(function (d) {
        form.querySelector('button[type=submit]').disabled = false;
        wait.remove();
        if (d.locked) { S.paid = false; save(S); applyAccess(); }
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
        if (d.locked) { S.paid = false; save(S); applyAccess(); }
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
