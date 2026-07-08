// html-transform.mjs
import { visit } from "unist-util-visit";
import { fromHtml } from "hast-util-from-html";
// import { toMdast } from "hast-util-to-mdast";

// function inlineHtmlTransformPlugin() {
//   return (tree) => {
//     visit(tree, "inlineExpression", (node, index, parent) => {
//       const htmlContent = node.result?.data?.["text/html"];
//       if (!htmlContent) return;

//       const hastTree = fromHtml(htmlContent, { fragment: true });
//       console.log(`hastTree ${JSON.stringify(hastTree)}`);
//       const mdastTree = toMdast(hastTree, {
//         handlers: {
//           sup(state, node) {
//             return { type: "superscript", children: state.all(node) };
//           },
//           sub(state, node) {
//             return { type: "subscript", children: state.all(node) };
//           },
//         },
//         document: { phrasing: ["superscript", "subscript"] },
//       });
//       console.log(`mdastTree ${JSON.stringify(mdastTree)}`);

//       if (parent && typeof index === "number") {
//         const newNodes = mdastTree.children.flatMap((child) => {
//           if (child.type === "paragraph") {
//             return child.children;
//           }
//           return child;
//         });
//         parent.children.splice(index, 1, ...newNodes);
//         return index + newNodes.length;
//       }
//     });
//   };
// }
// 1. A clean, custom mapper to convert HAST directly to MyST
function parseInlineHtml(hastNode) {
  // Handle the root node returned by fromHtml
  if (hastNode.type === "root") {
    return (hastNode.children || []).flatMap(parseInlineHtml);
  }

  // Base case: Return text nodes exactly as they are (preserves spaces!)
  if (hastNode.type === "text") {
    return [{ type: "text", value: hastNode.value }];
  }

  if (hastNode.type === "element") {
    // Recursively process any children
    const children = (hastNode.children || []).flatMap(parseInlineHtml);

    // Map your specific tags to MyST equivalents
    switch (hastNode.tagName) {
      case "sup":
        return [{ type: "superscript", children }];
      case "sub":
        return [{ type: "subscript", children }];
      // If it's an unrecognized tag (like a <span> or <div>),
      // just unwrap it and return its children transparently.
      default:
        return children;
    }
  }
  return [];
}

export function inlineHtmlTransformPlugin() {
  return (tree) => {
    visit(tree, "inlineExpression", (node, index, parent) => {
      const data = node.result?.data;
      const htmlContent = data?.["text/html"] || data?.["text/plain"];
      if (!htmlContent) return;
      // 2. Parse HTML string to HAST
      const hastTree = fromHtml(
        htmlContent.replace(/^(')/, "").replace(/(')$/, ""),
        {
          fragment: true,
        },
      );

      // 3. Map directly to MyST nodes using our custom function
      const newNodes = parseInlineHtml(hastTree);

      // 4. Splice into the AST
      if (parent && typeof index === "number") {
        parent.children.splice(index, 1, ...newNodes);
        return index + newNodes.length;
      }
    });
  };
}
// ⬇️ This is the required MyST plugin wrapper ⬇️
export const plugin = {
  name: "Inline HTML Transformer",
  transforms: [
    {
      name: "inline-expression-html-parser",
      stage: "document", // Tells MyST to run this on individual documents
      plugin: inlineHtmlTransformPlugin,
    },
  ],
};
