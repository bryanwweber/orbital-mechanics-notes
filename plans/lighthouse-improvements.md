# Lighthouse improvement plan

## Baseline

The saved Unlighthouse run measured 57 deployed URLs on November 22, 2026,
using Lighthouse 13.6 with simulated mobile throttling. Each URL has one
navigation sample. The run covers 56 of the 71 routes in the current local
sitemap and one additional URL. Use the [saved dashboard][dashboard] and
[homepage report][home] as the baseline evidence.

| Measure | Baseline |
| --- | --- |
| Performance score | Median 73, range 53–92 |
| Accessibility score | Median 84, range 82–86 |
| Best Practices score | 100 on all 57 |
| SEO score | 83 on all 57 |
| Total Blocking Time (TBT) | Median 523 ms, all 57 above 200 ms |
| Largest Contentful Paint (LCP) | Median 1.95 s, 21 pages above 4 s |
| Cumulative Layout Shift (CLS) | Median 0.091, 25 pages above 0.10 |
| Unused JavaScript during initial navigation | Median 721 KiB |

Before implementation, record the deployed revision, MyST CLI and theme
versions, browser version, viewport, and Lighthouse throttling settings. Build
and serve the production HTML for local testing, and use the deployed preview
to verify production-like routing and headers. Run a fresh baseline on final
URLs before comparing performance changes. Chapter source edits require
specific approval under [repository guidance][agents].

## 1. Fix shared mobile accessibility failures

The mobile search button, home logo, author links, and accessible names for
visible labels produced failures across all 57 pages. Fix shared components
first. The [homepage report][home] includes examples of each shared issue.

### Work

- [ ] Set `site.options.logo_alt` in [MyST config][myst] and confirm the theme
  applies it to both logo variants. Check the full home link name for duplicate
  or unrelated text.
- [ ] Give the search trigger a stable accessible name such as “Search” at
  every viewport width. Keep the dialog state and keyboard behavior intact.
- [ ] Increase the email and ORCID links from roughly 16 × 19 px to at least
  24 × 24 CSS px using the author-link styles. Keep the icons readable and the
  hit areas from overlapping.
- [ ] Update the author popover, previous/next links, and figure permalinks so
  their accessible names contain the rendered author name, navigation text,
  or figure number, respectively. Prefer deriving names from the visible
  content. Check punctuation and math in chapter titles.
- [ ] With chapter-edit approval, describe the diagram in *Sphere of
  Influence* and correct the header associations in the flagged *Planetary
  Ephemeris* and *Common Apse Line Example* tables. Inspect the generated
  markup before deciding whether the table fixes belong in the chapter source
  or the renderer.

### Verification

- [ ] Inspect accessible names and target bounds in the mobile browser
  accessibility tree. Repeat in light and dark mode and at a desktop width.
- [ ] Use the keyboard to open and close search and author details. Check
  visible focus and focus return. Read the table headers with a screen reader
  while navigating representative data cells.
- [ ] Re-run Lighthouse accessibility across the audited routes. Confirm that
  `button-name`, `image-alt`, `target-size`, and
  `label-content-name-mismatch` pass where applicable and that both flagged
  tables pass `td-has-header`.

## 2. Reduce theme JavaScript and render-blocking CSS

Initial script transfer was roughly 1 MiB on a typical page. The theme bundle
and `thebe-core.min.js` accounted for most of the 721 KiB median unused
JavaScript. The reported median render-blocking opportunity was 775 ms.
These are Lighthouse estimates for the measured navigation. [Homepage report][home]

### Work

- [ ] Capture a network waterfall, JavaScript coverage, and main-thread trace
  on the homepage, a text-heavy chapter, a page with static notebook outputs,
  and a page with rich outputs. Record the initiator for the Thebe request and
  identify which theme imports go into the shared bundle.
- [ ] Inventory the output formats used by the book. Load Thebe when a rich
  output or enabled notebook control needs it. Preserve rendering of static
  outputs and any passive MIME renderers in use. The current project already
  sets `jupyter: false`. Check direct loads and client-side navigation.
- [ ] Split optional theme features at their usage boundaries. Keep the
  server-rendered reading experience available while optional code loads.
