// POST /api/portal (Authorization: Bearer <jwt>) → { url } Stripe customer portal
const { getUser, rest } = require('./_auth.js'); const { stripe } = require('./_stripe.js');
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const user = await getUser(req); if (!user) return res.status(401).json({ error: 'Sign in first' });
    const prof = await rest(`profiles?user_id=eq.${user.id}&select=stripe_customer_id`, user.token);
    const customer = prof.data && prof.data[0] && prof.data[0].stripe_customer_id;
    if (!customer) return res.status(400).json({ error: 'No billing account yet' });
    const s = await stripe('POST', '/billing_portal/sessions', { customer, return_url: `https://${req.headers.host}/` });
    return res.status(200).json({ url: s.url });
  } catch (e) { return res.status(500).json({ error: e.message }); }
};
