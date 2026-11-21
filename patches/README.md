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
invalid settings. They reuse the patched book template under
`_build/book-theme`, populated by `bun run build:theme`, `mise run serve`, or
`mise run build`. Run `bun run book:check-urls` after a static book build to check
all exported pages and their navigation.

## Book theme source patches

`book-theme/source.json` pins the upstream theme revision and archive hash.
`scripts/build-book-theme.mjs` verifies that archive, applies the sorted `.patch`
files to source with zero fuzz, installs the upstream frozen lockfile, and builds
both the preview server and HTML renderer. The build cache includes all patch
contents and the deployment prefix, so adding a patch triggers a rebuild.

`01-iframe-permissions.patch` removes the unconditional iframe `allow="autoplay"`
attribute. The book's interactive JavaScript figures do not play media, and
Firefox warns because it does not support this Permissions Policy feature.
Fullscreen, iframe titles, geometry, and placeholder exports retain the upstream
renderer behavior. To propose the fix upstream, apply this source patch to the
pinned revision; no upstream changes have been submitted.

The `00-` build compatibility patches pass a serialized URL to the prerender
request constructor and disable Turbo caching for the book application task.
The upstream output list omits generated book assets; dependency packages still
use Turbo caching, and the outer fingerprint cache reuses unchanged templates.
This also ensures a changed deployment prefix rebuilds the book assets.
