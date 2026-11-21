# Three.js figures

The `html-figure` directive publishes a local HTML entry point and embeds it in a
standard MyST iframe figure. Run MyST from the repository root. HTML paths are
relative to the Markdown document; captions support MyST syntax.

```markdown
:::{html-figure} assets/two-body-inertial.html
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

The plugin stages HTML and sibling web assets under `_build/html-figures/`,
preserving the source directory layout. `project.static_files` publishes its
`chapters/` tree. For example, `assets/two-body-inertial.html` stays in the
chapter's published `assets/` directory. Entry points import the shared bundle
using `../../../assets/js/orbital-three/orbital-three.js`. These relative URLs support
hosting beneath a deployment prefix. See [local HTML figures](HTML-FIGURES.md).

The former `threejs` plugin is no longer enabled; its source remains for legacy
reference. All book figures and browser fixtures use `html-figure`.

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

`assets-src/two-body-scenes.mjs` builds all four scenes with native spheres,
lines, materials, and animation tracks. No GLB downloads or Blender exports are
required. The former Blender sources and GLB exports have been removed.

Trajectories are computed from the initial conditions in the numerical chapters
using Kepler's equation. The inertial example spans 480 physical seconds; its
barycenter and primary presets subtract the appropriate moving origin. The Earth
example spans one orbit. Positions are scaled to 100 km per scene unit and mapped
from textbook Z up to Three.js Y up. Playback durations and default speeds match
the former exports. Small differences from the old sampled numerical solution
are expected because the new trajectories use analytic two-body propagation.
Change the initial conditions or geometry in this module, then rebuild the bundle.

Each iframe owns its renderer, camera, animation mixer, and GUI. A single renderer
animation loop, resize observer, and unload cleanup manage its lifecycle.
Animation speed is applied once by the mixer. Paused and offscreen instances
suspend their animation loops. The historical `two-body-intertial-cg-relative.js` file remains an HTML
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

- `node --test assets-src/two-body-scenes.test.mjs`: orbital energy, periodicity,
  initial state, and animated reference-frame consistency.
- `node --test plugins/htmlFigure.test.mjs`: directive and file diagnostics.
- `bun run browser:check`: basic page, browser errors, WebGL capability, screenshot.
- `bun run browser:threejs`: animation, controls, independent instances, resizing,
  and page navigation checks in a standalone browser fixture.
- `bun run browser:threejs:headed`: the same checks in a visible Chromium window.
  This mode passed on this machine; headless runs encountered WebGL capture stalls.
- `bun run browser:threejs:static`: stage HTML through the directive and serve it
  with the real bundle and placeholder under `/preview/`. This checks the
  static asset layout without relying on a previous MyST build.
- `bun run browser:threejs:models`: check all four migrated presets, label controls,
  default speeds, screenshots, absence of model requests, and visible WebGL errors.
- `bun run browser:threejs:chapters`: inspect the four figures on the two live
  numerical-solution chapter pages, including captions, cross-references, and assets.
  Add `--update-placeholders` to capture their paused canvases to
  `assets/threejs-placeholders/` for static exports. These images are generated
  from the procedural scenes by the shared runtime; edit `two-body-scenes.mjs`
  to change the trajectories, then regenerate the images with this command.

Browser artifacts go in `_build/browser/`. The general `browser:check` command
uses the running book (override its server with `BOOK_URL`); the animation
commands use the standalone fixture beneath a deployment prefix. WebGL may use software rendering on this machine; these
checks do not measure hardware GPU performance.
