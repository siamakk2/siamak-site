/* hero3d.js — a subject-matched 3D scene for the empty side of a page's opening section.
 *
 * One script, ten scenes, no library: real perspective projection on a 2D canvas,
 * the same technique as depth3d.js on the home page, in the same palette.
 *   scan     wireframe globe with a moving scan band          (audits, checks)
 *   network  sources wired to one bright core                 (LLMO, AI visibility, citations)
 *   agents   orbiting agents reporting to a core              (AI agents, automation, consulting)
 *   growth   3D bar field rising, with a trend line           (budgets, growth, e-commerce, marketing)
 *   dna      double helix                                     (brand, Business DNA, about)
 *   shield   geodesic lattice around a protected core         (privacy, terms, law, AI facts)
 *   voice    ring of sound bars                               (voice advisor, contact, consulting calls)
 *   pulse    heartbeat line over a grid                       (dental, medical, cosmetic surgery)
 *   docs     floating pages, one line being cited             (articles, glossary, FAQ, courses)
 *   map      terrain with location pins                       (city pages, local visibility)
 *
 * Rules, as on the home page: decoration only (aria-hidden, every word stays in the HTML);
 * nothing position:fixed, no CSS filters; it only runs on wide screens with real empty space,
 * never where the section already has a picture, video or canvas; it stops off-screen and when
 * the tab is hidden, and draws one still frame for prefers-reduced-motion.
 */
