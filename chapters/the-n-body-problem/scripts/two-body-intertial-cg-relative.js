<script type="module">
  import { mountOrbitAnimation } from "../assets/js/orbital-three/orbital-three.js";
  const root = document.getElementById("cg-relative-scene") ?? document.body;
  if (!root.querySelector(".orbit-scene")) {
    mountOrbitAnimation({ preset: "barycenter", root });
  }
</script>
