const root = document.body;
const placeholder = root.querySelector("img");

async function mountWhenVisible() {
  try {
    const { mountOrbitalElements } = await import("../../../assets/js/orbital-three/orbital-three.js");
    mountOrbitalElements({ preset: root.dataset.orbitalElements });
    if (root.querySelector("canvas")) placeholder.remove();
  } catch (error) {
    const status = document.createElement("p");
    status.setAttribute("role", "status");
    status.textContent = "Unable to load the interactive diagram.";
    root.append(status);
    console.error(error);
  }
}

const observer = new IntersectionObserver(([entry]) => {
  if (!entry.isIntersecting) return;
  observer.disconnect();
  void mountWhenVisible();
});
observer.observe(root);
