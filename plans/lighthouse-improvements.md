# Lighthouse improvement plan

Checked items record completed repository work, verified results, or an
upstream issue draft that covers the change. Drafted fixes still need the
verification checks listed below once they are available.

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
- [x] Confirm both logo variants receive alt text. Report the extra “Made
  with MyST” text in the home link name. [Theme accessibility draft][issue-accessibility]
- [x] Give the search trigger the accessible name “Search” on mobile.
- [x] Verify the search name at desktop widths and confirm dialog state and
  keyboard behavior.
- [x] Increase the email and ORCID links from roughly 16 × 19 px to at least
  24 × 24 CSS px using the author-link styles. Keep the icons readable and the
  hit areas from overlapping.
- [x] Document the theme changes for author, previous/next, and figure and
  table permalink names, including chapter titles with math.
  [Theme accessibility draft][issue-accessibility]
- [x] With chapter-edit approval, describe the diagram in *Sphere of
  Influence* and correct the header associations in the flagged *Planetary
  Ephemeris* and *Common Apse Line Example* tables. Inspect the generated
  markup before deciding whether the table fixes belong in the chapter source
  or the renderer.

### Verification

- [x] Inspect accessible names and target bounds in the mobile browser
  accessibility tree. Repeat in light and dark mode and at a desktop width.
- [x] Use the keyboard to open and close search and author details and
  confirm focus returns to the trigger.
- [ ] Read table headers with a screen reader while navigating representative
  data cells.
- [x] Re-run Lighthouse accessibility across the audited routes. Confirm
  `button-name`, `image-alt`, `target-size`, and applicable table-header checks.
- [x] Individually verify the two originally flagged pages against
  `td-has-header`. The `label-content-name-mismatch` audit still flags theme
  controls, which the [theme accessibility draft][issue-accessibility] covers.

## 2. Reduce theme JavaScript and render-blocking CSS

Initial script transfer was roughly 1 MiB on a typical page. The theme bundle
and `thebe-core.min.js` accounted for most of the 721 KiB median unused
JavaScript. The reported median render-blocking opportunity was 775 ms.
These are Lighthouse estimates for the measured navigation. [Homepage report][home]

### Work

- [x] Capture request initiators, JavaScript coverage, and main-thread
  timings on the homepage and plain, static-output, and rich-output pages.
  Trace the eager Thebe request to the shared theme bundle.
- [x] Prepare a patch for an opt-in local theme build that makes Thebe
  optional. Remove the notebook-renderer dependency from *Planetary Parameters* and *Plane Change
  Maneuvers* by using native Markdown tables and interactive Leaflet maps.
- [x] Inventory the notebook outputs. The current build emits plain text,
  PNG, HTML, JavaScript, and Bokeh MIME bundles.
- [x] Document how the theme can load renderers and widget styles when
  needed, retaining static and rich passive output with `jupyter: false`.
  [Theme startup assets draft][issue-assets]
- [x] Investigate the slow LCP on *Hyperbolic Trajectories* and *Planetary
  Ephemeris*. Compare Lighthouse filmstrips, render-blocking requests, and
  main-thread timings. Both pages still identify article text as the LCP
  element. [Hyperbolic Trajectories report][hyperbolic]
  · [Planetary Ephemeris report][ephemeris]

### Verification

- [ ] After the startup-assets fix is deployed, compare cold-load request
  counts, transferred and unused script bytes, and render-blocking requests.
  Verify that only rich outputs request their optional dependencies. The
  current default theme still requests Thebe and both widget styles on
  plain pages.
- [x] Verify search, theme switching, equation links, and saved PNG output
  in Chromium. Verify above-the-fold math with JavaScript enabled and disabled.
- [ ] Verify code toggles and rich notebook rendering during client-side
  navigation. The local search and footer checks reached the intended pages
  through full document loads.
- [x] Repeat cold-load Lighthouse runs on a sample of final preview URLs
  and record the medians below.
