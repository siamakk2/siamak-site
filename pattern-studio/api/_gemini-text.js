// Gemini text/vision helper with model fallback (model names on this key move fast).
const KEY = process.env.GEMINI_API_KEY;
const TEXT_MODELS = ['gemini-3.8-flash', 'gemini-3.5-flash', 'gemini-3-flash', 'gemini-2.5-flash', 'gemini-2.5-flash-lite'];
async function geminiText(parts, opts = {}) {
  const errors = [];
  for (const m of TEXT_MODELS) {
    try {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${KEY}`, {
        method: 'POST', headers: { 'content-type': 'application/json' }, signal: AbortSignal.timeout(opts.timeout || 30000),
        body: JSON.stringify({ contents: [{ parts }], generationConfig: { temperature: opts.temperature ?? 0.4, maxOutputTokens: opts.maxOutputTokens || 700 } }),
      });
      const j = await r.json().catch(() => ({}));
      if (r.status === 404) { errors.push(m + ': 404'); continue; }
      const text = ((((j.candidates || [])[0] || {}).content || {}).parts || []).map(p => p.text || '').join('').trim();
      if (!r.ok || !text) { errors.push(m + ': ' + (r.status) + ' ' + ((j.error && j.error.message) || 'empty')); continue; }
      return { text, model: m };
    } catch (e) { errors.push(m + ': ' + e.message); }
  }
  throw new Error(errors.join(' | ').slice(0, 400));
}
module.exports = { geminiText };
