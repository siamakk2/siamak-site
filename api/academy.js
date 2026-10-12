const crypto = require('crypto');
const { guard, redisCreds } = require('./_guard');

// S.C.A.L.E. Academy — the online course at /academy (week 1 free, full course $197).
// One endpoint, three actions:
//   enroll  { email, name?, business? }        -> stores the student, emails a welcome, alerts Siamak
//   tutor   { week, messages[] }               -> the AI tutor for that week's lesson
//   cert    { email, name }                    -> issues a certificate of completion
//   certGet { id }                             -> reads a certificate for the public certificate page
// Storage is Upstash Redis (the same database the rate limiter uses).

const SITE = 'https://siamakconsulting.com';
const FROM = 'Siamak Kalhor Consulting <reports@siamakconsulting.com>';
const ALERT = process.env.ALERT_EMAIL || 'siamakk2@gmail.com';

const WEEKS = {
  1: { title: 'The answer economy', brief: 'How ChatGPT, Gemini, Claude and Perplexity decide which businesses to recommend; why being ranked is no longer the same as being named; the S.C.A.L.E. sequence (Scan, Clarify, Amplify, Leverage, Evaluate) and why order matters. Exercise: pick a business, run the free scan at scale.siamakconsulting.com, ask AI five customer questions without naming the business, record who is named and which sources are cited.' },
  2: { title: 'S - Scan (Visibility)', brief: 'The honest baseline. Checks: is the page indexable (no noindex), are AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) allowed in robots.txt, is the main text in the HTML rather than drawn by scripts, enough words, page title present and sensible, meta description about 120-160 characters, canonical address, sitemap.xml. Beyond the site: Google Business Profile, Apple Maps/Bing Places, directories, social profiles, with name/address/phone consistent. Output: the three biggest blockers in order of impact.' },
  3: { title: 'C - Clarify (Clarity)', brief: 'Positioning a person and a language model can both repeat. Business DNA: official name, what it does in one plain sentence, who it serves, where, provable difference, proof. Positioning formula: [Business] is a [category] in [place] that helps [customer] [result], unlike [alternative], because [proof]; 25 words or fewer. Front page: one H1 that states the role (not a slogan), title under 60 characters (service, place, name), meta description 120-160 characters, share title agrees with page title. Test by asking ChatGPT what the business does.' },
  4: { title: 'A - Amplify (Structure)', brief: 'Give AI the facts in a form it can read. JSON-LD schema with the most specific type (Restaurant, Dentist, Plumber, LegalService, LocalBusiness), name, url, telephone, address, areaServed, description, sameAs profiles; validate at validator.schema.org and Google Rich Results Test. FAQ: real customer questions, each answer starts with the answer, 2-4 factual sentences, also as FAQPage schema. llms.txt: a short plain-text introduction for AI at the site root with the positioning statement and key pages. Amplify only after Clarify: schema only helps if the facts are clear and consistent.' },
  5: { title: 'L - Leverage (Authority)', brief: 'AI repeats what trusted sources say. Citation map: sources AI cites for customer questions, where competitors appear and the business does not, consistency of details. Official profiles listed in schema sameAs: Google Business Profile, LinkedIn, industry association or licensing body, chamber of commerce or local directory, main social account. Trust transfer: referral partners, suppliers, community groups, local media; what is in it for them and the first step. A 90-day authority plan. Earned mentions only, never fake reviews.' },
  6: { title: 'E - Evaluate (Momentum)', brief: 'Prove what changed and keep measuring. Rescan in the S.C.A.L.E. app; Momentum is the change between monthly scans. A tracked set of 10 customer questions re-asked monthly in ChatGPT and Perplexity. AI answers change slowly and vary between runs, so report honestly what moved and what has not yet. Monthly routine: rescan on the 1st, re-ask the 10 questions, log new reviews, citations and inquiry sources, pick the next fix, then the cycle starts again at Scan. Capstone: a complete S.C.A.L.E. plan for the business.' }
};

function redis() {
  const c = redisCreds();
  if (!c) return null;
  return async function (cmd) {
    const r = await fetch(c.url, { method: 'POST', headers: { Authorization: 'Bearer ' + c.token, 'Content-Type': 'application/json' }, body: JSON.stringify(cmd) });
    const d = await r.json().catch(() => ({}));
    if (d && d.error) throw new Error(d.error);
    return d ? d.result : null;
  };
}

