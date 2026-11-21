# CR3BP pseudo-potential surface

`assets/cr3bp-potential.html` mounts the interactive surface from the shared
Three.js bundle. Its sources are `assets-src/cr3bp-potential.mjs` and
`assets-src/cr3bp-potential-math.mjs`; regenerate the bundle with
`bun run build:threejs`.

The formula matches the negative pseudo-potential in the Lagrange Points
chapter, including its constant term. The initial mass ratio is 0.3. The
surface covers −2 ≤ x*, y* ≤ 2 and clips the singular wells at U = −3,
matching the original Matplotlib figure. Bisection locates the three
collinear equilibria in disjoint intervals separated by the primaries;
the triangular points are analytic. Inversion changes only the displayed
height; table values always retain the physical sign convention.

The graph has pointer and keyboard camera controls, mass-ratio and inversion
controls, a label toggle, reset, and a table with the five equilibrium
coordinates and potential values. Math labels use the shared, self-hosted KaTeX
fonts. Rendering occurs only when input or size changes. The table remains
available if WebGL 2 cannot initialize.

Validate the model and the rendered controls:

```bash
node --test assets-src/cr3bp-potential-math.test.mjs
node scripts/cr3bp-potential-check.mjs
```

With a MyST preview running, set `BOOK_URL=http://localhost:3000` to also check
the integrated chapter, its figure anchor, and desktop/mobile iframe sizing.

The browser check uses headed Chrome and serves the actual entry point under
`/preview/assets/` to test deployment prefixes. To regenerate the static-export
placeholder from the source surface, run:

```bash
node scripts/cr3bp-potential-check.mjs --update-placeholder
```

The Lagrange Points chapter replaces the original hidden Matplotlib plotting
cells and their figure with an `html-figure` directive, retains
`fig:pseudo-potential-energy-cr3bp`, and
uses `assets/threejs-placeholders/cr3bp-potential.png` for static exports.
