import { sites } from "./launch-sites.js";

const container = document.querySelector("#map");
const site = sites[document.body.dataset.site];
const { L } = window;

if (L) {
  const map = L.map(container, { scrollWheelZoom: false }).setView(site.location, 10);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
  }).addTo(map);

  const lines = [
    { points: site.meridian, color: "#a82032", name: "Due north / south", weight: 2 },
    { points: site.rays[0], color: "#00695c", name: `${site.limits[0]}°`, weight: 4 },
    { points: site.rays[1], color: "#a34014", name: `${site.limits[1]}°`, weight: 4 },
  ];

  for (const { points, color, name, weight } of lines) {
    L.polyline(points, { color, weight }).addTo(map).bindTooltip(name, { sticky: true });
  }

  const [lat, lon] = site.location;
  L.marker(site.location, { title: site.name, alt: site.name })
    .addTo(map)
    .bindPopup(`${site.name}<br>Latitude ${lat.toFixed(4)}°, longitude ${lon.toFixed(4)}°`);

  const legend = L.control({ position: "bottomleft" });
  legend.onAdd = () => {
    const list = L.DomUtil.create("ul", "launch-legend");
    list.setAttribute("aria-label", "Azimuth lines");
    for (const { color, name } of lines) {
      const entry = document.createElement("li");
      const swatch = document.createElement("span");
      swatch.style.backgroundColor = color;
      swatch.setAttribute("aria-hidden", "true");
      entry.append(swatch, name);
      list.append(entry);
    }
    return list;
  };
  legend.addTo(map);
} else {
  container.textContent = "The interactive map could not be loaded.";
}