const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const cleanEmail = (e) => String(e || '').trim().toLowerCase().slice(0, 200);
const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
const cleanName = (n) => String(n || '').replace(/[\u0000-\u001f<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 80);

// Personal return link: an HMAC of the email, keyed by a server-only secret,
// so the link in the email restores a student's place on any device.
function secret() { return 'academy:' + (process.env.ACADEMY_SECRET || process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || process.env.RESEND_API_KEY || ''); }
function tokenFor(email) {
  const e = Buffer.from(email).toString('base64url');
  const sig = crypto.createHmac('sha256', secret()).update(email).digest('base64url').slice(0, 22);
  return e + '.' + sig;
}
function emailFromToken(t) {
  const m = /^([A-Za-z0-9_-]+)\.([A-Za-z0-9_-]{22})$/.exec(String(t || ''));
  if (!m) return null;
  let email; try { email = Buffer.from(m[1], 'base64url').toString('utf8'); } catch (e) { return null; }
  const want = Buffer.from(tokenFor(email).split('.')[1]); const got = Buffer.from(m[2]);
  return want.length === got.length && crypto.timingSafeEqual(want, got) ? email : null;
}
const resumeUrl = (email) => SITE + '/academy?t=' + tokenFor(email);
function linkBlock(email) {
  const u = resumeUrl(email);
  return '<p><a href="' + u + '" style="display:inline-block;background:#0E7490;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold">Continue my course</a></p>' +
    '<p style="font-size:14px;color:#4B5563">Your personal link (works on any device, keep this email):<br><a href="' + u + '" style="color:#0E7490;word-break:break-all">' + u + '</a></p>';
}

async function sendMail(to, subject, html, text) {
  const key = (process.env.RESEND_API_KEY || '').trim();
  if (!key) return false;
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST', headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM, to: [to], subject, html, text })
    });
    if (!r.ok) console.error(JSON.stringify({ source: 'academy', mail: r.status, detail: (await r.text().catch(() => '')).slice(0, 200) }));
    return r.ok;
  } catch (e) { console.error(JSON.stringify({ source: 'academy', mail: 'error', detail: e.message })); return false; }
}

function emailShell(title, bodyHtml) {
  return '<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#14202F;line-height:1.6">' +
    '<p style="font-size:12px;letter-spacing:2px;color:#0E7490;font-weight:bold">S.C.A.L.E. ACADEMY</p>' +
    '<h1 style="font-size:24px;margin:0 0 16px">' + title + '</h1>' + bodyHtml +
    '<p style="color:#6B7280;font-size:13px;margin-top:32px">Siamak Kalhor Consulting · Los Angeles · <a href="' + SITE + '">siamakconsulting.com</a></p></div>';
}

async function enroll(body, res) {
  const email = cleanEmail(body.email);
  if (!validEmail(email)) return res.status(200).json({ error: 'Please enter a valid email address.' });
  const name = cleanName(body.name);
  const business = cleanName(body.business);
  const db = redis();
  let isNew = true;
  if (db) {
    try {
      const rec = JSON.stringify({ email, name, business, at: new Date().toISOString() });
      const set = await db(['SET', 'academy:student:' + email, rec, 'NX']);
      isNew = set === 'OK';
      if (isNew) await db(['LPUSH', 'academy:students', rec]);
    } catch (e) { console.error(JSON.stringify({ source: 'academy', redis: e.message })); }
  }
  console.log(JSON.stringify({ source: 'academy', action: 'enroll', isNew, stored: !!db }));
  if (isNew) {
    const first = name ? esc(name.split(' ')[0]) : 'there';
    await sendMail(email, 'Welcome to the S.C.A.L.E. Academy',
      emailShell('Welcome, ' + first + '.',
        '<p>You are enrolled in the S.C.A.L.E. Academy: six short lessons on how to become the business AI recommends. Week 1 is free; unlock the full course whenever you are ready.</p>' +
        linkBlock(email) +
        '<p>Each lesson has an AI tutor you can type or talk to. Finish all six weeks to earn your certificate of completion.</p><p>Siamak</p>'),
      'Welcome to the S.C.A.L.E. Academy. Continue your course (your personal link, works on any device): ' + resumeUrl(email));
    await sendMail(ALERT, 'New Academy student: ' + email,
      emailShell('New Academy student', '<p><b>' + esc(email) + '</b><br>' + esc(name || '(no name)') + (business ? '<br>Business: ' + esc(business) : '') + '</p>'),
      'New Academy student: ' + email + ' ' + name + ' ' + business);
  }
  return res.status(200).json({ ok: true, isNew, t: tokenFor(email), paid: await isPaid(db, email) });
}

