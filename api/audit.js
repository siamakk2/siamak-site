const { guard } = require('./_guard');
// Free AI Website Audit engine — by Siamak Kalhor Consulting (Orchamind).
// Fetches a visitor's website, then asks Claude to score and analyze it across
// SEO, LLMO (how AI assistants see them), positioning, and content relevancy.
module.exports = async function handler(req, res) {
  if (!(await guard(req, res, { bucket: 'audit', limit: 15, window: 3600 }))) return;

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
            input_schema: { type: 'object', properties: {
              business_name: { type: 'string' }, what_they_do: { type: 'string' }, industry: { type: 'string' },
              overall_score: { type: 'integer' }, grade_label: { type: 'string' }, headline: { type: 'string' },
              scores: { type: 'object' }, quick_wins: { type: 'array', items: { type: 'string' } },
              ideas: { type: 'array', items: { type: 'string' } }, preview: { type: 'object' }, pitch: { type: 'string' } },
              required: ['business_name', 'overall_score', 'scores', 'quick_wins', 'preview'] } }],
          tool_choice: { type: 'tool', name: 'submit_report' },
          messages: [{ role: 'user', content: user }]
        })
      });
      const data = await aResp.json();
      if (!aResp.ok) { console.error(JSON.stringify({ source: 'audit', status: aResp.status, error: data && data.error })); return { fail: 'api' }; }
      const tool = (data.content || []).find(b => b.type === 'tool_use');
      if (data.stop_reason === 'max_tokens') { console.error(JSON.stringify({ source: 'audit', truncated: maxTokens })); return { fail: 'truncated' }; }
      if (tool && tool.input && typeof tool.input === 'object' && tool.input.scores) return { report: tool.input };
      // Fallback: a text answer holding the JSON.
      let txt = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('').trim()
        .replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim();
      const m = txt.match(/\{[\s\S]*\}/);
      if (m) { try { return { report: JSON.parse(m[0]) }; } catch (e) {} }
      console.error(JSON.stringify({ source: 'audit', unparsed: true, stop: data.stop_reason }));
      return { fail: 'format' };
    }

    let out = await ask(6000);
    if (!out.report && out.fail !== 'api') out = await ask(10000);
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
