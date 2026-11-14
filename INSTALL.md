# Install and Run the Book

The project uses the MyST CLI directly. The CLI and book theme are built
from the `main` branches of local `mystmd` and `myst-theme` repositories,
located one directory above this project:

```text
../
├── mystmd/
├── myst-theme/
└── orbital-mechanics-notes/
```

1. From the project directory, update Bun and Node using [mise](https://mise.jdx.dev):

   ```bash
   mise upgrade bun node
   ```

2. Fetch and update `main` from upstream in both repositories:

   ```bash
   cd ../mystmd
   git fetch upstream
   git switch main
   git merge --ff-only upstream/main

   cd ../myst-theme
   git fetch upstream
   git switch main
   git merge --ff-only upstream/main
   ```

   These commands assume each repository has an `upstream` remote.

3. Install dependencies in both repositories:

   ```bash
   cd ../mystmd
   bun install

   cd ../myst-theme
   bun install
   ```

4. Build and link the MyST CLI:

   ```bash
   cd ../mystmd
   bun run build && bun run link
   ```

5. Build the book theme:

   ```bash
   cd ../myst-theme
   bun run theme:book
   ```

6. Install the book's JavaScript dependencies and generate its animation runtime:

   ```bash
   cd ../orbital-mechanics-notes
   bun install --frozen-lockfile
   bun run build:threejs
   ```

   The generated bundle and license notices are published through `assets/`.
   Rebuild after changing the animation sources or pinned dependencies. See
   [Three.js figures](plugins/THREEJS.md) for update and validation commands.

7. Start the book from the project repository:

   ```bash
   myst start --execute --debug --headless
   ```

For examples requiring Julia, install the project dependencies from the
project directory:

```bash
julia --project=. -e 'using Pkg; Pkg.instantiate(); Pkg.precompile();'
```
