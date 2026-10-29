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
    BMF_TIER = 'pro'; BMF_USER = { email: 'studio', tags: 'ps-pro', _standalone: true };
    BMF_GENS_USED = 0; BMF_TIER_READY = true; if (BMF_TIER_RESOLVE) BMF_TIER_RESOLVE(BMF_TIER);
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

/* 6 ── theme: JS-built markup uses tokens (CSS declarations only; SVG art & canvas colours untouched) */
const before = e; e = remapProps(e); log.push('tokenised declarations: ' + (before !== e));

const out = '/* Pattern Studio engine — generated from engine.raw.js by scripts/patch-engine.js; do not edit by hand */\n' + e;
fs.writeFileSync(E('engine.js'), out);
cp.execSync('node --check ' + E('engine.js'), { stdio: 'inherit' });
console.log(log.join('\n')); console.log('engine.js', out.length, 'chars, syntax OK');
