const { guard } = require('./_guard');

// Booking requests.
//
// Deliberately request-and-confirm rather than instant booking. Without a live
// calendar connection nothing here can know whether a slot is genuinely free,
// and a page that says "confirmed" and then double-books is worse than one that
// says "requested" and means it. The visitor is told plainly which it is.
//
// Availability is stated in one place, below, so the page and the validation
// can never disagree about what is bookable.

const TZ_LABEL = 'Pacific Time';

// 0 = Sunday. Weekday mornings, plus Monday, Wednesday and Friday evenings.
const SLOTS_BY_DAY = {
  1: ['08:00', '17:00'],
  2: ['08:00'],
  3: ['08:00', '17:00'],
  4: ['08:00'],
  5: ['08:00', '17:00']
};

function label(time) {
  const h = parseInt(time.slice(0, 2), 10);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return hour12 + ':' + time.slice(3) + ' ' + suffix;
}

// Valid dates are the next 21 days, excluding weekends and anything in the past.
function isBookable(dateStr, time) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const d = new Date(dateStr + 'T12:00:00Z');
  if (isNaN(d)) return false;
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const days = Math.round((d - today) / 86400000);
  if (days < 0 || days > 21) return false;
  const slots = SLOTS_BY_DAY[d.getUTCDay()];
  return !!slots && slots.indexOf(time) !== -1;
}

function esc(t) {
  return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
  });
}

module.exports = async function handler(req, res) {
  if (!(await guard(req, res, { bucket: 'book', limit: 8, window: 3600 }))) return;

  try {
    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
    if (!body || typeof body !== 'object') body = {};

    const name = String(body.name || '').trim().slice(0, 120);
    const email = String(body.email || '').trim().slice(0, 160);
    const phone = String(body.phone || '').trim().slice(0, 40);
    const company = String(body.company || '').trim().slice(0, 160);
    const about = String(body.about || '').trim().slice(0, 2000);
    const date = String(body.date || '').trim();
    const time = String(body.time || '').trim();

    if (!name) return res.status(200).json({ error: 'Please enter your name.' });
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return res.status(200).json({ error: 'Please enter a valid email address.' });
    }
    if (!isBookable(date, time)) {
      return res.status(200).json({ error: 'That time is not available. Please pick another slot.' });
    }

    const when = new Date(date + 'T12:00:00Z').toLocaleDateString('en-US',
      { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' });
    const slot = when + ' at ' + label(time) + ' ' + TZ_LABEL;

    const key = process.env.RESEND_API_KEY;
    const TO = process.env.CONTACT_TO_EMAIL || 'siamakk2@gmail.com';
    const FROM = process.env.CONTACT_FROM_EMAIL ||
                 'Siamak Kalhor Consulting <onboarding@resend.dev>';

    const mailto = 'mailto:' + TO +
      '?subject=' + encodeURIComponent('Session request: ' + slot) +
      '&body=' + encodeURIComponent(
        'Name: ' + name + '\nEmail: ' + email + '\nPhone: ' + phone +
        '\nCompany: ' + company + '\nRequested: ' + slot + '\n\n' + about);

    if (!key) return res.status(200).json({ ok: false, fallback: true, mailto: mailto });

    const text = 'Session request\n\n' + slot + '\n\nName: ' + name +
                 '\nEmail: ' + email + '\nPhone: ' + phone +
                 '\nCompany: ' + company + '\n\nWhat they want to cover:\n' + about;
    const html = '<h2>Session request</h2><p><strong>' + esc(slot) + '</strong></p>' +
      '<p>Name: ' + esc(name) + '<br>Email: ' + esc(email) +
      '<br>Phone: ' + esc(phone) + '<br>Company: ' + esc(company) + '</p>' +
      '<p><strong>What they want to cover</strong><br>' + esc(about).replace(/\n/g, '<br>') + '</p>';

    const ctrl = new AbortController();
    const timer = setTimeout(function () { ctrl.abort(); }, 15000);
    let r;
    try {
      r = await fetch('https://api.resend.com/emails', {
        method: 'POST', signal: ctrl.signal,
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key },
        body: JSON.stringify({ from: FROM, to: [TO], reply_to: email,
                               subject: 'Session request: ' + slot, text: text, html: html })
      });
    } finally { clearTimeout(timer); }

    if (!r.ok) {
      return res.status(200).json({ ok: false, fallback: true,
        error: 'We could not send that automatically.', mailto: mailto });
    }

    // Confirmation to the visitor. Sent second and not awaited for success —
    // the request already reached Siamak, so a failure here must not be
    // reported as a failure to book.
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key },
        body: JSON.stringify({
          from: FROM, to: [email], reply_to: TO,
          subject: 'Your session request — ' + slot,
          text: 'Thanks ' + name + ',\n\nYour request for ' + slot +
                ' has reached Siamak. You will get a confirmation, usually within one business day.\n\n' +
                'If the time no longer works, reply to this email.\n\n' +
                'Siamak Kalhor Consulting\n323-657-7752\nsiamakconsulting.com'
        })
      });
    } catch (e) {}

    return res.status(200).json({ ok: true, slot: slot });
  } catch (err) {
    return res.status(200).json({
      ok: false,
      error: 'Something went wrong. Please call 323-657-7752.'
    });
  }
};
