// Minimal Stripe REST client (no SDK): form-encoded POSTs with the secret key.
const KEY = process.env.STRIPE_SECRET_KEY;
const PRICE_LOOKUP = 'pattern_studio_pro_monthly';
const PRICE_CENTS = parseInt(process.env.STRIPE_PRICE_CENTS || '3500', 10);
function form(obj, prefix = '') { return Object.entries(obj).flatMap(([k, v]) => { const key = prefix ? `${prefix}[${k}]` : k; if (v === undefined || v === null) return []; if (typeof v === 'object' && !Array.isArray(v)) return [form(v, key)]; if (Array.isArray(v)) return v.map((x, i) => typeof x === 'object' ? form(x, `${key}[${i}]`) : `${encodeURIComponent(`${key}[${i}]`)}=${encodeURIComponent(x)}`); return [`${encodeURIComponent(key)}=${encodeURIComponent(v)}`]; }).join('&'); }
async function stripe(method, path, body) {
  if (!KEY) throw new Error('STRIPE_SECRET_KEY not configured');
  const r = await fetch(`https://api.stripe.com/v1${path}`, { method, headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/x-www-form-urlencoded' }, body: body ? form(body) : undefined, signal: AbortSignal.timeout(15000) });
  const j = await r.json();
  if (!r.ok) throw new Error((j.error && j.error.message) || `Stripe ${r.status}`);
  return j;
}
let _priceId = process.env.STRIPE_PRICE_ID || null;
async function proPriceId() {
  if (_priceId) return _priceId;
  const found = await stripe('GET', `/prices?lookup_keys[]=${PRICE_LOOKUP}&active=true&limit=1`);
  if (found.data && found.data[0]) return (_priceId = found.data[0].id);
  const product = await stripe('POST', '/products', { name: 'Pattern Studio Pro', description: 'Unlimited photoreal renders, DXF/SVG export, size runs, cloud projects.', url: 'https://studio.siamakconsulting.com/pricing' });
  const price = await stripe('POST', '/prices', { product: product.id, currency: 'usd', unit_amount: PRICE_CENTS, recurring: { interval: 'month' }, lookup_key: PRICE_LOOKUP, nickname: 'Pro monthly' });
  return (_priceId = price.id);
}
module.exports = { stripe, proPriceId };
