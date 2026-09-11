/* ============================================================================
   console.js — the AI answer console from the homepage, as a reusable block.

   Drop anywhere in a page:

     <div class="ansbox"
          data-q="who's the best dentist in Sunland?"
          data-a="For families in Sunland, {cite}Sunland Dental Care{/cite} is
                  the practice most often named."
          data-sources="yelp.com, healthgrades.com"
          data-confidence="0.94"></div>

   {cite}…{/cite} marks the phrase to highlight — it types slower and lands in
   the accent colour, which is the moment the homepage version earns.

   Types when scrolled into view rather than on load, so a reader arrives at a
   blank console and watches it fill. Several can sit on one page; each runs
   once. prefers-reduced-motion gets the finished state immediately.

   Load with: <script defer src="/console.js"></script>
   ========================================================================== */
(function () {
  'use strict';

  var CSS = [
    '.ansbox{background:linear-gradient(180deg,var(--surface,#111826) 0%,var(--panel,#06080c) 100%);',
      'border:1px solid var(--line,#36414f);border-radius:14px;overflow:hidden;',
      'box-shadow:0 24px 60px rgba(0,0,0,.45);margin:34px 0}',
    '.ansbox-bar{display:flex;align-items:center;gap:8px;padding:12px 16px;',
      'border-bottom:1px solid var(--line,#36414f);background:var(--void,#000)}',
    '.ansbox-d{width:11px;height:11px;border-radius:50%;flex:0 0 auto}',
    '.ansbox-d.r{background:#ff5f57}.ansbox-d.y{background:#febc2e}.ansbox-d.g{background:#28c840}',
    '.ansbox-t{font-family:var(--mono,ui-monospace,monospace);font-size:12.5px;',
      'color:var(--muted-dim,#aab6c4);margin-left:6px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
    '.ansbox-live{margin-left:auto;font-family:var(--mono,ui-monospace,monospace);font-size:10.5px;',
      'color:var(--cyan,#2dd4ff);border:1px solid rgba(45,212,255,.3);padding:3px 9px;border-radius:5px;flex:0 0 auto}',
    '.ansbox-body{padding:20px 22px;font-family:var(--mono,ui-monospace,monospace);',
      'font-size:14.5px;line-height:1.8}',
    '.ansbox-q{color:var(--muted,#ccd6e2)}',
    '.ansbox-you{color:var(--violet,#a06bff)}',
    '.ansbox-a{margin-top:13px;color:var(--text,#f9fbfe)}',
    '.ansbox-ai{color:var(--cyan,#2dd4ff);font-weight:600}',
    '.ansbox-cite{color:var(--cyan,#2dd4ff);text-decoration:none;',
      'border-bottom:1px solid rgba(45,212,255,.45)}',
    '.ansbox-cur{display:inline-block;width:8px;height:15px;background:var(--cyan,#2dd4ff);',
      'margin-left:2px;vertical-align:middle;animation:ansboxblink 1s step-end infinite}',
    '@keyframes ansboxblink{0%,100%{opacity:1}50%{opacity:0}}',
    '.ansbox-meta{margin-top:16px;padding-top:13px;border-top:1px solid var(--line,#36414f);',
      'display:flex;gap:18px;flex-wrap:wrap;font-family:var(--mono,ui-monospace,monospace);',
      'font-size:11.5px;color:var(--muted-dim,#aab6c4);opacity:0;transition:opacity .6s}',
    '.ansbox-meta b{color:var(--cyan,#2dd4ff);font-weight:500}',
    '@media(max-width:640px){.ansbox-body{padding:16px 15px;font-size:13.5px}',
      '.ansbox-t{font-size:11.5px}}',
    '@media(prefers-reduced-motion:reduce){.ansbox-cur{animation:none}}'
  ].join('');

  var D = document;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  // Split the answer into plain and cited segments so the cited phrase can be
  // typed more slowly and styled, the way the homepage console does.
  function parse(raw) {
    var parts = [], re = /\{cite\}([\s\S]*?)\{\/cite\}/g, last = 0, m;
    while ((m = re.exec(raw)) !== null) {
      if (m.index > last) parts.push({ cite: false, text: raw.slice(last, m.index) });
      parts.push({ cite: true, text: m[1] });
      last = re.lastIndex;
    }
    if (last < raw.length) parts.push({ cite: false, text: raw.slice(last) });
    return parts.length ? parts : [{ cite: false, text: raw }];
  }

  function html(parts, upto) {
    var out = '', seen = 0;
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      if (seen >= upto) break;
      var take = Math.min(p.text.length, upto - seen);
      var chunk = esc(p.text.slice(0, take));
      out += p.cite ? '<span class="ansbox-cite">' + chunk + '</span>' : chunk;
      seen += take;
    }
    return out;
  }

  function build(el) {
    var q = el.getAttribute('data-q') || '';
    var raw = (el.getAttribute('data-a') || '').replace(/\s+/g, ' ').trim();
    var title = el.getAttribute('data-title') || 'generative-answer.engine';
    var sources = el.getAttribute('data-sources') || '';
    var conf = el.getAttribute('data-confidence') || '';

    var meta = '';
    if (sources) meta += '<span>sources: <b>' + esc(sources) + '</b></span>';
    meta += '<span>grounded: <b>yes</b></span>';
    if (conf) meta += '<span>confidence: <b>' + esc(conf) + '</b></span>';

    el.setAttribute('role', 'figure');
    el.setAttribute('aria-label', 'Example AI answer to: ' + q);
    el.innerHTML =
      '<div class="ansbox-bar">' +
        '<span class="ansbox-d r"></span><span class="ansbox-d y"></span><span class="ansbox-d g"></span>' +
        '<span class="ansbox-t">' + esc(title) + '</span>' +
        '<span class="ansbox-live">LIVE</span>' +
      '</div>' +
      '<div class="ansbox-body">' +
        '<div class="ansbox-q"><span class="ansbox-you">user &#10095;</span> ' + esc(q) + '</div>' +
        '<div class="ansbox-a"><span class="ansbox-ai">assistant &#10095;</span> ' +
          '<span class="ansbox-typed"></span><span class="ansbox-cur"></span></div>' +
        '<div class="ansbox-meta">' + meta + '</div>' +
      '</div>';

    return { parts: parse(raw), total: raw.replace(/\{\/?cite\}/g, '').length,
             typed: el.querySelector('.ansbox-typed'),
             cur: el.querySelector('.ansbox-cur'),
             meta: el.querySelector('.ansbox-meta') };
  }

  function finish(ctx) {
    ctx.typed.innerHTML = html(ctx.parts, ctx.total);
    ctx.meta.style.opacity = '1';
    ctx.cur.style.display = 'none';
  }

  function run(ctx) {
    var i = 0;
    // Where the cited phrase begins and ends, so it can be typed slower.
    var citeStart = 0, citeEnd = 0, seen = 0;
    ctx.parts.forEach(function (p) {
      if (p.cite && !citeEnd) { citeStart = seen; citeEnd = seen + p.text.length; }
      seen += p.text.length;
    });
    (function tick() {
      if (i > ctx.total) { finish(ctx); return; }
      ctx.typed.innerHTML = html(ctx.parts, i);
      i++;
      var speed = (i > citeStart && i <= citeEnd) ? 58 : 17;
      setTimeout(tick, speed);
    })();
  }

  function init() {
    var boxes = D.querySelectorAll('.ansbox');
    if (!boxes.length) return;

    var st = D.createElement('style');
    st.textContent = CSS;
    D.head.appendChild(st);

    var reduce = false;
    try { reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches; } catch (e) {}

    for (var i = 0; i < boxes.length; i++) {
      (function (el) {
        var ctx = build(el);
        if (reduce || !window.IntersectionObserver) { finish(ctx); return; }
        var seenOnce = false;
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting && !seenOnce) {
              seenOnce = true;
              io.disconnect();
              setTimeout(function () { run(ctx); }, 260);
            }
          });
        }, { threshold: 0.35 });
        io.observe(el);
      })(boxes[i]);
    }
  }

  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', init);
  else init();
})();
