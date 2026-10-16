/* form-guard.js: stamps every form post to the site's own API with the time spent on the page.
 * Real visitors take several seconds to fill a form; bots post instantly or skip the page
 * entirely and call the API directly. The server (api/_bot.js) uses this stamp, together
 * with hidden honeypot fields and a gibberish-name check, to drop bot submissions quietly.
 * Nothing here is visible or changes how any form behaves for a person.
 */
(function () {
  'use strict';
  if (!window.fetch || window.__formGuard) return; window.__formGuard = 1;
  var GUARDED = /^\/api\/(contact|leads|book|academy)(\?|$)/;
  var orig = window.fetch;
  window.fetch = function (input, init) {
    try {
      var url = typeof input === 'string' ? input : (input && input.url) || '';
      var path = url.replace(/^https?:\/\/[^/]+/, '');
      if (GUARDED.test(path) && init && typeof init.body === 'string' && init.body.charAt(0) === '{') {
        var b = JSON.parse(init.body);
        if (b && typeof b === 'object' && b._ft === undefined) {
          b._ft = Math.round(performance.now());
          init = Object.assign({}, init, { body: JSON.stringify(b) });
        }
      }
    } catch (e) { /* never block a real submission */ }
    return orig.call(this, input, init);
  };
})();
