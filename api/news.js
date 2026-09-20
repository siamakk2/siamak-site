// AI marketing and advertising news, compiled automatically.
//
// A hand-maintained news page is a promise you have to keep every week, and a
// stale one is worse than none — on a site selling AI visibility, a "latest
// news" list three weeks old says something unfortunate about the author. So
// this compiles itself.
//
// Every item carries a source domain and a link, because the value is the
// pointer, not the paraphrase, and because a summary of something the reader
// cannot check is worth very little. Items are deliberately short: this page
// exists to tell you what happened and where to read it, not to replace it.
//
// Cached 18 hours. The news does not move faster than that and a searched model
// call on every page view would be a genuine bill.

const { rateLimit } = require('./_guard');

const MODEL = 'claude-sonnet-4-6';
const CACHE_KEY = 'ai-marketing-news:v1';
const CACHE_SECONDS = 64800;             // 18 hours

const PROMPT = `Find the most significant developments in AI marketing and advertising from the last 14 days.

Focus on things that change what a marketer or business owner should actually do: advertising platforms, AI search and assistant behaviour, measurement, regulation, and major product launches from OpenAI, Google, Anthropic, Meta, Perplexity or the large martech vendors.

Return ONLY a JSON array, no preamble and no markdown fences. Between 5 and 8 objects, each:
{"headline": "one factual sentence, max 90 chars",
 "summary": "2 sentences on what happened and why it matters to a business. No hype.",
 "source": "publisher name",
 "url": "direct link to the primary source",
 "date": "YYYY-MM-DD"}

Rules: prefer primary sources (company announcements, official docs) over aggregators. Do not invent a URL — if you cannot cite one, omit the item. Do not include opinion pieces or listicles. Order newest first.`;

async function cacheGet() {
  const url = process.env.UPSTASH_REDIS_REST_URL, token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  try {
    const r = await fetch(url + '/get/' + encodeURIComponent(CACHE_KEY),
                          { headers: { Authorization: 'Bearer ' + token } });
    const d = await r.json();
    return d && d.result ? JSON.parse(d.result) : null;
  } catch (e) { return null; }
}

async function cacheSet(value) {
  const url = process.env.UPSTASH_REDIS_REST_URL, token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return;
  try {
    await fetch(url + '/set/' + encodeURIComponent(CACHE_KEY) + '?EX=' + CACHE_SECONDS, {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'text/plain' },
      body: JSON.stringify(value)
    });
  } catch (e) {}
}

function textOf(content) {
  return (content || []).filter(function (b) { return b.type === 'text'; })
    .map(function (b) { return b.text; }).join('\n').trim();
}

// Models wrap JSON in prose or fences often enough that this is not optional.
function parseItems(raw) {
  let t = String(raw || '').replace(/```(?:json)?/g, '').trim();
  const a = t.indexOf('['), b = t.lastIndexOf(']');
  if (a === -1 || b === -1 || b < a) return [];
  let arr;
  try { arr = JSON.parse(t.slice(a, b + 1)); } catch (e) { return []; }
  if (!Array.isArray(arr)) return [];

  return arr.filter(function (it) {
    // An item without a checkable link is exactly what this page must not print.
    if (!it || !it.headline || !it.url) return false;
    try {
      const u = new URL(it.url);
      return u.protocol === 'https:' || u.protocol === 'http:';
    } catch (e) { return false; }
  }).map(function (it) {
    let host = '';
    try { host = new URL(it.url).hostname.replace(/^www\./, ''); } catch (e) {}
    return {
      headline: String(it.headline).slice(0, 140),
      summary: String(it.summary || '').slice(0, 420),
      source: String(it.source || host).slice(0, 60),
      host: host,
      url: it.url,
      date: /^\d{4}-\d{2}-\d{2}$/.test(String(it.date || '')) ? it.date : null
    };
  }).slice(0, 8);
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const rl = await rateLimit(req, 'news', 60, 3600);
  if (!rl.ok) return res.status(429).json({ error: 'Too many requests' });

  const cached = await cacheGet();
  if (cached && cached.items && cached.items.length) {
    res.setHeader('Cache-Control', 'public, s-maxage=21600, stale-while-revalidate=86400');
    return res.status(200).json(Object.assign({ cached: true }, cached));
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(200).json({ unavailable: true, reason: 'no_api_key' });

  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 2600,
        messages: [{ role: 'user', content: PROMPT }],
        tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 6 }]
      })
    });
    if (!resp.ok) {
      const detail = await resp.text().catch(function () { return ''; });
      // Serve stale rather than nothing — an old item with a date on it is
      // honest; an empty page is just broken.
      if (cached) return res.status(200).json(Object.assign({ cached: true, stale: true }, cached));
      return res.status(200).json({ unavailable: true, reason: 'upstream_' + resp.status,
                                    detail: detail.slice(0, 160) });
    }
    const data = await resp.json();
    const items = parseItems(textOf(data.content));
    if (!items.length) {
      if (cached) return res.status(200).json(Object.assign({ cached: true, stale: true }, cached));
      return res.status(200).json({ unavailable: true, reason: 'no_items' });
    }
    const payload = { items: items, compiled: new Date().toISOString(), model: MODEL };
    await cacheSet(payload);
    res.setHeader('Cache-Control', 'public, s-maxage=21600, stale-while-revalidate=86400');
    return res.status(200).json(payload);
  } catch (e) {
    if (cached) return res.status(200).json(Object.assign({ cached: true, stale: true }, cached));
    return res.status(200).json({ unavailable: true, reason: 'exception',
                                  detail: String(e && e.message).slice(0, 160) });
  }
};
