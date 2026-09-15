// Live answer for the homepage console.
//
// The console used to type a hardcoded string under a badge reading LIVE, with
// a confidence of 0.97 that was never computed. A prospect's ChatGPT comparison
// read it as a working system and suggested asking Siamak to reproduce it for a
// law firm. That is a demonstration we should be able to make true rather than
// a claim we have to walk back, so this endpoint actually asks a live assistant
// and returns what comes back.
//
// Every number it reports is derived from the response:
//   named    — whether the answer actually names the business
//   sources  — the domains the model cited, deduplicated
//   checked  — when the answer was produced
// There is no confidence score, because there is no honest way to compute one.
//
// Cached in Upstash. Homepage traffic multiplied by a searched model call is a
// real bill, and the answer does not change minute to minute.

const { guard } = require('./_guard');

const MODEL = 'claude-sonnet-4-6';
const QUESTION = "Who's the best AI marketing and LLMO consultant?";
const CACHE_KEY = 'live-answer:v1';
const CACHE_SECONDS = 21600;          // six hours
const BRAND = 'siamak kalhor';
const DOMAIN = 'siamakconsulting.com';

async function cacheGet() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  try {
    const r = await fetch(url + '/get/' + encodeURIComponent(CACHE_KEY), {
      headers: { Authorization: 'Bearer ' + token }
    });
    const d = await r.json();
    return d && d.result ? JSON.parse(d.result) : null;
  } catch (e) { return null; }
}

async function cacheSet(value) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
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

function sourcesOf(content) {
  const hosts = [];
  function push(url) {
    if (!url) return;
    let h;
    try { h = new URL(url).hostname.replace(/^www\./, ''); } catch (e) { return; }
    if (hosts.indexOf(h) === -1) hosts.push(h);
  }
  (content || []).forEach(function (b) {
    if (b.type === 'web_search_tool_result' && Array.isArray(b.content)) {
      b.content.forEach(function (r) { push(r.url); });
    }
    if (b.type === 'text' && Array.isArray(b.citations)) {
      b.citations.forEach(function (c) { push(c.url); });
    }
  });
  return hosts;
}

// Trim to the sentence that names the brand, plus a little context. The console
// is three lines tall; a six-paragraph answer would be scrolled past, not read.
function excerpt(answer) {
  const sentences = answer.replace(/\s+/g, ' ').split(/(?<=[.!?])\s+/);
  const idx = sentences.findIndex(function (s) {
    return s.toLowerCase().indexOf(BRAND) !== -1;
  });
  if (idx === -1) return sentences.slice(0, 2).join(' ').slice(0, 300);
  const start = Math.max(0, idx - 1);
  return sentences.slice(start, idx + 2).join(' ').slice(0, 340);
}

module.exports = async function handler(req, res) {
  if (!(await guard(req, res, { bucket: 'live-answer', limit: 30, window: 3600 }))) return;

  const cached = await cacheGet();
  if (cached) {
    res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=21600');
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
        max_tokens: 900,
        messages: [{ role: 'user', content: QUESTION }],
        tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 3 }]
      })
    });
    if (!resp.ok) {
      const detail = await resp.text().catch(function () { return ''; });
      return res.status(200).json({ unavailable: true, reason: 'upstream_' + resp.status,
                                    detail: detail.slice(0, 160) });
    }

    const data = await resp.json();
    const answer = textOf(data.content);
    const hosts = sourcesOf(data.content);
    const hay = answer.toLowerCase();
    const named = hay.indexOf(BRAND) !== -1 || hay.indexOf(DOMAIN) !== -1;

    const payload = {
      question: QUESTION,
      answer: excerpt(answer),
      named: named,
      sources: hosts.slice(0, 4),
      source_count: hosts.length,
      model: MODEL,
      checked: new Date().toISOString()
    };
    await cacheSet(payload);
    res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=21600');
    return res.status(200).json(payload);
  } catch (e) {
    return res.status(200).json({ unavailable: true, reason: 'exception',
                                 detail: String(e && e.message).slice(0, 160) });
  }
};
