# MyST URL root option

`mystmd@1.13.0.patch` adds `project.url_root` to the released MyST CLI.
Bun applies this patch through `package.json` and `bun.lock`.

```yaml
project:
  url_root: chapters
site:
  options:
    folders: true
```

The directory is resolved relative to the project root, independently of the
config file's location. Folder URLs are relative to that directory. Omitting the
option preserves MyST's project-relative URLs; `folders: false` still produces
flat URLs. The explicit TOC's home page remains at `/`. Invalid roots and other
pages outside the chosen directory fail the build. Source paths, figure assets,
and output directories retain their existing behavior.

`mystmd-url-root-upstream.patch` contains the corresponding TypeScript changes,
unit tests, and documentation against the local `mystmd` source checkout. It is
provided for a future upstream proposal and is not applied by Bun. No upstream
changes have been submitted.

Run `bun run test:url-root` to exercise the installed CLI with temporary projects.
The tests cover config locations, default behavior, flat URLs, explicit and
implicit tables of contents, legacy Sphinx tables of contents, link targets, and
invalid settings. They reuse the downloaded book template under
`_build/templates/site/myst/book-theme`, populated by `mise run serve` or
`mise run build`. Run `bun run book:check-urls` after a static book build to check
all exported pages and their navigation.

## Load Thebe only when needed

`myst-theme-thebe-on-demand.patch` gates the eager Thebe server monitor on
whether live compute is enabled. Rich notebook outputs retain their own
renderer and can still request Thebe. The book already sets `jupyter: false`.

To use the patch with a local static build, start with a separate
`myst-theme` checkout. The patch was tested against
`f54d87e603c0f4815c8b21a152d192c96624bf8c`. In that checkout, apply
`patch -p1 < /path/to/orbital-mechanics-notes/patches/myst-theme-thebe-on-demand.patch`,
install the locked dependencies with `bun install --frozen-lockfile`, compile
the theme workspace packages with `bun run build -- --filter='./packages/*'`,
then package the book theme with `make build-book`.

In the book checkout used for the local build, set `site.template` in
`myst.yml` to the patched checkout's absolute
`.deploy/book/template.yml` path and run `bun run book:build`. For a repeatable
deployment, build or package a pinned patched theme where CI can resolve it.
[MyST developer guide](https://mystmd.org/guide/developer#approach-2-static-build)

In a cold browser context, check that the homepage and Reference Frames
request no `thebe-core.min.js`. Check that the three Planetary Parameters
tables and both Plane Change Maneuvers maps still render without requesting
Thebe. A rich notebook output can still load Thebe when its renderer needs it.
The default `book-theme` template continues to load Thebe on plain pages.
