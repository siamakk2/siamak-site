/* Your Legal Brain — branded voice intake console.
 * Reusable across the industry series: drop <div data-ylb-intake data-agent="agent_..." data-name="..." data-langs="en,es,fa,hy"></div>
 * on any page and include this script. Voice runs on the ElevenLabs Agents platform under the hood. */
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

  var CSS = '.ylb{--y-bg:var(--panel,#06080c);--y-sf:var(--surface,#111826);--y-ln:var(--line,#36414f);--y-tx:var(--text,#f9fbfe);--y-mu:var(--muted,#ccd6e2);--y-c:var(--cyan,#2dd4ff);--y-v:var(--violet,#a06bff);max-width:780px;margin:26px 0 8px;background:linear-gradient(180deg,var(--y-sf) 0%,var(--y-bg) 100%);border:1px solid var(--y-ln);border-radius:14px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.55),0 0 0 1px rgba(45,212,255,.05);color:var(--y-tx);font-family:var(--body,Inter,system-ui,sans-serif)}'
    + '.ylb-bar{display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid var(--y-ln);background:var(--void,#000)}'
    + '.ylb-bar .n{font-family:var(--mono,monospace);font-size:11px;color:var(--y-mu);letter-spacing:.04em}'
    + '.ylb-bar .s{margin-left:auto;font-family:var(--mono,monospace);font-size:10px;padding:3px 9px;border-radius:5px;border:1px solid rgba(45,212,255,.3);color:var(--y-c);display:inline-flex;gap:6px;align-items:center}'
    + '.ylb-bar .s i{width:6px;height:6px;border-radius:50%;background:currentColor;display:inline-block}'
    + '.ylb[data-state="connected"] .ylb-bar .s i{animation:ylb-pulse 1.2s ease-in-out infinite}'
    + '@keyframes ylb-pulse{50%{opacity:.25}}'
    + '.ylb-langs{display:flex;flex-wrap:wrap;gap:6px;padding:14px 16px 0}'
    + '.ylb-langs .lb{font-family:var(--mono,monospace);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--y-mu);align-self:center;margin-inline-end:6px}'
    + '.ylb-langs button{all:unset;cursor:pointer;font-size:13.5px;padding:6px 12px;border-radius:999px;border:1px solid var(--y-ln);color:var(--y-mu)}'
    + '.ylb-langs button[aria-pressed="true"]{color:var(--y-tx);border-color:var(--y-c);background:rgba(45,212,255,.08)}'
    + '.ylb-langs button:disabled{opacity:.45;cursor:not-allowed}'
    + '.ylb-langs button:focus-visible,.ylb-btn:focus-visible{outline:2px solid var(--y-c);outline-offset:2px}'
    + '.ylb-main{display:grid;grid-template-columns:220px 1fr;gap:18px;padding:16px}'
    + '.ylb-stage{display:grid;justify-items:center;gap:12px;align-content:start}'
    + '.ylb-orb{width:180px;height:180px;max-width:100%}'
    + '.ylb-status{font-family:var(--mono,monospace);font-size:12px;color:var(--y-mu);text-align:center;min-height:1.5em}'
    + '.ylb-ctrls{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}'
    + '.ylb-btn{all:unset;cursor:pointer;font-weight:600;font-size:14px;padding:10px 16px;border-radius:999px;text-align:center}'
    + '.ylb-btn.go{background:linear-gradient(135deg,var(--y-c),var(--y-v));color:#04060a}'
    + '.ylb-btn.stop{background:rgba(255,95,87,.14);color:#ff8a83;border:1px solid rgba(255,95,87,.4)}'
    + '.ylb-btn.ghost{border:1px solid var(--y-ln);color:var(--y-mu);font-weight:500}'
    + '.ylb-log{min-width:0;background:rgba(0,0,0,.35);border:1px solid var(--y-ln);border-radius:10px;padding:12px 14px;height:260px;overflow-y:auto;display:flex;flex-direction:column;gap:10px;font-size:14px;line-height:1.55}'
    + '.ylb-log .e{color:var(--y-mu);font-family:var(--mono,monospace);font-size:12px;margin:auto 0;text-align:center}'
    + '.ylb-log .m b{display:block;font-family:var(--mono,monospace);font-size:10px;letter-spacing:.1em;text-transform:uppercase;margin-bottom:2px}'
    + '.ylb-log .m.ai b{color:var(--y-c)} .ylb-log .m.user b{color:var(--y-v)}'
    + '.ylb-note{padding:0 16px 16px;font-size:12px;line-height:1.6;color:var(--y-mu)}'
    + '.ylb-err{color:#ff8a83}'
    + '.ylb [hidden]{display:none!important}'
    + '.ylb:is([lang="fa"],[lang="hy"]) :is(.ylb-status,.ylb-log .e,.ylb-langs .lb,.ylb-log .m b){font-family:inherit;letter-spacing:0;text-transform:none}'
    + '@media(max-width:640px){.ylb-main{grid-template-columns:1fr}.ylb-log{height:220px}}'
    + '@media(prefers-reduced-motion:reduce){.ylb[data-state="connected"] .ylb-bar .s i{animation:none}}';

  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }

  function mount(root) {
    var agentId = root.getAttribute("data-agent");
    var name = root.getAttribute("data-name") || "ylb.intake";
    var langs = (root.getAttribute("data-langs") || "en,es,fa,hy").split(",").filter(function (l) { return T[l]; });
    var lang = langs[0], conv = null, muted = false, state = "idle", raf = 0;

    root.classList.add("ylb");
    root.setAttribute("role", "region");
    root.setAttribute("aria-label", "Voice intake assistant");

    var bar = el("div", "ylb-bar"); var nm = el("span", "n", name); var st = el("span", "s"); st.appendChild(el("i")); var stTxt = el("span", null, "READY"); st.appendChild(stTxt);
    bar.appendChild(nm); bar.appendChild(st);

    var lw = el("div", "ylb-langs"); var lbl = el("span", "lb"); lw.appendChild(lbl);
    var lbtns = langs.map(function (l) {
      var b = el("button", null, T[l].label); b.type = "button"; b.lang = l; if (l === "fa") b.dir = "rtl";
      b.addEventListener("click", function () { lang = l; render(); });
      lw.appendChild(b); return b;
    });

    var main = el("div", "ylb-main");
    var stage = el("div", "ylb-stage");
    var cv = el("canvas", "ylb-orb"); cv.width = 360; cv.height = 360; cv.setAttribute("aria-hidden", "true");
    var status = el("div", "ylb-status"); status.setAttribute("aria-live", "polite");
    var ctrls = el("div", "ylb-ctrls");
    var go = el("button", "ylb-btn go"); go.type = "button";
    var mute = el("button", "ylb-btn ghost"); mute.type = "button"; mute.hidden = true;
    ctrls.appendChild(go); ctrls.appendChild(mute);
    stage.appendChild(cv); stage.appendChild(status); stage.appendChild(ctrls);
    var log = el("div", "ylb-log"); log.setAttribute("aria-live", "polite");
    main.appendChild(stage); main.appendChild(log);
    var note = el("p", "ylb-note");

    root.appendChild(bar); root.appendChild(lw); root.appendChild(main); root.appendChild(note);

    var msgs = [], statusKey = "idle", errKey = null;

    function render() {
      var t = T[lang];
      root.dir = lang === "fa" ? "rtl" : "ltr"; root.lang = lang;
      lbl.textContent = t.pick;
      lbtns.forEach(function (b) { b.setAttribute("aria-pressed", String(b.lang === lang)); b.disabled = state !== "idle"; });
      go.textContent = state === "idle" ? t.start : t.end;
      go.className = "ylb-btn " + (state === "idle" ? "go" : "stop");
      go.disabled = state === "connecting";
      mute.hidden = state !== "connected"; mute.textContent = muted ? t.unmute : t.mute;
      status.textContent = errKey ? t[errKey] : t[statusKey];
      status.className = "ylb-status" + (errKey ? " ylb-err" : "");
      stTxt.textContent = state === "connected" ? "LIVE" : state === "connecting" ? "…" : "READY";
      root.setAttribute("data-state", state);
      note.textContent = t.notice;
      log.innerHTML = "";
      if (!msgs.length) { log.appendChild(el("div", "e", t.empty)); }
      msgs.forEach(function (m) { var d = el("div", "m " + m.src); d.appendChild(el("b", null, m.src === "ai" ? t.agent : t.you)); d.appendChild(document.createTextNode(m.text)); log.appendChild(d); });
      log.scrollTop = log.scrollHeight;
    }

    /* orb: two blended gradients that swell with agent output and caller input */
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    var ctx = cv.getContext("2d"), t0 = performance.now(), lvIn = 0, lvOut = 0;
    function draw(now) {
      var w = cv.width, h = cv.height, cx = w / 2, cy = h / 2, tt = (now - t0) / 1000;
      if (conv && state === "connected") {
        try { lvOut += ((conv.getOutputVolume() || 0) - lvOut) * 0.25; lvIn += ((conv.getInputVolume() || 0) - lvIn) * 0.25; } catch (e) {}
      } else { lvOut *= 0.9; lvIn *= 0.9; }
      ctx.clearRect(0, 0, w, h);
      var base = 110 + (reduce ? 0 : Math.sin(tt * 1.6) * 4) + lvOut * 40 + lvIn * 18;
      var halo = ctx.createRadialGradient(cx, cy, base * 0.6, cx, cy, base * 1.6);
      halo.addColorStop(0, "rgba(45,212,255,0.18)"); halo.addColorStop(1, "rgba(45,212,255,0)");
      ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(cx, cy, base * 1.6, 0, Math.PI * 2); ctx.fill();
      var ox = reduce ? 0 : Math.cos(tt * 0.9) * 18, oy = reduce ? 0 : Math.sin(tt * 0.7) * 18;
      var g = ctx.createRadialGradient(cx - 30 + ox, cy - 40 + oy, 10, cx, cy, base);
      g.addColorStop(0, "#bdf3ff"); g.addColorStop(0.35, "#2dd4ff"); g.addColorStop(0.8, "#a06bff"); g.addColorStop(1, "#3b2a7a");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, base, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255," + (0.12 + lvOut * 0.5) + ")"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(cx, cy, base + 8 + lvIn * 20, 0, Math.PI * 2); ctx.stroke();
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

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

    function track(ev) { try { if (window.gtag) gtag("event", ev, { agent: name, language: lang }); } catch (e) {} }

    render();
  }

  function init() {
    if (!document.getElementById("ylb-intake-css")) { var s = document.createElement("style"); s.id = "ylb-intake-css"; s.textContent = CSS; document.head.appendChild(s); }
    document.querySelectorAll("[data-ylb-intake]").forEach(mount);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
