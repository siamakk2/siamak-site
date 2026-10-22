#!/usr/bin/env node
/**
 * Publishes one Long View article from a spec file.
 *
 * Built after doing this by hand four times. Every step here is one that was
 * got wrong at least once on this site:
 *  - the template is spliced rather than copied, so nav/footer/CSS cannot drift
 *  - head metadata is written fresh, because the template carries copy-paste
 *    leftovers pointing og:image and twitter:url at an unrelated article
 *  - FAQ schema is DERIVED from the rendered copy, so the two cannot diverge
 *  - the card, the index card, the sitemap entry and llms.txt all happen here,
 *    because doing them separately is how one gets forgotten
 *
 * Usage: node scripts/publish-article.js spec.json
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const TEMPLATE = path.join(ROOT, 'the-long-view/ads-in-chatgpt/index.html');
const spec = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));

const SLUG = spec.slug;
const URL = 'https://siamakconsulting.com/the-long-view/' + SLUG;
const OGIMG = 'https://siamakconsulting.com/og/the-long-view/' + SLUG + '.jpg';

// ---- 1. page ------------------------------------------------------------
// The template is edited by hand over time (new head scripts, a body class),
// so it is located by markers, never by line number. A line-number slice once
// silently pasted a second whole document into a published page.
const TPL = fs.readFileSync(TEMPLATE, 'utf8');
function cut(str, startMarker, endMarker, from = 0) {
  const i = str.indexOf(startMarker, from);
  const j = str.indexOf(endMarker, i + startMarker.length);
  if (i < 0 || j < 0) throw new Error('template marker missing: ' + startMarker + ' / ' + endMarker);
  return [i, j];
}
const meta = [
  ['title', null, spec.title],
  ['meta', 'name=description', spec.description],
  ['meta', 'name=robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'],
  ['meta', 'name=author', 'Siamak Kalhor']
];
const head = [
  '<title>' + spec.title + '</title>',
  '<meta name="description" content="' + spec.description + '">',
  '<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">',
  '<meta name="author" content="Siamak Kalhor">',
  '<meta property="og:type" content="article">',
  '<meta property="og:site_name" content="Siamak Kalhor Consulting">',
  '<meta property="og:locale" content="en_US">',
  '<meta property="og:url" content="' + URL + '">',
  '<meta property="og:title" content="' + spec.title + '">',
  '<meta property="og:description" content="' + spec.description + '">',
  '<meta property="og:image" content="' + OGIMG + '">',
  '<meta property="og:image:secure_url" content="' + OGIMG + '">',
  '<meta property="og:image:width" content="1200">',
  '<meta property="og:image:height" content="630">',
  '<meta property="og:image:type" content="image/jpeg">',
  '<meta property="og:image:alt" content="' + spec.imageAlt + '">',
  '<meta property="article:published_time" content="' + spec.date + 'T09:00:00-07:00">',
  '<meta property="article:modified_time" content="' + spec.date + 'T09:00:00-07:00">',
  '<meta property="article:author" content="Siamak Kalhor">',
  '<meta property="article:publisher" content="https://siamakconsulting.com">',
  '<meta property="article:section" content="The Long View">',
  '<meta name="twitter:card" content="summary_large_image">',
  '<meta name="twitter:site" content="@SiamakKalhor">',
  '<meta name="twitter:creator" content="@SiamakKalhor">',
  '<meta name="twitter:url" content="' + URL + '">',
  '<meta name="twitter:title" content="' + spec.title + '">',
  '<meta name="twitter:description" content="' + spec.description + '">',
  '<meta name="twitter:image" content="' + OGIMG + '">',
  '<meta name="twitter:image:alt" content="' + spec.imageAlt + '">',
  '<meta name="theme-color" content="#000000">'
].join('\n');

const tail = [
  '<link rel="canonical" href="' + URL + '"/>',
  '<link rel="stylesheet" href="/type.css">',
  '<!--type-scaled-->',
  '<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,400&display=swap" rel="stylesheet">',
  '<link rel="stylesheet" href="/editorial.css">'
].join('\n');

const hero = '<main id="main"><article><section class="article-hero"><header class="wrap">'
  + '<div class="crumb"><a href="/the-long-view">The Long View</a> / ' + spec.category + '</div>'
  + '<h1 class="article-h">' + spec.h1 + '</h1>'
  + '<div class="byline"><img src="/assets/silhouette.svg" alt="Siamak Kalhor" width="46" height="46" loading="lazy">'
  + '<div class="who">Siamak Kalhor<span>Forty years in marketing &mdash; ' + spec.readTime + ' minute read</span></div>'
  + '</div></header></section>\n';

const body = fs.readFileSync(path.join(path.dirname(process.argv[2]), spec.bodyFile), 'utf8').trimEnd();

const related = spec.related.map(r =>
  '<a href="/the-long-view/' + r.slug + '" style="background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:18px;text-decoration:none;">'
  + '<div style="font-family:var(--display);font-weight:600;color:var(--text);font-size:16.5px;line-height:1.35;">' + r.title + '</div></a>').join('\n');

const checks = spec.checks.map(c =>
  '<div class="check"><span class="c">&rarr;</span><a href="' + c.href + '">' + c.label + '</a></div>').join('');

const closing = '\n</div></div></section>\n'
  + '<section style="padding:44px 0 70px;border-top:1px solid var(--line);"><div class="wrap" style="max-width:820px;">'
  + '<div class="sec-label">Related</div><h2 style="font-family:var(--display);font-size:22px;color:var(--text);margin:10px 0 18px;">More from The Long View</h2>'
  + '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">' + related + '</div></div></section>\n'
  + '<section><div class="wrap"><div class="sec-label">Related</div><div class="checks">' + checks + '</div></div></section>\n'
  + '</article></main>';

// Head: swap the template's metadata block (title .. first preconnect),
// its canonical, and its JSON-LD. Body: swap <main>. Nav, footer and every
// site-wide script stay exactly as the template has them.
let page = TPL;
let [h1i, h1j] = cut(page, '<title>', '<link rel="preconnect"');
page = page.slice(0, h1i) + head + '\n' + page.slice(h1j);
page = page.replace(/<link rel="canonical" href="[^"]*"\/>/, '<link rel="canonical" href="' + URL + '"/>');
page = page.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\n?/g, '');
page = page.replace('</head>', 'SCHEMA_PLACEHOLDER\n</head>');
const [mi, mj] = cut(page, '<main id="main">', '</main>');
page = page.slice(0, mi) + hero + '<section class="prose-wrap"><div class="wrap"><div class="prose">\n\n'
  + body + closing + page.slice(mj + '</main>'.length);
if ((page.match(/<!DOCTYPE/gi) || []).length !== 1 || (page.match(/<body\b/g) || []).length !== 1 || (page.match(/<title>/g) || []).length !== 1)
  throw new Error('assembled page is malformed (doctype/body/title count)');

const dir = path.join(ROOT, 'the-long-view', SLUG);
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'index.html'), page);

// ---- 2. schema, derived from the rendered copy --------------------------
const INLINE = 'a|b|i|em|strong|span|code|small|sub|sup|u|abbr|cite|mark|time';
const NAMED = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', mdash: '—',
  ndash: '–', hellip: '…', rsquo: '’', lsquo: '‘', ldquo: '“',
  rdquo: '”', middot: '·', rarr: '→', times: '×', deg: '°' };
function decode(s) {
  return String(s).replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-z][a-z0-9]*);/gi, (m, n) => NAMED[n.toLowerCase()] !== undefined ? NAMED[n.toLowerCase()] : m);
}
function plain(s) {
  return decode(s.replace(new RegExp('</?(?:' + INLINE + ')(?:\\s[^>]*)?>', 'gi'), '')
    .replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}
let html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const qsec = html.split('<h2>Common questions</h2>')[1].split('<h2>Sources</h2>')[0];
const faqs = [...qsec.matchAll(/<p><strong>([\s\S]*?)<\/strong><br>([\s\S]*?)<\/p>/g)]
  .map(m => ({ q: plain(m[1]), a: plain(m[2]) }));
if (!faqs.length) { console.error('  ' + SLUG + ': NO FAQ PAIRS FOUND'); process.exit(1); }

const blog = {
  '@context': 'https://schema.org', '@type': 'BlogPosting', '@id': URL + '#article',
  headline: spec.title, description: spec.description, url: URL,
  mainEntityOfPage: { '@type': 'WebPage', '@id': URL },
  author: { '@id': 'https://siamakconsulting.com/#person' },
  publisher: { '@id': 'https://siamakconsulting.com/#business' },
  isPartOf: { '@type': 'Blog', '@id': 'https://siamakconsulting.com/the-long-view#blog', name: 'The Long View' },
  datePublished: spec.date, dateModified: spec.date, articleSection: spec.category,
  keywords: spec.keywords,
  about: (spec.about || []).map(n => ({ '@type': 'Thing', name: n }))
};
const faq = {
  '@context': 'https://schema.org', '@type': 'FAQPage', '@id': URL + '#faq',
  isPartOf: { '@id': URL + '#article' },
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
};
const crumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://siamakconsulting.com/' },
    { '@type': 'ListItem', position: 2, name: 'The Long View', item: 'https://siamakconsulting.com/the-long-view' },
    { '@type': 'ListItem', position: 3, name: spec.title, item: URL }]
};
html = html.replace('SCHEMA_PLACEHOLDER',
  [blog, faq, crumb].map(o => '<script type="application/ld+json">' + JSON.stringify(o) + '</script>').join('\n'));
fs.writeFileSync(path.join(dir, 'index.html'), html);

// ---- 3. share card ------------------------------------------------------
execFileSync('node', [path.join(ROOT, 'scripts/make-og.js'),
  '--slug', SLUG, '--kicker', spec.kicker, '--headline', spec.cardHeadline, '--sub', spec.cardSub],
  { cwd: ROOT, stdio: 'pipe' });

// ---- 4. index card, sitemap, llms.txt -----------------------------------
const idxPath = path.join(ROOT, 'the-long-view/index.html');
let idx = fs.readFileSync(idxPath, 'utf8');
if (!idx.includes('/the-long-view/' + SLUG + '"')) {
  const anchor = idx.match(/ {6}<a href="\/the-long-view\/[a-z0-9-]+" class="card"[^>]*>/);
  const card = '      <a href="/the-long-view/' + SLUG + '" class="card" style="text-decoration:none;display:block;">\n'
    + '        <div class="sec-label" style="margin-bottom:10px;">' + spec.category + '</div>\n'
    + '        <h3 style="font-family:var(--display);font-size:19px;font-weight:600;color:var(--text);margin-bottom:10px;line-height:1.3;">' + spec.title + '</h3>\n'
    + '        <p style="font-size:15.5px;color:var(--muted);line-height:1.7;">' + spec.cardBlurb + '</p>\n'
    + '      </a>\n';
  idx = idx.replace(anchor[0], card + anchor[0]);
  fs.writeFileSync(idxPath, idx);
}

const smPath = path.join(ROOT, 'sitemap.xml');
let sm = fs.readFileSync(smPath, 'utf8');
if (!sm.includes('/the-long-view/' + SLUG + '<')) {
  const ref = sm.match(/<url><loc>https:\/\/siamakconsulting\.com\/the-long-view\/[a-z0-9-]+<\/loc>/)[0];
  sm = sm.replace(ref, '<url><loc>' + URL + '</loc><lastmod>' + spec.date + '</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>\n' + ref);
  fs.writeFileSync(smPath, sm);
}

const llPath = path.join(ROOT, 'llms.txt');
let ll = fs.readFileSync(llPath, 'utf8');
if (!ll.includes('/the-long-view/' + SLUG + ')')) {
  const ref = ll.match(/^- \[[^\]]*\]\(https:\/\/siamakconsulting\.com\/the-long-view\/[a-z0-9-]+\).*$/m)[0];
  ll = ll.replace(ref, '- [' + spec.title + '](' + URL + '): ' + spec.llmsDesc + '\n' + ref);
  fs.writeFileSync(llPath, ll);
}

console.log('  ' + SLUG + '  |  ' + faqs.length + ' FAQ pairs  |  title ' + spec.title.length + '  |  desc ' + spec.description.length);
