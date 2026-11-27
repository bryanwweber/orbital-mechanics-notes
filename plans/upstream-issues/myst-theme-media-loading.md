# Reserve image space and let offscreen figures load lazily

## Problem

Images without intrinsic dimensions can shift the text below them as they
load. This can affect both local images and saved notebook plots. The logo
also needs space reserved in light and dark mode. An iframe below the fold
can start fetching its content during the initial page load even though its
box is already reserved.

Observed with MyST 1.13.0 and Book Theme 2.0.0.
[MyST Theme source commit](https://github.com/jupyter-book/myst-theme/commit/c3e99b4b1938d2aae078a3c866c486a7d66b5bc9)

## Steps to reproduce

1. Create a book page with a local PNG at the top and a saved notebook plot
   and an `{iframe}` figure several screens below it.
2. Build with `myst build --html` and open the page on a throttled connection.
   Inspect the image dimension attributes and the iframe's loading behavior
   before scrolling. Repeat after following a link from another page.

## Expected behavior

Images with known dimensions should reserve space at responsive widths.
Authors should be able to defer offscreen figures and keep images near the
start of the page loading immediately.

## Suggested resolution

Use known pixel dimensions for the HTML `width` and `height` attributes and
keep responsive sizing in CSS. Apply the same approach to both logo variants.
When a figure opts into lazy loading, pass `loading="lazy"` to the image or
iframe and skip preloading that lazy image unless another visible use needs
it immediately. Preserve captions, figure links, and export placeholders.

## Verification

- [ ] Check that the logo, local image, and notebook image keep their space
  while loading at narrow and wide widths.
- [ ] Check that a lazy iframe far offscreen is deferred and loads when
  reached by scrolling or following its figure link. Test both direct loads
  and in-book navigation.
