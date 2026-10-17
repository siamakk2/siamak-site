// The Long View Letter: Siamak's monthly email, sign-up to sending.
//
//   POST /api/letter                 sign up {name, email, _ft, website(honeypot)}
//                                    -> stores a pending sign-up, emails a confirm link
//   GET  /api/letter?a=confirm&t=..  confirms (double opt-in), notifies Siamak
//   GET  /api/letter?a=unsub&e=..&s=..   one-click unsubscribe (also POST, for mail apps)
//   GET  /api/letter?a=cron          daily, from Vercel cron: sends any issue in
//                                    api/_letter-issues.js that is due
//
// Issues live in api/_letter-issues.js (not publicly served), so sending is a deliberate change to the repo.
// An issue marked status 'preview' goes to Siamak only, once. An issue marked
// 'send' goes once to every confirmed subscriber on or after its date. Redis flags
// make both steps happen exactly once, however often the cron runs.
//
// Redis keys: letter:subs (hash email -> json), letter:pending:<token> (7 days),
// letter:unsub (set), letter:previewed:<id>, letter:sent:<id>, suspect:letter.

const crypto = require('crypto');
const { guard, redisCreds } = require('./_guard');
const bot = require('./_bot');

const SITE = 'https://siamakconsulting.com';
const FROM = 'Siamak Kalhor <reports@siamakconsulting.com>';
const REPLY_TO = 'siamakkalhorconsulting@gmail.com';
const OWNER = process.env.CONTACT_TO_EMAIL || 'siamakk2@gmail.com';
const ADDRESS = 'Siamak Kalhor Consulting LLC · 530 E 8th St, Los Angeles, CA 90014';

