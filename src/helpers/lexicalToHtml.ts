import type { SerializedEditorState } from "lexical";

type LexicalNode = {
  type: string;
  children?: LexicalNode[];
  text?: string;
  detail?: number;
  format?: number;
  style?: string;
  url?: string;
};

/**
 * Convert SerializedEditorState atau JSON string ke HTML.
 * Bisa handle paragraph, heading, link, bold/italic/underline.
 */
export function lexicalToHtml(content: SerializedEditorState | string): string {
  let editorState: SerializedEditorState;

  // Jika content string, parse dulu
  if (typeof content === "string") {
    try {
      editorState = JSON.parse(content);
    } catch {
      return ""; // kembalikan kosong kalau JSON invalid
    }
  } else {
    editorState = content;
  }

  if (!editorState?.root?.children) return "";

  const traverse = (node: LexicalNode): string => {
    switch (node.type) {
      case "root":
        return node.children?.map(traverse).join("") ?? "";
      case "paragraph": {
        const paragraphText = node.children?.map(traverse).join("") ?? "";
        return `<p>${paragraphText}</p>`;
      }
      case "heading": {
        const level = Number(node.format) || 1;
        const headingText = node.children?.map(traverse).join("") ?? "";
        return `<h${level}>${headingText}</h${level}>`;
      }
      case "link": {
        const url = node.url ?? "#";
        const linkText = node.children?.map(traverse).join("") ?? "";
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
      }
      case "text": {
        let text = node.text ?? "";
        if (node.style?.includes("bold")) text = `<strong>${text}</strong>`;
        if (node.style?.includes("italic")) text = `<em>${text}</em>`;
        if (node.style?.includes("underline")) text = `<u>${text}</u>`;
        return text;
      }
      default:
        return node.children?.map(traverse).join("") ?? "";
    }
  };

  return traverse(editorState.root as unknown as LexicalNode);
}