- [ ] Identify where `mpl_widget.css` and Font Awesome are used. Scope the
  styles to the routes or features that depend on them. Keep essential layout
  and math styles available for first paint.
- [ ] Use *Hyperbolic Trajectories* and *Planetary Ephemeris* to investigate the
  slow LCP tail. Both reports identify article text as the LCP element. Compare
  filmstrips, stylesheet and font timing, layout shifts, and long tasks before
  deciding which assets to change. [Hyperbolic Trajectories report][hyperbolic]
  · [Planetary Ephemeris report][ephemeris]

### Verification

- [ ] Verify from the network log that plain reading pages skip optional
  requests and that rich outputs still load their dependencies when needed.
  Compare request counts, transferred script bytes, unused bytes, and
  render-blocking requests against the fresh baseline.
- [ ] Test search, theme switching, cross-references, code toggles, notebook
  outputs, and navigation between plain and rich-output pages. Check the console
  and inspect above-the-fold equations and layout before and after hydration.
- [ ] Repeat cold-load Lighthouse runs on the same final URLs and comparable
  builds. Compare median TBT, FCP, and LCP on the sample and check whether the
  count of pages above 4 s LCP falls in the full crawl.

## 3. Defer offscreen figures and prevent layout shifts

*Classical Orbital Elements* loads six Three.js iframe documents and recorded
2.45 s TBT. *Lagrange Points* transferred 4.0 MiB. The Kepler chapter's
*Elliptical Orbits* page recorded the largest CLS at 0.286.
[Three.js report][elements] · [Lagrange Points report][lagrange]
· [Elliptical Orbits report][elliptical]

### Work

- [ ] Trace the interactive figure path through the [HTML figure plugin][plugin],
  the MyST iframe renderer, and the existing [Three.js placeholders][threejs].
  Identify where to defer iframe creation or loading so offscreen scenes do
  not initialize WebGL during the initial page load.
- [ ] Use a fixed-aspect-ratio placeholder. Load each scene near the viewport
  or use a keyboard-operable activation control. Preserve the iframe title,
  caption, figure anchor, and placeholder used in static exports. Account for
  direct links to figures below the fold.
- [ ] On *Lagrange Points*, trace the JWST and WMAP trajectory images and the
  large generated plots back to their sources. Lazy-load below-the-fold
  images and generate responsive sizes or more efficient encodings where the
  diagrams remain legible. Apply changes at the source or generation step.
- [ ] Add intrinsic dimensions or an aspect ratio to the theme logo, images,
  and generated plot containers where missing. Inspect a browser performance
  trace of *Elliptical Orbits* and *Julian Date* to identify remaining layout
  shifts, including shifts around math font loading.

### Verification

- [ ] Confirm in a cold navigation trace that offscreen iframe documents and
  scene runtimes wait until the chosen trigger. Scroll to each figure and
  verify it loads once, its controls work, and its frame keeps the same size.
- [ ] Exercise figure links, resizing, keyboard activation where applicable,
  and navigation away and back. Run `bun run browser:threejs:static`,
  `bun run browser:threejs:chapters`, and `bun run browser:elements`.
  Verify the six orbital-element embeds in the built book as well.
- [ ] At mobile and desktop widths, inspect the delivered image variants and
  check plot labels and linework. Compare initial transfer and TBT on the two
  priority pages. Check CLS on *Elliptical Orbits* and *Julian Date* and track
  how many pages remain above 0.10 after the full crawl.

## 4. Align generated URLs and improve repeat visits

All 56 audited chapter URLs redirected to a trailing slash. The median
estimated redirect cost was 795 ms. Shared assets were served with a
10-minute cache lifetime. [Chapter report][hyperbolic]

### Work

- [ ] Compare published final URLs with the sitemap, table of contents,
  footer, search results, generated cross-references, and any canonical tags.
  Identify where the shared route formatter or static build should emit the
  final form.
- [ ] Apply consistent trailing slashes to generated chapter links and
  sitemap entries. Check relative links, route fragments, query strings, the
  site root, and the PR preview prefix. Keep compatibility for the older
  `.html` URLs and their anchor translations. Review the sitemap step in
  [the deployment workflow][deploy].
