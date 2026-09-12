// Blue Moon Pattern Maker — couture sketch image proxy.
// Holds the Google Imagen API key server-side so it's never exposed to the browser.
// Set env var GEMINI_API_KEY in the Vercel dashboard.
const ALLOWED = [
  'https://bluemoonfabrics.com',
  'https://www.bluemoonfabrics.com',
  'https://siamakconsulting.com',
  'https://www.siamakconsulting.com'
];

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || '';
  const allowedOrigin = ALLOWED.includes(origin) ? origin : ALLOWED[0];
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');
  if (req.method === 'OPTIONS') { return res.status(200).end(); }
  if (req.method !== 'POST') { return res.status(405).json({ error: 'Method not allowed' }); }

  try {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      return res.status(200).json({ error: 'Sketch service not configured yet.' });
    }

    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
    if (!body || typeof body !== 'object') body = {};

    const prompt = (body.prompt || '').toString().trim();
    if (!prompt || prompt.length > 2000) {
      return res.status(400).json({ error: 'Invalid prompt' });
    }

    // Google Imagen 4
    const model = 'imagen-4.0-generate-001';
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':predict';

    const payload = {
      instances: [{ prompt: prompt }],
      parameters: { sampleCount: 1, aspectRatio: '3:4', personGeneration: 'allow_adult' }
    };

    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify(payload)
    });

    if (!r.ok) {
      const txt = await r.text();
      console.error('Imagen error', r.status, txt.slice(0, 300));
      return res.status(502).json({ error: 'Image service error', detail: txt.slice(0, 400) });
    }

    const data = await r.json();
    const b64 = data && data.predictions && data.predictions[0] && data.predictions[0].bytesBase64Encoded;
    if (!b64) {
      console.error('No image in response', JSON.stringify(data).slice(0, 200));
      return res.status(502).json({ error: 'No image returned' });
    }

    return res.status(200).json({ image: 'data:image/png;base64,' + b64 });
  } catch (e) {
    console.error('Proxy error', e);
    return res.status(500).json({ error: 'Proxy error', detail: String(e).slice(0, 200) });
  }
};
