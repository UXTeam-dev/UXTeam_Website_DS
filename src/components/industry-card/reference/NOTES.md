# Industry cards (SL-34) · creative reference

**Figma:** homepage `1968:7723`; components `1282:3567`, `1288:3741`, `1288:3826`, `1288:3865`. Screenshot: `desktop.webp`.

**Business point:** UXTeam has real depth in the industries the reader works in. The project count makes that depth concrete.

**Why it looks this way**
- A row of image tiles where one is open at a time. The open tile shows the description and the project count in Besley.
- Real product imagery per industry, not stock.
- Hover or focus opens a tile (450ms ease in out). Tablet shows a 2 by 2 grid with all descriptions; mobile stacks.

**What can vary**
- Industries, images, the focus point of each image (`--focus`), descriptions and counts.

**What must not change**
- One tile open at a time on desktop, keyboard accessible.
- Counts are real numbers only.
- The industries row is 1204 wide (2px outside the grid), as designed.
