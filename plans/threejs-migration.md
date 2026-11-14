# Three.js migration

Replace the manually copied Three.js distribution with pinned upstream packages
and a reproducible Bun build, then migrate the book animations to stable r187.
Update this checklist as work is completed; passing an intermediate checkpoint
does not complete the final validation steps.

## 1. Record the baseline

- [x] Identify the vendored revision: the core reports `132dev`, 55 revision
  increments behind r187.
- [x] Inspect Git history: `9b00024` added the distribution on August 19, 2021;
  `37f083b` updated the core builds and GLTFLoader on August 24, 2021. The original
  download source and exact upstream commit are not recorded. OrbitControls and
  dat.gui were not updated in the second commit.
- [x] Identify consumers in `chapters/the-n-body-problem/scripts/`:
  `threejs-test.html`, `two-body-inertial.html`, `two-body-relative.html`,
  `two-body-inertial-m1-relative.html`, and `two-body-intertial-cg-relative.js`.
- [x] Establish working headed Chromium checks for model loading, animation,
  pause, orbit controls, independent instances, resizing, navigation, and browser
  errors. `bun run browser:threejs:headed` passed before the migration.
- [x] Establish static asset checks beneath a URL prefix.
  `bun run browser:threejs:static` passed before the migration.
- [x] Preserve baseline screenshots and validation results separately from files
  overwritten by subsequent browser checks. Record lighting, colors, labels,
  camera framing, and speed-control behavior for comparison.

Baseline artifacts: `_build/browser/baseline-r132dev/` (desktop, mobile, and
paused canvas). The baseline has a black background, blue/white trajectories,
a green barycenter path, initial diagonal camera framing, label toggle, and
default animation speed 2.5.

## 2. Make dependencies and asset generation reproducible

- [x] Add exact-version dependencies for `three` and `lil-gui`, recording them in
  `package.json` and `bun.lock`. Use pinned Three.js versions at each checkpoint.
- [x] Create a shared module exporting the Three.js classes, GLTFLoader,
  OrbitControls, and GUI required by the animation consumers.
- [x] Add a Bun build command to bundle that module and its transitive imports
  into a new asset alongside the existing `assets/js/three/` distribution.
- [x] Keep all Three.js core and addon imports on the same package version.
- [x] Include required upstream license notices and identify generated assets.
- [x] Verify a clean dependency install and build reproduces the asset without
  manually downloading or editing upstream files.

Clean install verified in a fresh `/tmp/threejs-migration.*` directory using
`bun install --frozen-lockfile --ignore-scripts` and `bun run build:threejs`.
The resulting JavaScript matched the repository bundle byte for byte.

## 3. Upgrade incrementally on the test page

Use the existing `threejs-test.md` page and its dedicated HTML script first.
Review the upstream migration entries between each checkpoint; resolve applicable
deprecations and breaking changes before advancing. Record validation results
and any changes next to the corresponding checkpoint.

- [x] r132dev → r140 — Three.js 0.140.2 with lil-gui 0.21.0; all headed
  interaction checks passed. Updated GUI construction and input selectors.
- [x] r140 → r150 — Three.js 0.150.1; all headed interaction checks passed.
- [x] r150 → r160 — Three.js 0.160.1; all headed interaction checks passed.
  Replaced encoding APIs with `outputColorSpace`/`SRGBColorSpace`, including
  canvas textures; inspected the paused rendering against the baseline.
- [x] r160 → r170 — Three.js 0.170.0; all headed interaction checks passed.
- [x] r170 → r180 — Three.js 0.180.0; all headed interaction checks passed.
  Replaced Clock with Timer, including reset/connect/dispose behavior.
- [x] r180 → r187 — Three.js 0.187.0; all headed interaction checks passed
  with no browser errors or deprecated-API warnings.

Keep the old distribution available for existing consumers throughout this phase.
The target is the stable r187 release verified during planning, rather than an
unversioned development build or a moving `latest` dependency.

## 4. Adapt animation APIs

Apply these changes at the checkpoint where they become necessary.

- [x] Replace `renderer.outputEncoding` and `sRGBEncoding` with current color-space
  APIs; review canvas texture color-space settings as well.
- [x] Replace dat.gui with lil-gui and update browser-check control selectors.
- [x] Review changed lighting and color-management defaults against the baseline.
- [x] Verify GLB loading, named-object lookup, animation clips, speed controls,
  camera controls, and geometry handling with the existing model.
- [x] Review clock/timer APIs, animation-loop ownership, resize behavior, and
  cleanup against the target release.
- [x] Provide a useful visible error when WebGL 2 or model loading is unavailable.

The shared runtime preserves the original GLB geometry. Experimental
trajectory-tube simplification was removed to avoid assumptions about vertex
layout; animation rendering pauses when offscreen or paused by the reader.

## 5. Validate the final test-page implementation

