/**
 * Site header: mobile menu toggle, and the scroll behavior.
 * Scroll: the bar scrolls away with the page. Scrolling up below the header
 * pins an Ink bar (.is-pinned) that slides in (.is-shown); scrolling down
 * slides it out; at the very top the transparent bar returns. While pinned,
 * the CTA uses Glass, as on dark heroes.
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
    var cta = header.querySelector('.ux-header__cta');
    var ctaClass = header.getAttribute('data-ux-cta') || 'ux-btn--glass';
    var lastY = window.scrollY;
    var ticking = false;

    function setPinned(on) {
      if (header.classList.contains('is-pinned') === on) return;
      header.classList.toggle('is-pinned', on);
      if (cta && ctaClass !== 'ux-btn--glass') {
        cta.classList.toggle(ctaClass, !on);
        cta.classList.toggle('ux-btn--glass', on);
      }
      if (!on) header.classList.remove('is-shown');
    }

    function update() {
      ticking = false;
      var y = window.scrollY;
      var delta = y - lastY;
      lastY = y;
      if (header.classList.contains('is-menu-open')) return;
      if (y <= 0) { setPinned(false); return; }
      if (Math.abs(delta) < 4) return;
      if (delta < 0 && y > header.offsetHeight) {
        if (!header.classList.contains('is-pinned')) {
          setPinned(true);
          void header.offsetWidth; // start from the hidden position so it slides in
        }
        header.classList.add('is-shown');
      } else if (delta > 0 && header.classList.contains('is-pinned')) {
        header.classList.remove('is-shown');
      }
    }

    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });

    header.querySelectorAll('.ux-nav__link--menu').forEach(function (btn) {
      btn.addEventListener('click', function () {
        btn.setAttribute('aria-expanded', btn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
      });
    });
  });
});
