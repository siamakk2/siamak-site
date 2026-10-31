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

## Site pages & SEO
`scripts/site.js` generates the explainer pages (/how-it-works, /garments, /garments/<slug> ×24, /cosplay, /designers, /faq, /about), sitemap.xml, robots.txt, llms.txt, manifest and 404 from the engine's own garment data. `public/og.png` is the share image (rendered from a design card; regenerate if the brand changes). Search Console: property `studio.siamakconsulting.com`, sitemap `https://studio.siamakconsulting.com/sitemap.xml`.

## 3D
`engine/hero3d.js` draws the couture dress form in the hero with self-hosted three.js (`public/vendor/three.min.js`, r128): recolours to the picked fabric, switches to a men's form with the Woman/Man toggle, follows the pointer, pauses off-screen. Garment and design cards tilt in 3D on hover.

## Accounts, projects, billing
- Supabase project **fabric-erp** (ydrlaucrzgnuvcepczuf), schema `studio`: profiles, projects, renders, events; RPCs `ensure_profile`, `consume_render`, `is_admin`; view `admin_overview`. Admin = siamakk2@gmail.com (or plan='admin').
- Client: `engine/account.js` — magic-link sign-in, unified local+cloud projects, free-tier gates (3 renders, PNG, 3 local projects), Pro = unlimited renders, DXF/SVG, size runs, cloud projects. Anonymous visitors get 1 render.
- Billing: `api/checkout.js` (Stripe Checkout, auto-creates product/price `pattern_studio_pro_monthly` at `STRIPE_PRICE_CENTS`, default 3500), `api/portal.js`; Supabase Edge Function `stripe-webhook` updates `studio.profiles` (secrets STRIPE_WEBHOOK_SECRET, STRIPE_SECRET_KEY). Vercel env: STRIPE_SECRET_KEY.
- Admin: `/admin` (engine/admin.html) — KPIs, users (comp Pro, +5 renders, Stripe link), projects, renders gallery, events.
- Tests: `test/account.js`.
