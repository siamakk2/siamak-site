const { guard } = require('./_guard');

// Local AI Visibility check — by Siamak Kalhor Consulting.
//
// The website audit in audit.js answers "is this page structured so an
// assistant could cite it?" — an inference about capability. This asks the
// question a business owner actually has: when someone asks an assistant for a
// dentist in Sunland, does this business come back?
//
// It runs real prompts through Claude with live web search and records three
// things: whether the business is named, who was named instead, and which
// sources the model used to build its answer. The third is the useful one — if
// the answer came from Yelp and two city blogs and the client appears on
// neither, the fix is specific rather than a lecture about "authority".
//
// Deliberately does NOT touch the Google Business Profile API. That is a
// management surface for profiles you own, gated behind manual approval and a
// 60-day-old verified listing, and competitor lookups are outside its permitted
// use. Nothing here needs it.
//
// Honest about what it measures: this is Claude with web search, not ChatGPT.
// Adding another provider goes behind the same interface. Reporting a Claude
// result as "ChatGPT says" would be the kind of overclaim that costs an LLMO
// practice its credibility.

const MODEL = 'claude-sonnet-4-6';

// Prompt shapes a real person would type. Kept few and varied — more prompts
// cost more and mostly re-measure the same thing.
function buildPrompts(category, city, neighborhood) {
  const near = neighborhood || city;
  return [
    // Three, not six. Each is a searched call taking 15-30s; six run
    // sequentially exceeded Vercel's function limit and the endpoint died with
    // no error at all. Three run in parallel finish comfortably inside 120s,
    // and the extra three were mostly re-measuring the same thing.
    'What are the best ' + category + ' in ' + city + '?',
    'Who should I call for ' + category + ' near ' + near + '?',
    'Recommend a highly rated ' + category + ' in ' + city + '.'
  ];
}

// Loose match: assistants rarely echo a legal name exactly. Compare on
// alphanumerics so "Sunland Dental Care" matches "Sunland Dental".
function normalize(s) {
  return (s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

// Word-boundary match on the normalized strings, so "dental" does not match
// "dentalworks". Takes the category too: a business whose whole name is the
// category word ("Dental", "Plumbing") cannot be matched on name alone without
// reporting a false hit on any answer that happens to use the word. For those,
// only a domain match counts. A false positive here is worse than a miss — it
// tells an owner they are visible when they are not.
function containsPhrase(hay, needle) {
  if (!needle) return false;
  return (' ' + hay + ' ').indexOf(' ' + needle + ' ') !== -1;
}

function mentions(text, business, domain, category) {
  const hay = normalize(text);
  const name = normalize(business);
  const cat = normalize(category);

  if (domain) {
    const host = domain.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
    if (host && (text || '').toLowerCase().indexOf(host.toLowerCase()) !== -1) return true;
  }
  if (!name) return false;

  const words = name.split(' ').filter(Boolean);
  const distinctive = words.filter(function (w) {
    return w.length > 2 && !containsPhrase(cat, w);
  });

  // Nothing in the name that is not also the category: name matching would be
  // guesswork, so require the domain, which was already checked above.
  if (!distinctive.length) return false;

  if (containsPhrase(hay, name)) return true;

  // Allow a shortened reference ("Sunland Dental" for "Sunland Dental Care Inc")
  // but only when at least two words carry it.
  if (words.length >= 2) {
    const core = words.slice(0, 2).join(' ');
    if (containsPhrase(hay, core) && distinctive.length >= 1) return true;
  }
  return false;
}

// Pull the sources the model actually cited. These arrive as web_search_result
// blocks and as citations attached to text blocks; both are collected.
function collectSources(content) {
  const out = [];
  function push(url, title) {
    if (!url) return;
    let host = '';
    try { host = new URL(url).hostname.replace(/^www\./, ''); } catch (e) { return; }
    const existing = out.find(function (s) { return s.host === host; });
    if (existing) { existing.count += 1; return; }
    out.push({ host: host, url: url, title: title || '', count: 1 });
  }
  (content || []).forEach(function (block) {
    if (block.type === 'web_search_tool_result' && Array.isArray(block.content)) {
      block.content.forEach(function (r) { push(r.url, r.title); });
    }
    if (block.type === 'text' && Array.isArray(block.citations)) {
      block.citations.forEach(function (c) { push(c.url, c.title); });
    }
  });
  return out.sort(function (a, b) { return b.count - a.count; });
}

function textOf(content) {
  return (content || [])
    .filter(function (b) { return b.type === 'text'; })
    .map(function (b) { return b.text; })
    .join('\n')
    .trim();
}

async function askOne(apiKey, prompt) {
  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1200,
      messages: [{ role: 'user', content: prompt }],
      tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 4 }]
    })
  });
  if (!resp.ok) {
    const detail = await resp.text().catch(function () { return ''; });
    throw new Error('Search failed (' + resp.status + '): ' + detail.slice(0, 200));
  }
  return resp.json();
}


// ---- run history --------------------------------------------------------
// A single score is a snapshot and says little; the same prompts measured again
// later say a great deal. Storing each run is what turns this from a one-off
// lead magnet into something worth re-running every month.
//
// Keyed on business, category and city so the same business measured the same
// way lands in the same series. Twelve runs kept — a year of monthly checks.

function seriesKey(business, category, city) {
  const raw = [business, category, city].join('|').toLowerCase().replace(/[^a-z0-9|]+/g, '');
  let h = 5381;
  for (let i = 0; i < raw.length; i++) h = ((h << 5) + h + raw.charCodeAt(i)) >>> 0;
  return 'localaudit:hist:' + h.toString(36);
}

