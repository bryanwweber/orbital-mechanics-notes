import assert from "node:assert/strict";
import test from "node:test";
import { mathmlCoreTransformPlugin, normalizeMathml } from "./mathmlCore.mjs";

const math = (body) =>
	`<math xmlns="http://www.w3.org/1998/Math/MathML"><semantics>${body}<annotation encoding="application/x-tex">\\vector{r}</annotation></semantics></math>`;
const token = (text) => `<mi mathvariant="bold-italic">${text}</mi>`;

test("encodes vector identifiers while preserving visible HTML and TeX annotation", () => {
	const visible =
		'<span class="katex-html" aria-hidden="true"><span class="boldsymbol">r</span></span>';
	const input = `<span class="katex">${math(`<msub>${token("r")}<mn>1</mn></msub>`)}${visible}</span>`;
	const expected = input.replace(token("r"), "<mi>𝒓</mi>");
	assert.equal(normalizeMathml(input), expected);
	assert.equal(normalizeMathml(expected), expected);
});

test("handles Latin letters, Greek letters, and Greek variant symbols", () => {
	const cases = [
		["Az", "𝑨𝒛"],
		["ωσψρα", "𝝎𝝈𝝍𝝆𝜶"],
		["ϑϕϖϱϰϵ", "𝝑𝝓𝝕𝝔𝝒𝝐"],
		["∂∇ϴς", "𝝏𝜵𝜭𝝇"],
	];
	for (const [input, output] of cases) {
		assert.equal(
			normalizeMathml(math(token(input))),
			math(`<mi>${output}</mi>`),
		);
	}
});

test("normalizes the other deprecated styles used by the book", () => {
	const input = math(
		'<mi mathvariant="bold">ΩQ∇0</mi><mi mathvariant="sans-serif">R</mi>',
	);
	assert.equal(normalizeMathml(input), math("<mi>𝛀𝐐𝛁𝟎</mi><mi>𝖱</mi>"));
});

test("keeps bold dotless unit vectors upright and explicitly bold", () => {
	const input = math(
		'<mi mathvariant="bold">ı</mi><mi mathvariant="bold" style="color:red">ȷ</mi>',
	);
	assert.equal(
		normalizeMathml(input),
		math(
			'<mi mathvariant="normal" style="font-weight:bold">ı</mi><mi mathvariant="normal" style="font-weight:bold;color:red">ȷ</mi>',
		),
	);
});

test("decodes numeric/entity references and preserves other attributes", () => {
	const input = math(
		'<mi id="omega" mathvariant="bold-italic" class="vector">&#x3c9;</mi>',
	);
	assert.equal(
		normalizeMathml(input),
		math('<mi id="omega" class="vector">𝝎</mi>'),
	);
});

test("preserves explicitly normal and unsupported or mixed identifiers", () => {
	const input = math(
		`<mi mathvariant="normal">R</mi>${token("r+")}${token("ø")}${token("")}${token("12")}`,
	);
	assert.equal(normalizeMathml(input), input);
	assert.equal(normalizeMathml(token("r")), token("r"));
});

test("normalizes generated block and inline math without changing other AST nodes", () => {
	const tree = {
		type: "root",
		children: [
			{ type: "math", value: "r_1", html: math(token("r")) },
			{ type: "inlineMath", value: "ω", html: math(token("ω")) },
			{ type: "math", value: "unrendered" },
			{ type: "code", html: math(token("r")) },
		],
	};
	mathmlCoreTransformPlugin()(tree);
	assert.equal(tree.children[0].html, math("<mi>𝒓</mi>"));
	assert.equal(tree.children[1].html, math("<mi>𝝎</mi>"));
	assert.equal(tree.children[0].value, "r_1");
	assert.equal(tree.children[3].html, math(token("r")));
});
