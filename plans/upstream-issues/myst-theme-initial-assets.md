# Load notebook assets only on pages that need them

## Problem

The Book Theme loads Matplotlib widget CSS and Font Awesome from its root
layout. A plain Markdown page gets both stylesheets even when it has no
notebook outputs and `project.jupyter` is `false`. Notebook rendering code
can also be loaded on pages with nothing for it to render.

Observed with MyST 1.13.0 and Book Theme 2.0.0.
[MyST Theme source commit](https://github.com/jupyter-book/myst-theme/commit/c3e99b4b1938d2aae078a3c866c486a7d66b5bc9)

## Steps to reproduce

1. Create a book with a plain Markdown home page and set `project.jupyter`
   to `false` in `myst.yml`. Run `myst build --html` and serve `_build/html`.
2. Open the home page with an empty browser cache. In the Network panel,
   look for `mpl_widget.css` and `font-awesome.css`.
3. Add a notebook page with saved text, PNG, and rich outputs. Compare its
   requests with the Markdown page. Check which outputs need a browser
   renderer to appear.

## Expected behavior

Plain Markdown and saved text or images should render without downloading
widget assets. Rich saved outputs should still work with live execution
disabled.

## Suggested resolution

Move widget styles out of the book layout and load them with the renderer
that uses them. Use the output's MIME type to decide when to load a rich
renderer such as Thebe. Keep browser-execution code behind the action that
starts a kernel on pages where execution is enabled.

## Verification

- [ ] Check that a cold load of the Markdown page skips widget assets and
  that saved text and PNG still render.
- [ ] Open the rich output directly and from another page. Check that it
  renders with `jupyter: false`. With execution enabled, verify that the
  notebook controls can still start a kernel and run a cell.
