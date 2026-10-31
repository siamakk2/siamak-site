// Verify a Supabase user JWT (sent as Authorization: Bearer) against the project's auth endpoint.
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ydrlaucrzgnuvcepczuf.supabase.co';
const SUPABASE_ANON = process.env.SUPABASE_ANON_KEY || 'sb_publishable_p3rWLcUgdSqGFNYyp2QZ1Q_viNMdbmA';
async function getUser(req) {
  const h = req.headers.authorization || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : null;
  if (!token) return null;
  const r = await fetch(`${SUPABASE_URL}/auth/v1/user`, { headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(8000) });
  if (!r.ok) return null;
  const u = await r.json();
  return u && u.id ? { id: u.id, email: u.email, token } : null;
}
async function rest(path, token, init = {}) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, { ...init, headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept-Profile': 'studio', 'Content-Profile': 'studio', ...(init.headers || {}) } });
  const text = await r.text(); let j = null; try { j = JSON.parse(text); } catch {}
  return { ok: r.ok, status: r.status, data: j };
}
module.exports = { getUser, rest, SUPABASE_URL, SUPABASE_ANON };
