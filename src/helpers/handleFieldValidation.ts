import { askQuestionSchema } from "@/schemas/ask-question.schema";
import type { SerializedEditorState } from "lexical";

export function validateField<
  T extends {
    title: string;
    description: SerializedEditorState;
    category_id?: number | string;
  }
>(fields: T) {
  const result = askQuestionSchema.safeParse(fields);
  if (result.success) return {};
  const errors: Record<string, string> = {};
  for (const e of result.error.issues) {
    const key = e.path[0];
    if (key === "category_id") errors.category = e.message;
    else if (typeof key === "string") errors[key] = e.message;
  }
  return errors;
}
