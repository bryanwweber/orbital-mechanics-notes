# Static book links can trigger a redirect before loading the page

## Problem

`myst build --html` exports `/guide/setup` as `_build/html/guide/setup/index.html`.
The theme links to `/guide/setup`. A static host that requires a trailing
slash for directory URLs redirects that request to `/guide/setup/`. Opening
the generated link in a new tab takes two requests to load the page.

Observed with MyST 1.13.0 and Book Theme 2.0.0.
[MyST Theme source commit](https://github.com/jupyter-book/myst-theme/commit/c3e99b4b1938d2aae078a3c866c486a7d66b5bc9)
· [Published template commit](https://github.com/myst-templates/book-theme/commit/39551f85e7540f44b3b7e1341b4fd4ca236621dc)

## Steps to reproduce

1. Create a book with `index.md` and `guide/setup.md` in its table of contents.
   Set `site.options.folders` to `true` and run `myst build --html`.
2. Serve the output with `python -m http.server 8000 --directory _build/html`.
3. Inspect the Setup link in the exported home page. It points to
   `/guide/setup`. `curl -I http://localhost:8000/guide/setup` returns a 301.
   The same request to `/guide/setup/` returns a 200 directly.

## Expected behavior

For static hosts that require directory URLs, a site should be able to emit
`/guide/setup/` in navigation, search results, cross-references, and the
sitemap. Opening a generated link should load the page in one request.

## Suggested resolution

Add an opt-in setting for static exports that adds a trailing slash to
links to book pages. Use the same rule for all generated page links and
sitemap entries. With `BASE_URL=/docs`, a link to
`/docs/guide/setup?mode=full#install` would become
`/docs/guide/setup/?mode=full#install`.

Keep exporting `guide/setup/index.html`. Leave file URLs such as
`/docs/assets/logo.svg` alone, and allow the host to keep redirecting old
slashless links.

## Verification

- [ ] Build with the setting enabled at `/` and under `/docs/`. Confirm that
  generated page links and sitemap entries load the expected page directly.
- [ ] Check that query strings, fragments, and file URLs still work. Verify
  that the existing URLs are emitted when the setting is disabled.
