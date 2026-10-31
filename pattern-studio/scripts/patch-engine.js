#!/usr/bin/env node
/* engine/engine.raw.js (verbatim v55 engine) → engine/engine.js (standalone Pattern Studio engine)
   Every patch is asserted: a missed anchor fails the build instead of silently shipping. */
const fs = require('fs'), path = require('path'), cp = require('child_process');
const { remapProps } = require('./build.js');
const E = p => path.join(__dirname, '..', 'engine', p);
let e = fs.readFileSync(E('engine.raw.js'), 'utf8');
const log = [];
function rep(name, from, to, all) {
  const n = e.split(from).length - 1;
  if (!n) throw new Error('anchor missing for patch: ' + name);
  e = all ? e.split(from).join(to) : e.replace(from, to); log.push(`${name} x${n}`);
}

/* 1 ── runtime config + standalone subscription (everything unlocked, no Shopify customer calls) */
rep('config+subscription', 'async function initSubscription() {', `var PS = window.PS_CONFIG || {};
PS.mode = PS.mode || 'standalone';
PS.shop = PS.shop || 'https://bluemoonfabrics.com';
PS.fabricsApi = PS.fabricsApi || '/api/fabrics';
async function initSubscription() {
  if (PS.mode === 'standalone') {
    document.body.classList.add('bmf-app-active');
    // tier is resolved by account.js (free until signed in as Pro); drafting itself is never gated
    GATES.free = { gens: Infinity, dxf:false, svg:false, nest:true, grade:false, look:true, projects:3 };
    BMF_TIER = 'free'; BMF_USER = null; BMF_GENS_USED = 0;
    if (typeof psApplyTier === 'function') psApplyTier(); else { BMF_TIER_READY = true; if (BMF_TIER_RESOLVE) BMF_TIER_RESOLVE(BMF_TIER); }
    try { renderGenCounter(); } catch(e) {}
    var gc = document.getElementById('gen-counter'); if (gc) gc.style.display = 'none';
    return;
  }
  return initSubscriptionShopify();
}
async function initSubscriptionShopify() {`);

/* 2 ── live fabric catalog via our own API (proxies bluemoonfabrics.com/collections/{handle}/products.json) */
rep('fabrics api', "fetch('/collections/'+handle+'/products.json?limit=250&page='+page, {headers:{'Accept':'application/json'}})",
  "fetch((PS.mode==='standalone' ? PS.fabricsApi+'?collection='+encodeURIComponent(handle)+'&page='+page : '/collections/'+handle+'/products.json?limit=250&page='+page), {headers:{'Accept':'application/json'}})");
rep('product links', "url: 'https://bluemoonfabrics.com/products/'", "url: PS.shop+'/products/'", true);

/* 3 ── add-to-cart: cross-origin safe cart permalink */
rep('cart permalink', `function addFabricToCart(variantId, qty){\n  try{`, `function addFabricToCart(variantId, qty){
  if (PS.mode === 'standalone') {
    window.open(PS.shop + '/cart/' + variantId + ':' + (qty||1), '_blank', 'noopener');
    if (typeof toast_==='function') toast_('Opening Blue Moon Fabrics cart…');
    return true;
  }
  try{`);

/* 4 ── measurement fields some styles read but their garment never asked for */
function addFields(garment, fieldsSrc) {
  let i = e.indexOf('\n' + garment + ':{label'); if (i < 0) i = e.indexOf('\n  ' + garment + ':{label');
  if (i < 0) throw new Error('garment block not found: ' + garment);
  const f = e.indexOf('fields:[', i), close = e.indexOf(']', f);
  e = e.slice(0, close) + ',' + fieldsSrc + e.slice(close); log.push('fields+ ' + garment);
}
addFields('two_piece', "{id:'skirtL',l:'Skirt Length',h:'Waist to skirt hem',req:0,def:18,mn:10,mx:40},{id:'inseam',l:'Inseam',h:'Crotch to ankle (palazzo)',req:0,def:28,mn:18,mx:38},{id:'rise',l:'Rise',h:'Waist to crotch, seated',req:0,def:10,mn:7,mx:14}");
addFields('jumpsuit', "{id:'rise',l:'Rise',h:'Waist to crotch, seated',req:0,def:10,mn:7,mx:14}");
addFields('tennis_dress', "{id:'inseam',l:'Short Inseam',h:'Built-in short inseam',req:0,def:3,mn:1,mx:8},{id:'rise',l:'Rise',h:'Waist to crotch, seated',req:0,def:10,mn:7,mx:14}");

