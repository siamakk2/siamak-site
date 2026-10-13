/* Agency pages: checkout tracking on /agency, brief form on /agency/start. */
(function () {
  'use strict';
  function track(n, p) { try { if (typeof gtag === 'function') gtag('event', n, p || {}); } catch (e) {} }
  var VALUES = { launch: 2500, growth: 1500, website: 2250, agent: 3750, content: 1200 };
  document.querySelectorAll('a[data-pkg]').forEach(function (a) {
    a.addEventListener('click', function () { var k = a.getAttribute('data-pkg'); track('begin_checkout', { currency: 'USD', value: VALUES[k] || 0, items: [{ item_name: k }] }); });
  });
  var form = document.getElementById('ag-brief');
  if (!form) return;
  var qs = new URLSearchParams(location.search), session = qs.get('session') || '', pkg = qs.get('pkg') || '';
  var sel = document.getElementById('ag-pkg'); if (sel && pkg) sel.value = pkg;
  function api(p) {
    return fetch('/api/agency', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p) })
      .then(function (r) { return r.json(); }).catch(function () { return { error: 'Network problem. Please try again.' }; });
  }
  if (session) api({ action: 'order', session: session }).then(function (d) {
    if (!d.paid) return;
    if (d.pkg && sel) sel.value = d.pkg;
    ['email', 'name', 'business', 'phone'].forEach(function (k) { if (d[k] && form[k] && !form[k].value) form[k].value = d[k]; });
    var s = document.getElementById('ag-status'); if (s) s.textContent = 'Payment received. Thank you! Two minutes and we have everything we need to start.';
    track('purchase', { currency: 'USD', value: VALUES[d.pkg] || 0, items: [{ item_name: d.pkg }] });
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var msg = form.querySelector('.form-msg'), btn = form.querySelector('button');
    var data = { action: 'brief', session: session };
    ['pkg', 'name', 'email', 'phone', 'business', 'website', 'industry', 'location', 'platform', 'goals', 'customers', 'competitors', 'access', 'notes']
      .forEach(function (k) { data[k] = form[k] ? form[k].value : ''; });
    btn.disabled = true; msg.textContent = 'Sending…';
    api(data).then(function (d) {
      btn.disabled = false;
      if (d.error) { msg.textContent = d.error; return; }
      form.hidden = true; document.getElementById('ag-done').hidden = false; window.scrollTo(0, 0);
      track('generate_lead', { event_category: 'lead', event_label: 'agency_brief', value: VALUES[data.pkg] || 0 });
    });
  });
})();
