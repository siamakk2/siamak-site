/* Pattern Studio — 3D atelier hero: a couture dress form that turns slowly, re-colours to the chosen fabric,
   switches to a men's form with the Woman/Man toggle, and follows the pointer. Degrades silently without WebGL. */
(function () {
  var hero = document.querySelector('.ps-hero'); if (!hero) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var test = document.createElement('canvas'); var gl = test.getContext('webgl') || test.getContext('experimental-webgl'); if (!gl) return;

  var wrap = document.createElement('div'); wrap.className = 'ps-3d'; hero.appendChild(wrap);
  var s = document.createElement('script'); s.src = '/vendor/three.min.js'; s.async = true;
  s.onload = boot; s.onerror = function(){ wrap.remove(); }; document.head.appendChild(s);

  function profile(male) {
    // (radius, height) pairs from neck to hem, in metres — a stylised dress form
    return male
      ? [[0.055,1.62],[0.075,1.58],[0.20,1.50],[0.215,1.44],[0.20,1.32],[0.17,1.18],[0.165,1.08],[0.18,0.98],[0.185,0.90],[0.17,0.80],[0.12,0.74],[0.0,0.72]]
      : [[0.05,1.60],[0.07,1.56],[0.17,1.50],[0.185,1.42],[0.19,1.34],[0.145,1.18],[0.14,1.10],[0.185,0.98],[0.195,0.90],[0.17,0.80],[0.11,0.74],[0.0,0.72]];
  }
  function boot() {
    var T = window.THREE; if (!T) return;
    var W = wrap.clientWidth, H = wrap.clientHeight;
    var renderer = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); renderer.setSize(W, H);
    renderer.outputEncoding = T.sRGBEncoding; renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = 0.95;
    wrap.appendChild(renderer.domElement);
    var scene = new T.Scene();
    var cam = new T.PerspectiveCamera(28, W / H, 0.1, 50); cam.position.set(0, 1.05, 3.5); cam.lookAt(0, 0.98, 0);

    // lights: warm key, magenta + violet rims, soft fill
    scene.add(new T.HemisphereLight(0xffffff, 0x1a1424, 0.55));
    var key = new T.SpotLight(0xfff1dc, 1.1, 20, 0.6, 0.6); key.position.set(2.2, 3.4, 2.6); scene.add(key);
    var rimA = new T.PointLight(0xff2d87, 1.4, 12); rimA.position.set(-2.4, 1.8, -1.2); scene.add(rimA);
    var rimB = new T.PointLight(0x9b6bff, 1.6, 12); rimB.position.set(2.4, 0.8, -2.0); scene.add(rimB);

    var group = new T.Group(); scene.add(group);
    var mat = new T.MeshPhysicalMaterial({ color: 0x6a1b9a, roughness: 0.55, metalness: 0.05, clearcoat: 0.25, clearcoatRoughness: 0.5, sheen: new T.Color(0x66606c) });
    var form = null;
    function build(male) {
      if (form) { group.remove(form); form.geometry.dispose(); }
      var pts = profile(male).map(function (p) { return new T.Vector2(p[0], p[1]); });
      var curve = new T.SplineCurve(pts); var smooth = curve.getPoints(80);
      var geo = new T.LatheGeometry(smooth, 96); geo.computeVertexNormals();
      form = new T.Mesh(geo, mat); group.add(form);
    }
    build(false);
    // stand: brass pole + tripod base, and a gilt hairline ring at the waist
    var brass = new T.MeshStandardMaterial({ color: 0xe2c275, roughness: 0.35, metalness: 0.9 });
    var pole = new T.Mesh(new T.CylinderGeometry(0.012, 0.012, 0.72, 24), brass); pole.position.y = 0.36; group.add(pole);
    var base = new T.Mesh(new T.CylinderGeometry(0.34, 0.38, 0.03, 48), new T.MeshStandardMaterial({ color: 0x1a1620, roughness: 0.4, metalness: 0.6 })); base.position.y = 0.015; group.add(base);
    var ring = new T.Mesh(new T.TorusGeometry(0.205, 0.004, 12, 96), brass); ring.rotation.x = Math.PI / 2; ring.position.y = 1.18; group.add(ring);
    var neck = new T.Mesh(new T.SphereGeometry(0.045, 24, 16), brass); neck.position.y = 1.64; group.add(neck);
    // floor glow disc
    var glow = new T.Mesh(new T.CircleGeometry(0.9, 64), new T.MeshBasicMaterial({ color: 0x9b6bff, transparent: true, opacity: 0.08 })); glow.rotation.x = -Math.PI / 2; glow.position.y = 0.001; scene.add(glow);

    // interaction
    var targetX = 0, targetY = 0, px = 0, py = 0;
    window.addEventListener('pointermove', function (e) { var r = hero.getBoundingClientRect(); px = ((e.clientX - r.left) / r.width - 0.5); py = ((e.clientY - r.top) / r.height - 0.5); }, { passive: true });
    var t0 = performance.now(), running = true;
    function tick(now) {
      if (!running) return;
      var t = (now - t0) / 1000;
      targetX += ((reduce ? 0 : t * 0.35) + px * 0.9 - targetX) * 0.06;
      targetY += (py * 0.25 - targetY) * 0.06;
      group.rotation.y = targetX; group.rotation.x = targetY * 0.4; group.position.y = reduce ? 0 : Math.sin(t * 0.8) * 0.01;
      renderer.render(scene, cam); requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    // pause when the hero is off-screen (compact header) or tab hidden
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { var v = en[0].isIntersecting && !document.body.classList.contains('ps-compact'); if (v && !running) { running = true; requestAnimationFrame(tick); } else if (!v) running = false; }, { threshold: 0.05 }).observe(wrap);
    document.addEventListener('visibilitychange', function () { if (document.hidden) running = false; else if (!running) { running = true; requestAnimationFrame(tick); } });
    window.addEventListener('resize', function () { W = wrap.clientWidth; H = wrap.clientHeight; if (!W || !H) return; renderer.setSize(W, H); cam.aspect = W / H; cam.updateProjectionMatrix(); });

    // public hooks: fabric colour + gender
    window.PS3D = {
      setFabric: function (f) { if (!f) return; var hex = (f.hex || f.color || '#6a1b9a'); try { mat.color.set(hex); } catch (e) {}
        var pat = f.pattern || 'solid'; mat.metalness = pat === 'foil' || pat === 'sequin' ? 0.6 : 0.05; mat.roughness = pat === 'velvet' ? 0.85 : pat === 'foil' ? 0.2 : 0.55; mat.sheen = new T.Color(pat === 'velvet' ? 0xb0a8bc : 0x66606c); mat.needsUpdate = true; },
      setGender: function (g) { build(g === 'm'); }
    };
    // follow the studio
    var _pick = window.pickFabric; if (typeof _pick === 'function') window.pickFabric = function (id) { _pick.apply(this, arguments); try { if (window.selectedFabric) PS3D.setFabric(window.selectedFabric); else if (typeof fabById === 'function') PS3D.setFabric(fabById(id)); } catch (e) {} };
    var _sg = window.setSketchGender; if (typeof _sg === 'function') window.setSketchGender = function (g) { _sg.apply(this, arguments); try { PS3D.setGender(typeof sketchGenderFor === 'function' ? sketchGenderFor(S.g) : g); } catch (e) {} };
    var _st = window.showTab; if (typeof _st === 'function') window.showTab = function (btn, pg) { _st.apply(this, arguments); running = pg === 'pg1' && !document.hidden; if (running) requestAnimationFrame(tick); try { if (typeof sketchGenderFor === 'function' && S.g) PS3D.setGender(sketchGenderFor(S.g)); } catch (e) {} };
  }
})();

/* 3D tilt on garment & design cards (pointer-driven, no library) */
(function () {
  if (window.matchMedia && window.matchMedia('(hover: none)').matches) return;
  document.addEventListener('pointermove', function (e) {
    var c = e.target.closest && e.target.closest('#bgrid .gc, #designGrid .dcard, .st-garment'); if (!c) return;
    var r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    c.style.transform = 'perspective(700px) rotateX(' + (-y * 10) + 'deg) rotateY(' + (x * 12) + 'deg) translateY(-4px)';
    c.style.setProperty('--mx', (x * 100 + 50) + '%'); c.style.setProperty('--my', (y * 100 + 50) + '%');
  }, { passive: true });
  document.addEventListener('pointerout', function (e) { var c = e.target.closest && e.target.closest('#bgrid .gc, #designGrid .dcard, .st-garment'); if (c && !c.contains(e.relatedTarget)) c.style.transform = ''; }, { passive: true });
})();
