# Use directory-index URLs for static book navigation and sitemap entries

Target repository is `jupyter-book/myst-theme`.

## Reproduction

Build a book with nested routes using `myst build --html` and deploy it to
a static host that redirects `/section/page` to `/section/page/`. Repeat
under a deployment prefix. Inspect generated table of contents, footer,
search results, cross-references, and sitemap URLs.
[Example deployment](https://orbital-mechanics.space/)

## Observed behavior

The build writes `section/page/index.html` and emits slashless links for
these routes. In a Lighthouse mobile crawl, all 56 chapter entry URLs
redirected to a trailing slash. The median estimated redirect cost was
795 ms. The home URL was already final. The example host serves an HTML
compatibility redirect at the slashless `/intro/reference-frames` URL, so
following the final directory URL avoids a second document navigation.

## Expected behavior

Offer a consistent directory-index URL policy for static deployments and
use it for rendered links, the client-side router and search results, and
sitemap entries. Keep the base path, query strings, and fragments intact.
The policy should apply to page URLs without changing asset and download
URLs. Keep compatibility for incoming slashless links.

Add fixtures for root and prefix deployments. Check that generated routes
resolve directly to a directory index, navigation hydrates without errors,
and direct loads, search links, figure or equation fragments, and back/forward
navigation reach the intended pages.
