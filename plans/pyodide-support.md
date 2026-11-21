# Plan: Interactive Python Examples with Pyodide

## 1. Objective and recommended approach

Enable readers to edit and execute the book's Python examples directly in their browsers, with no Python installation, account, or remote kernel required. Preserve the existing readable textbook, mathematical notation, cross-references, figures, and build-time execution. A reader who never activates Python must still receive a complete book.

Start with MyST's existing in-page execution integration: MyST book theme → Thebe → JupyterLite's Python kernel → Pyodide. Treat this as a compatibility investigation followed by a narrowly scoped pilot, rather than assuming a configuration switch makes the entire book executable. Retain the Jupyter message and MIME output model wherever possible. Add project-specific metadata, package provisioning, and small theme extensions only where the pilot demonstrates a gap.

Use a custom Pyodide worker runner only if the existing integration cannot meet concrete requirements such as package pinning, reliable stop/reset behavior, or selective cell execution. Do not maintain two independent production execution systems. Record the architecture decision and evidence before expanding beyond the pilot.

This document is an implementation plan, not an implementation or a claim that browser compatibility has been tested. Version-sensitive upstream documentation was consulted on 2026-11-14. Proposed paths, schemas, UI controls, budgets, and milestones below are design proposals unless explicitly described as existing.

## 2. Scope and repository boundaries

### 2.1 Included outcomes

- Editable Python cells and sequential execution within an example.
- Text, numerical results, tracebacks, tables, and static Matplotlib plots.
- Explicit handling of values currently displayed through inline `{eval}` expressions.
- A declared browser environment independent of the native development environment.
- Lazy startup, useful loading feedback, failure recovery, and static fallback.
- Page-level eligibility, documented exclusions, and a repeatable compatibility inventory.
- Browser tests against the actual built site and deployed asset paths.
- A gradual rollout that expands only after numerical and usability checks pass.

### 2.2 Deferred features

- Making every installed native Python dependency work in WebAssembly.
- A full JupyterLab interface, arbitrary terminal commands, or arbitrary operating-system access.
- Interactive Julia or MATLAB execution; those examples remain readable.
- General widget support, live Bokeh applications, and Python-generated interactive animations in the first release.
- Automatic offline installation of the entire numerical environment.
- Cross-device persistence, user accounts, analytics, collaboration, and server-side code execution.
- Automatically changing every number in prose or regenerating the whole page after each edit.

### 2.3 Change restrictions

The repository's `AGENTS.md` requires specific approval for edits anywhere under `chapters/` and prohibits changes to `vendor/`. Planning and read-only inspection do not authorize future chapter edits. Implement the first spike with fixtures outside `chapters/` or a generated preview copy under `_build/`. Before changing a chapter, prepare the exact proposed changes and request approval for those files. Keep native book sources as the source of truth; do not hand-maintain copies of example code.

Changes to a sibling `../myst-theme` or `../mystmd` repository must be scoped, tracked, and reviewed separately, with its own applicable instructions checked first. A local sibling checkout is not a deployable dependency specification. Prefer upstream contributions or pinned, published artifacts over unrecorded local patches.

The working tree already contains unrelated Three.js, stylesheet, configuration, and browser-tool changes. Preserve them. Baseline any implementation against the current working tree and distinguish existing modifications from Pyodide work.

## 3. Current repository findings

### 3.1 Authoring and execution

Read-only inspection found 76 Markdown files and one Python file under `chapters/`; this is a file count, not an executable-cell count. Many Markdown files have Jupytext metadata and Python kernelspecs. Python code-cell directives use both `ipython3` and `python`; kernel metadata also uses `python3`. Normalize these as Python aliases during eligibility analysis without relabeling MATLAB or Julia content.

Examples frequently span multiple cells separated by explanatory prose, equations, or Python/MATLAB tabs. Later cells depend on earlier variables, functions, and imports. Running a single isolated snippet will often fail even when every required package is available.

Several examples assign variables without printing or returning anything. For instance, `chapters/orbital-maneuvers/hohmann-transfer-example.md` computes velocities and propellant mass in four cells and places results in prose using `{eval}`. Editable cells alone would give the reader little visible feedback. This must be addressed in the pilot.

Hidden and removed cells use `remove-cell` and `remove-input` tags. Some generate figures or embedded HTML; others may supply state needed by visible examples. Visibility is not an execution policy. Conversely, a cell used during native publishing is not automatically appropriate to run in a browser.

### 3.2 Existing MyST and theme integration

`myst.yml` currently sets `project.jupyter: false`. Its static-file configuration includes `assets/` and `_build/threejs/`. The active working tree registers both `plugins/inlineHTML.mjs` and `plugins/render3js.mjs`. Although the supplied repository overview describes the Three.js plugin as unfinished and disabled, the current files have changed; inspect their actual implementation before choosing extension points.

`plugins/inlineHTML.mjs` converts inline expression results into ordinary text and superscript/subscript nodes at document transform time. That can erase the executable expression identity needed for later live updates. Do not assume the browser can recover an expression by inspecting its rendered number.

The documented local workflow builds sibling MyST CLI and theme checkouts, then serves this book with `myst start --execute --debug --headless`. Both `site.template` examples are commented out in the current configuration. Identify and record the theme actually selected by the running CLI before relying on sibling source changes.

Local theme inspection provides useful evidence for the preferred approach: `../myst-theme/packages/jupyter/src/utils.ts` maps `lite: true` to `useJupyterLite: true`; the package includes page and cell execution hooks, controls, and MIME renderers. The local MyST frontmatter types include `lite` and `disableSessionSaving`. This confirms integration code exists, but does not establish that the running site uses that revision or that its bundled kernel meets the book's needs.

The theme's public assets include Thebe bundles. Presence of those files does not establish that all dynamically imported chunks, kernel assets, runtime files, and wheels will be published correctly.

### 3.3 Native dependencies and build risks

