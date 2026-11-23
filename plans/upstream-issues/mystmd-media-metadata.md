# Carry intrinsic dimensions and loading hints through figure directives

Target repository is `jupyter-book/mystmd`. This pairs with renderer work in
`myst-theme`.

## Reproduction

Build an executed book chapter with an image from a local file, an image
from a notebook output, and an iframe figure below the fold. Leave the
responsive display width as a percentage and inspect the generated MyST
content and HTML. Try to request lazy loading for only the iframe and one
below-the-fold image.

## Observed behavior

Display width and height can style the figure, but those values describe
layout rather than the intrinsic size of the resource. Authors need a way
to preserve the latter when the display width changes with the viewport.
The iframe directive also needs a way to carry a loading hint to the
renderer alongside its title and optional static export placeholder.

## Expected behavior

Carry intrinsic width and height for supported local image files and
executed image outputs when those dimensions can be determined during
the build. Preserve dimensions for selected optimized images. Define an
optional loading hint for image and iframe directives and nodes so themes
can render the corresponding HTML behavior. Keep the existing meaning of
responsive display widths, labels, and placeholder children.

Add parser and build tests for a figure with a percentage width, a
notebook-image output, an iframe with an explicit loading hint, and a
remote image whose dimensions are unknown at build time.
