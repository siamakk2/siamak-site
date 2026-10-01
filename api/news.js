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
// Shipped with the deployment. Serving slightly dated but verified items beats
// rendering "the feed could not be refreshed", which is what a visitor saw
// whenever a live compile failed and no cache was warm.
let FALLBACK = null;
try { FALLBACK = require('./news-fallback.json'); } catch (e) { FALLBACK = null; }

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

Rules, all of which matter:
- The url must point at the specific article or announcement about THAT item, not a blog index, category page or roundup. If you only have an index page, omit the item.
- Never use the same url for two different items. Each item needs its own source.
- Prefer the primary source: the company's own announcement, official documentation, a regulator's press release, or a court filing, over any publication reporting on it.
- Finish every sentence. A summary must end with a full stop, not mid-clause.
- No opinion pieces, listicles or vendor marketing.
- Order newest first.

Accuracy rules. Each of these was written after this feed got it wrong, so
treat them as hard constraints rather than style guidance:

- NUMBERS: state what the number counts, and never attach a figure to a noun
  the source did not attach it to. A document can contain two real numbers —
  the size of a network and the number of participants in a programme, total
  eligible merchants and merchants actually using something, an annualised
  run rate and revenue. Reaching for the larger one produced a claim here
  that a programme would train a million businesses when the document said a
  thousand. If two readings are possible, use the smaller and more specific.

- OBLIGATION: never write that anyone must, is required to, or will face
  penalties unless the source says so in those terms. Distinguish explicitly
  between a thing that is optional and a thing that is mandatory, even when
  they appear in the same document. A set of icons published to help with
  compliance is not itself a compliance requirement.

- WHO IT BINDS: name the party the source names. A regulator acting on
  platforms is not acting on advertisers. An order binding government
  agencies is not binding private companies. Do not broaden the audience to
  make an item feel more relevant.

- NO ADVICE: report what happened. Do not add what readers should do,
  prepare for, or expect next unless the source states it. Invented guidance
  attached to a real regulatory item is the most damaging failure here.

- ONE ANNOUNCEMENT PER ITEM: do not merge two announcements into one, even
  from the same company on adjacent days, and even when they are related.
  Two posts means two items, or pick the more significant one.

- AVAILABILITY: if the source gives no price, release date or eligibility,
  the summary must not imply the thing is generally available.

