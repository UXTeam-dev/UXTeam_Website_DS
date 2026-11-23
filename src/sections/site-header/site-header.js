/**
 * Site header: mobile menu toggle.
 * Desktop dropdowns are not designed yet; the caret buttons only flip
 * aria-expanded so a future menu can hook in.
 */
UXTeam.register('site-header', function (root) {
  root.querySelectorAll('[data-ux-header]').forEach(function (header) {
    if (header.dataset.uxReady) return;
    header.dataset.uxReady = '1';
    var toggle = header.querySelector('.ux-header__toggle');
    var panel = header.querySelector('.ux-mobile-nav');
    if (toggle && panel) {
      toggle.addEventListener('click', function () {
        var open = toggle.getAttribute('aria-expanded') !== 'true';
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        panel.hidden = !open;
        header.classList.toggle('is-menu-open', open);
      });
    }
    header.querySelectorAll('.ux-nav__link--menu').forEach(function (btn) {
      btn.addEventListener('click', function () {
        btn.setAttribute('aria-expanded', btn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
      });
    });
  });
});
