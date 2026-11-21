import assert from "node:assert/strict";
import { mkdir, readFile } from "node:fs/promises";
import { chromium, firefox } from "@playwright/test";
import { normalizeMathml } from "../plugins/mathmlCore.mjs";

const base = process.env.BOOK_URL ?? "http://localhost:3000";
const originalEquation = await readFile(
	new URL("./fixtures/mathml-vector-equation.html", import.meta.url),
	"utf8",
);
const output = "_build/browser/mathml-core";
const routes = [
	"/the-n-body-problem/lagrange-points",
	"/the-n-body-problem/two-body-inertial-numerical-solution",
	"/classical-orbital-elements/classical-orbital-elements",
	"/constants-of-orbital-motion/angular-momentum-is-conserved",
	"/orbital-maneuvers/hohmann-transfer",
];
await mkdir(output, { recursive: true });
for (const [name, type] of [
	["chrome", chromium],
	["firefox", firefox],
]) {
	const browser = await type.launch({ headless: false });
	try {
		const page = await browser.newPage({
			viewport: { width: 1440, height: 1000 },
		});
		const warnings = [],
			errors = [];
		page.on("console", (message) => {
			if (/mathvariant/.test(message.text())) warnings.push(message.text());
		});
		page.on("pageerror", (error) => errors.push(error.message));
		let comparedEquation = false;
		for (const route of routes) {
			const response = await page.goto(base + route, {
				waitUntil: "networkidle",
			});
			assert.ok(response.ok(), route);
			assert.doesNotMatch(
				await response.text(),
				/mathvariant=["'](?:bold-italic|bold|sans-serif)/,
			);
			await page.evaluate(() => document.fonts.ready);
			assert.equal(
				await page
					.locator('math [mathvariant]:not([mathvariant="normal"])')
					.count(),
				0,
			);
			const identifiers = await page
				.locator("article math mi")
				.allTextContents();
			assert.ok(
				route.endsWith("/hohmann-transfer") ||
					identifiers.some((text) =>
						[...text].some((letter) => {
							const code = letter.codePointAt(0);
							return (
								(code >= 0x1d468 && code <= 0x1d49b) ||
								(code >= 0x1d71c && code <= 0x1d755)
							);
						}),
					),
				`bold-italic mathematical identifiers remain accessible on ${route}`,
			);
			assert.ok(
				await page
					.locator('article annotation[encoding="application/x-tex"]')
					.count(),
			);
			if (!comparedEquation) {
				// The saved pre-fix equation makes Firefox reproduction self-contained;
				// no second development server or old dependency installation is needed.
				const before = await browser.newPage({
					viewport: { width: 1440, height: 1000 },
				});
				await before.goto(base + route, { waitUntil: "networkidle" });
				const deprecation =
					name === "firefox"
						? before.waitForEvent("console", {
								predicate: (message) =>
									/mathvariant.*bold-italic/.test(message.text()),
							})
						: Promise.resolve();
				const insertEquation = (html) => {
					const container = document.createElement("div");
					container.className = "mathml-regression-equation";
					container.style.cssText =
						"position:fixed;left:10px;top:100px;width:1000px;background:white;z-index:9999;font-size:16px";
					container.innerHTML = html;
					// Keep the comparison outside React-managed article children.
					document.body.append(container);
				};
				await before.evaluate(insertEquation, originalEquation);
				await deprecation;
				await page.evaluate(insertEquation, normalizeMathml(originalEquation));
				await before.evaluate(() => document.fonts.ready);
				await page.evaluate(() => document.fonts.ready);
				const oldEquation = before.locator(
					".mathml-regression-equation .katex-html",
				);
				const newEquation = page.locator(
					".mathml-regression-equation .katex-html",
				);
				assert.equal(
					await oldEquation.innerHTML(),
					await newEquation.innerHTML(),
				);
				const oldPixels = await oldEquation.screenshot({
					path: `${output}/${name}-before.png`,
				});
				const newPixels = await newEquation.screenshot({
					path: `${output}/${name}-after.png`,
				});
				assert.ok(
					oldPixels.equals(newPixels),
					`${name}: visible equation remains pixel-identical`,
				);
				await before.close();
				await page
					.locator(".mathml-regression-equation")
					.evaluate((element) => element.remove());
				comparedEquation = true;
			}
			console.log(
				`${name}: ${route} has Unicode MathML identifiers without deprecated attributes`,
			);
		}
		// Exercise the theme's normal chapter navigation as well as direct SSR loads.
		await page.goto(base + routes[0], { waitUntil: "networkidle" });
		const target = "/the-n-body-problem/two-body-relative-motion";
		await page.locator(`a[href$="${target}"]`).first().click();
		await page.waitForURL(base + target);
		await page.locator("article .katex-html").first().waitFor();
		assert.equal(
			await page
				.locator('math [mathvariant]:not([mathvariant="normal"])')
				.count(),
			0,
		);
		assert.deepEqual(
			warnings,
			[],
			`${name}: no MathML deprecation after direct loads or navigation`,
		);
		assert.deepEqual(errors, [], `${name}: no page errors`);
		console.log(`${name}: chapter navigation passed`);
	} finally {
		await browser.close();
	}
}
