/* ============================================================================
   sk-agent.js — Siamak Kalhor Consulting's own AI agent console, site-wide.

   The same look as every Siamak agent (Agent Studio): a living 3D dot sphere
   that breathes with the voices, a dark glass console, live transcript, 17
   languages. No third-party widget or branding is shown; voice runs on the
   ElevenLabs Agents platform under the hood (@elevenlabs/client SDK), which is
   only fetched after the visitor presses Start and has allowed the
   "AI assistant" (functional) cookie category.

   API:  SKAgent.open({lang:'fa', start:true})   SKAgent.close()
         SKAgent.setLang('es')                    any [data-talk] element opens it
   Pages with their own #talkBtn keep it as the launcher; others get a pill.
   ========================================================================= */
(function () {
  'use strict';
  if (window.SKAgent) return;

  var AGENT = 'agent_1501ksnmsv1dea1rmb2ed6t8rzwe';
  var SDK = 'https://cdn.jsdelivr.net/npm/@elevenlabs/client@1.26.0/+esm';
  var PHONE = '+17072101280', PHONE_TXT = '707-210-1280';
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  var LANGS = [['en','English'],['es','Español'],['fa','فارسی'],['hy','Հայերեն'],['ar','العربية'],['he','עברית'],
    ['fr','Français'],['de','Deutsch'],['it','Italiano'],['pt-br','Português'],['zh','中文'],['ko','한국어'],
    ['tr','Türkçe'],['fil','Filipino'],['sv','Svenska'],['da','Dansk'],['bg','Български'],['ast','Asturianu']];
  var RTL = { fa: 1, ar: 1, he: 1 };

  var T = {
    en: { launch: 'Talk to my AI agent', title: 'Siamak’s AI agent', sub: 'Strategy questions · 17 languages · 24/7', start: 'Start talking', end: 'End', mute: 'Mute', unmute: 'Unmute',
      ready: 'Online', idle: 'Ready when you are', connecting: 'Connecting…', listening: 'Listening', speaking: 'Speaking', ended: 'Conversation ended. Thank you.',
      mic: 'Microphone access was blocked. Allow it in your browser and try again.', error: 'The agent couldn’t connect. Check your connection and try again.',
      consent: 'Allow the “AI assistant” cookie category to talk with the agent.',
      notice: 'You’re talking with an AI agent trained on Siamak Kalhor’s methods. It can be wrong, and the conversation is transcribed so the team can follow up.',
      phone: 'Prefer the phone? Call the agent', you: 'You', ai: 'Agent', close: 'Close', lang: 'Language' },
    es: { launch: 'Hable con mi agente IA', title: 'Agente IA de Siamak', sub: 'Estrategia · 17 idiomas · 24/7', start: 'Empezar a hablar', end: 'Terminar', mute: 'Silenciar', unmute: 'Activar',
      ready: 'En línea', idle: 'Listo cuando usted quiera', connecting: 'Conectando…', listening: 'Escuchando', speaking: 'Hablando', ended: 'Conversación terminada. Gracias.',
      mic: 'El micrófono está bloqueado. Permítalo en su navegador e intente de nuevo.', error: 'No se pudo conectar. Revise su conexión e intente de nuevo.',
      consent: 'Permita la categoría de cookies “Asistente IA” para hablar con el agente.',
      notice: 'Está hablando con un agente de IA entrenado con los métodos de Siamak Kalhor. Puede equivocarse y la conversación se transcribe para dar seguimiento.',
      phone: '¿Prefiere llamar? Llame al agente', you: 'Usted', ai: 'Agente', close: 'Cerrar', lang: 'Idioma' },
    fa: { launch: 'گفتگو با دستیار هوشمند من', title: 'دستیار هوشمند سیامک', sub: 'پرسش‌های استراتژی · ۱۷ زبان · شبانه‌روزی', start: 'شروع گفتگو', end: 'پایان', mute: 'بی‌صدا', unmute: 'صدا',
      ready: 'آنلاین', idle: 'هر وقت آماده بودید', connecting: 'در حال اتصال…', listening: 'در حال شنیدن', speaking: 'در حال صحبت', ended: 'گفتگو پایان یافت. سپاس.',
      mic: 'دسترسی به میکروفون مسدود است. آن را در مرورگر مجاز کنید و دوباره امتحان کنید.', error: 'اتصال برقرار نشد. اینترنت را بررسی کنید و دوباره امتحان کنید.',
      consent: 'برای گفتگو، دسته کوکی «دستیار هوش مصنوعی» را مجاز کنید.',
      notice: 'شما با یک دستیار هوش مصنوعی صحبت می‌کنید که با روش‌های سیامک کلهر آموزش دیده است. ممکن است اشتباه کند و گفتگو برای پیگیری ثبت می‌شود.',
      phone: 'ترجیح می‌دهید تلفنی صحبت کنید؟', you: 'شما', ai: 'دستیار', close: 'بستن', lang: 'زبان' },
    hy: { launch: 'Խոսեք իմ AI գործակալի հետ', title: 'Սիամակի AI գործակալը', sub: 'Ռազմավարություն · 17 լեզու · 24/7', start: 'Սկսել զրույցը', end: 'Ավարտել', mute: 'Անջատել', unmute: 'Միացնել',
      ready: 'Առցանց', idle: 'Պատրաստ է', connecting: 'Միանում է…', listening: 'Լսում է', speaking: 'Խոսում է', ended: 'Զրույցն ավարտվեց։ Շնորհակալություն։',
      mic: 'Խոսափողն արգելափակված է։ Թույլատրեք այն և կրկին փորձեք։', error: 'Չհաջողվեց միանալ։ Ստուգեք կապը և կրկին փորձեք։',
      consent: 'Թույլատրեք «AI օգնական» թխուկների կատեգորիան՝ գործակալի հետ խոսելու համար։',
      notice: 'Դուք խոսում եք AI գործակալի հետ՝ վերապատրաստված Սիամակ Կալհորի մեթոդներով։ Այն կարող է սխալվել, և զրույցը գրանցվում է հետագա կապի համար։',
      phone: 'Նախընտրու՞մ եք զանգել', you: 'Դուք', ai: 'Գործակալ', close: 'Փակել', lang: 'Լեզու' }
  };

  function pageLang() {
    var h = (document.documentElement.lang || navigator.language || 'en').toLowerCase();
    if (h.indexOf('pt') === 0) return 'pt-br';
    var c = h.split('-')[0];
    for (var i = 0; i < LANGS.length; i++) if (LANGS[i][0] === c) return c;
    return 'en';
  }
  var lang = pageLang();
  function tx() { return T[lang] || T.en; }

  /* ---------------- the living dot sphere (Agent Studio orb) ---------------- */
  function Orb(canvas, small) {
    var ctx = canvas.getContext('2d'), N = 0, pts, order, proj, built = 0, t = Math.random() * 500, energy = 1;
    function build(size) {
      N = Math.round(Math.min(small ? 320 : 1500, Math.max(small ? 140 : 300, size * size * 0.012)));
      pts = new Float32Array(N * 3); order = new Uint16Array(N); proj = new Float32Array(N * 4);
      for (var i = 0; i < N; i++) {
        var y = 1 - ((i + 0.5) / N) * 2, r = Math.sqrt(1 - y * y), ph = i * 2.399963229728653;
        pts[i * 3] = Math.cos(ph) * r; pts[i * 3 + 1] = y; pts[i * 3 + 2] = Math.sin(ph) * r;
      }
      built = size;
    }
    this.draw = function (target) {
      var dpr = Math.min(window.devicePixelRatio || 1, 2), w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      if (canvas.width !== Math.round(w * dpr)) { canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); }
      var size = Math.min(w, h);
      if (Math.abs(size - built) > 30 || !N) build(size);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
      energy += (target - energy) * 0.08;
      var cx = w / 2, cy = h / 2, R = size * (small ? 0.4 : 0.34);
      var rot = t * 0.0035 * (0.6 + energy * 0.5), tilt = 0.32 + Math.sin(t * 0.004) * 0.08;
      var cr = Math.cos(rot), sr = Math.sin(rot), ct = Math.cos(tilt), st = Math.sin(tilt), fov = 2.6;
      if (!small) {
        var g = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 1.9);
        g.addColorStop(0, 'rgba(80,190,255,' + (0.14 + energy * 0.06) + ')'); g.addColorStop(0.45, 'rgba(139,110,255,0.07)'); g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      }
      ctx.globalCompositeOperation = 'lighter';
      var amp = 0.025 + energy * 0.03, sp = t * 0.025 * (0.7 + energy * 0.5), i;
      for (i = 0; i < N; i++) {
        var x = pts[i * 3], y = pts[i * 3 + 1], z = pts[i * 3 + 2];
        var wv = Math.sin(x * 4.2 + sp) * Math.cos(y * 3.7 - sp * 0.8) + Math.sin(z * 5.1 + sp * 1.3) * 0.6, k = 1 + wv * amp;
        var x1 = (x * cr - z * sr) * k, z1 = (x * sr + z * cr) * k, y1 = y * k, y2 = y1 * ct - z1 * st, z2 = y1 * st + z1 * ct, s = fov / (fov - z2);
        proj[i * 4] = cx + x1 * R * s; proj[i * 4 + 1] = cy + y2 * R * s; proj[i * 4 + 2] = z2; proj[i * 4 + 3] = wv; order[i] = i;
      }
      order.sort(function (a, b) { return proj[a * 4 + 2] - proj[b * 4 + 2]; });
      for (var n = 0; n < N; n++) {
        i = order[n];
        var px = proj[i * 4], py = proj[i * 4 + 1], dz = (proj[i * 4 + 2] + 1) / 2, w2 = proj[i * 4 + 3], hue = pts[i * 3 + 1];
        var rr = hue > 0 ? 70 + hue * 90 : 70 - hue * 40, gg = hue > 0 ? 200 - hue * 70 : 210 + hue * 10;
        var br = Math.min(1, 0.18 + dz * 0.7 + Math.max(0, w2) * 0.25 * energy), d = (0.7 + dz * 1.9) * (small ? 0.75 : 1);
        ctx.fillStyle = 'rgba(' + (rr | 0) + ',' + (gg | 0) + ',255,' + br + ')';
        if (d < 1.6) ctx.fillRect(px - d / 2, py - d / 2, d, d); else { ctx.beginPath(); ctx.arc(px, py, d / 2, 0, 6.283); ctx.fill(); }
        if (!small && dz > 0.8 && w2 > 1.1) { ctx.fillStyle = 'rgba(120,255,210,' + Math.min(0.35, (w2 - 1.1) * 0.8 * energy) + ')'; ctx.beginPath(); ctx.arc(px, py, d * 0.9, 0, 6.283); ctx.fill(); }
      }
      var ringN = small ? 48 : 140;
      for (i = 0; i < ringN; i++) {
        var a = (i / ringN) * Math.PI * 2 + t * 0.006, ox = Math.cos(a) * 1.35, oz = Math.sin(a) * 1.35;
        var oy = ox * Math.sin(0.5) * 0.25, oy2 = oy * ct - oz * st, oz2 = oy * st + oz * ct, os = fov / (fov - oz2);
        ctx.fillStyle = 'rgba(167,139,250,' + (0.15 + ((oz2 + 1.35) / 2.7) * 0.5) + ')';
        ctx.fillRect(cx + ox * Math.cos(0.5) * R * os - 0.8, cy + oy2 * R * os - 0.8, 1.6, 1.6);
      }
      ctx.globalCompositeOperation = 'source-over';
      if (!reduce) t += 1;
    };
  }

  /* ---------------- styles (shadow DOM, nothing leaks into the page) ---------------- */
  var CSS = ':host{all:initial}'
    + '*{box-sizing:border-box}'
    + '.wrap{--bg:#05070d;--p:rgba(14,20,36,.94);--ln:rgba(120,170,255,.16);--ln2:rgba(120,200,255,.34);--tx:#e8eefc;--mu:#93a1bd;--dm:#5d6a85;--cy:#5ad7ff;--vi:#8b7bff;--mi:#5cf2b5;--ro:#ff6f91;'
    + 'font-family:"Space Grotesk","Inter",system-ui,-apple-system,"Segoe UI",sans-serif;color:var(--tx);-webkit-font-smoothing:antialiased}'
    + '.mono{font-family:"JetBrains Mono",ui-monospace,Menlo,monospace;letter-spacing:.14em;text-transform:uppercase;font-size:10.5px}'
    + '.launch{position:fixed;left:20px;bottom:20px;z-index:2147482990;display:flex;align-items:center;gap:10px;padding:6px 18px 6px 6px;border-radius:999px;border:1px solid var(--ln2);'
    + 'background:rgba(8,12,22,.9);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);color:var(--tx);font:600 15px/1 inherit;font-family:inherit;cursor:pointer;'
    + 'box-shadow:0 0 0 1px rgba(90,215,255,.18),0 12px 34px -8px rgba(0,0,0,.6),0 0 30px rgba(90,215,255,.16);-webkit-tap-highlight-color:transparent}'
    + '.launch:hover{border-color:var(--cy)}.launch:focus-visible{outline:2px solid var(--cy);outline-offset:3px}'
    + '.launch canvas{width:42px;height:42px;display:block;border-radius:50%;background:radial-gradient(circle,rgba(90,215,255,.18),transparent 70%)}'
    + '.launch b{display:grid;gap:4px;text-align:start}.launch b small{color:var(--mi);font-weight:500;display:flex;align-items:center;gap:6px}'
    + '.dot{width:6px;height:6px;border-radius:50%;background:currentColor;box-shadow:0 0 8px currentColor;animation:pl 1.8s ease-in-out infinite}@keyframes pl{50%{opacity:.3}}'
    + '.panel{position:fixed;left:20px;bottom:20px;z-index:2147482995;width:400px;max-width:calc(100vw - 24px);max-height:calc(100vh - 40px);display:flex;flex-direction:column;'
    + 'background:radial-gradient(120% 70% at 50% 0%,rgba(139,123,255,.16),transparent 60%),radial-gradient(90% 60% at 100% 30%,rgba(90,215,255,.1),transparent 60%),var(--p);'
    + 'border:1px solid var(--ln2);border-radius:20px;overflow:hidden;backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);'
    + 'box-shadow:0 0 0 1px rgba(90,215,255,.2),0 30px 80px -20px rgba(0,0,0,.75),0 0 48px rgba(90,215,255,.14);animation:rise .28s ease-out}'
    + '@keyframes rise{from{opacity:0;transform:translateY(14px) scale(.98)}}'
    + '.panel[hidden]{display:none}'
    + '.head{display:flex;align-items:center;gap:12px;padding:14px 14px 10px 16px}'
    + '.logo{width:26px;height:26px;border-radius:8px;flex:none;background:conic-gradient(from 200deg,var(--cy),var(--vi),var(--mi),var(--cy));box-shadow:0 0 16px rgba(90,215,255,.5);animation:sp 8s linear infinite}@keyframes sp{to{transform:rotate(360deg)}}'
    + '.ttl{display:grid;gap:4px;min-width:0;flex:1}.ttl strong{font-size:16px;letter-spacing:-.01em}.ttl span{color:var(--mu);font-size:12px}'
    + '.x{width:32px;height:32px;border-radius:50%;border:1px solid var(--ln);background:transparent;color:var(--mu);font:400 20px/1 system-ui;cursor:pointer;flex:none}.x:hover{color:var(--tx);border-color:var(--ln2)}'
    + '.stage{position:relative;height:210px;margin:0 12px;border-radius:16px;border:1px solid var(--ln);overflow:hidden;'
    + 'background:linear-gradient(var(--ln) 1px,transparent 1px) 0 0/32px 32px,linear-gradient(90deg,var(--ln) 1px,transparent 1px) 0 0/32px 32px,#060a14}'
    + '.stage canvas{position:absolute;inset:0;width:100%;height:100%}'
    + '.pill{position:absolute;left:10px;top:10px;display:inline-flex;align-items:center;gap:7px;padding:6px 10px;border-radius:999px;background:rgba(5,7,13,.7);border:1px solid var(--ln);color:var(--mi)}'
    + '.wrap[data-s="connecting"] .pill{color:#ffc65c}.wrap[data-s="live"] .pill{color:var(--cy)}'
    + '.status{position:absolute;left:0;right:0;bottom:12px;text-align:center;color:var(--tx);font-size:13px;text-shadow:0 1px 8px #000}'
    + '.row{display:flex;align-items:center;gap:8px;padding:12px 16px 0}'
    + '.row label{color:var(--dm)}'
    + 'select{flex:1;min-width:0;appearance:none;-webkit-appearance:none;background:rgba(255,255,255,.04) url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2710%27 height=%276%27%3E%3Cpath d=%27M0 0l5 6 5-6z%27 fill=%27%2393a1bd%27/%3E%3C/svg%3E") no-repeat right 12px center;'
    + 'border:1px solid var(--ln);border-radius:10px;color:var(--tx);font:500 14px/1 inherit;font-family:inherit;padding:10px 30px 10px 12px;cursor:pointer}'
    + 'select:disabled{opacity:.5;cursor:default}select option{background:#0a0f1c}'
    + '.log{margin:12px 16px 0;max-height:190px;min-height:64px;overflow-y:auto;display:grid;gap:8px;align-content:start;scrollbar-width:thin}'
    + '.log p{margin:0;padding:9px 12px;border-radius:12px;font-size:14px;line-height:1.5;max-width:88%}'
    + '.log p.ai{background:rgba(90,215,255,.08);border:1px solid rgba(90,215,255,.18)}'
    + '.log p.user{justify-self:end;background:rgba(139,123,255,.14);border:1px solid rgba(139,123,255,.26)}'
    + '.log p i{display:block;font-style:normal;margin-bottom:3px;color:var(--dm)}'
    + '.notice{margin:0;color:var(--mu);font-size:12.5px;line-height:1.55}'
    + '.note{margin:10px 16px 0;color:var(--ro);font-size:13px;line-height:1.45}.note:empty{display:none}'
    + '.acts{display:flex;gap:10px;padding:14px 16px 0}'
    + '.btn{flex:1;min-height:46px;border-radius:12px;border:0;font:700 15px/1 inherit;font-family:inherit;cursor:pointer;-webkit-tap-highlight-color:transparent}'
    + '.go{background:linear-gradient(135deg,#2dd4ff,#a06bff);color:#04060a;box-shadow:0 8px 26px -6px rgba(45,212,255,.55)}.go:hover{filter:brightness(1.08)}'
    + '.go.end{background:rgba(255,111,145,.14);color:#ffb3c4;border:1px solid rgba(255,111,145,.45);box-shadow:none}'
    + '.ghost{flex:0 0 auto;padding:0 16px;background:transparent;color:var(--tx);border:1px solid var(--ln2)}.ghost[hidden]{display:none}'
    + '.btn:disabled{opacity:.6;cursor:default}.btn:focus-visible,select:focus-visible,.x:focus-visible{outline:2px solid var(--cy);outline-offset:2px}'
    + '.foot{display:flex;justify-content:space-between;gap:10px;padding:12px 16px 14px;color:var(--dm);font-size:12px}'
    + '.foot a{color:var(--cy);text-decoration:none;font-weight:600;white-space:nowrap}'
    + '[dir=rtl] .mono{letter-spacing:0;text-transform:none;font-family:inherit;font-size:12px}[dir=rtl] .log p.user{justify-self:start}[dir=rtl] .log p{text-align:right}'
    + '@media (max-width:560px){.launch{left:12px;bottom:12px;padding:5px 14px 5px 5px;font-size:14px}.launch canvas{width:38px;height:38px}'
    + '.panel{left:0;right:0;bottom:0;width:100vw;max-width:100vw;max-height:92vh;border-radius:20px 20px 0 0;padding-bottom:env(safe-area-inset-bottom)}.stage{height:180px}}'
    + '@media (prefers-reduced-motion:reduce){.panel,.logo,.dot{animation:none}}';

  /* ---------------- build ---------------- */
  var host, root, wrap, launch, panel, els = {}, bigOrb, miniOrb;
  var state = 'idle', mode = 'listening', muted = false, conv = null, msgs = [], noteKey = '', opened = false, lvl = 0;

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

  function build() {
    host = document.createElement('div'); host.setAttribute('data-sk-agent', '');
    root = host.attachShadow ? host.attachShadow({ mode: 'open' }) : host;
    var st = document.createElement('style'); st.textContent = CSS; root.appendChild(st);
    wrap = el('div', 'wrap'); root.appendChild(wrap);

    if (!document.getElementById('talkBtn')) {
      launch = el('button', 'launch'); launch.type = 'button'; launch.setAttribute('aria-haspopup', 'dialog');
      launch.innerHTML = '<canvas aria-hidden="true"></canvas><b><span class="lt"></span><small class="mono"><span class="dot"></span><span class="ls"></span></small></b>';
      launch.addEventListener('click', function () { open(); });
      wrap.appendChild(launch);
      miniOrb = new Orb(launch.querySelector('canvas'), true);
    }

    panel = el('section', 'panel'); panel.hidden = true; panel.setAttribute('role', 'dialog');
    panel.innerHTML =
      '<header class="head"><i class="logo" aria-hidden="true"></i><div class="ttl"><strong class="t"></strong><span class="s"></span></div><button type="button" class="x">×</button></header>'
      + '<div class="stage"><canvas aria-hidden="true"></canvas><span class="pill mono"><span class="dot"></span><span class="pt"></span></span><p class="status" aria-live="polite"></p></div>'
      + '<div class="row"><label class="mono" for="sk-lang"></label><select id="sk-lang"></select></div>'
      + '<div class="log" aria-live="polite"></div><p class="note" role="alert"></p>'
      + '<div class="acts"><button type="button" class="btn ghost mu" hidden></button><button type="button" class="btn go"></button></div>'
      + '<div class="foot"><span class="ph"></span><a href="tel:' + PHONE + '">' + PHONE_TXT + '</a></div>';
    wrap.appendChild(panel);
    ['t', 's', 'x', 'status', 'pt', 'log', 'note', 'mu', 'go', 'ph'].forEach(function (k) { els[k] = panel.querySelector('.' + k); });
    els.sel = panel.querySelector('select'); els.lab = panel.querySelector('label');
    LANGS.forEach(function (l) { var o = document.createElement('option'); o.value = l[0]; o.textContent = l[1]; els.sel.appendChild(o); });
    els.sel.addEventListener('change', function () { setLang(els.sel.value); });
    els.x.addEventListener('click', close);
    els.go.addEventListener('click', function () { if (state === 'idle') start(); else if (state === 'live') stop(); });
    els.mu.addEventListener('click', function () { if (!conv) return; muted = !muted; try { conv.setMicMuted(muted); } catch (e) {} render(); });
    bigOrb = new Orb(panel.querySelector('.stage canvas'), false);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && opened) close(); });
    (document.body || document.documentElement).appendChild(host);
    render(); loop();
  }

  function render() {
    var t = tx();
    wrap.setAttribute('data-s', state);
    wrap.setAttribute('dir', RTL[lang] ? 'rtl' : 'ltr');
    if (launch) {
      launch.querySelector('.lt').textContent = t.launch;
      launch.querySelector('.ls').textContent = t.ready + ' · 24/7';
      launch.setAttribute('aria-label', t.launch); launch.hidden = opened;
      launch.style.display = opened ? 'none' : '';
    }
    panel.setAttribute('aria-label', t.title);
    els.t.textContent = t.title; els.s.textContent = t.sub; els.x.setAttribute('aria-label', t.close);
    els.lab.textContent = t.lang; els.sel.value = lang; els.sel.disabled = state !== 'idle';
    els.pt.textContent = state === 'live' ? (mode === 'speaking' ? t.speaking : t.listening) : state === 'connecting' ? t.connecting : t.ready;
    els.status.textContent = state === 'idle' ? (noteKey === 'ended' ? t.ended : t.idle) : state === 'connecting' ? t.connecting : '';
    els.note.textContent = noteKey && noteKey !== 'ended' ? t[noteKey] : '';
    els.go.textContent = state === 'live' || state === 'ending' ? t.end : state === 'connecting' ? t.connecting : t.start;
    els.go.className = 'btn go' + (state === 'live' || state === 'ending' ? ' end' : '');
    els.go.disabled = state === 'connecting' || state === 'ending';
    els.mu.hidden = state !== 'live'; els.mu.textContent = muted ? t.unmute : t.mute;
    els.ph.textContent = t.phone;
    if (msgs.length) {
      els.log.innerHTML = '';
      msgs.slice(-30).forEach(function (m) { var p = el('p', m.src); var i = el('i', 'mono'); i.textContent = m.src === 'ai' ? t.ai : t.you; p.appendChild(i); p.appendChild(document.createTextNode(m.text)); els.log.appendChild(p); });
      els.log.scrollTop = els.log.scrollHeight;
    } else { els.log.innerHTML = ''; var n = el('p', 'notice'); n.textContent = t.notice; els.log.appendChild(n); }
  }

  function loop() {
    var target = 1;
    if (conv && state === 'live') {
      var v = 0; try { v = Math.max(conv.getOutputVolume() || 0, (conv.getInputVolume() || 0) * 0.8); } catch (e) {}
      lvl += (v - lvl) * 0.3; target = 1 + Math.min(1, lvl * 2.2) * 1.6 + (mode === 'speaking' ? 0.4 : 0);
    } else if (state === 'connecting') target = 2.2;
    else lvl *= 0.9;
    if (opened) bigOrb.draw(target); else if (miniOrb && !document.hidden) miniOrb.draw(1);
    if (!reduce || state !== 'idle') requestAnimationFrame(loop); else setTimeout(function () { requestAnimationFrame(loop); }, 1000);
  }

  function track(ev) { try { if (window.gtag) gtag('event', ev, { event_category: 'engagement', event_label: 'sk_agent', language: lang }); } catch (e) {} }

  function consentOK() { var c = window.SKConsent && window.SKConsent.get && window.SKConsent.get(); return !window.SKConsent || (c && c.functional); }

  function start() {
    noteKey = '';
    if (!consentOK()) {
      noteKey = 'consent'; render();
      window.addEventListener('sk:consent', function h(e) { if (e.detail && e.detail.functional) { window.removeEventListener('sk:consent', h); start(); } });
      try { window.SKConsent.open(); } catch (e) {}
      return;
    }
    msgs = []; state = 'connecting'; render();
    import(SDK).then(function (mod) {
      return mod.Conversation.startSession({
        agentId: AGENT, connectionType: 'webrtc',
        overrides: { agent: { language: lang } },
        onConnect: function () { muted = false; mode = 'listening'; state = 'live'; render(); track('ai_agent_start'); },
        onDisconnect: function () { conv = null; state = 'idle'; noteKey = 'ended'; render(); },
        onModeChange: function (p) { mode = p && p.mode === 'speaking' ? 'speaking' : 'listening'; render(); },
        onMessage: function (p) { if (p && p.message) { msgs.push({ src: p.source === 'ai' ? 'ai' : 'user', text: p.message }); render(); } },
        onError: function (m) { console.warn('[sk-agent]', m); }
      });
    }).then(function (c) { conv = c; }).catch(function (e) {
      conv = null;
      noteKey = e && (e.name === 'NotAllowedError' || /permission|denied/i.test(String(e.message || e))) ? 'mic' : 'error';
      state = 'idle'; render();
    });
  }

  function stop() {
    if (!conv) return; state = 'ending'; render();
    Promise.resolve().then(function () { return conv.endSession(); }).catch(function () {}).then(function () { conv = null; state = 'idle'; noteKey = 'ended'; render(); });
  }

  function setLang(code) {
    code = String(code || '').toLowerCase(); if (code.indexOf('pt') === 0) code = 'pt-br'; else code = code.split('-')[0];
    for (var i = 0; i < LANGS.length; i++) if (LANGS[i][0] === code) { lang = code; if (panel) render(); return; }
  }

  function open(opts) {
    opts = opts || {};
    if (!host) build();
    if (opts.lang) setLang(opts.lang);
    if (!opened) track('ai_advisor_open');
    opened = true; panel.hidden = false; render();
    var tb = document.getElementById('talkBtn'); if (tb) tb.style.visibility = 'hidden';
    if (opts.start && state === 'idle') start(); else setTimeout(function () { try { els.go.focus({ preventScroll: true }); } catch (e) {} }, 60);
  }

  function close() {
    if (state === 'live' || state === 'connecting') stop();
    opened = false; panel.hidden = true; render();
    var tb = document.getElementById('talkBtn'); if (tb) { tb.style.visibility = ''; try { tb.focus(); } catch (e) {} } else if (launch) { try { launch.focus(); } catch (e) {} }
  }

  window.addEventListener('pagehide', function () { if (conv) { try { conv.endSession(); } catch (e) {} } });
  document.addEventListener('click', function (e) {
    var t = e.target && e.target.closest && e.target.closest('[data-talk],#talkBtn,[data-sk-agent-open]');
    if (t) { e.preventDefault(); open({ lang: t.getAttribute('data-lang') || undefined }); }
  });

  window.SKAgent = { open: open, close: close, setLang: setLang };
  window.skOpenAdvisor = function () { open(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
