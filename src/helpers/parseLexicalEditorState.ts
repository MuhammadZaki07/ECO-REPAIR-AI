import type { SerializedEditorState } from "lexical";

export const parseLexicalEditorState = (
  value: SerializedEditorState | string | null | undefined,
  fallback: SerializedEditorState
): SerializedEditorState => {
  if (!value) return fallback;

  if (typeof value === "string") {
    try {
      return JSON.parse(value) as SerializedEditorState;
    } catch {
      return fallback;
    }
  }

  return value;
};