- [ ] Compare the full crawl and the count of pages above 4 s LCP after
  the optional-assets fix, with a matched baseline build.

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
- [x] Verify iframe titles, captions, figure anchors, static-export
  placeholders, and direct links to figures below the fold.
- [x] Defer the selected below-the-fold figures on *Lagrange Points* and
  generate a smaller Trojan-asteroid plot.
- [x] Trace the JWST and WMAP trajectory images to the animated WebP files
  used in the build. Verify that each reserves its 560 × 420 aspect ratio.
- [ ] Assess whether smaller animated variants preserve plot labels and
  linework.
- [x] Add intrinsic dimensions to supported images in the static build.
- [x] Document responsive dimensions and lazy loading for the theme logo,
  images, notebook plots, and iframes. Document the image dimension and
  loading hints MyST needs to pass to the renderer.
  [Theme media draft][issue-rendering] · [MyST metadata draft][issue-metadata]
- [x] Recheck layout shifts in *Elliptical Orbits* and *Julian Date*.
  Neither exceeded 0.10 CLS in the three current samples. The small shifts
  on *Elliptical Orbits* included a math span and an interactive label.

### Verification

- [x] Confirm in a cold navigation trace that offscreen iframe documents and
  scene runtimes wait until the chosen trigger. Scroll to each figure and
  verify it loads once, its controls work, and its frame keeps the same size.
- [x] Exercise figure links, resizing, keyboard activation where applicable,
  and navigation away and back. Run `bun run browser:threejs:static`,
  `bun run browser:threejs:chapters`, and `bun run browser:elements`.
  Verify the six orbital-element embeds in the built book as well.
- [x] Recheck initial transfer and TBT for *Classical Orbital Elements* and
  *Lagrange Points*. Record the current medians below.
- [ ] Review plot labels and linework at mobile and desktop widths if
  alternate image variants are generated. Track the number of pages above
  0.10 CLS on the next full crawl.

## 4. Align generated URLs and improve repeat visits

All 56 audited chapter URLs redirected to a trailing slash. The median
estimated redirect cost was 795 ms. Shared assets were served with a
10-minute cache lifetime. [Chapter report][hyperbolic]

### Work

- [x] Compare generated page links with directory-index URLs and document
  the proposed shared URL formatter, including sitemap, navigation, search,
  and cross-references. [Theme directory URLs draft][issue-urls]
- [x] Publish trailing-slash URLs in the production sitemap. Keep the older
  `.html` redirects and their anchor translations. See the sitemap step in
  [the deployment workflow][deploy].
- [x] Document the trailing-slash change for generated chapter links and
  regression checks for prefixes, query strings, and fragments.
  [Theme directory URLs draft][issue-urls]
- [x] Inspect the current cache policy and record the GitHub Pages
  configuration limit before considering a separate serving layer.
  [GitHub Pages API][pages-api]

### Verification

- [x] Run `bun run book:check-urls`, `bun run test:url-root`, and
  `bun run test:redirects` against the static build. Exercise old links with
  query strings and fragments, plus prefixed preview routes.
- [x] Verify that all 72 final directory URLs return HTTP 200. Confirm that
  Lighthouse reports no redirects when loading the final local URLs.
- [ ] Re-run Lighthouse from generated navigation and search links after
  the theme emits the final directory URLs. The current build still emits
  slashless chapter links.
- [x] Inspect response headers for HTML, a fingerprinted asset, and an
  unversioned script. Check transfer for the theme bundle on a repeat visit.
- [ ] After the next deployment with a changed fingerprinted asset, confirm
  its new URL is present in the published HTML.

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
- [x] Review chapter topics against the sitemap or TOC and confirm how page
  frontmatter and the theme handle any remaining description overrides.
- [x] Review descriptions for duplication, truncated sentences, and raw math
  markup. Check the generated metadata in the HTML head.

### Verification

- [x] Parse each generated book page and assert that it has exactly one
  nonempty `<meta name="description">`. Spot-check the project fallback,
  homepage, and chapter-specific overrides. Inspect the published HTML as well.
