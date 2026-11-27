# Carry image dimensions and loading hints in figure data

## Problem

A figure with `:width: 50%` carries its display width. For an 800 × 600 PNG,
its theme also needs the original pixel dimensions to reserve the correct
space while it loads. This information is useful for saved notebook images
as well. Image and iframe directives have no option to tell the theme that
an individual figure should load lazily.

Observed with MyST 1.13.0.
[MyST source commit](https://github.com/jupyter-book/mystmd/commit/a159a3f26870d712061f2bc9860f0f19a4ced08c)

## Steps to reproduce

1. Create a page with a local PNG figure set to `:width: 50%`, an embedded
   PNG output from a notebook, and an `{iframe}` figure.
2. Run `myst build --html` and inspect the image and iframe nodes in
   `_build/site/content/`. Look for pixel dimensions alongside the display
   width. Check the directive options for a per-figure loading hint.
   [Figure and iframe documentation](https://mystmd.org/guide/figures)

## Expected behavior

Themes should receive intrinsic pixel dimensions where MyST knows them, in
addition to any display width. Authors should be able to set a loading hint
on an image or iframe without changing its size, label, or placeholder.

## Suggested resolution

Add optional intrinsic width and height fields to image nodes. Fill them
from supported local or notebook image data during the build, using the
pixel size of the resource emitted if MyST creates an optimized copy.
Leave the fields unset when the dimensions are unknown. Define an optional
`loading` field with `lazy` and `eager` values and pass it from the image,
figure, and iframe directives to their media nodes.

## Verification

- [ ] Check that a local PNG with `:width: 50%` and a saved notebook image
  carry their pixel dimensions. Check an optimized copy and a remote image
  whose dimensions are unknown.
- [ ] Check that an explicit loading hint reaches the image or iframe node
  and that an iframe's label and export placeholder still work.
