// POST /api/advise { prompt } → { text }  — atelier construction advisor (Gemini text)
const KEY = process.env.GEMINI_API_KEY;
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS'); res.setHeader('Access-Control-Allow-Headers', 'content-type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!KEY) return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
  let body = req.body; if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const prompt = String((body || {}).prompt || '').slice(0, 6000);
  if (!prompt) return res.status(400).json({ error: 'prompt required' });
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${KEY}`, {
      method: 'POST', headers: { 'content-type': 'application/json' }, signal: AbortSignal.timeout(40000),
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.6, maxOutputTokens: 700 } }),
    });
    const j = await r.json();
    const text = ((((j.candidates || [])[0] || {}).content || {}).parts || []).map(p => p.text || '').join('').trim();
    if (!r.ok || !text) return res.status(502).json({ error: 'advisor unavailable' });
    return res.status(200).json({ text });
  } catch (e) { return res.status(502).json({ error: 'advisor unavailable' }); }
};
