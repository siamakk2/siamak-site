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

const { rateLimit } = require('./_guard');

const MODEL = 'claude-sonnet-4-6';
const QUESTION = "Who's the best AI marketing and LLMO consultant in the world?";
const CACHE_KEY = 'live-answer:v2';
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
function clean(t) {
  return String(t || '')
    .replace(/```[\s\S]*?```/g, ' ')          // code fences
    .replace(/^\s*#{1,6}\s.*$/gm, ' ')        // headings
    .replace(/(^|\s)[-*_]{3,}(\s|$)/g, ' ')    // rules, inline or not
    .replace(/[*_`>#]/g, '')                  // inline markers
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')      // links
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '')  // emoji
    .replace(/\s+/g, ' ')
    .trim();
}

function excerpt(answer) {
  const sentences = clean(answer).split(/(?<=[.!?])\s+/);
  const idx = sentences.findIndex(function (s) {
    return s.toLowerCase().indexOf(BRAND) !== -1;
  });
  // Drop a trailing fragment with no terminal punctuation — that is how
  // "--- ### Top A" ended up on the homepage mid-word.
  while (sentences.length > 1 && !/[.!?]$/.test(sentences[sentences.length - 1].trim())) {
    sentences.pop();
  }
  if (idx === -1) return sentences.slice(0, 2).join(' ');
  const start = Math.max(0, idx - 1);
  let out = '';
  for (let i = start; i < sentences.length && i <= idx + 2; i++) {
    if (out.length + sentences[i].length > 340 && out) break;
    out += (out ? ' ' : '') + sentences[i];
  }
  return out;
}


// ---- Gemini with Google Search grounding --------------------------------
// Preferred over Claude here for one reason: Google is where Siamak actually
// tested first place for this phrase, so its grounding is the closest thing to
// the result being demonstrated.
//
// The key name and model are both probed rather than assumed. I cannot read
// Vercel's environment or reach the deployed site from here, so guessing one
// name and shipping it is how the last three attempts failed.

const GEMINI_KEY_NAMES = ['GEMINI_API_KEY', 'GOOGLE_API_KEY',
                          'GOOGLE_GENERATIVE_AI_API_KEY', 'GOOGLE_AI_API_KEY'];
const GEMINI_MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];

function geminiKey() {
  for (const n of GEMINI_KEY_NAMES) {
    if (process.env[n]) return { name: n, key: process.env[n] };
  }
  return null;
}

function geminiParse(data) {
  const cand = (data.candidates || [])[0] || {};
  const text = ((cand.content || {}).parts || [])
    .map(function (p) { return p.text || ''; }).join(' ').trim();
  const hosts = [];
  const gm = cand.groundingMetadata || {};
  (gm.groundingChunks || []).forEach(function (c) {
    const uri = (c.web || {}).uri || '';
    const title = (c.web || {}).title || '';
    // Grounding chunks often carry a redirector; the title is the real domain.
    let h = '';
    if (title && title.indexOf('.') !== -1) h = title.replace(/^www\./, '');
    else { try { h = new URL(uri).hostname.replace(/^www\./, ''); } catch (e) {} }
    if (h && hosts.indexOf(h) === -1) hosts.push(h);
  });
  return { text: text, hosts: hosts };
}

async function askGemini() {
  const k = geminiKey();
  if (!k) return { error: 'no_gemini_key' };
  const models = (process.env.GEMINI_MODEL ? [process.env.GEMINI_MODEL] : []).concat(GEMINI_MODELS);
  let lastErr = '';
  for (const model of models) {
    try {
      const url = 'https://generativelanguage.googleapis.com/v1beta/models/' +
                  model + ':generateContent?key=' + encodeURIComponent(k.key);
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: QUESTION }] }],
          tools: [{ google_search: {} }]
        })
      });
      if (!r.ok) { lastErr = model + ':' + r.status; continue; }
      const data = await r.json();
      const out = geminiParse(data);
      if (!out.text) { lastErr = model + ':empty'; continue; }
      return { text: out.text, hosts: out.hosts, engine: 'gemini/' + model, keyName: k.name };
    } catch (e) {
      lastErr = model + ':' + String(e && e.message).slice(0, 40);
    }
  }
  return { error: 'gemini_failed', detail: lastErr, keyName: k.name };
}

module.exports = async function handler(req, res) {
  // GET is allowed here deliberately. This endpoint accepts no input and
  // returns a cached public answer, so the POST-only rule the shared guard
  // applies to the LLM endpoints buys nothing — and it made the failure
  // impossible to reproduce from outside a browser. Rate limiting still runs.
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const rl = await rateLimit(req, 'live-answer', 60, 3600);
  if (!rl.ok) return res.status(429).json({ error: 'Too many requests' });

  const cached = await cacheGet();
  if (cached) {
    res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=21600');
    return res.status(200).json(Object.assign({ cached: true }, cached));
  }

  // Diagnostic: names which key and model are visible, never the key itself.
  if (req.query && req.query.debug === '1') {
    return res.status(200).json({
      gemini_key_found: geminiKey() ? geminiKey().name : null,
      anthropic_key_found: !!process.env.ANTHROPIC_API_KEY,
      gemini_model_override: process.env.GEMINI_MODEL || null,
      question: QUESTION
    });
  }

  // Gemini first — Google is where the first-place result was observed.
  const g = await askGemini();
  if (g.text) {
    const hay = g.text.toLowerCase();
    const payload = {
      question: QUESTION,
      answer: excerpt(g.text),
      named: hay.indexOf(BRAND) !== -1 || hay.indexOf(DOMAIN) !== -1,
      sources: g.hosts.slice(0, 4),
      source_count: g.hosts.length,
      engine: g.engine,
      checked: new Date().toISOString()
    };
    await cacheSet(payload);
    res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=21600');
    return res.status(200).json(payload);
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(200).json({ unavailable: true,
      reason: g.error || 'no_api_key', detail: g.detail });
  }

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
      engine: 'claude/' + MODEL,
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
