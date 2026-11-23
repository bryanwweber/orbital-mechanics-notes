# Load notebook renderers and widget styles on demand in book-theme

Target repository is `jupyter-book/myst-theme`.

## Reproduction

Build a book-theme site with `jupyter: false`, a plain reading page, a page
with pre-rendered notebook outputs, and a page with a rich MIME output.
Record a cold mobile Lighthouse navigation of the plain page, then navigate
to the other routes and inspect network requests and output rendering.
[Example book](https://orbital-mechanics.space/)

## Observed behavior

The example site's 57 Lighthouse 13.6 mobile reports all include
`thebe-core.min.js`, the shared theme bundle, `mpl_widget.css`, and Font
Awesome CSS. On a typical navigation roughly 721 KiB of JavaScript goes
unused. The shared theme bundle accounts for about 377 KiB and Thebe for
about 278 KiB of that total. The combined render-blocking opportunity has
a median estimate of 775 ms. These are lab estimates for the measured
navigation.

The book root installs the widget styles globally. The passive notebook
output path can legitimately need Thebe with live compute disabled.

## Expected behavior

Keep server-rendered text, layout, math, and built-in static outputs
available on initial navigation. Load rich MIME renderers and their styles
when the page contains an output that needs them. Load active compute
support when compute is enabled and requested. Split optional features in
the shared bundle where the initial reading route can avoid evaluating them.

Regression coverage should include a plain page with no notebook requests,
static text and image outputs, a rich passive output with `jupyter: false`,
and navigation in both directions between these routes. Verify that any
enabled notebook controls still work and capture the request and blocking
time differences on the plain route.
