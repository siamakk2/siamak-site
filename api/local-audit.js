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
    'What are the best ' + category + ' in ' + city + '?',
    'Who should I call for ' + category + ' near ' + near + '?',
    'Recommend a highly rated ' + category + ' in ' + city + '.',
    'I need ' + category + ' in ' + city + ' — who do you suggest and why?',
    'Which ' + category + ' in ' + city + ' do people rate most highly?',
    'Best ' + category + ' near ' + near + ' for someone who wants good service.'
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

module.exports = async function handler(req, res) {
  // Lower limit than the site audit: each run makes several searched calls.
  if (!(await guard(req, res, { bucket: 'local-audit', limit: 6, window: 3600 }))) return;

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

    // Sequential rather than parallel: these are searched calls and firing six
    // at once is a good way to meet a rate limit on the provider side.
    const runs = [];
    for (let i = 0; i < prompts.length; i++) {
      let data;
      try {
        data = await askOne(apiKey, prompts[i]);
      } catch (e) {
        runs.push({ prompt: prompts[i], error: e.message, mentioned: false, sources: [] });
        continue;
      }
      const answer = textOf(data.content);
      runs.push({
        prompt: prompts[i],
        mentioned: mentions(answer, business, website, category),
        answer: answer,
        sources: collectSources(data.content)
      });
    }

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

    return res.status(200).json({
      business: business,
      category: category,
      city: city,
      measured_with: 'claude-sonnet-4-6 with live web search',
      prompts_run: runs.length,
      prompts_usable: usable.length,
      mention_count: hits,
      mention_rate: usable.length ? Math.round((hits / usable.length) * 100) : 0,
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
