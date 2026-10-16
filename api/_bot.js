// Shared bot screening for the site's public forms (contact, audit leads, booking).
//
// Why: sign-up and contact bots post straight to these endpoints, often in bursts a
// few seconds apart from overseas data centres, with random-letter names and other
// people's email addresses. Each one used to reach Siamak's inbox, and the audit
// form would even mail a "report" to the stranger whose address the bot used.
//
// Signals, all invisible to real visitors:
//   honeypot  a hidden field humans never see was filled in
//   noscript  the request did not come from the site's own pages: every page loads
//             /assets/form-guard.js, which stamps each form post with _ft (time on page)
//   fast      the form was sent less than 3 seconds after the page opened
//   gibberish a name or company made of random letters ("Lzve Dmzyjq", "Yqqdt LLC")
//   links     a message stuffed with links
// A suspected bot gets the same success answer as a person, so it learns nothing,
// but no email is sent. Its details are kept in Redis (suspect:<form>) for review.

const { redisCreds } = require('./_guard');

const HONEYPOTS = ['website_url', 'website', 'hp', 'company_website', 'url_confirm'];
const RARE = /jq|jx|jz|qg|qk|qy|qz|qj|qx|qq|wq|wz|xj|zx|zj|vq|vj|vx|kq|cj|fq|gq|pq|zq|hx|xk|bx|cx|dx|fx|gx|jv|jw|jf|jg|mq|pz|qv|vw|vz|xz|zf|zv|lzv|mzy/;

function gibberishWord(w) {
  w = String(w).toLowerCase();
  if (!/^[a-z]+$/.test(w) || w.length < 4) return false;
  let v = 0, run = 0, maxRun = 0;
  for (let i = 0; i < w.length; i++) {
    const c = w[i], vowel = 'aeiou'.includes(c) || (c === 'y' && i > 0);
    if (vowel) { v++; run = 0; } else { run++; if (run > maxRun) maxRun = run; }
  }
  return v === 0 || maxRun >= 5 || RARE.test(w);
}
const looksGibberish = (t) => String(t || '').split(/[^A-Za-z]+/).some(gibberishWord);

function screen(body, opts) {
  const o = opts || {};
  const why = [];
  if (HONEYPOTS.some((k) => String(body[k] || '').trim())) why.push('honeypot');
  const ft = Number(body._ft);
  if (body._ft === undefined || body._ft === null || body._ft === '') { if (o.requireFt !== false) why.push('noscript'); }
  else if (!isFinite(ft) || ft < (o.minMs || 3000)) why.push('fast');
  if ((o.names || []).some((k) => looksGibberish(body[k]))) why.push('gibberish');
  const msg = (o.texts || []).map((k) => String(body[k] || '')).join(' ');
  if ((msg.match(/https?:\/\//gi) || []).length >= 3) why.push('links');
  return why;
}

async function keep(bucket, record) {
  const c = redisCreds();
  if (!c) return;
  const cmd = async (arr) => fetch(c.url, { method: 'POST', headers: { Authorization: 'Bearer ' + c.token, 'Content-Type': 'application/json' }, body: JSON.stringify(arr) }).catch(() => {});
  try {
    await cmd(['LPUSH', 'suspect:' + bucket, JSON.stringify(Object.assign({ at: new Date().toISOString() }, record))]);
    await cmd(['LTRIM', 'suspect:' + bucket, 0, 499]);
  } catch (e) {}
}

module.exports = { screen, keep, looksGibberish };
