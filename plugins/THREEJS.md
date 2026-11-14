# Three.js figures

The `threejs` directive publishes a local HTML entry point and embeds it in a
standard MyST iframe figure. Run MyST from the repository root. HTML paths are
relative to the Markdown document; captions support MyST syntax.

```markdown
:::{threejs} scripts/two-body-inertial.html
:name: fig:example-animation
:title: Two-body motion in an inertial frame
:width: 100%
:placeholder: ../../assets/threejs-test-placeholder.png

The motion of two bodies viewed from an inertial frame.
:::
```

Use `@fig:example-animation` to reference the figure. `title` is required for
accessibility. `placeholder` is an optional document-relative image for static
document exports. MyST controls the iframe aspect ratio (currently 5:3).

The plugin writes HTML to `_build/threejs/`, registered in `project.static_files`.
MyST publishes this directory as `threejs/` alongside `assets/`. HTML entry points
must therefore load shared dependencies relative to their published location:
`../assets/js/orbital-three/orbital-three.js`. Models are resolved relative to
the runtime bundle, under `assets/models/`. The plugin copies the HTML
entry point; dependency files must be placed in the configured static directories.
The iframe URL is relative to the document route, consistent with `folders: true`
in this book. No URLs assume hosting at the domain root.

Restart the existing MyST process after changing plugin code. After HTML-only
changes, restart MyST or force a full rebuild so the staged and published HTML
copies are refreshed; touching unchanged Markdown may leave cached HTML in place.
Do not maintain source changes in the generated files in `_build/`.

## Animation source

The HTML entry points import `mountOrbitAnimation` from the shared bundle.
`assets-src/orbit-animation.mjs` defines the inertial, barycenter, primary-relative,
and relative-motion presets. The source was adapted from the original chapter
scripts; `assets-src/orbital-three.mjs` is the bundle entry point and exports the
required Three.js classes, addons, GUI, and mounting function.

The inertial model is `assets/models/two-body-inertial.glb`, whose Blender
source is `blender/two-body-inertial.blend`. It displays a precomputed animation,
independent of the Python numerical solution. Changes to trajectories should be
made through the model's source/export process.

Each iframe owns its renderer, camera, animation mixer, and GUI. The test uses a
single renderer animation loop, a resize observer, and unload cleanup. Animation
speed is applied once by the mixer. Failure to load the GLB displays an error.
Paused and offscreen instances suspend their animation loops. Model geometry is
preserved. The historical `two-body-intertial-cg-relative.js` file remains an HTML
script fragment for compatibility; new embeds should use the proper
`two-body-inertial-cg-relative.html` entry point. The bundled
placeholder image is a paused canvas capture from the browser check, copied from
`_build/browser/threejs-placeholder.png` to `assets/threejs-test-placeholder.png`.

## Rebuilding and updating the runtime

The runtime pins `three@0.187.0` and `lil-gui@0.21.0`. Dependencies come from their
official npm packages, recorded with integrity information in `bun.lock`.
The old manually copied r132dev distribution has been retired.

```bash
bun install --frozen-lockfile
bun run build:threejs
```

The build generates `assets/js/orbital-three/orbital-three.js`, both upstream MIT
license notices, and `provenance.json` with package versions, upstream repository
URLs, Bun version, and the bundle's SHA-256 digest. Commit these generated files
with source and dependency updates so the book can serve them without a runtime
package registry or CDN connection. Do not edit the generated JavaScript directly.

For a future upgrade, substitute explicit target versions:

```bash
bun add --exact three@0.187.0 lil-gui@0.21.0
bun run build:threejs
```

Review the [upstream migration guide](https://github.com/mrdoob/three.js/wiki/Migration-Guide),
upgrade in checkpoints for large revision gaps, and run the browser checks below.
Keep all core/addon imports on the same package version. Source changes require
a bundle rebuild before restarting the existing MyST server.
The completed r132dev-to-r187 checklist is in
[the migration plan](../plans/threejs-migration.md).

## Browser validation

Install dependencies with `bun install`, build the runtime with
`bun run build:threejs`, then install Chromium with
`bunx playwright install chromium`. The animation checks start a temporary local
server using the real chapter HTML entry points and asset files; they do not
require MyST or add a test page to the book.

- `node --test plugins/render3js.test.mjs`: directive and file diagnostics.
- `bun run browser:check`: basic page, browser errors, WebGL capability, screenshot.
- `bun run browser:threejs`: animation, controls, independent instances, resizing,
  and page navigation checks in a standalone browser fixture.
- `bun run browser:threejs:headed`: the same checks in a visible Chromium window.
  This mode passed on this machine; headless runs encountered WebGL capture stalls.
- `bun run browser:threejs:static`: stage HTML through the directive and serve it
  with the real bundle, GLBs, and placeholder under `/preview/`. This checks the
  static asset layout without relying on a previous MyST build.
- `bun run browser:threejs:models`: check all four migrated presets, label controls,
  default speeds, screenshots, and visible WebGL/model-loading errors.

Browser artifacts go in `_build/browser/`. The general `browser:check` command
uses the running book (override its server with `BOOK_URL`); the animation
commands use the standalone fixture beneath a deployment prefix. WebGL may use software rendering on this machine; these
checks do not measure hardware GPU performance.