// ---- Paid access -----------------------------------------------------------
// Week 1 is free. Weeks 2-6, the tutor beyond week 1 and the certificate need
// the full course ($197, Stripe, handled by the S.C.A.L.E. app's billing
// endpoint). Everyone who enrolled before paid access launched keeps free
// access for life.
const FOUNDER_CUTOFF = '2026-10-12T21:30:00Z';
const BILLING = process.env.ACADEMY_BILLING_URL || 'https://scale.siamakconsulting.com/api/billing/academy';
async function isPaid(db, email) {
  if (!db || !email) return false;
  try {
    if (await db(['GET', 'academy:paid:' + email])) return true;
    const rec = JSON.parse((await db(['GET', 'academy:student:' + email])) || '{}');
    return !!(rec.at && rec.at < FOUNDER_CUTOFF);
  } catch (e) { return false; }
}
async function billing(payload) {
  const r = await fetch(BILLING, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  return r.json();
}

async function checkout(body, res) {
  const email = emailFromToken(body.t);
  if (!email) return res.status(200).json({ error: 'Please enroll free first (it takes a moment), then unlock the full course.' });
  const db = redis();
  if (await isPaid(db, email)) return res.status(200).json({ ok: true, already: true });
  try {
    const d = await billing({ op: 'checkout', email, t: tokenFor(email) });
    if (!d.url) return res.status(200).json({ error: d.error || 'Checkout is unavailable right now. Please try again.' });
    return res.status(200).json({ ok: true, url: d.url });
  } catch (e) { return res.status(200).json({ error: 'Checkout is unavailable right now. Please try again.' }); }
}

async function confirm(body, res) {
  const sid = String(body.session_id || '');
  let d;
  try { d = await billing({ op: 'verify', session_id: sid }); } catch (e) { d = {}; }
  if (!d.paid || !validEmail(d.email || '')) return res.status(200).json({ error: 'We could not confirm that payment yet. If you were charged, refresh in a minute or email siamakk2@gmail.com.' });
  const email = d.email; const db = redis();
  let first = true;
  if (db) {
    try {
      first = (await db(['SET', 'academy:paid:' + email, JSON.stringify({ session: sid, at: new Date().toISOString(), amount: d.amount }), 'NX'])) === 'OK';
      const known = await db(['GET', 'academy:student:' + email]);
      if (!known) {
        const rec = JSON.stringify({ email, name: '', business: '', at: new Date().toISOString() });
        await db(['SET', 'academy:student:' + email, rec]); await db(['LPUSH', 'academy:students', rec]);
      }
    } catch (e) { console.error(JSON.stringify({ source: 'academy', confirm: e.message })); }
  }
  console.log(JSON.stringify({ source: 'academy', action: 'paid', first }));
  if (first) {
    await sendMail(email, 'Your S.C.A.L.E. Academy full course is unlocked', emailShell('You are in.',
      '<p>Thank you. All six weeks, the AI tutor and your certificate are now unlocked.</p>' + linkBlock(email) + '<p>Siamak</p>'),
      'Your S.C.A.L.E. Academy full course is unlocked: ' + resumeUrl(email));
    await sendMail(ALERT, 'Academy sale: ' + email + ' ($' + ((d.amount || 0) / 100).toFixed(2) + ')',
      emailShell('New Academy sale', '<p><b>' + esc(email) + '</b> bought the full course for $' + ((d.amount || 0) / 100).toFixed(2) + '.</p>'), 'Academy sale: ' + email);
  }
  return res.status(200).json({ ok: true, paid: true, email, t: tokenFor(email) });
}

async function tutor(body, res) {
  const week = WEEKS[parseInt(body.week, 10)] ? parseInt(body.week, 10) : 1;
  if (week > 1 && !(await isPaid(redis(), emailFromToken(body.t)))) return res.status(200).json({ locked: true, error: 'The tutor for weeks 2 to 6 is part of the full course. Unlock it to keep going.' });
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(200).json({ error: 'The tutor is not available right now.' });
  const msgs = (Array.isArray(body.messages) ? body.messages : []).slice(-12).map((m) => ({
    role: m && m.role === 'assistant' ? 'assistant' : 'user',
    content: typeof (m && m.content) === 'string' ? m.content.slice(0, 3000) : ''
  })).filter((m) => m.content);
  while (msgs.length && msgs[0].role !== 'user') msgs.shift();
  if (!msgs.length) return res.status(200).json({ error: 'Ask a question to start.' });
  const w = WEEKS[week];
  const system = 'You are the AI tutor of the S.C.A.L.E. Academy, an online course by Siamak Kalhor, an AI consultant with 40 years in marketing (siamakconsulting.com). ' +
    'The student is on Week ' + week + ' of 6: ' + w.title + '.\nLesson content: ' + w.brief + '\n' +
    'The five stages and their scores in the free S.C.A.L.E. app (scale.siamakconsulting.com): Scan = Visibility, Clarify = Clarity, Amplify = Structure, Leverage = Authority, Evaluate = Momentum. The app runs 30 named checks.\n' +
    'How to teach: be a warm, direct coach. Keep answers short (under 170 words) and plain; no jargon without a one-line explanation. ' +
    'Apply the lesson to the student\'s own business whenever they mention it, and end with one concrete next step or one question that moves them forward. ' +
    'Answer in the language the student writes in. Never invent facts about a real business, statistics or quotes; if you do not know, say so and tell them how to check. ' +
    'Never recommend fake reviews or misleading claims. If asked something unrelated to growing a business with AI, steer back to the lesson in one sentence. ' +
    'If they want hands-on help, mention they can book a session with Siamak at siamakconsulting.com/contact-us. Do not use markdown headings; short paragraphs or a short list are fine.';
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 40000);
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST', signal: ctrl.signal,
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 700, system, messages: msgs })
    });
    clearTimeout(timer);
    const d = await r.json();
    if (!r.ok) { console.error(JSON.stringify({ source: 'academy', tutor: r.status, error: d && d.error })); return res.status(200).json({ error: 'The tutor is busy. Please try again in a moment.' }); }
    const text = (d.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('').trim();
    return res.status(200).json({ ok: true, text });
  } catch (e) {
    return res.status(200).json({ error: e.name === 'AbortError' ? 'The tutor took too long. Please try again.' : 'The tutor is unavailable right now.' });
  }
}

