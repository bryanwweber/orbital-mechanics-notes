# Preserve media dimensions and support lazy figures in book-theme

Target repository is `jupyter-book/myst-theme`.

## Reproduction

Create a long book chapter using an above-the-fold image, several
below-the-fold image and iframe figures, and executed notebook plots. Load
it on a cold mobile connection. Compare requests and layout shifts on a
direct document navigation and on navigation from another chapter.
[Interactive chapter](https://orbital-mechanics.space/classical-orbital-elements/classical-orbital-elements/)

## Observed behavior

The iframe renderer reserves a box but eagerly sets the source. The image
renderer and notebook image output commonly emit images without intrinsic
dimensions. The book logo sets a height attribute with CSS units and omits
its width. In the example, six Three.js figures load in one chapter with
2.45 s Total Blocking Time. Across the 57 audited pages, 25 had CLS over
0.10. Layout-shift diagnostics include unsized images and math fonts.

## Expected behavior

Render intrinsic image dimensions where available, with CSS that preserves
responsive sizing. Reserve logo space in both theme modes. Support
`loading="lazy"` or an explicit deferred placeholder for below-the-fold
iframes and images while allowing the first visible image to load eagerly.
Keep figure IDs, titles, captions, and export placeholders intact. Apply the
same behavior to static HTML and client-rendered navigation.

Add a fixture that confirms an offscreen iframe delays its request, renders
after scrolling or following a figure anchor, and retains its reserved size.
Verify responsive sizing for both normal images and pre-rendered notebook
plots and confirm the same DOM behavior after navigating within the book.
