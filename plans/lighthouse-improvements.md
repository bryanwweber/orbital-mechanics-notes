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

- [x] Set `site.options.logo_alt` in [MyST config][myst].
- [ ] Confirm the theme applies the alt text to both logo variants. Check
  the full home link name for duplicate or unrelated text.
- [x] Give the search trigger the accessible name “Search” on mobile.
- [ ] Verify the search name at desktop widths and confirm dialog state and
  keyboard behavior.
- [x] Increase the email and ORCID links from roughly 16 × 19 px to at least
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
- [x] Re-run Lighthouse accessibility across the audited routes. Confirm
  `button-name`, `image-alt`, `target-size`, and applicable table-header checks.
- [ ] Confirm `label-content-name-mismatch` and individually verify the two
  originally flagged tables against `td-has-header`.

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
- [x] Patch the local theme build to make Thebe optional. Remove the
  notebook-renderer dependency from *Planetary Parameters* and *Plane Change
  Maneuvers* by using native Markdown tables and interactive Leaflet maps.
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

- [x] Trace the interactive figure path through the [HTML figure plugin][plugin],
  the MyST iframe renderer, and the existing [Three.js placeholders][threejs].
  Identify where to defer iframe creation or loading so offscreen scenes do
  not initialize WebGL during the initial page load.
- [x] Keep the existing Three.js placeholders and load each scene near the
  viewport.
- [ ] Verify iframe titles, captions, figure anchors, static-export
  placeholders, and direct links to figures below the fold.
- [x] Defer the selected below-the-fold figures on *Lagrange Points* and
  generate a smaller Trojan-asteroid plot.
- [ ] Trace the JWST and WMAP trajectory images and remaining large plots
  back to their sources. Generate responsive sizes or more efficient encodings
  where the diagrams remain legible.
- [x] Add intrinsic dimensions to supported images in the static build.
- [ ] Verify dimensions or aspect ratios for the theme logo and generated
  plot containers. Inspect a browser performance trace of *Elliptical Orbits*
  and *Julian Date* for remaining layout shifts, including math font loading.

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
- [x] Publish trailing-slash URLs in the production sitemap. Keep the older
  `.html` redirects and their anchor translations. See the sitemap step in
  [the deployment workflow][deploy].
- [ ] Apply trailing slashes consistently to generated chapter links. Check
  relative links, route fragments, query strings, the site root, and the PR
  preview prefix.
- [ ] Inspect deployed response headers to identify where cache policy can
  be configured. If supported, give verified content-fingerprinted assets
  long-lived immutable caching and keep HTML and unversioned scripts
  revalidatable. Record any GitHub Pages limitation before considering a
  separate serving-layer change.

### Verification

- [ ] Run `bun run book:check-urls`, `bun run test:url-root`, and
  `bun run test:redirects` against the static build. Exercise old links with
  query strings and fragments, plus prefixed preview routes.
- [x] Verify that all 72 final sitemap URLs return HTTP 200 directly on the
  live site. Confirm that the redirect audit clears on the final local URLs.
- [ ] Check that generated navigation and search links lead to the intended
  final URLs in a browser. Re-run Lighthouse from those generated links.
- [x] Inspect response headers for HTML, a fingerprinted asset, and an
  unversioned script. Check transfer for the theme bundle on a repeat visit.
- [ ] After the next build, confirm a changed fingerprinted asset has a new
  URL and HTML references that URL.

## 5. Add page descriptions

Every audited page failed the meta-description and image-alt audits. The
shared logo and diagram work in item 1 addresses the image-alt findings.
The MyST theme supports project-level and page-level descriptions.
[Homepage report][home] · [MyST config][myst]

### Work

- [x] Add a concise project description to `myst.yml` and use it as the default
  for pages that have no description. Make it accurately describe the
  textbook and its scope.
- [x] Add distinct descriptions to the homepage and main section pages.
- [ ] Review chapter topics against the sitemap or TOC and confirm how page
  frontmatter and the theme handle any remaining description overrides.
- [ ] Review descriptions for duplication, truncated sentences, and raw math
  markup. Check the generated metadata in the HTML head.

### Verification

- [x] Parse each generated book page and assert that it has exactly one
  nonempty `<meta name="description">`. Spot-check the project fallback,
  homepage, and chapter-specific overrides. Inspect the published HTML as well.
- [x] Re-run Lighthouse and confirm `meta-description` and `image-alt` pass
  across the local crawl.
- [ ] Check title and indexability audits on production pages.

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

## Implementation and verification

The static book build now adds native lazy loading to local figure iframes,
removes eager preloads for the selected Lagrange Points figures, and reserves
space using intrinsic dimensions for supported PNG, SVG, and WebP images.
The six orbital-element scenes display their existing placeholders and wait
for viewport intersection before loading the Three.js runtime. The Lagrange Points notebook produces a smaller Trojan-asteroid plot. The
interactive CR3BP pseudo-potential figure from current `main` is also lazy-loaded.

