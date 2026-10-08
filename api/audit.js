const { guard } = require('./_guard');
// Free AI Website Audit engine — by Siamak Kalhor Consulting (Orchamind).
// Fetches a visitor's website, then asks Claude to score and analyze it across
// SEO, LLMO (how AI assistants see them), positioning, and content relevancy.

// Full shape of the report, so the model fills every nested field as real
// JSON (a loose "object" let it send sections as strings or skip them).
const SEC = { type: 'object', properties: { score: { type: 'integer' }, summary: { type: 'string' },
  fixes: { type: 'array', items: { type: 'string' } } }, required: ['score', 'summary', 'fixes'] };
const STR = { type: 'string' }, STRS = { type: 'array', items: { type: 'string' } };
const REPORT_SCHEMA = { type: 'object', properties: {
  business_name: STR, what_they_do: STR, industry: STR, overall_score: { type: 'integer' }, grade_label: STR, headline: STR,
  scores: { type: 'object', properties: { seo: SEC, llmo: SEC, positioning: SEC, content: SEC }, required: ['seo', 'llmo', 'positioning', 'content'] },
  quick_wins: STRS, ideas: STRS,
  preview: { type: 'object', properties: { logo_text: STR, tagline: STR, hero_headline: STR, hero_sub: STR, primary_cta: STR,
    services: { type: 'array', items: { type: 'object', properties: { title: STR, desc: STR }, required: ['title', 'desc'] } },
    why_us: STRS, about_line: STR, location_line: STR }, required: ['logo_text', 'hero_headline', 'services'] },
  pitch: STR },
  required: ['business_name', 'what_they_do', 'overall_score', 'grade_label', 'headline', 'scores', 'quick_wins', 'ideas', 'preview', 'pitch'] };

// Repair what the model sends instead of rejecting it: sections that arrive
// as JSON strings are parsed, missing pieces get safe defaults. Only a report
// with no usable scores at all counts as a failure.
function normalize(r) {
  const parse = (v) => { if (typeof v === 'string') { try { return JSON.parse(v); } catch (e) { return v; } } return v; };
  r = parse(r);
  if (!r || typeof r !== 'object') return null;
  for (const k of ['scores', 'preview', 'quick_wins', 'ideas']) r[k] = parse(r[k]);
  const sc = r.scores && typeof r.scores === 'object' ? r.scores : null;
  if (!sc) return null;
  const arr = (v) => (Array.isArray(v) ? v.map((x) => (typeof x === 'string' ? x : (x && (x.text || x.title)) || '')).filter(Boolean) : (typeof v === 'string' && v ? [v] : []));
  const num = (v, d) => { const n = Math.round(Number(v)); return isFinite(n) ? Math.max(0, Math.min(100, n)) : d; };
  let have = 0;
  for (const k of ['seo', 'llmo', 'positioning', 'content']) {
    let x = parse(sc[k]);
    if (typeof x === 'number') x = { score: x };
    if (!x || typeof x !== 'object') x = {};
    if (x.score != null) have++;
    sc[k] = { score: num(x.score, 50), summary: String(x.summary || ''), fixes: arr(x.fixes) };
  }
  if (!have) return null;
  r.scores = sc;
  const avg = Math.round((sc.seo.score + sc.llmo.score + sc.positioning.score + sc.content.score) / 4);
  r.overall_score = num(r.overall_score, avg);
  r.quick_wins = arr(r.quick_wins); r.ideas = arr(r.ideas);
  for (const k of ['business_name', 'what_they_do', 'industry', 'grade_label', 'headline', 'pitch']) r[k] = String(r[k] || '');
  const p = r.preview && typeof r.preview === 'object' ? r.preview : {};
  p.services = (Array.isArray(p.services) ? p.services : []).map((x) => (typeof x === 'string' ? { title: x, desc: '' } : { title: String((x && x.title) || ''), desc: String((x && x.desc) || '') })).filter((x) => x.title);
  p.why_us = arr(p.why_us);
  for (const k of ['logo_text', 'tagline', 'hero_headline', 'hero_sub', 'primary_cta', 'about_line', 'location_line']) p[k] = String(p[k] || '');
  if (!p.logo_text) p.logo_text = r.business_name.slice(0, 22);
  if (!p.primary_cta) p.primary_cta = 'Get in Touch';
  r.preview = p;
  return r;
}

