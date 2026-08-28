const { guard } = require('./_guard');
// Leads API — saves audit leads (name, email, business URL) to Upstash,
// then emails the lead their AI Visibility Report, branded
// Siamak Kalhor Consulting (sent via Resend, same service as k2-contact).
// Email failures never block the lead save.
// Resend keys pasted from a browser sometimes arrive with newlines or extra
// text attached, which makes fetch() throw 'invalid header value' before the
// request is ever sent. Extract the first well-formed key and ignore the rest.
function resendKey() {
  const raw = process.env.RESEND_API_KEY || '';
  const m = String(raw).match(/re_[A-Za-z0-9_-]{10,}/);
  return m ? m[0] : '';
}

module.exports = async function handler(req, res) {
  if (!(await guard(req, res, { bucket: 'leads', limit: 20, window: 3600 }))) return;

  try {
    const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
    const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch(e){ body={}; } }
    if (!body || typeof body !== 'object') body = {};

    const lead = body.lead || {};
    if (!lead.email) { return res.status(200).json({ ok: false, error: 'No email provided.' }); }

    // --- 1) Save lead to Upstash (same key as before) ---
    let saved = false;
    if (REDIS_URL && REDIS_TOKEN) {
      try {
        const entry = JSON.stringify({
          name: lead.name || '',
          email: lead.email || '',
          url: lead.url || '',
          businessName: lead.businessName || '',
          version: lead.version || '',
          ts: lead.ts || new Date().toISOString()
        });
        const r = await fetch(`${REDIS_URL}/rpush/orchamind_leads/${encodeURIComponent(entry)}`, {
          headers: { Authorization: `Bearer ${REDIS_TOKEN}` }
        });
        await r.json();
        saved = true;
      } catch (e) { console.error('Lead save failed:', e && e.message); }
    } else {
      // Local storage not configured — forward the lead to the Orchamind
      // project's leads API (same owner) so no lead is ever lost.
      try {
        const r = await fetch('https://orchamind.com/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'saveLead', lead })
        });
        const d = await r.json().catch(() => ({}));
        saved = !!(d && d.ok);
      } catch (e) { console.error('Lead forward failed:', e && e.message); }
    }

    // --- 2) Email the report to the lead (Siamak Kalhor Consulting branding) ---
    let emailed = false;
    let emailReason = null;
    const key = resendKey();
    const report = body.report;
    if (!key) emailReason = (process.env.RESEND_API_KEY || '').trim()
      ? 'malformed_RESEND_API_KEY (contains newlines or extra text — re-paste the key alone)'
      : 'missing_RESEND_API_KEY';
    else if (!report || typeof report !== 'object') emailReason = 'no_report_in_payload';
    if (key && report && typeof report === 'object') {
      try {
        const esc = s => String(s == null ? '' : s)
          .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
        const firstName = String(lead.name || '').trim().split(/\s+/)[0] || 'there';
        const biz = report.business_name || lead.businessName || lead.url || 'your business';
        const overall = Number.isFinite(report.overall_score) ? report.overall_score : null;

        const scoreColor = s => s >= 75 ? '#1FA463' : s >= 50 ? '#F9A825' : '#E53935';
        const PILLARS = [
          ['seo', 'SEO — How Google Reads You'],
          ['llmo', 'LLMO — How AI Assistants See You'],
          ['positioning', 'Positioning & Messaging'],
          ['content', 'Content & Trust Signals']
        ];

        let pillarRows = '';
        let pillarText = '';
        for (const [k, label] of PILLARS) {
          const p = report.scores && report.scores[k];
          if (!p) continue;
          const sc = Number.isFinite(p.score) ? p.score : '—';
          const fixes = Array.isArray(p.fixes) ? p.fixes : [];
          pillarRows +=
            '<tr><td style="padding:14px 0;border-top:1px solid #e8e8ef;vertical-align:top;">' +
            '<div style="font-weight:700;color:#101223;font-size:15px;">' + esc(label) + '</div>' +
            '<div style="color:#555a72;font-size:13.5px;line-height:1.6;margin-top:4px;">' + esc(p.summary || '') + '</div>' +
            (fixes.length ? '<ul style="margin:8px 0 0;padding-left:18px;color:#3c405a;font-size:13px;line-height:1.7;">' +
              fixes.map(f => '<li>' + esc(f) + '</li>').join('') + '</ul>' : '') +
            '</td><td style="padding:14px 0 14px 16px;border-top:1px solid #e8e8ef;vertical-align:top;text-align:right;white-space:nowrap;">' +
            '<span style="display:inline-block;min-width:44px;padding:6px 10px;border-radius:8px;font-weight:800;font-size:15px;color:#fff;background:' +
            (Number.isFinite(p.score) ? scoreColor(p.score) : '#9aa0b5') + ';">' + esc(sc) + '</span></td></tr>';
          pillarText += '\n' + label + ': ' + sc + '/100\n' + (p.summary || '') + '\n' +
            fixes.map(f => '  - ' + f).join('\n') + '\n';
        }

        const wins = Array.isArray(report.quick_wins) ? report.quick_wins : [];
        const winsHtml = wins.length
          ? '<h3 style="font-family:Georgia,serif;color:#101223;font-size:17px;margin:26px 0 8px;">Do these first</h3>' +
            '<ol style="margin:0;padding-left:20px;color:#3c405a;font-size:14px;line-height:1.8;">' +
            wins.map(w => '<li>' + esc(w) + '</li>').join('') + '</ol>'
          : '';

        const subject = 'Your AI Visibility Report — ' + biz;
        const html =
          '<div style="max-width:640px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;color:#101223;">' +
          '<div style="padding:22px 0;border-bottom:3px solid #101223;">' +
          '<div style="font-size:19px;font-weight:800;letter-spacing:.2px;">Siamak Kalhor Consulting</div>' +
          '<div style="font-size:12px;color:#555a72;letter-spacing:.12em;text-transform:uppercase;margin-top:3px;">AI Visibility Report</div>' +
          '</div>' +
          '<p style="font-size:15px;line-height:1.7;margin:22px 0 6px;">Hi ' + esc(firstName) + ',</p>' +
          '<p style="font-size:15px;line-height:1.7;margin:0 0 18px;">Here is the full AI Visibility Report for <b>' + esc(biz) + '</b>' +
          (report.host ? ' (' + esc(report.host) + ')' : '') + ', as promised.</p>' +
          (overall !== null ?
            '<div style="background:#f4f5fa;border:1px solid #e2e4ee;border-radius:14px;padding:20px 24px;text-align:center;">' +
            '<div style="font-size:44px;font-weight:800;color:' + scoreColor(overall) + ';">' + overall + '<span style="font-size:20px;color:#9aa0b5;">/100</span></div>' +
            '<div style="font-size:14px;color:#3c405a;font-weight:600;margin-top:2px;">' + esc(report.grade_label || '') + '</div>' +
            (report.headline ? '<div style="font-size:13.5px;color:#555a72;margin-top:8px;line-height:1.6;">' + esc(report.headline) + '</div>' : '') +
            '</div>' : '') +
          '<table style="width:100%;border-collapse:collapse;margin-top:8px;">' + pillarRows + '</table>' +
          winsHtml +
          '<div style="margin:30px 0;background:#101223;border-radius:14px;padding:24px;text-align:center;">' +
          '<div style="color:#fff;font-size:16px;font-weight:700;">Want these fixes done for you?</div>' +
          '<div style="color:#b9bdd2;font-size:13.5px;margin:6px 0 14px;line-height:1.6;">This is exactly what I do — making businesses visible to Google and to AI assistants like ChatGPT, Gemini, and Claude.</div>' +
          '<a href="https://siamakconsulting.com/contact-us" style="display:inline-block;background:#fff;color:#101223;font-weight:700;font-size:14px;padding:12px 26px;border-radius:100px;text-decoration:none;">Book a call with Siamak</a>' +
          '<div style="color:#b9bdd2;font-size:13px;margin-top:12px;">or call / text <b style="color:#fff;">(323) 657-7752</b></div>' +
          '</div>' +
          '<div style="border-top:1px solid #e8e8ef;padding:16px 0;color:#9aa0b5;font-size:12px;line-height:1.7;">' +
          'Siamak Kalhor Consulting · Los Angeles · <a href="https://siamakconsulting.com" style="color:#555a72;">siamakconsulting.com</a><br>' +
          'You received this because you requested your free report at siamakconsulting.com/audit. We won\'t spam you.' +
          '</div></div>';

        const text =
          'Siamak Kalhor Consulting — AI Visibility Report\n\n' +
          'Hi ' + firstName + ',\n\nHere is the full AI Visibility Report for ' + biz +
          (report.host ? ' (' + report.host + ')' : '') + '.\n\n' +
          (overall !== null ? 'OVERALL SCORE: ' + overall + '/100 — ' + (report.grade_label || '') + '\n' : '') +
          (report.headline ? report.headline + '\n' : '') +
          pillarText +
          (wins.length ? '\nDO THESE FIRST:\n' + wins.map((w,i) => (i+1) + '. ' + w).join('\n') + '\n' : '') +
          '\nWant these fixes done for you? Book a call: https://siamakconsulting.com/contact-us\n' +
          'Call/text: (323) 657-7752\n\nSiamak Kalhor Consulting · siamakconsulting.com';

        const from = process.env.AUDIT_FROM_EMAIL || 'Siamak Kalhor Consulting <onboarding@resend.dev>';
        // resend.dev is a sandbox sender: it can only deliver to the address on
        // the Resend account, so every lead email 403s. Flag it rather than
        // failing silently.
        const usingSandbox = /@resend\.dev/i.test(from);
        const to = [String(lead.email).trim()];
        const notify = process.env.AUDIT_NOTIFY_EMAIL; // optional copy to Siamak

        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 15000);
        const r = await fetch('https://api.resend.com/emails', {
          method: 'POST', signal: ctrl.signal,
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key },
          body: JSON.stringify(Object.assign(
            { from, to, subject, text, html },
            notify ? { bcc: [notify] } : {}
          ))
        });
        clearTimeout(timer);
        if (r.ok) { emailed = true; }
        else {
          const detail = await r.text().catch(() => '');
          let msg = '';
          try { msg = (JSON.parse(detail) || {}).message || ''; } catch (e) { msg = detail.slice(0, 200); }
          emailReason = 'resend_' + r.status + (msg ? ': ' + msg.slice(0, 180) : '');
          if (usingSandbox) {
            emailReason += ' | AUDIT_FROM_EMAIL is unset, so the sender is the resend.dev sandbox, ' +
              'which can only deliver to the address on the Resend account. Set AUDIT_FROM_EMAIL to an ' +
              'address on a domain verified at resend.com/domains.';
          }
          console.error('Report email failed', r.status, detail.slice(0, 300));
        }
      } catch (e) { emailReason = 'exception: ' + (e && e.message); console.error('Report email error:', e && e.message); }
    }

    return res.status(200).json({ ok: saved || emailed, saved, emailed, emailReason });
  } catch (err) {
    return res.status(200).json({ ok: false, error: err.message });
  }
};
