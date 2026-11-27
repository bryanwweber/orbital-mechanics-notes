# Use directory-index URLs for static book navigation and sitemap entries

Target repository is `jupyter-book/myst-theme`.

The local reproduction used MyST 1.13.0 and Book Theme 2.0.0, built from
`jupyter-book/myst-theme` commit `c3e99b4b1938d2aae078a3c866c486a7d66b5bc9`.
The published template commit identifies that source revision. The cached
archive and the saved Lighthouse report both identify the fingerprinted
client entry `entry.client-B-ypViXh.js`.
[Theme source commit][theme-source] · [Published template commit][theme-template]

## Problem

When MyST exports a page such as Reference Frames, it writes
`_build/html/intro/reference-frames/index.html`. A static host that serves
directory indexes can return that file directly at
`/intro/reference-frames/`. The book theme emits `/intro/reference-frames`
without the final slash, so a reader who opens the generated link in a new
tab can end up making two document requests. The first request reaches the
slashless URL and the second fetches the actual chapter at the slash URL.
[MyST static deployment documentation](https://mystmd.org/guide/deployment#static-websites)

The redirect can be an HTTP redirect from the host or a small HTML page that
sends the browser onward. The audited deployment used an HTML compatibility
redirect for `/intro/reference-frames`, which means an HTTP status check alone
can miss the extra navigation. A mobile Lighthouse crawl recorded redirects
for all 56 chapter entry URLs and estimated a median redirect cost of 795 ms.
The home URL already resolved directly. The project's production build now
normalizes the sitemap in a post-build script. The source of the book's
navigation URLs is still the theme.
[Example book](https://orbital-mechanics.space/)
[Project sitemap workaround](https://github.com/bryanwweber/orbital-mechanics-notes/blob/b3bcec676f6348cb186eddcbc9f0761b25d12cae/scripts/book-sitemap.mjs)

## Reproduction

1. Build a minimal book with a home page and a chapter at `section/page`
   using `myst build --html`. Confirm that `section/page/index.html` exists
   under `_build/html`.
2. Serve the output from a directory-index host, such as
   `python -m http.server 8000 --directory _build/html`. In the home page's
   generated HTML, inspect the chapter link. Compare the two URLs with
   `curl -I` or open the link in a new tab with the browser Network panel set
   to preserve the log. The slashless path sends the browser onward. The
   slash path serves the chapter on the first request.
3. Repeat with `BASE_URL=/docs` and mount the exported files at `/docs/`.
   Inspect the rendered navigation and the `<loc>` values in `sitemap.xml`.
   In the book's preview build, for example, the link was emitted as
   `/pr-preview/pr-61/intro/reference-frames`, with the prefix present and
   the final slash missing.

## Expected behavior

With directory URLs enabled, all generated chapter links should lead directly
to the exported page on a host that serves directory indexes. The table of
contents, previous and next links, search results, cross-references, sitemap,
and canonical tags where present should agree on the public page URL.

| Destination | Expected generated path |
| --- | --- |
| Book home at the domain root | `/` |
| Nested chapter at the domain root | `/section/page/` |
| Book home under a deployment prefix | `/docs/` |
| Nested chapter with a query and fragment | `/docs/section/page/?view=full#figure` |
| Asset under the same deployment prefix | `/docs/assets/diagram.svg` |

Existing slashless incoming links should still reach the same chapter wherever
the server or host accepts them. External links, downloads, and file endpoints
such as `sitemap.xml` should keep their existing paths.

## Suggested resolution

Add an opt-in directory URL policy for static book exports. Have the CLI pass
that policy to the theme during `myst build --html`, and make the same policy
available to the browser router when it takes over. Keeping the policy opt-in
preserves existing behavior for applications and hosts that serve slashless
URLs directly.

Use one page URL formatter for the server-rendered and client-rendered book
links and sitemap paths. Apply it after a link has resolved to a known book
page. Join the configured `BASE_URL` and page path once, ensure the pathname
ends in exactly one slash, then reattach any query string and fragment. Use the
same formatter when constructing sitemap locations and any canonical URLs so
that the absolute URL includes the deployment prefix. Keep page slugs and the
existing `<page>/index.html` output layout. In route matching and content
lookup, treat both spellings as the same page so the published URL works on
initial load and during client navigation.

## Verification

- [ ] Build test fixtures for a domain root and for `BASE_URL=/docs`. Check
  the home page, a nested chapter, and an already formatted path to catch
  dropped or duplicate slashes. Check that a fixture with the policy disabled
  retains the existing URLs.
- [ ] Check server-rendered HTML and sitemap entries for the final directory
  URLs. Fetch those URLs on a directory-index host without following redirects
  and confirm the first response serves the chapter content.
- [ ] In a browser, exercise the table of contents, previous and next links,
  search, and a cross-reference to a figure or equation on another page.
  Check query and fragment preservation, new-tab and direct loads, hydration,
  and back and forward navigation under both deployment paths.
- [ ] Try an old slashless URL and verify it reaches the same content under the
  fixture host's redirect behavior. Confirm that assets, downloads, and
  external links retain their original URLs.

[theme-source]: https://github.com/jupyter-book/myst-theme/commit/c3e99b4b1938d2aae078a3c866c486a7d66b5bc9
[theme-template]: https://github.com/myst-templates/book-theme/commit/39551f85e7540f44b3b7e1341b4fd4ca236621dc
