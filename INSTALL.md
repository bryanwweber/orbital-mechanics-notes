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

The published `book-theme` is configured in `myst.yml`. MyST downloads it on
first use and caches it under `_build/templates`. The theme is updated
independently of the CLI and is not pinned by `bun.lock`. To fetch the current
published theme on the next build, run:

```bash
bun run myst clean --templates
```

To check or update the pinned CLI version:

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
