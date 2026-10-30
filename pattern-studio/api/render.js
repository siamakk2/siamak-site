// POST /api/render — photoreal "garment on model" render for Pattern Studio.
// Body: { context:{garment,style,styleSub,chips[],fabric:{name,hex,pattern,desc,category,img},
//                  body:{bust,waist,hips,height?}, fit:{ease}, gender, model, setting, mode:'photo'|'sketch'|'print', printDesc },
//         prompt? (free text, used as-is when context is absent) }
// Returns: { image:'data:image/png;base64,…', model:'gemini-…', prompt }
// Uses Google Gemini image models with GEMINI_API_KEY (Vercel env). The fabric's real product photo
// (Shopify CDN) is passed as a reference image so the print/texture on the model is the real fabric.
const KEY = process.env.GEMINI_API_KEY;
const MODELS = ['gemini-3-pro-image', 'gemini-3.1-flash-image', 'gemini-2.5-flash-image'];
const ALLOWED_IMG = /^https:\/\/(cdn\.shopify\.com|bluemoonfabrics\.com)\//;

const MODEL_DESC = {
  woman_25_diverse: 'a 25-year-old woman with diverse features and a natural swimwear-model figure',
  woman_30_athletic: 'a 30-year-old athletic woman with toned shoulders',
  woman_40_curvy: 'a 40-year-old curvy plus-size woman, confident and elegant',
  woman_20_petite: 'a 20-year-old petite woman',
  man_28_athletic: 'a 28-year-old athletic man',
};
const SETTING_DESC = {
  'studio white': 'clean white seamless studio backdrop, soft key light and gentle rim light, faint floor shadow',
  'Clean studio': 'clean light-grey seamless studio backdrop, soft key light and gentle rim light, faint floor shadow',
  'runway': 'fashion-week runway at night, dark audience bokeh, strong front spotlight',
  'beach': 'golden-hour beach, soft sand, calm sea, warm backlight',
  'street': 'editorial street scene at dusk, blurred city lights',
  'cosplay': 'convention-hall photo booth with a dramatic gradient backdrop and crisp studio flash',
};

function sizeWords(b) {
  if (!b || !b.bust) return '';
  const bust = +b.bust, waist = +b.waist || bust - 8, hips = +b.hips || bust + 2;
  const size = bust < 33 ? 'XS' : bust < 35 ? 'S' : bust < 38 ? 'M' : bust < 41 ? 'L' : bust < 45 ? 'XL' : 'plus-size';
  const shape = hips - bust >= 3 ? 'pear-shaped' : bust - hips >= 3 ? 'inverted-triangle' : bust - waist >= 9 ? 'hourglass' : 'straight';
  return ` The model is a size ${size}, ${shape} figure (bust ${bust}", waist ${waist}", hips ${hips}"), and the garment fits those proportions exactly.`;
}
function fabricWords(f) {
  if (!f) return 'a matte stretch fabric';
  const pat = { solid: 'solid colour', stripe: 'bold stripes', foil: 'metallic foil shine', sequin: 'all-over sequins', lace: 'delicate lace', velvet: 'plush stretch velvet', tropical: 'tropical botanical print', floral: 'floral print', animal: 'animal print', rib: 'ribbed knit', mesh: 'sheer mesh' }[f.pattern] || (f.pattern || '');
  const cat = { Swim: 'swimwear nylon-spandex', Activewear: 'performance activewear knit', 'Dance/Stage': 'stage and dance fabric', Lingerie: 'lingerie fabric', Dresses: 'dress-weight knit' }[f.category] || '';
  return `"${f.name}"${cat ? ' — ' + cat : ''}${pat ? ', ' + pat : ''}${f.hex ? ', base colour ' + f.hex : ''}${f.desc ? ' (' + f.desc.replace(/<[^>]+>/g, '') + ')' : ''}`;
}
function buildPrompt(c) {
  const g = c.garment || 'garment', st = c.style || '', sub = c.styleSub ? ` (${c.styleSub})` : '';
  const chips = (c.chips || []).filter(Boolean);
  const details = chips.length ? ` Construction details that must be visible: ${chips.join(', ')}.` : '';
  const ease = c.fit && +c.fit.ease ? (c.fit.ease < 0 ? ' Negative ease: skin-tight compression fit.' : ' Relaxed fit with visible ease.') : '';
  const who = c.gender === 'male' ? (MODEL_DESC[c.model] || 'a 28-year-old athletic man') : (MODEL_DESC[c.model] || MODEL_DESC.woman_25_diverse);
  const where = SETTING_DESC[c.setting] || SETTING_DESC['Clean studio'];
  const fabric = fabricWords(c.fabric);
  const ref = c.fabric && c.fabric.img ? ' The attached photo is the actual fabric: reproduce its exact colour, print scale, texture and sheen on the garment.' : '';

  if (c.mode === 'sketch') {
    return `Couture fashion illustration, hand-drawn designer croquis with ink line and watercolour wash, elongated 9-head fashion figure, white paper background. The figure wears a ${g} in the "${st}" style${sub}.${details} Fabric: ${fabric}.${ref} Render the garment's seams, neckline, straps, hems and silhouette precisely as a pattern-maker would draft them. Elegant, confident pose. No text, no logos.`;
  }
  if (c.mode === 'print') {
    return `Editorial fashion photograph, full body, ${who}, wearing a ${g} in the "${st}" style${sub}, sewn from fabric printed with: ${c.printDesc || 'an abstract print'}. The print must be clearly visible and correctly scaled across the whole garment, following the body's curves and the garment's seams.${details} ${where}. 85mm lens, photorealistic, magazine quality. No text, no logos, no watermark.`;
  }
  return `Editorial fashion photograph for a couture lookbook, full body head-to-toe, ${who}, relaxed confident three-quarter pose. She/he wears a ${g} in the "${st}" style${sub}.${details}${ease}${sizeWords(c.body)} Fabric: ${fabric}.${ref} Seams, topstitching, hems, straps and closures rendered as a real sewn garment with correct drape and stretch for this fabric. ${where}. Camera at chest height, 85mm lens, shallow depth of field, photorealistic, high-end fashion magazine quality. No text, no logos, no watermark.`;
}

