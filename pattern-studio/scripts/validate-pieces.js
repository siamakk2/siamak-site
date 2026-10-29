#!/usr/bin/env node
/* Build-time check: every style's pieces(m) must yield finite, positive w/h with default measurements. */
const fs = require('fs'), vm = require('vm'), path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'engine', 'engine.js'), 'utf8');
// isolate the data tables: cx helper, dSvg, DESIGNS, GARMENT_ORDER
const a = src.indexOf('const cx=c=>'), b = src.indexOf('const GARMENT_ORDER=');
const bEnd = src.indexOf('\n', b);
const tables = src.slice(a, bEnd) + '\n;__out={DESIGNS,GARMENT_ORDER};';
const ctx = { __out: null, console };
vm.createContext(ctx);
vm.runInContext(tables, ctx, { filename: 'tables.js' });
const { DESIGNS, GARMENT_ORDER } = ctx.__out;

// reuse readM()'s derived-measurement fallbacks verbatim from the engine
const rm = src.indexOf('function readM(){'); const dStart = src.indexOf('// Derived measurements', rm); const dEnd = src.indexOf('return m;', dStart);
const derive = new Function('m', src.slice(dStart, dEnd) + 'return m;');
let styles = 0, bad = [];
for (const g of GARMENT_ORDER) {
  const cfg = DESIGNS[g]; if (!cfg) { bad.push(`${g}: missing from DESIGNS`); continue; }
  const m = { sa: .5 };
  cfg.fields.forEach(f => { m[f.id] = f.sel ? (f.def || (f.opts && f.opts[0]) || 'B') : (f.def || 0); });
  derive(m);
  for (const st of cfg.styles) {
    styles++;
    let pcs;
    try { pcs = st.pieces(m); } catch (e) { bad.push(`${g}/${st.id}: throws ${e.message}`); continue; }
    if (!Array.isArray(pcs) || !pcs.length) { bad.push(`${g}/${st.id}: no pieces`); continue; }
    pcs.forEach(p => {
      if (!Number.isFinite(p.w) || !Number.isFinite(p.h) || p.w <= 0 || p.h <= 0)
        bad.push(`${g}/${st.id}/${p.id}: w=${p.w} h=${p.h}`);
      if (p.w > 120 || p.h > 120) bad.push(`${g}/${st.id}/${p.id}: implausible size w=${p.w} h=${p.h}`);
    });
  }
}
console.log(`${GARMENT_ORDER.length} garments, ${styles} styles checked`);
if (bad.length) { console.error('FAILURES:\n  ' + bad.join('\n  ')); process.exit(1); }
console.log('all pieces OK');