module.exports = async function handler(req, res) {
  if (!(await guard(req, res, { bucket: 'audit', limit: 15, window: 3600 }))) return;

  const t0 = Date.now();
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(200).json({ error: "The audit tool isn't set up yet. Please call Siamak at 323-657-7752." });
    }

    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
    if (!body || typeof body !== 'object') body = {};

    // --- Normalize the URL ---
    let url = (body.url || '').toString().trim();
    if (!url) { return res.status(200).json({ error: 'Please enter your website address.' }); }
    if (!/^https?:\/\//i.test(url)) { url = 'https://' + url; }
    let host = '';
    try { host = new URL(url).hostname; } catch (e) {
      return res.status(200).json({ error: "That doesn't look like a valid website address. Try again (e.g. yourbusiness.com)." });
    }

    // --- Fetch the website (with timeout + size cap) ---
    let pageText = '', pageTitle = '', fetchError = '';
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 12000);
      const resp = await fetch(url, {
        signal: ctrl.signal,
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SiamakConsultingAudit/1.0; +https://siamakconsulting.com)' },
        redirect: 'follow'
      });
      clearTimeout(t);
      if (!resp.ok) { fetchError = 'status ' + resp.status; }
      let html = await resp.text();
      html = html.slice(0, 200000); // cap raw html

      // Pull the <title>
      const tm = html.match(/<title[^>]*>([^<]*)<\/title>/i);
      pageTitle = tm ? tm[1].trim() : '';

      // Pull meta description
      const dm = html.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i);
      const metaDesc = dm ? dm[1].trim() : '';

      // Strip scripts/styles, collapse tags to text
      let text = html
        .replace(/<script[\s\S]*?<\/script>/gi, ' ')
        .replace(/<style[\s\S]*?<\/style>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      // Capture heading hints before stripping (h1/h2)
      const heads = [];
      const hre = /<h[12][^>]*>([^<]{2,120})<\/h[12]>/gi; let hm;
      while ((hm = hre.exec(html)) && heads.length < 12) { heads.push(hm[1].trim()); }

      pageText =
        'PAGE TITLE: ' + (pageTitle || '(none)') + '\n' +
        'META DESCRIPTION: ' + (metaDesc || '(none — missing)') + '\n' +
        'HEADINGS: ' + (heads.join(' | ') || '(none found)') + '\n\n' +
        'VISIBLE TEXT (excerpt):\n' + text.slice(0, 6000);
    } catch (e) {
      fetchError = e.name === 'AbortError' ? 'timeout' : e.message;
    }

    if (!pageText && fetchError) {
      return res.status(200).json({
        error: "I couldn't load that website (" + fetchError + "). Double-check the address, or the site may be blocking automated visits. You can still call Siamak at 323-657-7752 for a manual review."
      });
    }

    // --- Ask Claude for a structured report + website preview content ---
    const system = `You are the analysis engine behind "Siamak Kalhor Consulting — Your Online Presence Report." You review how a business shows up online (their website, how Google sees them, and how AI assistants see them) and return a concrete, honest, encouraging report a non-technical owner can act on — PLUS ready-to-use content for a beautiful new website mockup. You are reviewing real fetched content. Be specific to THIS business — reference what you actually see. Never invent facts (awards, numbers, reviews) you can't verify; for the website preview you may write compelling marketing copy in their voice, but keep it truthful to what they do.

Return ONLY valid JSON (no markdown, no preamble) with this exact shape:
{
  "business_name": "best guess at the business name",
  "what_they_do": "one plain sentence on what this business appears to do",
  "industry": "one or two word category, e.g. General Contractor, Restaurant, Law Firm, Dentist, Salon, Real Estate",
  "overall_score": 0-100 integer,
  "grade_label": "a short friendly label for the score, e.g. 'Good foundation, big upside' or 'Strong, a few gaps'",
  "headline": "one punchy sentence summarizing the single biggest opportunity",
  "scores": {
    "seo": {"score": 0-100, "summary": "2 sentences", "fixes": ["specific fix", "specific fix", "specific fix"]},
    "llmo": {"score": 0-100, "summary": "2 sentences on how well AI assistants (ChatGPT, Claude, Google AI) could understand and recommend this business", "fixes": ["specific fix", "specific fix", "specific fix"]},
    "positioning": {"score": 0-100, "summary": "2 sentences on clarity of who they serve and why to choose them", "fixes": ["specific fix", "specific fix", "specific fix"]},
    "content": {"score": 0-100, "summary": "2 sentences on content relevance, freshness, trust signals", "fixes": ["specific fix", "specific fix", "specific fix"]}
  },
  "quick_wins": ["the 4 highest-impact things to do first, each one clear sentence"],
  "ideas": ["3 bigger creative growth ideas tailored to their industry — e.g. a specific content piece, an offer, a local-SEO play, an AI-assistant tactic. Each 1-2 sentences and specific to them."],
  "preview": {
    "logo_text": "short brand name for a logo (<= 22 chars)",
    "tagline": "a short tagline, 2-5 words",
    "hero_headline": "a compelling hero headline, 4-9 words, benefit-driven",
    "hero_sub": "one supporting sentence under the headline",
    "primary_cta": "button text, e.g. 'Get a Free Quote' or 'Book a Table'",
    "services": [
      {"title": "service/offering name", "desc": "one short sentence"},
      {"title": "service/offering name", "desc": "one short sentence"},
      {"title": "service/offering name", "desc": "one short sentence"}
    ],
    "why_us": ["short proof point 3-6 words", "short proof point", "short proof point"],
    "about_line": "one warm sentence they could use as an intro/about blurb",
    "location_line": "city/area served if known, else empty string"
  },
  "pitch": "2 sentences: warmly note this is exactly what Siamak Kalhor Consulting fixes, and that we can advise OR build them a fast, modern, AI-ready site fast."
}

SCORING GUIDANCE:
- SEO: title tag quality, meta description presence, headings, keywords matching their service+location, mobile signals, clarity for Google.
- LLMO (AI/LLM Optimization): is the business name, what they do, who they serve, location, and contact info stated in plain text an AI can extract? Structured, factual, unambiguous copy scores high; vague/image-only/jargon scores low. This is a NEW competitive edge — explain it simply.
- POSITIONING: is it instantly clear what they do, who it's for, and why pick them over a competitor? Unique value, proof, credibility.
- CONTENT: relevance to their audience, trust signals (reviews, license #, years in business), freshness, clear calls-to-action.
Be generous but honest. A weak presence scores 30-55 with clear fixes; a strong one 75-90. Keep every fix concrete and jargon-free.
For the "preview" content: write it as polished marketing copy a professional copywriter would put on THIS business's new homepage — confident, specific, benefit-driven, and true to what they actually do.`;

    const user = 'Audit this website: ' + url + ' (host: ' + host + ')\n\n--- FETCHED CONTENT ---\n' + pageText;

    // The report is returned through a forced tool call, so the model has to
    // produce one complete JSON object. Free text was cut off mid-object when
    // the report ran past max_tokens, which is what "couldn't format the
    // report" meant. One retry with a bigger budget if it still truncates.
    async function ask(maxTokens) {
      const aResp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: maxTokens,
          system: system + '\n\nDeliver the report by calling the submit_report tool with that JSON object as its input.',
          tools: [{ name: 'submit_report', description: 'Submit the finished website report.',
            input_schema: REPORT_SCHEMA }],
          tool_choice: { type: 'tool', name: 'submit_report' },
          messages: [{ role: 'user', content: user }]
        })
      });
      const data = await aResp.json();
      if (!aResp.ok) { console.error(JSON.stringify({ source: 'audit', status: aResp.status, error: data && data.error })); return { fail: 'api' }; }
      const tool = (data.content || []).find(b => b.type === 'tool_use');
      if (data.stop_reason === 'max_tokens') console.error(JSON.stringify({ source: 'audit', truncated: maxTokens }));
      const fixed = tool && normalize(tool.input);
      if (fixed) return { report: fixed };
      // Fallback: a text answer holding the JSON.
      let txt = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('').trim()
        .replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim();
      const m = txt.match(/\{[\s\S]*\}/);
      if (m) { try { const r2 = normalize(JSON.parse(m[0])); if (r2) return { report: r2 }; } catch (e) {} }
      console.error(JSON.stringify({ source: 'audit', unparsed: true, stop: data.stop_reason, keys: tool && tool.input ? Object.keys(tool.input) : null, sample: JSON.stringify(tool ? tool.input : data.content).slice(0, 400) }));
      return { fail: 'format' };
    }

    let out = await ask(6000);
    if (!out.report && out.fail !== 'api') out = await ask(10000);
    console.log(JSON.stringify({ source: 'audit', host, ok: !!out.report, fail: out.fail || null, ms: Date.now() - t0 }));
    if (!out.report) {
      return res.status(200).json({ error: out.fail === 'api'
        ? 'The analysis service is busy right now. Please try again in a minute, or call Siamak at 323-657-7752.'
        : "I analyzed the site but couldn't format the report. Please try again." });
    }
    const report = out.report;

    report.url = url;
    report.host = host;
    return res.status(200).json({ ok: true, report: report });

  } catch (err) {
    return res.status(200).json({ error: 'Audit error: ' + err.message });
  }
};
