// RSS feed for the AI marketing news page.
//
// The page renders its items client-side, and the crawlers that matter most
// here — GPTBot, ClaudeBot, PerplexityBot, Googlebot on a shallow pass — do not
// reliably execute JavaScript. A news page whose news is invisible to AI
// crawlers is self-defeating on a site about being visible to AI crawlers.
//
// RSS is how news has always been machine-readable. It is plain XML, it needs
// no JavaScript, it is the format aggregators and assistants already understand,
// and it carries the full item text rather than a pointer to it.
//
// Reads the same cache the page does, so the feed and the page never disagree.

const { rateLimit } = require('./_guard');

const CACHE_KEY = 'ai-marketing-news:v1';
const SITE = 'https://siamakconsulting.com';

async function cacheGet() {
  const url = process.env.UPSTASH_REDIS_REST_URL, token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  try {
    const r = await fetch(url + '/get/' + encodeURIComponent(CACHE_KEY),
                          { headers: { Authorization: 'Bearer ' + token } });
    const d = await r.json();
    return d && d.result ? JSON.parse(d.result) : null;
  } catch (e) { return null; }
}

function xml(t) {
  return String(t == null ? '' : t)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function rfc822(dateStr, fallback) {
  const d = dateStr ? new Date(dateStr + 'T12:00:00Z') : new Date(fallback);
  return (isNaN(d) ? new Date() : d).toUTCString();
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return res.status(405).send('Method not allowed');
  }
  const rl = await rateLimit(req, 'news-feed', 120, 3600);
  if (!rl.ok) return res.status(429).send('Too many requests');

  const data = await cacheGet();
  const items = (data && data.items) || [];
  const built = (data && data.compiled) || new Date().toISOString();

  const body = items.map(function (it) {
    // The link is the primary source; guid is our own page anchor so the item
    // stays identifiable even if a publisher changes its URL.
    return '    <item>\n' +
      '      <title>' + xml(it.headline) + '</title>\n' +
      '      <link>' + xml(it.url) + '</link>\n' +
      '      <guid isPermaLink="false">' + xml(SITE + '/ai-marketing-news#' +
        String(it.headline).toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 60)) + '</guid>\n' +
      '      <pubDate>' + rfc822(it.date, built) + '</pubDate>\n' +
      '      <source url="' + xml(it.url) + '">' + xml(it.source || it.host) + '</source>\n' +
      '      <description>' + xml(it.summary || '') + '</description>\n' +
      '    </item>';
  }).join('\n');

  const feed =
'<?xml version="1.0" encoding="UTF-8"?>\n' +
'<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n' +
'  <channel>\n' +
'    <title>AI Marketing &amp; Advertising News — Siamak Kalhor Consulting</title>\n' +
'    <link>' + SITE + '/ai-marketing-news</link>\n' +
'    <atom:link href="' + SITE + '/news.xml" rel="self" type="application/rss+xml"/>\n' +
'    <description>Developments in AI marketing and advertising that change what a business should do. ' +
       'Compiled from primary sources and updated daily by Siamak Kalhor Consulting.</description>\n' +
'    <language>en-us</language>\n' +
'    <lastBuildDate>' + new Date(built).toUTCString() + '</lastBuildDate>\n' +
'    <generator>siamakconsulting.com</generator>\n' +
'    <managingEditor>siamakk2@gmail.com (Siamak Kalhor)</managingEditor>\n' +
(body ? body + '\n' : '') +
'  </channel>\n</rss>\n';

  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=21600, stale-while-revalidate=86400');
  return res.status(200).send(feed);
};
