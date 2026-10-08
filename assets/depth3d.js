/* depth3d.js — three 3D layers for the home page, no library.
 *
 * 1. Hero: a slowly turning network of nodes (topics, profiles, sources)
 *    wired to one bright core (your brand), with light travelling inward.
 *    Real perspective projection on a 2D canvas: ~4 KB instead of a 700 KB
 *    3D engine. The mouse tilts it.
 * 2. Scroll: the S.C.A.L.E. stages assemble in depth, one by one, as the
 *    section scrolls into view.
 * 3. Tilt: cards lean toward the pointer, with a soft light glare.
 *
 * Rules learned the hard way on this site:
 *  - nothing is position:fixed and nothing uses CSS filters (iOS Safari
 *    flashed blank tiles with both);
 *  - the canvas is decoration: every word stays in the HTML;
 *  - it stops drawing when off-screen or the tab is hidden, draws one still
 *    frame for prefers-reduced-motion, and uses fewer nodes on phones.
 */
(function () {
  'use strict';
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var touch = window.matchMedia && matchMedia('(hover: none)').matches;

  // ------------------------------------------------------------ 1. network
  var cv = document.querySelector('canvas.net3d');
  if (cv && cv.getContext) {
    var ctx = cv.getContext('2d');
    var N = touch || innerWidth < 760 ? 46 : 92;
    var nodes = [], edges = [], pulses = [];
    var rand = (function (s) { return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; })(42);
    for (var i = 0; i < N; i++) {
      // points on a slightly flattened shell, so the core sits in open space
      var u = rand() * 2 - 1, t = rand() * Math.PI * 2, r = 0.55 + rand() * 0.45;
      var s = Math.sqrt(1 - u * u);
      nodes.push({ x: s * Math.cos(t) * r * 1.35, y: u * r * 0.85, z: s * Math.sin(t) * r * 1.35,
        hue: rand() < 0.18 ? 'a' : (rand() < 0.5 ? 'c' : 'v'), size: 1 + rand() * 1.6 });
    }
    for (var a = 0; a < N; a++) {
      var best = [];
      for (var b = 0; b < N; b++) if (a !== b) {
        var dx = nodes[a].x - nodes[b].x, dy = nodes[a].y - nodes[b].y, dz = nodes[a].z - nodes[b].z;
        best.push([dx * dx + dy * dy + dz * dz, b]);
      }
      best.sort(function (p, q) { return p[0] - q[0]; });
      for (var k = 0; k < 2; k++) if (a < best[k][1]) edges.push([a, best[k][1]]);
    }
    // spokes: a share of nodes wired straight to the core
    var spokes = [];
    for (var j = 0; j < N; j += 4) spokes.push(j);

    var W = 0, H = 0, DPR = 1, rotY = 0, tiltX = 0.18, tiltY = 0, aimX = 0.18, aimY = 0, running = false, last = 0;
    var COL = { c: '45,212,255', v: '160,107,255', a: '255,180,84' };

    var anchor = document.querySelector('.hero .console');
    var AX = null, AY = null, AS = null;
    function size() {
      var r = cv.getBoundingClientRect();
      // Centre the network on the answer console, so it reads as the web of
      // sources the answer is drawn from.
      if (anchor) {
        var a = anchor.getBoundingClientRect();
        AX = a.left - r.left + a.width / 2; AY = a.top - r.top + a.height / 2;
        AS = Math.max(a.width, a.height) * (touch || innerWidth < 760 ? 0.62 : 0.56);
      }
      DPR = Math.min(window.devicePixelRatio || 1, touch ? 1.5 : 2);
      W = r.width; H = r.height;
      cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    function project(p) {
      // rotate around Y (spin) then X (tilt), then perspective
      var cy = Math.cos(rotY + tiltY), sy = Math.sin(rotY + tiltY);
      var x = p.x * cy - p.z * sy, z = p.x * sy + p.z * cy;
      var cx = Math.cos(tiltX), sx = Math.sin(tiltX);
      var y = p.y * cx - z * sx; z = p.y * sx + z * cx;
      var scale = AS || Math.min(W * 0.5, H) * 0.44, f = 3.2 / (3.2 + z);
      var ox = AX != null ? AX : W * 0.7, oy = AY != null ? AY : H * 0.45;
      return { x: ox + x * scale * f, y: oy + y * scale * f, f: f, z: z };
    }
    var CORE = { x: 0, y: 0, z: 0 };
    function frame(now) {
      var dt = Math.min(50, now - (last || now)); last = now;
      if (!reduce) rotY += dt * 0.00012;
      tiltX += (aimX - tiltX) * 0.05; tiltY += (aimY - tiltY) * 0.05;
      ctx.clearRect(0, 0, W, H);
      var P = nodes.map(project), C = project(CORE);
      ctx.lineWidth = 1;
      for (var e = 0; e < edges.length; e++) {
        var p = P[edges[e][0]], q = P[edges[e][1]];
        var al = Math.max(0.03, Math.min(0.32, (p.f + q.f - 1.2) * 0.35));
        ctx.strokeStyle = 'rgba(120,170,255,' + al.toFixed(3) + ')';
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
      }
      for (var s2 = 0; s2 < spokes.length; s2++) {
        var n = P[spokes[s2]];
        var g = ctx.createLinearGradient(n.x, n.y, C.x, C.y);
        g.addColorStop(0, 'rgba(45,212,255,0.02)'); g.addColorStop(1, 'rgba(160,107,255,0.30)');
        ctx.strokeStyle = g; ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(C.x, C.y); ctx.stroke();
      }
      // pulses travelling inward along spokes: citations arriving
      if (!reduce && Math.random() < 0.06 && pulses.length < 14) pulses.push({ s: spokes[(Math.random() * spokes.length) | 0], t: 0 });
      for (var u2 = pulses.length - 1; u2 >= 0; u2--) {
        var pu = pulses[u2]; pu.t += dt * 0.0009;
        if (pu.t >= 1) { pulses.splice(u2, 1); continue; }
        var from = P[pu.s], px = from.x + (C.x - from.x) * pu.t, py = from.y + (C.y - from.y) * pu.t;
        ctx.fillStyle = 'rgba(255,200,120,' + (0.9 * Math.sin(pu.t * Math.PI)).toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(px, py, 2.2, 0, 6.283); ctx.fill();
      }
      // nodes, far to near
      var order = P.map(function (p, i2) { return i2; }).sort(function (i1, i3) { return P[i3].z - P[i1].z; });
      for (var o = 0; o < order.length; o++) {
        var idx = order[o], pp = P[idx], nd = nodes[idx];
        var rad = nd.size * pp.f * 1.3, alpha = Math.max(0.15, Math.min(1, (pp.f - 0.62) * 1.6));
        ctx.fillStyle = 'rgba(' + COL[nd.hue] + ',' + (alpha * 0.18).toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(pp.x, pp.y, rad * 3.2, 0, 6.283); ctx.fill();
        ctx.fillStyle = 'rgba(' + COL[nd.hue] + ',' + alpha.toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(pp.x, pp.y, rad, 0, 6.283); ctx.fill();
      }
      // the core: your brand
      var pulse = reduce ? 1 : 1 + Math.sin(now * 0.002) * 0.08;
      var rg = ctx.createRadialGradient(C.x, C.y, 0, C.x, C.y, 46 * pulse);
      rg.addColorStop(0, 'rgba(255,214,150,0.95)'); rg.addColorStop(0.25, 'rgba(255,170,90,0.55)');
      rg.addColorStop(1, 'rgba(160,107,255,0)');
      ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(C.x, C.y, 46 * pulse, 0, 6.283); ctx.fill();
      if (running && !reduce) requestAnimationFrame(frame);
    }
    function start() { if (!running) { running = true; last = 0; requestAnimationFrame(frame); } }
    function stop() { running = false; }
    size(); frame(performance.now());
    addEventListener('resize', function () { size(); if (!running) frame(performance.now()); });
    if (!reduce) {
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (en) { en[0].isIntersecting && !document.hidden ? start() : stop(); }).observe(cv);
      } else start();
      document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
      if (!touch) addEventListener('pointermove', function (e) {
        aimY = (e.clientX / innerWidth - 0.5) * 0.6;
        aimX = 0.18 + (e.clientY / innerHeight - 0.5) * 0.35;
      }, { passive: true });
    }
  }

  // ------------------------------------------------- 2. scroll assembly
  var rail = document.querySelector('.scale-rail');
  if (rail && !reduce) {
    var steps = [].slice.call(rail.querySelectorAll('.scale-step'));
    rail.classList.add('d3-rail');
    var ticking = false;
    function place() {
      ticking = false;
      var r = rail.getBoundingClientRect(), vh = innerHeight;
      // 0 when the rail's top enters the bottom of the screen, 1 at mid-screen
      var prog = Math.max(0, Math.min(1, (vh - r.top) / (vh * 0.62)));
      steps.forEach(function (el, i) {
        var local = Math.max(0, Math.min(1, prog * 1.6 - i * 0.15));
        var e2 = 1 - Math.pow(1 - local, 3);
        el.style.transform = 'translateZ(' + (-260 * (1 - e2)).toFixed(1) + 'px) rotateX(' + (28 * (1 - e2)).toFixed(2) +
          'deg) translateY(' + (60 * (1 - e2)).toFixed(1) + 'px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))';
        el.style.opacity = (0.15 + 0.85 * e2).toFixed(3);
      });
    }
    addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(place); } }, { passive: true });
    addEventListener('resize', place);
    place();
  }

  // ------------------------------------------------------- 3. card tilt
  if (!touch && !reduce) {
    var sel = '.scale-step, .card, .svc-card, .work-card, .ind-card, .tilt';
    document.addEventListener('pointermove', function (e) {
      var el = e.target.closest && e.target.closest(sel);
      if (!el) return;
      var r = el.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      el.classList.add('d3-tilt');
      el.style.setProperty('--rx', (-py * 9).toFixed(2) + 'deg');
      el.style.setProperty('--ry', (px * 11).toFixed(2) + 'deg');
      el.style.setProperty('--gx', ((px + 0.5) * 100).toFixed(1) + '%');
      el.style.setProperty('--gy', ((py + 0.5) * 100).toFixed(1) + '%');
      if (el._d3out) return;
      el._d3out = true;
      el.addEventListener('pointerleave', function () {
        el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg');
      });
    }, { passive: true });
  }
})();