(function () {
  'use strict';
  if (window.__hero3d) return; window.__hero3d = 1;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var touch = window.matchMedia && matchMedia('(hover: none)').matches;
  // phones and tablets: no empty side column, so the scene goes behind the opening text instead
  var MOBILE = innerWidth < 960 || (touch && innerWidth < 1100);
  var C = { c: '45,212,255', v: '160,107,255', a: '255,180,84', g: '110,231,183', r: '255,107,107' };

  // ------------------------------------------------------------- which scene
  var path = location.pathname.replace(/^\/(es|fa|hy)(?=\/|$)/, '').replace(/\/+$/, '') || '/';
  var MAP = {
    '/ai-consulting': 'strategy', '/ai-consultant': 'strategy', '/ai-advisory': 'gyro', '/ai-automation': 'gears', '/ai-agents': 'agents',
    '/ai-seo': 'rank', '/ai-search-marketing-consultant': 'rank', '/best-llmo-consultant': 'rank', '/seo-vs-llmo': 'rank',
    '/ai-marketing': 'prism', '/internet-marketing': 'funnel', '/internet-marketing-consultant': 'funnel', '/social-media-marketing': 'feed',
    '/brand-creation': 'dna', '/business-dna': 'dna', '/llm-optimization': 'network', '/what-is-llmo': 'network', '/how-to-get-cited-by-ai': 'network',
    '/services': 'growth', '/analyze-your-brand': 'scan', '/audit': 'scan', '/website-audit': 'scan',
    '/law-firm-marketing-consultant': 'scales', '/law-firm-marketing-budget': 'scales', '/ai-for-law-firms': 'scales',
    '/dental-marketing-consultant': 'tooth', '/dental-marketing-budget': 'tooth', '/medical-practice-marketing-consultant': 'pulse',
    '/cosmetic-surgery-marketing-consultant': 'golden', '/ecommerce-marketing-consultant': 'cart', '/ai-for-ecommerce': 'cart',
    '/ai-for-contractors': 'house', '/ai-for-restaurants': 'dish', '/ai-marketing-news': 'news',
    '/ai-marketing-consultant-los-angeles': 'map', '/ai-marketing-consultant-napa-valley': 'map', '/local': 'map',
    '/fractional-cmo': 'helm', '/custom-ai-software': 'chip', '/pricing': 'coins', '/geo-aeo-consultant': 'rank',
    '/business-growth-consultant': 'growth', '/website-conversion-consultant': 'funnel', '/case-studies': 'growth', '/industries': 'network',
    '/how-much-does-llmo-cost': 'coins', '/the-long-view/which-parts-of-my-business-should-i-automate-first': 'gears', '/llmo-training': 'docs'
  };
  // what sits at the centre when the four AI engines orbit it (pages that had the 2D engine diagram)
  var CENTRE = { scales: 'YOUR FIRM', tooth: 'YOUR PRACTICE', pulse: 'YOUR PRACTICE', golden: 'YOUR PRACTICE', cart: 'YOUR STORE', house: 'YOUR COMPANY', dish: 'YOUR RESTAURANT' };
  function pick() {
    var forced = document.documentElement.getAttribute('data-hero3d');
    if (forced) return forced;
    if (MAP[path]) return MAP[path];
    var p = path, slug = p.split('/').pop();
    var rules = [
      ['docs', /glossary|^\/faq|^\/academy|training/],
      ['tooth', /dental|dentist/], ['golden', /cosmetic|plastic|aesthetic/], ['pulse', /medical|doctor|patient|clinic/],
      ['scales', /law-firm|lawyer|attorney/], ['dish', /restaurant/], ['cart', /online-store|ecommerce|shop/],
      ['map', /los-angeles|napa|^\/local|^\/listings|winer|hotel|(^|-)inns?(-|$)|tasting/],
      ['shield', /privacy|terms|llm-info|super-intelligence|executive-order|security/],
      ['scan', /audit|analyze|pagespeed|is-my-marketing|invisible|contradiction|checklist|why-doesnt|show-up|doesnt-show/],
      ['voice', /voice|\/ai-advisor$|^\/ask|online-consulting|contact/],
      ['agents', /agent|automation|ai-for-|commerce|fractional/],
      ['dna', /dna|brand-creation|about|portfolio|textile|bluemoon|blue-moon/],
      ['funnel', /leads|sales|customers|advertising|ads-in|dont-buy/],
      ['growth', /growth|budget|spend|how-much|price|stalled|agency|services/],
      ['rank', /outrank|seo-agencies|choose-an-llmo/],
      ['network', /llm|llmo|ai-visibility|ai-seo|cited|authority|answers|chatgpt|schema|search|model|frontier|announcement/],
      ['strategy', /strategy|myth/],
      ['docs', /long-view|news/]
    ];
    for (var i = 0; i < rules.length; i++) if (rules[i][1].test(p) || rules[i][1].test(slug)) return rules[i][0];
    return 'network';
  }

  // ----------------------------------------------------------- where it goes
  function findHero() {
    var main = document.querySelector('main') || document.body;
    var h1 = main.querySelector('h1');
    if (!h1) return null;
    var el = h1;
    // climb to the section-level block that holds the h1
    while (el.parentElement && el.parentElement !== main && el.parentElement !== document.body) {
      el = el.parentElement;
      if (/^(HEADER|SECTION)$/.test(el.tagName)) break;
    }
    if (el === h1) return null;
    if (el.querySelector('canvas,video,iframe,x-embed')) return null;
    var viz = el.querySelector('.ph-viz');
    if (viz && (viz.querySelector('.glance') || viz.querySelector('.constel'))) return { el: el, h1: h1, viz: viz };
    // a photo backdrop (CSS background image on the section, an ancestor or a child) means it is not empty
    var chk = [el, el.parentElement].concat([].slice.call(el.querySelectorAll('*'), 0, 250));
    for (var b = 0; b < chk.length; b++) { if (!chk[b]) continue; var bi = getComputedStyle(chk[b]).backgroundImage, bb = getComputedStyle(chk[b], '::before').backgroundImage;
      if (/url\(/.test(bi) || /url\(/.test(bb)) return null; }
    var imgs = el.querySelectorAll('img,svg,picture');
    for (var i = 0; i < imgs.length; i++) { var r = imgs[i].getBoundingClientRect(); if (r.width > 160 && r.height > 120) return null; }
    return { el: el, h1: h1 };
  }
  function contentBox(el, y0, y1) {
    // the horizontal extent actually covered by text and controls (not the width of their boxes)
    var L = Infinity, R = -Infinity, n = 0;
    function add(r) { if (r.width < 2 || r.height < 2) return; if (y0 != null && (r.bottom < y0 || r.top > y1)) return; if (r.left < L) L = r.left; if (r.right > R) R = r.right; }
    var tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null), node, rg = document.createRange();
    while ((node = tw.nextNode()) && n < 600) {
      if (!/\S/.test(node.nodeValue)) continue;
      var pe = node.parentElement; if (!pe || pe.closest('script,style,noscript')) continue;
      rg.selectNodeContents(node); var rs = rg.getClientRects(); for (var k = 0; k < rs.length; k++) add(rs[k]); n++;
    }
    var ctl = el.querySelectorAll('input,select,textarea,button,a.btn,[class*="btn"],img,svg');
    for (var i = 0; i < ctl.length; i++) add(ctl[i].getBoundingClientRect());
    return { L: L, R: R };
  }
  // ------------------------------------------------------------- 3D helpers
  var rand = (function (s) { return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; })(7);
  function sphere(n, r) { var a = []; for (var i = 0; i < n; i++) { var u = rand() * 2 - 1, t = rand() * 6.2832, s = Math.sqrt(1 - u * u); a.push({ x: s * Math.cos(t) * r, y: u * r, z: s * Math.sin(t) * r, k: rand() }); } return a; }
  function nearestEdges(P, k) { var E = []; for (var a = 0; a < P.length; a++) { var b2 = []; for (var b = 0; b < P.length; b++) if (a !== b) { var dx = P[a].x - P[b].x, dy = P[a].y - P[b].y, dz = P[a].z - P[b].z; b2.push([dx * dx + dy * dy + dz * dz, b]); } b2.sort(function (p, q) { return p[0] - q[0]; }); for (var j = 0; j < k; j++) if (a < b2[j][1]) E.push([a, b2[j][1]]); } return E; }

  function Stage(cv, scene) {
    var ctx = cv.getContext('2d'), W = 0, H = 0, ox = 0, oy = 0, S = 1, rot = 0, tx = 0.2, ty = 0, ax = 0.2, ay = 0, last = 0, run = false, T = 0;
    function size() {
      var r = cv.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, MOBILE ? 1.5 : 1.75);
      W = r.width; H = r.height; cv.width = Math.round(W * d); cv.height = Math.round(H * d); ctx.setTransform(d, 0, 0, d, 0, 0);
      ox = W * (cv._cx || 0.5); oy = H * (cv._cy || 0.5); S = Math.min(W, H) * (cv._s || 0.36);
    }
    function P(p) {
      var cy = Math.cos(rot + ty), sy = Math.sin(rot + ty), x = p.x * cy - p.z * sy, z = p.x * sy + p.z * cy;
      var cx = Math.cos(tx), sx = Math.sin(tx), y = p.y * cx - z * sx; z = p.y * sx + z * cx;
      var f = 3.4 / (3.4 + z); return { x: ox + x * S * f, y: oy + y * S * f, f: f, z: z };
    }
    var api = { ctx: ctx, P: P, C: C, get W() { return W; }, get H() { return H; }, get S() { return S; }, get t() { return T; }, get ox() { return ox; }, get oy() { return oy; } };
    var spin = scene.spin == null ? 0.00016 : scene.spin;
    if (scene.tilt != null) { tx = ax = scene.tilt; }
    function frame(now) {
      if (MOBILE && last && now - last < 30) { if (run && !reduce) requestAnimationFrame(frame); return; } // ~30fps on phones: kinder to the battery
      var dt = Math.min(50, now - (last || now)); last = now; if (!reduce) { T += dt / 1000; rot += dt * spin; }
      tx += (ax - tx) * 0.05; ty += (ay - ty) * 0.05;
      ctx.clearRect(0, 0, W, H); scene.draw(api, dt / 1000);
      if (run && !reduce) requestAnimationFrame(frame);
    }
    function start() { if (!run) { run = true; last = 0; requestAnimationFrame(frame); } }
    function stop() { run = false; }
    size(); if (scene.init) scene.init(api); frame(performance.now());
    var lastW = innerWidth; // phones fire resize when the address bar slides; only a real width change needs a redraw
    addEventListener('resize', function () { if (MOBILE && innerWidth === lastW) return; lastW = innerWidth; size(); if (!run) frame(performance.now()); });
    if (!reduce) {
      if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { e[0].isIntersecting && !document.hidden ? start() : stop(); }).observe(cv); else start();
      document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
      if (MOBILE) addEventListener('scroll', function () { var k = Math.min(1, scrollY / 600); ay = k * 0.9; ax = (scene.tilt == null ? 0.2 : scene.tilt) + k * 0.25; }, { passive: true }); // the scene turns as you scroll
      else addEventListener('pointermove', function (e) { ay = (e.clientX / innerWidth - 0.5) * 0.5; ax = (scene.tilt == null ? 0.2 : scene.tilt) + (e.clientY / innerHeight - 0.5) * 0.3; }, { passive: true });
    }
  }
  function dot(g, x, y, r, col, a) { g.fillStyle = 'rgba(' + col + ',' + a.toFixed(3) + ')'; g.beginPath(); g.arc(x, y, r, 0, 6.2832); g.fill(); }
  function glow(g, x, y, r, inner, outer) { var rg = g.createRadialGradient(x, y, 0, x, y, r); rg.addColorStop(0, inner); rg.addColorStop(1, outer); g.fillStyle = rg; g.beginPath(); g.arc(x, y, r, 0, 6.2832); g.fill(); }
  function line(g, a, b, col, al, w) { g.strokeStyle = 'rgba(' + col + ',' + al.toFixed(3) + ')'; g.lineWidth = w || 1; g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke(); }
  function path3(s, pts, col, al, w) { var g = s.ctx; g.strokeStyle = 'rgba(' + col + ',' + al + ')'; g.lineWidth = w || 1; g.beginPath(); for (var i = 0; i < pts.length; i++) { var q = s.P(pts[i]); i ? g.lineTo(q.x, q.y) : g.moveTo(q.x, q.y); } g.stroke(); }
  function depthA(f) { return Math.max(0.12, Math.min(1, (f - 0.66) * 1.7)); }

  // ------------------------------------------------------------------ scenes
  var SCENES = {
    network: {
      init: function () { this.n = sphere(70, 1); this.n.forEach(function (p) { var r = 0.55 + p.k * 0.45; p.x *= r * 1.2; p.y *= r * 0.9; p.z *= r * 1.2; }); this.e = nearestEdges(this.n, 2); this.pu = []; },
      draw: function (s, dt) {
        var g = s.ctx, Q = this.n.map(s.P), c = s.P({ x: 0, y: 0, z: 0 });
        this.e.forEach(function (e) { var a = Q[e[0]], b = Q[e[1]]; line(g, a, b, '120,170,255', Math.max(0.04, Math.min(0.5, (a.f + b.f - 1.15) * 0.5))); });
        for (var i = 0; i < Q.length; i += 4) line(g, Q[i], c, C.v, 0.16);
        if (!reduce && Math.random() < 0.1 && this.pu.length < 16) this.pu.push({ i: (Math.random() * Q.length / 4 | 0) * 4, t: 0 });
        for (var j = this.pu.length - 1; j >= 0; j--) { var p = this.pu[j]; p.t += dt * 0.9; if (p.t >= 1) { this.pu.splice(j, 1); continue; } var f = Q[p.i]; dot(g, f.x + (c.x - f.x) * p.t, f.y + (c.y - f.y) * p.t, 2.6, '255,200,120', 0.9 * Math.sin(p.t * Math.PI)); }
        var n = this.n; Q.map(function (q, i) { return [q, n[i]]; }).sort(function (a, b) { return b[0].z - a[0].z; }).forEach(function (o) { var q = o[0], a = depthA(q.f), col = o[1].k < 0.18 ? C.a : o[1].k < 0.6 ? C.c : C.v; dot(g, q.x, q.y, (1.2 + o[1].k * 1.6) * q.f * 3, col, a * 0.22); dot(g, q.x, q.y, (1.2 + o[1].k * 1.6) * q.f, col, a); });
        glow(g, c.x, c.y, 44 * (1 + Math.sin(s.t * 2) * 0.07), 'rgba(255,214,150,.95)', 'rgba(160,107,255,0)');
      }
    },
    scan: {
      init: function () { this.pts = sphere(90, 1); this.hit = this.pts.map(function () { return 0; }); },
      draw: function (s, dt) {
        var g = s.ctx, i, a, k, ring;
        for (var lat = -60; lat <= 60; lat += 30) { ring = []; var y = Math.sin(lat * Math.PI / 180), r = Math.cos(lat * Math.PI / 180); for (a = 0; a <= 48; a++) ring.push({ x: Math.cos(a / 48 * 6.2832) * r, y: y, z: Math.sin(a / 48 * 6.2832) * r }); path3(s, ring, '120,170,255', 0.16); }
        for (var lon = 0; lon < 180; lon += 30) { ring = []; for (a = 0; a <= 48; a++) { var t = a / 48 * 6.2832, L = lon * Math.PI / 180; ring.push({ x: Math.cos(t) * Math.cos(L), y: Math.sin(t), z: Math.cos(t) * Math.sin(L) }); } path3(s, ring, '120,170,255', 0.12); }
        var sy = reduce ? 0.3 : Math.sin(s.t * 0.7) * 0.92, sr = Math.sqrt(Math.max(0, 1 - sy * sy)); ring = [];
        for (a = 0; a <= 64; a++) ring.push({ x: Math.cos(a / 64 * 6.2832) * sr * 1.04, y: sy, z: Math.sin(a / 64 * 6.2832) * sr * 1.04 });
        path3(s, ring, C.c, 0.85, 2); path3(s, ring.map(function (p) { return { x: p.x * 1.08, y: p.y, z: p.z * 1.08 }; }), C.c, 0.25, 6);
        for (i = 0; i < this.pts.length; i++) { var p = this.pts[i]; if (Math.abs(p.y - sy) < 0.06) this.hit[i] = 1; this.hit[i] = Math.max(0, this.hit[i] - dt * 0.35); var q = s.P(p), h = this.hit[i], col = p.k < 0.22 ? C.a : C.c; dot(g, q.x, q.y, (1.3 + h * 2.4) * q.f, h > 0.05 && p.k < 0.22 ? C.r : col, depthA(q.f) * (0.35 + h * 0.65)); if (h > 0.6 && p.k < 0.22) { g.strokeStyle = 'rgba(' + C.r + ',' + (h * 0.7).toFixed(2) + ')'; g.lineWidth = 1.2; g.beginPath(); g.arc(q.x, q.y, 9 * q.f, 0, 6.2832); g.stroke(); } }
        var c = s.P({ x: 0, y: 0, z: 0 }); glow(g, c.x, c.y, 26, 'rgba(45,212,255,.35)', 'rgba(45,212,255,0)');
      }
    },
    agents: {
      tilt: 0.35,
      init: function () { this.o = [0, 1.05, 2.1].map(function (k) { return { tilt: k, r: 0.7 + k * 0.17, sp: 0.5 - k * 0.12, a: [rand() * 6, rand() * 6, rand() * 6] }; }); this.fl = []; },
      draw: function (s, dt) {
        var g = s.ctx, self = this, c = s.P({ x: 0, y: 0, z: 0 });
        glow(g, c.x, c.y, 70, 'rgba(160,107,255,.35)', 'rgba(160,107,255,0)'); glow(g, c.x, c.y, 26, 'rgba(255,214,150,.95)', 'rgba(255,170,90,0)');
        this.o.forEach(function (o, oi) {
          function pt(t) { var x = Math.cos(t) * o.r, z = Math.sin(t) * o.r, ct = Math.cos(o.tilt * 0.9), st = Math.sin(o.tilt * 0.9); return { x: x, y: z * st * 0.8, z: z * ct }; }
          var ring = []; for (var a = 0; a <= 72; a++) ring.push(pt(a / 72 * 6.2832)); path3(s, ring, oi === 1 ? C.a : C.c, 0.22);
          o.a.forEach(function (a0, ai) { var t = a0 + s.t * o.sp * (ai % 2 ? 1 : 0.8), q = s.P(pt(t)); dot(g, q.x, q.y, 9 * q.f, oi === 1 ? C.a : C.c, 0.18); dot(g, q.x, q.y, 4 * q.f, oi === 1 ? C.a : C.c, depthA(q.f)); if (!reduce && Math.random() < 0.006) self.fl.push({ q: q, t: 0 }); });
        });
        for (var i = this.fl.length - 1; i >= 0; i--) { var f = this.fl[i]; f.t += dt * 1.6; if (f.t > 1) { this.fl.splice(i, 1); continue; } line(g, f.q, c, C.g, 0.6 * (1 - f.t), 1.5); dot(g, f.q.x + (c.x - f.q.x) * f.t, f.q.y + (c.y - f.q.y) * f.t, 3, C.g, 1 - f.t); }
      }
    },
    growth: {
      tilt: 0.55, spin: 0.00009,
      draw: function (s) {
        var g = s.ctx, N = 6, bars = [], sp = 0.32;
        for (var i = 0; i < N; i++) for (var j = 0; j < N; j++) { var x = (i - (N - 1) / 2) * sp, z = (j - (N - 1) / 2) * sp, h = 0.15 + (i + j) / (2 * N) * 1.1 + Math.sin(s.t * 1.2 + i * 0.7 + j * 0.5) * 0.08; bars.push({ x: x, z: z, h: h, k: (i + j) / (2 * N - 2) }); }
        var base = 0.75;
        bars.forEach(function (b) { b.d = s.P({ x: b.x, y: 0, z: b.z }).z; });
        bars.sort(function (a, b) { return b.d - a.d; });
        var w = sp * 0.36;
        bars.forEach(function (b) {
          var y0 = base, y1 = base - b.h, col = b.k > 0.8 ? C.a : b.k > 0.45 ? C.c : C.v;
          var c = [[-w, -w], [w, -w], [w, w], [-w, w]].map(function (o) { return [s.P({ x: b.x + o[0], y: y0, z: b.z + o[1] }), s.P({ x: b.x + o[0], y: y1, z: b.z + o[1] })]; });
          for (var f = 0; f < 4; f++) { var A = c[f], B = c[(f + 1) % 4]; g.fillStyle = 'rgba(' + col + ',' + (0.06 + f % 2 * 0.05) + ')'; g.strokeStyle = 'rgba(' + col + ',.45)'; g.lineWidth = 1; g.beginPath(); g.moveTo(A[0].x, A[0].y); g.lineTo(B[0].x, B[0].y); g.lineTo(B[1].x, B[1].y); g.lineTo(A[1].x, A[1].y); g.closePath(); g.fill(); g.stroke(); }
          g.fillStyle = 'rgba(' + col + ',.5)'; g.beginPath(); c.forEach(function (q, k) { k ? g.lineTo(q[1].x, q[1].y) : g.moveTo(q[1].x, q[1].y); }); g.closePath(); g.fill();
        });
        var tr = []; for (var t = 0; t <= 30; t++) { var u = t / 30; tr.push({ x: (u - 0.5) * 2.2, y: base - 0.3 - u * 1.35 - Math.sin(u * 9 + s.t) * 0.03, z: (u - 0.5) * 2.2 }); }
        path3(s, tr, C.a, 0.9, 2.5); var e = s.P(tr[30]); glow(g, e.x, e.y, 18, 'rgba(255,214,150,.95)', 'rgba(255,170,90,0)');
      }
    },
    dna: {
      tilt: 0.1, spin: 0.0005,
      draw: function (s) {
        var g = s.ctx, N = 26, items = [];
        for (var i = 0; i < N; i++) { var y = (i / (N - 1) - 0.5) * 2.3, a = i * 0.48 + s.t * 0.3, A = { x: Math.cos(a) * 0.55, y: y, z: Math.sin(a) * 0.55 }, B = { x: -A.x, y: y, z: -A.z }; items.push([s.P(A), s.P(B), i]); }
        items.forEach(function (it) { var a = it[0], b = it[1], al = Math.min(depthA(a.f), depthA(b.f)); var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2; line(g, a, { x: mx, y: my }, it[2] % 2 ? C.c : C.a, 0.35 * al + 0.08, 2); line(g, { x: mx, y: my }, b, it[2] % 2 ? C.v : C.g, 0.35 * al + 0.08, 2); });
        for (var k = 0; k < 2; k++) { var st = items.map(function (it) { return it[k]; }); g.strokeStyle = 'rgba(' + (k ? C.v : C.c) + ',.55)'; g.lineWidth = 2; g.beginPath(); st.forEach(function (q, i) { i ? g.lineTo(q.x, q.y) : g.moveTo(q.x, q.y); }); g.stroke(); }
        items.forEach(function (it) { [0, 1].forEach(function (k) { var q = it[k]; dot(g, q.x, q.y, 9 * q.f, k ? C.v : C.c, 0.12 * depthA(q.f)); dot(g, q.x, q.y, 4 * q.f, k ? C.v : C.c, depthA(q.f)); }); });
      }
    },
    shield: {
      init: function () {
        var t = (1 + Math.sqrt(5)) / 2, V = [[-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0], [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t], [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]];
        var F = [[0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11], [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8], [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9], [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]];
        var pts = V.map(function (v) { var l = Math.hypot(v[0], v[1], v[2]); return { x: v[0] / l, y: v[1] / l, z: v[2] / l }; }), key = {}, E = {};
        function mid(a, b) { var k = a < b ? a + '_' + b : b + '_' + a; if (key[k] != null) return key[k]; var p = pts[a], q = pts[b], m = { x: p.x + q.x, y: p.y + q.y, z: p.z + q.z }, l = Math.hypot(m.x, m.y, m.z); pts.push({ x: m.x / l, y: m.y / l, z: m.z / l }); return key[k] = pts.length - 1; }
        F.forEach(function (f) { var a = mid(f[0], f[1]), b = mid(f[1], f[2]), c = mid(f[2], f[0]); [[f[0], a, c], [f[1], b, a], [f[2], c, b], [a, b, c]].forEach(function (tr) { for (var i = 0; i < 3; i++) { var x = tr[i], y = tr[(i + 1) % 3]; E[x < y ? x + '_' + y : y + '_' + x] = [x, y]; } }); });
        this.p = pts.map(function (p) { return { x: p.x * 1.05, y: p.y * 1.05, z: p.z * 1.05 }; }); this.e = Object.keys(E).map(function (k) { return E[k]; }); this.th = [];
      },
      draw: function (s, dt) {
        var g = s.ctx, Q = this.p.map(s.P);
        this.e.forEach(function (e) { var a = Q[e[0]], b = Q[e[1]]; line(g, a, b, C.c, Math.max(0.05, Math.min(0.45, (a.f + b.f - 1.2) * 0.6))); });
        Q.forEach(function (q) { dot(g, q.x, q.y, 1.6 * q.f, C.c, depthA(q.f) * 0.8); });
        var hex = []; for (var i = 0; i <= 6; i++) { var a = i / 6 * 6.2832 + 0.52; hex.push({ x: Math.cos(a) * 0.38, y: Math.sin(a) * 0.38, z: 0 }); }
        var H = hex.map(s.P); g.fillStyle = 'rgba(' + C.g + ',.55)'; g.strokeStyle = 'rgba(' + C.g + ',.95)'; g.lineWidth = 2; g.beginPath(); H.forEach(function (q, k) { k ? g.lineTo(q.x, q.y) : g.moveTo(q.x, q.y); }); g.closePath(); g.fill(); g.stroke();
        var c = s.P({ x: 0, y: 0, z: 0 }); glow(g, c.x, c.y, 90, 'rgba(110,231,183,.22)', 'rgba(110,231,183,0)');
        if (!reduce && Math.random() < 0.05 && this.th.length < 6) { var u = rand() * 6.2832, v = rand() * 2 - 1, r = Math.sqrt(1 - v * v); this.th.push({ d: { x: Math.cos(u) * r, y: v, z: Math.sin(u) * r }, t: 0 }); }
        for (var j = this.th.length - 1; j >= 0; j--) { var th = this.th[j]; th.t += dt * 0.8; if (th.t > 1) { this.th.splice(j, 1); continue; } var dist = th.t < 0.5 ? 2.2 - th.t * 2.3 : 1.05 + (th.t - 0.5) * 2.4, q = s.P({ x: th.d.x * dist, y: th.d.y * dist, z: th.d.z * dist }); dot(g, q.x, q.y, 3 * q.f, C.r, th.t < 0.5 ? 0.9 : 0.9 * (1 - th.t) * 2); if (Math.abs(th.t - 0.5) < 0.06) { g.strokeStyle = 'rgba(' + C.c + ',.8)'; g.lineWidth = 1.5; g.beginPath(); g.arc(q.x, q.y, 14 * q.f, 0, 6.2832); g.stroke(); } }
      }
    },
    voice: {
      tilt: 0.95, spin: 0.00012,
      draw: function (s) {
        var g = s.ctx, N = 72, c = s.P({ x: 0, y: 0, z: 0 });
        glow(g, c.x, c.y, 60, 'rgba(45,212,255,.35)', 'rgba(45,212,255,0)');
        for (var ring = 0; ring < 2; ring++) for (var i = 0; i < N; i++) {
          var a = i / N * 6.2832, r = ring ? 0.55 : 0.95, amp = (Math.sin(s.t * 3 + i * 0.45) * 0.5 + Math.sin(s.t * 1.7 + i * 0.21 + ring) * 0.5 + 1) * 0.5;
          var h = (ring ? 0.22 : 0.45) * (0.25 + amp), x = Math.cos(a) * r, z = Math.sin(a) * r, A = s.P({ x: x, y: 0, z: z }), B = s.P({ x: x, y: -h, z: z });
          line(g, A, B, ring ? C.v : (amp > 0.75 ? C.a : C.c), depthA(A.f) * 0.85, 2.4 * A.f); }
        var w = []; for (var k = 0; k <= 80; k++) { var u = k / 80; w.push({ x: (u - 0.5) * 2.6, y: 0.62 + Math.sin(u * 22 - s.t * 4) * 0.06 * Math.sin(u * 3.14), z: 0 }); } path3(s, w, C.c, 0.4, 1.5);
      }
    },
    pulse: {
      tilt: 0.4, spin: 0.00006,
      draw: function (s) {
        var g = s.ctx, i;
        for (i = -5; i <= 5; i++) { path3(s, [{ x: i * 0.25, y: 0.5, z: -1.25 }, { x: i * 0.25, y: 0.5, z: 1.25 }], '120,170,255', 0.13); path3(s, [{ x: -1.25, y: 0.5, z: i * 0.25 }, { x: 1.25, y: 0.5, z: i * 0.25 }], '120,170,255', 0.13); }
        function ecg(u) { var m = (u * 3) % 1; if (m > 0.42 && m < 0.46) return -(m - 0.42) * 6; if (m > 0.46 && m < 0.5) return -0.24 + (m - 0.46) * 22; if (m > 0.5 && m < 0.54) return 0.64 - (m - 0.5) * 18; if (m > 0.62 && m < 0.72) return -Math.sin((m - 0.62) / 0.1 * 3.14) * 0.09; return 0; }
        var head = reduce ? 0.8 : (s.t * 0.28) % 1, pts = [];
        for (i = 0; i <= 160; i++) { var u = i / 160; pts.push({ x: (u - 0.5) * 2.4, y: -0.1 - ecg(u) * 0.9, z: 0, u: u }); }
        var g2 = s.ctx; for (i = 1; i < pts.length; i++) { var d = head - pts[i].u; if (d < 0) d += 1; var al = Math.max(0.06, 1 - d * 1.6); line(g2, s.P(pts[i - 1]), s.P(pts[i]), d < 0.03 ? C.a : C.c, al, 2.2); }
        var hq = s.P(pts[Math.round(head * 160)]); glow(g, hq.x, hq.y, 22, 'rgba(255,214,150,.95)', 'rgba(255,170,90,0)');
        var ring = []; for (i = 0; i <= 64; i++) { var a = i / 64 * 6.2832; ring.push({ x: Math.cos(a) * 0.9, y: 0.5, z: Math.sin(a) * 0.9 }); } path3(s, ring, C.g, 0.35, 1.5);
      }
    },
    docs: {
      tilt: 0.15, spin: 0.0002,
      init: function () { this.cards = []; for (var i = 0; i < 7; i++) this.cards.push({ a: i / 7 * 6.2832, y: (rand() - 0.5) * 0.5, lines: 5 + (rand() * 3 | 0), hot: i === 2 }); },
      draw: function (s) {
        var g = s.ctx, R = 0.95, list = this.cards.map(function (c) { var cx = Math.cos(c.a) * R, cz = Math.sin(c.a) * R; return { c: c, cx: cx, cz: cz, d: s.P({ x: cx, y: c.y, z: cz }).z }; });
        list.sort(function (a, b) { return b.d - a.d; });
        list.forEach(function (o) {
          var c = o.c, tx = -Math.sin(c.a), tz = Math.cos(c.a), w = 0.36, h = 0.48;
          function at(u, v) { return s.P({ x: o.cx + tx * u, y: c.y + v, z: o.cz + tz * u }); }
          var q = [at(-w, -h), at(w, -h), at(w, h), at(-w, h)], al = depthA(q[0].f);
          g.fillStyle = 'rgba(18,28,44,' + (0.55 + al * 0.35).toFixed(2) + ')'; g.strokeStyle = 'rgba(' + (c.hot ? C.a : C.c) + ',' + (0.25 + al * 0.5).toFixed(2) + ')'; g.lineWidth = 1.2;
          g.beginPath(); q.forEach(function (p, k) { k ? g.lineTo(p.x, p.y) : g.moveTo(p.x, p.y); }); g.closePath(); g.fill(); g.stroke();
          line(g, at(-w * 0.75, -h * 0.72), at(w * 0.3, -h * 0.72), '230,236,245', 0.55 * al, 3 * q[0].f);
          for (var k = 0; k < c.lines; k++) { var v = -h * 0.45 + k * 0.12, hot = c.hot && k === 2 + ((s.t * 0.6 | 0) % 3); line(g, at(-w * 0.75, v), at(w * (0.75 - (k % 3) * 0.15), v), hot ? C.a : '150,165,190', (hot ? 0.95 : 0.3) * al, (hot ? 3 : 1.6) * q[0].f); }
        });
        var c0 = s.P({ x: 0, y: 0, z: 0 }); glow(g, c0.x, c0.y, 30, 'rgba(255,214,150,.6)', 'rgba(255,170,90,0)');
      }
    },
    map: {
      tilt: 0.6, spin: 0.00008,
      init: function () { this.pins = [[0.1, 0.05, 1], [-0.55, 0.4, 0], [0.6, -0.35, 0], [-0.3, -0.6, 0], [0.5, 0.55, 0]]; },
      draw: function (s) {
        var g = s.ctx, N = 14, i, j, Y = function (x, z) { return 0.45 - Math.sin(x * 2.2 + 0.5) * Math.cos(z * 1.8) * 0.12 - Math.cos(x * 4 + z * 3) * 0.03; };
        for (i = 0; i <= N; i++) { var a = [], b = []; for (j = 0; j <= N; j++) { var x = (i / N - 0.5) * 2.4, z = (j / N - 0.5) * 2.4; a.push({ x: x, y: Y(x, z), z: z }); b.push({ x: z, y: Y(z, x), z: x }); } path3(s, a, '120,170,255', 0.16); path3(s, b, '120,170,255', 0.16); }
        var self = this; this.pins.forEach(function (p, k) {
          var base = { x: p[0], y: Y(p[0], p[1]), z: p[1] }, top = { x: p[0], y: base.y - (p[2] ? 0.75 : 0.42), z: p[1] }, B = s.P(base), T = s.P(top), col = p[2] ? C.a : C.c;
          line(g, B, T, col, 0.8, p[2] ? 2.5 : 1.5); dot(g, T.x, T.y, (p[2] ? 7 : 4.5) * T.f, col, 1);
          var ph = reduce ? 0.5 : (s.t * 0.6 + k * 0.3) % 1, ring = []; for (var m = 0; m <= 40; m++) { var an = m / 40 * 6.2832; ring.push({ x: base.x + Math.cos(an) * ph * 0.35, y: base.y, z: base.z + Math.sin(an) * ph * 0.35 }); } path3(s, ring, col, (1 - ph) * 0.7, 1.4);
          if (p[2]) glow(g, T.x, T.y, 30, 'rgba(255,214,150,.8)', 'rgba(255,170,90,0)');
        });
      }
    }
  };


  // ------------------------------------------------- scenes for services and industries
  function ring3(s, cx, cy, cz, r, ax, col, al, w, n) { // a circle in a plane: ax 'y' = horizontal (xz), 'z' = facing (xy), 'x' = side (yz)
    var pts = []; n = n || 48;
    for (var i = 0; i <= n; i++) { var a = i / n * 6.2832, c = Math.cos(a) * r, d = Math.sin(a) * r;
      pts.push(ax === 'y' ? { x: cx + c, y: cy, z: cz + d } : ax === 'z' ? { x: cx + c, y: cy + d, z: cz } : { x: cx, y: cy + c, z: cz + d }); }
    path3(s, pts, col, al, w);
  }
  function poly3(s, pts, fill, stroke, w) { var g = s.ctx, q = pts.map(s.P); g.beginPath(); q.forEach(function (p, i) { i ? g.lineTo(p.x, p.y) : g.moveTo(p.x, p.y); }); g.closePath(); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.strokeStyle = stroke; g.lineWidth = w || 1; g.stroke(); } }
  // The four engines, orbiting whatever the page is about: what the old 2D diagrams said, now in depth.
  function engines(s, label, r) {
    var g = s.ctx, names = ['ChatGPT', 'Claude', 'Gemini', 'Perplexity'], c = s.P({ x: 0, y: 0, z: 0 }); r = r || 1.35;
    g.font = '600 11px ui-monospace, SFMono-Regular, Menlo, monospace'; g.textAlign = 'center'; g.textBaseline = 'middle';
    names.map(function (n, i) { var a = i / 4 * 6.2832 + s.t * 0.12; return { n: n, q: s.P({ x: Math.cos(a) * r, y: Math.sin(a * 2) * 0.12 - 0.05, z: Math.sin(a) * r }) }; })
      .sort(function (a, b) { return b.q.z - a.q.z; }).forEach(function (o, i) {
        var q = o.q, al = depthA(q.f), w = g.measureText(o.n.toUpperCase()).width + 18;
        line(g, q, c, C.c, 0.14 * al);
        g.fillStyle = 'rgba(12,18,30,' + (0.55 + 0.35 * al).toFixed(2) + ')'; g.strokeStyle = 'rgba(45,212,255,' + (0.25 + 0.45 * al).toFixed(2) + ')';
        g.beginPath(); if (g.roundRect) g.roundRect(q.x - w / 2, q.y - 11, w, 22, 6); else g.rect(q.x - w / 2, q.y - 11, w, 22); g.fill(); g.stroke();
        g.fillStyle = 'rgba(200,215,235,' + (0.45 + 0.55 * al).toFixed(2) + ')'; g.fillText(o.n.toUpperCase(), q.x, q.y + 0.5);
      });
    if (label) { g.font = '700 11px ui-monospace, SFMono-Regular, Menlo, monospace'; g.fillStyle = 'rgba(255,214,150,.95)'; g.fillText(label, c.x, c.y + s.S * 0.98); }
  }

  var MORE = {
    // AI consulting: strategy as a decision tree; one path, lit gold, is the plan.
    strategy: {
      tilt: 0.12, spin: 0.00022,
      init: function () {
        var nodes = [{ x: 0, y: 0.95, z: 0, d: 0, gold: true }], edges = [];
        (function grow(pi, depth) {
          if (depth > 3) return; var p = nodes[pi], k = depth === 0 ? 3 : 2, goldKid = (depth * 7 + 1) % k;
          for (var i = 0; i < k; i++) { var a = (i / k) * 6.2832 + depth * 1.3 + rand() * 0.5, spread = 0.62 - depth * 0.12;
            var n = { x: p.x + Math.cos(a) * spread, y: p.y - 0.5, z: p.z + Math.sin(a) * spread, d: depth + 1, gold: p.gold && i === goldKid };
            nodes.push(n); edges.push([pi, nodes.length - 1]); grow(nodes.length - 1, depth + 1); }
        })(0, 0);
        this.n = nodes; this.e = edges; this.path = []; var cur = 0;
        while (true) { var nx = -1; for (var j = 0; j < edges.length; j++) if (edges[j][0] === cur && nodes[edges[j][1]].gold) nx = edges[j][1]; if (nx < 0) break; this.path.push([cur, nx]); cur = nx; }
      },
      draw: function (s) {
        var g = s.ctx, Q = this.n.map(s.P), n = this.n;
        this.e.forEach(function (e) { var gold = n[e[0]].gold && n[e[1]].gold; line(g, Q[e[0]], Q[e[1]], gold ? C.a : '120,170,255', gold ? 0.9 : 0.28 * depthA(Q[e[1]].f) + 0.08, gold ? 2.6 : 1.2); });
        var T = reduce ? 0.7 : (s.t * 0.35) % 1, seg = this.path[Math.min(this.path.length - 1, (T * this.path.length) | 0)], u = (T * this.path.length) % 1;
        if (seg) { var A = Q[seg[0]], B = Q[seg[1]]; glow(g, A.x + (B.x - A.x) * u, A.y + (B.y - A.y) * u, 16, 'rgba(255,214,150,.95)', 'rgba(255,170,90,0)'); }
        Q.forEach(function (q, i) { var nd = n[i], col = nd.gold ? C.a : nd.d === 4 ? C.v : C.c; dot(g, q.x, q.y, (nd.gold ? 5 : 3) * q.f, col, depthA(q.f)); if (nd.gold && nd.d === 4) glow(g, q.x, q.y, 30, 'rgba(255,214,150,.7)', 'rgba(255,170,90,0)'); });
      }
    },
    // AI advisory: a gyroscope — steady guidance while everything around it moves.
    gyro: {
      tilt: 0.2, spin: 0.0001,
      draw: function (s) {
        var g = s.ctx, t = s.t, R = [1.0, 0.82, 0.64];
        function ringPts(r, rx, ry) { var pts = []; for (var i = 0; i <= 64; i++) { var a = i / 64 * 6.2832, x = Math.cos(a) * r, y = Math.sin(a) * r, z = 0;
          var cy = Math.cos(ry), sy = Math.sin(ry), x2 = x * cy - z * sy, z2 = x * sy + z * cy; var cx = Math.cos(rx), sx = Math.sin(rx); pts.push({ x: x2, y: y * cx - z2 * sx, z: y * sx + z2 * cx }); } return pts; }
        path3(s, ringPts(R[0], 1.57, t * 0.4), C.v, 0.5, 2); path3(s, ringPts(R[1], t * 0.7, 0.6), C.c, 0.6, 2); path3(s, ringPts(R[2], 0.3, -t * 1.1), C.a, 0.7, 2);
        for (var k = 0; k < 24; k++) { var a = k / 24 * 6.2832, o = { x: Math.cos(a) * 1.12, y: 0, z: Math.sin(a) * 1.12 }, i2 = { x: Math.cos(a) * (k % 6 ? 1.07 : 1.0), y: 0, z: Math.sin(a) * (k % 6 ? 1.07 : 1.0) }; line(g, s.P(i2), s.P(o), '160,180,210', 0.35, k % 6 ? 1 : 2); }
        var nd = { x: Math.cos(0.6) * 0.95, y: -0.15, z: Math.sin(0.6) * 0.95 }, c = s.P({ x: 0, y: 0, z: 0 }), N = s.P(nd);
        line(g, c, N, C.a, 0.95, 3); dot(g, N.x, N.y, 6 * N.f, C.a, 1); glow(g, N.x, N.y, 26, 'rgba(255,214,150,.8)', 'rgba(255,170,90,0)');
        glow(g, c.x, c.y, 34, 'rgba(255,214,150,.9)', 'rgba(160,107,255,0)');
      }
    },
    // AI automation: gears that turn each other.
    gears: {
      tilt: 0.3, spin: 0.00012,
      draw: function (s) {
        var g = s.ctx, t = reduce ? 0.3 : s.t;
        function gear(cx, cy, R, N, ang, col) {
          for (var face = -1; face <= 1; face += 2) { var pts = []; for (var i = 0; i <= N * 8; i++) { var a = i / (N * 8) * 6.2832 + ang, tooth = ((i % 8) >= 2 && (i % 8) <= 5) ? 0.12 : 0; pts.push({ x: cx + Math.cos(a) * (R + tooth), y: cy + Math.sin(a) * (R + tooth), z: face * 0.07 }); }
            path3(s, pts, col, face > 0 ? 0.85 : 0.35, face > 0 ? 1.8 : 1); }
          for (var k = 0; k < 6; k++) { var a2 = k / 6 * 6.2832 + ang; path3(s, [{ x: cx + Math.cos(a2) * R * 0.25, y: cy + Math.sin(a2) * R * 0.25, z: 0.07 }, { x: cx + Math.cos(a2) * R * 0.85, y: cy + Math.sin(a2) * R * 0.85, z: 0.07 }], col, 0.45, 1.4); }
          ring3(s, cx, cy, 0.07, R * 0.22, 'z', col, 0.9, 2); var c = s.P({ x: cx, y: cy, z: 0.07 }); glow(g, c.x, c.y, R * s.S * 0.35, 'rgba(' + col + ',.35)', 'rgba(' + col + ',0)');
        }
        gear(-0.42, 0.12, 0.52, 12, t * 0.5, C.c);
        gear(0.47, -0.32, 0.36, 8, -t * 0.5 * 12 / 8 + 0.2, C.a);
        gear(0.5, 0.58, 0.26, 6, -t * 0.5 * 12 / 6 + 0.5, C.v);
      }
    },
    // AI SEO: ten ranked results, and the one answer above them that names only a few.
    rank: {
      tilt: 0.28, spin: 0.00014,
      draw: function (s) {
        var g = s.ctx, lift = reduce ? 1 : (Math.sin(s.t * 0.9) + 1) / 2;
        for (var i = 7; i >= 0; i--) {
          var y = 0.75 - i * 0.03, z = i * 0.2 - 0.6, x = 0, hot = i === 2, up = hot ? lift : 0;
          var yy = y - up * 1.05 - (hot ? 0 : 0), w = 0.75, d = 0.08;
          var al = hot ? 1 : 0.35 + 0.4 * (1 - i / 8);
          poly3(s, [{ x: -w, y: yy, z: z - d }, { x: w, y: yy, z: z - d }, { x: w, y: yy, z: z + d }, { x: -w, y: yy, z: z + d }], 'rgba(18,28,44,.85)', 'rgba(' + (hot ? C.a : C.c) + ',' + al.toFixed(2) + ')', hot ? 2 : 1);
          line(g, s.P({ x: -w * 0.8, y: yy, z: z }), s.P({ x: w * (0.1 + (i % 3) * 0.15), y: yy, z: z }), hot ? C.a : '150,165,190', hot ? 0.95 : 0.4, hot ? 2.5 : 1.5);
        }
        var A = [{ x: -0.62, y: -0.95, z: 0 }, { x: 0.62, y: -0.95, z: 0 }, { x: 0.62, y: -0.55, z: 0 }, { x: -0.62, y: -0.55, z: 0 }];
        poly3(s, A, 'rgba(18,28,44,.92)', 'rgba(' + C.v + ',.85)', 1.5);
        g.font = '600 10px ui-monospace, Menlo, monospace'; g.textAlign = 'left'; var a0 = s.P(A[0]); g.fillStyle = 'rgba(' + C.v + ',.95)'; g.fillText('AI ANSWER', a0.x + 10, a0.y + 14);
        for (var k = 0; k < 3; k++) line(g, s.P({ x: -0.5, y: -0.8 + k * 0.08, z: 0 }), s.P({ x: 0.2 + k * 0.1, y: -0.8 + k * 0.08, z: 0 }), k === 1 && lift > 0.8 ? C.a : '200,210,230', k === 1 && lift > 0.8 ? 1 : 0.5, 2);
      }
    },
    // AI marketing: a prism — one brand in, a sharper spectrum out.
    prism: {
      tilt: 0.15, spin: 0.0001,
      draw: function (s) {
        var g = s.ctx, h = 0.55, tri = [[0, -h], [0.5, h * 0.7], [-0.5, h * 0.7]], d = 0.35;
        var F = tri.map(function (p) { return { x: p[0], y: p[1], z: d }; }), B = tri.map(function (p) { return { x: p[0], y: p[1], z: -d }; });
        poly3(s, B, 'rgba(160,107,255,.08)', 'rgba(160,107,255,.5)', 1.2);
        for (var i = 0; i < 3; i++) line(g, s.P(F[i]), s.P(B[i]), C.v, 0.5, 1.2);
        var entry = { x: -0.27, y: 0.05, z: 0 }, exit = { x: 0.24, y: 0.02, z: 0 };
        line(g, s.P({ x: -1.6, y: 0.25, z: 0 }), s.P(entry), '235,240,250', 0.95, 3);
        var cols = ['255,107,107', '255,180,84', '250,230,120', '110,231,183', '45,212,255', '160,107,255'];
        cols.forEach(function (c, k) { var e = { x: 1.6, y: -0.35 + k * 0.17, z: 0 }; var A = s.P(exit), Bq = s.P(e); line(g, A, Bq, c, 0.85, 2.6);
          var u = reduce ? 0.5 : (s.t * 0.5 + k * 0.13) % 1; dot(g, A.x + (Bq.x - A.x) * u, A.y + (Bq.y - A.y) * u, 3, c, 1); });
        line(g, s.P(entry), s.P(exit), '235,240,250', 0.35, 6);
        poly3(s, F, 'rgba(45,212,255,.1)', 'rgba(45,212,255,.85)', 1.6);
      }
    },
    // Internet marketing: a funnel — many in, the right ones through.
    funnel: {
      tilt: 0.35, spin: 0.00018,
      init: function () { this.p = []; },
      draw: function (s, dt) {
        var g = s.ctx, L = [[-0.9, 1.0], [-0.45, 0.72], [0, 0.48], [0.45, 0.28], [0.85, 0.14]];
        L.forEach(function (l, i) { ring3(s, 0, l[0], 0, l[1], 'y', i === 4 ? C.a : C.c, 0.55, i === 4 ? 2 : 1.4, 56); });
        for (var k = 0; k < 8; k++) { var a = k / 8 * 6.2832; path3(s, L.map(function (l) { return { x: Math.cos(a) * l[1], y: l[0], z: Math.sin(a) * l[1] }; }), '120,170,255', 0.18); }
        if (!reduce && this.p.length < 70 && Math.random() < 0.6) { var a2 = rand() * 6.2832, r = 0.2 + rand() * 0.8; this.p.push({ a: a2, r: r, y: -1.1, keep: rand() < 0.25 }); }
        for (var j = this.p.length - 1; j >= 0; j--) { var p = this.p[j]; p.y += dt * 0.55; var lim = 1.0 - (p.y + 0.9) / 1.75 * 0.86; if (p.r > lim) { if (!p.keep) { p.dead = (p.dead || 0) + dt * 2; } p.r = lim; }
          if (p.y > 1.2 || p.dead > 1) { this.p.splice(j, 1); continue; } var q = s.P({ x: Math.cos(p.a) * p.r, y: p.y, z: Math.sin(p.a) * p.r }); dot(g, q.x, q.y, (p.keep ? 3 : 2) * q.f, p.keep ? C.a : C.c, (p.dead ? 1 - p.dead : 1) * depthA(q.f)); }
      }
    },
    // Social media: a wheel of posts, the front one getting the hearts.
    feed: {
      tilt: 0.05, spin: 0,
      init: function () { this.h = []; },
      draw: function (s, dt) {
        var g = s.ctx, N = 7, R = 0.9, rot0 = reduce ? 0 : s.t * 0.35, cards = [];
        for (var i = 0; i < N; i++) { var a = i / N * 6.2832 + rot0; cards.push({ a: a, y: Math.sin(a) * R, z: -Math.cos(a) * R }); }
        cards.sort(function (a, b) { return s.P({ x: 0, y: a.y, z: a.z }).z < s.P({ x: 0, y: b.y, z: b.z }).z ? 1 : -1; });
        cards.forEach(function (c) {
          var w = 0.42, h = 0.2, ca = Math.cos(c.a), sa = Math.sin(c.a);
          function at(u, v) { return { x: u, y: c.y + v * ca, z: c.z + v * sa }; }
          var al = Math.max(0.15, -Math.cos(c.a) * 0.8 + 0.3); if (-Math.cos(c.a) < -0.2) al *= 0.5;
          poly3(s, [at(-w, -h), at(w, -h), at(w, h), at(-w, h)], 'rgba(18,28,44,' + (0.5 + al * 0.4).toFixed(2) + ')', 'rgba(' + C.c + ',' + (0.2 + al * 0.6).toFixed(2) + ')', 1.2);
          poly3(s, [at(-w * 0.85, -h * 0.7), at(-w * 0.2, -h * 0.7), at(-w * 0.2, h * 0.6), at(-w * 0.85, h * 0.6)], 'rgba(160,107,255,' + (0.15 + al * 0.35).toFixed(2) + ')', null);
          for (var k = 0; k < 3; k++) line(g, s.P(at(-w * 0.05, -h * 0.5 + k * h * 0.45)), s.P(at(w * (0.75 - k * 0.15), -h * 0.5 + k * h * 0.45)), '170,185,210', 0.45 * al, 1.6);
        });
        if (!reduce && Math.random() < 0.2 && this.h.length < 30) this.h.push({ x: (rand() - 0.5) * 0.7, y: -R + 0.1, t: 0 });
        for (var j = this.h.length - 1; j >= 0; j--) { var hh = this.h[j]; hh.t += dt * 0.6; if (hh.t > 1) { this.h.splice(j, 1); continue; }
          var q = s.P({ x: hh.x + Math.sin(hh.t * 9) * 0.05, y: hh.y - hh.t * 0.9, z: -R - 0.1 }), r = 5;
          g.fillStyle = 'rgba(255,107,140,' + (1 - hh.t).toFixed(2) + ')'; g.beginPath(); g.moveTo(q.x, q.y + r * 0.9); g.bezierCurveTo(q.x - r * 1.6, q.y - r * 0.4, q.x - r * 0.6, q.y - r * 1.5, q.x, q.y - r * 0.5); g.bezierCurveTo(q.x + r * 0.6, q.y - r * 1.5, q.x + r * 1.6, q.y - r * 0.4, q.x, q.y + r * 0.9); g.fill(); }
      }
    },
    // Law: the scales.
    scales: {
      tilt: 0.12, spin: 0.00018,
      draw: function (s) {
        var g = s.ctx, tip = reduce ? 0.08 : Math.sin(s.t * 0.8) * 0.12;
        line(g, s.P({ x: 0, y: 0.95, z: 0 }), s.P({ x: 0, y: -0.75, z: 0 }), C.a, 0.9, 3);
        ring3(s, 0, 0.95, 0, 0.42, 'y', C.a, 0.7, 2); ring3(s, 0, 0.98, 0, 0.3, 'y', C.a, 0.4, 1.5);
        var L = { x: -0.85, y: -0.7 + tip * 0.85, z: 0 }, R = { x: 0.85, y: -0.7 - tip * 0.85, z: 0 };
        line(g, s.P(L), s.P(R), C.a, 0.95, 3); var top = s.P({ x: 0, y: -0.82, z: 0 }); glow(g, top.x, top.y, 18, 'rgba(255,214,150,.9)', 'rgba(255,170,90,0)');
        [L, R].forEach(function (E, k) {
          var py = E.y + 0.62;
          for (var i = 0; i < 3; i++) { var a = i / 3 * 6.2832 + 0.4; line(g, s.P(E), s.P({ x: E.x + Math.cos(a) * 0.3, y: py, z: Math.sin(a) * 0.3 }), '230,200,150', 0.5, 1.2); }
          ring3(s, E.x, py, 0, 0.3, 'y', k ? C.c : C.v, 0.85, 2); ring3(s, E.x, py + 0.05, 0, 0.22, 'y', k ? C.c : C.v, 0.4, 1.4);
          var c = s.P({ x: E.x, y: py - 0.08, z: 0 }); glow(g, c.x, c.y, 22, 'rgba(' + (k ? C.c : C.v) + ',.45)', 'rgba(0,0,0,0)');
        });
      }
    },
    // Dental: a molar.
    tooth: {
      tilt: 0.42, spin: 0.00028,
      draw: function (s) {
        var g = s.ctx, i, k, N = 56;
        function prof(v) { return v < 0.12 ? 0.42 + v * 1.2 : v < 0.55 ? 0.56 - (v - 0.12) * 0.05 : 0.54 - (v - 0.55) * 0.75; }
        var rows = [];
        for (k = 0; k <= 8; k++) { var v = k / 8 * 0.68, pts = []; for (i = 0; i <= N; i++) { var a = i / N * 6.2832, r = prof(v) * (1 + 0.05 * Math.cos(4 * a)), y = -0.55 + v * 1.25 - (k === 0 ? 0.09 * Math.cos(2 * a) * Math.cos(2 * a) : 0); pts.push({ x: Math.cos(a) * r * 1.1, y: y, z: Math.sin(a) * r }); } rows.push(pts); path3(s, pts, k < 2 ? '235,245,255' : C.c, k < 2 ? 0.8 : 0.4, k < 2 ? 1.8 : 1.1); }
        for (i = 0; i < N; i += 4) path3(s, rows.map(function (r) { return r[i]; }), '200,225,245', 0.28);
        [-0.22, 0.22].forEach(function (rx) { var pts = []; for (var j = 0; j <= 10; j++) { var v = j / 10; pts.push({ x: rx * (1 + v * 0.4), y: 0.3 + v * 0.62, z: 0 }); } path3(s, pts, C.c, 0.55, 5 - 3);
          for (var j2 = 0; j2 <= 4; j2++) { var vv = j2 / 4; ring3(s, rx * (1 + vv * 0.4), 0.3 + vv * 0.62, 0, 0.16 * (1 - vv * 0.75), 'y', C.c, 0.45, 1.1, 24); } });
        var sp = s.P({ x: -0.25, y: -0.62, z: 0.3 }), tw = reduce ? 1 : (Math.sin(s.t * 2.2) + 1) / 2;
        g.strokeStyle = 'rgba(255,255,255,' + (0.4 + tw * 0.6).toFixed(2) + ')'; g.lineWidth = 2; g.beginPath(); g.moveTo(sp.x - 9 * tw - 4, sp.y); g.lineTo(sp.x + 9 * tw + 4, sp.y); g.moveTo(sp.x, sp.y - 9 * tw - 4); g.lineTo(sp.x, sp.y + 9 * tw + 4); g.stroke();
      }
    },
    // Cosmetic surgery: the golden proportion, as a phyllotaxis bloom.
    golden: {
      tilt: 0.6, spin: 0.00022,
      draw: function (s) {
        var g = s.ctx, N = 320, GA = 2.39996, br = reduce ? 1 : 1 + Math.sin(s.t * 0.8) * 0.04, pts = [];
        for (var i = 1; i < N; i++) { var r = Math.sqrt(i / N) * 1.1 * br, a = i * GA, x = Math.cos(a) * r, z = Math.sin(a) * r; pts.push([s.P({ x: x, y: -0.35 * (1 - r * r) + 0.2, z: z }), i / N]); }
        pts.sort(function (a, b) { return b[0].z - a[0].z; }).forEach(function (p) { var q = p[0], u = p[1], col = u < 0.33 ? C.a : u < 0.7 ? '255,150,170' : C.v; dot(g, q.x, q.y, (1.2 + u * 2.2) * q.f, col, depthA(q.f) * 0.95); });
        var c = s.P({ x: 0, y: -0.15, z: 0 }); glow(g, c.x, c.y, 40, 'rgba(255,214,150,.9)', 'rgba(255,150,170,0)');
        var sp = []; for (var k = 0; k < 120; k++) { var a2 = k / 120 * 6.2832 * 2.2, r2 = 0.04 * Math.pow(1.618, a2 / 1.5708); if (r2 > 1.2) break; sp.push({ x: Math.cos(a2) * r2, y: -0.62, z: Math.sin(a2) * r2 }); } path3(s, sp, C.a, 0.7, 1.6);
      }
    },
    // E-commerce: a cart, with products dropping in.
    cart: {
      tilt: 0.25, spin: 0.0002,
      init: function () { this.b = []; },
      draw: function (s, dt) {
        var g = s.ctx, top = [[-0.7, -0.15, -0.38], [0.7, -0.15, -0.38], [0.7, -0.15, 0.38], [-0.7, -0.15, 0.38]], bot = [[-0.5, 0.45, -0.28], [0.55, 0.45, -0.28], [0.55, 0.45, 0.28], [-0.5, 0.45, 0.28]];
        var T = top.map(function (p) { return { x: p[0], y: p[1], z: p[2] }; }), B = bot.map(function (p) { return { x: p[0], y: p[1], z: p[2] }; });
        path3(s, B.concat([B[0]]), C.c, 0.6, 1.5);
        for (var i = 0; i < 4; i++) line(g, s.P(T[i]), s.P(B[i]), C.c, 0.6, 1.5);
        for (var k = 1; k < 6; k++) { var u = k / 6; line(g, s.P({ x: -0.7 + 1.4 * u, y: -0.15, z: -0.38 }), s.P({ x: -0.5 + 1.05 * u, y: 0.45, z: -0.28 }), '120,170,255', 0.25); line(g, s.P({ x: -0.7 + 1.4 * u, y: -0.15, z: 0.38 }), s.P({ x: -0.5 + 1.05 * u, y: 0.45, z: 0.28 }), '120,170,255', 0.25); }
        path3(s, [{ x: -0.7, y: -0.15, z: -0.38 }, { x: -0.95, y: -0.42, z: -0.38 }, { x: -1.12, y: -0.42, z: -0.38 }], C.c, 0.8, 2);
        path3(s, [{ x: -0.7, y: -0.15, z: 0.38 }, { x: -0.95, y: -0.42, z: 0.38 }, { x: -1.12, y: -0.42, z: 0.38 }], C.c, 0.8, 2);
        line(g, s.P({ x: -1.12, y: -0.42, z: -0.38 }), s.P({ x: -1.12, y: -0.42, z: 0.38 }), C.a, 0.95, 3);
        [[-0.4, -0.28], [0.45, -0.28], [-0.4, 0.28], [0.45, 0.28]].forEach(function (w) { ring3(s, w[0], 0.62, w[1], 0.1, 'z', '200,210,230', 0.8, 2, 20); });
        if (!reduce && this.b.length < 5 && Math.random() < 0.02) this.b.push({ x: (rand() - 0.5) * 0.8, z: (rand() - 0.5) * 0.4, y: -1.3, v: 0, s: 0.09 + rand() * 0.06, c: [C.a, C.v, C.g][this.b.length % 3] });
        var self = this; this.b.forEach(function (bx) { bx.v += dt * 2.2; bx.y = Math.min(0.32 - bx.s, bx.y + bx.v * dt); var h = bx.s, x = bx.x, y = bx.y, z = bx.z;
          poly3(s, [{ x: x - h, y: y - h, z: z + h }, { x: x + h, y: y - h, z: z + h }, { x: x + h, y: y + h, z: z + h }, { x: x - h, y: y + h, z: z + h }], 'rgba(' + bx.c + ',.35)', 'rgba(' + bx.c + ',.9)', 1.4);
          poly3(s, [{ x: x - h, y: y - h, z: z - h }, { x: x + h, y: y - h, z: z - h }, { x: x + h, y: y - h, z: z + h }, { x: x - h, y: y - h, z: z + h }], 'rgba(' + bx.c + ',.55)', 'rgba(' + bx.c + ',.9)', 1.2); });
        if (this.b.length >= 5 && Math.random() < 0.005) this.b = [];
        path3(s, T.concat([T[0]]), C.c, 0.95, 2);
      }
    },
    // Contractors: a house being framed, beam by beam.
    house: {
      tilt: 0.3, spin: 0.00022,
      init: function () {
        var w = 0.75, d = 0.55, h = 0.55, y0 = 0.6, yr = y0 - h, ry = yr - 0.45, P3 = function (x, y, z) { return { x: x, y: y, z: z }; };
        var f = [P3(-w, y0, -d), P3(w, y0, -d), P3(w, y0, d), P3(-w, y0, d)], t = [P3(-w, yr, -d), P3(w, yr, -d), P3(w, yr, d), P3(-w, yr, d)], r = [P3(-w, ry, 0), P3(w, ry, 0)];
        var E = []; for (var i = 0; i < 4; i++) E.push([f[i], f[(i + 1) % 4]]); for (i = 0; i < 4; i++) E.push([f[i], t[i]]); for (i = 0; i < 4; i++) E.push([t[i], t[(i + 1) % 4]]);
        E.push([t[0], r[0]], [t[3], r[0]], [t[1], r[1]], [t[2], r[1]], [r[0], r[1]]);
        for (i = 1; i < 4; i++) { var x = -w + i * w / 2; E.push([P3(x, y0, -d), P3(x, yr, -d)], [P3(x, y0, d), P3(x, yr, d)]); }
        E.push([P3(-0.15, y0, d), P3(-0.15, y0 - 0.38, d)], [P3(0.15, y0, d), P3(0.15, y0 - 0.38, d)], [P3(-0.15, y0 - 0.38, d), P3(0.15, y0 - 0.38, d)]);
        this.E = E;
      },
      draw: function (s) {
        var g = s.ctx, n = this.E.length, cyc = reduce ? 1 : (s.t % 9) / 9, shown = Math.min(n, Math.floor(cyc * 1.6 * n));
        for (var i = -6; i <= 6; i++) { path3(s, [{ x: i * 0.2, y: 0.6, z: -1.2 }, { x: i * 0.2, y: 0.6, z: 1.2 }], '120,170,255', 0.08); path3(s, [{ x: -1.2, y: 0.6, z: i * 0.2 }, { x: 1.2, y: 0.6, z: i * 0.2 }], '120,170,255', 0.08); }
        for (var k = 0; k < shown; k++) { var e = this.E[k], newest = k === shown - 1 && shown < n; line(g, s.P(e[0]), s.P(e[1]), newest ? C.a : k > n - 4 ? C.a : C.c, newest ? 1 : 0.8, newest ? 3 : 2); if (newest) { var q = s.P(e[1]); glow(g, q.x, q.y, 20, 'rgba(255,214,150,.9)', 'rgba(255,170,90,0)'); } }
        if (shown >= n) { var c = s.P({ x: 0, y: 0.1, z: 0 }); glow(g, c.x, c.y, 90, 'rgba(255,214,150,.22)', 'rgba(255,170,90,0)'); }
      }
    },
    // Restaurants: a plate under a cloche, with steam.
    dish: {
      tilt: 0.45, spin: 0.00015,
      draw: function (s) {
        var g = s.ctx, lift = reduce ? 0.4 : Math.max(0, Math.sin(s.t * 0.6)) * 0.55;
        ring3(s, 0, 0.45, 0, 1.0, 'y', '220,225,235', 0.7, 2, 64); ring3(s, 0, 0.43, 0, 0.72, 'y', '220,225,235', 0.35, 1.2, 64);
        for (var k = 0; k <= 6; k++) { var lat = k / 6 * 1.5708, r = Math.cos(lat) * 0.8, y = 0.4 - lift - Math.sin(lat) * 0.8; if (k < 6) ring3(s, 0, y, 0, r, 'y', C.a, 0.25 + k * 0.08, 1.4, 48); }
        for (var m = 0; m < 12; m++) { var a = m / 12 * 6.2832, pts = []; for (var j = 0; j <= 12; j++) { var la = j / 12 * 1.5708; pts.push({ x: Math.cos(a) * Math.cos(la) * 0.8, y: 0.4 - lift - Math.sin(la) * 0.8, z: Math.sin(a) * Math.cos(la) * 0.8 }); } path3(s, pts, C.a, 0.3, 1.1); }
        var kn = s.P({ x: 0, y: 0.4 - lift - 0.86, z: 0 }); dot(g, kn.x, kn.y, 6 * kn.f, C.a, 1);
        if (lift > 0.15) for (var q = 0; q < 3; q++) { var pts2 = []; for (var u = 0; u <= 20; u++) { var v = u / 20; pts2.push({ x: (q - 1) * 0.25 + Math.sin(v * 9 + s.t * 2 + q) * 0.06, y: 0.35 - v * (lift * 1.6), z: 0 }); } path3(s, pts2, '230,235,245', 0.35 * Math.min(1, lift * 3), 2); }
        var c = s.P({ x: 0, y: 0.38, z: 0 }); glow(g, c.x, c.y, 60 * lift + 10, 'rgba(255,214,150,.55)', 'rgba(255,170,90,0)');
      }
    },
    // AI news: a wire globe, stories arcing between cities.
    news: {
      tilt: 0.3, spin: 0.00018,
      init: function () { var n = 180, pts = []; for (var i = 0; i < n; i++) { var y = 1 - (i + 0.5) / n * 2, r = Math.sqrt(1 - y * y), a = i * 2.39996; pts.push({ x: Math.cos(a) * r, y: y, z: Math.sin(a) * r }); } this.p = pts; this.arcs = []; },
      draw: function (s, dt) {
        var g = s.ctx, self = this;
        this.p.forEach(function (p) { var q = s.P(p); dot(g, q.x, q.y, 1.4 * q.f, C.c, depthA(q.f) * 0.7); });
        if (!reduce && this.arcs.length < 7 && Math.random() < 0.05) this.arcs.push({ a: this.p[(rand() * this.p.length) | 0], b: this.p[(rand() * this.p.length) | 0], t: 0, c: [C.a, C.v, C.c][(rand() * 3) | 0] });
        for (var i = this.arcs.length - 1; i >= 0; i--) { var A = this.arcs[i]; A.t += dt * 0.4; if (A.t > 1.4) { this.arcs.splice(i, 1); continue; }
          var pts = []; for (var k = 0; k <= 30; k++) { var u = k / 30, x = A.a.x + (A.b.x - A.a.x) * u, y = A.a.y + (A.b.y - A.a.y) * u, z = A.a.z + (A.b.z - A.a.z) * u, L = Math.hypot(x, y, z) || 1, h = 1 + Math.sin(u * Math.PI) * 0.35; pts.push({ x: x / L * h, y: y / L * h, z: z / L * h }); }
          var upto = Math.min(30, Math.floor(Math.min(1, A.t) * 30)); path3(s, pts.slice(0, upto + 1), A.c, Math.max(0, 1 - Math.max(0, A.t - 1) * 2.5) * 0.85, 1.8);
          var hq = s.P(pts[upto]); if (A.t < 1) dot(g, hq.x, hq.y, 3.2, A.c, 1); }
        var c = s.P({ x: 0, y: 0, z: 0 }); glow(g, c.x, c.y, s.S * 1.05, 'rgba(45,212,255,.10)', 'rgba(45,212,255,0)');
      }
    },
    // Fractional CMO: a ship's helm. Someone senior steering, the heading held in gold.
    helm: {
      tilt: 0.22, spin: 0.00012,
      draw: function (s) {
        var g = s.ctx, t = reduce ? 0.4 : s.t, ang = Math.sin(t * 0.45) * 0.55, R = 0.72, z0 = 0.05;
        for (var k = 0; k < 36; k++) { var a = k / 36 * 6.2832, r1 = 1.32, r2 = k % 9 ? 1.27 : 1.18; line(g, s.P({ x: Math.cos(a) * r1, y: 0.95, z: Math.sin(a) * r1 }), s.P({ x: Math.cos(a) * r2, y: 0.95, z: Math.sin(a) * r2 }), '150,170,200', k % 9 ? 0.25 : 0.6, k % 9 ? 1 : 2); }
        ring3(s, 0, 0.95, 0, 1.32, 'y', '120,170,255', 0.3, 1.2, 72);
        var hd = -1.5708 + ang * 0.5, tip = s.P({ x: Math.cos(hd) * 1.1, y: 0.95, z: Math.sin(hd) * 1.1 }), base = s.P({ x: 0, y: 0.95, z: 0 });
        line(g, base, tip, C.a, 0.9, 2.4); glow(g, tip.x, tip.y, 18, 'rgba(255,214,150,.85)', 'rgba(255,170,90,0)');
        [-z0, z0].forEach(function (z, f) { var pts = []; for (var i = 0; i <= 72; i++) { var a = i / 72 * 6.2832; pts.push({ x: Math.cos(a) * R, y: -0.1 + Math.sin(a) * R, z: z }); } path3(s, pts, C.c, f ? 0.9 : 0.35, f ? 2.4 : 1.2);
          var p2 = []; for (var j = 0; j <= 72; j++) { var b = j / 72 * 6.2832; p2.push({ x: Math.cos(b) * R * 0.86, y: -0.1 + Math.sin(b) * R * 0.86, z: z }); } path3(s, p2, C.c, f ? 0.5 : 0.2, 1.2); });
        for (var sp = 0; sp < 8; sp++) { var a3 = sp / 8 * 6.2832 + ang, c3 = Math.cos(a3), s3 = Math.sin(a3), hot = sp === 0;
          var A = s.P({ x: c3 * 0.14, y: -0.1 + s3 * 0.14, z: z0 }), B = s.P({ x: c3 * 1.0, y: -0.1 + s3 * 1.0, z: z0 });
          line(g, A, B, hot ? C.a : C.c, hot ? 0.95 : 0.7, hot ? 3 : 2); dot(g, B.x, B.y, (hot ? 6 : 4.5) * B.f, hot ? C.a : C.v, 0.95); }
        ring3(s, 0, -0.1, z0, 0.14, 'z', C.a, 0.95, 2.4, 28); var h = s.P({ x: 0, y: -0.1, z: z0 }); glow(g, h.x, h.y, 34, 'rgba(255,214,150,.85)', 'rgba(160,107,255,0)');
        line(g, s.P({ x: 0, y: -0.1, z: -0.05 }), s.P({ x: 0, y: 0.95, z: -0.05 }), '150,170,200', 0.35, 3);
      }
    },
    // Custom AI software: a processor, with data flowing in along its traces.
    chip: {
      tilt: 0.55, spin: 0.00016,
      init: function () {
        var tr = [];
        for (var side = 0; side < 4; side++) for (var k = 0; k < 5; k++) {
          var u = -0.32 + k * 0.16, L = 0.75 + ((k * 7 + side * 3) % 5) * 0.12, bend = ((k + side) % 2 ? 1 : -1) * (0.12 + (k % 3) * 0.08);
          var pts = [[0.44, u], [0.62, u], [0.62 + (L - 0.62) * 0.5, u + bend], [L, u + bend]].map(function (p) {
            return side === 0 ? { x: p[0], y: 0, z: p[1] } : side === 1 ? { x: -p[0], y: 0, z: -p[1] } : side === 2 ? { x: p[1], y: 0, z: p[0] } : { x: -p[1], y: 0, z: -p[0] }; });
          tr.push({ p: pts, o: (k * 0.21 + side * 0.37) % 1 }); }
        this.tr = tr;
      },
      draw: function (s) {
        var g = s.ctx, t = reduce ? 0.5 : s.t;
        this.tr.forEach(function (tr, i) {
          path3(s, tr.p, i % 3 ? C.c : C.v, 0.45, 1.4); var e = s.P(tr.p[3]); dot(g, e.x, e.y, 3.2 * e.f, i % 3 ? C.c : C.v, depthA(e.f));
          var u = 1 - ((t * 0.35 + tr.o) % 1), seg = Math.min(2, (u * 3) | 0), f = u * 3 - seg, a = tr.p[seg], b = tr.p[seg + 1];
          var q = s.P({ x: a.x + (b.x - a.x) * f, y: 0, z: a.z + (b.z - a.z) * f }); dot(g, q.x, q.y, 3 * q.f, C.a, 0.95);
        });
        var H = 0.44, top = -0.1, sq = function (r, y) { return [{ x: -r, y: y, z: -r }, { x: r, y: y, z: -r }, { x: r, y: y, z: r }, { x: -r, y: y, z: r }]; };
        var Bt = sq(H, 0), Tp = sq(H, top); for (var i = 0; i < 4; i++) line(g, s.P(Bt[i]), s.P(Tp[i]), C.c, 0.6, 1.4);
        poly3(s, Tp, 'rgba(14,22,36,.95)', 'rgba(45,212,255,.9)', 2);
        poly3(s, sq(0.24, top - 0.005), 'rgba(160,107,255,.18)', 'rgba(160,107,255,.85)', 1.6);
        for (var k = 0; k < 5; k++) { var v = -0.16 + k * 0.08; line(g, s.P({ x: -0.2, y: top - 0.006, z: v }), s.P({ x: 0.2, y: top - 0.006, z: v }), '160,107,255', 0.25, 1); }
        var c = s.P({ x: 0, y: top, z: 0 }); glow(g, c.x, c.y, 40 + (reduce ? 0 : Math.sin(t * 2) * 6), 'rgba(255,214,150,.55)', 'rgba(160,107,255,0)');
        g.font = '700 13px ui-monospace, SFMono-Regular, Menlo, monospace'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = 'rgba(255,224,170,.95)'; g.fillText('AI', c.x, c.y);
      }
    },
    // Pricing: three stacks of coins, every price on the table; one coin keeps landing.
    coins: {
      tilt: 0.32, spin: 0.0002,
      init: function () { this.drop = -1.4; },
      draw: function (s, dt) {
        var g = s.ctx, stacks = [[-0.68, 3, C.c], [0, 6, C.v], [0.68, 9, C.a]], r = 0.24, h = 0.075, base = 0.7;
        function coin(x, y, col, al) { ring3(s, x, y, 0, r, 'y', col, (0.35 * al).toFixed(2), 1.2, 32); ring3(s, x, y - h, 0, r, 'y', col, (0.9 * al).toFixed(2), 1.8, 32);
          for (var k = 0; k < 8; k++) { var a = k / 8 * 6.2832; line(g, s.P({ x: x + Math.cos(a) * r, y: y, z: Math.sin(a) * r }), s.P({ x: x + Math.cos(a) * r, y: y - h, z: Math.sin(a) * r }), col, 0.3 * al, 1); } }
        stacks.forEach(function (st, i) { for (var n = 0; n < st[1]; n++) coin(st[0], base - n * h * 1.05, st[2], 0.55 + 0.45 * (n + 1) / st[1]);
          var tp = s.P({ x: st[0], y: base - st[1] * h * 1.05, z: 0 }); if (i === 2) glow(g, tp.x, tp.y, 30, 'rgba(255,214,150,.75)', 'rgba(255,170,90,0)');
          g.font = '700 12px ui-monospace, SFMono-Regular, Menlo, monospace'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = 'rgba(' + st[2] + ',.95)'; g.fillText('$', tp.x, tp.y - 2); });
        var land = base - 9 * h * 1.05 - 0.02;
        if (!reduce) { this.drop += dt * 0.9; if (this.drop > land) this.drop = -1.4; }
        var y = reduce ? -0.9 : this.drop; if (y < land - 0.02) coin(0.68, y, C.a, 0.95);
        ring3(s, 0, base + 0.02, 0, 1.15, 'y', '120,170,255', 0.18, 1, 64);
      }
    }
  };
  for (var mk in MORE) SCENES[mk] = MORE[mk];

  // ----------------------------------------------------------------- mount
  // The right column already holds a visual: a 2D engine diagram (replaced by the 3D version, engines included)
  // or an "at a glance" card (kept, as frosted glass in front of the scene).
  function mountViz(viz) {
    var r = viz.getBoundingClientRect(); if (r.width < 220 || r.height < 160) return;
    var name = pick(), scene = SCENES[name] || SCENES.network, glance = viz.querySelector('.glance'), cv = document.createElement('canvas');
    cv.className = 'hero3d hero3d-' + name; cv.setAttribute('aria-hidden', 'true');
    if (glance) {
      var host = viz.parentElement, hr = host.getBoundingClientRect();
      if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
      // the object rises above the card; the card drops a little and becomes glass in front of it
      var drop = Math.round(r.height * 0.36), w = Math.min(r.width * 1.35, document.documentElement.clientWidth - r.left + 30), H = Math.max(r.height * 1.25, 420);
      cv.style.cssText = 'position:absolute;pointer-events:none;z-index:0;width:' + Math.round(w) + 'px;height:' + Math.round(H) + 'px;left:' +
        Math.round(r.left - hr.left + r.width / 2 - w / 2) + 'px;top:' + Math.round(r.top - hr.top - H * 0.42) + 'px';
      viz.style.transform = 'translateY(' + drop + 'px)';
      host.insertBefore(cv, host.firstChild);
      viz.style.zIndex = '1'; if (getComputedStyle(viz).position === 'static') viz.style.position = 'relative';
      viz.style.background = 'linear-gradient(160deg,rgba(14,20,34,.58),rgba(8,12,22,.5))';
      [].forEach.call(glance.querySelectorAll('div'), function (d) { d.style.background = 'rgba(10,15,26,.62)'; });
    } else {
      var svg = viz.querySelector('.constel'); if (svg) svg.style.opacity = '0';
      if (getComputedStyle(viz).position === 'static') viz.style.position = 'relative';
      var pad = 0.14, w2 = r.width * (1 + pad * 2), H2 = Math.max(r.height * (1 + pad * 2), w2 * 0.85);
      cv.style.cssText = 'position:absolute;pointer-events:none;z-index:0;width:' + Math.round(w2) + 'px;height:' + Math.round(H2) + 'px;left:' + Math.round(-r.width * pad) + 'px;top:' + Math.round((r.height - H2) / 2) + 'px';
      viz.appendChild(cv);
      var base = scene.draw, label = CENTRE[name] || 'YOUR BRAND';
      scene = Object.create(scene); scene.draw = function (st, dt) { base.call(this, st, dt); engines(st, label); };
    }
    Stage(cv, scene);
  }
  // Phones: the scene sits behind the opening headline, where it is seen straight away, in its own
  // stacking layer under the words, faded on the side where the text starts so every line stays readable.
  function mountMobile(h) {
    var vw = document.documentElement.clientWidth, name = pick(), scene = SCENES[name] || SCENES.network;
    var host = h.el, cv = document.createElement('canvas');
    cv.className = 'hero3d hero3d-' + name + ' hero3d-m'; cv.setAttribute('aria-hidden', 'true');
    if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
    host.style.isolation = 'isolate';
    var hr = host.getBoundingClientRect(), css = 'position:absolute;pointer-events:none;z-index:-1;';
    {
      if (h.viz) { var svg = h.viz.querySelector('.constel'); if (svg) svg.style.opacity = '0.25'; }
      var t = h.h1.getBoundingClientRect(), H2 = Math.round(Math.min(Math.max(vw * 1.05, 340), 480)), top = Math.max(0, t.top - hr.top - H2 * 0.3);
      cv.style.cssText = css + 'left:' + Math.round(-hr.left) + 'px;width:' + vw + 'px;height:' + H2 + 'px;top:' + Math.round(top) + 'px;opacity:.58;' +
        '-webkit-mask-image:linear-gradient(90deg,rgba(0,0,0,.35),#000 55%);mask-image:linear-gradient(90deg,rgba(0,0,0,.35),#000 55%)';
      cv._cx = 0.68; cv._cy = 0.42; cv._s = 0.4;
      if (CENTRE[name] && h.viz) { var base = scene.draw, label = CENTRE[name]; scene = Object.create(scene); scene.draw = function (st, dt) { base.call(this, st, dt); engines(st, label, 1.2); }; }
    }
    host.insertBefore(cv, host.firstChild);
    Stage(cv, scene);
  }
  function mount() {
    var h = findHero(); if (!h) return;
    if (MOBILE) return mountMobile(h);
    if (h.viz) return mountViz(h.viz);
    var el = h.el, box = el.getBoundingClientRect();
    if (box.height > 900) { // a whole-page container: use only the opening band around the h1
      var hr0 = h.h1.getBoundingClientRect(), top0 = Math.max(box.top, hr0.top - 90);
      box = { left: box.left, right: box.right, top: top0, bottom: top0 + 560, height: 560, width: box.width };
    }
    var cb = contentBox(el, box.top, box.top + box.height);
    var vw = document.documentElement.clientWidth, rtl = getComputedStyle(el).direction === 'rtl';
    // free space is measured against the viewport, so a narrow centred header still counts
    var gap = 32, edge = 40, free = rtl ? cb.L - edge - gap : vw - edge - cb.R - gap;
    if (free < 270 || box.height < 170 || cb.R === -Infinity) return;
    // a centred, symmetric layout (text in the middle) has no single empty side: leave it
    if (!rtl && cb.L - box.left > free * 0.8 && cb.L > vw * 0.28) return;
    // host = the first box from the hero up that spans the free area
    var host = el;
    while (host.parentElement && host !== document.body) {
      var hr = host.getBoundingClientRect();
      if (rtl ? hr.left <= edge : hr.right >= vw - edge) break;
      host = host.parentElement;
    }
    var hr2 = host.getBoundingClientRect();
    if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
    var name = pick(), scene = SCENES[name] || SCENES.network;
    var short = box.height < 380, H = short ? box.height : Math.max(box.height, 420), w = Math.min(free, Math.max(short ? box.height * 1.9 : 400, H * 1.1), 720);
    if (!short) H = Math.min(H, Math.max(box.height, w * 0.95));
    var left = rtl ? (cb.L - gap - w) / 2 + edge / 2 : cb.R + gap + (free - w) / 2;
    var cv = document.createElement('canvas');
    cv.className = 'hero3d hero3d-' + name; cv.setAttribute('aria-hidden', 'true');
    cv.style.cssText = 'position:absolute;pointer-events:none;z-index:0;width:' + Math.round(w) + 'px;height:' + Math.round(H) + 'px;' +
      'left:' + Math.round(left - hr2.left) + 'px;top:' + Math.round(box.top - hr2.top + (box.height - H) / 2) + 'px';
    host.appendChild(cv);
    Stage(cv, scene);
  }
  // Start as soon as the layout is settled. Do not wait for the window load event: a slow
  // third-party file (analytics, a font, an image far down the page) can hold it back for many seconds.
  var done = false;
  function go() { if (done) return; done = true; try { mount(); } catch (e) { /* decoration only */ } }
  function soon() { setTimeout(go, 120); }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(soon, soon);
  if (document.readyState !== 'loading') soon(); else document.addEventListener('DOMContentLoaded', soon);
  setTimeout(go, 1500);
})();