async function fetchRef(url) {
  if (!url || !ALLOWED_IMG.test(url)) return null;
  try {
    const u = url.replace(/(\.(jpe?g|png|webp))(\?.*)?$/i, '_800x$1'); // Shopify size variant keeps payload small
    const r = await fetch(u, { signal: AbortSignal.timeout(6000) });
    if (!r.ok) return null;
    const mime = (r.headers.get('content-type') || 'image/jpeg').split(';')[0];
    if (!/^image\//.test(mime)) return null;
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length > 4_000_000) return null;
    return { inlineData: { mimeType: mime, data: buf.toString('base64') } };
  } catch { return null; }
}

async function gemini(model, parts, aspect) {
  const body = { contents: [{ parts }], generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: aspect } } };
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${KEY}`, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body), signal: AbortSignal.timeout(55000),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`${model}: ${r.status} ${(j.error && j.error.message) || ''}`.slice(0, 300));
  const img = (((j.candidates || [])[0] || {}).content || {}).parts?.find(p => p.inlineData && /^image\//.test(p.inlineData.mimeType));
  if (!img) throw new Error(`${model}: no image in response`);
  return { dataUrl: `data:${img.inlineData.mimeType};base64,${img.inlineData.data}`, model };
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!KEY) return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });

  let body = req.body; if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  body = body || {};
  const ctx = body.context;
  const prompt = ctx ? buildPrompt(ctx) : String(body.prompt || '').slice(0, 2000);
  if (!prompt) return res.status(400).json({ error: 'prompt or context required' });
  const aspect = body.aspect || '3:4';

  const parts = [{ text: prompt }];
  const ref = ctx && ctx.fabric ? await fetchRef(ctx.fabric.img) : null;
  if (ref) parts.push(ref);

  const errors = [];
  for (const m of MODELS) {
    try {
      const out = await gemini(m, parts, aspect);
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).json({ image: out.dataUrl, model: out.model, prompt, usedFabricPhoto: !!ref });
    } catch (e) { errors.push(e.message); }
  }
  return res.status(502).json({ error: 'render failed', detail: errors });
};
