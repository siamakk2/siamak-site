#!/usr/bin/env node
/**
 * Generates a social-preview card matching the existing /og/the-long-view/ set.
 *
 * Why this exists: articles without their own card fall back to the generic
 * site image, so every share looks identical and says nothing about the piece.
 * Seven articles also point at the law-firm article's card, which is a
 * copy-paste leftover rather than a choice.
 *
 * Renders HTML in the pre-installed Chromium at exactly 1200x630 and saves a
 * JPEG. Google Fonts is unreachable from the build sandbox, so this uses the
 * metric-compatible system faces rather than silently falling back to Times.
 *
 *   node scripts/make-og.js --slug <slug> --kicker "POLICY · AI VISIBILITY" \
 *        --headline "Line one|Line two" --sub "One short line"
 *
 * The headline is split on "|" so line breaks are a deliberate choice rather
 * than whatever the box width happens to produce.
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

function arg(name, dflt) {
  const i = process.argv.indexOf('--' + name);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : dflt;
}

const slug     = arg('slug');
const kicker   = arg('kicker', 'AI VISIBILITY');
const headline = arg('headline', '');
const sub      = arg('sub', '');
const outDir   = arg('outdir', 'og/the-long-view');
const label    = arg('label', 'THE LONG VIEW');   // bottom-right tag; service pages pass their own
const dir      = arg('dir', 'ltr');             // rtl for Persian pages

if (!slug || !headline) {
  console.error('need --slug and --headline');
  process.exit(1);
}

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// silhouette-og.png: the warm disc runs full-bleed to the edge of the square,
// so the circular crop in .foot img lands exactly on the disc rather than
// leaving a dark ring. The old siamak-portrait.jpg showed his face, which he
// no longer wants published, and portrait.jpg still reads "Large Model
// Optimization" in its pixels.
const portrait = fs.readFileSync(path.join(__dirname, '..', 'assets', 'silhouette-og.png')).toString('base64');
const lines = headline.split('|').map(s => s.trim()).filter(Boolean);

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:1200px;height:630px;overflow:hidden}
  body{
    background:#000;
    font-family:'Liberation Sans','DejaVu Sans',sans-serif;
    -webkit-font-smoothing:antialiased;
  }
  .bg{position:absolute;inset:0;
    background-image:
      radial-gradient(circle at 12% 8%, rgba(45,212,255,.16), transparent 42%),
      radial-gradient(circle at 88% 92%, rgba(160,107,255,.10), transparent 46%),
      linear-gradient(rgba(40,52,68,.22) 1px, transparent 1px),
      linear-gradient(90deg, rgba(40,52,68,.22) 1px, transparent 1px);
    background-size:100% 100%,100% 100%,60px 60px,60px 60px;
  }
  .pad{position:absolute;inset:0;padding:62px 76px;display:flex;flex-direction:column}
  .kick{font-family:'Liberation Mono','DejaVu Sans Mono',monospace;
    font-size:21px;font-weight:700;letter-spacing:.11em;white-space:nowrap}
  .kick .n{color:#2dd4ff}
  .kick .s{color:#5c6b7e;margin:0 14px}
  .kick .c{color:#e8eef6}
  .mid{flex:1;display:flex;flex-direction:column;justify-content:center;margin-top:-18px}
  h1{color:#fff;font-weight:700;font-size:${lines.length > 2 ? 52 : 62}px;
    line-height:1.12;letter-spacing:-.022em}
  .rule{width:132px;height:5px;border-radius:3px;margin:26px 0 22px;
    background:linear-gradient(90deg,#2dd4ff,#a06bff)}
  .sub{color:#b9c6d6;font-size:26px;line-height:1.4;max-width:900px}
  .foot{border-top:1px solid #222c3a;padding-top:22px;
    display:flex;align-items:center;justify-content:space-between}
  .who{display:flex;align-items:center;gap:18px}
  .who img{width:58px;height:58px;border-radius:50%;object-fit:cover;object-position:50% 15%;
    border:1px solid #2f3b4b}
  .nm{color:#fff;font-size:24px;font-weight:700;line-height:1.25}
  .dm{color:#8b98a8;font-size:18px;font-family:'Liberation Mono','DejaVu Sans Mono',monospace}
  .brand{color:#6b7787;font-size:19px;letter-spacing:.17em;
    font-family:'Liberation Mono','DejaVu Sans Mono',monospace}
</style></head><body>
  <div class="bg"></div>
  <div class="pad">
    <div class="kick"><span class="n">SIAMAK_KALHOR</span><span class="s">//</span><span class="c">${esc(kicker)}</span></div>
    <div class="mid" dir="${dir}">
      <h1>${lines.map(esc).join('<br>')}</h1>
      <div class="rule"></div>
      ${sub ? `<div class="sub">${esc(sub)}</div>` : ''}
    </div>
    <div class="foot">
      <div class="who">
        <img src="data:image/png;base64,${portrait}" alt="">
        <div><div class="nm">Siamak Kalhor</div><div class="dm">siamakconsulting.com</div></div>
      </div>
      <div class="brand">${esc(label)}</div>
    </div>
  </div>
</body></html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'load' });
  fs.mkdirSync(outDir, { recursive: true });
  const out = path.join(outDir, slug + '.jpg');
  await page.screenshot({ path: out, type: 'jpeg', quality: 90,
                          clip: { x: 0, y: 0, width: 1200, height: 630 } });
  await browser.close();
  const kb = Math.round(fs.statSync(out).size / 1024);
  console.log('  ' + out + '  (' + kb + ' KB)');
})();
