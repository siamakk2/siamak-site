/* answer-console.js: re-types the illustrative AI answer when its console scrolls into view.
 * The full answer is already in the HTML, so search engines, AI crawlers and readers without
 * JavaScript see all of it. This only animates it. Honours prefers-reduced-motion.
 */
(function () {
  'use strict';
  var reduce = false;
  try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  var boxes = document.querySelectorAll('.askc-txt');
  if (!boxes.length || reduce || !('IntersectionObserver' in window)) return;
  [].forEach.call(boxes, function (el) {
    var full = el.innerHTML, text = el.textContent, meta = el.closest('.askc').querySelector('.askc-meta');
    el.textContent = ''; if (meta) meta.style.opacity = '0';
    var cur = document.createElement('span'); cur.className = 'askc-cur'; el.parentNode.appendChild(cur);
    var done = false;
    function finish() { el.innerHTML = full; cur.remove(); if (meta) { meta.style.transition = 'opacity .4s'; meta.style.opacity = '1'; } }
    var io = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting || done) return; done = true; io.disconnect();
      var i = 0;
      (function tick() { if (i > text.length) return finish(); el.textContent = text.slice(0, i); i += 2; setTimeout(tick, 18); })();
    }, { threshold: 0.4 });
    io.observe(el.closest('.askc'));
  });
})();
