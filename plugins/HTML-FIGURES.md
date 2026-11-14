# Local HTML figures

Use `html-figure` for chapter-local HTML with sibling assets:

```markdown
:::{html-figure} assets/ellipse-area-animate.html
:name: fig:ellipse-area-animate
:title: Stretching an ellipse into a circumscribing circle
:placeholder: assets/ellipse-area-animate.svg

Figure caption.
:::
```

Run MyST from the project root. The directive stages HTML and sibling web assets
under `_build/html-figures/`, preserving their paths from the project root.
`myst.yml` publishes the staged `chapters/` directory. Python files are excluded.
The iframe uses an explicit path from the site root; its HTML can fetch sibling
SVGs by filename. This supports chapter routes with or without a trailing slash.
Set `BASE_URL=/book` when building or serving beneath a URL prefix.

Run the chapter's uv generator before building to refresh its HTML/SVG outputs.
Generated outputs are kept beside their Python source in `assets/`.
Restart MyST after adding or changing the plugin; rebuild after regenerating
assets so staged and published files are refreshed.

Validation: `node --test plugins/htmlFigure.test.mjs`.