Before returning, re-read each summary against these rules and fix any that
fail. Prefer a duller summary that is exactly right.`;

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

// Writes the compiled feed, then sets the TTL as a SEPARATE call using path
// segments — the same shape _guard.js uses against this same Upstash instance,
// which is known to work.
//
// The previous version passed the expiry as "?EX=" on the SET URL and swallowed
// every error with an empty catch. The write was failing and nothing said so,
// so the cache was permanently empty: each visitor triggered a fresh ~17s
// compile, the page gave up before it finished and showed "the feed could not
// be refreshed", and every page view burned a model call. A cache that fails
// silently is worse than no cache, because it looks like it is working.
//
// Returns a short status string so ?debug=1 can report whether the write stuck.
async function cacheSet(value) {
  const url = process.env.UPSTASH_REDIS_REST_URL, token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return 'no_upstash_env';
  try {
    const r = await fetch(url + '/set/' + encodeURIComponent(CACHE_KEY), {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'text/plain' },
      body: JSON.stringify(value)
    });
    if (!r.ok) return 'set_http_' + r.status;
    const d = await r.json().catch(function () { return null; });
    if (!d || d.result !== 'OK') return 'set_unexpected:' + JSON.stringify(d).slice(0, 60);

    const e = await fetch(url + '/expire/' + encodeURIComponent(CACHE_KEY) + '/' + CACHE_SECONDS,
                          { headers: { Authorization: 'Bearer ' + token } });
    if (!e.ok) return 'stored_but_no_ttl_' + e.status;
    return 'ok';
  } catch (err) {
    return 'set_exception:' + String(err && err.message).slice(0, 60);
  }
}

// Writes and reads back a disposable key. Used only by ?debug=1.
async function cacheProbe() {
  const url = process.env.UPSTASH_REDIS_REST_URL, token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return 'no_upstash_env';
  const k = 'news:probe:' + Date.now();
  try {
    const w = await fetch(url + '/set/' + encodeURIComponent(k), {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'text/plain' },
      body: 'probe'
    });
    if (!w.ok) return 'write_http_' + w.status;
    await fetch(url + '/expire/' + encodeURIComponent(k) + '/60',
                { headers: { Authorization: 'Bearer ' + token } }).catch(function () {});
    const r = await fetch(url + '/get/' + encodeURIComponent(k),
                          { headers: { Authorization: 'Bearer ' + token } });
    if (!r.ok) return 'read_http_' + r.status;
    const d = await r.json();
    return (d && d.result === 'probe') ? 'ok' : 'read_back_mismatch:' + JSON.stringify(d).slice(0, 60);
  } catch (e) { return 'exception:' + String(e && e.message).slice(0, 60); }
}

function textOf(content) {
  return (content || []).filter(function (b) { return b.type === 'text'; })
    .map(function (b) { return b.text; }).join('\n').trim();
}

// Models wrap JSON in prose or fences often enough that this is not optional.
// A summary ending "against the framew" reads as broken software, which on this
// page is worse than a shorter summary. Trim at the last sentence that fits, or
// failing that at a word boundary with an ellipsis.
function trimSummary(t) {
  const s = String(t || '').replace(/\s+/g, ' ').trim();
  if (s.length <= 400) return s;
  const window = s.slice(0, 398);
  for (const stop of ['. ', '? ', '! ']) {
    const i = window.lastIndexOf(stop);
    if (i > 160) return s.slice(0, i + 1);
  }
  return window.slice(0, window.lastIndexOf(' ')).replace(/[,;:\-–—]$/, '') + '\u2026';
}

// Language that asserts a duty, a penalty, or advice the source probably did
// not give. Deliberately narrow: it should catch "advertisers must now" and
// "brands should prepare for", not ordinary reporting.
const OBLIGATION_RE = new RegExp([
  '\\b(must|required to|mandatory|obligated|liable)\\b',
  '\\bface (?:penalties|fines|enforcement)\\b',
  '\\b(?:should|need to|will need to) (?:prepare|expect|brace|act|comply|review|audit)\\b',
  '\\bdeadline to comply\\b'
].join('|'), 'i');

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
      summary: trimSummary(it.summary),
      source: String(it.source || host).slice(0, 60),
      host: host,
      url: it.url,
      date: /^\d{4}-\d{2}-\d{2}$/.test(String(it.date || '')) ? it.date : null,
      // Asking the model not to assert obligations is necessary but not
      // sufficient, so flag it in code too. Items claiming someone must do
      // something, or telling readers to prepare for something, are the two
      // shapes that were wrong here before — both were regulatory items whose
      // sources said neither. The flag does not block the item; it marks it so
      // a human reads the source before quoting it anywhere that matters.
      review: OBLIGATION_RE.test(String(it.summary || '') + ' ' + String(it.headline || '')) || undefined
    };
  })
  // The prompt asks for one source per item; this enforces it. A blog index
  // credited for two unrelated stories is how a feed loses its credibility,
  // and asking a model nicely is not a control.
  .filter(function (it, i, all) {
    return all.findIndex(function (o) { return o.url === it.url; }) === i;
  })
  .slice(0, 8);
}


// ---- providers -----------------------------------------------------------
// Gemini first, because its key is the one present in this project and because
// Google Search grounding is well suited to finding recent news. Anthropic is
// the fallback. Key names and model names are probed rather than assumed — the
// same lesson as the live-answer endpoint, where guessing one name and shipping
// it cost three deploys.


// Every provider call is bounded. The function previously tried three Gemini
// models and then six Anthropic web searches, which ran past the function's own
// time limit; Vercel killed it mid-flight and the browser got nothing at all.
// A slow failure that still answers is fine. A hang is not.
function withDeadline(ms) {
  const ctrl = new AbortController();
  const timer = setTimeout(function () { ctrl.abort(); }, ms);
  return { signal: ctrl.signal, done: function () { clearTimeout(timer); } };
}

const GEMINI_KEY_NAMES = ['GEMINI_API_KEY', 'GOOGLE_API_KEY',
                          'GOOGLE_GENERATIVE_AI_API_KEY', 'GOOGLE_AI_API_KEY'];
// Fallback list only. Hard-coding model names is what broke this page: Google
// retired gemini-2.0-flash, every call 404'd, the cron failed silently four
// times a day and the page quietly served nothing. Names below are a last
// resort — discoverModels() asks Google what actually exists first.
const GEMINI_MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash'];

function geminiKey() {
  for (const n of GEMINI_KEY_NAMES) {
    if (process.env[n]) return { name: n, key: process.env[n] };
  }
  return null;
}

// Ask Google which models this key can actually call, so a retirement degrades
// to "use the next one" instead of "the feature is dead". Preference order:
// newest version first, flash over pro (cheaper and fast enough for this job).
async function discoverModels(key) {
  try {
    const dl = withDeadline(8000);
    let r;
    try {
      r = await fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' +
                      encodeURIComponent(key) + '&pageSize=100', { signal: dl.signal });
    } finally { dl.done(); }
    if (!r.ok) return [];
    const data = await r.json();
    return (data.models || [])
      .filter(function (m) {
        return (m.supportedGenerationMethods || []).indexOf('generateContent') !== -1;
      })
      .map(function (m) { return String(m.name || '').replace(/^models\//, ''); })
      .filter(function (n) { return /^gemini-/.test(n) && !/embedding|aqa|vision/i.test(n); })
      .sort(function (a, b) {
        const ver = function (s) { const m = s.match(/gemini-(\d+(?:\.\d+)?)/); return m ? parseFloat(m[1]) : 0; };
        if (ver(b) !== ver(a)) return ver(b) - ver(a);
        const flash = function (s) { return /flash/.test(s) ? 0 : 1; };
        if (flash(a) !== flash(b)) return flash(a) - flash(b);
        // Prefer plain names over dated or preview variants.
        const plain = function (s) { return /(preview|exp|\d{3,})/.test(s) ? 1 : 0; };
        return plain(a) - plain(b);
      })
      .slice(0, 4);
  } catch (e) { return []; }
}

async function askGemini() {
  const k = geminiKey();
  if (!k) return { error: 'no_gemini_key' };
  const discovered = await discoverModels(k.key);
  // Pinned override first, then whatever Google says exists, then the old list.
  const models = (process.env.GEMINI_MODEL ? [process.env.GEMINI_MODEL] : [])
    .concat(discovered)
    .concat(GEMINI_MODELS)
    .filter(function (m, i, a) { return m && a.indexOf(m) === i; });
  let last = '';
  for (const model of models) {
    try {
      const dl = withDeadline(55000);
      let r;
      try {
        r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' +
                        model + ':generateContent?key=' + encodeURIComponent(k.key), {
          method: 'POST', signal: dl.signal,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: PROMPT }] }],
            tools: [{ google_search: {} }]
          })
        });
      } finally { dl.done(); }
      if (!r.ok) { last += (last ? ' ' : '') + model + ':' + r.status; continue; }
      const data = await r.json();
      const cand = (data.candidates || [])[0] || {};
      const text = ((cand.content || {}).parts || [])
        .map(function (x) { return x.text || ''; }).join(' ').trim();
      if (!text) { last += (last ? ' ' : '') + model + ':empty'; continue; }
      return { text: text, engine: 'gemini/' + model };
    } catch (e) { last += (last ? ' ' : '') + model + ':' + String(e && e.message).slice(0, 40); }
  }
  // Every attempt, not just the last one. Reporting only the final failure hid
  // that the model before it had failed for a different reason.
  return { error: 'gemini_failed', detail: last, tried: models.length };
}

async function askAnthropic() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return { error: 'no_anthropic_key' };
  try {
    const dl = withDeadline(110000);
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST', signal: dl.signal,
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey,
                 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: MODEL, max_tokens: 2600,
        messages: [{ role: 'user', content: PROMPT }],
        tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 4 }]
      })
    });
    if (!resp.ok) {
      const d = await resp.text().catch(function () { return ''; });
      dl.done();
      return { error: 'anthropic_' + resp.status, detail: d.slice(0, 140) };
    }
    const data = await resp.json();
    dl.done();
    const text = textOf(data.content);
    if (!text) return { error: 'anthropic_empty', detail: 'model returned no text' };
    return { text: text, engine: 'claude/' + MODEL };
  } catch (e) {
    return { error: 'anthropic_exception', detail: String(e && e.message).slice(0, 140) };
  }
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

  // Diagnostic: which keys this deployment can see. Never the keys themselves.
  if (req.query && req.query.debug === '1') {
    return res.status(200).json({
      gemini_key_found: geminiKey() ? geminiKey().name : null,
      anthropic_key_found: !!process.env.ANTHROPIC_API_KEY,
      cached_items: cached && cached.items ? cached.items.length : 0,
      compiled: cached ? cached.compiled : null,
      upstash_env: !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN),
      // Round-trip probe: write a throwaway key and read it back, so this
      // endpoint can prove whether caching works rather than implying it.
      cache_roundtrip: await cacheProbe()
    });
  }

  const started = Date.now();
  let r = await askGemini();
  if (!r.text) {
    const first = r;
    // Only try the second provider if there is time left to hear the answer.
    r = (Date.now() - started < 120000) ? await askAnthropic()
        : { error: first.error || 'gemini_timeout', detail: 'no time for fallback' };
    if (!r.text) {
      if (cached) return res.status(200).json(Object.assign({ cached: true, stale: true }, cached));
      if (FALLBACK && FALLBACK.items && FALLBACK.items.length) {
        return res.status(200).json(Object.assign({ fallback: true, stale: true }, FALLBACK));
      }
      // Both providers failed. Report BOTH: the old code returned
      // "first.error || r.error", so the Gemini failure always won and the
      // fallback's real reason was never visible — which is why this page
      // looked like a Gemini problem for as long as it did.
      return res.status(200).json({ unavailable: true,
        reason: 'all_providers_failed',
        gemini: { error: first.error, detail: first.detail, tried: first.tried },
        anthropic: { error: r.error, detail: r.detail } });
    }
  }

  const items = parseItems(r.text);
  if (!items.length) {
    if (cached) return res.status(200).json(Object.assign({ cached: true, stale: true }, cached));
    if (FALLBACK && FALLBACK.items && FALLBACK.items.length) {
      return res.status(200).json(Object.assign({ fallback: true, stale: true }, FALLBACK));
    }
    return res.status(200).json({ unavailable: true, reason: 'no_items', engine: r.engine });
  }
  const payload = { items: items, compiled: new Date().toISOString(), engine: r.engine };
  const cacheStatus = await cacheSet(payload);
  if (cacheStatus !== 'ok') {
    // Loud in the logs. A cache that will not hold means every visitor pays
    // for a full recompile, which is the failure this page just had.
    console.error(JSON.stringify({ source: 'news', event: 'cache_write_failed',
                                   status: cacheStatus, at: new Date().toISOString() }));
  }
  res.setHeader('Cache-Control', 'public, s-maxage=21600, stale-while-revalidate=86400');
  return res.status(200).json(Object.assign({ cache: cacheStatus }, payload));
};
