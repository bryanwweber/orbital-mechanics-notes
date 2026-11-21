# Orbital Mechanics Notes

Avoid modifying files in the `chapters` folder, those contain the text of the book. Modifications to those files should be specifically approved. The `vendor` folder also contains code that should not be modified.

The rendered book is available on <http://localhost:3000> so you can inspect pages.

## Repository overview

This repository contains the Orbital Mechanics & Astrodynamics textbook,
with mathematical explanations, worked numerical examples, figures, and
animations.

- `myst.yml` defines the MyST project, table of contents, bibliography,
  math macros, figure/equation numbering, plugins, and site options.
- `chapters/` contains the book text and computational examples, including
  MyST Markdown with Jupytext metadata, code cells, and referenced scripts.
  The approval requirement above applies to all files in this directory.
- `references.bib` contains bibliography entries.
- `TODO.md` tracks missing or broken visualizations and other improvements.

## Figures and site assets

- `raw_svg/` contains SVG sources, figure metadata, and a math-rendering cache.
- `images/` contains figures and other media referenced by the book.
- `drawing-scripts/` contains notebooks used to create diagrams.
- `assets-src/` contains native Three.js scene sources; the former Blender scenes
  and GLB exports have been removed.
- `stellarium-scripts/` contains astronomy visualization scripts and media.
- `assets/` contains site assets, including CSS and bundled Three.js code.
  It is listed in `myst.yml` as static content.
- `_static/` contains logos, favicons, and other supporting assets.
- `_build/` contains generated output.

When changing a figure, identify its source and generation process before
editing a generated asset.

## Custom plugins

`plugins/inlineHTML.mjs` is enabled in `myst.yml`. It transforms inline
expression results containing HTML or plain text into MyST nodes,
preserving text and mapping superscripts and subscripts.

`plugins/render3js.mjs` currently contains an unfinished `threejs`
directive with an empty implementation. It is not enabled in `myst.yml`.

`plugins/render_svg/` is a local Python package exposing the `render_svg`
CLI. It inserts figure metadata, replaces SVG math text using an external
math CLI, caches the results, and minifies output through Bun and SVGO.
The repository includes a `bin/math` executable.

## Dependencies and tooling

- `mise.toml` declares tools and lint, formatting, and Julia tasks.
- Running a live server can be done with `mise run serve` for visualization tests
- Python dependencies use `pyproject.toml` and `uv.lock`.
- The uv workspace includes `plugins/render_svg` and `vendor/*`.
  `vendor/poliastro` is a Git submodule pointing to the author's fork.
- JavaScript dependencies use `package.json` and `bun.lock`.
- Julia dependencies use `Project.toml` and `Manifest.toml`.

The uv workspace targets Python 3.15: the root project requires Python 3.15.x,
while `render-svg` allows Python 3.13 or newer. CI uses `UV_PYTHON=3.15`.

## Build and validation caveats

Use the MyST CLI directly to build and serve the book. `INSTALL.md`
documents the setup: update Bun and Node with mise, update the sibling
`../mystmd` and `../myst-theme` repositories from upstream `main`, and run
`bun install` in both. In `mystmd`, run `bun run build && bun run link`;
in `myst-theme`, run `bun run theme:book`. From this project, run
`myst start --execute --debug --headless`.

The Jupyter Book mise task and doit tooling have been removed. GitHub Actions
uses Python 3.15, synchronizes frozen uv dependencies, builds with the project-local
MyST CLI, and publishes `_build/html` on pushes to `main`.

Linting is configured through Markdownlint and Ruff. `mise run lint`
runs the configured checks. Repository-wide formatting tasks can modify
chapter files; do not run them without the required approval. Prefer checks
and formatting scoped to the files being changed.

For visual changes, inspect the affected pages at <http://localhost:3000>.