async function historyGet(key) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return [];
  try {
    const r = await fetch(url + '/get/' + encodeURIComponent(key),
                          { headers: { Authorization: 'Bearer ' + token } });
    const d = await r.json();
    const v = d && d.result ? JSON.parse(d.result) : [];
    return Array.isArray(v) ? v : [];
  } catch (e) { return []; }
}

async function historySet(key, runs) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return;
  try {
    await fetch(url + '/set/' + encodeURIComponent(key), {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'text/plain' },
      body: JSON.stringify(runs.slice(-12))
    });
  } catch (e) {}
}

// Same day counts as the same check — re-running twice in an afternoon should
// not read as movement.
function sameDay(a, b) { return String(a).slice(0, 10) === String(b).slice(0, 10); }

module.exports = async function handler(req, res) {
  // Lower limit than the site audit: each run makes several searched calls.
  // 40/hour, not 6: the prospecting tool runs a batch of twenty in one sitting
  // and a limit of six blocked it on the seventh. Still bounded — each run is
  // three searched model calls and this is not free.
  if (!(await guard(req, res, { bucket: 'local-audit', limit: 40, window: 3600 }))) return;

  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(200).json({ error: "The visibility check isn't set up yet. Please call Siamak at 323-657-7752." });
    }

    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
    if (!body || typeof body !== 'object') body = {};

    const business = (body.business || '').toString().trim();
    const category = (body.category || '').toString().trim();
    const city = (body.city || '').toString().trim();
    const neighborhood = (body.neighborhood || '').toString().trim();
    const website = (body.website || '').toString().trim();

    if (!business) return res.status(200).json({ error: 'Please enter the business name.' });
    if (!category) return res.status(200).json({ error: 'Please enter what the business does, for example "dentist" or "general contractor".' });
    if (!city) return res.status(200).json({ error: 'Please enter the city.' });

    const prompts = buildPrompts(category, city, neighborhood);

    // In parallel. Three concurrent calls is well within provider limits and
    // keeps the whole run inside the function timeout.
    const runs = await Promise.all(prompts.map(async function (prompt) {
      try {
        const data = await askOne(apiKey, prompt);
        const answer = textOf(data.content);
        return {
          prompt: prompt,
          mentioned: mentions(answer, business, website, category),
          answer: answer,
          sources: collectSources(data.content)
        };
      } catch (e) {
        return { prompt: prompt, error: e.message, mentioned: false, sources: [] };
      }
    }));

    const usable = runs.filter(function (r) { return !r.error; });
    const hits = usable.filter(function (r) { return r.mentioned; }).length;

    // Which domains the assistant leaned on, across every prompt. This is the
    // actionable output: absence from the sources that shaped the answer.
    const domainTotals = {};
    runs.forEach(function (r) {
      (r.sources || []).forEach(function (s) {
        domainTotals[s.host] = (domainTotals[s.host] || 0) + s.count;
      });
    });
    const sources = Object.keys(domainTotals)
      .map(function (h) { return { host: h, references: domainTotals[h] }; })
      .sort(function (a, b) { return b.references - a.references; })
      .slice(0, 15);

    const rate = usable.length ? Math.round((hits / usable.length) * 100) : 0;
    const nowIso = new Date().toISOString();
    const key = seriesKey(business, category, city);
    const past = await historyGet(key);

    // The last run from a different day is what we compare against.
    const previous = past.filter(function (r) { return !sameDay(r.at, nowIso); }).pop() || null;

    const entry = { at: nowIso, rate: rate, hits: hits, of: usable.length,
                    sources: sources.slice(0, 6).map(function (x) { return x.host; }) };
    const updated = past.filter(function (r) { return !sameDay(r.at, nowIso); }).concat([entry]);
    await historySet(key, updated);

    let change = null;
    if (previous) {
      const gained = entry.sources.filter(function (h) { return previous.sources.indexOf(h) === -1; });
      const lost = (previous.sources || []).filter(function (h) { return entry.sources.indexOf(h) === -1; });
      change = {
        previous_rate: previous.rate,
        previous_at: previous.at,
        delta: rate - previous.rate,
        sources_gained: gained.slice(0, 5),
        sources_lost: lost.slice(0, 5)
      };
    }

    return res.status(200).json({
      business: business,
      category: category,
      city: city,
      measured_with: 'claude-sonnet-4-6 with live web search',
      change: change,
      checks_recorded: updated.length,
      history: updated.map(function (r) { return { at: r.at, rate: r.rate }; }),
      prompts_run: runs.length,
      prompts_usable: usable.length,
      mention_count: hits,
      mention_rate: rate,
      sources_the_assistant_used: sources,
      runs: runs.map(function (r) {
        return {
          prompt: r.prompt,
          mentioned: r.mentioned,
          error: r.error || null,
          top_sources: (r.sources || []).slice(0, 5).map(function (s) { return s.host; }),
          answer_excerpt: (r.answer || '').slice(0, 400)
        };
      }),
      note: 'Measured against Claude with live web search. Results vary between runs; a single check is a snapshot, not a ranking.'
    });
  } catch (err) {
    return res.status(200).json({
      error: 'The visibility check could not complete. Please try again, or call Siamak at 323-657-7752.',
      detail: (err && err.message) ? String(err.message).slice(0, 200) : undefined
    });
  }
};
