import {
  Scene, Color, PerspectiveCamera, WebGLRenderer, BufferGeometry,
  Float32BufferAttribute, Mesh, MeshLambertMaterial, MeshBasicMaterial,
  SphereGeometry, AmbientLight, DirectionalLight, DoubleSide, Vector3,
  Line, LineBasicMaterial,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { loadMathFonts } from './math-fonts.mjs';
import { lagrangePoints, pseudoPotential, surfaceHeight } from './cr3bp-potential-math.mjs';

export async function mountCR3BPPotential({ root = document.body } = {}) {
  root.classList.add('cr3bp-potential');
  root.innerHTML = `<div class="potential-view"><p id="status" role="status">Loading potential surface…</p></div>
    <div class="potential-controls" aria-label="Potential surface controls">
      <label>Mass ratio <span class="potential-math"><span class="potential-variable">π</span><sub>2</sub></span> <input id="mass-ratio" type="range" min="0.001" max="0.5" step="0.001" value="0.3"><output for="mass-ratio">0.300</output></label>
      <label><input id="invert-potential" type="checkbox"> Turn surface upside-down</label>
      <label><input id="show-lagrange-labels" type="checkbox" checked> Show Lagrange point labels</label>
      <button type="button" id="reset-potential">Reset view and parameters</button>
    </div>
    <div class="potential-scale" aria-label="Potential colors range from minus 3 to minus 1.5"><span>U = −3</span><span class="potential-gradient"></span><span>−1.5</span></div>
    <p class="potential-help">Drag to rotate; scroll or pinch to zoom. Focus the plot and use arrow keys to rotate, +/− to zoom, or Home to reset the view. Wells are clipped at U = −3.</p>
    <details><summary>Lagrange point coordinates and potential</summary>
      <table><caption>Dimensionless coordinates; values update with mass ratio.</caption><thead><tr><th scope="col">Point</th><th scope="col">x*</th><th scope="col">y*</th><th scope="col">U</th></tr></thead><tbody></tbody></table>
    </details>`;
  const view = root.querySelector('.potential-view');
  const status = root.querySelector('#status');
  let renderer;
  try {
    await loadMathFonts();
    renderer = new WebGLRenderer({ antialias: true });
  }
  catch (error) {
    status.textContent = `The interactive surface needs WebGL 2: ${error.message}. The coordinate table remains available.`;
    root.querySelectorAll('.potential-controls input, .potential-controls button').forEach(element => { element.disabled = true; });
    updateTable(lagrangePoints());
    return;
  }
  const canvas = renderer.domElement;
  canvas.tabIndex = 0;
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', 'CR3BP pseudo-potential surface with five Lagrange points. Use arrow keys to rotate, plus or minus to zoom, and Home to reset the view.');
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  view.append(canvas);
  const labels = new CSS2DRenderer();
  labels.domElement.className = 'potential-labels';
  labels.domElement.setAttribute('aria-hidden', 'true');
  view.append(labels.domElement);
  const scene = new Scene();
  scene.background = new Color('white');
  scene.add(new AmbientLight(0xffffff, 2));
  const light = new DirectionalLight(0xffffff, 2);
  light.position.set(-3, -5, 8);
  scene.add(light);
  const camera = new PerspectiveCamera(42, 1, 0.1, 100);
  camera.up.set(0, 0, 1);
  const controls = new OrbitControls(camera, canvas);
  controls.enablePan = false;
  controls.minDistance = 3.5;
  controls.maxDistance = 16;
  controls.maxPolarAngle = Math.PI * 0.95;
  const state = { mu: 0.3, inverted: false };
  const count = 120;
  const positions = new Float32Array((count + 1) ** 2 * 3);
  const colors = new Float32Array(positions.length);
  const indices = [];
  for (let y = 0; y < count; y++) for (let x = 0; x < count; x++) {
    const a = y * (count + 1) + x, b = a + count + 1;
    indices.push(a, a + 1, b, a + 1, b + 1, b);
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  const surfaceMaterial = new MeshLambertMaterial({ vertexColors: true, side: DoubleSide });
  scene.add(new Mesh(geometry, surfaceMaterial));
  const ramp = ['#00224e', '#35456c', '#666970', '#969179', '#c9bc65', '#fee838'].map(value => new Color(value));
  const color = new Color();
  const markerGeometry = new SphereGeometry(0.045, 20, 16);
  const markerMaterial = new MeshBasicMaterial({ color: '#b91c1c' });
  const points = Array.from({ length: 5 }, (_, index) => {
    const marker = new Mesh(markerGeometry, markerMaterial);
    const text = document.createElement('span');
    text.className = 'potential-point-label';
    text.innerHTML = `<span class="potential-variable">L</span><sub>${index + 1}</sub>`;
    const label = new CSS2DObject(text);
    scene.add(marker, label);
    return { marker, label };
  });
  const axisMaterial = new LineBasicMaterial({ color: '#78716c' });
  function axis(start, end, text) {
    const lineGeometry = new BufferGeometry().setFromPoints([new Vector3(...start), new Vector3(...end)]);
    scene.add(new Line(lineGeometry, axisMaterial));
    const element = document.createElement('span');
    element.className = 'potential-axis-label';
    element.innerHTML = `<span class="potential-variable">${text[0]}</span><sup>*</sup>`;
    const label = new CSS2DObject(element);
    label.position.set(...end);
    scene.add(label);
  }
  axis([-2, -2, -0.85], [2.15, -2, -0.85], 'x*');
  axis([-2, -2, -0.85], [-2, 2.15, -0.85], 'y*');
  const massSlider = root.querySelector('#mass-ratio');
  const massOutput = root.querySelector('output');
  function updateTable(values) {
    root.querySelector('tbody').innerHTML = values.map(point => `<tr><th scope="row"><span class="potential-variable">L</span><sub>${point.name.slice(1)}</sub></th><td>${point.x.toFixed(5)}</td><td>${point.y.toFixed(5)}</td><td>${point.u.toFixed(5)}</td></tr>`).join('');
  }
  function render() {
    renderer.render(scene, camera);
    labels.render(scene, camera);
  }
  function updateSurface() {
    const position = geometry.getAttribute('position');
    const colorAttribute = geometry.getAttribute('color');
    for (let row = 0; row <= count; row++) for (let column = 0; column <= count; column++) {
      const x = -2 + 4 * column / count, y = -2 + 4 * row / count;
      const u = pseudoPotential(x, y, state.mu);
      const index = row * (count + 1) + column;
      position.setXYZ(index, x, y, surfaceHeight(u, state.inverted));
      const location = Math.max(0, Math.min(1, (u + 3) / 1.5)) * (ramp.length - 1);
      const lower = Math.min(ramp.length - 2, Math.floor(location));
      color.copy(ramp[lower]).lerp(ramp[lower + 1], location - lower);
      colorAttribute.setXYZ(index, color.r, color.g, color.b);
    }
    position.needsUpdate = colorAttribute.needsUpdate = true;
    geometry.computeVertexNormals();
    geometry.computeBoundingSphere();
    const values = lagrangePoints(state.mu);
    values.forEach((point, index) => {
      const z = surfaceHeight(point.u, state.inverted);
      points[index].marker.position.set(point.x, point.y, z + 0.025);
      points[index].label.position.set(point.x, point.y, z + 0.12);
    });
    updateTable(values);
    massOutput.value = state.mu.toFixed(3);
    massSlider.setAttribute('aria-valuetext', state.mu.toFixed(3));
    root.dataset.massRatio = String(state.mu);
    root.dataset.inverted = String(state.inverted);
    render();
  }
  function resetView() {
    camera.position.copy(new Vector3(4, -6, 15).normalize().multiplyScalar(8.3));
    controls.target.set(0, 0, 0);
    controls.update();
    render();
  }
  controls.addEventListener('change', render);
  massSlider.addEventListener('input', () => { state.mu = Number(massSlider.value); updateSurface(); });
  root.querySelector('#invert-potential').addEventListener('change', event => { state.inverted = event.target.checked; updateSurface(); });
  root.querySelector('#show-lagrange-labels').addEventListener('change', event => {
    points.forEach(point => { point.label.visible = event.target.checked; });
    render();
  });
  root.querySelector('#reset-potential').addEventListener('click', () => {
    state.mu = 0.3;
    state.inverted = false;
    massSlider.value = '0.3';
    root.querySelector('#invert-potential').checked = false;
    root.querySelector('#show-lagrange-labels').checked = true;
    points.forEach(point => { point.label.visible = true; });
    updateSurface();
    resetView();
  });
  canvas.addEventListener('keydown', event => {
    const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', '+', '=', '-', '_', 'Home'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Home') { resetView(); return; }
    const offset = camera.position.clone().sub(controls.target);
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') offset.applyAxisAngle(camera.up, event.key === 'ArrowLeft' ? 0.12 : -0.12);
    else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      const axis = new Vector3().crossVectors(offset, camera.up).normalize();
      offset.applyAxisAngle(axis, event.key === 'ArrowUp' ? 0.12 : -0.12);
      // Avoid the polar singularity while keeping all keyboard rotations usable.
      if (Math.abs(offset.clone().normalize().dot(camera.up)) > 0.98) return;
    } else offset.multiplyScalar(event.key === '+' || event.key === '=' ? 0.9 : 1.1);
    offset.clampLength(controls.minDistance, controls.maxDistance);
    camera.position.copy(controls.target).add(offset);
    controls.update();
    render();
  });
  const observer = new ResizeObserver(() => {
    const width = Math.max(view.clientWidth, 1), height = Math.max(view.clientHeight, 1);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    labels.setSize(width, height);
    render();
  });
  observer.observe(view);
  updateSurface();
  resetView();
  status.hidden = true;
  root.dataset.ready = 'true';
  const dispose = () => {
    observer.disconnect();
    controls.dispose();
    scene.traverse(object => { object.geometry?.dispose(); });
    surfaceMaterial.dispose();
    markerMaterial.dispose();
    axisMaterial.dispose();
    renderer.dispose();
    labels.domElement.remove();
  };
  window.addEventListener('pagehide', dispose, { once: true });
  return { dispose };
}