async function cert(body, res) {
  const email = cleanEmail(body.email);
  const name = cleanName(body.name);
  if (!validEmail(email)) return res.status(200).json({ error: 'Your enrolled email is missing. Please enroll first.' });
  if (name.length < 2) return res.status(200).json({ error: 'Please enter your full name as it should appear.' });
  const db = redis();
  if (!db) return res.status(200).json({ error: 'Certificates are temporarily unavailable. Please try again later.' });
  try {
    const student = await db(['GET', 'academy:student:' + email]);
    if (student && !(await isPaid(db, email))) return res.status(200).json({ locked: true, error: 'The certificate is part of the full course. Unlock it to claim yours.' });
    if (!student) return res.status(200).json({ error: 'We could not find your enrollment. Please enroll with this email first.' });
    const existing = await db(['GET', 'academy:certof:' + email]);
    if (existing) {
      const prev = JSON.parse((await db(['GET', 'academy:cert:' + existing])) || '{}');
      if (prev.name === name) return res.status(200).json({ ok: true, id: existing, url: SITE + '/academy/certificate?id=' + existing });
    }
    const id = 'SCALE-' + crypto.randomBytes(5).toString('hex').toUpperCase();
    const date = new Date().toISOString().slice(0, 10);
    await db(['SET', 'academy:cert:' + id, JSON.stringify({ name, date, course: 'S.C.A.L.E. Framework: Growth Strategy for the AI Era' })]);
    await db(['SET', 'academy:certof:' + email, id]);
    const url = SITE + '/academy/certificate?id=' + id;
    console.log(JSON.stringify({ source: 'academy', action: 'cert', id }));
    await sendMail(email, 'Your S.C.A.L.E. Academy certificate',
      emailShell('Congratulations, ' + esc(name.split(' ')[0]) + '.',
        '<p>You completed all six weeks of the S.C.A.L.E. Academy. Your certificate of completion is ready to view, print and share:</p>' +
        '<p><a href="' + url + '" style="display:inline-block;background:#0E7490;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold">View my certificate</a></p>' +
        '<p>Certificate ID: ' + id + '</p>' + linkBlock(email) + '<p>Siamak</p>'),
      'Your S.C.A.L.E. Academy certificate: ' + url);
    await sendMail(ALERT, 'Academy certificate issued: ' + name, emailShell('Certificate issued', '<p>' + esc(name) + ' (' + esc(email) + ')<br><a href="' + url + '">' + id + '</a></p>'), name + ' ' + email + ' ' + url);
    return res.status(200).json({ ok: true, id, url });
  } catch (e) {
    console.error(JSON.stringify({ source: 'academy', cert: e.message }));
    return res.status(200).json({ error: 'Something went wrong issuing your certificate. Please try again.' });
  }
}

