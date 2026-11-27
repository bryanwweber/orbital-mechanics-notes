#!/usr/bin/env bash
set -euo pipefail

bun run build:threejs
myst build --html --execute "$@"
bun run book:media
