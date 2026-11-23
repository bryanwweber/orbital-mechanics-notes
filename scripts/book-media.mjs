import { open, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fromHtml } from "hast-util-from-html";
import { visit } from "unist-util-visit";

const buildRoot = process.argv[2] ?? "_build";
const htmlRoot = path.join(buildRoot, "html");
const baseUrl = (process.env.BASE_URL ?? "").replace(/\/$/, "");
const project = JSON.parse(await readFile(path.join(buildRoot, "site/config.json"), "utf8")).projects[0];
const pngSizes = new Map();

function readPngSize(filename) {
  if (!pngSizes.has(filename)) {
    const dimensions = (async () => {
      const file = await open(path.join(htmlRoot, "_public", filename), "r");
      try {
        const { buffer, bytesRead } = await file.read({ buffer: Buffer.alloc(24) });
        if (bytesRead === 24 && buffer.readUInt32BE(0) === 0x89504e47 &&
            buffer.toString("ascii", 12, 16) === "IHDR") {
          return [buffer.readUInt32BE(16), buffer.readUInt32BE(20)];
        }
      } finally {
        await file.close();
      }
    })();
    pngSizes.set(filename, dimensions);
  }
  return pngSizes.get(filename);
}

async function imageAttributes(properties) {
  const attributes = {};
  const src = properties.src ?? "";
  if (!src.startsWith(`${baseUrl}/_public/`)) return attributes;

  const filename = src.slice(`${baseUrl}/_public/`.length);
  const trajectory = /^(?:jwst|wmap)-trajectory-[a-f0-9]+\.webp$/.test(filename);
  if (trajectory && properties.loading === undefined) attributes.loading = "lazy";
  if (properties.width !== undefined || properties.height !== undefined) return attributes;

  const dimensions = trajectory ? [560, 420]
    : /^[a-zA-Z0-9_.-]+\.png$/.test(filename) ? await readPngSize(filename) : undefined;
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
  const additions = [];
  visit(fromHtml(html), "element", (node) => {
    const { tagName, properties } = node;
    if (tagName === "iframe" && properties.loading === undefined &&
        properties.src?.startsWith(`${baseUrl}/chapters/`)) {
      additions.push(node);
    } else if (tagName === "img") {
      additions.push(node);
    }
  });

  // Insert only attributes so the theme's HTML and hydration scripts are kept verbatim.
  let updated = html;
  additions.sort((a, b) => b.position.start.offset - a.position.start.offset);
  for (const node of additions) {
    const attributes = node.tagName === "iframe" ? { loading: "lazy" } : await imageAttributes(node.properties);
    const text = Object.entries(attributes).map(([name, value]) => ` ${name}="${value}"`).join("");
    if (!text) continue;
    const offset = node.position.start.offset + node.tagName.length + 1;
    updated = updated.slice(0, offset) + text + updated.slice(offset);
  }
  if (updated !== html) await writeFile(filename, updated);
}
