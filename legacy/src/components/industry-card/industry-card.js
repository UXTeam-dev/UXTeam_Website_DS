/**
 * Industry cards. Markup: [data-ux-industries] > .ux-industry (one has .is-open)
 * Hover or focus a tile to open it. Desktop only (tablet/mobile show all).
 */
UXTeam.register('industry-cards', function (root) {
  root.querySelectorAll('[data-ux-industries]').forEach(function (row) {
    if (row.dataset.uxReady) return;
    row.dataset.uxReady = '1';
    var tiles = Array.prototype.slice.call(row.querySelectorAll('.ux-industry'));
    function open(tile) {
      tiles.forEach(function (t) {
        t.classList.toggle('is-open', t === tile);
      });
    }
    tiles.forEach(function (tile) {
      tile.addEventListener('mouseenter', function () { open(tile); });
      tile.addEventListener('focusin', function () { open(tile); });
    });
  });
});
