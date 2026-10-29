// GET /api/fabrics?collection=swimwear&page=1
// Proxies the public Shopify storefront JSON of Blue Moon Fabrics so the studio (any origin) can read the live catalog.
// No admin token involved: /collections/{handle}/products.json is public storefront data.
const SHOP = process.env.SHOP_ORIGIN || 'https://bluemoonfabrics.com';
const HANDLE = /^[a-z0-9-]{1,64}$/;

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const collection = String(req.query.collection || '').toLowerCase();
  const page = Math.min(Math.max(parseInt(req.query.page, 10) || 1, 1), 20);
  if (!HANDLE.test(collection)) return res.status(400).json({ error: 'bad collection handle' });

  const url = `${SHOP}/collections/${collection}/products.json?limit=250&page=${page}`;
  try {
    const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 9000);
    const r = await fetch(url, { headers: { Accept: 'application/json', 'User-Agent': 'PatternStudio/1.0' }, signal: ctrl.signal });
    clearTimeout(t);
    if (!r.ok) return res.status(r.status).json({ error: 'upstream ' + r.status, products: [] });
    const data = await r.json();
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=3600');
    return res.status(200).json(data);
  } catch (e) {
    return res.status(502).json({ error: 'upstream unavailable', products: [] });
  }
};
