import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import path from "node:path";

export const htmlFigureDirective = {
  name: "html-figure",
  doc: "Publish a local HTML figure and its sibling assets at their source-relative URLs.",
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
    if (relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative) || !/\.html?$/i.test(source)) {
      file.fail("html-figure requires an HTML file inside the project.", data.node);
    }
    if (!existsSync(source)) file.fail(`HTML figure not found: ${data.arg}`, data.node);
    // MyST publishes static directories by basename. Stage a `chapters` tree
    // to retain document-relative URLs without publishing chapter source text.
    const destination = path.join(root, "_build", "html-figures", path.dirname(relative));
    mkdirSync(destination, { recursive: true });
    for (const entry of readdirSync(path.dirname(source), { withFileTypes: true })) {
      if (entry.isFile() && /\.(html?|svg|js|css|json|png|webp|jpe?g)$/i.test(entry.name)) {
        copyFileSync(path.join(path.dirname(source), entry.name), path.join(destination, entry.name));
      }
    }
    const iframe = {
      type: "iframe",
      // Page routes may end in a slash, so document-relative URLs are ambiguous.
      // Keep the published chapter tree and any deployment prefix explicit.
      src: `${(process.env.BASE_URL ?? "").replace(/\/$/, "")}/${relative.split(path.sep).map(encodeURIComponent).join("/")}`,
      title: data.options.title,
      width: data.options.width ?? "100%",
    };
    if (data.options.placeholder) {
      iframe.children = [{ type: "image", placeholder: true, url: data.options.placeholder, alt: data.options.title }];
    }
    const label = data.options.label;
    return [{
      type: "container", kind: "figure",
      ...(label ? { label, identifier: label.toLowerCase() } : {}),
      children: [iframe, ...(data.body?.length ? [{ type: "caption", children: data.body }] : [])],
    }];
  },
};

export default { name: "Local HTML figures", directives: [htmlFigureDirective] };
