# Moving pages into WordPress

The pages are plain HTML, CSS and JS, so they move into WordPress without a rewrite.

## What to take

After `npm run build`, everything is in `dist/`:

| From `dist/` | Put it in the theme |
|---|---|
| `css/uxteam.css` | Enqueue once, site wide |
| `js/uxteam.js` | Enqueue once, site wide, in the footer with `defer` |
| `assets/` | The theme's assets folder (or the media library for images) |
| `pages/*.html` | Copy the markup between `<body>` and the scripts into templates or blocks |

Example in `functions.php`:

```php
add_action('wp_enqueue_scripts', function () {
  $dir = get_stylesheet_directory_uri() . '/uxteam';
  wp_enqueue_style('uxteam', $dir . '/css/uxteam.css', [], '1.0.0');
  wp_enqueue_script('uxteam', $dir . '/js/uxteam.js', [], '1.0.0', ['strategy' => 'defer', 'in_footer' => true]);
});
```

## Things to know

- **No clashes.** Every class starts with `ux-` and every CSS variable with `--ux-`, so theme and plugin styles do not collide. The reset in `src/base/reset.css` is small and only targets plain elements (box sizing, margins, images). If the theme ships its own reset, test the pages once and keep whichever one wins.
- **Asset paths.** Pages use `../assets/…`. Change them to the theme path (or `get_stylesheet_directory_uri()`) when you split them into templates.
- **Header and footer** are sections (`site-header`, `site-footer`). Put them in `header.php` and `footer.php`, or as reusable blocks.
- **Repeating content** maps cleanly to WordPress loops: story cards, blog cards and FAQ items each come from one partial, so the partial markup is the loop template.
- **JavaScript** starts itself. Each feature looks for its `data-ux-*` attribute, so a page without a FAQ simply skips the FAQ code.
- **Booking form.** The form has `data-calendly=""`. Put the Calendly link there; the script checks the email and then sends the visitor to Calendly with the details filled in.
- **Video.** On the featured story, set `data-video` to an MP4 URL or `data-embed` to a YouTube or Vimeo embed URL.
- **Builder plugins (Salient).** Layouts are simple rows and columns on purpose, so each section can also be rebuilt as a row with the same classes added in the row's CSS class field.

## Fonts

Aeonik is a licensed font. Put `Aeonik-Regular.woff2` and `Aeonik-Medium.woff2` in `assets/fonts/aeonik/`. Until then headings fall back to Helvetica Neue or Arial. Manrope and Besley are open source (OFL) and already included.
