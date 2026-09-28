const { rateLimit } = require('./_guard');

// Local visibility scan — the website half.
//
// Business owners ask "why am I not on Google Maps?" and most tools answer by
// pretending to check a Maps ranking. Nothing here does that. Querying Maps
// rankings needs the Places API, and scraping the results breaches Google's
// terms — a tool on an LLMO practice's site that fakes a rank check would be
// precisely the overclaim this business tells clients to walk away from.
//
// What this does instead is read the signals a local ranking is actually built
// from that ARE readable: the structured data, the NAP, the geo, the hours, the
// service area. Those are the inputs Google and every assistant reconcile
// against a Business Profile, and when they disagree, confidence drops and a
// competitor gets named.
//
// Deterministic, no model call, no API cost. Runs in about a second, so the
// page can show a real report immediately while the slower live AI check
// (api/local-audit) loads underneath it.
//
// The Google Business Profile items this cannot see are returned as an explicit
// self-check list rather than guessed at. Saying "I cannot see this, here is
// how to check it in ninety seconds" is more useful than a fabricated score.

const UA = 'Mozilla/5.0 (compatible; SiamakConsultingLocalScan/1.0; +https://siamakconsulting.com/local)';

function normalizeUrl(input) {
  let u = String(input || '').trim();
  if (!u) return null;
  // A scheme that is not http(s) is rejected outright. Prefixing it produced
  // "https://ftp//x.com" — a real URL pointing somewhere nobody asked for.
  if (/^[a-z][a-z0-9+.-]*:/i.test(u) && !/^https?:\/\//i.test(u)) return null;
  if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
  try {
    const parsed = new URL(u);
    if (!/^https?:$/.test(parsed.protocol)) return null;
    // No internal hosts. This fetches whatever it is handed, so it must not be
    // usable to probe a private network from the server.
    const h = parsed.hostname.toLowerCase();
    if (h === 'localhost' || h.endsWith('.local') || h.endsWith('.internal') ||
        /^\d+\.\d+\.\d+\.\d+$/.test(h) || h.indexOf(':') !== -1) return null;
    return parsed.toString();
  } catch (e) { return null; }
}

function walk(node, fn) {
  if (Array.isArray(node)) { node.forEach(function (n) { walk(n, fn); }); return; }
  if (node && typeof node === 'object') {
    fn(node);
    Object.keys(node).forEach(function (k) { walk(node[k], fn); });
  }
}

const LOCAL_TYPES = /LocalBusiness|Dentist|Physician|MedicalBusiness|LegalService|Attorney|Restaurant|Store|HomeAndConstructionBusiness|ProfessionalService|AutomotiveBusiness|HealthAndBeautyBusiness|FinancialService|RealEstateAgent|Plumber|Electrician|RoofingContractor|GeneralContractor|Locksmith|MovingCompany|ChildCare|DaySpa|HairSalon|VeterinaryCare|Optician|Pharmacy|EmergencyService|FoodEstablishment|Hotel|Lodging/;

function parseJsonLd(html) {
  const blocks = [];
  let invalid = 0;
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    try { blocks.push(JSON.parse(m[1].trim())); }
    catch (e) { invalid++; }
  }
  return { blocks: blocks, invalid: invalid };
}