- [ ] Inspect deployed response headers to identify where cache policy can
  be configured. If supported, give verified content-fingerprinted assets
  long-lived immutable caching and keep HTML and unversioned scripts
  revalidatable. Record any GitHub Pages limitation before considering a
  separate serving-layer change.

### Verification

- [ ] Run `bun run book:check-urls`, `bun run test:url-root`, and
  `bun run test:redirects` against the static build. Exercise old links with
  query strings and fragments, plus prefixed preview routes.
- [ ] Test every sitemap entry on the deployed build and verify it returns
  HTTP 200 directly. Check generated navigation and search links in a browser
  and verify they lead to the intended final URLs. Re-run Lighthouse with
  those URLs and verify the redirect audit clears.
- [ ] Inspect response headers for HTML, a fingerprinted asset, and an
  unversioned script. Compare network transfers across repeated visits with
  cache enabled. After the next build, confirm a changed fingerprinted asset
  has a new URL and HTML references that URL.

## 5. Add page descriptions

Every audited page failed the meta-description and image-alt audits. The
shared logo and diagram work in item 1 addresses the image-alt findings.
The MyST theme supports project-level and page-level descriptions.
[Homepage report][home] · [MyST config][myst]

### Work

- [ ] Add a concise project description to `myst.yml` and use it as the default
  for pages that have no description. Make it accurately describe the
  textbook and its scope.
- [ ] Inventory chapter pages through the sitemap or project TOC and identify
  their main topics. With chapter-edit approval, add unique descriptions to
  the homepage and the main chapter or section pages. Use page frontmatter
  for chapter-specific descriptions and confirm how the theme handles the
  homepage description.
- [ ] Review descriptions for duplication, truncated sentences, and raw math
  markup. Check the generated metadata in the HTML head.

### Verification

- [ ] Parse each generated book page and assert that it has exactly one
  nonempty `<meta name="description">`. Spot-check the project fallback,
  homepage, and chapter-specific overrides. Inspect the published HTML as well.
- [ ] Re-run Lighthouse SEO and confirm that `meta-description` clears across
  the crawl and `image-alt` clears after item 1. Check that the title and
  indexability audits continue to pass for production pages.

## Final comparison

- [ ] Use the final URLs from the complete deployed sitemap and include any
  additional in-scope route from the saved crawl. Record both route sets and
  any coverage gaps.
- [ ] Repeat mobile Lighthouse runs on the homepage, a plain chapter, a
  slow-text LCP page, and pages with notebook plots and Three.js scenes.
  Use the same settings and compare per-route medians. Run a desktop smoke
  check of navigation, accessibility, and figures.
- [ ] Report before-and-after transfer size, unused script bytes, FCP, TBT,
  LCP, CLS, redirect counts, and resolved accessibility and SEO failures.
  Track pages above 4 s LCP and 0.10 CLS alongside the medians. Use separate
  warm visits to verify cache behavior.

[agents]: ../AGENTS.md
[dashboard]: ../.unlighthouse/orbital-mechanics.space/6edb/index.html
[deploy]: ../.github/workflows/deploy-book.yml
[elements]: ../.unlighthouse/orbital-mechanics.space/6edb/reports/classical-orbital-elements/classical-orbital-elements/lighthouse.html
[elliptical]: ../.unlighthouse/orbital-mechanics.space/6edb/reports/time-since-periapsis-and-keplers-equation/elliptical-orbits/lighthouse.html
[ephemeris]: ../.unlighthouse/orbital-mechanics.space/6edb/reports/reference/planetary-ephemeris/lighthouse.html
[home]: ../.unlighthouse/orbital-mechanics.space/6edb/reports/lighthouse.html
[hyperbolic]: ../.unlighthouse/orbital-mechanics.space/6edb/reports/the-orbit-equation/hyperbolic-trajectories/lighthouse.html
[lagrange]: ../.unlighthouse/orbital-mechanics.space/6edb/reports/the-n-body-problem/lagrange-points/lighthouse.html
[myst]: ../myst.yml
[plugin]: ../plugins/htmlFigure.mjs
[threejs]: ../plugins/THREEJS.md
