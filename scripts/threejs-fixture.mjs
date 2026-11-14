import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { threejsDirective } from "../plugins/render3js.mjs";

// Exercise the real animation entry points without adding a test page to the book.
export async function startThreejsFixture() {
  const documentPath = path.resolve("chapters/the-n-body-problem/two-body-inertial-numerical-solution.md");
  const scenes = [
    ["two-body-inertial.html", "Two-body motion in an inertial frame"],
    ["two-body-inertial.html", "Independent two-body animation"],
    ["two-body-inertial.html", "Migrated inertial animation"],
    ["two-body-inertial-cg-relative.html", "Migrated barycenter animation"],
    ["two-body-inertial-m1-relative.html", "Migrated primary-relative animation"],
    ["two-body-relative.html", "Migrated relative animation"],
  ];
  const figures = scenes.map(([filename, title], index) => threejsDirective.run({
    arg: `scripts/${filename}`,
    options: { title, label: `fig:fixture-${index}`, placeholder: "../../assets/threejs-test-placeholder.png" },
    body: [{ type: "paragraph", children: [{ type: "text", value: title }] }],
  }, { path: documentPath, fail(message) { throw new Error(message); } })[0]);
  const route = "/preview/chapters/the-n-body-problem/animations";
  const html = `<!doctype html><html lang="en"><meta charset="utf-8">
    <title>Animation validation</title><link rel="icon" href="data:,">
    <style>body{margin:24px;font-family:sans-serif}figure{margin:24px 0;width:665px;max-width:100%}iframe{display:block;border:0;width:100%;aspect-ratio:5/3}</style>
    <h1>Animation validation</h1>${figures.map((figure) => {
      const iframe = figure.children[0];
      return `<figure><iframe src="${iframe.src}" title="${iframe.title}"></iframe><figcaption>${iframe.title}</figcaption></figure>`;
    }).join("")}</html>`;
  const roots = {
    "/preview/assets/": path.resolve("assets"),
    "/preview/threejs/": path.resolve("_build/threejs"),
  };
  const mime = { ".html": "text/html", ".js": "text/javascript", ".glb": "model/gltf-binary", ".png": "image/png" };
  const server = createServer(async (request, response) => {
    try {
      const pathname = new URL(request.url, "http://localhost").pathname;
      if (pathname === "/favicon.ico") {
        response.statusCode = 204;
        response.end();
        return;
      }
      if (pathname === route) {
        response.setHeader("Content-Type", "text/html");
        response.end(html);
        return;
      }
      const entry = Object.entries(roots).find(([prefix]) => pathname.startsWith(prefix));
      if (!entry) throw new Error("Unknown asset path");
      const [prefix, root] = entry;
      const filename = path.resolve(root, decodeURIComponent(pathname.slice(prefix.length)));
      if (!filename.startsWith(`${root}${path.sep}`)) throw new Error("Invalid asset path");
      response.setHeader("Content-Type", mime[path.extname(filename)] ?? "application/octet-stream");
      response.end(await readFile(filename));
    } catch {
      response.statusCode = 404;
      response.end();
    }
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  return {
    url: `http://127.0.0.1:${server.address().port}${route}`,
    figures,
    close: () => new Promise((resolve) => { server.close(resolve); server.closeAllConnections(); }),
  };
}
