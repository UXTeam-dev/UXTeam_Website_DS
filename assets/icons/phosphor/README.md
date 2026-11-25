# Phosphor icons (Light)

UXTeam's icon set. Every new UI icon on the site comes from here.

- Source: `@phosphor-icons/core` 2.1.1 (https://github.com/phosphor-icons/core, site https://phosphoricons.com). MIT license, see `LICENSE`.
- Weight: **Light only.** At 32px its stroke is 1.5px and at 24px about 1.1px, which matches the UXTeam line style. Do not mix in Thin, Regular, Bold, Fill or Duotone.
- Designers: use the Phosphor Figma file or plugin, **Light** weight, the same names as here.
- `light/<name>.svg`: 1,512 icons, `viewBox="0 0 256 256"`, `fill="currentColor"`.
- `catalog.json`: every name with its tags and categories, for search.

## Find and use one

```
npm run icon -- shield            # search names and tags
npm run icon -- team people       # several words, best match first
```

```html
<span class="ux-icon-tile"><!-- @icon shield-check size="32" --></span>
```

The build inlines the SVG, so the icon takes the text color of its container (Navy on the tint tile, white on the Navy tile, Steel for meta icons). Do not use `<img src="…/phosphor/…">`: an image cannot take the color and renders black. Sizes and containers: `docs/GRAPHICS.md`, family 2.

Brand logos (category `brands`) are hidden from search; never use them as UI icons.

## Update the set

```
npm pack @phosphor-icons/core
tar xzf phosphor-icons-core-*.tgz
# copy package/assets/light/<name>-light.svg to light/<name>.svg, then rebuild catalog.json from package/dist/index.mjs
```
Note the new version here and in `CHANGELOG.md`.
