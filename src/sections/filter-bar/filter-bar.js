/**
 * Filter chips. Markup:
 *   <div data-ux-filter="#grid-id"> <button class="ux-chip" data-filter="all|Category"> ...
 *   items in the grid carry data-category="Category"
 * Clicking a chip shows matching items. Static pages only; in WordPress
 * replace with taxonomy links.
 */
UXTeam.register('filter-bar', function (root) {
  root.querySelectorAll('[data-ux-filter]').forEach(function (bar) {
    if (bar.dataset.uxReady) return;
    bar.dataset.uxReady = '1';
    var grid = document.querySelector(bar.dataset.uxFilter);
    if (!grid) return;
    var chips = Array.prototype.slice.call(bar.querySelectorAll('[data-filter]'));
    var empty = grid.parentElement.querySelector('.ux-filter-empty');
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var f = chip.dataset.filter;
        chips.forEach(function (c) {
          var on = c === chip;
          c.classList.toggle('is-active', on);
          c.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        var shown = 0;
        grid.querySelectorAll('[data-category]').forEach(function (item) {
          var match = f === 'all' || item.dataset.category === f;
          item.hidden = !match;
          if (match) shown++;
        });
        if (empty) empty.hidden = shown > 0;
      });
    });
  });
});
