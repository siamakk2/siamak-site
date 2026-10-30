#!/usr/bin/env node
/* Generates the marketing/SEO pages for Pattern Studio into public/:
   /how-it-works /garments /garments/<slug> /cosplay /designers /faq /about /sitemap.xml /robots.txt /llms.txt
   Garment data comes straight from the engine (engine/garments.json, extracted at build). */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..'), P = p => path.join(root, 'public', p);
const SITE = 'https://studio.siamakconsulting.com';
const NAME = 'Pattern Studio';
const TODAY = new Date().toISOString().slice(0, 10);

/* ── garment data + icons from the built engine ── */
const src = fs.readFileSync(path.join(root, 'engine', 'engine.js'), 'utf8');
const a = src.indexOf('const cx=c=>'), b = src.indexOf('const GARMENT_ORDER='), bEnd = src.indexOf('\n', b);
const ctx = { __out: null }; vm.createContext(ctx);
vm.runInContext(src.slice(a, bEnd) + ';__out={DESIGNS,GARMENT_ORDER,ICONS};', ctx);
const { DESIGNS, GARMENT_ORDER, ICONS } = ctx.__out;
const slug = id => id.replace(/_/g, '-');
const G = GARMENT_ORDER.map(id => { const c = DESIGNS[id]; return {
  id, slug: slug(id), label: c.label, tip: (c.tip || '').replace(/<[^>]+>/g, ''), sku: c.sku || '', chips: c.chips || [],
  fields: c.fields.map(f => ({ l: f.l.replace(/\s*\*$/, ''), h: f.h || '', req: !!f.req })),
  styles: c.styles.map(s => { let pieces = []; try { const m = {}; c.fields.forEach(f => m[f.id] = f.def || 30); pieces = s.pieces(m).map(p => p.n); } catch (e) {} return { name: s.name, sub: s.sub || '', pieces: [...new Set(pieces)] }; }),
  icon: (ICONS[id] || '').replace(/id="mgi_/g, 'id="pg_' + id + '_').replace(/url\(#mgi_/g, 'url(#pg_' + id + '_'),
}; });
fs.writeFileSync(path.join(root, 'engine', 'garments.json'), JSON.stringify(G.map(({ icon, ...g }) => g), null, 1));
const STYLE_COUNT = G.reduce((n, g) => n + g.styles.length, 0);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ── layout ── */
function layout({ path: p, title, description, h1, kicker, lede, body, jsonld = [], ogImage = '/og.png', wide = false }) {
  const url = SITE + p;
  const ld = [{ '@context': 'https://schema.org', '@type': 'WebPage', name: title, description, url, isPartOf: { '@type': 'WebSite', name: NAME, url: SITE } }, ...jsonld];
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#0b0a10">
<meta property="og:type" content="website"><meta property="og:site_name" content="${NAME}">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}"><meta property="og:image" content="${SITE}${ogImage}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${SITE}${ogImage}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="/icon-180.png"><link rel="manifest" href="/manifest.json">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="/styles.css"><link rel="stylesheet" href="/site.css">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body class="ps-body ps-site">
<header class="st-bar">
  <a class="ps-brand" href="/"><span class="ps-brand-mark" aria-hidden="true"><svg viewBox="0 0 40 40" width="34" height="34"><defs><linearGradient id="psMarkS" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff2d87"/><stop offset="1" stop-color="#9b6bff"/></linearGradient></defs><path d="M8 32 L20 6 L32 32 Z" fill="none" stroke="url(#psMarkS)" stroke-width="2.2" stroke-linejoin="round"/><path d="M13 24 Q20 20 27 24" fill="none" stroke="#e2c275" stroke-width="1.6"/><circle cx="20" cy="6" r="2.2" fill="#e2c275"/></svg></span><span class="ps-brand-word">Pattern<em>Studio</em></span></a>
  <nav class="st-nav">
    <a href="/how-it-works">How it works</a><a href="/garments">Garments</a><a href="/cosplay">Cosplay</a><a href="/designers">Designers</a><a href="/faq">FAQ</a>
    <a class="st-cta" href="/#pg1">Open the studio &rarr;</a>
  </nav>
</header>
<main class="st-main${wide ? ' st-wide' : ''}">
  <section class="st-hero">
    ${kicker ? `<div class="ps-eyebrow"><span>${esc(kicker)}</span></div>` : ''}
    <h1 class="ps-title">${h1}</h1>
    ${lede ? `<p class="ps-lede">${lede}</p>` : ''}
  </section>
  ${body}
</main>
<footer class="ps-foot st-foot">
  <span class="ps-brand-word">Pattern<em>Studio</em></span>
  <nav><a href="/how-it-works">How it works</a> · <a href="/garments">24 garments</a> · <a href="/cosplay">Cosplay</a> · <a href="/designers">Designers</a> · <a href="/faq">FAQ</a> · <a href="/about">About</a></nav>
  <span>Fabrics &amp; checkout by <a href="https://bluemoonfabrics.com" target="_blank" rel="noopener">Blue Moon Fabrics</a> · built by <a href="https://siamakconsulting.com" target="_blank" rel="noopener">Siamak Kalhor Consulting</a></span>
</footer>
</body>
</html>
`;
}
const card = (h, t, i) => `<div class="st-card">${i ? `<div class="st-card-ico">${i}</div>` : ''}<h3>${h}</h3><p>${t}</p></div>`;
const cta = (label = 'Start a pattern — it\'s free', href = '/#pg1') => `<p class="st-cta-row"><a class="btn-next st-btn" href="${href}">${label}</a></p>`;

const pages = [];
function page(o) { pages.push(o); const file = o.path === '/' ? 'index.html' : o.path.replace(/^\//, '') + '.html'; fs.mkdirSync(path.dirname(P(file)), { recursive: true }); fs.writeFileSync(P(file), layout(o)); }

/* ── How it works ── */
page({ path: '/how-it-works', title: 'How Pattern Studio works — from silhouette to cut-ready pattern', kicker: 'How it works',
  description: 'Five steps: choose a garment, pick a design style, enter your measurements, choose the fabric, generate. You get a drafted pattern with seam allowance, grain lines and notches, a nested cutting layout, yardage, a designer croquis and a photoreal render on a model.',
  h1: 'Five steps from <em>idea</em> to cutting table', lede: 'No CAD skills, no plug-ins. Everything runs in your browser and exports to the formats cutters and home sewists actually use.',
  body: `
  <ol class="st-steps">
    <li><b>Choose your silhouette</b><span>${G.length} garments — swim, active, dance, lingerie, dresses, cosplay bodysuits. Each unlocks its own design styles and measurement fields.</span></li>
    <li><b>Pick a design style</b><span>${STYLE_COUNT} drafted styles (halter, racerback, sweetheart, strapless, high-waist…). Describe your idea in words and the AI style picker matches it.</span></li>
    <li><b>Enter measurements</b><span>Real body measurements in inches, not ready-to-wear sizes. Smart defaults fill anything optional; fit sliders add ease, FBA, rise and length adjustments.</span></li>
    <li><b>Choose the fabric</b><span>Live catalog from Blue Moon Fabrics. The croquis redraws instantly; press <em>Render on model</em> to see the finished garment photographed on a woman or a man, in that exact fabric.</span></li>
    <li><b>Generate</b><span>Every piece drafted with seam allowance, grain, fold and notches; auto-arranged on your fabric width; yardage and efficiency calculated; size run XS–3XL; export DXF for cutters, SVG, PNG or print.</span></li>
  </ol>
  <div class="st-grid">
    ${card('Cut-ready, not a sketch', 'DXF opens in Gerber, Optitex, Clo, Lectra and any plotter. SVG and PNG for home printing. Every piece labelled with cut quantity, fold and grain.')}
    ${card('Nesting that saves fabric', 'Auto Arrange tries height, area and width sort strategies and keeps the most efficient layout. You see efficiency %, waste and yards to buy before you order.')}
    ${card('Fabric-aware drafting', 'Stretch, directional, stripe-match, sequin and velvet behaviours change seam allowances, grain and layout rules automatically.')}
    ${card('Renders you can show a client', 'Garment, style, construction details, measurements and the fabric’s real product photo go into every render — on five women’s and five men’s body types, studio, runway, beach or cosplay booth.')}
  </div>
  ${cta()}`,
  jsonld: [{ '@context': 'https://schema.org', '@type': 'HowTo', name: 'Make a custom sewing pattern with Pattern Studio', step: ['Choose your silhouette', 'Pick a design style', 'Enter measurements', 'Choose the fabric', 'Generate and export'].map((n, i) => ({ '@type': 'HowToStep', position: i + 1, name: n })) }] });

/* ── Garments index + detail ── */
page({ path: '/garments', title: `${G.length} garments, ${STYLE_COUNT} styles — Pattern Studio catalogue`, kicker: 'Catalogue',
  description: `Every garment Pattern Studio drafts, with its design styles, measurement fields and pattern pieces: ${G.map(g => g.label).join(', ')}.`,
  h1: `${G.length} garments. <em>${STYLE_COUNT} styles.</em> Your measurements.`, lede: 'Tap a garment to see its styles, the measurements it needs and the pattern pieces it drafts.', wide: true,
  body: `<div class="st-garments">${G.map(g => `<a class="st-garment" href="/garments/${g.slug}"><div class="st-garment-ico">${g.icon}</div><div class="st-garment-name">${esc(g.label)}</div><div class="st-garment-sub">${g.styles.map(s => esc(s.name)).join(' · ')}</div></a>`).join('')}</div>${cta()}`,
  jsonld: [{ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: G.map((g, i) => ({ '@type': 'ListItem', position: i + 1, name: g.label, url: `${SITE}/garments/${g.slug}` })) }] });

for (const g of G) {
  const styleNames = g.styles.map(s => s.name).join(', ');
  page({ path: `/garments/${g.slug}`, title: `${g.label} pattern maker — ${g.styles.length} styles, drafted to your measurements`, kicker: 'Garment',
    description: `Draft a custom ${g.label.toLowerCase()} sewing pattern in ${g.styles.length} styles (${styleNames}) from your own measurements. Seam allowance, grain, nesting, yardage, DXF/SVG export and a photoreal render on a model.`,
    h1: `${esc(g.label)} <em>pattern maker</em>`, lede: esc(g.tip || `Custom ${g.label.toLowerCase()} patterns from your measurements.`),
    body: `
    <div class="st-garment-hero"><div class="st-garment-big">${g.icon}</div>
      <div><div class="st-kv"><b>Styles</b><span>${g.styles.length}</span></div><div class="st-kv"><b>Measurements</b><span>${g.fields.filter(f => f.req).length} required, ${g.fields.filter(f => !f.req).length} optional</span></div>${g.sku ? `<div class="st-kv"><b>Suggested fabric</b><span>${esc(g.sku)}</span></div>` : ''}
      ${cta(`Draft a ${g.label} →`, '/#pg1')}</div></div>
    <h2 class="st-h2">Design styles</h2>
    <div class="st-grid">${g.styles.map(s => card(esc(s.name), (s.sub ? esc(s.sub) + '. ' : '') + (s.pieces.length ? `<span class="st-muted">Pieces: ${s.pieces.map(esc).join(', ')}</span>` : ''))).join('')}</div>
    <h2 class="st-h2">Measurements it asks for</h2>
    <ul class="st-fields">${g.fields.map(f => `<li><b>${esc(f.l)}</b>${f.req ? ' <i>required</i>' : ''}${f.h ? ` <span>${esc(f.h)}</span>` : ''}</li>`).join('')}</ul>
    ${g.chips.length ? `<h2 class="st-h2">Construction options</h2><p class="st-chips">${g.chips.map(c => `<span>${esc(c)}</span>`).join('')}</p>` : ''}
    <p class="st-back"><a href="/garments">&larr; All garments</a></p>`,
    jsonld: [{ '@context': 'https://schema.org', '@type': 'Product', name: `${g.label} custom sewing pattern`, description: g.tip, brand: { '@type': 'Brand', name: NAME }, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: `${SITE}/garments/${g.slug}` } }] });
}

/* ── Cosplay ── */
page({ path: '/cosplay', title: 'Cosplay pattern maker — bodysuits, leotards, corsets & costumes to your measurements', kicker: 'Cosplay',
  description: 'Draft cosplay bodysuits, unitards, leotards, corset tops, crop tops and costume bases to your exact measurements. Stretch-fabric aware, sized for men and women, with a photoreal render in your fabric before you cut.',
  h1: 'Built for <em>cosplay</em>. Fitted like couture.', lede: 'Spandex bodysuits, dance leotards, boned corsets, costume bases — drafted to the body that will wear them, man or woman, then rendered in the exact fabric so you know before you cut.',
  body: `<div class="st-grid">
    ${card('Bodysuits & unitards', 'Full-length, tank, long-sleeve and zip-front catsuits with gusset and crotch pieces. Negative ease for compression fits.')}
    ${card('Corsets & crop tops', 'Sweetheart and straight-neck corset tops with boning channels; princess-seam crop tops; sports-bra bases for armour.')}
    ${card('Costume bases', 'Leotard and costume blocks ready for armour, capes and appliqué. Export DXF to a cutter or SVG to print at home.')}
    ${card('Men’s and women’s models', 'Switch the model with one tap. Renders describe a men’s cut and chest sizing, or a women’s block, from the same drafted pattern.')}
    ${card('Foil, sequin, velvet, mesh', 'Fabric behaviour changes the draft: nap direction for velvet, no-stretch allowances for foil, mesh insert panels.')}
    ${card('See it before the con', 'Photoreal renders on a cosplay-booth or runway backdrop. Download and share the look for approval or commissions.')}
  </div>${cta('Start a cosplay pattern →')}` });

/* ── Designers ── */
page({ path: '/designers', title: 'Pattern Studio for fashion designers, seamstresses & small brands', kicker: 'Designers',
  description: 'A free, browser-based drafting assistant for designers and seamstresses: parametric patterns from measurements, size runs XS–3XL, nesting and yardage, DXF for industrial cutters, and client-ready renders on a model.',
  h1: 'Your <em>atelier</em>, in a browser tab.', lede: 'Draft, grade, nest, cost and present — then order the fabric. Built on forty years of LA Fashion District experience and Blue Moon Fabrics’ catalogue.',
  body: `<div class="st-grid">
    ${card('Parametric drafting', 'Change a measurement and every piece redraws. Fit sliders for ease, full-bust adjustment, rise, hip and asymmetric shoulders.')}
    ${card('Size runs', 'Grade one design across XS–3XL in a click, with a per-size yardage table for costing a small run.')}
    ${card('Industrial export', 'DXF for Gerber/Lectra/Optitex plotters and automatic cutters. Pieces carry grain, notches, fold and cut quantities.')}
    ${card('Client presentation', 'Designer croquis with a spec column plus photoreal renders in the real fabric — on the body type your client has.')}
    ${card('Projects', 'Save designs, come back, duplicate, iterate. Projects live in your browser; cloud accounts are next.')}
    ${card('Fabric in the loop', 'The catalogue is live inventory. Yardage goes straight to a Blue Moon Fabrics cart.')}
  </div>${cta('Open the studio →')}` });

/* ── FAQ ── */
const FAQ = [
  ['Is Pattern Studio free?', 'Yes. Drafting, nesting, exports and renders are free to use in the browser. You pay only for fabric if you order it.'],
  ['What do I get when I generate a pattern?', 'Every pattern piece drafted to your measurements with seam allowance, grain line, fold and notch marks; an auto-arranged cutting layout on your fabric width; yardage, efficiency and waste; a size run; DXF, SVG and PNG export; a designer croquis and a photoreal render on a model.'],
  ['Which measurements do I need?', 'Each garment lists its own. Most need bust/chest, waist and hips plus one or two lengths. Required fields are marked; the rest use smart defaults you can override.'],
  ['Can I make men’s patterns?', 'Yes. Leggings, unitards, rash guards, shorts, board shorts, biker shorts, jumpsuits, leotards, crop tops and costumes can be drafted and rendered on a male model. Garments drafted on a women’s block (bikinis, dresses, lingerie, corsets) stay female.'],
  ['What file formats can I export?', 'DXF (AAMA-style, for plotters and automatic cutters), SVG (vector, scalable, prints at 100 %), PNG, and a print view. A tiled A4/Letter PDF with registration marks is on the roadmap.'],
  ['How accurate is the render?', 'The render is built from the garment, design style, the construction options you ticked, your measurements, the fabric’s description and its real product photo. It is a photoreal visualisation to judge style, proportion and fabric — the pattern pieces are what you cut.'],
  ['Does it work on a phone?', 'Yes. The whole studio, including rendering and exports, works in mobile Safari and Chrome.'],
  ['Where does the fabric come from?', 'The live catalogue is Blue Moon Fabrics in the Los Angeles Fashion District. Adding yardage to cart opens their checkout.'],
  ['Can I use it for commercial work?', 'Yes. Patterns you draft are yours to sew, sell and commission.'],
];
page({ path: '/faq', title: 'Pattern Studio FAQ — formats, measurements, men’s patterns, renders', kicker: 'FAQ',
  description: 'Answers about Pattern Studio: what you get, which measurements you need, DXF/SVG exports, men’s and women’s models, render accuracy, phones and commercial use.',
  h1: 'Questions, <em>answered.</em>',
  body: `<div class="st-faq">${FAQ.map(([q, a]) => `<details class="faq"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>${cta()}`,
  jsonld: [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }] });

/* ── About ── */
page({ path: '/about', title: 'About Pattern Studio', kicker: 'About',
  description: 'Pattern Studio is a free browser-based custom sewing pattern maker for designers, seamstresses and cosplayers, created by Siamak Kalhor Consulting with Blue Moon Fabrics of the Los Angeles Fashion District.',
  h1: 'Forty years of fabric. <em>One new tool.</em>',
  body: `<div class="st-prose">
  <p>Pattern Studio started as the Blue Moon Fabrics pattern maker — a tool built inside a Shopify store so customers could draft a pattern and buy the right yardage in one place. It outgrew the store. This standalone studio keeps the proven drafting engine (${G.length} garments, ${STYLE_COUNT} styles) and adds what a store page could not: photoreal renders in the real fabric, men’s and women’s models, deep links, and a roadmap that is not limited by a theme editor.</p>
  <p>It is built by <a href="https://siamakconsulting.com">Siamak Kalhor Consulting</a> in Los Angeles, with <a href="https://bluemoonfabrics.com">Blue Moon Fabrics</a> supplying the live catalogue and fulfilment. Blue Moon has served the LA Fashion District’s designers, dancewear makers and swimwear labels for decades; the studio is the digital version of leaning on the counter and asking “what would this look like in that?”</p>
  <p>Questions, feature requests or press: <a href="https://siamakconsulting.com/contact">siamakconsulting.com/contact</a>.</p>
  </div>${cta()}`,
  jsonld: [{ '@context': 'https://schema.org', '@type': 'Organization', name: NAME, url: SITE, logo: SITE + '/icon-512.png', parentOrganization: { '@type': 'Organization', name: 'Siamak Kalhor Consulting', url: 'https://siamakconsulting.com' } }] });

/* ── sitemap, robots, llms.txt, 404 ── */
const urls = ['/', ...pages.map(p => p.path)];
fs.writeFileSync(P('sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${SITE}${u}</loc><lastmod>${TODAY}</lastmod><changefreq>${u === '/' ? 'weekly' : 'monthly'}</changefreq><priority>${u === '/' ? '1.0' : u.startsWith('/garments/') ? '0.7' : '0.8'}</priority></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(P('robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nUser-agent: GPTBot\nAllow: /\nUser-agent: ClaudeBot\nAllow: /\nUser-agent: Google-Extended\nAllow: /\nUser-agent: PerplexityBot\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
fs.writeFileSync(P('llms.txt'), `# ${NAME}\n\n> Free browser-based custom sewing pattern maker for fashion designers, seamstresses and cosplayers. ${G.length} garments, ${STYLE_COUNT} design styles, drafted from the user's own measurements; nesting, yardage, size runs XS–3XL, DXF/SVG/PNG export, designer croquis and photoreal renders on women's and men's models in the exact fabric. Fabric catalogue and checkout by Blue Moon Fabrics (Los Angeles Fashion District). Built by Siamak Kalhor Consulting.\n\n## Pages\n${pages.map(p => `- [${p.title}](${SITE}${p.path}): ${p.description}`).join('\n')}\n\n## Garments\n${G.map(g => `- ${g.label}: ${g.styles.map(s => s.name).join(', ')}`).join('\n')}\n`);
fs.writeFileSync(P('404.html'), layout({ path: '/404', title: 'Page not found — Pattern Studio', description: 'That page does not exist.', h1: 'Nothing on this <em>rail.</em>', lede: 'The page you asked for isn’t here.', body: cta('Open the studio →', '/') }));
fs.writeFileSync(P('manifest.json'), JSON.stringify({ name: NAME, short_name: 'PatternStudio', start_url: '/', display: 'standalone', background_color: '#0b0a10', theme_color: '#0b0a10', icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }] }));
console.log(`site: ${pages.length} pages + sitemap/robots/llms/404/manifest`);
module.exports = { G, STYLE_COUNT, SITE, NAME };
