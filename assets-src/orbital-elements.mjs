import {
  Scene, Group, Color, PerspectiveCamera, WebGLRenderer, Vector3, BufferGeometry,
  Float32BufferAttribute, Mesh, MeshBasicMaterial, DoubleSide, SphereGeometry,
  ConeGeometry, TubeGeometry, CatmullRomCurve3,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { loadMathFonts, labelFont } from './math-fonts.mjs';

// Recreate the original Plotly diagrams: Rz(raan) Ry(i) Rz(omega),
// with periapsis on the negative perifocal x axis. These are display rotations;
// the ascending node is therefore at 90 degrees + raan.
export const elementPresets = {
  combined: { raan: 30, omega: 60, plane: 180 },
  eccentricity: { raan: -90, omega: -90, plane: 150 },
  semimajor: { raan: -90, omega: -90, plane: 150 },
  inclination: { raan: 0, omega: 0, plane: 100 },
  raan: { raan: 30, omega: 0, plane: 100 },
  periapsis: { raan: 30, omega: 60, plane: 150 },
};
const rad = Math.PI / 180;
const blue = '#8da0cb';
const red = '#fc8d62';
export function elementGeometry(preset, inclination = 30, rightAscension, argumentOfPeriapsis, semiMajorAxis = 100, eccentricity = 0.4) {
  const config = elementPresets[preset];
  if (!config) throw new Error(`Unknown orbital-element preset: ${preset}`);
  const omega = argumentOfPeriapsis === undefined ? config.omega : argumentOfPeriapsis - 90;
  const rotate = (point) => point.clone()
    .applyAxisAngle(new Vector3(0, 0, 1), omega * rad)
    .applyAxisAngle(new Vector3(0, 1, 0), inclination * rad)
    .applyAxisAngle(new Vector3(0, 0, 1), (rightAscension === undefined ? config.raan : rightAscension - 90) * rad);
  const orbitPoint = (t) => {
    const r = semiMajorAxis * (1 - eccentricity ** 2) / (1 - eccentricity * Math.cos(t));
    return rotate(new Vector3(r * Math.cos(t), r * Math.sin(t), 0));
  };
  const nodeAngle = Math.PI / 2 - omega * rad;
  // Uniform eccentric anomaly resolves the entire ellipse even near e = 1.
  const ellipsePoints = () => Array.from({ length: 257 }, (_, index) => {
    const anomaly = index * 2 * Math.PI / 256;
    return rotate(new Vector3(semiMajorAxis * (eccentricity + Math.cos(anomaly)),
      semiMajorAxis * Math.sqrt(1 - eccentricity ** 2) * Math.sin(anomaly), 0));
  });
  return { config, rotate, orbitPoint, ellipsePoints, nodeAngle,
    ascending: orbitPoint(nodeAngle), descending: orbitPoint(nodeAngle + Math.PI),
    periapsis: orbitPoint(Math.PI), normal: rotate(new Vector3(0, 0, 100)),
  };
}

export async function mountOrbitalElements({ preset = 'inclination', root = document.body } = {}) {
  const geometry = elementGeometry(preset);
  const { config, orbitPoint, nodeAngle } = geometry;
  root.style.cssText = 'position:relative;width:100%;height:100%;overflow:hidden;background:white';
  const status = document.createElement('p');
  status.id = 'status';
  status.setAttribute('role', 'status');
  status.textContent = 'Loading orbital-element diagram…';
  root.append(status);
  try { await loadMathFonts(); }
  catch (error) { status.textContent = `Unable to load diagram fonts: ${error.message}`; return; }
  let renderer;
  try { renderer = new WebGLRenderer({ antialias: true }); }
  catch (error) { status.textContent = `Unable to display the diagram: ${error.message}`; return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  root.append(renderer.domElement);
  const labels = new CSS2DRenderer();
  labels.domElement.style.cssText = 'position:absolute;inset:0;pointer-events:none';
  root.append(labels.domElement);
  const scene = new Scene();
  scene.background = new Color('white');
  const camera = new PerspectiveCamera(40, 1, 1, 2000);
  camera.up.set(0, 0, 1);
  // Preserve the published Z-up camera and undistorted orbital geometry.
  const display = (point) => point.clone();
  const origin = new Vector3();
  const material = (color, options = {}) => new MeshBasicMaterial({ color, ...options });
  function curve(points, color = 'black', radius = 0.75) {
    const path = new CatmullRomCurve3(points.map(display));
    const mesh = new Mesh(new TubeGeometry(path, Math.max(2, points.length * 2), radius, 6, false), material(color));
    scene.add(mesh);
    return mesh;
  }
  function label(text, point, dx = 0, dy = 0, size = 20) {
    const element = document.createElement('span');
    element.textContent = text;
    element.style.cssText = `font:${labelFont(text, size)};color:black;white-space:nowrap;position:relative;left:${dx}px;top:${dy}px`;
    const object = new CSS2DObject(element);
    object.position.copy(display(point));
    object.userData = { size, dx, dy };
    scene.add(object);
    return object;
  }
  function marker(point, color, radius) {
    const mesh = new Mesh(new SphereGeometry(radius, 24, 16), material(color));
    mesh.position.copy(display(point));
    scene.add(mesh);
    return mesh;
  }
  function surfaceGeometry(points) {
    const vertices = [];
    for (let i = 1; i < points.length - 1; i++) {
      for (const point of [points[0], points[i], points[i + 1]]) vertices.push(...display(point).toArray());
    }
    const buffer = new BufferGeometry();
    buffer.setAttribute('position', new Float32BufferAttribute(vertices, 3));
    return buffer;
  }
  function surface(points, color, opacity = 1) {
    const mesh = new Mesh(surfaceGeometry(points), material(color, { side: DoubleSide, transparent: opacity < 1, opacity, depthWrite: opacity === 1 }));
    scene.add(mesh);
    return mesh;
  }
  const orbit = (preset === 'eccentricity' || preset === 'combined') ? geometry.ellipsePoints() : Array.from({ length: 257 }, (_, i) => orbitPoint(i * Math.PI * 2 / 256));
  const orbitSurface = surface(orbit.slice(0, -1), '#808080');
  const s = config.plane;
  surface([new Vector3(-s, -s, 0), new Vector3(s, -s, 0), new Vector3(s, s, 0), new Vector3(-s, s, 0)], '#d3d3d3', 0.7);
  const orbitOutline = curve(orbit, blue, 1.1);
  marker(origin, 'black', 5);
  for (const [text, point, color, dx, dy] of [
    ['X', new Vector3(100, 0, 0), '#ff6692', 14, 8],
    ['Y', new Vector3(0, 100, 0), '#19d3f3', 16, 0],
    ['Z', new Vector3(0, 0, 100), '#ffa15a', 0, -18],
  ]) { curve([origin, point], color, 1); label(text, point, dx, dy, 27); }
  const momentum = curve([origin, geometry.normal.clone().multiplyScalar(0.92)], red, 1.35);
  const direction = display(geometry.normal).normalize();
  const tip = new Mesh(new ConeGeometry(2.8, 9, 20), material('#d86a48'));
  tip.position.copy(display(geometry.normal)).addScaledVector(direction, -4);
  tip.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), direction);
  scene.add(tip);
  const momentumLabel = label('h', geometry.normal, 0, -22, 28);
  const periapsisLine = curve([origin, geometry.periapsis]);
  const periapsisMarker = label('○', geometry.periapsis, 0, 0, 25);
  const periapsisLabel = label('periapsis', geometry.periapsis, -55, -18, 18);
  const arc = (start, end, fn) => Array.from({ length: 65 }, (_, i) => fn(start + (end - start) * i / 64));
  let sliderPanel;
  if (preset === 'combined') {
    const values = { a: 100, e: 0.4, i: 30, ascending: 120, argument: 150 };
    const specifications = [
      ['a', 'Semi-major axis (relative units)', 50, 150, 1],
      ['e', 'Eccentricity', 0, 0.99, 0.01],
      ['i', 'Inclination', 0, 180, 1],
      ['ascending', 'Right ascension of the ascending node', 0, 360, 1],
      ['argument', 'Argument of periapsis', 0, 360, 1],
    ];
    const format = (key) => key === 'e' ? values[key].toFixed(2) : `${values[key]}${key === 'a' ? '' : '°'}`;
    sliderPanel = document.createElement('div');
    sliderPanel.style.cssText = 'position:absolute;bottom:0;left:0;right:0;padding:8px 12px;box-sizing:border-box;background:white;font:14px Arial,sans-serif;z-index:2';
    sliderPanel.innerHTML = specifications.map(([key, text, min, max, step]) => `
      <div style="max-width:480px;margin:0 auto 6px;display:grid;grid-template-columns:minmax(0,1fr) 45px;align-items:center;gap:2px 8px">
        <label for="combined-${key}" style="grid-column:1/-1">${text}</label>
        <input id="combined-${key}" type="range" min="${min}" max="${max}" step="${step}" value="${values[key]}" style="width:100%;min-width:0;margin:0">
        <output for="combined-${key}" style="text-align:right">${format(key)}</output>
      </div>`).join('') + '<p role="status" style="max-width:480px;min-height:32px;margin:4px auto 0;font-size:12px;line-height:16px"></p>';
    root.append(sliderPanel);
    const explanation = sliderPanel.querySelector('p');
    const centerMarker = marker(geometry.rotate(new Vector3(40, 0, 0)), '#007f5f', 2.4);
    const centerLabel = label('Center', centerMarker.position, 0, 42, 14);
    const ascendingMarker = marker(geometry.ascending, red, 2.6);
    const descendingMarker = marker(geometry.descending, '#636efa', 2.6);
    const ascendingLabel = label('Ascending Node', geometry.ascending, 0, -18, 14);
    const descendingLabel = label('Descending Node', geometry.descending, 0, 18, 14);
    const inclinationArc = curve(arc(0, 0.5, (t) => new Vector3(50 * Math.sin(t), 0, 50 * Math.cos(t))));
    const inclinationLabel = label('i', new Vector3(), 8, -12);
    const ascendingArc = curve(arc(0, 1, (t) => new Vector3(45 * Math.cos(t), 45 * Math.sin(t), 0)));
    const rightAscensionLabel = label('Ω', new Vector3(), 12, 0);
    const argumentArc = curve(arc(0, 1, (t) => new Vector3(35 * Math.cos(t), 35 * Math.sin(t), 0)));
    const argumentLabel = label('ω', new Vector3(), -12, 0);
    function replaceCurve(mesh, points, radius = 0.75) {
      mesh.geometry.dispose();
      mesh.geometry = new TubeGeometry(new CatmullRomCurve3(points), Math.max(4, points.length * 2), radius, 6, false);
    }
    function updateCombined() {
      const g = elementGeometry('combined', values.i, values.ascending, values.argument, values.a, values.e);
      const points = g.ellipsePoints();
      orbitSurface.geometry.dispose();
      orbitSurface.geometry = surfaceGeometry(points.slice(0, -1));
      replaceCurve(orbitOutline, points, 1.1);
      replaceCurve(periapsisLine, [origin, g.periapsis]);
      periapsisMarker.position.copy(g.periapsis);
      periapsisLabel.position.copy(g.periapsis);
      periapsisLine.visible = periapsisMarker.visible = periapsisLabel.visible = values.e > 0;
      centerMarker.position.copy(g.rotate(new Vector3(values.a * values.e, 0, 0)));
      centerLabel.position.copy(centerMarker.position);
      centerMarker.visible = centerLabel.visible = values.e > 0;
      const normal = g.normal.clone().normalize();
      const momentumEnd = normal.clone().multiplyScalar(100 * Math.sqrt(values.a * (1 - values.e ** 2) / 84));
      replaceCurve(momentum, [origin, momentumEnd.clone().multiplyScalar(0.92)], 1.35);
      tip.position.copy(momentumEnd).addScaledVector(normal, -4);
      tip.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), normal);
      momentumLabel.position.copy(momentumEnd);
      ascendingMarker.position.copy(g.ascending);
      descendingMarker.position.copy(g.descending);
      ascendingLabel.position.copy(g.ascending);
      descendingLabel.position.copy(g.descending);
      const hasNodes = values.i > 0 && values.i < 180;
      for (const item of [ascendingMarker, descendingMarker, ascendingLabel, descendingLabel]) item.visible = hasNodes;
      const azimuth = (values.ascending - 90) * rad;
      const inclinationPoint = (t) => new Vector3(50 * Math.sin(t) * Math.cos(azimuth), 50 * Math.sin(t) * Math.sin(azimuth), 50 * Math.cos(t));
      inclinationArc.visible = inclinationLabel.visible = values.i > 0;
      if (values.i > 0) {
        replaceCurve(inclinationArc, arc(0, values.i * rad, inclinationPoint));
        inclinationLabel.position.copy(inclinationPoint(values.i * rad / 2));
      }
      ascendingArc.visible = rightAscensionLabel.visible = hasNodes && values.ascending > 0;
      if (ascendingArc.visible) {
        const point = (t) => new Vector3(45 * Math.cos(t), 45 * Math.sin(t), 0);
        replaceCurve(ascendingArc, arc(0, values.ascending * rad, point));
        rightAscensionLabel.position.copy(point(values.ascending * rad / 2));
      }
      argumentArc.visible = argumentLabel.visible = hasNodes && values.e > 0 && values.argument > 0;
      if (argumentArc.visible) {
        const point = (t) => g.rotate(new Vector3(Math.cos(t), Math.sin(t), 0)).multiplyScalar(35);
        replaceCurve(argumentArc, arc(g.nodeAngle, Math.PI, point));
        argumentLabel.position.copy(point((g.nodeAngle + Math.PI) / 2));
      }
      explanation.textContent = [
        values.e === 0 ? 'Circular orbit: periapsis and its argument are undefined.' : '',
        !hasNodes ? 'Equatorial orbit: the ascending node and its right ascension are undefined.' : '',
      ].filter(Boolean).join(' ');
    }
    for (const [key] of specifications) {
      const slider = sliderPanel.querySelector(`#combined-${key}`);
      const output = sliderPanel.querySelector(`output[for="combined-${key}"]`);
      slider.setAttribute('aria-valuetext', format(key));
      slider.addEventListener('input', () => {
        values[key] = Number(slider.value);
        output.value = format(key);
        slider.setAttribute('aria-valuetext', format(key));
        updateCombined();
        render();
      });
    }
    updateCombined();
  } else if (preset === 'eccentricity') {
    const center = geometry.rotate(new Vector3(40, 0, 0));
    const centerMarker = marker(center, '#007f5f', 2.4);
    const centerLabel = label('Center', center, -28, 12, 16);
    const focusLabel = label('Focus', origin, -10, 25, 16);
    periapsisLabel.userData.dx = 42;
    periapsisLabel.userData.dy = -16;
    const scalableMomentum = new Group();
    scene.add(scalableMomentum);
    scalableMomentum.add(momentum, tip, momentumLabel);
    sliderPanel = document.createElement('div');
    sliderPanel.style.cssText = 'position:absolute;bottom:0;left:0;right:0;height:64px;box-sizing:border-box;display:grid;grid-template-columns:minmax(0,280px) 40px;justify-content:center;align-items:center;gap:4px 8px;padding:6px 12px;background:white;font:14px Arial,sans-serif;z-index:2';
    sliderPanel.innerHTML = `<label for="eccentricity" style="grid-column:1/-1">Eccentricity</label>
      <input id="eccentricity" type="range" min="0" max="0.99" step="0.01" value="0.4" style="width:100%;min-width:0;margin:0">
      <output for="eccentricity" style="text-align:right">0.40</output>`;
    root.append(sliderPanel);
    const slider = sliderPanel.querySelector('input');
    const output = sliderPanel.querySelector('output');
    slider.setAttribute('aria-valuetext', '0.40');
    slider.addEventListener('input', () => {
      const value = Number(slider.value);
      const updated = elementGeometry(preset, 30, undefined, undefined, 100, value);
      const points = updated.ellipsePoints();
      orbitSurface.geometry.dispose();
      orbitSurface.geometry = surfaceGeometry(points.slice(0, -1));
      orbitOutline.geometry.dispose();
      orbitOutline.geometry = new TubeGeometry(new CatmullRomCurve3(points), 514, 1.1, 6, false);
      periapsisLine.geometry.dispose();
      periapsisLine.geometry = new TubeGeometry(new CatmullRomCurve3([origin, updated.periapsis]), 4, 0.75, 6, false);
      periapsisMarker.position.copy(updated.periapsis);
      periapsisLabel.position.copy(updated.periapsis);
      // A circular orbit has no unique periapsis or argument of periapsis.
      periapsisLine.visible = periapsisMarker.visible = periapsisLabel.visible = value > 0;
      centerMarker.position.copy(updated.rotate(new Vector3(100 * value, 0, 0)));
      centerLabel.position.copy(centerMarker.position);
      centerLabel.visible = centerMarker.visible = value > 0;
      focusLabel.element.textContent = value === 0 ? 'Center / focus' : 'Focus';
      scalableMomentum.scale.setScalar(Math.sqrt((1 - value ** 2) / (1 - 0.4 ** 2)));
      output.value = value.toFixed(2);
      slider.setAttribute('aria-valuetext', value.toFixed(2));
      render();
    });
  } else if (preset === 'semimajor') {
    const scalableOrbit = new Group();
    const scalableMomentum = new Group();
    scene.add(scalableOrbit, scalableMomentum);
    const center = geometry.periapsis.clone().multiplyScalar(-0.4 / (1 - 0.4));
    // Offset the dimension from the X axis so the measurement stays legible.
    const offset = geometry.rotate(new Vector3(0, 35, 0));
    const dimensionStart = center.clone().add(offset);
    const dimensionEnd = geometry.periapsis.clone().add(offset);
    const dimension = curve([dimensionStart, dimensionEnd], '#007f5f', 1.4);
    const centerExtension = curve([center, dimensionStart], '#007f5f', 0.5);
    const periapsisExtension = curve([geometry.periapsis, dimensionEnd], '#007f5f', 0.5);
    const centerMarker = marker(center, '#007f5f', 2.4);
    const centerLabel = label('Center', center, -28, 12, 16);
    const dimensionLabel = label('a', dimensionStart.clone().lerp(dimensionEnd, 0.5), -32, -5, 24);
    label('Focus', origin, -10, 25, 16);
    periapsisLabel.userData.dx = 42;
    periapsisLabel.userData.dy = -16;
    scalableOrbit.add(orbitSurface, orbitOutline, periapsisLine, periapsisMarker,
      periapsisLabel, dimension, centerExtension, periapsisExtension, centerMarker, centerLabel, dimensionLabel);
    scalableMomentum.add(momentum, tip, momentumLabel);
    sliderPanel = document.createElement('div');
    sliderPanel.style.cssText = 'position:absolute;bottom:0;left:0;right:0;height:64px;box-sizing:border-box;display:grid;grid-template-columns:minmax(0,280px) 40px;justify-content:center;align-items:center;gap:4px 8px;padding:6px 12px;background:white;font:14px Arial,sans-serif;z-index:2';
    sliderPanel.innerHTML = `<label for="semi-major-axis" style="grid-column:1/-1">Semi-major axis (relative units)</label>
      <input id="semi-major-axis" type="range" min="50" max="150" step="1" value="100" style="width:100%;min-width:0;margin:0">
      <output for="semi-major-axis" style="text-align:right">100</output>`;
    root.append(sliderPanel);
    const slider = sliderPanel.querySelector('input');
    const output = sliderPanel.querySelector('output');
    slider.setAttribute('aria-valuetext', '100 relative units');
    slider.addEventListener('input', () => {
      const value = Number(slider.value);
      scalableOrbit.scale.setScalar(value / 100);
      // For fixed eccentricity and central mass, h is proportional to sqrt(a).
      scalableMomentum.scale.setScalar(Math.sqrt(value / 100));
      output.value = String(value);
      slider.setAttribute('aria-valuetext', `${value} relative units`);
      render();
    });
  } else if (preset === 'inclination') {
    const orbitalPlane = new Group();
    scene.add(orbitalPlane);
    orbitalPlane.add(orbitSurface, orbitOutline, momentum, tip, momentumLabel,
      periapsisLine, periapsisMarker, periapsisLabel);
    const normalArcPoint = (t) => new Vector3(50 * Math.sin(t), 0, 50 * Math.cos(t));
    const planeArcPoint = (t) => new Vector3(-60 * Math.cos(t), 0, 60 * Math.sin(t));
    const normalArc = curve(arc(0, 30 * rad, normalArcPoint));
    const planeArc = curve(arc(0, 30 * rad, planeArcPoint));
    const normalAngleLabel = label('i', normalArcPoint(15 * rad), 8, -18, 25);
    const planeAngleLabel = label('i', planeArcPoint(15 * rad), -12, 0);
    sliderPanel = document.createElement('div');
    sliderPanel.style.cssText = 'position:absolute;bottom:0;left:0;right:0;height:42px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;gap:8px;padding:6px 12px;background:white;font:14px Arial,sans-serif;z-index:2';
    sliderPanel.innerHTML = `<label for="inclination">Inclination</label>
      <input id="inclination" type="range" min="0" max="180" step="1" value="30" style="flex:1;max-width:280px;min-width:0">
      <output for="inclination" style="min-width:36px;text-align:right">30°</output>`;
    root.append(sliderPanel);
    const slider = sliderPanel.querySelector('input');
    const output = sliderPanel.querySelector('output');
    slider.setAttribute('aria-valuetext', '30 degrees');
    slider.addEventListener('input', () => {
      const degrees = Number(slider.value);
      const angle = degrees * rad;
      orbitalPlane.rotation.y = (degrees - 30) * rad;
      for (const [mesh, point] of [[normalArc, normalArcPoint], [planeArc, planeArcPoint]]) {
        mesh.visible = degrees > 0;
        // Avoid degenerate tube geometry at zero inclination.
        if (degrees > 0) {
          const path = new CatmullRomCurve3(arc(0, angle, point));
          mesh.geometry.dispose();
          mesh.geometry = new TubeGeometry(path, 130, 0.75, 6, false);
        }
      }
      normalAngleLabel.position.copy(normalArcPoint(angle / 2));
      planeAngleLabel.position.copy(planeArcPoint(angle / 2));
      normalAngleLabel.visible = planeAngleLabel.visible = degrees > 0;
      output.value = `${degrees}°`;
      slider.setAttribute('aria-valuetext', `${degrees} degrees`);
      render();
    });
  } else {
    const ascendingMarker = marker(geometry.ascending, red, 2.6);
    const descendingMarker = marker(geometry.descending, '#636efa', 2.6);
    const ascendingLabel = label('Ascending Node', geometry.ascending, 0, -22, 14);
    const descendingLabel = label('Descending Node', geometry.descending, 0, 20, 14);
    if (preset === 'raan') {
      const nodeDirection = geometry.ascending.clone().normalize();
      const nodeLine = curve([nodeDirection.clone().multiplyScalar(-150), nodeDirection.clone().multiplyScalar(150)]);
      const nodeLabel = label('Node Line', nodeDirection.clone().multiplyScalar(-143), -4, -14, 18);
      const orbitalPlane = new Group();
      scene.add(orbitalPlane);
      orbitalPlane.add(orbitSurface, orbitOutline, momentum, tip, momentumLabel,
        periapsisLine, periapsisMarker, periapsisLabel, ascendingMarker,
        descendingMarker, ascendingLabel, descendingLabel, nodeLine, nodeLabel);
      const anglePoint = (t) => new Vector3(50 * Math.cos(t), 50 * Math.sin(t), 0);
      const angleArc = curve(arc(0, 120 * rad, anglePoint));
      const angleLabel = label('Ω', anglePoint(60 * rad), 18, 0);
      sliderPanel = document.createElement('div');
      sliderPanel.style.cssText = 'position:absolute;bottom:0;left:0;right:0;height:64px;box-sizing:border-box;display:grid;grid-template-columns:minmax(0,280px) 40px;justify-content:center;align-items:center;gap:4px 8px;padding:6px 12px;background:white;font:14px Arial,sans-serif;z-index:2';
      sliderPanel.innerHTML = `<label for="right-ascension" style="grid-column:1/-1">Right ascension of the ascending node</label>
        <input id="right-ascension" type="range" min="0" max="360" step="1" value="120" style="width:100%;min-width:0;margin:0">
        <output for="right-ascension" style="text-align:right">120°</output>`;
      root.append(sliderPanel);
      const slider = sliderPanel.querySelector('input');
      const output = sliderPanel.querySelector('output');
      slider.setAttribute('aria-valuetext', '120 degrees');
      slider.addEventListener('input', () => {
        const degrees = Number(slider.value);
        const angle = degrees * rad;
        // The published starting view places the ascending node at 120°.
        orbitalPlane.rotation.z = (degrees - 120) * rad;
        angleArc.visible = angleLabel.visible = degrees > 0;
        if (degrees > 0) {
          angleArc.geometry.dispose();
          angleArc.geometry = new TubeGeometry(new CatmullRomCurve3(arc(0, angle, anglePoint)), 130, 0.75, 6, false);
        }
        angleLabel.position.copy(anglePoint(angle / 2));
        output.value = `${degrees}°`;
        slider.setAttribute('aria-valuetext', `${degrees} degrees`);
        render();
      });
    } else {
      const rotatingOrbit = new Group();
      scene.add(rotatingOrbit);
      rotatingOrbit.add(orbitSurface, orbitOutline, periapsisLine, periapsisMarker, periapsisLabel);
      const normal = geometry.normal.clone().normalize();
      // Follow the orbit just outside its outline, from ascending node to periapsis.
      function argumentArc(g) {
        return arc(g.nodeAngle, Math.PI, (t) => {
          const point = g.orbitPoint(t);
          return point.multiplyScalar((point.length() + 5) / point.length());
        });
      }
      const initialArc = argumentArc(geometry);
      const angleArc = curve(initialArc, 'black', 0.95);
      const angleLabel = label('ω', initialArc[32], -20, 0);
      sliderPanel = document.createElement('div');
      sliderPanel.style.cssText = 'position:absolute;bottom:0;left:0;right:0;height:64px;box-sizing:border-box;display:grid;grid-template-columns:minmax(0,280px) 40px;justify-content:center;align-items:center;gap:4px 8px;padding:6px 12px;background:white;font:14px Arial,sans-serif;z-index:2';
      sliderPanel.innerHTML = `<label for="argument-of-periapsis" style="grid-column:1/-1">Argument of periapsis</label>
        <input id="argument-of-periapsis" type="range" min="0" max="360" step="1" value="150" style="width:100%;min-width:0;margin:0">
        <output for="argument-of-periapsis" style="text-align:right">150°</output>`;
      root.append(sliderPanel);
      const slider = sliderPanel.querySelector('input');
      const output = sliderPanel.querySelector('output');
      slider.setAttribute('aria-valuetext', '150 degrees');
      slider.addEventListener('input', () => {
        const degrees = Number(slider.value);
        const updated = elementGeometry(preset, 30, undefined, degrees);
        rotatingOrbit.quaternion.setFromAxisAngle(normal, (degrees - 150) * rad);
        // Node directions stay fixed; their radii follow the rotated ellipse.
        ascendingMarker.position.copy(updated.ascending);
        descendingMarker.position.copy(updated.descending);
        ascendingLabel.position.copy(updated.ascending);
        descendingLabel.position.copy(updated.descending);
        angleArc.visible = angleLabel.visible = degrees > 0;
        if (degrees > 0) {
          const points = argumentArc(updated);
          angleArc.geometry.dispose();
          angleArc.geometry = new TubeGeometry(new CatmullRomCurve3(points), 130, 0.95, 6, false);
          angleLabel.position.copy(points[32]);
        }
        output.value = `${degrees}°`;
        slider.setAttribute('aria-valuetext', `${degrees} degrees`);
        render();
      });
    }
  }
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.copy(origin);
  controls.enablePan = false;
  controls.minDistance = 80;
  controls.maxDistance = 1400;
  renderer.domElement.setAttribute('aria-label', '3D orbital-element diagram. Drag to orbit; scroll or pinch to zoom.');
  renderer.domElement.title = 'Drag to orbit · Scroll or pinch to zoom';
  renderer.domElement.style.cursor = 'grab';
  controls.addEventListener('start', () => { renderer.domElement.style.cursor = 'grabbing'; });
  controls.addEventListener('end', () => { renderer.domElement.style.cursor = 'grab'; });
  // Render only when the view changes; no continuous animation is needed.
  function render() {
    renderer.render(scene, camera);
    labels.render(scene, camera);
  }
  controls.addEventListener('change', render);
  let previousFit;
  function resize() {
    const width = Math.max(root.clientWidth, 1), height = Math.max(root.clientHeight - (sliderPanel?.offsetHeight ?? 0), 1);
    const distance = ((preset === 'combined' || preset === 'semimajor' || preset === 'eccentricity') ? 520 : preset === 'periapsis' ? 490 : 420) * Math.max(1, 1.2 / (width / height));
    const labelScale = Math.min(1, width / 600);
    scene.traverse((object) => {
      if (object.isCSS2DObject) {
        const { size, dx, dy } = object.userData;
        object.element.style.fontSize = `${size * labelScale}px`;
        object.element.style.left = `${dx * labelScale}px`;
        object.element.style.top = `${dy * labelScale}px`;
      }
    });
    camera.aspect = width / height;
    if (previousFit === undefined) {
      camera.position.copy(new Vector3(1.0707, -1.0707, 1).normalize().multiplyScalar(distance));
    } else {
      // Retain the user's viewing direction and zoom relative to the fitted view.
      camera.position.multiplyScalar(distance / previousFit);
    }
    previousFit = distance;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    labels.setSize(width, height);
    controls.update();
    render();
  }
  const observer = new ResizeObserver(resize);
  observer.observe(root);
  if (sliderPanel) observer.observe(sliderPanel);
  resize();
  status.hidden = true;
  root.dataset.preset = preset;
  window.addEventListener('pagehide', () => {
    observer.disconnect();
    controls.dispose();
    scene.traverse((object) => { object.geometry?.dispose(); object.material?.dispose(); });
    renderer.dispose();
    labels.domElement.remove();
  }, { once: true });
}