The root Python environment includes NumPy, SciPy, Matplotlib, pandas, Astropy, Pint, pint-pandas, poliastro, Skyfield, SymPy, Plotly, Bokeh, pyproj, uncertainties, and authoring tools. A browser environment should contain only the packages needed for enabled examples.

The native root Python constraint is `>=3.10,<3.14`; the local `render-svg` package requires Python 3.13 or newer. Browser Python comes from the chosen Pyodide release and may differ. These are separate compatibility problems: validate browser examples against that runtime, and choose a compatible native interpreter/workspace installation strategy for builds.

The local poliastro fork depends on Numba, Astropy, astroquery, jplephem, and other scientific packages. Its native dependency resolution is not evidence of browser support. In particular, Numba-dependent paths require an explicit compatibility decision; do not work around dependency resolution with an untested no-op shim.

The existing GitHub Actions workflow installs Python 3.12 and still invokes `jupyter-book build`, publishing `_build/html`. This does not match the documented MyST CLI workflow. Reconcile and verify publishing as a separate prerequisite for a production launch; do not assume a successful local preview means GitHub Pages will contain runnable assets.

The repository already has Playwright and `scripts/browser-check.mjs` plus a Three.js check. Reuse their browser tooling patterns, but create Python-specific assertions: the existing general check requires WebGL, which is unrelated to a Python arithmetic example.

## 4. Upstream capabilities and evidence

