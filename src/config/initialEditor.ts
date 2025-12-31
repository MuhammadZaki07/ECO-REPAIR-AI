import type { SerializedEditorState } from "lexical";

export const initialEditorState = {
  root: {
    children: [
      {
        children: [
          {
            text: "",
            type: "text",
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            version: 1,
          },
        ],
        direction: "ltr",
        type: "paragraph",
        format: "",
        indent: 0,
        version: 1,
      },
    ],
    direction: "ltr",
    type: "root",
    format: "",
    indent: 0,
    version: 1,
  },
} as unknown as SerializedEditorState;
