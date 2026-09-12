// Blue Moon Pattern Maker — couture sketch proxy
// GEMINI_API_KEY must be set in Vercel environment variables
const ALLOWED = [
  'https://bluemoonfabrics.com',
  'https://www.bluemoonfabrics.com',
  'https://siamakconsulting.com',
  'https://www.siamakconsulting.com'
];

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || '';
  const ao = ALLOWED.includes(origin) ? origin : ALLOWED[0];
  res.setHeader('Access-Control-Allow-Origin', ao);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const key = process.env.GEMINI_API_KEY;
    if (!key) return res.status(500).json({ error: 'API key not configured' });

    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch(e) { body = {}; } }
    const prompt = ((body && body.prompt) || '').toString().trim();
    if (!prompt || prompt.length > 2000) return res.status(400).json({ error: 'Invalid prompt' });

    // Try Imagen 4 preview model, fall back to Imagen 3
    const models = [
      'imagen-4.0-generate-preview-06-06',
      'imagen-4.0-flash-preview-05-20',
      'imagen-3.0-generate-002',
      'imagen-3.0-generate-001'
    ];

    let lastErr = '';
    for (const model of models) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:predict?key=${key}`;
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instances: [{ prompt }],
          parameters: { sampleCount: 1, aspectRatio: '3:4', personGeneration: 'allow_adult' }
        })
      });
      if (r.ok) {
        const data = await r.json();
        const b64 = data?.predictions?.[0]?.bytesBase64Encoded;
        if (b64) return res.status(200).json({ image: 'data:image/png;base64,' + b64 });
      }
      const txt = await r.text().catch(() => '');
      lastErr = `${model}: ${r.status} ${txt.slice(0, 200)}`;
      console.error('Sketch model failed:', lastErr);
    }
    return res.status(502).json({ error: 'All models failed', detail: lastErr });
  } catch(e) {
    console.error('Sketch proxy error:', e);
    return res.status(500).json({ error: String(e).slice(0, 200) });
  }
};
