import type { LexicalNode } from "@/types/LexicalEditor";
import type { SerializedEditorState } from "lexical";

export function lexicalToHtml(
  content: SerializedEditorState | string
): string {
  let editorState: SerializedEditorState;

  if (typeof content === "string") {
    try {
      editorState = JSON.parse(content);
    } catch {
      return "";
    }
  } else {
    editorState = content;
  }

  if (!editorState?.root?.children) return "";

  const traverse = (node: LexicalNode): string => {
    switch (node.type) {
      case "root":
        return node.children?.map(traverse).join("") ?? "";

      case "paragraph":
        return `<p class="leading-7 [&:not(:first-child)]:mt-6">${node.children?.map(traverse).join("") ?? ""}</p>`;

      case "heading": {
        const tag = node.tag ?? "h1";
        const cls =
          tag === "h1"
            ? "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance"
            : tag === "h2"
            ? "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0"
            : "scroll-m-20 text-2xl font-semibold tracking-tight";
        return `<${tag} class="${cls}">${node.children?.map(traverse).join("") ?? ""}</${tag}>`;
      }

      case "quote":
        return `<blockquote class="mt-6 border-l-2 pl-6 italic">
          ${node.children?.map(traverse).join("") ?? ""}
        </blockquote>`;

      case "list": {
        const tag = node.listType === "number" ? "ol" : "ul";
        const cls =
          node.listType === "number"
            ? "my-6 ml-6 list-disc [&>li]:mt-2"
            : "my-6 ml-6 list-disc [&>li]:mt-2";
        return `<${tag} class="${cls}">${node.children?.map(traverse).join("") ?? ""}</${tag}>`;
      }

      case "listitem": {
        if (node.checked !== undefined) {
          return `<li class="flex items-start gap-2 my-1">
            <input type="checkbox" disabled ${node.checked ? "checked" : ""} class="mt-1" />
            <span>${node.children?.map(traverse).join("") ?? ""}</span>
          </li>`;
        }
        return `<li class="my-1">${node.children?.map(traverse).join("") ?? ""}</li>`;
      }

      case "link":
        return `<a href="${node.url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-800">
          ${node.children?.map(traverse).join("") ?? ""}
        </a>`;

      case "text": {
        let text = node.text ?? "";
        if (node.format) {
          if (node.format & 1) text = `<strong class="font-semibold">${text}</strong>`;
          if (node.format & 2) text = `<em class="italic">${text}</em>`;
          if (node.format & 4) text = `<u class="underline">${text}</u>`;
        }
        return text;
      }

      default:
        return node.children?.map(traverse).join("") ?? "";
    }
  };

  return traverse(editorState.root as LexicalNode);
}
