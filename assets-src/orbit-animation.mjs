import {
  REVISION, CanvasTexture, MeshBasicMaterial, Mesh, PlaneGeometry, Scene,
  PerspectiveCamera, AmbientLight, WebGLRenderer, Box3, Vector3, AnimationMixer,
  Timer, DoubleSide, SRGBColorSpace,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

export const animationPresets = {
  inertial: { model: "two-body-inertial.glb" },
  barycenter: { model: "cg-relative-two-body.glb" },
  primary: { model: "m1-relative-two-body.glb", labelAnchor: "Sphere", labelText: "m1  COG   m2", labelOffset: 25 },
  relative: { model: "two-body-relative.glb", altitudeLabels: true, light: 10,
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
  let camera, scene, renderer, controls, gltfScene;
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
    context.font = "40px sans-serif";
    context.fillStyle = "rgba(255,255,255,1)";
    context.textAlign = "left";
    context.fillText(config.labelText ?? "m1    COG    m2", 0, 60);

    // canvas contents will be used for a texture
    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;

    const material = new MeshBasicMaterial({ map: texture, side: DoubleSide });
    material.transparent = true;

    const mesh = new Mesh(new PlaneGeometry(50, 20), material);
    mesh.position.x = config.labelOffset ?? 0;

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

    let loader = new Promise((resolve, reject) => {
      const ldr = new GLTFLoader();
      ldr.load(
        new URL(`../../models/${config.model}`, import.meta.url).href,
        function (gltf) {
          // Call this here to make sure everything is loaded before rendering.
          // This load function is async
          resolve(gltf);
        },
        undefined,
        function (error) {
          reject(error);
        }
      );
    });
    loader.then((gltf) => {
      gltfScene = gltf.scene;
      if (disposed) return;

      const box = new Box3().setFromObject(gltfScene);
      const size = box.getSize(new Vector3()).length();
      const center = box.getCenter(new Vector3());

      if (config.altitudeLabels) {
        material.dispose();
        texture.dispose();
        mesh.geometry.dispose();
        const labels = { visible: true };
        const labelMaterials = [];
        for (const [name, text] of [["min-altitude", "Min. Altitude"], ["max-altitude", "Max. Altitude"]]) {
          const labelCanvas = document.createElement("canvas");
          const labelContext = labelCanvas.getContext("2d");
          labelContext.font = "40px sans-serif";
          labelContext.fillStyle = "white";
          labelContext.fillText(text, 0, 60);
          const labelTexture = new CanvasTexture(labelCanvas);
          labelTexture.colorSpace = SRGBColorSpace;
          const labelMaterial = new MeshBasicMaterial({ map: labelTexture, side: DoubleSide, transparent: true });
          labelMaterials.push(labelMaterial);
          const anchor = gltfScene.getObjectByName(name);
          if (!anchor) throw new Error(`Missing model label anchor: ${name}`);
          anchor.add(new Mesh(new PlaneGeometry(200, 100), labelMaterial));
        }
        gui.add(labels, "visible").name("Show labels").onChange(() => {
          labelMaterials.forEach((item) => { item.visible = labels.visible; });
          updateLoop();
        });
      } else {
        const anchor = gltfScene.getObjectByName(config.labelAnchor ?? "Sphere002");
        if (!anchor) throw new Error("Missing body label anchor");
        anchor.add(mesh);
      }

      scene.add(gltfScene);

      gltfScene.position.x += gltfScene.position.x - center.x;
      gltfScene.position.y += gltfScene.position.y - center.y;
      gltfScene.position.z += gltfScene.position.z - center.z;
      controls.maxDistance = config.maxDistance ?? size * 10;
      camera.near = size / 100;
      camera.far = size * 100;
      camera.updateProjectionMatrix();

      camera.position.copy(center);
      const view = config.view ?? [0.5, 0.2, 0.5];
      camera.position.add(new Vector3(...view).multiplyScalar(size));
      camera.lookAt(center);
      controls.update();

      mixer = new AnimationMixer(gltfScene);
      gltf.animations.forEach((clip) => {
        const clipAction = mixer.clipAction(clip);
        clipAction.play();
      });
      mixer.timeScale = config.speed ?? 2.5;
      gui.add(mixer, "timeScale", 0, 3).name("Animation Speed").onChange(updateLoop);

      timer = new Timer();
      timer.connect(document);

      status.hidden = true;
      updateLoop();
    }).catch((error) => {
      if (disposed) return;
      status.hidden = false;
      status.textContent = `Unable to load the animation: ${error.message}`;
      console.error(error);
    });
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

    // Check whether these are defined due to the async
    // loading of the file
    if (mixer && timer) {
      timer.update(time);
      mixer.update(timer.getDelta());
    }
    if (scene && camera) {
      if (!disposed) renderer.render(scene, camera);
    }
  }
}
