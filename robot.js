/* ============================================================================
   robot.js — the desk robot, site-wide.

   A floating helper in the bottom-right corner. Bottom-left is taken by
   #talkBtn on two pages and bottom-centre by the ElevenLabs widget on 36, so
   the right corner is the only one free everywhere.

   Everything here is decorative and additive: the widget is built by this
   script and exists nowhere in the markup, so no page's HTML changes and a
   crawler reading the page with no JavaScript sees exactly what it saw
   before. Nothing it says is information that is not already on the site.

   It is a real <button> with a label, the panel is keyboard reachable and
   closes on Escape, and the whole thing stays still for anyone whose system
   asks for reduced motion.

   Self-contained on purpose: its styles are injected from here rather than
   living in type.css, so there is one file to remove if it is ever unwanted.
   ========================================================================= */
(function () {
  'use strict';

  if (window.__skRobot) return;           // never run twice
  window.__skRobot = true;

  var reduced = window.matchMedia &&
                window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- what he says, by where you are ---------- */
  var path = location.pathname.replace(/\/+$/, '') || '/';

  var LINES = {
    '/':                 ["Ask me what ChatGPT says about you.",
                           "That console is a real answer, not a mockup.",
                           "Forty years of instinct. Zero guesswork."],
    '/audit':            ["The scan takes about two minutes.",
                           "You'll see which models already know you."],
    '/contact-us':       ["He reads every message himself.",
                           "The specific ones get the best replies."],
    '/portfolio':        ["Seven products. All of them shipped.",
                           "Blue Moon went 100&times; over eight years."],
    '/about-us':         ["Forty years in market. One strange career.",
                           "Everything here was built, not just advised."],
    '/what-is-llmo':     ["LLMO is being named, not ranked.",
                           "There is no page two of an AI answer."],
    '/seo-vs-llmo':      ["SEO ranks a link. LLMO gets you named.",
                           "About 80% of the groundwork is shared."]
  };
  var FALLBACK = ["Need a hand finding something?",
                  "Ask an AI what it says about your business.",
                  "There is no page two of an AI answer."];
  var lines = LINES[path] || FALLBACK;

  /* ---------- where he can send people ----------
     Not a fixed four. There is a pool of destinations, and which five he
     offers depends on where the reader already is -- someone on an industry
     page wants the scan and the price, someone mid-article wants more
     reading, someone on /audit has already started and wants help reading
     the result. The current page is always dropped from the list. */
  var D = {
    audit:    { href: '/audit',                 label: 'Run my free AI scan' },
    ask:      { href: '/ask',                   label: 'Ask the AI advisor'  },
    llmo:     { href: '/what-is-llmo',          label: 'What is LLMO?'       },
    contact:  { href: '/contact-us',            label: 'Talk to Siamak'      },
    services: { href: '/services',              label: 'What I actually do'  },
    pricing:  { href: '/how-much-does-llmo-cost', label: 'What it costs'     },
    work:     { href: '/portfolio',             label: 'See the work'        },
    reading:  { href: '/the-long-view',         label: 'More like this'      },
    seo:      { href: '/seo-vs-llmo',           label: 'SEO vs LLMO'         },
    book:     { href: '/online-consulting',     label: 'Book a session'      },
    local:    { href: '/local',                 label: 'Check local visibility' },
    news:     { href: '/ai-marketing-news',     label: "What's changed lately" }
  };

  function pick() {
    if (path === '/')                       return [D.audit, D.ask, D.llmo, D.work, D.pricing];
    if (path === '/audit')                  return [D.ask, D.llmo, D.pricing, D.contact, D.work];
    if (path === '/contact-us')             return [D.audit, D.ask, D.work, D.pricing];
    if (path === '/ask')                    return [D.audit, D.llmo, D.contact, D.work];
    if (/-consultant$|^\/ai-for-/.test(path))
                                            return [D.audit, D.pricing, D.contact, D.work, D.local];
    if (/^\/the-long-view/.test(path))      return [D.reading, D.llmo, D.audit, D.ask, D.news];
    if (/budget|cost|pricing/.test(path))   return [D.audit, D.services, D.contact, D.book];
    if (/^\/listings|portfolio|bluemoon|textile/.test(path))
                                            return [D.work, D.contact, D.audit, D.services];
    return [D.audit, D.ask, D.llmo, D.services, D.contact];
  }

  var ACTIONS = pick()
    .filter(function (a) { return a.href !== path; })
    .slice(0, 5);

  /* ---------- styles ---------- */
  var css = [
'.sk-bot-root{position:fixed;right:20px;bottom:20px;z-index:9997;display:flex;',
'  flex-direction:column;align-items:flex-end;gap:10px;pointer-events:none;',
'  font-family:var(--mono,ui-monospace,monospace)}',
'.sk-bot-root *{box-sizing:border-box}',
'.sk-bot-say{pointer-events:none;max-width:232px;background:var(--surface,#111826);',
'  border:1px solid var(--line-bright,#465365);border-radius:13px 13px 3px 13px;',
'  padding:10px 13px;font-size:11.5px;line-height:1.6;color:var(--muted,#ccd6e2);',
'  box-shadow:0 16px 40px rgba(0,0,0,.55);opacity:0;transform:translateY(6px);',
'  transition:opacity .35s ease,transform .35s ease}',
'.sk-bot-say.on{opacity:1;transform:none}',
'.sk-bot-say b{color:var(--cyan,#2dd4ff);font-weight:600}',
'.sk-bot-btn{pointer-events:auto;width:76px;height:84px;padding:0;border:0;',
'  background:none;cursor:pointer;-webkit-tap-highlight-color:transparent;',
'  filter:drop-shadow(0 10px 22px rgba(0,0,0,.75)) drop-shadow(0 0 16px rgba(45,212,255,.30))}',
'.sk-bot-btn svg{width:100%;height:100%;overflow:visible;display:block}',
'.sk-bot-panel{pointer-events:auto;display:none;flex-direction:column;gap:2px;',
'  width:224px;background:var(--panel,#06080c);border:1px solid var(--line-bright,#465365);',
'  border-radius:14px;padding:8px;box-shadow:0 22px 60px rgba(0,0,0,.7)}',
'.sk-bot-panel.on{display:flex}',
'.sk-bot-panel a{display:block;padding:10px 12px;border-radius:9px;font-size:12px;',
'  color:var(--muted,#ccd6e2);text-decoration:none;transition:background .16s,color .16s}',
'.sk-bot-panel a:hover{background:var(--surface-2,#19222f);color:var(--text,#f9fbfe)}',
'.sk-bot-panel .sk-hd{font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;',
'  color:var(--muted-dim,#8fa0b4);padding:6px 12px 8px}',
/* the character */
/* He sat at #182230 with a #465365 outline -- a dark robot on a dark page,
   which is why only his eyes read. Lighter body, brighter outline, and a
   near-white face panel so the eyes have something to sit against. */
'.skb-body{fill:#2b3a4f;stroke:#8aa0bb;stroke-width:3}',
'.skb-plate{fill:#eef4ff;opacity:.26}',
'.skb-face{fill:#eef4ff;stroke:#b9cbe4;stroke-width:2}',
'.skb-eye{fill:#121c2b;transform-box:fill-box;transform-origin:center}',
'.skb-cheek{fill:#ff8a7a;opacity:.45}',
'.skb-smile{fill:none;stroke:var(--cyan,#2dd4ff);stroke-width:2.6;stroke-linecap:round;opacity:.85}',
'.skb-ant{stroke:var(--line-bright,#465365);stroke-width:2.5;stroke-linecap:round}',
'.skb-bulb{fill:#2dd4ff;filter:drop-shadow(0 0 8px rgba(45,212,255,.9))}',
'.skb-core{fill:none;stroke:#a06bff;stroke-width:2.4;opacity:.9;',
'  transform-box:fill-box;transform-origin:center}',
'.skb-dot{fill:#a06bff;opacity:.9}',
'.skb-arm{fill:#182230;stroke:var(--line-bright,#465365);stroke-width:2;',
'  transform-box:fill-box;transform-origin:top center}',
'@media(max-width:520px){.sk-bot-root{right:14px;bottom:14px}',
'  .sk-bot-btn{width:62px;height:70px}.sk-bot-say{max-width:196px;font-size:11px}}',
/* motion, only when it is welcome */
'@media(prefers-reduced-motion:no-preference){',
' .sk-bot-btn{animation:skb-bob 4.2s ease-in-out infinite}',
' .skb-eye{animation:skb-blink 5.4s infinite}',
' .skb-bulb{animation:skb-bulb 2.1s ease-in-out infinite}',
' .skb-core{animation:skb-spin 7s linear infinite}',
' .skb-arm-r{animation:skb-wave 4.2s ease-in-out infinite}',
'}',
'@keyframes skb-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}',
'@keyframes skb-blink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.08)}}',
'@keyframes skb-bulb{0%,100%{opacity:1}50%{opacity:.35}}',
'@keyframes skb-spin{to{transform:rotate(360deg)}}',
'@keyframes skb-wave{0%,62%,100%{transform:rotate(0)}70%{transform:rotate(-22deg)}',
'  78%{transform:rotate(-6deg)}86%{transform:rotate(-20deg)}}'
  ].join('\n');

  var style = document.createElement('style');
  style.id = 'sk-robot-css';
  style.textContent = css;
  document.head.appendChild(style);

  /* ---------- build ---------- */
  var root = document.createElement('div');
  root.className = 'sk-bot-root';

  var say = document.createElement('div');
  say.className = 'sk-bot-say';
  say.setAttribute('aria-hidden', 'true');

  var panel = document.createElement('div');
  panel.className = 'sk-bot-panel';
  panel.setAttribute('role', 'menu');
  panel.innerHTML = '<div class="sk-hd">Where to next?</div>' +
    ACTIONS.map(function (a) {
      return '<a role="menuitem" href="' + a.href + '">' + a.label + ' &rarr;</a>';
    }).join('');

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'sk-bot-btn';
  btn.setAttribute('aria-label', 'Open quick links');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML =
    '<svg viewBox="0 0 240 276" aria-hidden="true" focusable="false">' +
      '<path class="skb-ant" d="M120 46 L120 24"/>' +
      '<circle class="skb-bulb" cx="120" cy="18" r="7.5"/>' +
      '<rect class="skb-arm" x="38" y="150" width="20" height="62" rx="10"/>' +
      '<rect class="skb-arm skb-arm-r" id="skbArm" x="182" y="150" width="20" height="62" rx="10"/>' +
      '<rect class="skb-body" x="52" y="46" width="136" height="104" rx="34"/>' +
      '<rect class="skb-face" x="68" y="62" width="104" height="66" rx="26"/>' +
      '<g id="skbEyes">' +
        '<ellipse class="skb-eye" cx="100" cy="94" rx="9.5" ry="12"/>' +
        '<ellipse class="skb-eye" cx="140" cy="94" rx="9.5" ry="12"/>' +
      '</g>' +
      '<ellipse class="skb-cheek" cx="82" cy="112" rx="8" ry="5"/>' +
      '<ellipse class="skb-cheek" cx="158" cy="112" rx="8" ry="5"/>' +
      '<path class="skb-smile" d="M108 116 Q120 124 132 116"/>' +
      '<rect class="skb-body" x="62" y="158" width="116" height="96" rx="30"/>' +
      '<rect class="skb-plate" x="78" y="174" width="84" height="64" rx="22"/>' +
      '<circle class="skb-core" cx="120" cy="206" r="17" stroke-dasharray="22 14"/>' +
      '<circle class="skb-dot" cx="120" cy="206" r="6"/>' +
    '</svg>';

  root.appendChild(say);
  root.appendChild(panel);
  root.appendChild(btn);
  document.body.appendChild(root);

  var arm  = root.querySelector('#skbArm');
  var eyes = root.querySelector('#skbEyes');

  /* ---------- speech ---------- */
  var run = 0, idx = 0, idling = false;

  function speak(html, hold, then) {
    var token = ++run, tmp = document.createElement('div');
    tmp.innerHTML = html;
    var plain = tmp.textContent, n = 0;
    say.classList.add('on');
    say.innerHTML = '';
    if (reduced) {                         // no typing; just show it
      say.innerHTML = html;
      setTimeout(function () { if (token === run && then) then(); }, hold || 3200);
      return;
    }
    (function tick() {
      if (token !== run) return;
      n++;
      if (n >= plain.length) {
        say.innerHTML = html;
        setTimeout(function () { if (token === run && then) then(); }, hold || 3200);
        return;
      }
      say.textContent = plain.slice(0, n);
      setTimeout(tick, 26);
    })();
  }
  function hide() { run++; say.classList.remove('on'); }

  function idle() {
    if (panel.classList.contains('on')) return;
    idling = true;
    speak(lines[idx % lines.length], 4200, function () {
      idx++;
      hide();
      setTimeout(function () { if (idling) idle(); }, 9000);   // long pauses
    });
  }

  /* ---------- open / close ---------- */
  function open() {
    idling = false; hide();
    panel.classList.add('on');
    btn.setAttribute('aria-expanded', 'true');
    if (arm && !reduced) {
      arm.style.animation = 'none'; void arm.offsetWidth;
      arm.style.animation = 'skb-wave 1.1s ease-in-out 2';
    }
  }
  function close() {
    panel.classList.remove('on');
    btn.setAttribute('aria-expanded', 'false');
    idling = true;
    setTimeout(function () { if (idling) idle(); }, 7000);
  }
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    panel.classList.contains('on') ? close() : open();
  });
  document.addEventListener('click', function (e) {
    if (panel.classList.contains('on') && !root.contains(e.target)) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.classList.contains('on')) { close(); btn.focus(); }
  });

  /* his eyes follow the pointer, a little */
  if (!reduced) {
    window.addEventListener('pointermove', function (e) {
      var r = btn.getBoundingClientRect();
      var dx = e.clientX - (r.left + r.width / 2),
          dy = e.clientY - (r.top + r.height / 2),
          m  = Math.max(1, Math.sqrt(dx * dx + dy * dy));
      eyes.style.transform = 'translate(' + (dx / m * 4).toFixed(2) + 'px,' +
                                            (dy / m * 2.8).toFixed(2) + 'px)';
    }, { passive: true });
  }

  /* first line once the page has settled */
  idling = true;
  setTimeout(idle, 2600);
})();