- [x] Re-run Lighthouse and confirm `meta-description` and `image-alt` pass
  across the local crawl.
- [x] Check nonempty titles and indexability on production pages.

## Final comparison

- [x] Compare the production sitemap and saved crawl as directory URLs.
  The 72 production routes include all 57 baseline routes and 15 additional
  pages. The preview and production route sets match.
- [x] Repeat mobile Lighthouse runs on the homepage, a plain page,
  slow-text LCP pages, and pages with notebook plots and Three.js scenes.
  Record per-route medians. Run a desktop smoke check of navigation,
  accessibility, and figures.
- [x] Record current transfer, unused script bytes, FCP, TBT, LCP, CLS, and
  redirect and accessibility results. Keep the warm-cache check separate.
- [ ] Repeat the before-and-after comparison on matched builds when the
  upstream fixes are available. Include the full-crawl counts above 4 s LCP
  and 0.10 CLS.

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

### Verification of the current branch

The preview build exported 72 pages. The URL, redirect, and plugin suites
passed 22 tests. Chromium passed the static, chapter, and orbital-elements
checks. Two of the six orbital-element iframes had yet to request their
HTML at the initial mobile scroll position. All six loaded once when reached,
kept their frame height, and retained their controls. A direct link to the
last figure loaded its scene. Both Leaflet maps passed zoom, popup, and
keyboard pan at 412 and 1440 CSS pixels without requesting Bokeh or Thebe
inside the map frames. All 31 table rows matched the previous display precision.

Search and author details returned focus on Escape at both widths and in
both color modes. Both author icon targets measured 24 × 24 CSS pixels.
Both originally flagged pages passed `td-has-header` in all three runs.
The label-content audit still reports theme controls. The 72 local page
heads had 13 distinct descriptions, including the intentional shared
fallback on 60 pages. No description ended in an ellipsis or contained
raw TeX. The 72 production sitemap pages had a title and no `noindex`
directive, and the production robots file allows crawling. Its current
sitemap still lists chapter URLs without a trailing slash. The static
preview verified query and equation-anchor translation on an old `.html`
URL under the preview prefix.

The default theme still loads Thebe, Matplotlib widget CSS, and Font
Awesome on plain pages. Chromium traced the Thebe request to the shared
theme JavaScript and measured a 1.25 MiB response over the uncompressed
local server. The local theme patch remains opt-in. The slow-text LCP
filmstrips show article text before the contents panel settles, and
Lighthouse identifies widget styles among render-blocking requests.

These are medians of three cold mobile Lighthouse 13.6 runs per page on
the current local preview, using the recorded simulated throttling.
All 27 direct loads had zero Lighthouse redirect cost. The local server
serves uncompressed files. A matched before-and-after run is still pending.
Only *Classical Orbital Elements* exceeded 0.10 median CLS in this sample.

| Page | Transfer (MiB) | Unused JS (KiB) | FCP (s) | LCP (s) | TBT (ms) | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage | 3.75 | 2,677 | 3.00 | 3.00 | 24 | 0.000 |
| Planetary Parameters | 3.84 | 2,664 | 3.45 | 3.45 | 22 | 0.000 |
| Hyperbolic Trajectories | 4.19 | 2,667 | 4.65 | 4.80 | 24 | 0.000 |
| Planetary Ephemeris | 4.34 | 2,618 | 4.50 | 4.50 | 23 | 0.000 |
| Common Apse Line Example | 3.89 | 2,646 | 3.45 | 15.23 | 25 | 0.000 |
| Lagrange Points | 4.56 | 2,616 | 6.75 | 6.75 | 28 | 0.000 |
| Classical Orbital Elements | 4.02 | 2,665 | 3.60 | 3.60 | 22 | 0.180 |
| Elliptical Orbits (Kepler chapter) | 5.02 | 2,619 | 7.50 | 7.50 | 24 | 0.000 |
| Julian Date | 3.96 | 2,614 | 3.75 | 3.75 | 21 | 0.000 |

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
