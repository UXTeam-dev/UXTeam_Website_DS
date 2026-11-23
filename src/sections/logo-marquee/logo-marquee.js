/**
 * Logo marquee. Duplicates the logo list once so the CSS loop is seamless.
 * Markup: .ux-marquee[data-ux-marquee] > .ux-marquee__track > ul.ux-marquee__group
 */
UXTeam.register('logo-marquee', function (root) {
  root.querySelectorAll('[data-ux-marquee]').forEach(function (m) {
    if (m.dataset.uxReady) return;
    m.dataset.uxReady = '1';
    var track = m.querySelector('.ux-marquee__track');
    var group = track && track.querySelector('.ux-marquee__group');
    if (!group) return;
    var clone = group.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.querySelectorAll('img').forEach(function (img) { img.alt = ''; });
    track.appendChild(clone);
  });
});
