import type { SerializedEditorState } from "lexical";

export const parseLexicalEditorState = (
  value: SerializedEditorState | string | null | undefined,
  fallback: SerializedEditorState
): SerializedEditorState => {
  if (!value) return fallback;

  let parsed: SerializedEditorState | null = null;

  if (typeof value === "string") {
    try {
      parsed = JSON.parse(value) as SerializedEditorState;
    } catch {
      return fallback;
    }
  } else {
    parsed = value;
  }

  if (
    !parsed ||
    typeof parsed !== "object" ||
    !("root" in parsed) ||
    !parsed.root ||
    parsed.root.type !== "root" ||
    !Array.isArray(parsed.root.children)
  ) {
    return fallback;
  }

  return parsed;
};
