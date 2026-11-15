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
