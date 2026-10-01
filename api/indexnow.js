// IndexNow submission.
//
// Google does not participate in IndexNow. Bing does, and Bing's index is what
// feeds Copilot, so for a practice whose whole argument is being present in AI
// answers this is the one push mechanism that reaches an assistant directly.
// Yandex, Seznam and Naver read the same protocol. One POST notifies all of
// them; endpoints share submissions between each other.
//
// Verification is by key file: api.indexnow.org fetches keyLocation and
// expects the key back as the whole body. The file lives at the site root and
// is committed alongside this.
//
// This endpoint is deliberately not open. An unprotected submit URL is a way
// for a stranger to burn the daily quota, so it needs INDEXNOW_SECRET, and it
// is rate limited on top of that.

const { rateLimit } = require('./_guard');

const HOST = 'siamakconsulting.com';
const ORIGIN = 'https://' + HOST;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const MAX_URLS = 10000;              // protocol limit per submission
const KEY = process.env.INDEXNOW_KEY || '';
const SECRET = process.env.INDEXNOW_SECRET || '';

function withDeadline(ms) {
  const ctrl = new AbortController();
  const timer = setTimeout(function () { ctrl.abort(); }, ms);
  return { signal: ctrl.signal, done: function () { clearTimeout(timer); } };
}

// Reads the sitemap this deployment is actually serving, rather than keeping a
// second list of urls that would drift from it.
async function urlsFromSitemap(sinceDate) {
  const d = withDeadline(10000);
  try {
    const r = await fetch(ORIGIN + '/sitemap.xml', { signal: d.signal });
    if (!r.ok) return { error: 'sitemap_http_' + r.status };
    const xml = await r.text();
    const out = [];
    const blocks = xml.match(/<url>[\s\S]*?<\/url>/g) || [];
    for (const b of blocks) {
      const loc = (b.match(/<loc>([\s\S]*?)<\/loc>/) || [])[1];
      if (!loc) continue;
      const mod = ((b.match(/<lastmod>([\s\S]*?)<\/lastmod>/) || [])[1] || '').trim();
      // A date filter is the point of this: resubmitting every url on every
      // run is how a site teaches an endpoint to ignore it.
      if (sinceDate && !(mod && mod >= sinceDate)) continue;
      out.push(loc.trim());
    }
    return { urls: out.slice(0, MAX_URLS), total: blocks.length };
  } catch (e) {
    return { error: 'sitemap_fetch_failed', detail: String(e && e.message).slice(0, 140) };
  } finally { d.done(); }
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!KEY) return res.status(500).json({ error: 'INDEXNOW_KEY not configured' });
  if (!SECRET) return res.status(500).json({ error: 'INDEXNOW_SECRET not configured' });

  const given = (req.query && req.query.secret) || (req.body && req.body.secret) || '';
  if (given !== SECRET) return res.status(401).json({ error: 'Unauthorized' });

  const rl = await rateLimit(req, 'indexnow', 20, 3600);
  if (!rl.ok) return res.status(429).json({ error: 'Too many requests' });

  // ?since=YYYY-MM-DD submits only pages the sitemap says changed on or after
  // that date. Default is today, which is the normal case: deploy, then push
  // what the deploy touched.
  const since = (req.query && req.query.since) || new Date().toISOString().slice(0, 10);
  const all = (req.query && req.query.all) === '1';

  let urls;
  if (req.body && Array.isArray(req.body.urls) && req.body.urls.length) {
    urls = req.body.urls.filter(function (u) { return String(u).indexOf(ORIGIN) === 0; })
                        .slice(0, MAX_URLS);
  } else {
    const s = await urlsFromSitemap(all ? null : since);
    if (s.error) return res.status(502).json(s);
    urls = s.urls;
  }

  if (!urls.length) {
    return res.status(200).json({ submitted: 0, since: all ? 'all' : since,
                                  note: 'no urls matched; nothing sent' });
  }

  // Dry run, so the selection can be checked before anything is pushed.
  if (req.query && req.query.dry === '1') {
    return res.status(200).json({ dry_run: true, would_submit: urls.length,
                                  since: all ? 'all' : since, urls: urls });
  }

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: ORIGIN + '/' + KEY + '.txt',
    urlList: urls
  };

  const d = withDeadline(20000);
  try {
    const r = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
      signal: d.signal
    });
    const body = await r.text().catch(function () { return ''; });
    // 200 accepted, 202 accepted but key still being validated. Anything else
    // is reported as it came back rather than smoothed over.
    const ok = r.status === 200 || r.status === 202;
    if (!ok) {
      console.error(JSON.stringify({ source: 'indexnow', event: 'submit_failed',
                                     status: r.status, body: body.slice(0, 300),
                                     at: new Date().toISOString() }));
    }
    return res.status(ok ? 200 : 502).json({
      ok: ok,
      status: r.status,
      submitted: ok ? urls.length : 0,
      since: all ? 'all' : since,
      keyLocation: payload.keyLocation,
      response: body.slice(0, 300) || null,
      urls: urls
    });
  } catch (e) {
    return res.status(504).json({ error: 'indexnow_request_failed',
                                  detail: String(e && e.message).slice(0, 140) });
  } finally { d.done(); }
};
