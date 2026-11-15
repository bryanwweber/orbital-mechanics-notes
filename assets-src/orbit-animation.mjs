import {
  REVISION, CanvasTexture, MeshBasicMaterial, Mesh, PlaneGeometry, Scene,
  PerspectiveCamera, AmbientLight, WebGLRenderer, Box3, Vector3, AnimationMixer,
  Timer, DoubleSide, SRGBColorSpace,
} from "three";
import { createTwoBodyScene } from "./two-body-scenes.mjs";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

export const animationPresets = {
  inertial: {},
  barycenter: {},
  primary: { labelAnchor: "Sphere", labelText: "m1  COG   m2", labelOffset: 25 },
  relative: { altitudeLabels: true, light: 10,
    minDistance: 100, maxDistance: 300, view: [-0.2, 0.5, 1], speed: 1 },
};

export function mountOrbitAnimation({ preset = "inertial", root = document.body } = {}) {
  const config = animationPresets[preset];
  if (!config) throw new Error(`Unknown orbit animation preset: ${preset}`);
  root.style.position = "relative";
  root.style.width = "100%";
  if (!root.clientHeight) root.style.height = "400px";
  root.innerHTML = `<div class="orbit-scene" style="position:absolute;inset:0"></div>
    <div class="orbit-gui" style="position:absolute;top:0;right:0"></div>
    <p id="status" role="status" style="position:absolute;bottom:8px;left:8px;color:white;background:#222;font:14px sans-serif">Loading animation…</p>`;
  const status = root.querySelector('[role="status"]');
  let disposed = false;
  let camera, scene, renderer, controls, orbitScene;
  let mixer, timer, container, guiContainer, gui;
  let height;
  let width;
  let visible = true;
  let previousFrame = 0;
  function updateLoop() {
    renderer.setAnimationLoop(visible && mixer && mixer.timeScale > 0 ? animate : null);
    timer?.reset();
    if (!disposed) renderer.render(scene, camera);
  }
  document.documentElement.dataset.threeRevision = REVISION;
  try {
    // Modern WebGLRenderer requires WebGL 2.
    const renderCanvas = document.createElement("canvas");
    const renderContext = renderCanvas.getContext("webgl2", { antialias: true, alpha: false });
    if (!renderContext) {
      throw new Error("WebGL 2 is unavailable. Enable hardware acceleration or use a supported browser.");
    }
    init(renderCanvas, renderContext);
  } catch (error) {
    status.hidden = false;
    status.textContent = error.message;
    console.error(error);
  }
  function init(renderCanvas, renderContext) {
    container = root.querySelector(".orbit-scene");

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const labelText = config.labelText ?? "m1    COG    m2";
    context.font = "40px sans-serif";
    const bounds = context.measureText(labelText);
    canvas.width = Math.max(canvas.width, Math.ceil(Math.max(bounds.width, bounds.actualBoundingBoxRight)) + 8);
    // Resizing resets the drawing context. Leave room for the complete last glyph.
    context.font = "40px sans-serif";
    context.fillStyle = "rgba(255,255,255,1)";
    context.textAlign = "left";
    context.fillText(labelText, 0, 60);

    // canvas contents will be used for a texture
    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;

    const material = new MeshBasicMaterial({ map: texture, side: DoubleSide });
    material.transparent = true;

    const labelWidth = 50 * canvas.width / 300;
    const mesh = new Mesh(new PlaneGeometry(labelWidth, 20), material);
    // Extend the right edge without moving or shrinking the existing labels.
    mesh.position.x = (config.labelOffset ?? 0) + (labelWidth - 50) / 2;

    scene = new Scene();

    width = Math.max(container.clientWidth, 1);
    height = Math.max(container.clientHeight, 1);
    camera = new PerspectiveCamera(60, width / height, 0.25, 1000);
    camera.position.set(22, -41, 104);
    scene.add(camera);

    scene.add(new AmbientLight(0xffffff, config.light ?? 3));

    renderer = new WebGLRenderer({ canvas: renderCanvas, context: renderContext, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.outputColorSpace = SRGBColorSpace;
    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = config.minDistance ?? 10;
    controls.maxDistance = 1000;
    controls.screenSpacePanning = true;
    controls.addEventListener("change", () => renderer.render(scene, camera));

    guiContainer = root.querySelector(".orbit-gui");
    gui = new GUI({ width: 320, container: guiContainer });
    if (!config.altitudeLabels) gui.add(material, "visible").name("Show label").onChange(updateLoop);

    {
      const model = createTwoBodyScene(preset);
      orbitScene = model.scene;
      if (disposed) return;

      const box = new Box3().setFromObject(orbitScene);
      const size = box.getSize(new Vector3()).length();
      const center = box.getCenter(new Vector3());

      // Body materials share their colors with the corresponding trajectories.
      // Convert the materials' linear colors to CSS/sRGB for the canvas texture.
      function labelColor(name) {
        const object = orbitScene.getObjectByName(name);
        const material = Array.isArray(object?.material) ? object.material[0] : object?.material;
        if (!material?.color) throw new Error(`Missing scene label color: ${name}`);
        return material.color.getStyle(SRGBColorSpace);
      }

      if (config.altitudeLabels) {
        material.dispose();
        texture.dispose();
        mesh.geometry.dispose();
        const labels = { visible: true };
        const labelMaterials = [];
        for (const [name, text] of [["min-altitude", "Min. Altitude"], ["max-altitude", "Max. Altitude"]]) {
          const anchor = orbitScene.getObjectByName(name);
          if (!anchor) throw new Error(`Missing scene label anchor: ${name}`);
          const labelCanvas = document.createElement("canvas");
          const labelContext = labelCanvas.getContext("2d");
          labelContext.font = "40px sans-serif";
          labelContext.fillStyle = labelColor(name);
          labelContext.fillText(text, 0, 60);
          const labelTexture = new CanvasTexture(labelCanvas);
          labelTexture.colorSpace = SRGBColorSpace;
          const labelMaterial = new MeshBasicMaterial({ map: labelTexture, side: DoubleSide, transparent: true });
          labelMaterials.push(labelMaterial);
          anchor.add(new Mesh(new PlaneGeometry(200, 100), labelMaterial));
        }
        gui.add(labels, "visible").name("Show labels").onChange(() => {
          labelMaterials.forEach((item) => { item.visible = labels.visible; });
          updateLoop();
        });
      } else {
        const colors = {
          m1: labelColor("Sphere"),
          COG: labelColor("Sphere002"),
          m2: labelColor("Sphere001"),
        };
        context.clearRect(0, 0, canvas.width, canvas.height);
        let labelX = 0;
        for (const part of labelText.split(/(m1|COG|m2)/)) {
          context.fillStyle = colors[part] ?? "white";
          context.fillText(part, labelX, 60);
          labelX += context.measureText(part).width;
        }
        texture.needsUpdate = true;
        const anchor = orbitScene.getObjectByName(config.labelAnchor ?? "Sphere002");
        if (!anchor) throw new Error("Missing body label anchor");
        anchor.add(mesh);
      }

      scene.add(orbitScene);

      orbitScene.position.sub(center);
      controls.maxDistance = config.maxDistance ?? size * 10;
      camera.near = size / 100;
      camera.far = size * 100;
      camera.updateProjectionMatrix();

      camera.position.set(0, 0, 0);
      const view = config.view ?? [0.5, 0.2, 0.5];
      const halfFov = Math.atan(Math.tan(camera.fov * Math.PI / 360) * Math.min(camera.aspect, 1));
      const distance = Math.min(controls.maxDistance, size / (2 * Math.sin(halfFov)) * 1.1);
      camera.position.add(new Vector3(...view).normalize().multiplyScalar(distance));
      camera.lookAt(controls.target);
      controls.update();

      mixer = new AnimationMixer(orbitScene);
      model.animations.forEach((clip) => {
        const clipAction = mixer.clipAction(clip);
        clipAction.play();
      });
      mixer.timeScale = config.speed ?? 2.5;
      gui.add(mixer, "timeScale", 0, 3).name("Animation Speed").onChange(updateLoop);

      timer = new Timer();
      timer.connect(document);

      status.hidden = true;
      updateLoop();
    }
    const observer = new ResizeObserver(handleResize);
    observer.observe(container);
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updateLoop();
    });
    visibility.observe(container);
    window.addEventListener("pagehide", () => {
      disposed = true;
      renderer.setAnimationLoop(null);
      observer.disconnect();
      visibility.disconnect();
      controls.dispose();
      gui.destroy();
      scene.traverse((object) => {
        object.geometry?.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.filter(Boolean).forEach((item) => {
          Object.values(item).forEach((value) => { if (value?.isTexture) value.dispose(); });
          item.dispose();
        });
      });
      timer?.dispose();
      renderer.dispose();
    }, { once: true });
  }

  function handleResize() {
    width = Math.max(container.clientWidth, 1);
    height = Math.max(container.clientHeight, 1);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    if (!disposed) renderer.render(scene, camera);
  }

  function animate(time) {
    if (time - previousFrame < 1000 / 30) return;
    previousFrame = time;

    // Timer deltas exclude time spent paused or offscreen.
    if (mixer && timer) {
      timer.update(time);
      mixer.update(timer.getDelta());
    }
    if (scene && camera) {
      if (!disposed) renderer.render(scene, camera);
    }
  }
}