The book supplies a mobile Search label, home-logo alt text, larger
author-link targets, diagram alt text, and table column labels. The built
homepage and section entry pages have distinct descriptions, with a book
description as a fallback. All 72 built pages have one description and a
production sitemap entry that serves the directory index directly.

The production-shaped build and a build under `/pr-preview/pr-999` passed
the URL, legacy redirect, static-output, preview HTML, and figure checks.
Chromium checks covered mobile and desktop keyboard focus, author target
bounds, scrolling to deferred images and scenes, figure links, and the
orbital-elements controls. The existing live site also returned HTTP 200
for all 72 final sitemap URLs. The slashless *Reference Frames* response
contained an HTML redirect.

The local comparisons used MyST 1.13.0, Lighthouse 13.6.0, headless Chromium
157, a 412 × 823 viewport, and the saved run's simulated mobile throttling.
The cached Book Theme 2.0.0 archive was built from `jupyter-book/myst-theme`
commit `c3e99b4b1938d2aae078a3c866c486a7d66b5bc9` and published as
`myst-templates/book-theme` commit `39551f85e7540f44b3b7e1341b4fd4ca236621dc`.
The archive had SHA-256
`d0c1ff573d2554d2d76c2b75fb392c5eae3fdea0bd83fe3ab1d955248d313550`.
[Theme source commit][theme-source] · [Published template commit][theme-template]

The observed `gh-pages` revision was `e83889b15060f30b2bbfbaf0be57a8d0f0ec408a`.
The local HTTP server sends uncompressed responses, so compare the local
measurements with each other. The measurements below are medians of three
cold navigations in each build, taken before the branch was reconciled with
current `main` and its interactive CR3BP figure.

| Page | Transfer (MiB) | FCP (s) | LCP (s) | TBT (ms) | CLS |
| --- | --- | --- | --- | --- | --- |
| Homepage | 3.75 → 3.75 | 3.01 → 3.00 | 3.01 → 3.00 | 206 → 21 | 0 → 0 |
| Classical Orbital Elements | 4.55 → 4.01 | 3.60 → 3.46 | 3.60 → 3.60 | 1,944 → 111 | 0.178 → 0.178 |
| Lagrange Points | 7.40 → 4.57 | 6.75 → 6.75 | 6.76 → 6.76 | 131 → 288 | 0.134 → 0.134 |
| Elliptical Orbits (Kepler chapter) | 4.93 → 4.93 | 7.50 → 7.50 | 7.50 → 7.50 | 192 → 233 | 0.286 → 0.286 |
| Hyperbolic Trajectories (Orbit Equation chapter) | 4.10 → 4.10 | 4.66 → 4.65 | 4.66 → 4.65 | 211 → 27 | 0.091 → 0.091 |

All 72 final local routes passed Lighthouse checks for button names, image
alt text, target size, meta descriptions, crawlability, and redirects. All
nine pages where the table-header audit applied passed it. The full local
crawl recorded median FCP and LCP of 3.75 s, TBT of 33 ms, and CLS of 0.004.
There were 31 pages above 4 s LCP and 20 above 0.10 CLS.

Deferred figures reduced the initial payload. Blocking time and layout
stability varied across the sample. *Elliptical Orbits* and *Julian Date*
still recorded CLS of 0.286 and 0.247. The shared
theme bundle and Thebe still load on ordinary reading pages, and the home
page's estimated unused JavaScript stayed at 2,677 KiB in the uncompressed
local comparison. Shared author, figure, and navigation label mismatches, initial theme assets,
client-rendered media attributes, and generated navigation URLs are
documented in the upstream issue drafts.

Production returned `Cache-Control: max-age=600` on HTML, a fingerprinted
theme bundle, and the unversioned Thebe script. A conditional request for
the fingerprinted bundle returned 304, and a second Chromium visit in the
same browser context downloaded zero bytes for the theme bundle.
GitHub.com's Pages repository configuration exposes publishing, domain,
and HTTPS settings. Changing cache policy would require control of the
serving layer. [GitHub Pages API][pages-api]

### Upstream issue drafts

- [MyST theme accessibility][issue-accessibility]
- [MyST theme startup assets][issue-assets]
- [MyST theme media rendering][issue-rendering]
- [MyST theme directory URLs][issue-urls]
- [MyST media metadata and loading hints][issue-metadata]

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
[pages-api]: https://docs.github.com/en/rest/pages/pages#update-information-about-a-github-pages-site
[issue-accessibility]: upstream-issues/myst-theme-mobile-accessibility.md
[issue-assets]: upstream-issues/myst-theme-initial-assets.md
[issue-rendering]: upstream-issues/myst-theme-media-loading.md
[issue-urls]: upstream-issues/myst-theme-directory-urls.md
[issue-metadata]: upstream-issues/mystmd-media-metadata.md
[theme-source]: https://github.com/jupyter-book/myst-theme/commit/c3e99b4b1938d2aae078a3c866c486a7d66b5bc9
[theme-template]: https://github.com/myst-templates/book-theme/commit/39551f85e7540f44b3b7e1341b4fd4ca236621dc