async function certGet(body, res) {
  const id = String(body.id || '').toUpperCase();
  if (!/^SCALE-[0-9A-F]{10}$/.test(id)) return res.status(200).json({ error: 'Certificate not found.' });
  const db = redis();
  if (!db) return res.status(200).json({ error: 'Certificate lookup is temporarily unavailable.' });
  try {
    const c = await db(['GET', 'academy:cert:' + id]);
    if (!c) return res.status(200).json({ error: 'Certificate not found.' });
    const d = JSON.parse(c);
    return res.status(200).json({ ok: true, id, name: d.name, date: d.date, course: d.course });
  } catch (e) { return res.status(200).json({ error: 'Certificate lookup failed. Please try again.' }); }
}


async function resume(body, res) {
  const email = emailFromToken(body.t);
  if (!email) return res.status(200).json({ error: 'This link is not valid. Enter your email on the Academy page and we will send you a fresh one.' });
  const db = redis(); let rec = {}, done = {}, certId = null;
  if (db) {
    try {
      rec = JSON.parse((await db(['GET', 'academy:student:' + email])) || '{}');
      done = JSON.parse((await db(['GET', 'academy:progress:' + email])) || '{}');
      certId = await db(['GET', 'academy:certof:' + email]);
    } catch (e) { console.error(JSON.stringify({ source: 'academy', resume: e.message })); }
  }
  return res.status(200).json({ ok: true, email, name: rec.name || '', business: rec.business || '', done, t: tokenFor(email), paid: await isPaid(db, email),
    cert: certId ? SITE + '/academy/certificate?id=' + certId : null });
}

async function progress(body, res) {
  const email = emailFromToken(body.t);
  if (!email) return res.status(200).json({ error: 'Not signed in.' });
  const done = {};
  for (let n = 1; n <= 6; n++) if (body.done && body.done[n]) done[n] = true;
  const db = redis();
  if (db) { try { await db(['SET', 'academy:progress:' + email, JSON.stringify(done)]); } catch (e) {} }
  return res.status(200).json({ ok: true });
}

async function sendLink(body, res) {
  const email = cleanEmail(body.email);
  if (!validEmail(email)) return res.status(200).json({ error: 'Please enter a valid email address.' });
  const db = redis(); let known = false;
  if (db) { try { known = !!(await db(['GET', 'academy:student:' + email])); } catch (e) {} }
  if (known) {
    await sendMail(email, 'Your S.C.A.L.E. Academy link', emailShell('Welcome back.', '<p>Here is your personal link to pick up where you left off.</p>' + linkBlock(email) + '<p>Siamak</p>'),
      'Your S.C.A.L.E. Academy link: ' + resumeUrl(email));
  }
  // Same answer either way, so the form does not reveal who is enrolled.
  return res.status(200).json({ ok: true });
}

module.exports = async function handler(req, res) {
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  if (!body || typeof body !== 'object') body = {};
  const action = body.action;
  const limits = { enroll: 10, tutor: 60, cert: 10, certGet: 120, resume: 60, progress: 120, link: 5, checkout: 20, confirm: 30 };
  if (req.method === 'OPTIONS') return guard(req, res, { bucket: 'academy-preflight' });
  if (!limits[action]) { res.setHeader('Access-Control-Allow-Origin', '*'); return res.status(400).json({ error: 'Unknown action.' }); }
  if (!(await guard(req, res, { bucket: 'academy-' + action, limit: limits[action], window: 3600 }))) return;
  if (action === 'enroll') return enroll(body, res);
  if (action === 'tutor') return tutor(body, res);
  if (action === 'cert') return cert(body, res);
  if (action === 'resume') return resume(body, res);
  if (action === 'progress') return progress(body, res);
  if (action === 'link') return sendLink(body, res);
  if (action === 'checkout') return checkout(body, res);
  if (action === 'confirm') return confirm(body, res);
  return certGet(body, res);
};
