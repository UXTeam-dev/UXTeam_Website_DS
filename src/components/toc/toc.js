/**
 * Table of contents scroll spy + floating section menu (tablet, mobile).
 * Markup: nav.ux-toc[data-ux-toc] with links to #section ids, and an optional
 * .ux-section-menu[data-ux-section-menu] that mirrors the same links.
 */
UXTeam.register('toc', function (root) {
  root.querySelectorAll('[data-ux-toc]').forEach(function (toc) {
    if (toc.dataset.uxReady) return;
    toc.dataset.uxReady = '1';
    var links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));
    var sections = links.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
    var menu = document.querySelector('[data-ux-section-menu]');
    var menuLabel = menu && menu.querySelector('.ux-section-menu__label');
    var menuLinks = menu ? Array.prototype.slice.call(menu.querySelectorAll('a[href^="#"]')) : [];
    var scope = toc.closest('[data-ux-toc-scope]') || toc.parentElement;

    function setActive(id) {
      links.forEach(function (a) {
        var on = a.getAttribute('href') === '#' + id;
        a.classList.toggle('is-active', on);
        a.parentElement.classList.toggle('is-active', on);
        if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
      menuLinks.forEach(function (a) {
        var on = a.getAttribute('href') === '#' + id;
        a.classList.toggle('is-active', on);
        if (on && menuLabel) menuLabel.textContent = a.textContent;
      });
    }

    function onScroll() {
      var line = window.innerHeight * 0.3;
      var current = sections[0];
      sections.forEach(function (s) {
        if (s.getBoundingClientRect().top - line <= 0) current = s;
      });
      if (current) setActive(current.id);
      if (menu) {
        var r = scope.getBoundingClientRect();
        menu.classList.toggle('is-visible', r.top < window.innerHeight * 0.6 && r.bottom > window.innerHeight * 0.4);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    if (menu) {
      var toggle = menu.querySelector('.ux-section-menu__toggle');
      toggle.addEventListener('click', function () {
        var open = !menu.classList.contains('is-open');
        menu.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      menuLinks.forEach(function (a) {
        a.addEventListener('click', function () {
          menu.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
      document.addEventListener('click', function (e) {
        if (!menu.contains(e.target)) {
          menu.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });
});
