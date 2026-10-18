const { guard } = require('./_guard');

// Done-for-you agency orders (siamakconsulting.com/agency).
// Clients pay through Stripe Payment Links, land on /agency/start, and submit a
// short brief. This endpoint confirms the payment with the S.C.A.L.E. app's
// billing endpoint (which holds the Stripe key), then emails Siamak the full
// brief and sends the client a confirmation.
//   POST { action: 'order', session }            -> { paid, pkg, email, name, business }
//   POST { action: 'brief', session, pkg, ... }  -> { ok }

const SITE = 'https://siamakconsulting.com';
const FROM = 'Siamak Kalhor Consulting <reports@siamakconsulting.com>';
const ALERT = process.env.ALERT_EMAIL || 'siamakk2@gmail.com';
const BILLING = process.env.ACADEMY_BILLING_URL || 'https://scale.siamakconsulting.com/api/billing/academy';
const PKGS = {
  launch: 'AI Visibility Launch ($2,500)',
  growth: 'AI Visibility Growth ($1,500/month)',
  website: 'AI-Ready Website (50% deposit, $2,250)',
  agent: 'Done-For-You AI Agent ($3,500 + $1,000/month)',
  content: 'Content Engine ($1,200/month)'
};

const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const clip = (s, n) => String(s == null ? '' : s).replace(/[\u0000-\u0008\u000b-\u001f]/g, '').trim().slice(0, n);

async function verify(session) {
  if (!/^cs_(live|test)_[A-Za-z0-9]+$/.test(String(session || ''))) return { paid: false };
  try {
    const r = await fetch(BILLING, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op: 'verifyAgency', session_id: session }) });
    return await r.json();
  } catch (e) { return { paid: false, error: 'unreachable' }; }
}

async function sendMail(to, subject, html, text, replyTo) {
  const key = (process.env.RESEND_API_KEY || '').trim();
  if (!key) return false;
  try {
    const body = { from: FROM, to: [to], subject, html, text };
    if (replyTo) body.reply_to = replyTo;
    const r = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!r.ok) console.error(JSON.stringify({ source: 'agency', mail: r.status, detail: (await r.text().catch(() => '')).slice(0, 200) }));
    return r.ok;
  } catch (e) { return false; }
}
const shell = (title, inner) => '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#14202F;line-height:1.6">' +
  '<p style="font-size:12px;letter-spacing:2px;color:#0E7490;font-weight:bold">SIAMAK KALHOR CONSULTING · AI AGENCY</p>' +
  '<h1 style="font-size:22px;margin:0 0 14px">' + title + '</h1>' + inner +
  '<p style="color:#6B7280;font-size:13px;margin-top:28px">Siamak Kalhor Consulting · 530 E 8th St, Los Angeles · 323-657-7752 · <a href="' + SITE + '">siamakconsulting.com</a></p></div>';

module.exports = async function handler(req, res) {
  if (!(await guard(req, res, { bucket: 'agency', limit: 30, window: 3600 }))) return;
  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = {}; } }
  b = b || {};

  if (b.action === 'order') {
    const v = await verify(b.session);
    return res.status(200).json({ paid: !!v.paid, pkg: v.pkg || '', email: v.email || '', name: v.name || '', business: v.business || '', phone: v.phone || '' });
  }

  if (b.action === 'brief') {
    const v = await verify(b.session);
    const pkg = PKGS[v.pkg] ? v.pkg : (PKGS[b.pkg] ? b.pkg : '');
    const f = {
      name: clip(b.name, 100), email: clip(b.email, 200).toLowerCase(), phone: clip(b.phone, 40),
      business: clip(b.business, 150), website: clip(b.website, 300), industry: clip(b.industry, 120),
      location: clip(b.location, 150), platform: clip(b.platform, 80), goals: clip(b.goals, 3000),
      customers: clip(b.customers, 1500), competitors: clip(b.competitors, 1500), access: clip(b.access, 1500), notes: clip(b.notes, 3000)
    };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) return res.status(200).json({ error: 'Please enter a valid email address.' });
    if (!f.business || !f.goals) return res.status(200).json({ error: 'Please fill in your business name and your goals.' });
    const status = v.paid ? 'PAID ($' + ((v.amount || 0) / 100).toFixed(2) + ')' : 'NOT VERIFIED — check Stripe before starting';
    const rows = [['Package', PKGS[pkg] || '(not selected)'], ['Payment', status], ['Stripe session', b.session || '—'], ['Name', f.name], ['Email', f.email], ['Phone', f.phone],
      ['Business', f.business], ['Website', f.website], ['Industry', f.industry], ['Location / service area', f.location], ['Website platform', f.platform],
      ['Goals', f.goals], ['Ideal customers', f.customers], ['Competitors', f.competitors], ['Access / logins (how to share)', f.access], ['Anything else', f.notes]];
    const table = '<table style="border-collapse:collapse;width:100%">' + rows.map(([k, val]) =>
      '<tr><td style="border:1px solid #E5E7EB;padding:8px;font-weight:bold;vertical-align:top;width:34%">' + esc(k) + '</td><td style="border:1px solid #E5E7EB;padding:8px;white-space:pre-wrap">' + esc(val || '—') + '</td></tr>').join('') + '</table>';
    console.log(JSON.stringify({ source: 'agency', action: 'brief', pkg, paid: !!v.paid }));
    await sendMail(ALERT, 'New agency order: ' + (PKGS[pkg] || 'package') + ' — ' + f.business + (v.paid ? '' : ' (payment not verified)'),
      shell('New agency order', '<p>Reply to this email to reach the client directly.</p>' + table), rows.map(r => r[0] + ': ' + r[1]).join('\n'), f.email);
    const first = f.name ? esc(f.name.split(' ')[0]) : 'there';
    await sendMail(f.email, 'We have your brief — next steps', shell('Thank you, ' + first + '.',
      '<p>Your order for <b>' + esc(PKGS[pkg] || 'our services') + '</b> and your brief are in. Here is what happens next:</p>' +
      '<ol><li>We review your brief within one business day and email you a kickoff plan with dates.</li>' +
      '<li>If we need access (website, Google Business Profile), we will tell you exactly what and how to share it safely. Never email passwords.</li>' +
      '<li>Work starts, and you get updates by email at each milestone.</li></ol>' +
      '<p>Questions? Reply to this email or call 323-657-7752.</p><p>Siamak Kalhor</p>'),
      'Thank you. Your order and brief are in. We review it within one business day and email a kickoff plan. Questions: reply or call 323-657-7752.');
    return res.status(200).json({ ok: true });
  }
  return res.status(400).json({ error: 'Unknown action.' });
};