/* ============================================================================
   3D touches, site-wide (rides along with the robot because this is the one
   script every page already loads).
     - Logo: turns in 3D with a slow sway; spins once on hover.
     - Robot: turns toward the pointer, and his eyes follow it.
     - Buttons: raised with a bevel, lean toward the pointer, press down.
   No position:fixed additions, no CSS filters, nothing for reduced motion.
   ========================================================================= */
(function () {
  'use strict';
  if (window.__sk3dUI) return; window.__sk3dUI = true;
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hover = window.matchMedia && matchMedia('(hover: hover)').matches;
  var css = [
    /* buttons: raised, bevelled, pressable (works on touch too) */
    '.btn,.nav-cta{transform-style:preserve-3d;will-change:transform}',
    '.btn-pri{box-shadow:inset 0 -3px 0 rgba(0,0,0,.22),inset 0 1px 0 rgba(255,255,255,.35),0 10px 24px -8px rgba(255,150,90,.55)}',
    '.sk3d-btn{transform:perspective(600px) translateY(-2px) rotateX(var(--bx,0deg)) rotateY(var(--by,0deg))}',
    '.btn:active,.nav-cta:active{transform:perspective(600px) translateY(1px) scale(.98)!important;transition:transform .06s}',
    '.btn-pri:active{box-shadow:inset 0 2px 4px rgba(0,0,0,.3),0 4px 10px -6px rgba(255,150,90,.5)}',
    /* logo */
    '.brand{perspective:500px}',
    '.brand img{transform-style:preserve-3d;transition:transform .9s cubic-bezier(.2,.8,.2,1)}',
    '@media(prefers-reduced-motion:no-preference){',
    ' .brand img{animation:sk3d-sway 7s ease-in-out infinite}',
    ' .brand:hover img{animation:sk3d-spin 1.1s cubic-bezier(.3,.7,.3,1) 1}',
    '}',
    '@keyframes sk3d-sway{0%,100%{transform:rotateY(-16deg) rotateX(4deg)}50%{transform:rotateY(16deg) rotateX(-4deg)}}',
    '@keyframes sk3d-spin{from{transform:rotateY(0)}to{transform:rotateY(360deg)}}',
    /* robot */
    '.sk-bot-btn{perspective:420px}',
    '.sk-bot-btn svg{transform:rotateY(var(--ty,0deg)) rotateX(var(--tx,0deg));transition:transform .35s ease-out;transform-style:preserve-3d}',
    '#skbEyes{transform:translate(var(--ex,0px),var(--ey,0px));transition:transform .2s ease-out}'
  ].join('\n');
  var st = document.createElement('style'); st.id = 'sk-3d-ui'; st.textContent = css;
  document.head.appendChild(st);
  if (reduced || !hover) return;

  var raf = 0, lx = 0, ly = 0;
  document.addEventListener('pointermove', function (e) {
    lx = e.clientX; ly = e.clientY;
    if (!raf) raf = requestAnimationFrame(tick);
    var b = e.target.closest && e.target.closest('.btn,.nav-cta');
    if (b) {
      var r = b.getBoundingClientRect();
      b.classList.add('sk3d-btn');
      b.style.setProperty('--by', (((lx - r.left) / r.width - 0.5) * 16).toFixed(1) + 'deg');
      b.style.setProperty('--bx', (-((ly - r.top) / r.height - 0.5) * 18).toFixed(1) + 'deg');
      if (!b._sk3d) { b._sk3d = 1; b.addEventListener('pointerleave', function () { b.classList.remove('sk3d-btn'); }); }
    }
  }, { passive: true });

  function tick() {
    raf = 0;
    var svg = document.querySelector('.sk-bot-btn svg');
    if (!svg) return;
    var r = svg.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    var dx = (lx - cx) / innerWidth, dy = (ly - cy) / innerHeight;
    var root = document.querySelector('.sk-bot-btn');
    root.style.setProperty('--ty', Math.max(-28, Math.min(28, dx * 60)).toFixed(1) + 'deg');
    root.style.setProperty('--tx', Math.max(-18, Math.min(18, -dy * 40)).toFixed(1) + 'deg');
    root.style.setProperty('--ex', Math.max(-7, Math.min(7, dx * 22)).toFixed(1) + 'px');
    root.style.setProperty('--ey', Math.max(-5, Math.min(5, dy * 16)).toFixed(1) + 'px');
  }
})();
