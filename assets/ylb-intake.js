/* Your Legal Brain — branded voice intake console (legal theme, 3D scales of justice).
 * Reusable across the industry series: <div data-ylb-intake data-agent="agent_..." data-langs="en,es,fa,hy"></div>
 * plus this script. Voice runs on the ElevenLabs Agents platform under the hood. */
(function () {
  var SDK = "https://cdn.jsdelivr.net/npm/@elevenlabs/client@1.26.0/+esm";

  var T = {
    en: { label: "English", start: "Start intake call", end: "End call", mute: "Mute", unmute: "Unmute",
      idle: "Ready when you are", connecting: "Connecting…", listening: "Listening", speaking: "Speaking", ended: "Call ended. Thank you.",
      micDenied: "Microphone access was blocked. Allow the microphone in your browser and try again.",
      error: "The call couldn't connect. Check your connection and try again.",
      you: "You", agent: "Intake", empty: "The conversation will appear here as you speak.",
      notice: "You're speaking with an AI assistant, not an attorney. It doesn't give legal advice, the call doesn't create an attorney-client relationship, and the conversation is transcribed for review. This is a demonstration line. In an emergency, call 911.",
      pick: "Language" },
    es: { label: "Español", start: "Iniciar llamada", end: "Terminar", mute: "Silenciar", unmute: "Activar micrófono",
      idle: "Listo cuando usted quiera", connecting: "Conectando…", listening: "Escuchando", speaking: "Hablando", ended: "Llamada terminada. Gracias.",
      micDenied: "El micrófono está bloqueado. Permita el micrófono en su navegador e intente de nuevo.",
      error: "No se pudo conectar la llamada. Revise su conexión e intente de nuevo.",
      you: "Usted", agent: "Admisión", empty: "La conversación aparecerá aquí mientras habla.",
      notice: "Está hablando con un asistente de IA, no con un abogado. No da asesoría legal, la llamada no crea una relación abogado-cliente y la conversación se transcribe para revisión. Esta es una línea de demostración. En una emergencia, llame al 911.",
      pick: "Idioma" },
    fa: { label: "فارسی", start: "شروع تماس", end: "پایان تماس", mute: "قطع صدا", unmute: "وصل صدا",
      idle: "هر وقت آماده بودید", connecting: "در حال اتصال…", listening: "در حال شنیدن", speaking: "در حال صحبت", ended: "تماس پایان یافت. سپاس.",
      micDenied: "دسترسی به میکروفون مسدود است. میکروفون را در مرورگر مجاز کنید و دوباره امتحان کنید.",
      error: "تماس برقرار نشد. اتصال اینترنت را بررسی کنید و دوباره امتحان کنید.",
      you: "شما", agent: "پذیرش", empty: "گفتگو هنگام صحبت در اینجا نمایش داده می‌شود.",
      notice: "شما با یک دستیار هوش مصنوعی صحبت می‌کنید، نه وکیل. این دستیار مشاوره حقوقی نمی‌دهد، این تماس رابطه وکیل و موکل ایجاد نمی‌کند و گفتگو برای بررسی ثبت می‌شود. این یک خط نمایشی است. در شرایط اضطراری با ۹۱۱ تماس بگیرید.",
      pick: "زبان" },
    hy: { label: "Հայերեն", start: "Սկսել զանգը", end: "Ավարտել", mute: "Անջատել ձայնը", unmute: "Միացնել ձայնը",
      idle: "Պատրաստ է, երբ դուք պատրաստ եք", connecting: "Միանում է…", listening: "Լսում է", speaking: "Խոսում է", ended: "Զանգն ավարտվեց։ Շնորհակալություն։",
      micDenied: "Խոսափողի հասանելիությունն արգելափակված է։ Թույլատրեք խոսափողը դիտարկիչում և կրկին փորձեք։",
      error: "Զանգը չմիացավ։ Ստուգեք կապը և կրկին փորձեք։",
      you: "Դուք", agent: "Ընդունում", empty: "Զրույցը կհայտնվի այստեղ, երբ խոսեք։",
      notice: "Դուք խոսում եք արհեստական բանականությամբ օգնականի հետ, ոչ թե փաստաբանի։ Այն իրավաբանական խորհուրդ չի տալիս, զանգը փաստաբան-հաճախորդ հարաբերություն չի ստեղծում, և զրույցը գրանցվում է ուսումնասիրության համար։ Սա ցուցադրական գիծ է։ Արտակարգ դեպքում զանգահարեք 911։",
      pick: "Լեզու" }
  };

  var X = {
    en: { conf: "Confidential intake", ready: "Ready", live: "In session", brand: "Your Legal Brain" },
    es: { conf: "Admisión confidencial", ready: "Listo", live: "En sesión", brand: "Your Legal Brain" },
    fa: { conf: "پذیرش محرمانه", ready: "آماده", live: "در حال گفتگو", brand: "Your Legal Brain" },
    hy: { conf: "Գաղտնի ընդունում", ready: "Պատրաստ", live: "Զրույցի մեջ", brand: "Your Legal Brain" }
  };
  Object.keys(X).forEach(function (k) { for (var f in X[k]) T[k][f] = X[k][f]; });

  /* Legal palette: courtroom navy, brass fittings, parchment type, oxblood for ending a call. */
  var CSS = '.ylb{--n0:#070F1C;--n1:#0C182B;--n2:#13223A;--rl:#2A3A55;--br:#D4AE63;--brd:#8E7440;--pa:#F1EADB;--pm:#B9B09C;--ox:#8C2F2F;--oxt:#EE9B92;'
    + 'max-width:780px;margin:26px 0 8px;background:radial-gradient(120% 80% at 50% 0%,var(--n2) 0%,var(--n1) 45%,var(--n0) 100%);border:1px solid var(--rl);border-radius:14px;overflow:hidden;'
    + 'box-shadow:0 30px 80px rgba(0,0,0,.55),inset 0 0 0 1px rgba(212,174,99,.08);color:var(--pa);font-family:var(--body,Inter,system-ui,sans-serif)}'
    + '.ylb-bar{display:flex;align-items:center;gap:12px;padding:14px 18px;background:linear-gradient(180deg,rgba(212,174,99,.07),transparent)}'
    + '.ylb-seal{width:34px;height:34px;flex:none}'
    + '.ylb-ttl{display:grid;gap:2px;min-width:0}'
    + '.ylb-ttl b{font:600 19px/1.1 "Cormorant Garamond",Georgia,"Times New Roman",serif;letter-spacing:.01em;color:var(--pa)}'
    + '.ylb-ttl span{font:500 10px/1 var(--mono,monospace);letter-spacing:.18em;text-transform:uppercase;color:var(--br)}'
    + '.ylb-pill{margin-inline-start:auto;font:500 10px/1 var(--mono,monospace);letter-spacing:.12em;text-transform:uppercase;padding:6px 10px;border-radius:999px;border:1px solid var(--brd);color:var(--br);display:inline-flex;gap:7px;align-items:center;white-space:nowrap}'
    + '.ylb-pill i{width:6px;height:6px;border-radius:50%;background:currentColor}'
    + '.ylb[data-state="connected"] .ylb-pill{color:#9fe0b6;border-color:#3f7a57}'
    + '.ylb[data-state="connected"] .ylb-pill i{animation:ylb-pulse 1.2s ease-in-out infinite}'
    + '@keyframes ylb-pulse{50%{opacity:.25}}'
    + '.ylb-rule{height:4px;margin:0 18px;border-top:1px solid var(--brd);border-bottom:1px solid var(--brd);opacity:.7}'
    + '.ylb-langs{display:flex;flex-wrap:wrap;gap:6px;padding:14px 18px 0;align-items:center}'
    + '.ylb-langs .lb{font:500 10px var(--mono,monospace);letter-spacing:.14em;text-transform:uppercase;color:var(--pm);margin-inline-end:6px}'
    + '.ylb-langs button{all:unset;cursor:pointer;font-size:13.5px;padding:6px 13px;border-radius:999px;border:1px solid var(--rl);color:var(--pm)}'
    + '.ylb-langs button:hover{color:var(--pa);border-color:var(--brd)}'
    + '.ylb-langs button[aria-pressed="true"]{color:var(--n0);background:var(--br);border-color:var(--br);font-weight:600}'
    + '.ylb-langs button:disabled{opacity:.45;cursor:not-allowed}'
    + '.ylb-langs button:focus-visible,.ylb-btn:focus-visible{outline:2px solid var(--br);outline-offset:2px}'
    + '.ylb-main{display:grid;grid-template-columns:240px 1fr;gap:18px;padding:16px 18px}'
    + '.ylb-stage{display:grid;justify-items:center;gap:10px;align-content:start}'
    + '.ylb-scales{width:220px;height:220px;max-width:100%}'
    + '.ylb-status{font:500 12px var(--mono,monospace);color:var(--pm);text-align:center;min-height:1.5em}'
    + '.ylb-ctrls{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}'
    + '.ylb-btn{all:unset;cursor:pointer;font-weight:600;font-size:14px;padding:10px 18px;border-radius:999px;text-align:center}'
    + '.ylb-btn.go{background:linear-gradient(180deg,#E6C47E,var(--br) 55%,#B48C45);color:var(--n0);box-shadow:0 6px 18px -6px rgba(212,174,99,.6),inset 0 1px 0 rgba(255,255,255,.35)}'
    + '.ylb-btn.stop{background:var(--ox);color:#fff;box-shadow:0 6px 18px -6px rgba(140,47,47,.7)}'
    + '.ylb-btn.ghost{border:1px solid var(--rl);color:var(--pm);font-weight:500}'
    + '.ylb-btn:disabled{opacity:.6;cursor:default}'
    /* transcript as a numbered legal pad: ruled lines, a margin rule, line numbers */
    + '.ylb-log{min-width:0;position:relative;background:repeating-linear-gradient(180deg,transparent 0 27px,rgba(212,174,99,.09) 27px 28px),linear-gradient(180deg,#0B1628,#09131F);border:1px solid var(--rl);border-radius:8px;padding:10px 14px 10px 52px;height:280px;overflow-y:auto;counter-reset:ln;font-size:14px;line-height:28px}'
    + '.ylb-log::before{content:"";position:absolute;inset-block:0;inset-inline-start:40px;width:1px;background:rgba(238,155,146,.35)}'
    + '.ylb[dir="rtl"] .ylb-log{padding:10px 52px 10px 14px}'
    + '.ylb-log .e{color:var(--pm);font-style:italic;font-family:"Cormorant Garamond",Georgia,serif;font-size:17px}'
    + '.ylb-log .m{position:relative;counter-increment:ln}'
    + '.ylb-log .m::before{content:counter(ln);position:absolute;inset-inline-start:-46px;width:30px;text-align:end;font:11px/28px var(--mono,monospace);color:rgba(212,174,99,.55)}'
    + '.ylb-log .m b{font:600 11px var(--mono,monospace);letter-spacing:.12em;text-transform:uppercase;margin-inline-end:8px}'
    + '.ylb-log .m.ai b{color:var(--br)} .ylb-log .m.user b{color:#9DB7E0}'
    + '.ylb-note{margin:0 18px 18px;padding-top:12px;border-top:1px dashed var(--rl);font-size:12px;line-height:1.65;color:var(--pm)}'
    + '.ylb-note::before{content:"§ ";color:var(--br);font-weight:700}'
    + '.ylb-err{color:var(--oxt)}'
    + '.ylb [hidden]{display:none!important}'
    + '.ylb:is([lang="fa"],[lang="hy"]) :is(.ylb-status,.ylb-langs .lb,.ylb-log .m b,.ylb-ttl span){font-family:inherit;letter-spacing:0;text-transform:none}'
    + '.ylb:is([lang="fa"],[lang="hy"]) .ylb-log .e{font-family:inherit;font-style:normal;font-size:14px}'
    + '@media(max-width:640px){.ylb-main{grid-template-columns:1fr}.ylb-log{height:240px}.ylb-scales{width:200px;height:200px}}'
    + '@media(prefers-reduced-motion:reduce){.ylb[data-state="connected"] .ylb-pill i{animation:none}}';

  var SEAL = '<svg class="ylb-seal" viewBox="0 0 40 40" aria-hidden="true"><defs><linearGradient id="ylbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EFD08E"/><stop offset="1" stop-color="#A9823E"/></linearGradient></defs>'
    + '<circle cx="20" cy="20" r="18.5" fill="none" stroke="url(#ylbg)" stroke-width="1.5"/><circle cx="20" cy="20" r="15" fill="none" stroke="url(#ylbg)" stroke-width=".6" stroke-dasharray="1.2 1.6"/>'
    + '<g fill="none" stroke="url(#ylbg)" stroke-width="1.4" stroke-linecap="round"><path d="M20 10v19M14 29h12M11 14h18"/><path d="M11 14l-3.2 7M11 14l3.2 7M29 14l-3.2 7M29 14l3.2 7"/></g>'
    + '<g fill="url(#ylbg)"><path d="M7.3 21h7.4a3.7 3.7 0 0 1-7.4 0zM25.3 21h7.4a3.7 3.7 0 0 1-7.4 0z"/><circle cx="20" cy="9.3" r="1.5"/></g></svg>';

  /* ---------- 3D scales of justice: real perspective on a 2D canvas, no library ---------- */
  function Scales(cv) {
    var ctx = cv.getContext("2d"), W, H, dpr = Math.min(window.devicePixelRatio || 1, 2);
    function size() { var r = cv.getBoundingClientRect(); W = Math.max(160, r.width); H = Math.max(160, r.height); cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    size(); window.addEventListener("resize", size);
    var tilt = 0, yaw = 0.5, glowL = 0, glowR = 0;
    function proj(p, cy, sy) {
      var x = p[0] * cy - p[2] * sy, z = p[0] * sy + p[2] * cy, y = p[1];
      var cx = 0.14, cxs = Math.cos(cx), sxs = Math.sin(cx);          /* slight downward camera pitch */
      var y2 = y * cxs - z * sxs, z2 = y * sxs + z * cxs;
      var d = 6.2, f = (Math.min(W, H) * 0.98) / (d + z2);
      return [W / 2 + x * f, H * 0.53 - y2 * f, z2, f];
    }
    function ring(c, r, n) { var a = []; for (var i = 0; i < n; i++) { var t = i / n * Math.PI * 2; a.push([c[0] + Math.cos(t) * r, c[1], c[2] + Math.sin(t) * r]); } return a; }
    function poly(pts, cy, sy, fill, stroke, lw) {
      ctx.beginPath(); pts.forEach(function (p, i) { var q = proj(p, cy, sy); i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); }); ctx.closePath();
      if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw || 1; ctx.stroke(); }
    }
    function line(a, b, cy, sy, col, lw) { var p = proj(a, cy, sy), q = proj(b, cy, sy); ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.strokeStyle = col; ctx.lineWidth = lw * p[3] / 34; ctx.stroke(); }
    function brass(a) { return "rgba(222,186,112," + a + ")"; }
    function pan(cx, top, cy, sy, glow) {
      var rimY = top - 1.05, rim = [cx, rimY, 0];
      var hang = [0, 1, 2].map(function (k) { var t = k / 3 * Math.PI * 2 + 0.4; return [cx + Math.cos(t) * 0.46, rimY, Math.sin(t) * 0.46]; });
      hang.forEach(function (h) { line([cx, top, 0], h, cy, sy, brass(.55), 1.1); });
      /* bowl: three stacked rings shrinking downward give it depth */
      var r0 = ring(rim, 0.5, 28), r1 = ring([cx, rimY - 0.1, 0], 0.4, 28), r2 = ring([cx, rimY - 0.17, 0], 0.22, 20);
      if (glow > 0.02) {
        var c = proj(rim, cy, sy), g = ctx.createRadialGradient(c[0], c[1], 2, c[0], c[1], c[3] * 0.95);
        g.addColorStop(0, brass(0.45 * glow)); g.addColorStop(1, brass(0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(c[0], c[1], c[3] * 0.95, 0, 7); ctx.fill();
      }
      poly(r2, cy, sy, "rgba(120,92,44,.9)");
      poly(r1, cy, sy, "rgba(160,124,62,.85)", brass(.6), 1);
      poly(r0, cy, sy, "rgba(196,156,84," + (0.55 + glow * 0.4) + ")", brass(.95), 1.4);
    }
    this.draw = function (now, lvIn, lvOut, active, reduce) {
      ctx.clearRect(0, 0, W, H);
      /* the beam leans toward whoever is speaking: caller pan left, agent pan right */
      var target = active ? Math.max(-0.32, Math.min(0.32, (lvOut - lvIn) * 0.9)) : (reduce ? 0 : Math.sin(now / 1600) * 0.05);
      tilt += (target - tilt) * 0.08;
      glowL += ((active ? lvIn * 1.6 : 0) - glowL) * 0.15; glowR += ((active ? lvOut * 1.6 : 0) - glowR) * 0.15;
      yaw = reduce ? 0.25 : 0.25 + Math.sin(now / 5200) * 0.35;
      var cy = Math.cos(yaw), sy = Math.sin(yaw);
      /* halo */
      var hc = proj([0, 0.6, 0], cy, sy), hg = ctx.createRadialGradient(hc[0], hc[1], 4, hc[0], hc[1], Math.min(W, H) * 0.55);
      hg.addColorStop(0, "rgba(212,174,99,.16)"); hg.addColorStop(1, "rgba(212,174,99,0)"); ctx.fillStyle = hg; ctx.fillRect(0, 0, W, H);
      /* stepped plinth */
      poly(ring([0, -1.75, 0], 0.95, 36), cy, sy, "rgba(48,40,26,.95)", brass(.35), 1);
      poly(ring([0, -1.62, 0], 0.78, 36), cy, sy, "rgba(92,72,38,.95)", brass(.55), 1);
      poly(ring([0, -1.5, 0], 0.55, 32), cy, sy, "rgba(150,116,58,.95)", brass(.8), 1.2);
      /* fluted column: eight vertical strokes around a narrow core */
      for (var k = 0; k < 8; k++) {
        var t = k / 8 * Math.PI * 2, a = [Math.cos(t) * 0.09, -1.5, Math.sin(t) * 0.09], b = [Math.cos(t) * 0.07, 1.22, Math.sin(t) * 0.07];
        var depth = Math.sin(t) * cy + Math.cos(t) * sy;
        line(a, b, cy, sy, brass(0.45 + 0.4 * (1 - depth) / 2), 1.6);
      }
      line([0, -1.5, 0], [0, 1.22, 0], cy, sy, brass(.95), 3.2);
      /* pivot, finial */
      var piv = [0, 1.25, 0], L = 1.55;
      var lx = -Math.cos(tilt) * L, ly = 1.25 - Math.sin(tilt) * L * -1, rx = Math.cos(tilt) * L, ry = 1.25 - Math.sin(tilt) * L;
      ly = 1.25 + Math.sin(tilt) * L;
      var left = [lx, ly, 0], right = [rx, ry, 0];
      /* draw the far pan first so the near one overlaps it */
      var leftNear = proj(left, cy, sy)[2] < proj(right, cy, sy)[2];
      if (leftNear) pan(rx, ry, cy, sy, glowR); else pan(lx, ly, cy, sy, glowL);
      line(left, right, cy, sy, brass(1), 3);
      [left, right].forEach(function (p) { var q = proj(p, cy, sy); ctx.fillStyle = brass(1); ctx.beginPath(); ctx.arc(q[0], q[1], q[3] * 0.05, 0, 7); ctx.fill(); });
      var pq = proj(piv, cy, sy); ctx.fillStyle = "#F2D79B"; ctx.beginPath(); ctx.arc(pq[0], pq[1], pq[3] * 0.09, 0, 7); ctx.fill();
      var fq = proj([0, 1.58, 0], cy, sy); ctx.beginPath(); ctx.arc(fq[0], fq[1], fq[3] * 0.11, 0, 7);
      var fg = ctx.createRadialGradient(fq[0] - 2, fq[1] - 2, 1, fq[0], fq[1], fq[3] * 0.11); fg.addColorStop(0, "#FFF1C9"); fg.addColorStop(1, "#A9823E"); ctx.fillStyle = fg; ctx.fill();
      if (leftNear) pan(lx, ly, cy, sy, glowL); else pan(rx, ry, cy, sy, glowR);
    };
  }

  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }

  function mount(root) {
    var agentId = root.getAttribute("data-agent");
    var langs = (root.getAttribute("data-langs") || "en,es,fa,hy").split(",").filter(function (l) { return T[l]; });
    var lang = langs[0], conv = null, muted = false, state = "idle";

    root.classList.add("ylb");
    root.setAttribute("role", "region");
    root.setAttribute("aria-label", "Voice intake assistant");

    var bar = el("div", "ylb-bar"); bar.insertAdjacentHTML("beforeend", SEAL);
    var ttl = el("div", "ylb-ttl"); var tb = el("b"); var ts = el("span"); ttl.appendChild(tb); ttl.appendChild(ts);
    var pill = el("span", "ylb-pill"); pill.appendChild(el("i")); var pillTx = el("span"); pill.appendChild(pillTx);
    bar.appendChild(ttl); bar.appendChild(pill);
    var rule = el("div", "ylb-rule");

    var lw = el("div", "ylb-langs"); var lbl = el("span", "lb"); lw.appendChild(lbl);
    var lbtns = langs.map(function (l) {
      var b = el("button", null, T[l].label); b.type = "button"; b.lang = l; if (l === "fa") b.dir = "rtl";
      b.addEventListener("click", function () { lang = l; render(); });
      lw.appendChild(b); return b;
    });

    var main = el("div", "ylb-main");
    var stage = el("div", "ylb-stage");
    var cv = el("canvas", "ylb-scales"); cv.setAttribute("aria-hidden", "true");
    var status = el("div", "ylb-status"); status.setAttribute("aria-live", "polite");
    var ctrls = el("div", "ylb-ctrls");
    var go = el("button", "ylb-btn go"); go.type = "button";
    var mute = el("button", "ylb-btn ghost"); mute.type = "button"; mute.hidden = true;
    ctrls.appendChild(go); ctrls.appendChild(mute);
    stage.appendChild(cv); stage.appendChild(status); stage.appendChild(ctrls);
    var log = el("div", "ylb-log"); log.setAttribute("aria-live", "polite");
    main.appendChild(stage); main.appendChild(log);
    var note = el("p", "ylb-note");

    root.appendChild(bar); root.appendChild(rule); root.appendChild(lw); root.appendChild(main); root.appendChild(note);

    var msgs = [], statusKey = "idle", errKey = null;

    function render() {
      var t = T[lang];
      root.dir = lang === "fa" ? "rtl" : "ltr"; root.lang = lang;
      tb.textContent = t.brand; ts.textContent = t.conf;
      lbl.textContent = t.pick;
      lbtns.forEach(function (b) { b.setAttribute("aria-pressed", String(b.lang === lang)); b.disabled = state !== "idle"; });
      go.textContent = state === "idle" ? t.start : t.end;
      go.className = "ylb-btn " + (state === "idle" ? "go" : "stop");
      go.disabled = state === "connecting" || state === "disconnecting";
      mute.hidden = state !== "connected"; mute.textContent = muted ? t.unmute : t.mute;
      status.textContent = errKey ? t[errKey] : t[statusKey];
      status.className = "ylb-status" + (errKey ? " ylb-err" : "");
      pillTx.textContent = state === "connected" ? t.live : state === "connecting" ? t.connecting : t.ready;
      root.setAttribute("data-state", state);
      note.textContent = t.notice;
      log.innerHTML = "";
      if (!msgs.length) { log.appendChild(el("div", "e", t.empty)); }
      msgs.forEach(function (m) { var d = el("div", "m " + m.src); d.appendChild(el("b", null, m.src === "ai" ? t.agent : t.you)); d.appendChild(document.createTextNode(m.text)); log.appendChild(d); });
      log.scrollTop = log.scrollHeight;
    }

    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    var scales = new Scales(cv), lvIn = 0, lvOut = 0, visible = true;
    if ("IntersectionObserver" in window) new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(cv);
    function frame(now) {
      if (conv && state === "connected") {
        try { lvOut += ((conv.getOutputVolume() || 0) - lvOut) * 0.3; lvIn += ((conv.getInputVolume() || 0) - lvIn) * 0.3; } catch (e) {}
      } else { lvOut *= 0.9; lvIn *= 0.9; }
      if (visible) scales.draw(now, lvIn, lvOut, state === "connected", reduce);
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    function setState(s, key) { state = s; if (key) statusKey = key; render(); }

    async function start() {
      errKey = null; msgs = []; setState("connecting", "connecting");
      try {
        var mod = await import(SDK);
        conv = await mod.Conversation.startSession({
          agentId: agentId,
          connectionType: "webrtc",
          overrides: { agent: { language: lang } },
          onConnect: function () { muted = false; setState("connected", "listening"); track("ylb_intake_start"); },
          onDisconnect: function () { conv = null; setState("idle", "ended"); },
          onModeChange: function (p) { if (state === "connected") { statusKey = p.mode === "speaking" ? "speaking" : "listening"; render(); } },
          onMessage: function (p) { if (p && p.message) { msgs.push({ src: p.source === "ai" ? "ai" : "user", text: p.message }); render(); } },
          onError: function (m) { console.warn("[ylb-intake]", m); }
        });
      } catch (e) {
        conv = null;
        var denied = e && (e.name === "NotAllowedError" || /permission|denied/i.test(String(e.message || e)));
        errKey = denied ? "micDenied" : "error";
        setState("idle", "idle");
      }
    }
    async function stop() { if (conv) { setState("disconnecting", statusKey); try { await conv.endSession(); } catch (e) {} conv = null; setState("idle", "ended"); } }

    go.addEventListener("click", function () { if (state === "idle") start(); else if (state === "connected") stop(); });
    mute.addEventListener("click", function () { if (!conv) return; muted = !muted; try { conv.setMicMuted(muted); } catch (e) {} render(); });
    window.addEventListener("pagehide", function () { if (conv) { try { conv.endSession(); } catch (e) {} } });

    function track(ev) { try { if (window.gtag) gtag("event", ev, { agent: "ylb-legal", language: lang }); } catch (e) {} }

    render();
  }

  function init() {
    if (!document.getElementById("ylb-intake-css")) {
      var f = document.createElement("link"); f.rel = "stylesheet"; f.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&display=swap"; document.head.appendChild(f);
      var s = document.createElement("style"); s.id = "ylb-intake-css"; s.textContent = CSS; document.head.appendChild(s);
    }
    document.querySelectorAll("[data-ylb-intake]").forEach(mount);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
