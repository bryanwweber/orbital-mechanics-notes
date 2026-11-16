# PR 34 preview technical review

Reviewed the [live preview](https://orbital-mechanics.space/pr-preview/pr-34/) on November 15, 2026 (US Eastern), using Chromium through Playwright. Pages were opened and rendered in the browser; this review does not use downloaded HTML or a local build as a substitute for the preview.

## Scope and coverage

Used `myst.yml` and the local chapter paths to discover all 71 table-of-contents pages. All 71 load successfully at their published routes. MyST lowercases `equations-of-motion-CR3BP.md` to `the-n-body-problem/equations-of-motion-cr3bp`; the uppercase source spelling is not a broken published route.

Inspected rendered text, figures, tables, math, screenshots, image loading, the 14 embedded frames, and internal article links. Also switched through the Ellipse, Circle, Parabola, and Hyperbola figure tabs. The tabbed figures, Three.js scenes, and launch-azimuth maps render. No missing reader-visible figure was confirmed. Two zero-size, source-less Jupyter image nodes are hidden alternate outputs, not missing visible figures.

This is a desktop review at 1440 × 1000. It is not an exhaustive mobile, external-link, or animation-control test. Suggestions below concern technical defects, formatting, and typos only. No chapter or vendor files were changed.

## Broken internal links

### 1. “next example” opens a nonexistent notebook path

- **Page:** [Application of the CR3BP: Lagrange Points](https://orbital-mechanics.space/pr-preview/pr-34/the-n-body-problem/lagrange-points/), Collinear Lagrange Points.
- **Source:** `chapters/the-n-body-problem/lagrange-points.md:176`.
- **Observed:** Clicking “next example” opens `/pr-preview/pr-34/the-n-body-problem/lagrange-points/Lagrange-points-example.ipynb` and displays **404**.
- **Suggestion:** Replace the obsolete notebook link with the sibling Markdown page, `./lagrange-points-example.md`. The working preview destination is [Example: Plotting Lagrange Points](https://orbital-mechanics.space/pr-preview/pr-34/the-n-body-problem/lagrange-points-example/).

### 2. “example from the previous section” treats a reference label as a URL

- **Page:** [Interplanetary Phasing Example](https://orbital-mechanics.space/pr-preview/pr-34/interplanetary-maneuvers/interplanetary-transfer-phasing-example/), opening paragraph.
- **Source:** `chapters/interplanetary-maneuvers/interplanetary-transfer-phasing-example.md:16`.
- **Observed:** Clicking the link opens a child path ending in `/interplanetary-transfer-phasing-example/@sec:neptune-venus-hohmann-example` and displays **404**.
- **Suggestion:** Use MyST's explicit reference-target syntax rather than `(@sec:...)`, or link directly to [the example in Heliocentric Trajectories](https://orbital-mechanics.space/pr-preview/pr-34/interplanetary-maneuvers/heliocentric-trajectories/#sec-neptune-venus-hohmann-example).

## Incorrectly displayed results and labels

These are transcription, variable-selection, or unit-formatting defects visible in the preview, rather than proposals to change the mathematical exposition.

### 3. Perifocal velocity repeats the position components

- **Page:** [Classical Orbital Elements and the State Vector](https://orbital-mechanics.space/pr-preview/pr-34/classical-orbital-elements/orbital-elements-and-the-state-vector/), Orbital Elements → State Vector → Step 1.
- **Source:** `chapters/classical-orbital-elements/orbital-elements-and-the-state-vector.md:365`.
- **Observed:** The inline position and velocity both show components `-8117.7120` and `3017.0767`, with km and km/s units respectively.
- **Suggestion:** Bind the velocity's two inline evaluations to `v_w[0]` and `v_w[1]`; they currently read `r_w`, despite the preceding code correctly defining `v_w`.

### 4. Dimensionless eccentricity is converted to degrees

- **Page:** [Planetary Departure Trajectory: Example](https://orbital-mechanics.space/pr-preview/pr-34/interplanetary-maneuvers/planetary-departure-trajectory-example/), final paragraph.
- **Source:** `chapters/interplanetary-maneuvers/planetary-departure-trajectory-example.md:63`.
- **Observed:** The eccentricity is printed as `61.0671`.
- **Suggestion:** Format `ecc` directly. Its inline expression currently calls `m.degrees(ecc)`. Retain degree conversion for the separate impulse angle, `eta`.

### 5. Table 5 mixes units, values, and a copied caption

- **Page:** [Apse Line Rotation Example](https://orbital-mechanics.space/pr-preview/pr-34/orbital-maneuvers/apse-line-rotation-example/), Table 5.
- **Source:** `chapters/orbital-maneuvers/apse-line-rotation-example.md:105`, especially lines 113–115.
- **Observed:** The semimajor-axis row says `a (km/s)`. The anomaly row says `ν (deg.)` but displays `2.44` and `2.00`, which are the unconverted radian variables. The caption says “Velocity components and flight path angles” although this table contains `a`, `e`, and `ν`.
- **Suggestions:** Change the semimajor-axis unit to km; convert `nu_i` and `nu_f` to degrees before formatting (or accurately label them as radians); correct the copied caption to describe the rows already present.

### 6. Gravitational-constant exponent has a missing zero

- **Page:** [Two-Body Numerical Solution in an Inertial Frame](https://orbital-mechanics.space/pr-preview/pr-34/the-n-body-problem/two-body-inertial-numerical-solution/), before The State Vector.
- **Source:** `chapters/the-n-body-problem/two-body-inertial-numerical-solution.md:51`.
- **Observed:** The prose displays `G = 6.67430 × 10⁻² km³ kg⁻¹ s⁻²`, while both code examples use `6.67430e-20` in those units.
- **Suggestion:** Correct the exponent transcription to `-20` so the displayed constant matches the code.

### 7. Small numerical transcription inconsistencies

| Page | Source | Observed | Suggested correction |
| --- | --- | --- | --- |
| [Planetary Departure Trajectory: Example](https://orbital-mechanics.space/pr-preview/pr-34/interplanetary-maneuvers/planetary-departure-trajectory-example/) | `chapters/interplanetary-maneuvers/planetary-departure-trajectory-example.md:38` | The explanatory paragraph says the parking radius is `26,000 km`; the problem statement and `r_p = 25_000` use 25,000 km. | Change the transcribed radius to `25,000 km`. |
| [Planetary Ephemeris](https://orbital-mechanics.space/pr-preview/pr-34/reference/planetary-ephemeris/) | `chapters/reference/planetary-ephemeris.md:45` | The paragraph introducing the tables says `AD 1800 to AD 1950`; Table 12 and the later paragraph say 1800–2050. | Correct `1950` to `2050` to match the table being introduced. |

## Formatting and rendering

### 8. Equation references repeat their automatic prefixes

The preview contains phrases such as “Equation Eq. 104”, “Combining Eqs. Eq. 88 and Eq. 90”, and “Eqs. Eq. 270”. MyST already supplies `Eq.` for the `@eq:...` references.

**Suggestion:** Remove redundant literal prefixes or use explicit reference text when a plural construction is required. Confirm the resulting rendered sentence, including captions and margin notes.

Affected sources and live pages:

| Page | Source lines |
| --- | --- |
| [Energy Is Conserved](https://orbital-mechanics.space/pr-preview/pr-34/constants-of-orbital-motion/energy-is-conserved-in-orbital-motion/) | `chapters/constants-of-orbital-motion/energy-is-conserved-in-orbital-motion.md:152` |
| [The Jacobi Constant](https://orbital-mechanics.space/pr-preview/pr-34/the-n-body-problem/jacobi-constant/) | `chapters/the-n-body-problem/jacobi-constant.md:43` |
| [Circular and Elliptical Orbits](https://orbital-mechanics.space/pr-preview/pr-34/time-since-periapsis-and-keplers-equation/elliptical-orbits/) | `chapters/time-since-periapsis-and-keplers-equation/elliptical-orbits.md:216`, 270, 368 |
| [Example: Hyperbolic Trajectory](https://orbital-mechanics.space/pr-preview/pr-34/time-since-periapsis-and-keplers-equation/hyperbolic-trajectory-example/) | `chapters/time-since-periapsis-and-keplers-equation/hyperbolic-trajectory-example.md:125` |
| [The Lagrange Coefficients](https://orbital-mechanics.space/pr-preview/pr-34/time-since-periapsis-and-keplers-equation/the-lagrange-coefficients/) | `chapters/time-since-periapsis-and-keplers-equation/the-lagrange-coefficients.md:34` |
| [The Universal Anomaly](https://orbital-mechanics.space/pr-preview/pr-34/time-since-periapsis-and-keplers-equation/universal-variables/) | `chapters/time-since-periapsis-and-keplers-equation/universal-variables.md:55`, 161 (Fig. 66 caption) |
| [Planetary Departure](https://orbital-mechanics.space/pr-preview/pr-34/interplanetary-maneuvers/planetary-departure-trajectory/) | `chapters/interplanetary-maneuvers/planetary-departure-trajectory.md:100` |
| [Planetary Arrival: Capture](https://orbital-mechanics.space/pr-preview/pr-34/interplanetary-maneuvers/planetary-arrival-capture/) | `chapters/interplanetary-maneuvers/planetary-arrival-capture.md:373` |
| [Planetary Arrival: Flyby](https://orbital-mechanics.space/pr-preview/pr-34/interplanetary-maneuvers/planetary-arrival-flyby/) | `chapters/interplanetary-maneuvers/planetary-arrival-flyby.md:178`, 317 |

### 9. Citations duplicate names or run together

| Page | Source | Observed formatting |
| --- | --- | --- |
| [Circular Restricted Three-Body Problem](https://orbital-mechanics.space/pr-preview/pr-34/the-n-body-problem/circular-restricted-three-body-problem/) | `chapters/the-n-body-problem/circular-restricted-three-body-problem.md:238` | The margin note repeats “Rubinsztejn” and renders three adjacent `Rubinsztejn (2018)` citations without separators. |
| [Circular and Elliptical Orbits](https://orbital-mechanics.space/pr-preview/pr-34/time-since-periapsis-and-keplers-equation/elliptical-orbits/) | `chapters/time-since-periapsis-and-keplers-equation/elliptical-orbits.md:267`, 476 | The integral references run together as `Gradshteı̆n et al. (2007)Zwillinger (2003)`; the later note reads `Sacchetti Sacchetti (2020)`. |
| [Planetary Parameters](https://orbital-mechanics.space/pr-preview/pr-34/reference/planetary-parameters/) | `chapters/reference/planetary-parameters.md:276` | The source citations render as `Park et al. (2021)Rhodes (2019)`. |
| [Planetary Ephemeris](https://orbital-mechanics.space/pr-preview/pr-34/reference/planetary-ephemeris/) | `chapters/reference/planetary-ephemeris.md:47`, 108 | Table captions join the Standish citations without a separator; Table 12 also repeats `Standish` before the citation-generated name. |
| [Hohmann Transfer](https://orbital-mechanics.space/pr-preview/pr-34/orbital-maneuvers/hohmann-transfer/) | `chapters/orbital-maneuvers/hohmann-transfer.md:3` | The opening sentence displays `In 1925, Walter Hohmann 1960 showed ...`, with an unparenthesized citation year. |

**Suggestion:** Use citation roles appropriate to narrative versus parenthetical citations, avoid writing an author name twice, and ensure multiple references have visible punctuation and spacing. Retain the same sources and surrounding content.

### 10. Duplicate headings immediately repeat the page title

- [Phasing Maneuver: Example](https://orbital-mechanics.space/pr-preview/pr-34/orbital-maneuvers/phasing-maneuvers-example/) repeats its title as the first section heading.
- [Planetary Departure Trajectory: Example](https://orbital-mechanics.space/pr-preview/pr-34/interplanetary-maneuvers/planetary-departure-trajectory-example/) does the same.
- **Suggestion:** Remove the redundant second heading from each source; keep the page title and existing body text.

### 11. Figure 58's figure wrapper does not contain the plot

- **Page:** [Example: Elliptical Orbit](https://orbital-mechanics.space/pr-preview/pr-34/time-since-periapsis-and-keplers-equation/elliptical-orbit-example/), final figure.
- **Source:** `chapters/time-since-periapsis-and-keplers-equation/elliptical-orbit-example.md:213`, 219.
- **Observed:** The plot is visible as a separate Jupyter output above a caption-only figure wrapper. The browser's `#fig-ellipse-time-since-perigee-figure` element contains a span and figcaption, but no plot. The source embeds `#code:ellipse-time-since-perigee-figure`, whereas the output cell is labelled `code:ellipse-time-since-perigee`.
- **Suggestion:** Make the figure embed target match the labelled output and verify that a single plot is enclosed with its caption. This is a structural embedding issue, not a currently missing plot.

### 12. Repeated React hydration exception

- **Pages:** Every successfully loaded page in the initial browser pass, including the [homepage](https://orbital-mechanics.space/pr-preview/pr-34/).
- **Observed:** A browser `pageerror` reports `Minified React error #418`, with a diagnostic URL containing `args[]=HTML`. The pages still render.
- **Suggestion:** Reproduce with the unminified theme and investigate the server/client markup mismatch. This review confirms the repeated exception, but does not establish its cause or a specific reader-visible failure. Treat it as a lower-priority technical investigation rather than evidence that the figures are broken.

## Published code typos

### 13. Elliptical-orbit MATLAB example has inconsistent variable names

- **Page:** [Example: Elliptical Orbit](https://orbital-mechanics.space/pr-preview/pr-34/time-since-periapsis-and-keplers-equation/elliptical-orbit-example/), second MATLAB Solution.
- **Source:** `chapters/time-since-periapsis-and-keplers-equation/elliptical-orbit-example.md:164`, 170–171.
- **Observed in the displayed code:** The example defines `t2`, `Me2`, and `E2`, but subsequently reads `t_2`, `M_e`, and `E` respectively. Those names do not match the variables defined in this function.
- **Suggestion:** Correct the references to `t2`, `Me2`, and `E2`. Also change the Python comment at line 111 from `# hr` to `# s`, because `3 * 3600` is in seconds. MATLAB execution was not performed as part of this browser review.

## Text typos

The following corrections are limited to spelling, missing or duplicated words, and obvious copy-and-paste slips. Source locations refer to the local checkout used to locate the published text.

| Live page | Source location | Published text → suggested correction |
| --- | --- | --- |
| [Lagrange Points](https://orbital-mechanics.space/pr-preview/pr-34/the-n-body-problem/lagrange-points/) | `chapters/the-n-body-problem/lagrange-points.md:426` | `interefering` → `interfering` |
| [The Jacobi Constant](https://orbital-mechanics.space/pr-preview/pr-34/the-n-body-problem/jacobi-constant/) | `chapters/the-n-body-problem/jacobi-constant.md:188` | `position and and velocity` → `position and velocity` |
| [Energy Is Conserved](https://orbital-mechanics.space/pr-preview/pr-34/constants-of-orbital-motion/energy-is-conserved-in-orbital-motion/) | `chapters/constants-of-orbital-motion/energy-is-conserved-in-orbital-motion.md:49` | `equal and opposite equal change` → `equal and opposite change` |
| [The Orbit Equation](https://orbital-mechanics.space/pr-preview/pr-34/the-orbit-equation/the-orbit-equation/) | `chapters/the-orbit-equation/the-orbit-equation.md:18` | `lets try` → `let's try` |
| [Hyperbolic Trajectories](https://orbital-mechanics.space/pr-preview/pr-34/the-orbit-equation/hyperbolic-trajectories/) | `chapters/the-orbit-equation/hyperbolic-trajectories.md:106` | `Note tha` → `Note that` |
| [Perifocal Frame](https://orbital-mechanics.space/pr-preview/pr-34/classical-orbital-elements/perifocal-frame/) | `chapters/classical-orbital-elements/perifocal-frame.md:15` | Fig. 42: `is pointing direction towards` → `is pointing towards` |
| [Right Ascension and Declination](https://orbital-mechanics.space/pr-preview/pr-34/classical-orbital-elements/right-ascension-declination/) | `chapters/classical-orbital-elements/right-ascension-declination.md:30` | `observers latitude` → `observer's latitude`; `Usra Minor` → `Ursa Minor` |
| [Classical Orbital Elements](https://orbital-mechanics.space/pr-preview/pr-34/classical-orbital-elements/classical-orbital-elements/) | `chapters/classical-orbital-elements/classical-orbital-elements.md:32`, 86 | `may specified` → `may be specified`; `perimeter of th orbital plane` → `perimeter of the orbital plane` |
| [Orbital Elements and the State Vector](https://orbital-mechanics.space/pr-preview/pr-34/classical-orbital-elements/orbital-elements-and-the-state-vector/) | `chapters/classical-orbital-elements/orbital-elements-and-the-state-vector.md:299`, 330 | Under **Step 7—True Anomaly**, the two copied mentions of `argument of periapsis` should say `true anomaly`. Keep the correctly placed occurrences in Step 6. |
| [Time Since Periapsis](https://orbital-mechanics.space/pr-preview/pr-34/time-since-periapsis-and-keplers-equation/time-since-periapsis/) | `chapters/time-since-periapsis-and-keplers-equation/time-since-periapsis.md:28` | `Relate these angle` → `Relate these angles` |
| [Circular and Elliptical Orbits](https://orbital-mechanics.space/pr-preview/pr-34/time-since-periapsis-and-keplers-equation/elliptical-orbits/) | `chapters/time-since-periapsis-and-keplers-equation/elliptical-orbits.md:73` and adjacent margin note | `The next step is find` → `The next step is to find`; `an circumscribing circle` → `a circumscribing circle` |
| [Time in Earth's Shadow](https://orbital-mechanics.space/pr-preview/pr-34/time-since-periapsis-and-keplers-equation/elliptical-orbit-time-in-shadow/) | `chapters/time-since-periapsis-and-keplers-equation/elliptical-orbit-time-in-shadow.md:126` | `vertically up, the over` → `vertically up, then over` |
| [Impulsive Maneuvers](https://orbital-mechanics.space/pr-preview/pr-34/orbital-maneuvers/impulsive-maneuvers/) | `chapters/orbital-maneuvers/impulsive-maneuvers.md:44`, 50 | `such lift-off` → `such as lift-off`; `all required some` → `all require some` |
| [Single Impulse Orbital Change](https://orbital-mechanics.space/pr-preview/pr-34/orbital-maneuvers/single-impulse-example/) | `chapters/orbital-maneuvers/single-impulse-example.md:79` | Fig. 67: `conducted by a providing` → `conducted by providing` |
| [Phasing Maneuvers](https://orbital-mechanics.space/pr-preview/pr-34/orbital-maneuvers/phasing-maneuvers/) | `chapters/orbital-maneuvers/phasing-maneuvers.md:56` | `less than_ 360°` → `less than 360°` (a stray Markdown underscore is visible) |
| [Non-Hohmann Transfers](https://orbital-mechanics.space/pr-preview/pr-34/orbital-maneuvers/non-hohmann-transfers/) | `chapters/orbital-maneuvers/non-hohmann-transfers.md:75`, 78 | Fig. 74: `manuever` → `maneuver`; `The same calculate` → `The same calculation` |
| [Apse Line Rotation Example](https://orbital-mechanics.space/pr-preview/pr-34/orbital-maneuvers/apse-line-rotation-example/) | `chapters/orbital-maneuvers/apse-line-rotation-example.md:3` | `at at least one point` → `at least one point` |
| [Plane Change Example](https://orbital-mechanics.space/pr-preview/pr-34/orbital-maneuvers/plane-change-example/) | `chapters/orbital-maneuvers/plane-change-example.md:19`, 131, 166 | `altitue` → `altitude`; `occuring` → `occurring` in both figure captions |
| [Interplanetary Trajectories](https://orbital-mechanics.space/pr-preview/pr-34/interplanetary-maneuvers/introduction/) | `chapters/interplanetary-maneuvers/introduction.md:28` | `our analysis will from` → `our analysis will switch from` (missing verb) |
| [Heliocentric Trajectories](https://orbital-mechanics.space/pr-preview/pr-34/interplanetary-maneuvers/heliocentric-trajectories/) | `chapters/interplanetary-maneuvers/heliocentric-trajectories.md:77` | `depature` → `departure` |
| [Planetary Departure](https://orbital-mechanics.space/pr-preview/pr-34/interplanetary-maneuvers/planetary-departure-trajectory/) | `chapters/interplanetary-maneuvers/planetary-departure-trajectory.md:111` | `ambigous` → `ambiguous` |
| [Planetary Arrival: Flyby](https://orbital-mechanics.space/pr-preview/pr-34/interplanetary-maneuvers/planetary-arrival-flyby/) | `chapters/interplanetary-maneuvers/planetary-arrival-flyby.md` — Arrival Trajectory, Geocentric Unit Vectors, Arrival Excess Velocity Vector, Example | `it's trajectory` → `its trajectory`; `it's radial vector` → `its radial vector`; `magntiude` → `magnitude`; `manuever` → `maneuver`; `This give an eccentricity` → `This gives an eccentricity` |
| [Kinematics](https://orbital-mechanics.space/pr-preview/pr-34/review/kinematics/) | `chapters/review/kinematics.md:118` | `The time rate change` → `The time rate of change` |
| [Relative Motion](https://orbital-mechanics.space/pr-preview/pr-34/reference/relative-motion/) | `chapters/reference/relative-motion.md:48`, 51 | `topopcentric-horizon` → `topocentric-horizon`; `coordiantes` → `coordinates` |
| [Julian Day](https://orbital-mechanics.space/pr-preview/pr-34/reference/julian-date/) | `chapters/reference/julian-date.md:32`, 44 | `Julius Cesar` → `Julius Caesar` in both occurrences |
| [Planetary Ephemeris](https://orbital-mechanics.space/pr-preview/pr-34/reference/planetary-ephemeris/) | `chapters/reference/planetary-ephemeris.md:74`, 215, 220 | `familar` → `familiar`; `orbtial` → `orbital`; `ephemerids` → `ephemerides` |
| [Planetary Ephemeris](https://orbital-mechanics.space/pr-preview/pr-34/reference/planetary-ephemeris/) | `references.bib:396`, displayed Standish (1992) reference | `Approximate Posistions` → `Approximate Positions` |
| [Nonimpulsive Orbital Maneuvers](https://orbital-mechanics.space/pr-preview/pr-34/orbital-maneuvers/nonimpulsive-orbital-maneuvers/) | `chapters/orbital-maneuvers/nonimpulsive-orbital-maneuvers.md`, sentence preceding the thrust-direction equation | `Assuming that force is a thrust is provided` → `Assuming that a thrust force is provided` (duplicated/misordered words) |
| [Nonimpulsive Maneuvers Example](https://orbital-mechanics.space/pr-preview/pr-34/orbital-maneuvers/nonimpulsive-maneuver-example/) | `chapters/orbital-maneuvers/nonimpulsive-maneuver-example.md:36` | `we will chose` → `we will choose` |

## Items checked that should not be reported as defects

- The wide equations numbered 217, 241, and 370 have horizontal scrolling, which keeps them separate from their equation numbers. Their clipped initial view is not missing math.
- The wide planetary orbital-elements table also has a working horizontal scroll area.
- Figures 33–35 appear when their respective orbital-nomenclature tabs are selected.
- The Celestial Sphere page's links are on separate lines in the actual browser; concatenated extracted text is not a page-formatting defect.
- Existing TODO prose and incomplete subject coverage were excluded from the suggestions, as requested.
