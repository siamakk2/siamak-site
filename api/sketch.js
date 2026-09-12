// Blue Moon Pattern Maker — couture sketch proxy
// Uses Gemini API for image generation
// Set GEMINI_API_KEY in Vercel environment variables
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
    if (!prompt || prompt.length > 4000) return res.status(400).json({ error: 'Invalid prompt' });

    // Determine auth method based on key format
    // AQ. keys = OAuth2 Bearer token
    // AIza keys = API key query param
    const isOAuth = key.startsWith('AQ.');
    
    const url = isOAuth
      ? 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent'
      : 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=' + key;

    const headers = { 'Content-Type': 'application/json' };
    if (isOAuth) headers['Authorization'] = 'Bearer ' + key;

    const r = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseModalities: ['TEXT', 'IMAGE'] }
      })
    });

    if (!r.ok) {
      const txt = await r.text().catch(() => '');
      console.error('Gemini error:', r.status, txt.slice(0, 300));
      return res.status(502).json({ error: 'Image generation failed', detail: txt.slice(0, 300) });
    }

    const data = await r.json();
    const parts = data?.candidates?.[0]?.content?.parts || [];
    const imagePart = parts.find(p => p.inlineData);
    
    if (imagePart?.inlineData?.data) {
      const mimeType = imagePart.inlineData.mimeType || 'image/png';
      return res.status(200).json({ image: `data:${mimeType};base64,${imagePart.inlineData.data}` });
    }

    console.error('No image in response:', JSON.stringify(data).slice(0, 300));
    return res.status(502).json({ error: 'No image in response' });

  } catch(e) {
    console.error('Proxy error:', e);
    return res.status(500).json({ error: String(e).slice(0, 200) });
  }
};
