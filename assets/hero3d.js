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
  var C = { c: '45,212,255', v: '160,107,255', a: '255,180,84', g: '110,231,183', r: '255,107,107' };

  // ------------------------------------------------------------- which scene
  var path = location.pathname.replace(/^\/(es|fa|hy)(?=\/|$)/, '').replace(/\/+$/, '') || '/';
  function pick() {
    var forced = document.documentElement.getAttribute('data-hero3d');
    if (forced) return forced;
    var p = path, slug = p.split('/').pop();
    var rules = [
      ['docs', /glossary|^\/faq|^\/academy|training|ai-marketing-news/],
      ['map', /los-angeles|napa-valley|^\/local|^\/listings|winer|hotel|(^|-)inns?(-|$)|restaurant|tasting/],
      ['pulse', /dental|medical|cosmetic|doctor|patient|clinic/],
      ['shield', /privacy|terms|llm-info|law-firm|super-intelligence|executive-order|security/],
      ['scan', /audit|analyze|pagespeed|is-my-marketing|invisible|contradiction|checklist|why-doesnt|show-up|doesnt-show/],
      ['voice', /voice|\/ai-advisor$|^\/ask|online-consulting|contact/],
      ['agents', /agent|automation|ai-for-|ai-advisory|ai-consult|commerce|fractional/],
      ['dna', /dna|brand-creation|about|portfolio|textile|bluemoon|blue-moon/],
      ['growth', /growth|budget|spend|how-much|price|ecommerce|internet-marketing|social-media|ai-marketing$|services|ads|leads|sales|customers|stalled|agency/],
      ['network', /llm|llmo|ai-visibility|ai-seo|cited|authority|seo-vs|answers|chatgpt|schema|search|model|frontier|announcement/],
      ['docs', /long-view|glossary|faq|news|academy|training|framework|myth|strategy/]
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
    // a photo backdrop (CSS background image on the section, an ancestor or a child) means it is not empty
    var chk = [el, el.parentElement].concat([].slice.call(el.querySelectorAll('*'), 0, 250));
    for (var b = 0; b < chk.length; b++) { if (!chk[b]) continue; var bi = getComputedStyle(chk[b]).backgroundImage, bb = getComputedStyle(chk[b], '::before').backgroundImage;
      if (/url\(/.test(bi) || /url\(/.test(bb)) return null; }
    var imgs = el.querySelectorAll('img,svg,picture');
    for (var i = 0; i < imgs.length; i++) { var r = imgs[i].getBoundingClientRect(); if (r.width > 160 && r.height > 120) return null; }
    return { el: el, h1: h1 };
  }
  function contentBox(el) {
    // the horizontal extent actually covered by text and controls (not the width of their boxes)
    var L = Infinity, R = -Infinity, n = 0;
    function add(r) { if (r.width < 2 || r.height < 2) return; if (r.left < L) L = r.left; if (r.right > R) R = r.right; }
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
      var r = cv.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 1.75);
      W = r.width; H = r.height; cv.width = Math.round(W * d); cv.height = Math.round(H * d); ctx.setTransform(d, 0, 0, d, 0, 0);
      ox = W * 0.5; oy = H * 0.5; S = Math.min(W, H) * 0.36;
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
      var dt = Math.min(50, now - (last || now)); last = now; if (!reduce) { T += dt / 1000; rot += dt * spin; }
      tx += (ax - tx) * 0.05; ty += (ay - ty) * 0.05;
      ctx.clearRect(0, 0, W, H); scene.draw(api, dt / 1000);
      if (run && !reduce) requestAnimationFrame(frame);
    }
    function start() { if (!run) { run = true; last = 0; requestAnimationFrame(frame); } }
    function stop() { run = false; }
    size(); if (scene.init) scene.init(api); frame(performance.now());
    addEventListener('resize', function () { size(); if (!run) frame(performance.now()); });
    if (!reduce) {
      if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { e[0].isIntersecting && !document.hidden ? start() : stop(); }).observe(cv); else start();
      document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
      addEventListener('pointermove', function (e) { ay = (e.clientX / innerWidth - 0.5) * 0.5; ax = (scene.tilt == null ? 0.2 : scene.tilt) + (e.clientY / innerHeight - 0.5) * 0.3; }, { passive: true });
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

  // ----------------------------------------------------------------- mount
  function mount() {
    if (innerWidth < 960 || touch && innerWidth < 1100) return;
    var h = findHero(); if (!h) return;
    var el = h.el, box = el.getBoundingClientRect(), cb = contentBox(el);
    var vw = document.documentElement.clientWidth, rtl = getComputedStyle(el).direction === 'rtl';
    // free space is measured against the viewport, so a narrow centred header still counts
    var gap = 32, edge = 40, free = rtl ? cb.L - edge - gap : vw - edge - cb.R - gap;
    if (free < 340 || box.height < 170 || cb.R === -Infinity) return;
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
    addEventListener('resize', function () { if (innerWidth < 960) cv.style.display = 'none'; else cv.style.display = ''; });
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
