# Install and Run the Book

The project uses the released MyST CLI from npm. Its exact version is recorded
in `package.json`, and its dependencies are locked in `bun.lock`. Local checkouts
of `mystmd` and `myst-theme` are not required.

1. Install the tools declared in `mise.toml`:

   ```bash
   mise install
   ```

2. Install the book's JavaScript and Python dependencies:

   ```bash
   bun install --frozen-lockfile
   uv sync --frozen --python 3.13
   ```

   Python 3.13 satisfies the requirements of all uv workspace members.

3. Preview the book with live reload:

   ```bash
   mise run serve
   ```

4. Generate the static site in `_build/html`:

   ```bash
   mise run build
   ```

Both tasks generate the Three.js animation runtime and run the project-local
MyST CLI with code execution enabled. The uv environment supplies the Python
execution dependencies. The equivalent commands are
`uv run --frozen bun run book:dev` and `uv run --frozen bun run book:build`.
See [Three.js figures](plugins/THREEJS.md) for animation update and validation
commands.

Page URLs retain the published section paths, such as `/intro/reference-frames`,
without the `chapters/` source directory. `project.url_root: chapters` explicitly
sets the source directory used to compute folder URLs, relative to the repository
root. `patches/mystmd@1.13.0.patch` adds this option to MyST. Bun applies this
patch during installation; `package.json` and `bun.lock` record it. File lookup,
figure publishing, and `_build/` output still use the repository root. Recheck this
patch when updating MyST.
The source changes for a future upstream proposal and the option's regression
tests are described in [patches/README.md](patches/README.md).
Run `bun run book:check-urls` after a static build to verify the page paths and
navigation. Deployment runs this check before uploading the book.

After a static build, run `bun run book:redirects` to generate compatibility files
for the former `.html` page URLs. Production and PR preview workflows run this
before uploading their artifacts. Redirects use an immediate HTML refresh and a
canonical link to the replacement page. JavaScript preserves query strings and
fragments, translating the old Sphinx equation anchors where a matching target
exists. Relative destinations also work under a PR preview's URL prefix.
The generator retains source filename case and explicit aliases for the renamed
notebooks and the old misspelled departure page. It validates destinations and
refuses to overwrite existing content. Redirect files are not added to the MyST
sitemap. The former standalone bibliography has no replacement page and is not
covered by this mapping. Run `bun run test:redirects` to check the generator.

The book uses the upstream MyST theme with small source patches in
`patches/book-theme/`. Its exact upstream revision and archive SHA-256 are in
`patches/book-theme/source.json`; its dependencies use that revision's frozen
`bun.lock`. The iframe patch removes the unnecessary `autoplay` permission that
Firefox reports as unsupported. JavaScript figure animations do not use media
autoplay permissions.

Both book tasks run `bun run build:theme` automatically. On the first run it
downloads and verifies the source archive, applies the patches, installs the
locked theme dependencies, and builds the preview server and static renderer.
The generated template is `_build/book-theme/template.yml`. This requires `tar`
and `patch` in addition to the tools above. No sibling source checkout is used.
The cache is keyed by source, patches, Bun version, deployment prefix
(`BASE_URL`), and build script; unchanged runs reuse it.

To prepare the theme before invoking the MyST CLI directly, run:

```bash
bun run build:theme
```

To update the theme, change the pinned revision and archive hash, recheck the
source patches, then rebuild and verify both preview and static output. Patches
fail on source drift rather than applying approximately. Run `bun run test:theme`
for the patch and cache checks.

With the preview running, `bun run browser:iframe-permissions` checks the 14
interactive figures in headed Chrome. Add `--firefox` to reproduce and check the
Firefox Permissions Policy warning; both modes keep captions, titles, and iframe
geometry in the checks. Set `BOOK_URL` to check a separate preview or static site.

To check or update the separately pinned CLI version:

```bash
bun run book:version
bun add --dev --exact mystmd@<version>
```

Commit both `package.json` and `bun.lock` after updating, and validate the static
build before deploying.

For examples requiring Julia, install the project dependencies from the
project directory and ensure the Julia Jupyter kernel is available:

```bash
julia --project=. -e 'using Pkg; Pkg.instantiate(); Pkg.precompile();'
```

## Pull request previews

Once the workflows are on `main`, open **Actions → Publish PR preview → Run
workflow**, select `main`, and enter the PR number. The workflow builds the PR's
current head commit and publishes it at
`https://orbital-mechanics.space/pr-preview/pr-<number>/`. Later commits do not
update the preview until you run the workflow again. The PR must be open and
target `main`; a PR closed during its build is skipped before publication.

Closing or merging a PR into `main` automatically removes its preview. To remove
one earlier, use **Actions → Remove PR preview → Run workflow**, select `main`,
and enter the PR number. Removal does not build or execute PR code.

Pages must continue deploying from the root of the `gh-pages` branch. Production
publishing preserves `pr-preview/`, the custom-domain `CNAME`, and `.nojekyll`.
Production, preview publication, and removal share a queued concurrency group so
their writes cannot overlap or replace pending cleanup jobs.

Every preview HTML page, including standalone figures, receives
`<meta name="robots" content="noindex, nofollow">`. This is applied to the
downloaded preview artifact directly in the trusted workflow; production pages
are not changed. Do not disallow `/pr-preview/` in the site's root `robots.txt`: crawlers
must access the pages to read these directives. Previews remain publicly readable.
Run `node --test scripts/preview-html.test.mjs` to check this processing.