function secret() { return 'letter:' + (process.env.ACADEMY_SECRET || process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || process.env.RESEND_API_KEY || ''); }
const sign = (email) => crypto.createHmac('sha256', secret()).update(email).digest('base64url').slice(0, 22);
function signedOk(email, s) {
  const a = Buffer.from(sign(email)); const b = Buffer.from(String(s || ''));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
const unsubUrl = (email) => SITE + '/api/letter?a=unsub&e=' + encodeURIComponent(email) + '&s=' + sign(email);

async function redis(cmd) {
  const c = redisCreds();
  if (!c) throw new Error('storage not configured');
  const r = await fetch(c.url, { method: 'POST', headers: { Authorization: 'Bearer ' + c.token, 'Content-Type': 'application/json' }, body: JSON.stringify(cmd) });
  const j = await r.json().catch(() => ({}));
  if (j.error) throw new Error(j.error);
  return j.result;
}

function resendKey() {
  const m = String(process.env.RESEND_API_KEY || '').match(/re_[A-Za-z0-9_-]{10,}/);
  return m ? m[0] : '';
}
async function resend(path, payload) {
  const key = resendKey();
  if (!key) return { ok: false, status: 0 };
  const r = await fetch('https://api.resend.com' + path, { method: 'POST', headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  if (!r.ok) console.error(JSON.stringify({ source: 'letter', mail: r.status, detail: (await r.text().catch(() => '')).slice(0, 300) }));
  return { ok: r.ok, status: r.status };
}

const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function shell(innerHtml, email) {
  const foot = email
    ? 'You get this because you signed up at siamakconsulting.com/letter. <a href="' + unsubUrl(email) + '" style="color:#6B7280">Unsubscribe</a> with one click.'
    : 'You get this because someone (hopefully you) asked to join the letter at siamakconsulting.com/letter.';
  return '<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1d1630;line-height:1.65;font-size:17px">' +
    '<p style="font-family:Arial,sans-serif;font-size:12px;letter-spacing:2px;color:#5b2bd6;font-weight:bold;margin:0 0 18px">THE LONG VIEW LETTER</p>' +
    innerHtml +
    '<hr style="border:none;border-top:1px solid #e4dff0;margin:32px 0 14px">' +
    '<p style="font-family:Arial,sans-serif;font-size:12px;color:#6B7280;line-height:1.5">' + foot + '<br>' + ADDRESS + '</p></div>';
}
const textFoot = (email) => '\n\n--\nThe Long View Letter from Siamak Kalhor\n' + (email ? 'Unsubscribe: ' + unsubUrl(email) + '\n' : '') + ADDRESS.replace(' · ', ', ');

function redirect(res, to) { res.statusCode = 302; res.setHeader('Location', to); res.setHeader('Cache-Control', 'no-store'); res.end(); }

async function subscribe(req, res) {
  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = {}; } }
  b = b && typeof b === 'object' ? b : {};
  const name = String(b.name || '').trim().slice(0, 80);
  const email = String(b.email || '').trim().toLowerCase().slice(0, 160);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return res.status(400).json({ ok: false, error: 'That email address does not look right.' });
  const why = bot.screen(b, { names: ['name'] });
  if (why.length) { await bot.keep('letter', { name, email, why }); return res.status(200).json({ ok: true }); }
  if (await redis(['HEXISTS', 'letter:subs', email])) return res.status(200).json({ ok: true, already: true });
  const t = crypto.randomBytes(18).toString('base64url');
  await redis(['SET', 'letter:pending:' + t, JSON.stringify({ name, email, at: new Date().toISOString(), src: String(b.source || 'letter').slice(0, 40) }), 'EX', 604800]);
  const link = SITE + '/api/letter?a=confirm&t=' + t;
  const hi = name ? 'Hi ' + esc(name.split(' ')[0]) + ',' : 'Hi,';
  const sent = await resend('/emails', {
    from: FROM, to: [email], reply_to: REPLY_TO,
    subject: 'Confirm: The Long View Letter',
    html: shell('<p>' + hi + '</p><p>One click and you are on the list: one short letter a month on how AI is changing the way customers find a business, and what to do about it.</p>' +
      '<p><a href="' + link + '" style="display:inline-block;background:#5b2bd6;color:#fff;padding:12px 22px;border-radius:8px;text-decoration:none;font-family:Arial,sans-serif;font-weight:bold">Yes, sign me up</a></p>' +
      '<p style="font-size:14px;color:#6B7280">If you did not ask for this, ignore this email and nothing will happen.</p><p>Siamak</p>', null),
    text: hi + '\n\nConfirm your sign-up for The Long View Letter: ' + link + '\n\nIf you did not ask for this, ignore this email.\n\nSiamak' + textFoot(null)
  });
  return res.status(200).json({ ok: true, sent: sent.ok });
}

async function confirm(req, res) {
  const t = String(req.query.t || '').replace(/[^A-Za-z0-9_-]/g, '');
  const raw = t ? await redis(['GET', 'letter:pending:' + t]) : null;
  if (!raw) return redirect(res, '/letter?expired=1');
  const p = JSON.parse(raw);
  await redis(['HSET', 'letter:subs', p.email, JSON.stringify({ name: p.name, at: new Date().toISOString(), src: p.src })]);
  await redis(['SREM', 'letter:unsub', p.email]);
  await redis(['DEL', 'letter:pending:' + t]);
  const n = await redis(['HLEN', 'letter:subs']).catch(() => '?');
  await resend('/emails', { from: FROM, to: [OWNER], subject: 'New letter subscriber: ' + (p.name || p.email),
    text: (p.name || '(no name)') + ' <' + p.email + '> confirmed The Long View Letter.\nSource: ' + p.src + '\nSubscribers now: ' + n }).catch(() => {});
  return redirect(res, '/letter?ok=1');
}

async function unsubscribe(req, res) {
  const email = String(req.query.e || '').trim().toLowerCase();
  if (!email || !signedOk(email, req.query.s)) return redirect(res, '/letter?bad=1');
  await redis(['HDEL', 'letter:subs', email]);
  await redis(['SADD', 'letter:unsub', email]);
  if (req.method === 'POST') return res.status(200).json({ ok: true });
  return redirect(res, '/letter?bye=1');
}

async function cron(req, res) {
  const auth = req.headers.authorization || '';
  const okCron = (process.env.CRON_SECRET && auth === 'Bearer ' + process.env.CRON_SECRET) || /vercel-cron/i.test(req.headers['user-agent'] || '');
  if (!okCron) return res.status(401).json({ ok: false });
  const issues = require('./_letter-issues.js');
  const today = new Date().toISOString().slice(0, 10);
  const log = [];
  for (const is of issues) {
    if (!is || !is.id || !is.subject || !is.html) continue;
    if (is.status === 'preview') {
      if (!(await redis(['SET', 'letter:previewed:' + is.id, today, 'NX']))) continue;
      const r = await resend('/emails', { from: FROM, to: [OWNER], reply_to: REPLY_TO, subject: '[PREVIEW] ' + is.subject, html: shell(is.html, OWNER), text: (is.text || '') + textFoot(OWNER) });
      log.push({ id: is.id, preview: r.ok });
    }
    if (is.status === 'send' && is.date && is.date <= today) {
      if (!(await redis(['SET', 'letter:sent:' + is.id, new Date().toISOString(), 'NX']))) continue;
      const flat = (await redis(['HGETALL', 'letter:subs'])) || [];
      const unsub = new Set((await redis(['SMEMBERS', 'letter:unsub'])) || []);
      const people = [];
      for (let i = 0; i < flat.length; i += 2) if (!unsub.has(flat[i])) { let v = {}; try { v = JSON.parse(flat[i + 1]); } catch (e) {} people.push({ email: flat[i], name: v.name || '' }); }
      let sent = 0, failed = 0;
      for (let i = 0; i < people.length; i += 100) {
        const batch = people.slice(i, i + 100).map((p) => ({
          from: FROM, to: [p.email], reply_to: REPLY_TO, subject: is.subject,
          html: shell(is.html.replace(/\{\{first\}\}/g, esc((p.name || '').split(' ')[0] || 'there')), p.email),
          text: (is.text || '').replace(/\{\{first\}\}/g, (p.name || '').split(' ')[0] || 'there') + textFoot(p.email),
          headers: { 'List-Unsubscribe': '<' + unsubUrl(p.email) + '>', 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' }
        }));
        const r = await resend('/emails/batch', batch);
        if (r.ok) sent += batch.length; else failed += batch.length;
      }
      await resend('/emails', { from: FROM, to: [OWNER], subject: 'Letter sent: ' + is.subject, text: 'Issue ' + is.id + ' went to ' + sent + ' subscribers.' + (failed ? ' ' + failed + ' failed; check the Resend dashboard.' : '') });
      log.push({ id: is.id, sent, failed });
    }
  }
  return res.status(200).json({ ok: true, today, log });
}

module.exports = async function handler(req, res) {
  const a = String((req.query && req.query.a) || '');
  try {
    if (a === 'cron') return await cron(req, res);
    if (a === 'confirm') return await confirm(req, res);
    if (a === 'unsub') return await unsubscribe(req, res);
    if (req.method !== 'POST') return res.status(405).json({ ok: false });
    if (!(await guard(req, res, { bucket: 'letter', limit: 8, window: 3600 }))) return;
    return await subscribe(req, res);
  } catch (e) {
    console.error(JSON.stringify({ source: 'letter', error: e.message }));
    if (req.method === 'GET') return redirect(res, '/letter?err=1');
    return res.status(200).json({ ok: false, error: 'Something went wrong. Please email siamakkalhorconsulting@gmail.com and I will add you by hand.' });
  }
};