/* 5 ── no Shopify theme chrome to hide in the standalone page */
rep('theme hide', "document.querySelectorAll('.page__title,.rich-text__heading,.page__content,.rich-text__text,.section--padding')", "document.querySelectorAll('.__none__')");

/* 5b ── male figure allowed on unisex garments (leotard, costume, crop top, one-piece/unitard-style) */
rep('unisex garments', "  wrap_dress:1, costume:1, crop_top:1\n};", "  wrap_dress:1\n};");
rep('unisex garments 2', "  lingerie:1, leotard:1, corset_top:1, two_piece:1, one_piece:1, swim_dress:1,", "  lingerie:1, corset_top:1, two_piece:1, swim_dress:1,");

/* 5c ── bugs found in the standalone walk-through */
rep('closePrint null-safe', "function closePrint(){document.getElementById('printModal').classList.remove('show');}", "function closePrint(){var m=document.getElementById('printModal'); if(m) m.classList.remove('show');}");
rep('overlay close (style attr is normalised with spaces)', "  document.querySelectorAll('[style*=\"position:fixed\"][style*=\"z-index:99999\"]').forEach(function(el){el.remove();});",
  "  Array.prototype.forEach.call(document.body.children, function(el){ if (el.style && el.style.position==='fixed' && String(el.style.zIndex)==='99999') el.remove(); });");
rep('download anchors in DOM (Safari)', "const a=document.createElement('a');a.href=url;a.download=filename;a.click();", "const a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();setTimeout(()=>a.remove(),1000);");

/* 6 ── photoreal renders: Look tab + Print tab + Fabric-step panel all go through /api/render (Gemini image) */
rep('look → render api', "    var seed=Math.floor(Math.random()*999999);\n    var url='https://image.pollinations.ai/prompt/'+encodeURIComponent(prompt)+'?width=512&height=768&model=flux&seed='+seed+'&nologo=true';\n    var img=new Image();",
  "    var out=await psRender(psRenderContext({model:model,setting:setting,mode:'photo'}),'3:4'); var url=out.image; window.__psLastRender=url;\n    var img=new Image();");
rep('print → render api', "    var proxyUrl = 'https://siamakconsulting.com/api/sketch';\n    var proxyRes = await fetch(proxyUrl, {\n      method: 'POST',\n      headers: { 'Content-Type': 'application/json' },\n      body: JSON.stringify({ prompt: prompt })\n    });",
  "    var proxyRes = await fetch((PS.renderApi||'/api/render'), {\n      method: 'POST',\n      headers: { 'Content-Type': 'application/json' },\n      body: JSON.stringify({ context: psRenderContext({mode:'print', printDesc: desc}), aspect:'3:4' })\n    });");
rep('print: no pollinations fallback', "    if (!imageUrl) {\n      var seed = Math.floor(Math.random() * 999999);\n      imageUrl = 'https://image.pollinations.ai/prompt/'\n        + encodeURIComponent(prompt)\n        + '?width=512&height=768&model=flux&seed=' + seed + '&nologo=true';\n    }",
  "    if (!imageUrl) { throw new Error('render failed'); }");
rep('advisor → gemini', "  fetch('https://text.pollinations.ai/' + encodeURIComponent(prompt))\n    .then(function(r){ return r.ok ? r.text() : Promise.reject(); })",
  "  fetch((PS.adviseApi||'/api/advise'), {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt:prompt})})\n    .then(function(r){ return r.ok ? r.json().then(function(j){return j.text;}) : Promise.reject(); })");
e += fs.readFileSync(E('render-client.js'), 'utf8');
e += fs.readFileSync(E('account.js'), 'utf8');
log.push('render client appended');

/* 7 ── theme: JS-built markup uses tokens (CSS declarations only; SVG art & canvas colours untouched) */
const before = e; e = remapProps(e); log.push('tokenised declarations: ' + (before !== e));

const out = '/* Pattern Studio engine — generated from engine.raw.js by scripts/patch-engine.js; do not edit by hand */\n' + e;
fs.writeFileSync(E('engine.js'), out);
cp.execSync('node --check ' + E('engine.js'), { stdio: 'inherit' });
console.log(log.join('\n')); console.log('engine.js', out.length, 'chars, syntax OK');
