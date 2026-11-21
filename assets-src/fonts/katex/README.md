# KaTeX math fonts

These fonts match the KaTeX 0.15.2 stylesheet used by the book theme.
They are registered locally by the hyperbolic mean anomaly Matplotlib figure;
no system font installation is required. `bun run build:threejs` also copies these fonts and their license to
`assets/fonts/katex/` for interactive figures. The shared runtime awaits font
loading before drawing canvas labels; SVG figures use `assets/math-fonts.css`.
Variables use Math Italic, while prose, numerals, and subscripts use Main Regular.

Sources:

- <https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/fonts/KaTeX_Main-Regular.ttf>
- <https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/fonts/KaTeX_Math-Italic.ttf>
- <https://cdn.jsdelivr.net/npm/katex@0.15.2/LICENSE>

See LICENSE for the KaTeX license.

Validate the live labels and local font URLs in headed Chrome with
`node scripts/math-fonts-check.mjs`. While protected HTML changes await approval,
pass `--review-dir <directory>` to validate candidate HTML at matching
`chapters/...` paths without modifying the book sources. Screenshots are saved
under `_build/browser/math-fonts/`.
