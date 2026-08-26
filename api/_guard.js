// Shared abuse guard for the /api endpoints.
//
// Why this exists: /api/claude and /api/audit both proxy a paid Anthropic key
// with Access-Control-Allow-Origin: '*', no authentication and no rate limit.
// Anyone who reads the page source can POST to them and use the key as a free
// LLM endpoint, billed to this account. /api/sketch.js already pins its origin
// — these did not.
//
// Design notes:
//  * Fails OPEN when Upstash is not configured, so a missing env var can never
//    take the site's forms or advisor offline.
//  * Same-origin browser requests and server-to-server calls (no Origin header)
//    are allowed; only a *foreign* browser origin is rejected.
//  * ALLOWED_ORIGINS env var (comma separated) overrides the defaults without
//    a redeploy of code.

const DEFAULT_ORIGINS = [
  'https://siamakconsulting.com',
  'https://www.siamakconsulting.com',
  'https://orchamind.com',
  'https://www.orchamind.com'
];

function allowedOrigins() {
  const raw = process.env.ALLOWED_ORIGINS;
  if (!raw) return DEFAULT_ORIGINS.slice();
  return raw.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
}

// Sets CORS headers reflecting only an allowed origin. Returns false if the
// request came from a browser origin that is not on the list.
function applyCors(req, res, opts) {
  const list = allowedOrigins();
  const origin = req.headers && req.headers.origin;

  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // No Origin header => not a cross-origin browser request (curl, server call,
  // same-origin form post in some browsers). Nothing to reflect, nothing to block.
  if (!origin) return true;

  if (list.indexOf(origin) !== -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    return true;
  }

  if (opts && opts.public) {
    // Endpoints intentionally embeddable elsewhere keep the wildcard.
    res.setHeader('Access-Control-Allow-Origin', '*');
    return true;
  }

  return false;
}

function clientIp(req) {
  const fwd = (req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  return fwd || req.headers['x-real-ip'] || 'unknown';
}

// Fixed-window counter in Upstash. Returns { ok, remaining }.
// Any Redis problem resolves to ok:true — availability beats enforcement here.
async function rateLimit(req, bucket, limit, windowSeconds) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return { ok: true, remaining: limit, enforced: false };

  const window = Math.floor(Date.now() / (windowSeconds * 1000));
  const key = 'rl:' + bucket + ':' + clientIp(req) + ':' + window;

  try {
    const inc = await fetch(url + '/incr/' + encodeURIComponent(key), {
      headers: { Authorization: 'Bearer ' + token }
    });
    const data = await inc.json();
    const count = parseInt(data && data.result, 10) || 0;

    if (count === 1) {
      // First hit in this window — set the TTL so keys expire.
      await fetch(url + '/expire/' + encodeURIComponent(key) + '/' + windowSeconds, {
        headers: { Authorization: 'Bearer ' + token }
      }).catch(function () {});
    }

    return { ok: count <= limit, remaining: Math.max(0, limit - count), enforced: true };
  } catch (e) {
    return { ok: true, remaining: limit, enforced: false };
  }
}

// One call that handles OPTIONS, method check, origin check and rate limiting.
// Returns true when the handler should continue.
async function guard(req, res, opts) {
  const o = opts || {};
  const ok = applyCors(req, res, o);

  if (req.method === 'OPTIONS') {
    res.status(ok ? 200 : 403).end();
    return false;
  }
  if (!ok) {
    res.status(403).json({ error: 'Origin not allowed' });
    return false;
  }
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return false;
  }

  const rl = await rateLimit(req, o.bucket || 'api', o.limit || 30, o.window || 3600);
  if (!rl.ok) {
    res.setHeader('Retry-After', String(o.window || 3600));
    res.status(429).json({
      error: 'Too many requests. Please try again later, or call 323-657-7752.'
    });
    return false;
  }

  return true;
}

module.exports = { guard, applyCors, rateLimit, clientIp, allowedOrigins };
