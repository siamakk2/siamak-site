// POST /api/checkout  (Authorization: Bearer <supabase jwt>) → { url }  Stripe Checkout for Pattern Studio Pro ($35/mo)
const { getUser, rest } = require('./_auth.js'); const { stripe, proPriceId } = require('./_stripe.js');
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const user = await getUser(req); if (!user) return res.status(401).json({ error: 'Sign in first' });
    let body = req.body; if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } } body = body || {};
    const origin = `https://${req.headers.host}`;
    const prof = await rest(`profiles?user_id=eq.${user.id}&select=stripe_customer_id,plan`, user.token);
    let customer = prof.data && prof.data[0] && prof.data[0].stripe_customer_id;
    if (!customer) {
      const c = await stripe('POST', '/customers', { email: user.email, metadata: { supabase_user_id: user.id, app: 'pattern-studio' } });
      customer = c.id;
      await rest(`profiles?user_id=eq.${user.id}`, user.token, { method: 'PATCH', body: JSON.stringify({ stripe_customer_id: customer }) });
    }
    const price = await proPriceId();
    const session = await stripe('POST', '/checkout/sessions', {
      mode: 'subscription', customer, line_items: [{ price, quantity: 1 }],
      success_url: (body.returnTo || origin + '/?upgraded=1') , cancel_url: origin + '/pricing',
      allow_promotion_codes: 'true', billing_address_collection: 'auto',
      subscription_data: { metadata: { supabase_user_id: user.id, app: 'pattern-studio' } },
      metadata: { supabase_user_id: user.id, app: 'pattern-studio' },
      client_reference_id: user.id,
    });
    return res.status(200).json({ url: session.url });
  } catch (e) { return res.status(500).json({ error: e.message }); }
};
