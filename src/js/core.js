/**
 * UXTeam DS core. Every component registers an init function here.
 * Components look for their own data attribute and do nothing when it is
 * missing, so the same bundle can load on every page.
 */
(function () {
  'use strict';
  var registry = [];
  window.UXTeam = {
    register: function (name, init) {
      registry.push({ name: name, init: init });
    },
    init: function (root) {
      root = root || document;
      registry.forEach(function (c) {
        try {
          c.init(root);
        } catch (e) {
          console.error('[UXTeam] ' + c.name + ' failed to start', e);
        }
      });
    },
    reducedMotion: function () {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  };
  document.addEventListener('DOMContentLoaded', function () {
    window.UXTeam.init(document);
  });
})();
