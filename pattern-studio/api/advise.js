// POST /api/advise { prompt } → { text }  — atelier construction advisor (Gemini text)
const KEY = process.env.GEMINI_API_KEY;
const { geminiText } = require('./_gemini-text.js');
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS'); res.setHeader('Access-Control-Allow-Headers', 'content-type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!KEY) return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
  let body = req.body; if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const prompt = String((body || {}).prompt || '').slice(0, 6000);
  if (!prompt) return res.status(400).json({ error: 'prompt required' });
  try { const out = await geminiText([{ text: prompt }], { temperature: 0.6, maxOutputTokens: 700, timeout: 40000 }); return res.status(200).json({ text: out.text, model: out.model }); }
  catch (e) { return res.status(502).json({ error: 'advisor unavailable', detail: e.message }); }
};
