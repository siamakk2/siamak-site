// Contact form handler for siamakconsulting.com — forwards enquiries to
// info@siamakconsulting.com via Resend.
//
// Replaces the broken formspree.io/f/YOUR_FORM_ID placeholder that both the
// homepage scan form and /contact were posting to. That placeholder was never
// filled in, so every submission failed silently and no lead was captured.
//
// Modelled on api/k2-contact.js, which is the proven pattern in this repo.
//
// Env:
//   RESEND_API_KEY      required for delivery (already set on this project)
//   CONTACT_TO_EMAIL    optional override, defaults to info@siamakconsulting.com
//   CONTACT_FROM_EMAIL  optional override. Until siamakconsulting.com is a
//                       verified sending domain in Resend, this falls back to
//                       Resend's shared onboarding sender, which has poor
//                       deliverability. Verify the domain and set this.
//
// Never returns a non-200 for a delivery failure: the front end needs a JSON
// body carrying the mailto fallback so a real person's enquiry is never lost
// just because an API was down.

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  const TO = process.env.CONTACT_TO_EMAIL || 'info@siamakconsulting.com';

  try {
    let b = req.body;
    if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = {}; } }
    if (!b || typeof b !== 'object') b = {};

    const clean = (v, max) => String(v == null ? '' : v).slice(0, max || 400).trim();
    const name = clean(b.name, 120);
    const email = clean(b.email, 160);
    const phone = clean(b.phone, 60);
    const company = clean(b.company, 200);   // real field on this form
    const goal = clean(b.goal, 400);         // "what do you want AI to say about you"
    const message = clean(b.message, 4000);
    const source = clean(b.source, 80) || 'website';

    if (!name || !email) {
      return res.status(400).json({ ok: false, error: 'Please include your name and email.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ ok: false, error: 'That email address does not look valid.' });
    }
    // Honeypot. Bots fill hidden fields; humans never see this one.
    // NOTE: k2-contact uses `company` as its honeypot. This form collects a
    // real company name, so the trap field here is `website_url` instead.
    if (clean(b.website_url, 100)) return res.status(200).json({ ok: true });

    const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const subject = 'Website enquiry — ' + name + (company ? ' (' + company + ')' : '');

    const text =
      'New enquiry from siamakconsulting.com\n\n' +
      'Name:     ' + name + '\n' +
      'Email:    ' + email + '\n' +
      'Phone:    ' + (phone || '-') + '\n' +
      'Company:  ' + (company || '-') + '\n' +
      'Source:   ' + source + '\n' +
      (goal ? '\nWants AI to say:\n' + goal + '\n' : '') +
      (message ? '\nMessage:\n' + message + '\n' : '');

    const row = (label, value) =>
      '<tr><td style="padding:4px 14px 4px 0;color:#666">' + label + '</td><td>' + value + '</td></tr>';

    const html =
      '<h2 style="font-family:Georgia,serif">New enquiry from siamakconsulting.com</h2>' +
      '<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">' +
      row('Name', '<b>' + esc(name) + '</b>') +
      row('Email', '<a href="mailto:' + esc(email) + '">' + esc(email) + '</a>') +
      row('Phone', esc(phone || '-')) +
      row('Company', esc(company || '-')) +
      row('Source', esc(source)) +
      '</table>' +
      (goal
        ? '<hr style="border:none;border-top:1px solid #ddd;margin:18px 0">' +
          '<p style="font-family:Arial,sans-serif;font-size:13px;color:#666;margin:0 0 6px">' +
          'What they want AI to say about them</p>' +
          '<p style="font-family:Arial,sans-serif;font-size:14px;line-height:1.7;white-space:pre-wrap">' +
          esc(goal) + '</p>'
        : '') +
      (message
        ? '<hr style="border:none;border-top:1px solid #ddd;margin:18px 0">' +
          '<p style="font-family:Arial,sans-serif;font-size:14px;line-height:1.7;white-space:pre-wrap">' +
          esc(message) + '</p>'
        : '');

    const mailtoFallback =
      'mailto:' + TO + '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(text);

    const key = process.env.RESEND_API_KEY;
    if (!key) {
      return res.status(200).json({
        ok: false, fallback: true,
        error: 'Email delivery is not configured yet.',
        mailto: mailtoFallback
      });
    }

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 15000);
    let r;
    try {
      r = await fetch('https://api.resend.com/emails', {
        method: 'POST', signal: ctrl.signal,
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || 'Siamak Kalhor Consulting <onboarding@resend.dev>',
          to: [TO], reply_to: email, subject, text, html
        })
      });
    } finally {
      clearTimeout(timer);
    }

    if (!r.ok) {
      const detail = await r.text().catch(() => '');
      console.error('Resend error', r.status, detail.slice(0, 300));
      return res.status(200).json({
        ok: false, fallback: true,
        error: 'We could not send that automatically.',
        mailto: mailtoFallback
      });
    }
    return res.status(200).json({ ok: true });

  } catch (err) {
    console.error('contact failure:', err && err.message);
    return res.status(200).json({
      ok: false, fallback: true,
      error: 'Something went wrong on our end.',
      mailto: 'mailto:' + TO
    });
  }
};
