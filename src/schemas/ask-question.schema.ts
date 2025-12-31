import { isEditorEmpty } from "@/utils/isEditorEmpty";
import type { SerializedEditorState } from "lexical";
import { z } from "zod";

export const askQuestionSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),

  description: z
    .custom<SerializedEditorState>()
    .refine((val) => !isEditorEmpty(val), {
      message: "Description cannot be empty",
    }),

  category_id: z.number({
    required_error: "Category must be selected",
    invalid_type_error: "Categories must be numbers",
  }),
});

export const editForumSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.any(),
  category_id: z.number().optional(),
});

export type AskQuestionInput = z.infer<typeof askQuestionSchema>;
