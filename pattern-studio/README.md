# Pattern Studio

Standalone custom sewing-pattern maker for designers, seamstresses and cosplayers.
Lives at **studio.siamakconsulting.com** (Vercel project `pattern-studio`, root directory `pattern-studio/`).
Fabrics and checkout come from Blue Moon Fabrics; the Shopify page can embed it with one iframe/script tag later.

## Layout
- `engine/engine.raw.js` — the proven v55 drafting engine, verbatim (24 garments · 90 styles, nesting, grading, DXF/SVG/PNG, croquis sketch).
- `scripts/patch-engine.js` — turns it into `engine/engine.js`: standalone mode (all features unlocked, no Shopify customer calls), fabrics via `/api/fabrics`, cart via Shopify permalink, missing measurement fields, theme tokens. Every patch asserts its anchor.
- `scripts/validate-pieces.js` — build-time check: every style's `pieces()` yields finite, positive dimensions with default measurements.
- `engine/legacy.html` / `legacy.css` — v55 page markup & component CSS (the DOM contract the engine expects).
- `engine/shell.head.html` + `engine/theme.css` — the new Atelier Noir shell and theme.
- `scripts/build.js` — assembles `public/` (index.html, styles.css, engine.js).
- `api/fabrics.js` — Vercel function proxying `bluemoonfabrics.com/collections/{handle}/products.json` (public storefront data, no tokens).
- `test/shots.js` — headless Chromium walk-through: boot, pick garment/style, measurements, fabric + sketch, generate, auto-arrange, every tab, mobile; fails on page errors.

## Commands
```
npm run build   # patch engine → validate pieces → assemble public/
npm test        # validate + Playwright walk-through (screenshots in test/shots/)
npm run dev     # http://localhost:3131 (static + /api/fabrics)
```
Never hand-edit `public/` or `engine/engine.js`; change the sources and rebuild.

## Renders
`api/render.js` renders the garment on a model with Google Gemini image models (GEMINI_API_KEY): the Fabric step "Render on model" panel, the Look tab and the Print tab all build a structured context (garment, style, construction chips, measurements, exact fabric + its product photo as a reference image). `api/advise.js` powers the atelier advisor with Gemini text.
