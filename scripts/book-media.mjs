import { open, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fromHtml } from "hast-util-from-html";
import { visit } from "unist-util-visit";

const buildRoot = process.argv[2] ?? "_build";
const htmlRoot = path.join(buildRoot, "html");
const baseUrl = (process.env.BASE_URL ?? "").replace(/\/$/, "");
const project = JSON.parse(await readFile(path.join(buildRoot, "site/config.json"), "utf8")).projects[0];
const imageSizes = new Map();
const deferredFigures = new Set([
  "fig-collinear-lagrange-solution",
  "fig-pseudo-potential-energy-cr3bp",
  "fig-trojan-asteroids-jupiter",
  "fig-wmap-trajectory",
  "fig-jwst-trajectory",
]);

function readImageSize(filename) {
  if (!imageSizes.has(filename)) {
    const dimensions = (async () => {
      const file = await open(path.join(htmlRoot, "_public", filename), "r");
      try {
        if (filename.endsWith(".svg")) {
          const { buffer, bytesRead } = await file.read({ buffer: Buffer.alloc(8192) });
          const start = buffer.toString("utf8", 0, bytesRead).match(/<svg\b[^>]*>/)?.[0];
          if (!start) return undefined;
          const svg = fromHtml(start, { fragment: true }).children[0];
          return ["width", "height"].map((name) => {
            const value = String(svg.properties[name]).match(/^(\d+)(?:px)?$/)?.[1];
            return Number(value);
          });
        }
        const { buffer, bytesRead } = await file.read({ buffer: Buffer.alloc(30) });
        if (bytesRead >= 24 && buffer.readUInt32BE(0) === 0x89504e47 &&
            buffer.toString("ascii", 12, 16) === "IHDR") {
          return [buffer.readUInt32BE(16), buffer.readUInt32BE(20)];
        }
        if (bytesRead === 30 && buffer.toString("ascii", 0, 4) === "RIFF" &&
            buffer.toString("ascii", 8, 16) === "WEBPVP8X") {
          return [buffer.readUIntLE(24, 3) + 1, buffer.readUIntLE(27, 3) + 1];
        }
      } finally {
        await file.close();
      }
    })();
    imageSizes.set(filename, dimensions);
  }
  return imageSizes.get(filename);
}

async function imageAttributes(properties, defer) {
  const attributes = {};
  const src = properties.src ?? "";
  if (!src.startsWith(`${baseUrl}/_public/`)) return attributes;

  const filename = src.slice(`${baseUrl}/_public/`.length);
  if (defer && properties.loading === undefined) attributes.loading = "lazy";
  if (properties.width !== undefined || properties.height !== undefined) return attributes;

  const dimensions = /^[a-zA-Z0-9_.-]+\.(?:png|svg|webp)$/.test(filename)
    ? await readImageSize(filename) : undefined;
  if (dimensions?.every((value) => value > 0)) {
    [attributes.width, attributes.height] = dimensions;
  }
  return attributes;
}

const slugs = [project.index, ...project.pages.flatMap((page) => page.slug ? [page.slug] : [])];
for (const slug of slugs) {
  const route = slug === project.index ? "" : slug.replace(/\.index$/, "").replaceAll(".", "/");
  const filename = path.join(htmlRoot, route, "index.html");
  const html = await readFile(filename, "utf8");
  const tree = fromHtml(html);
  const deferredImages = new Set();
  visit(tree, { tagName: "figure" }, (figure) => {
    if (deferredFigures.has(figure.properties.id)) {
      visit(figure, { tagName: "img" }, ({ properties }) => {
        if (properties.src) deferredImages.add(properties.src);
      });
    }
  });
  const additions = [];
  const edits = [];
  visit(tree, "element", (node) => {
    const { tagName, properties, position } = node;
    if (tagName === "iframe" && properties.loading === undefined &&
        properties.src?.startsWith(`${baseUrl}/chapters/`)) {
      additions.push(node);
    } else if (tagName === "img") {
      additions.push(node);
    } else if (tagName === "link" && properties.as === "image" &&
        properties.rel?.includes("preload") && deferredImages.has(properties.href)) {
      // React preloads images it rendered eagerly. That bypasses native lazy loading.
      edits.push({ start: position.start.offset, end: position.end.offset, text: "" });
    }
  });

  for (const node of additions) {
    const attributes = node.tagName === "iframe"
      ? { loading: "lazy" }
      : await imageAttributes(node.properties, deferredImages.has(node.properties.src));
    const text = Object.entries(attributes).map(([name, value]) => ` ${name}="${value}"`).join("");
    if (!text) continue;
    const offset = node.position.start.offset + node.tagName.length + 1;
    edits.push({ start: offset, end: offset, text });
  }

  // Edit only the relevant tags and keep the hydration scripts verbatim.
  let updated = html;
  for (const { start, end, text } of edits.sort((a, b) => b.start - a.start)) {
    updated = updated.slice(0, start) + text + updated.slice(end);
  }
  if (updated !== html) await writeFile(filename, updated);
}
