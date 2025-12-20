import type { SerializedEditorState } from "lexical"

export const isEditorEmpty = (state: SerializedEditorState) => {
  const root = state?.root
  if (!root || !root.children?.length) return true

  return root.children.every((node: any) =>
    node.children?.every((child: any) => {
      if (child.type !== "text") return true
      return child.text.trim() === ""
    })
  )
}