- [x] Run directive tests: `node --test plugins/render3js.test.mjs`.
- [x] Run `bun run browser:threejs:headed` at r187 and confirm model loading,
  visible animation, pause/resume, orbit controls, independent instances,
  mobile resizing, and navigation away and back.
- [x] Check browser errors and failed asset requests.
- [x] Inspect screenshots and compare appearance and animation speed with the
  preserved baseline; document intentional differences.
- [x] Run `bun run browser:threejs:static` to verify published HTML, JavaScript,
  GLB, and placeholder assets beneath a deployment prefix.
- [x] Refresh the static placeholder if the final rendering changes its appearance.
- [x] Run formatting/lint checks scoped to changed files and `git diff --check`.

Headed Chromium passed the existing checks. Headless Chromium encountered WebGL
capture stalls; do not treat headless capture failures as proof of an animation
failure without reproducing them in headed mode.

## 6. Migrate the remaining consumers

The repository requires specific approval for chapter-directory edits. The test
page and its dedicated test script are the current migration workspace. Obtain
specific approval before changing the older chapter scripts or replacing figures
in existing book text. Do not modify `vendor/`.

- [x] Confirm approval and scope for edits to the older chapter consumers.
  User approved migration of all four older scripts, leaving book Markdown unchanged.
- [x] Update remaining scripts to import the shared bundle and use current APIs.
- [x] Correct their asset paths for the MyST publication layout.
- [x] Validate each animation and each affected book page in headed Chromium.
- [x] Inventory consumers again and confirm no live imports use the old builds.

All four model presets passed headed validation, including label controls and
default speeds. Screenshots are in `_build/browser/r187-models/`. Both visible
failure states (WebGL 2 unavailable and failed GLB request) passed as well.
The historical barycenter `.js` HTML fragment is retained as a compatibility
adapter; new embeds use `two-body-inertial-cg-relative.html`. Existing book
Markdown still uses its original figures and was not changed.

## 7. Retire old copies and document future updates

- [x] Remove obsolete copies only after all consumers have migrated, including
  unused `three.js`, `three.min.js`, and dat.gui files.
- [x] Document package versions, upstream provenance, source versus generated
  files, license notices, and exact dependency-update/build commands.
- [x] Document the required browser and static asset checks for future upgrades.
- [x] Ensure generated asset creation is included in the documented MyST workflow.
- [x] Perform a final clean build and focused validation after legacy-file removal.

## Final validation record

- Final dependencies: `three@0.187.0`, `lil-gui@0.21.0`.
- `bun run build:threejs`: passed; a frozen-lockfile install in a fresh temporary
  directory reproduced the generated JavaScript byte for byte.
- `node --test plugins/render3js.test.mjs`: passed.
- `bun run browser:threejs:headed`: passed at every revision checkpoint, then
  passed again on the final shared runtime after legacy-file removal.
- `bun run browser:threejs:models`: all four models, label controls, default speeds,
  and both visible error states passed with original GLB geometry preserved.
- `bun run browser:threejs:static`: final bundle, model, and refreshed placeholder
  loaded under `/preview/` with no missing assets.
- JavaScript syntax checks, scoped Markdown lint, and `git diff --check`: passed.
- Screenshots were inspected against the baseline. Camera framing and trajectory
  colors are retained; the GUI now uses lil-gui's titled Controls panel. Canvas
  textures use explicit sRGB color space, and speed is applied once by the mixer.
- The refreshed static placeholder is a capture of the final r187 canvas.
- No original book Markdown, Blender scenes, GLBs, or `vendor/` files were edited.
  Validation used the existing MyST server and a separate static asset fixture;
  the full book's computational examples were not re-executed.

The source/build/update instructions are in `plugins/THREEJS.md` and `INSTALL.md`.
The generated bundle, upstream license notices, and provenance are under
`assets/js/orbital-three/`. Legacy imports were searched again and none remain
in the animation consumers or shared runtime sources.

## Upstream references

- [Installation](https://threejs.org/manual/pages/installation.html): package-based
  installation and build tools.
- [Migration guide](https://github.com/mrdoob/three.js/wiki/Migration-Guide): breaking
  changes and the recommendation to upgrade in increments of about ten revisions.
- [r187 release](https://github.com/mrdoob/three.js/releases/tag/r187): the migration
  target, published October 30, 2026.

## Test-page cleanup

- [x] Remove the temporary `threejs-test.md` and `scripts/threejs-test.html`
  files and the test page's table-of-contents entry at the user's request.
- [x] Point directive tests at the real inertial animation entry point.
- [x] Move browser checks to a standalone local fixture that stages real animation
  HTML through the directive; no temporary book page or previous build is needed.
- [x] Revalidate browser checks after cleanup: directive tests, headed interaction
  checks, all model/error-state checks, and deployment-prefix checks passed.
