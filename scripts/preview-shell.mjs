/**
 * PREVIEW ONLY. The parts of a page that WordPress adds around the page body:
 * the site header (Salient's on the live site) and the booking card version
 * and overlap. Built to match the approved design (Figma SL-01, the old
 * legacy/src/sections/site-header and page-end), so previews and shared files
 * look like the real page. Nothing here goes to WordPress.
 *
 * Rules (LLM.md 16.5, 19.3 rows 2, 3, 53, 55):
 *  - Header: UXTeam logo, nav What We Do, UXAudit, Work, About, Insights,
 *    Contact (carets on What We Do, Work, About), Glass "Book a Discovery
 *    Call". No line under it. Scrolling up pins an Ink bar.
 *  - Booking card: homepage and hub pages use "Skip the layers, talk to the
 *    founder."; every other page uses "Let's talk about what you're building."
 *  - The booking card overlaps the top of the footer by 40px.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const ARROW = '<svg class="uxt-button-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const CARET = '<svg viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M14 8 9 13 4 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

/** Pages that use the homepage booking card (LLM.md 15.5). */
export const HOME_BOOKING_PAGES = new Set(['homepage.html', 'what-we-do.html']);

export function header(root) {
  const logo = readFileSync(join(root, 'assets', 'logos', 'uxteam-logo-white.svg'), 'utf8').trim()
    .replace(/<\?xml[^>]*>\s*/, '').replace('<svg ', '<svg class="preview-logo-svg" ');
  const item = (label, menu) => menu
    ? `<li><button class="preview-nav-link" type="button" aria-expanded="false">${label}${CARET}</button></li>`
    : `<li><a class="preview-nav-link" href="#">${label}</a></li>`;
  const nav = [['What We Do', 1], ['UXAudit'], ['Work', 1], ['About', 1], ['Insights'], ['Contact']];
  return `<!-- PREVIEW ONLY: the site header (Salient's on the live site). Not part of the page. -->
<div class="preview-header-slot">
<header class="preview-header" data-preview-header>
  <div class="preview-header-bar">
    <a class="preview-logo" href="#" aria-label="UXTeam home">${logo}</a>
    <nav class="preview-nav" aria-label="Main"><ul>${nav.map(([l, m]) => item(l, m)).join('')}</ul></nav>
    <div class="preview-actions">
      <a href="#book-call" class="uxt-button uxt-button-glass preview-cta"><span class="uxt-button-label"><span class="preview-cta-full">Book a Discovery Call</span><span class="preview-cta-short">Book a Call</span></span><span class="uxt-button-circle">${ARROW}${ARROW}</span></a>
      <button class="preview-toggle" type="button" aria-expanded="false" aria-controls="preview-mobile-nav" aria-label="Open menu"><span></span><span></span><span></span></button>
    </div>
  </div>
  <div class="preview-mobile-nav" id="preview-mobile-nav" hidden>
    <ul>${nav.map(([l]) => `<li><a href="#">${l}</a></li>`).join('')}</ul>
  </div>
</header>
</div>`;
}

