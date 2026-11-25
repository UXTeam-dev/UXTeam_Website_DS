/**
 * FAQ accordion. Markup: [data-ux-faq] > .ux-faq__item > button.ux-faq__question + .ux-faq__panel
 * One item open per list. Panel height animates (420ms, set in CSS).
 */
UXTeam.register('faq', function (root) {
  root.querySelectorAll('[data-ux-faq]').forEach(function (list) {
    if (list.dataset.uxReady) return;
    list.dataset.uxReady = '1';
    var items = Array.prototype.slice.call(list.querySelectorAll('.ux-faq__item'));

    function setOpen(item, open) {
      var btn = item.querySelector('.ux-faq__question');
      var panel = item.querySelector('.ux-faq__panel');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        item.classList.add('is-open');
        panel.style.height = panel.scrollHeight + 'px';
      } else {
        panel.style.height = panel.scrollHeight + 'px';
        panel.offsetHeight; // force layout so the close animates
        item.classList.remove('is-open');
        panel.style.height = '0px';
      }
    }

    items.forEach(function (item, i) {
      var btn = item.querySelector('.ux-faq__question');
      var panel = item.querySelector('.ux-faq__panel');
      var id = panel.id || 'ux-faq-' + Math.random().toString(36).slice(2, 8) + '-' + i;
      panel.id = id;
      btn.setAttribute('aria-controls', id);
      var startOpen = item.classList.contains('is-open');
      btn.setAttribute('aria-expanded', startOpen ? 'true' : 'false');
      panel.style.height = startOpen ? 'auto' : '0px';

      panel.addEventListener('transitionend', function (e) {
        if (e.propertyName === 'height' && item.classList.contains('is-open')) {
          panel.style.height = 'auto';
        }
      });

      btn.addEventListener('click', function () {
        var willOpen = !item.classList.contains('is-open');
        items.forEach(function (other) {
          if (other !== item && other.classList.contains('is-open')) setOpen(other, false);
        });
        setOpen(item, willOpen);
      });
    });
  });
});
