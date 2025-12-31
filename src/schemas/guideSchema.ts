import { isEditorEmpty } from "@/utils/isEditorEmpty";
import type { SerializedEditorState } from "lexical";
import { z } from "zod";

export const guideSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),

  content: z
    .custom<SerializedEditorState>()
    .refine((val) => !isEditorEmpty(val), {
      message: "Content cannot be empty",
    }),

  category_id: z.number({
    required_error: "Category is required",
    invalid_type_error: "Category must be a number",
  }),

  image_file: z
    .any()
    .refine(
      (file) =>
        !file ||
        (file instanceof File &&
          ["image/png", "image/jpeg", "image/jpg"].includes(file.type)),
      { message: "Only PNG, JPG, or JPEG files are allowed" }
    )
    .optional(),
});

export type GuideInput = z.infer<typeof guideSchema>;
