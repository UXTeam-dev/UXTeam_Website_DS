# Handing pages to WordPress

The live site runs on the Salient theme. Pages built here use only the CSS that is already live, so there is nothing to clean up. Full rules: [CSS-GUIDE.md](CSS-GUIDE.md) section 7.

## What to hand over

After `npm run build`:

| From `dist/` | Where it goes |
|---|---|
| `wordpress/<page>.html` | One Salient **Raw HTML** element on the page. Paste it whole |
| `css/uxteam-site-additions.css` | Only if it has PARTs: paste at the **end** of Salient > Custom CSS, after PART R |
| `wordpress/footer-global.html` | Only if it changed: the footer global section (booking card and footer) |

Plus a list of new images to upload to the media library, with the paths the page uses (`/wp-content/uploads/<year>/<month>/<file>`).

## Things to know

- **No style blocks.** If a page here ever contains `<style>` or `style=""`, `npm run check` failed and the page is not ready.
- **Header and footer.** Salient's header and the footer global section stay as they are; the page body contains neither.
- **Booking card.** Every "Book a Discovery Call" button links to `#book-call`, the booking card in the footer global section.
- **Scripts.** The FAQ toggle and the header on scroll are the developers' site wide scripts. The What we do capabilities script is part of that page body. A new page never brings its own script.
- **Previews.** `dist/preview/` pages are for review only: a stand-in header, a stand-in FAQ script, images from new.ux.team. Never paste a preview file.
- **After a PART goes live,** the developers send back their updated Custom CSS so the repo stays in step (CSS-GUIDE section 8).

## Fonts

Aeonik loads from the theme (`/wp-content/themes/salient/fonts/Aeonik/`). Manrope and Besley load from Google Fonts through the first lines of the Custom CSS.