MyST documents `project.jupyter.lite: true` for browser computation. Its in-page execution feature is described as beta. Setting only `jupyter: true` selects Binder defaults, so explicitly request Lite. The documentation also describes execution of page cells on activation: verify that behavior against the selected theme and control it before enabling expensive or file-dependent pages. [MyST in-page execution](https://mystmd.org/guide/in-page-execution).

Thebe's React Lite integration uses separately deployed JavaScript bundles. Its documentation says the integration loads Pyodide and base wheels from a CDN. Consequently, self-hosting or overriding runtime versions may require a supported lower-level option or a theme/Thebe change; adding a directory to this book's static files alone may not redirect those requests. [Thebe React and Lite](https://mystmd.org/thebe/react-lite).

Pyodide's worker documentation explains how to move Python execution off the UI thread. The stable page consulted identifies version `314.0.8` and requires module workers for that release. Older examples and a bundled Thebe kernel may target different releases. Record the actual runtime version and follow its matching documentation; do not mix release families. [Pyodide workers](https://pyodide.org/en/stable/usage/webworker.html).

Pyodide supports packaged scientific dependencies and compatible wheels; `micropip` resolves dependencies, while import-based package discovery does not install arbitrary PyPI packages. A normal native binary wheel is insufficient. Browser support must be proven for the selected Python/Emscripten ABI and transitive dependency set. [Loading packages](https://pyodide.org/en/stable/usage/loading-packages.html).

Cooperative Pyodide interrupts require a worker and a shared interrupt buffer, with the relevant server security headers. A default static hosting target may not provide these headers. Plan a worker/kernel termination fallback that discards state, and verify what Thebe actually exposes. [Interrupting execution](https://pyodide.org/en/stable/usage/keyboard-interrupts.html).

Use these links as implementation references, not as a substitute for pinning and testing dependencies. Before coding, archive the exact versioned documentation URLs associated with the chosen release tuple.

## 5. Architecture decision and initial spike

### 5.1 Candidate approaches

| Approach                                             | Advantages for this repository                                                        | Costs and unresolved questions                                                                                | Decision                                                   |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Existing MyST/Thebe/Lite                             | Existing cells, controls, kernel messages, and rich-output integration                | Beta behavior; startup execution; pinning and asset configuration; lifecycle control                          | Preferred first spike                                      |
| Extend theme/Thebe Lite integration                  | Retains MyST and Jupyter output semantics; can add missing configuration and controls | Separate repository ownership, packaging, upstream maintenance                                                | Preferred if gaps are limited                              |
| Custom Pyodide worker plus MyST components           | Direct runtime, queue, filesystem, and stop control                                   | Must implement execution semantics, display hooks, editor integration, sanitization, and navigation lifecycle | Fallback after documented failure of preferred route       |
| Standalone JupyterLite application linked from pages | Rich editing environment and notebook export                                          | Does not by itself make existing inline examples interactive                                                  | Optional future supplement                                 |
| Binder or another remote kernel                      | Native packages and operating-system capabilities                                     | Remote service, latency, availability, and operational cost                                                   | Possible separately labeled route for unsupported examples |

### 5.2 Spike procedure

1. Record CLI/theme commit identifiers, active theme artifact, Thebe versions, kernel package, Pyodide version, Python version, and lockfile state. Trace browser requests to confirm the assets actually loaded.
2. Prepare a temporary preview project outside `chapters/`, using copied/generated fixtures from the real examples and the active book configuration. Keep this fixture isolated from production TOC discovery and exclude build outputs from version control.
3. Explicitly enable Lite in that preview. Start with standard-library arithmetic, then NumPy, a SciPy root solve, and a Matplotlib plot.
4. Observe activation: which cells execute, which are editable, how tags affect execution, and what persists across route changes.
5. Inspect the serialized MyST document and browser notebook model to find stable cell identifiers, source, ordering, tags, expression nodes, and output IDs. Do not build a DOM scraper if structured data is available.
6. Exercise stop, reset, error, reload, and navigation. Include a deliberate infinite Python loop, with a test timeout and cleanup that cannot leave the test runner hanging.
7. Determine how to install/pin packages before user cells run, how to mount files, and whether runtime and wheel URLs are configurable.
8. Inspect all asset requests from a fresh browser profile under both a root URL and a non-root deployment prefix. Confirm no Binder connection occurs.
9. Compare one browser numerical result to native execution and the book's published value.
10. Write an architecture decision with proven capabilities, gaps, proposed extension locations, selected release tuple, and a go/no-go result.

### 5.3 Initial configuration candidate

The following is a preview-project configuration candidate based on documented MyST keys, not a directive to enable every production page:

```yaml
project:
  jupyter:
    lite: true
    disableSessionSaving: true
```

Check the installed schema and resulting kernel name. Do not assume `ipython3`, `python3`, and the Lite kernel registration name are interchangeable at connection time. `disableSessionSaving` is a connection/session option; it is not a promise that editor content, files, or kernel variables are erased.

Production rollout needs a page allowlist. Prefer supported page frontmatter overrides once specific chapter edits are approved. If a project-level metadata overlay is necessary to avoid chapter edits, prototype a documented MyST transform and verify that its execution stage actually affects serialized page configuration. Do not invent a frontmatter option or assume an AST transform can change application runtime configuration.

## 6. Inventory and compatibility classification

### 6.1 Generate an inventory before bulk enablement

Implement a read-only inventory tool using the MyST parser or its serialized notebook representation. Regular expressions can help exploration, but are not sufficient for nested directives, tabs, includes, and cell options. Emit a machine-readable JSON report and a human-readable Markdown summary under `_build/pyodide/`.

For each page, record:

- Source path, canonical slug, TOC membership, kernel language, and kernelspec.
- Every code cell in source execution order, including hidden cells and tab contents.
- Stable identity, source location, source hash, directive language, labels, and tags.
- Imports and known dynamic imports; map import names to package distributions.
- Variables/functions apparently supplied by preceding cells, as advisory information.
- Inline expressions and their positions relative to cells.
- Local imports, files read or written, remote URLs, and expected current directory.
- Plot/display APIs, notebook magics, shell escapes, subprocesses, animation writers, and widget use.
- Estimated package tier, runtime cost, file size, output type, and eligibility rationale.
- Required manual audit and numerical verification cases.

Static analysis cannot prove dynamic Python dependencies or side effects. Use it to direct review, then validate every enabled page in a fresh browser kernel. New or changed cells should invalidate the audited source hash and require reclassification.

### 6.2 Eligibility classes

| Class | Description                                                                | Initial behavior                 |
| ----- | -------------------------------------------------------------------------- | -------------------------------- |
| A     | Standard-library calculations without files/network                        | Pilot eligible                   |
| B     | Tested NumPy/SciPy calculations                                            | Eligible after numerical checks  |
| C     | Matplotlib or pandas output with supported display path                    | Eligible after rendering checks  |
| D     | Local helper modules, fixtures, or small curated datasets                  | Requires explicit file manifest  |
| E     | Astronomy dependencies, ephemerides, widgets, animations, network services | Deferred pending dedicated spike |
| F     | Non-Python, publishing infrastructure, or unsupported system operations    | Static, with a reason            |

### 6.3 Proposed pilot and rollout pages

| Page                                                                                            | What it proves                                                               | Required caveats                                                  |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `chapters/orbital-maneuvers/hohmann-transfer-example.md`                                        | Lightweight standard-library math; four-cell state; inline numerical results | Add a visible live result path; assignments alone display nothing |
| `chapters/time-since-periapsis-and-keplers-equation/universal-lagrange-coefficients-example.md` | NumPy and SciPy root finding in a worked example                             | Check guesses, convergence, units, and output precision           |
| `chapters/the-n-body-problem/two-body-relative-numerical-solution.md`                           | SciPy integration, stateful cells, plots, and Python/MATLAB tabs             | Audit hidden cells, runtime, ordering, and static plots           |
| `chapters/orbital-maneuvers/phasing-maneuvers-example.md`                                       | pandas and numerical tables                                                  | Confirm HTML table formatting and output limits                   |
| `chapters/reference/julian-date.md`                                                             | Standard-library date/time examples                                          | Make time-zone and date assumptions explicit                      |

Begin with Hohmann plus one numerical/plot page. Treat the other rows as subsequent candidates, not a commitment that they already pass.

Known later investigations include `chapters/reference/planetary-ephemeris.md` for Astropy/poliastro, `chapters/reference/planetary-parameters.md` for Skyfield and `de442s.bsp`, `chapters/orbital-maneuvers/plane-change-maneuvers.md` for Bokeh/pyproj/map tiles, and `chapters/the-n-body-problem/lagrange-points.md` for animations. The orbit-equation hyperbola page imports `hyperbolic_trajectory`; resolve its actual module path and packaging before making that page executable.

## 7. Browser environment and reproducibility

### 7.1 Separate browser dependency declaration

Add a proposed `interactive/environment.yml` with the runtime release, Python ABI, kernel and Thebe versions, package groups, custom wheels, hashes, and asset origins. Generate any installer inputs and browser manifest from it. This is project metadata, not an assumed MyST-native schema.

Use a small set of tested environments rather than every combination of packages:

| Profile                  | Intended dependencies                              | Purpose                              |
| ------------------------ | -------------------------------------------------- | ------------------------------------ |
| `stdlib`                 | Runtime standard library                           | Arithmetic and date examples         |
| `numerical`              | NumPy, SciPy                                       | Root finding and orbital integration |
| `plotting`               | Numerical profile plus Matplotlib                  | Static numerical plots               |
| `tables`                 | pandas and required numerical dependencies         | Tabular examples                     |
| `astronomy-experimental` | Individually verified astronomy packages and files | Isolated later investigation         |

Package availability and exact compatible versions must be established from the selected Pyodide distribution and real browser installs. Do not claim every package in these proposed profiles is supported merely because it imports natively.

### 7.2 Provisioning rules

1. Pin one coherent kernel/runtime/tooling tuple. A Thebe-bundled kernel may constrain the Pyodide release; test that tuple before selecting the newest standalone runtime.
2. Prefer packages built for that distribution for compiled numerical libraries. Verify Python ABI and Emscripten compatibility for custom wheels.
3. Use `micropip` for compatible wheel dependency resolution where required. Store exact wheel URLs and hashes for project-provided packages.
4. Load all declared packages before the first dependent cell. Keep one initialization promise and a serialized install/execution queue per kernel.
5. Do not perform an unrestricted fresh PyPI solve on every page activation. Avoid silently upgrading transitive dependencies between reader sessions.
6. Treat import scanning as assistance, not the lockfile. Dynamic imports and differing distribution names need explicit mappings, such as `pint_pandas` → `pint-pandas`.
7. For reader-added imports outside a profile, initially show a clear unsupported-package message with a native-notebook route. Decide later whether to offer explicitly requested extra installations.
8. Capture installed package versions and the runtime version in test artifacts and optional diagnostic details.

### 7.3 Astronomy and native-package decisions

Test Astropy's required coordinate and time operations with the actual browser build, including optional data access. Test Pint/pint-pandas compatibility as a pair. Test Skyfield together with jplephem, its time data, and a bounded ephemeris fixture. Test pyproj with the specific coordinate transformation and required projection data.

For poliastro, first trace which functions the book uses and where Numba or unsupported native features enter. Possible outcomes are a verified compatible package build, a separately maintained browser-specific implementation reviewed for numerical equivalence, an approved chapter refactor to supported APIs, or a static/native-only page. A replacement scientific algorithm is a substantive book change and requires its own review. Do not edit the vendored fork or silently substitute algorithms.

Keep JupyterLab, render-svg, CLI tools, Blender, and publishing-only dependencies out of browser profiles. Neither `uv.lock` nor `bun.lock` alone locks the browser Python environment; retain both existing locks and add explicit browser-environment provenance.

## 8. Page and cell metadata

### 8.1 Proposed manifest

Use a proposed `interactive/pages.yml` as an implementation-owned policy manifest, validated by a project schema. Store page eligibility, profile, ordered cell references, hidden setup policy, file mappings, result expressions, and resource limits. Generate browser-consumable JSON during the build. Avoid duplicating Python source in this manifest.

Illustrative shape only:

```yaml
schema_version: 1
pages:
  chapters/orbital-maneuvers/hohmann-transfer-example.md:
    enabled: true
    profile: stdlib
    execution: sequential
    timeout_seconds: 30
    results:
      - expression: Delta_v
        label: Total velocity change
        unit: km/s
      - expression: Delta_m
        label: Propellant mass
        unit: kg
```

Expressions and metadata in this manifest are trusted book source. Preserve source locations and hashes so generation fails if a cell mapping becomes ambiguous. Prefer existing stable MyST cell IDs or explicit labels; when unavailable, use path plus source identity with a drift check. A numerical ordinal alone is insufficient because inserting an earlier cell can silently remap policies.

### 8.2 Policy for existing tags

| Existing content                    | Browser treatment                                                                         |
| ----------------------------------- | ----------------------------------------------------------------------------------------- |
| Visible Python code cell            | Editable when its page/profile is enabled                                                 |
| `remove-input`                      | Retain author intent; run only after side-effect review; provide setup details accessibly |
| `remove-cell`                       | Excluded by default until classified as required safe setup or approved live computation  |
| Hidden plotting/publishing helper   | Keep static unless the live example demonstrably needs it                                 |
| MATLAB/Julia/literal source include | Readable source; no Python run control                                                    |
| Plain illustrative Python fence     | Static unless explicitly classified as a complete executable example                      |
| Inline `{eval}`                     | Published result by default; optional separately designed live binding                    |

Do not globally drop removed cells from the runtime notebook: some may initialize variables. Do not globally execute them either: some read files, generate HTML, or perform publishing work. An enabled page must contain a reviewed, complete execution sequence.

## 9. Execution semantics and state

### 9.1 User-facing controls

Offer Activate Python, Run cell, Run through this cell, Run all, Stop, Restart runtime, Restore original code, and Clear live output as supported by the selected adapter. These operations need distinct definitions. Restoring source must not imply that old Python variables have vanished. Restart must visibly indicate that variables and temporary files are lost.

Activation may run an explicitly reviewed short setup sequence, but should not unexpectedly launch expensive full-page computations. If upstream behavior automatically executes all cells on activation, adapt it or restrict the page's runtime notebook to an approved sequence. Gate production release on this behavior.

### 9.2 Runtime isolation

Default to one active page kernel per tab, with a fresh namespace on entering a different interactive page. Share downloads through HTTP caching, not Python globals across unrelated examples. Ensure page A's variable cannot affect page B even if names overlap.

For pages containing multiple independently embedded notebooks, preserve their existing notebook scope boundaries and record the intended execution order; do not flatten them blindly into one namespace. If the selected theme already provides execution scopes, test and reuse those semantics.

On route change, cancel pending UI operations, dispose the old execution scope, and ignore late messages. Keep at most one heavy active runtime initially. Browser Back/Forward should restore readable content safely; edited source may be restored only through an explicitly designed draft mechanism.

### 9.3 Ordering and stale results

- Serialize execution requests within a kernel. Disable conflicting Run all and Run cell actions while a sequence is active.
- Run all uses document order and stops at the first error. Display which cell failed and leave later results marked unexecuted or stale.
- Run through executes the declared prerequisites and target from a known state. Clearly distinguish incremental execution from a fresh deterministic rerun.
- Do not claim static dependency analysis proves which cells need rerunning. Conservatively mark all later cells and related live results stale when a preceding cell changes.
- A failed cell may have partially mutated state. Offer restart and rerun; do not present failure as a transaction rollback.
- Keep editor revision identifiers and runtime generation identifiers. A completion for an older source revision cannot mark the current source as successfully executed.
- Use a fresh restart plus Run all as the reproducibility path. Reset random seeds only where the scientific example specifies them.

### 9.4 Stop and reset

Test kernel interrupt support end to end. A worker blocked by synchronous Python cannot process an ordinary queued stop message. Cooperative interrupts need the documented shared-buffer mechanism and compatible hosting headers. If unavailable or ineffective, terminate the underlying worker/kernel and recreate it, telling the reader that state was cleared.

Do not assume Thebe's disconnect or notebook reset kills a busy worker. Confirm the actual lifecycle API. If it cannot guarantee bounded cancellation, add a supported kernel-disposal extension or choose the fallback architecture. Keep a main-thread watchdog for loading and execution; an infinite loop must not freeze the page or leave controls permanently busy.

## 10. Results, prose, and plots

### 10.1 Published versus live results

Keep published prose and build outputs as the stable reference. Label browser results as Live results and indicate when source has changed. In the first release, explain that prose values show the published example and add an adjacent live results panel for examples that otherwise show no output.

For the Hohmann pilot, the panel should report at least `Delta_v` in km/s and `Delta_m` in kg after the final cell succeeds. Use the same formatting precision as the published example where useful. Result expressions must run in the same page namespace after their required cells, and a failed or stale sequence must not leave old values looking current.

Do not append hidden `print()` calls to every author cell. Keep result inspection in a declared display step with provenance, and preserve the original downloadable Python source. An approved future chapter change could instead add explicit displays, if that improves the lesson.

### 10.2 Optional later inline updates

Before live inline `{eval}` updates, determine whether MyST's execution model retains bindings through the inline HTML transform. If it does not, extend the transform or serialization before it discards expression identity. Preserve expression source, source position, formatting, original output, and dependency boundary.

Evaluate each inline expression at its original point in the ordered notebook, rather than evaluating every expression against final globals: later cells can reuse variable names. Invalidate bindings after upstream edits. Render text as text, and support only explicitly approved HTML structures. Preserve superscripts, subscripts, math accessibility, and line wrapping.

Prototype this with repeated variable assignments and HTML-formatted quantities. It is a separate milestone because incorrect live prose can be more misleading than a clearly separated live panel.

### 10.3 MIME output policy

| Output                 | Initial handling                                                                          |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| stdout/stderr          | Stream bounded text to the producing cell                                                 |
| Python exceptions      | Show cell-local traceback; retain line numbers and hide irrelevant infrastructure details |
| `text/plain`           | Escape and display as text                                                                |
| `image/png`            | Display bounded raster image with available caption/context                               |
| Matplotlib             | Prefer tested static PNG output through the kernel MIME pipeline                          |
| pandas HTML tables     | Render through the existing safe MIME path; constrain dimensions and provide scrolling    |
| `text/latex`           | Use existing math rendering if supported and tested                                       |
| SVG/HTML               | Sanitize with explicit allowlists; do not execute scripts from reader-generated output    |
| Plotly/Bokeh/widgets   | Deferred unless individually tested, including JavaScript dependencies and cleanup        |
| JavaScript MIME output | Disabled for the initial live runner                                                      |

Reuse the theme's Jupyter MIME rendering if it meets these requirements. If a direct runner is selected, specify and implement display hooks deliberately: `runPythonAsync` does not by itself produce complete notebook display semantics. Handle last expressions, `display()`, multiple figures, updates, and figure cleanup. A worker has no DOM access, so send serialized MIME data to the renderer.

Static Matplotlib plots are a legitimate first step: changing inputs and rerunning is interactive even without pan/zoom. Avoid making `plt.show()` depend on an unsupported GUI backend. Audit notebook magics and animation writers; FFmpeg or native GUI assumptions should stay outside the initial browser path.

## 11. Files, modules, and data

Declare files in an explicit manifest rather than copying the entire repository into the browser. Each entry needs source, public URL, virtual destination, checksum, size, license/provenance, and pages requiring it. Validate paths to prevent traversal outside the allowed virtual root.

Use a predictable virtual directory such as `/book/<page-id>/` and set the page working directory deliberately. Download required resources before setup/import execution; create directories, write byte data, and configure `sys.path` only for approved helper modules. Browser filesystems do not automatically contain this repository or its sibling directories.

Do not alter generated figures to support browser execution without locating their source and generation process. Existing static images remain valid published assets. Helper modules under `chapters/` can be read and packaged without editing them, but changing them requires specific approval.

Prioritize embedded tables and small deterministic fixtures. The `de442s.bsp` ephemeris reference needs measured size, redistribution terms, download behavior, and memory testing before inclusion. Do not silently substitute a smaller or lower-precision ephemeris; that changes scientific assumptions.

Treat network access separately from ordinary filesystem operations. Remote astronomy services, map tiles, and HTTP libraries may require browser-specific fetch support and CORS permission; native socket behavior is not guaranteed. Prefer curated same-origin snapshots for reproducible teaching examples. Explicitly label any result based on a current external service.

Temporary files disappear on runtime restart unless persistence is deliberately implemented. Defer IndexedDB persistence initially. Offer downloads of user-created files only through a bounded explicit action, and never expose host filesystem paths as if they were browser-accessible.

## 12. Asset delivery, hosting, and security

### 12.1 Deployment model

Identify whether production is a root-domain or project-subpath GitHub Pages site. All manifests, worker modules, dynamic imports, kernel chunks, WASM files, wheels, fonts, and fixture URLs must resolve under the effective base URL. Test actual responses: a missing WASM request can return an HTML fallback with status 200 and still fail.

Choose between a pinned CDN-backed deployment and a pinned self-hosted distribution after the spike establishes configurability. CDN hosting is acceptable for the pilot if the version is immutable and failure leaves the book usable. Self-hosting gives control over availability and caching but increases artifact size and deployment responsibility.

Publish all assets required by the selected kernel; do not assume three obvious Pyodide files are sufficient. Use the release's documented distribution layout. Serve WASM with the correct MIME type and validate JavaScript module MIME types and cross-origin rules. Avoid a production dependence on files inside sibling checkouts.

### 12.2 Caching and upgrades

- Use immutable versioned URLs and content hashes where appropriate.
- Publish a manifest carrying schema version, environment digest, and source/build identifier.
- Ensure the manifest, kernel, runtime, and wheel set come from one coherent deployment.
- Prevent stale cached manifests from selecting removed runtime assets during upgrades; retain prior immutable assets for a defined transition or deploy atomically.
- Initially rely on HTTP caching. Add a service worker only if offline support is explicitly pursued and separately tested.
- A warm cache may reduce downloads but does not preserve a Python heap after restart. Communicate startup accurately.

### 12.3 Execution boundary and output trust

Reader-entered Python can reach browser APIs through Pyodide's JavaScript bridge. A Web Worker protects UI responsiveness but is not an application security sandbox. Do not place secrets, private tokens, or privileged APIs in the execution origin, runtime globals, or deployment manifest.

The initial site is public static content, but explicitly review its cookies, storage, and same-origin capabilities. If stronger isolation is required, prototype a separate execution origin/iframe and validate its communication, CORS, worker, and asset requirements. Keep this distinct from ordinary worker threading.

Restrict output rendering and bound message payloads even when authored source is trusted, because readers can edit it. Use an appropriate Content Security Policy for the selected loader, workers, WASM, and allowed origins; verify required directives instead of broadly allowing inline/evaluated scripts. Do not enable cross-origin isolation solely for nicer interrupts without evaluating its effect on existing images, Three.js assets, embeds, and external resources.

GitHub Pages deployments must demonstrate stop/reset behavior without assuming custom COOP/COEP headers. If the host cannot supply headers, use the tested termination fallback. Do not make ordinary execution contingent on a service-worker header workaround in the initial release.

## 13. Performance, accessibility, and failure experience

### 13.1 Loading and resource budgets

Keep the runtime and large packages off the initial reading path. Load lightweight controls only on eligible pages and fetch Python after explicit activation. Do not preload numerical packages merely because a reader scrolls past a code cell.

Set provisional budgets and revise them after measuring representative devices:

| Metric                                        | Initial target or policy                           |
| --------------------------------------------- | -------------------------------------------------- |
| Runtime/WASM/wheel requests before activation | Zero                                               |
| UI responsiveness during a long calculation   | Page remains scrollable and Stop remains usable    |
| Standard-library pilot execution after ready  | Target under 1 second on the reference laptop      |
| Numerical pilot execution after ready         | Target under 5 seconds; investigate slower cases   |
| Default per-cell execution watchdog           | 30 seconds, with reviewed per-page overrides       |
| Total text output per cell                    | Initial cap 1 MiB, followed by a truncation notice |
| Active heavy runtimes                         | One per tab initially                              |
| Repeated restart/navigation test              | No retained worker growth across 20 cycles         |

Measure cold and warm activation separately, with browser cache disabled/enabled and a documented network profile. Record transfer sizes, package load times, peak memory where measurable, and time to first useful result. Establish a realistic cold-start budget from measurements rather than promising an arbitrary universal download time.

Bound images, tables, rich outputs, queued requests, and repeated displays as well as text. A watchdog cannot guarantee recovery from a browser-wide memory exhaustion, so add sensible workload defaults and test low-memory devices.

### 13.2 Accessibility and responsive layout

Use keyboard-accessible controls, visible focus, descriptive labels, and status text that is not conveyed only by color. Provide a plain-text editing fallback if the enhanced editor cannot load. Ensure shortcuts do not trap keyboard focus or conflict unexpectedly with assistive tools.

Announce ready/error/completion states through restrained live regions; do not announce every stdout line. Preserve focus after Run and Stop. Make long code and tables scroll within their containers on mobile, test high zoom, and respect reduced motion. Maintain dark/light theme contrast and accessible context for generated figures.

### 13.3 Failure states

Distinguish unsupported browser capabilities, blocked CDN/download, package incompatibility, missing fixture, Python exception, timeout, and runtime crash. Each state should offer an appropriate Retry, Restart, or Continue reading action. Package errors should identify the package and profile; scientific errors should identify the failing cell and Python traceback.

Keep published outputs available after initialization failure. If a live result exists, retain its provenance and stale state instead of replacing it silently with a published value. Provide the original example source or notebook download where supported and document the native execution route.

## 14. Proposed implementation files and ownership

The paths below describe a possible final organization. Keep only files justified by the selected architecture.

| Proposed path or location            | Responsibility                                                                              |
| ------------------------------------ | ------------------------------------------------------------------------------------------- |
| `interactive/environment.yml`        | Browser runtime and dependency profiles                                                     |
| `interactive/pages.yml`              | Page eligibility, setup policy, file/result metadata                                        |
| `interactive/schema/`                | Validation of project-owned manifest formats                                                |
| `scripts/pyodide-inventory.mjs`      | Read-only source/AST inventory and drift reporting                                          |
| `scripts/prepare-pyodide-assets.mjs` | Validated manifest and asset preparation                                                    |
| `scripts/pyodide-check.mjs`          | Playwright-based built-book smoke checks                                                    |
| `tests/interactive/`                 | Fixtures and focused behavior/numerical tests                                               |
| `assets/interactive/`                | Project-owned client integration and styling, if needed                                     |
| `_build/pyodide/`                    | Generated reports, manifests, and test artifacts                                            |
| `plugins/interactivePython.mjs`      | Optional MyST metadata transform if a supported hook is required                            |
| `../myst-theme/packages/jupyter/`    | Separately tracked supported runtime/UI extensions if needed                                |
| `myst.yml`                           | Verified Lite configuration, static assets, exclusions, and optional transform registration |
| `package.json` and `bun.lock`        | Explicit tooling dependencies and scoped validation scripts                                 |
| `.github/workflows/deploy.yml`       | MyST build and verified publish pipeline                                                    |
| `INSTALL.md`                         | Reproducible build, browser environment, and troubleshooting instructions                   |

The workflow filename above is a proposed target; inspect and update the actual existing workflow rather than creating a competing deployment accidentally. Add `plans/`, interactive implementation metadata, and test fixtures to MyST exclusions if discovery would otherwise include them as book content. That is a later configuration change, not part of writing this plan.

## 15. Testing and numerical validation

### 15.1 Focused automated checks

Validate manifest schemas, missing page/cell references, source-hash drift, invalid profiles, missing file checksums, duplicate cell identities, and unsupported enabled languages. Test inventory handling of nested Python/MATLAB tabs and hidden cells using small representative fixtures.

For any execution adapter, test initialization deduplication, request ordering, source revision matching, cancellation/disposal, and rejection of late messages. Test output sanitization and payload limits. Avoid tests that only assert internal function names or reproduce configuration values without checking behavior.

### 15.2 Browser test matrix

| Scenario                     | Required assertion                                                   |
| ---------------------------- | -------------------------------------------------------------------- |
| Read without activation      | Published content visible; no Pyodide/WASM/wheel download            |
| Fresh activation             | Lite starts, no Binder request, declared profile loads               |
| Edit first Hohmann input     | Rerun changes expected live quantities; source edit retained         |
| Sequential dependency        | Later cell receives variables from earlier cells                     |
| Run later cell too early     | Defined prerequisite behavior or clear actionable error              |
| Upstream edit                | Downstream outputs become stale                                      |
| Python exception             | Local error shown; page and recovery controls usable                 |
| Infinite loop                | Stop terminates/interrupts within a measured bound; restart succeeds |
| NumPy/SciPy                  | Known computation completes in actual browser runtime                |
| Matplotlib                   | Expected plot appears without main-thread freeze                     |
| Hidden setup                 | Necessary state exists; publishing-only cells are excluded           |
| Python/MATLAB tabs           | Only Python is executable; switching tabs preserves layout           |
| Route navigation and history | No cross-page globals or leaked workers; late output discarded       |
| Restore/restart/clear        | Each operation matches its documented semantics                      |
| CDN/package/fixture failure  | Error explains cause; published book remains readable                |
| Root and subpath hosting     | All runtime, chunk, fixture, and wheel URLs resolve correctly        |
| Dark mode/mobile/zoom        | Controls, editors, outputs, and tables remain usable                 |
| Malicious HTML output        | No script execution through the output renderer                      |
| Cache/environment upgrade    | Old and new deployments do not mix incompatible assets               |

Run Chromium for pull-request smoke tests and Firefox/WebKit for the supported browser matrix before release. Treat support as a measured result, not a guarantee based on browser names. Verify WASM, workers, module loading, and any required storage capabilities individually.

Use a fresh browser context for cold-start assertions. Capture console errors, failed network responses, installed versions, screenshots, timings, and page/source IDs. Do not make one external font failure indistinguishable from Python initialization failure. Pin or control external dependencies for deterministic CI; retain a separate production-origin smoke check.

### 15.3 Scientific checks

Run the unedited pilot sequences natively and in the browser, then compare selected scalars and arrays using justified absolute/relative tolerances. Store units and tolerance rationale with each reference. Avoid exact floating-point equality across Python/NumPy/SciPy versions.

For Hohmann, independently verify circular velocities, transfer velocities, total delta-v, and propellant mass. A reader changing the LEO altitude should produce physically consistent changes. Ensure km/s and m/s conversions are explicit in the rocket equation.

For root solving, verify both the solution and residual, including difficult initial guesses and nonconvergence. For orbital integration, compare trajectories at common times and monitor energy/angular-momentum drift using tolerances consistent with the method and solver settings. A screenshot match alone does not validate a numerical solution.

For date/time examples, use fixed inputs and explicit timezone assumptions. For tables, verify values, units, and ordering independently of HTML formatting. For future astronomy examples, record ephemeris/data version and test only scientifically justified precision.

## 16. Build and CI integration

Separate native publishing execution from reader-side execution. Continue to generate authoritative static results with the native environment; the browser environment is an additional supported target. Do not remove build-time execution merely because cells can run in the browser.

Establish a reproducible MyST CI build using pinned CLI/theme artifacts or pinned source revisions and documented builds. Select a native Python version satisfying the workspace, or deliberately install only the build-required workspace subset with a documented reason. Resolve the existing Python 3.12/render-svg constraint if the chosen install path includes that package.

Recommended pipeline stages:

1. Check lockfiles and browser manifest consistency.
2. Install native and JavaScript dependencies reproducibly.
3. Validate eligibility and generate the inventory/asset manifests.
4. Build MyST and execute the selected/native book scope according to the verified CLI workflow.
5. Verify the actual HTML export/publish output path. Do not blindly retain `_build/html` from the legacy workflow.
6. Serve the built artifact under a representative deployment prefix.
7. Run static fallback and pilot browser execution tests against that artifact.
8. Upload inventory, numerical comparison, network, and screenshot artifacts.
9. Publish only on the intended main-branch condition, after checks pass.
10. Smoke-test production asset loading and activation after deployment.

Determine the exact production build/export command from the selected CLI version's help and documentation during implementation. `myst start --execute --debug --headless` is the documented development command, not proof of the production export command or directory.

Cache native dependencies and browser packages by their environment digests, keeping large runtime artifacts out of source control where practical. Do not execute unreviewed pull-request code with publishing credentials. Keep browser tests finite and ensure a stuck worker cannot leave CI running indefinitely.

## 17. Delivery milestones and exit criteria

### Milestone 0: Baseline and inventory

Deliver the current environment/version record, active-theme identification, source inventory, pilot audit, initial compatibility matrix, and existing deployment mismatch report. No chapter changes are required.

Exit when each pilot cell, inline result, hidden prerequisite, and file reference is accounted for, and the team can state which files require later approval.

### Milestone 1: Integration spike

Deliver the isolated preview with standard-library math, NumPy, SciPy, and Matplotlib; a traced network/asset map; stop/reset evidence; package provisioning evidence; and the architecture decision.

Exit when the preferred integration either meets the essential requirements or has specific reproducible gaps with a bounded extension/fallback proposal. Do not expand the pilot to astronomy packages to avoid deciding the core architecture.

### Milestone 2: Environment and metadata contracts

Deliver validated browser profiles, exact dependency provenance, page/cell policy manifests, file/result mappings, source-drift checks, and generated runtime assets. Resolve self-hosted versus CDN delivery and root/subpath URL handling.

Exit when a clean checkout can reproduce the same preview environment without relying on untracked sibling files or an unpinned package solve.

### Milestone 3: Two-page reader experience

Deliver Hohmann and one numerical/plot example with editing, sequential runs, bounded stop, restart, visible live results, stale-state handling, and static fallback. Prepare exact production chapter changes, if any, for specific approval before applying them.

Exit when unedited results match references, edited inputs affect visible outputs, accessibility checks pass, and browsers recover from deliberate errors/infinite loops.

### Milestone 4: Production build and deployment

Deliver the reconciled MyST pipeline, published asset verification, browser smoke tests, installation/troubleshooting documentation, and rollback instructions.

Exit when the deployed pilot works from a fresh browser under the real hosting prefix and the book remains complete with JavaScript disabled or runtime downloads blocked.

### Milestone 5: Broader compatible coverage

Expand standard-library, numerical, plotting, and table examples in small reviewed batches. Each page receives a complete sequence audit, numerical references, source-hash tracking, and explicit status. Report both eligible-page coverage and excluded-page reasons; do not obscure difficult pages by counting only enabled cells.

Exit when all audited A–C pages are enabled or have documented specific blockers. Run memory/navigation checks across the larger book.

### Milestone 6: Advanced investigations

Independently evaluate local modules/datasets, Astropy/Pint/Skyfield, poliastro replacement/support, interactive plots/widgets, animations, and live inline prose updates. Each feature needs a focused spike and separate acceptance criteria.

This milestone is optional for the initial release. Maintain a visible backlog rather than blocking all interactive Python on the most difficult package.

## 18. Risk register and decisions to resolve

| Risk                                          | Consequence                                         | Mitigation or decision gate                                     |
| --------------------------------------------- | --------------------------------------------------- | --------------------------------------------------------------- |
| Running theme differs from inspected checkout | Local fixes do not affect production                | Record actual artifacts and network provenance first            |
| Lite bundles pin an older runtime             | New standalone APIs/configuration fail              | Test a coherent version tuple; upgrade deliberately             |
| Enabling Lite executes publishing cells       | Unexpected downloads, writes, or failures           | Per-page audit and explicit execution policy                    |
| Inline prose remains fixed                    | Reader mistakes published values for edited results | Label published/live values and provide a live panel            |
| Hidden setup is stripped                      | Visible code fails with missing names               | Inspect serialized notebook and retain reviewed prerequisites   |
| Numba/poliastro or native dependencies fail   | Astronomy pages cannot run                          | Defer, use a reviewed alternative, or retain native-only status |
| Large data/plots exhaust memory               | Browser tab crashes                                 | Small fixtures, bounded output, workload limits, device testing |
| Stop only queues a message                    | Infinite loop never stops                           | Real interrupt or tested worker/kernel termination              |
| Host lacks isolation headers                  | Shared-buffer interrupts unavailable                | Baseline termination fallback; no header assumption             |
| Deployment prefix/chunks missing              | Runtime starts locally but fails online             | Built-artifact and production network tests                     |
| Incompatible cache layers                     | Intermittent runtime/wheel failures                 | Versioned assets and coherent deployment manifest               |
| Rich output executes scripts                  | Edited Python output gains unintended page access   | Safe MIME rendering and explicit trust review                   |
| Cross-page namespace reuse                    | Numerically plausible but wrong results             | Fresh page scope and deterministic rerun tests                  |
| Browser and native solver versions diverge    | Small numerical differences or convergence changes  | Version record, residual checks, justified tolerances           |
| Untracked sibling changes required            | Build cannot be reproduced                          | Upstream or pinned artifacts before production                  |

Resolve these implementation questions in order: which theme actually runs; which Lite/kernel/runtime tuple it supports; whether package/file provisioning is exposed; whether safe stop is available; how page eligibility is applied; how live result panels receive state; and how the real hosting target serves all assets. These questions can be investigated without requesting chapter edits.

## 19. First implementation tasks

1. Capture a clean baseline of tracked/untracked changes and version identifiers without altering the working tree.
2. Generate the read-only Python cell inventory and review the two proposed pilot sequences.
3. Inspect actual MyST build JSON, notebook sources, and the active theme's execution scopes.
4. Create an isolated Lite preview and test its real package, output, and cancellation behavior.
5. Record the architecture decision and select a pinned environment tuple.
6. Define the smallest page/profile/result manifest and implement only the validation required for the pilot.
7. Prepare concrete chapter or sibling-repository changes for review where needed; obtain specific chapter approval before editing.
8. Implement and validate the two-page experience, then reconcile publishing and deploy the pilot through the authorized release process.

## 20. Definition of done for the initial release

- Two representative real book examples support editing and browser execution without a remote kernel.
- Every pilot cell has reviewed prerequisites, package requirements, and resource behavior.
- Hohmann calculations expose live numerical results even though the original cells contain assignments only.
- The numerical example produces scientifically validated results and its expected static plot.
- Source changes, stale outputs, partial failures, restart, and original-source restoration have explicit behavior.
- An infinite loop can be stopped without freezing the reading interface, and execution can resume after recovery.
- Runtime downloads begin only after activation; missing browser/network capabilities leave the full published text and outputs available.
- The chosen browsers, mobile layout, keyboard use, dark mode, root/subpath hosting, and repeated navigation have been tested.
- Runtime/kernel/package/data versions are reproducible, and all required assets are present in the deployed artifact.
- CI uses the verified MyST publishing workflow and runs finite browser smoke tests.
- Unsupported examples have specific reasons and a documented native route.
- No chapter was edited without specific approval, no vendored file was modified, and unrelated work was preserved.