function textOf(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Phone numbers appear in a dozen formats. Compare on digits only, and keep the
// last ten so a leading +1 or 1 does not create a false mismatch.
function phoneDigits(s) {
  const d = String(s || '').replace(/\D/g, '');
  return d.length >= 10 ? d.slice(-10) : '';
}

function collectLocalEntities(blocks) {
  const found = [];
  blocks.forEach(function (b) {
    walk(b, function (n) {
      const t = n['@type'];
      const types = Array.isArray(t) ? t.join(' ') : String(t || '');
      if (!LOCAL_TYPES.test(types)) return;
      // A reference-only node ({"@id": "..."}) is a pointer, not a definition.
      if (Object.keys(n).filter(function (k) { return k[0] !== '@'; }).length === 0) return;
      found.push({ types: types, node: n });
    });
  });
  return found;
}

function addressOf(node) {
  const a = node.address;
  if (!a) return null;
  if (typeof a === 'string') return { raw: a, partial: true };
  return {
    street: a.streetAddress || '',
    locality: a.addressLocality || '',
    region: a.addressRegion || '',
    postal: a.postalCode || '',
    country: a.addressCountry || ''
  };
}

function scan(html, finalUrl) {
  const ld = parseJsonLd(html);
  const entities = collectLocalEntities(ld.blocks);
  const primary = entities.length ? entities[0].node : null;
  const body = textOf(html);
  const head = html.slice(0, html.indexOf('</head>') + 7 || 4000);

  const title = (html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || '';
  const h1 = textOf((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || '');

  const telLinks = (html.match(/href=["']tel:([^"']+)["']/gi) || [])
    .map(function (s) { return phoneDigits(s); }).filter(Boolean);
  const mapLink = /google\.[a-z.]+\/maps|maps\.app\.goo\.gl|g\.page\//i.test(html);
  const mapEmbed = /<iframe[^>]+google\.[a-z.]+\/maps[^>]*>/i.test(html);

  const addr = primary ? addressOf(primary) : null;
  const geo = primary && primary.geo && (primary.geo.latitude || primary.geo.longitude);
  const hours = primary && (primary.openingHoursSpecification || primary.openingHours);
  const sameAs = primary && Array.isArray(primary.sameAs) ? primary.sameAs : [];
  const schemaPhone = primary ? phoneDigits(primary.telephone) : '';

  // The signal that matters most is agreement. A phone in schema that differs
  // from the phone a visitor taps is the exact ambiguity that costs a listing.
  const phoneInBody = telLinks.length > 0;
  const phoneAgrees = !schemaPhone || !phoneInBody || telLinks.indexOf(schemaPhone) !== -1;

  const localityInBody = addr && addr.locality &&
    body.toLowerCase().indexOf(addr.locality.toLowerCase()) !== -1;
  const streetInBody = addr && addr.street &&
    body.toLowerCase().replace(/[^a-z0-9 ]/g, '').indexOf(
      addr.street.toLowerCase().replace(/[^a-z0-9 ]/g, '')) !== -1;

  const checks = [];
  function check(id, weight, ok, label, detail, fix) {
    checks.push({ id: id, weight: weight, ok: !!ok, label: label, detail: detail, fix: fix || null });
  }

  check('schema', 20, entities.length > 0,
    'LocalBusiness structured data',
    entities.length
      ? 'Found: ' + entities.map(function (e) { return e.types; }).join(', ')
      : 'No LocalBusiness-type schema on this page.',
    entities.length ? null
      : 'Add LocalBusiness (or the specific subtype for your trade) JSON-LD with name, address, telephone and geo. This is how a machine reads who and where you are without guessing.');

  check('address', 18, addr && addr.street && addr.locality && addr.region && addr.postal,
    'Complete address in structured data',
    !addr ? 'No address in structured data.'
      : addr.partial ? 'Address is a single text string rather than separate fields.'
      : [addr.street, addr.locality, addr.region, addr.postal].filter(Boolean).join(', ') || 'Incomplete.',
    (addr && addr.street && addr.locality && addr.region && addr.postal) ? null
      : 'Use PostalAddress with streetAddress, addressLocality, addressRegion and postalCode as separate fields. A single string forces the reader to parse it, and parsing fails.');

  check('phone', 14, phoneInBody && phoneAgrees,
    'Phone number, tappable and consistent',
    !phoneInBody ? 'No tel: link found — the number may be text or an image.'
      : !phoneAgrees ? 'The phone in your structured data does not match the phone on the page.'
      : 'Consistent across markup and structured data.',
    !phoneInBody ? 'Wrap your number in a tel: link. It makes the number machine-readable and it is one tap on a phone.'
      : !phoneAgrees ? 'Make them identical. Two numbers for one business is the commonest reason a listing loses confidence.' : null);

  check('geo', 10, !!geo,
    'Geographic coordinates',
    geo ? 'Latitude and longitude present.' : 'No geo coordinates in structured data.',
    geo ? null : 'Add geo with latitude and longitude. It removes any ambiguity about which location you are, which matters most where several businesses share an address or a street name repeats across a metro.');

  check('hours', 10, !!hours,
    'Opening hours',
    hours ? 'Declared in structured data.' : 'No opening hours in structured data.',
    hours ? null : 'Add openingHoursSpecification. Missing hours is one of the most common gaps, and hours that disagree with your Business Profile is worse than none.');

  const napOk = localityInBody && (streetInBody || !addr || !addr.street);
  check('nap-visible', 12, napOk,
    'Address visible on the page, not only in schema',
    !addr ? 'No address in structured data to compare against the page.'
      : napOk ? 'Street and city both appear in the page text.'
      : localityInBody ? 'The city appears in the page text, but the street address does not.'
      : 'Neither the street nor the city from your structured data appears in the visible page text.',
    napOk ? null
      : 'Put the full address in the footer as ordinary readable text. Structured data alone is a claim about yourself; text a visitor can see is corroboration of it.');

  check('map', 6, mapLink || mapEmbed,
    'Link to your Google Business Profile or map',
    mapEmbed ? 'Map embedded.' : mapLink ? 'Link present.' : 'No map or Business Profile link found.',
    (mapLink || mapEmbed) ? null
      : 'Link to your Business Profile from the site. It is an explicit statement that this website and that listing are the same business.');

  check('sameas', 10, sameAs.length >= 3,
    'Third-party profiles declared',
    sameAs.length ? sameAs.length + ' profile' + (sameAs.length === 1 ? '' : 's') + ' declared.'
      : 'No sameAs profiles in structured data.',
    sameAs.length >= 3 ? null
      : 'List your Business Profile, review platforms and industry directories in sameAs. This is how you tell a machine those listings are you rather than someone similar.');

  const earned = checks.reduce(function (s, c) { return s + (c.ok ? c.weight : 0); }, 0);
  const possible = checks.reduce(function (s, c) { return s + c.weight; }, 0);
  const score = Math.round(earned / possible * 100);

  return {
    url: finalUrl,
    score: score,
    business_name: primary && primary.name ? String(primary.name).slice(0, 120) : null,
    detected_city: addr && addr.locality ? addr.locality : null,
    title: title.trim().slice(0, 140),
    h1: h1.slice(0, 140),
    schema_invalid_blocks: ld.invalid,
    checks: checks,
    passed: checks.filter(function (c) { return c.ok; }).length,
    total: checks.length
  };
}

// Things a Google Business Profile controls that no external scan can see.
// Returned as instructions rather than assertions — the honest alternative to
// inventing a completeness percentage for a surface this has no access to.
const GBP_SELF_CHECK = [
  { k: 'Claimed and verified',
    q: 'Search your business name on Google. Do you see "Own this business?" — that means it is unclaimed.',
    why: 'An unclaimed profile is the single largest gap in local visibility, and claiming it is free.' },
  { k: 'Primary category',
    q: 'Is your primary category the most specific one that fits, rather than a general one?',
    why: 'Primary category is the heaviest single ranking factor in the local pack. "Emergency Plumber" and "Plumber" surface for different searches.' },
  { k: 'Hours, including holidays',
    q: 'Are your hours current, and do they match the hours on your website exactly?',
    why: 'Conflicting hours between a profile and a website reduces confidence in both.' },
  { k: 'Address and service area',
    q: 'If you visit customers rather than the reverse, is a service area set instead of a public address?',
    why: 'A service-area business showing a home address, or hiding one it should show, both suppress reach.' },
  { k: 'Photographs',
    q: 'Are there recent photographs — exterior, interior, team, work?',
    why: 'Profiles with current photographs get materially more interaction, and interaction feeds ranking.' },
  { k: 'Reviews and replies',
    q: 'Are reviews arriving steadily, and is every one answered?',
    why: 'Recency and response rate both count. Twenty reviews spread over two years beats fifty from one week three years ago.' },
  { k: 'Services and products',
    q: 'Is every service listed individually with its own description?',
    why: 'Listed services are matched against searches directly; a single generic description is not.' },
  { k: 'The description',
    q: 'Does the description state what you do, where, and for whom — in the first sentence?',
    why: 'It is one of the few pieces of free text you control on a surface that otherwise reports facts about you.' }
];

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const rl = await rateLimit(req, 'local-scan', 40, 3600);
  if (!rl.ok) return res.status(429).json({ error: 'Too many requests. Please try again later.' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const raw = (body && body.url) || (req.query && req.query.url) || '';
  const url = normalizeUrl(raw);
  if (!url) return res.status(200).json({ error: 'Enter a website address, for example yourbusiness.com' });

  try {
    const ctrl = new AbortController();
    const timer = setTimeout(function () { ctrl.abort(); }, 15000);
    let r;
    try {
      r = await fetch(url, { signal: ctrl.signal, redirect: 'follow',
                             headers: { 'User-Agent': UA, 'Accept': 'text/html' } });
    } finally { clearTimeout(timer); }

    if (!r.ok) {
      return res.status(200).json({
        error: 'That site returned ' + r.status + '. Check the address and try again.',
        gbp_self_check: GBP_SELF_CHECK
      });
    }
    const ct = r.headers.get('content-type') || '';
    if (ct && ct.indexOf('html') === -1) {
      return res.status(200).json({ error: 'That address did not return a web page.',
                                    gbp_self_check: GBP_SELF_CHECK });
    }

    const html = (await r.text()).slice(0, 900000);
    const result = scan(html, r.url || url);
    result.gbp_self_check = GBP_SELF_CHECK;
    result.scanned_at = new Date().toISOString();
    res.setHeader('Cache-Control', 'public, s-maxage=300');
    return res.status(200).json(result);
  } catch (e) {
    const aborted = e && (e.name === 'AbortError' || /abort/i.test(String(e.message)));
    return res.status(200).json({
      error: aborted ? 'That site took too long to respond.'
                     : 'Could not reach that site. Check the address and try again.',
      gbp_self_check: GBP_SELF_CHECK
    });
  }
};
