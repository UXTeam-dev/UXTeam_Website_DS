/**
 * Video card. The play button swaps the still for a <video> (or an iframe
 * embed) when data-video is set on [data-ux-video]. Without a source the
 * button does nothing, so the card can ship before the video is ready.
 *   data-video="assets/video/brent-weaver.mp4"            (self hosted)
 *   data-embed="https://player.vimeo.com/video/ID?autoplay=1"  (Vimeo/YouTube)
 */
UXTeam.register('video-card', function (root) {
  root.querySelectorAll('[data-ux-video]').forEach(function (media) {
    if (media.dataset.uxReady) return;
    media.dataset.uxReady = '1';
    var btn = media.querySelector('.ux-play');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var src = media.dataset.video;
      var embed = media.dataset.embed;
      if (!src && !embed) return;
      var el;
      if (embed) {
        el = document.createElement('iframe');
        el.src = embed;
        el.allow = 'autoplay; fullscreen; picture-in-picture';
        el.setAttribute('allowfullscreen', '');
        el.title = btn.getAttribute('aria-label') || 'Video';
      } else {
        el = document.createElement('video');
        el.src = src;
        el.controls = true;
        el.autoplay = true;
        el.playsInline = true;
      }
      el.className = 'ux-video-card__video';
      media.appendChild(el);
      btn.hidden = true;
    });
  });
});
