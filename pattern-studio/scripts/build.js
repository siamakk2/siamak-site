#!/usr/bin/env node
/* Assembles public/ from engine/ sources.
   - public/engine.js  : engine.js (already adapter-patched)
   - public/styles.css : legacy component layer (colors → tokens, Shopify chrome rules removed) + theme.css
   - public/index.html : new shell (shell.head.html) + legacy page markup (colors → tokens, Shopify copy removed) */
const fs = require('fs'), path = require('path');
(function main(){
const root = path.join(__dirname, '..'), E = p => path.join(root, 'engine', p), P = p => path.join(root, 'public', p);
fs.mkdirSync(P(''), { recursive: true });

/* ── shared color remap (legacy light-theme hexes → dark atelier tokens) ── */
const COLOR = {
  // brand blues → accents
  '#1255b0':'var(--accent)','#1a4fa8':'var(--accent)','#1565c0':'var(--accent)','#0c3d8f':'var(--accent-deep)','#0a3080':'var(--accent-deep)','#082870':'var(--accent-deep)',
  '#1769d4':'var(--accent-2)','#2e6fd8':'var(--accent-2)','#4a9eff':'var(--accent-2)','#0d2260':'var(--surface-2)','#1a3a7c':'var(--accent-2)',
  // dark text → ivory text
  '#0a1a44':'var(--ink)','#0a0e1a':'var(--ink)','#212121':'var(--ink)','#2d2416':'var(--ink)','#1c2540':'var(--ink-2)','#192846':'var(--ink-2)','#334':'var(--ink-2)','#4a3f2c':'var(--ink-2)',
  '#2d3a5e':'var(--ink-3)','#374f78':'var(--ink-3)','#556':'var(--ink-3)','#6b6152':'var(--ink-3)','#637899':'var(--ink-3)','#5a6a8a':'var(--ink-4)','#889':'var(--ink-4)','#8a9ab8':'var(--ink-4)',
  // golds
  '#8a7758':'var(--gold)','#8a6f35':'var(--gold)','#b08d3e':'var(--gold)','#b99a55':'var(--gold)','#b0a080':'var(--gold)','#c9a961':'var(--gold)','#d8c9a8':'var(--gold)','#ecd9a6':'var(--gold-2)','#b8860b':'var(--gold)','#f0c040':'var(--gold-2)',
  // light surfaces → dark surfaces
  '#f5f7fc':'var(--bg)','#fafbff':'var(--surface)','#f8f9ff':'var(--surface)','#f8f9fa':'var(--surface-2)','#f5f5f5':'var(--surface-2)','#f0f4ff':'var(--surface-2)','#eef4ff':'var(--surface-2)','#eef2ff':'var(--surface-2)','#e8f2ff':'var(--surface-2)','#f5f7ff':'var(--surface-2)','#f0f7ff':'var(--surface-2)','#f5f9ff':'var(--surface-2)','#e8f0fe':'var(--surface-2)','#e3f2fd':'var(--surface-2)',
  '#fdf9f0':'var(--surface-warm)','#faf7f1':'var(--paper)','#f3ecdb':'var(--surface-warm)','#efe8da':'var(--surface-warm)','#fff8e1':'var(--gold-soft)','#fff8e0':'var(--gold-soft)','#fff3e0':'var(--warn-bg)','#fff3cd':'var(--warn-bg)','#fff1e0':'var(--warn-bg)',
  '#f0fff4':'var(--ok-bg)','#f5f9f0':'var(--ok-bg)','#eef4e8':'var(--ok-bg)','#e8f5e9':'var(--ok-bg)','#dff5ec':'var(--ok-bg)','#e0f2f1':'var(--ok-bg)','#d4f5e2':'var(--ok-bg)',
  '#fff0f0':'var(--danger-bg)','#ffebee':'var(--danger-bg)','#ffe8ec':'var(--danger-bg)','#fce4ec':'var(--accent-soft)','#f3e5f5':'var(--violet-soft)',
  // parchment card gradients / hairlines
  '#fffdf9':'var(--surface)','#f8f4ec':'var(--surface-2)','#f8f3e8':'var(--surface-2)','#fffdf6':'var(--surface-2)','#faf3e2':'var(--surface-3)','#e8e0d0':'var(--border)','#efe6d2':'var(--border)','#dcc990':'var(--border-2)','#f0f6ff':'var(--surface-2)',
  '#1a1a2e':'var(--surface-2)','#2d2d5e':'var(--surface-3)','#16337f':'var(--surface-3)','#070f30':'var(--bg)',
  '#faf6ec':'var(--surface)','#f1ead9':'var(--surface-2)',
  // borders
  '#dde3f0':'var(--border)','#c5d9f5':'var(--border)','#dde5f0':'var(--border)','#eef2f8':'var(--border)','#e0e8f4':'var(--border)','#b8c8e8':'var(--border-2)',
  // semantic
  '#0a7040':'var(--ok)','#077040':'var(--ok)','#1b5e20':'var(--ok)','#2e7d32':'var(--ok)','#1b7a3d':'var(--ok)','#00695c':'var(--ok)','#4ade80':'var(--ok)',
  '#b01020':'var(--danger)','#c62828':'var(--danger)','#a8001a':'var(--danger)','#c00':'var(--danger)','#c2185b':'var(--accent)',
  '#e65100':'var(--warn)','#f57f17':'var(--warn)','#8f4500':'var(--warn)','#7a5800':'var(--warn)','#7b1fa2':'var(--accent-2)',
};
/* property-context remap: only touches CSS declarations (color/background/border…), never SVG attributes or canvas colours */
function remapProps(s){
  return s.replace(/((?:^|[;"'`{\s])(?:color|background|background-color|border(?:-[a-z]+)*|outline|caret-color)\s*:\s*)(#[0-9a-fA-F]{3,6})(?![0-9a-fA-F])/g,(m,pre,hex)=>{
    const l=hex.toLowerCase(); if(/^#fff(fff)?$/.test(l)) return /background/.test(pre)? pre+'var(--surface)' : m;
    return COLOR[l]? pre+COLOR[l] : m; })
  .replace(/(\.style\.(?:background|backgroundColor|color|borderColor)\s*=\s*['"])(#[0-9a-fA-F]{3,6})(?![0-9a-fA-F])/g,(m,pre,hex)=>COLOR[hex.toLowerCase()]? pre+COLOR[hex.toLowerCase()] : m)
  .replace(/((?:linear|radial)-gradient\([^)]*\))/g, g => g.replace(/#[0-9a-fA-F]{3,6}(?![0-9a-fA-F])/g, h => COLOR[h.toLowerCase()] || h));
}
module.exports = { COLOR, remapProps };
if (require.main !== module) return;
function remap(s){
  for (const [k,v] of Object.entries(COLOR)) s = s.replace(new RegExp(k+'(?![0-9a-fA-F])','gi'), v);
  s = s.replace(/background(-color)?:\s*#fff(fff)?(?![0-9a-fA-F])/gi, 'background:var(--surface)');
  return s;
}

/* ── engine ── */
fs.copyFileSync(E('engine.js'), P('engine.js'));

/* ── CSS ── */
let css = fs.readFileSync(E('legacy.css'), 'utf8');
css = css.replace(/@import url\([^)]*\);\s*/g, '');                       // theme.css brings its own fonts
css = css.replace(/:root\{[\s\S]*?\}/, '');                                 // tokens come from theme.css
// drop Shopify chrome suppression + fixed overlay root rules (standalone page owns the viewport)
css = css.replace(/\/\* ── Shopify chrome suppression ── \*\/[\s\S]*?(?=\/\* ── Top bar)/, '');
css = css.replace(/\/\* App root — fixed overlay \*\/[\s\S]*?(?=\/\* Toolbar \*\/)/, '');
css = remap(css);
let theme = fs.readFileSync(E('theme.css'), 'utf8'); const imp = (theme.match(/@import url\([^)]*\);/)||[''])[0]; theme = theme.replace(imp,'');
css = imp + '\n/* ── component layer (from Blue Moon Pattern Maker v55, re-tokenised) ── */\n' + css + '\n\n' + theme;
fs.writeFileSync(P('styles.css'), css);

/* ── HTML ── */
let body = fs.readFileSync(E('legacy.html'), 'utf8');
body = body.slice(body.indexOf('<div id="bmf-tabs">'));                      // drop JSON-LD/og meta + old hero
body = body.slice(body.indexOf('</div>', body.indexOf('<div id="bmf-tabs">')) + 6); // drop old tab bar
body = body.replace(/20 garment types/g, '24 garments &middot; 90 design styles');
body = body.replace(/Blue Moon Fabrics collection &mdash; tap a fabric/g, 'Live Blue Moon Fabrics catalog &mdash; tap a fabric');
// SEO footer paragraph → studio footer
body = body.replace(/<div style="max-width:680px;margin:26px auto 10px;padding:0 18px;text-align:center">[\s\S]*?<\/div>\s*(?=<div id="toast">)/,
`<footer class="ps-foot">
  <span class="ps-brand-word">Pattern<em>Studio</em></span>
  <span>Fabrics &amp; checkout by <a href="https://bluemoonfabrics.com" target="_blank" rel="noopener">Blue Moon Fabrics</a> &middot; Los Angeles Fashion District</span>
  <span>Patterns export as DXF (cutters), SVG and PNG &middot; measurements in inches</span>
</footer>
`);
body = remap(body);
const shell = fs.readFileSync(E('shell.head.html'), 'utf8');
const navBar = `<div id="bmfNavBar" role="navigation" aria-label="Previous / next step">
  <button type="button" onclick="pgStep(-1)">&larr; Back</button>
  <span id="bmfPageLabel">Step 1 of 5 — Choose Garment</span>
  <button type="button" onclick="pgStep(1)">Next &rarr;</button>
</div>`;
const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Pattern Studio — Custom Sewing Pattern Maker for Designers &amp; Cosplayers</title>
<meta name="description" content="Design a garment, enter your measurements, pick the fabric and get a graded, cut-ready sewing pattern with a designer croquis. 24 garments, 90 styles, DXF/SVG/PNG export.">
<meta name="theme-color" content="#0b0a10">
<meta property="og:type" content="website">
<meta property="og:title" content="Pattern Studio — Sketch it. Draft it. Wear it.">
<meta property="og:description" content="Custom sewing patterns for designers and cosplayers: 24 garments, 90 styles, size grading, fabric yield, DXF export.">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%230b0a10'/%3E%3Cpath d='M9 31 L20 7 L31 31 Z' fill='none' stroke='%23ff2d87' stroke-width='2.4'/%3E%3Ccircle cx='20' cy='7' r='2.4' fill='%23e2c275'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="styles.css">
<script>window.PS_CONFIG={mode:'standalone',shop:'https://bluemoonfabrics.com',fabricsApi:'/api/fabrics'};</script>
</head>
<body class="ps-body">
${shell}
${body}
${navBar}
<script src="engine.js" defer></script>
<script>
// Pattern Studio shell glue: compact the hero off step 1, keep the sticky nav in sync, deep-link tabs (#pg5 etc.)
window.addEventListener('DOMContentLoaded',function(){
  var orig=window.showTab; if(typeof orig!=='function')return;
  window.showTab=function(btn,pg){ orig(btn,pg); document.body.classList.toggle('ps-compact',pg!=='pg1'); try{history.replaceState(null,'','#'+pg);}catch(e){} };
  // step order for the sticky Back/Next bar (parked AI-photo tabs skipped; Fabric → Next generates)
  var ORDER=['pg1','pg2','pg3','pg4','pgF','pg5','pg6','pg7','pgU','pgH'], ALL=['pg1','pg2','pg3','pg4','pgF','pg5','pg6','pg7','pg8','pgU','pgP','pgH'];
  window.pgStep=function(dir){ var cur=document.querySelector('.bpage.show'); var i=Math.max(0,ORDER.indexOf(cur?cur.id:'pg1')); var n=i+dir; if(n<0||n>=ORDER.length)return;
    if(dir===1&&ORDER[i]==='pgF'){ if(typeof generate==='function')generate(); return; }
    var tabs=document.querySelectorAll('.btab'); window.showTab(tabs[ALL.indexOf(ORDER[n])],ORDER[n]); };
  var h=(location.hash||'').slice(1); if(/^pg(\d|F|U|P|H)$/.test(h)&&document.getElementById(h)){ var tabs=[].slice.call(document.querySelectorAll('.btab')); var i=['pg1','pg2','pg3','pg4','pgF','pg5','pg6','pg7','pg8','pgU','pgP','pgH'].indexOf(h); if(i>=0)window.showTab(tabs[i],h); }
});
</script>
</body>
</html>
`;
fs.writeFileSync(P('index.html'), html);

/* ── report ── */
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
const dup = ids.filter((x,i)=>ids.indexOf(x)!==i);
console.log(`index.html ${html.length} chars, styles.css ${css.length} chars, engine.js ${fs.statSync(P('engine.js')).size} bytes`);
if (dup.length) console.warn('duplicate ids:', [...new Set(dup)]);
const left = [...new Set((html+css).match(/#[0-9a-f]{3,6}(?![0-9a-f])/gi)||[])].filter(h=>!/^#fff$|^#ffffff$|^#000$/i.test(h));
console.log('remaining raw hexes (expected only svg/icon art):', left.length);

})();
