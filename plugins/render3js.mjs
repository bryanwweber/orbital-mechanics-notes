import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

export const threejsDirective = {
  name: "threejs",
  doc: "Publish a local HTML animation and display it as a figure in an iframe.",
  arg: { type: String, required: true, doc: "HTML path relative to this document." },
  options: {
    label: { type: String, alias: ["name"], doc: "Figure cross-reference label." },
    title: { type: String, required: true, doc: "Accessible iframe title." },
    width: { type: String, doc: "Figure width; defaults to 100%." },
    placeholder: { type: String, doc: "Document-relative image for static exports." },
  },
  body: { type: "myst", doc: "Figure caption." },
  run(data, file) {
    const root = process.cwd();
    const source = path.resolve(path.dirname(file.path), data.arg);
    const relative = path.relative(root, source);
    if (relative.startsWith("..") || path.isAbsolute(relative) || !/\.html?$/i.test(source)) {
      file.fail("threejs requires an HTML file inside the project.", data.node);
    }
    if (!existsSync(source)) file.fail(`Three.js HTML file not found: ${data.arg}`, data.node);
    const id = createHash("sha256").update(relative).digest("hex").slice(0, 16);
    const destination = path.join(root, "_build", "threejs");
    mkdirSync(destination, { recursive: true });
    writeFileSync(path.join(destination, `${id}.html`), readFileSync(source));
    const prefix = path.relative(path.dirname(path.resolve(file.path)), root).split(path.sep).join("/");
    const iframe = {
      type: "iframe",
      src: `${prefix ? `${prefix}/` : ""}threejs/${id}.html`,
      title: data.options.title,
      width: data.options.width ?? "100%",
    };
    if (data.options.placeholder) {
      iframe.children = [{ type: "image", placeholder: true, url: data.options.placeholder, alt: data.options.title }];
    }
    const label = data.options.label;
    return [{
      type: "container",
      kind: "figure",
      ...(label ? { label, identifier: label.toLowerCase() } : {}),
      children: [iframe, ...(data.body?.length ? [{ type: "caption", children: data.body }] : [])],
    }];
  },
};

export default { name: "Three.js HTML figures", directives: [threejsDirective] };