export const CSS = `/* PREVIEW ONLY. Not part of uxteam-site.css. */
body{margin:0}
.preview-header-slot{height:92px;background:#0d1315}
.preview-header{position:relative;z-index:50;color:#fff;background:#0d1315;font-family:'Manrope',sans-serif}
.preview-header-bar{position:relative;display:flex;align-items:center;justify-content:space-between;height:92px;max-width:1200px;margin:0 auto;padding:0 120px;box-sizing:content-box}
.preview-logo{display:block;line-height:0}.preview-logo-svg{width:156px;height:38px}
.preview-nav{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}
.preview-nav ul{display:flex;align-items:center;gap:28px;margin:0;padding:0;list-style:none}
.preview-nav-link{display:inline-flex;align-items:center;gap:6px;padding:0;border:0;background:none;font:400 16px/1.6 'Manrope',sans-serif;color:#fff;text-decoration:none;white-space:nowrap;cursor:pointer;transition:opacity .2s}
.preview-nav-link:hover{opacity:.75}.preview-nav-link svg{width:18px;height:18px;transition:transform .2s}.preview-nav-link[aria-expanded=true] svg{transform:rotate(180deg)}
.preview-actions{display:flex;align-items:center;gap:16px}
.preview-cta-short{display:none}
.preview-toggle{display:none;flex-direction:column;justify-content:center;gap:5px;width:30px;height:30px;padding:0 4px;border:0;background:none;color:#fff;cursor:pointer}
.preview-toggle span{display:block;height:2px;border-radius:2px;background:currentColor;transition:transform .2s,opacity .2s}
.preview-toggle[aria-expanded=true] span:nth-child(1){transform:translateY(7px) rotate(45deg)}.preview-toggle[aria-expanded=true] span:nth-child(2){opacity:0}.preview-toggle[aria-expanded=true] span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
.preview-header.is-pinned{position:fixed;top:0;left:0;right:0;box-shadow:0 8px 24px rgba(8,18,25,.18);transform:translateY(-100%);transition:transform .3s ease-out}
.preview-header.is-pinned.is-shown{transform:translateY(0)}
.preview-mobile-nav{padding:8px 40px 32px;background:#0d1315}.preview-mobile-nav[hidden]{display:none}
.preview-mobile-nav ul{margin:0;padding:0;list-style:none}
.preview-mobile-nav a{display:block;padding:14px 0;border-bottom:1px solid rgba(255,255,255,.12);font:500 22px/1.3 'Aeonik','Manrope',sans-serif;color:#fff;text-decoration:none}
@media (max-width:1199px){.preview-nav,.preview-cta{display:none!important}.preview-toggle{display:flex}.preview-logo-svg{width:123px;height:30px}.preview-header-bar{padding:0 40px}}
@media (max-width:999px){.preview-header-slot,.preview-header-bar{height:70px}}
@media (max-width:767px){.preview-header-bar{padding:0 15px}.preview-mobile-nav{padding:8px 15px 32px}.preview-cta{display:inline-flex!important}.preview-cta-full{display:none}.preview-cta-short{display:inline}}
@media (prefers-reduced-motion:reduce){.preview-header.is-pinned{transition:none}}
/* Booking card overlaps the top of the footer by 40px (LLM.md 9.1, 16.5) */
#book-call.uxt-cta{position:relative;z-index:2;padding-bottom:0!important;margin-bottom:-40px!important}`;

export const JS = `<!-- PREVIEW ONLY: header menu and scroll behaviour (Salient and PART O on the live site). -->
<script>
(function () {
  var h = document.querySelector('[data-preview-header]'); if (!h) return;
  var t = h.querySelector('.preview-toggle'), p = h.querySelector('.preview-mobile-nav');
  t.addEventListener('click', function () { var o = t.getAttribute('aria-expanded') !== 'true'; t.setAttribute('aria-expanded', String(o)); t.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); p.hidden = !o; h.classList.toggle('is-menu-open', o); });
  h.querySelectorAll('button.preview-nav-link').forEach(function (b) { b.addEventListener('click', function () { b.setAttribute('aria-expanded', b.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'); }); });
  var last = window.scrollY, tick = false;
  function pin(on) { if (h.classList.contains('is-pinned') === on) return; h.classList.toggle('is-pinned', on); if (!on) h.classList.remove('is-shown'); }
  function update() { tick = false; var y = window.scrollY, d = y - last; last = y; if (h.classList.contains('is-menu-open')) return;
    if (y <= 0) { pin(false); return; } if (Math.abs(d) < 4) return;
    if (d < 0 && y > 92) { if (!h.classList.contains('is-pinned')) { pin(true); void h.offsetWidth; } h.classList.add('is-shown'); }
    else if (d > 0 && h.classList.contains('is-pinned')) h.classList.remove('is-shown'); }
  window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(update); } }, { passive: true });
})();
</script>`;

/** The footer global section with the booking card version for this page. */
export function footerFor(page, footer) {
  if (HOME_BOOKING_PAGES.has(page)) return footer;
  return footer.replace('<h2 class="uxt-h2">Skip the layers, talk to the founder.</h2>', '<h2 class="uxt-h2">Let\'s talk about what you\'re building.</h2>');
}
