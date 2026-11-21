import { fromHtml } from "hast-util-from-html";
import { visit } from "unist-util-visit";

// MathML Core supports mathvariant="normal" only. Use the equivalent Unicode
// mathematical alphanumeric symbols for the token styles emitted in this book:
// https://www.w3.org/TR/mathml-core/#mathematical-alphanumeric-symbols
const latinUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const latinLower = "abcdefghijklmnopqrstuvwxyz";
const greekUpper = "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡϴΣΤΥΦΧΨΩ∇";
const greekLower = "αβγδεζηθικλμνξοπρςστυφχψω∂ϵϑϰϕϱϖ";
const digits = "0123456789";
const variants = new Map();
for (const [variant, ranges] of [
	[
		"bold-italic",
		[
			[latinUpper, 0x1d468],
			[latinLower, 0x1d482],
			[greekUpper, 0x1d71c],
			[greekLower, 0x1d736],
		],
	],
	[
		"bold",
		[
			[latinUpper, 0x1d400],
			[latinLower, 0x1d41a],
			[greekUpper, 0x1d6a8],
			[greekLower, 0x1d6c2],
			[digits, 0x1d7ce],
		],
	],
	[
		"sans-serif",
		[
			[latinUpper, 0x1d5a0],
			[latinLower, 0x1d5ba],
			[digits, 0x1d7e2],
		],
	],
]) {
	const map = new Map();
	for (const [alphabet, start] of ranges) {
		for (const [index, letter] of [...alphabet].entries()) {
			map.set(letter, String.fromCodePoint(start + index));
		}
	}
	variants.set(variant, map);
}

export function normalizeMathml(html) {
	if (!/mathvariant="(?:bold-italic|bold|sans-serif)"/.test(html)) return html;
	// Leave KaTeX's visual HTML and original TeX annotation byte-for-byte intact.
	return html.replace(/<math\b[^>]*>[\s\S]*?<\/math>/g, (math) =>
		math.replace(
			/<mi\b([^>]*?)\s+mathvariant="(bold-italic|bold|sans-serif)"([^>]*)>([^<]*)<\/mi>/g,
			(token, before, variant, after, body) => {
				const text = fromHtml(body, { fragment: true })
					.children.map((node) => node.value ?? "")
					.join("");
				// Unicode has no mathematical bold dotless i/j. Preserve their spelling
				// and upright bold style with Core's normal hint and explicit CSS.
				if (variant === "bold" && (text === "ı" || text === "ȷ")) {
					let attributes = `${before}${after}`;
					if (/\bstyle="/.test(attributes))
						attributes = attributes.replace(
							/style="/,
							'style="font-weight:bold;',
						);
					else attributes += ' style="font-weight:bold"';
					return `<mi mathvariant="normal"${attributes}>${body}</mi>`;
				}
				const letters = [...text];
				const map = variants.get(variant);
				// Keep unsupported or mixed tokens explicitly styled rather than
				// silently dropping their mathematical meaning.
				if (!letters.length || letters.some((letter) => !map.has(letter)))
					return token;
				return `<mi${before}${after}>${letters.map((letter) => map.get(letter)).join("")}</mi>`;
			},
		),
	);
}

export function mathmlCoreTransformPlugin() {
	return (tree) => {
		visit(
			tree,
			(node) => node.type === "math" || node.type === "inlineMath",
			(node) => {
				if (typeof node.html === "string")
					node.html = normalizeMathml(node.html);
			},
		);
	};
}

export const plugin = {
	name: "MathML Core identifiers",
	transforms: [
		{
			name: "mathml-core-identifiers",
			stage: "document", // MyST runs this after rendering equations with KaTeX.
			plugin: mathmlCoreTransformPlugin,
		},
	],
};
