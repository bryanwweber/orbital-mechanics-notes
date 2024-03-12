# Install/Build the Book

The repo is set up to use [mise](https://mise.jdx.dev) to install required tools. Once `mise` is installed, changing into this directory should install the correct tools with the right versions. If not, run `mise install` to install everything.

After that, running `pdm install` should install the dependencies. Then `doit build_jb` will build the book.

If you want to work on the book, you may also need to install Julia dependencies. `mise` should install Julia. Running `julia --project=. -e 'using Pkg; Pkg.instantiate(); Pkg.precompile();'` should install dependencies in a local project.
