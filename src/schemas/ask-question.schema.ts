import { isEditorEmpty } from "@/utils/isEditorEmpty";
import type { SerializedEditorState } from "lexical";
import { z } from "zod";

export const askQuestionSchema = z.object({
  title: z.string().min(5, "Judul minimal 5 karakter"),

  description: z
    .custom<SerializedEditorState>()
    .refine((val) => !isEditorEmpty(val), {
      message: "Deskripsi tidak boleh kosong",
    }),

  category_id: z.number({
    required_error: "Kategori wajib dipilih",
    invalid_type_error: "Kategori harus berupa angka",
  }),
});

export const editForumSchema = z.object({
  title: z.string().min(5, "Judul minimal 5 karakter"),
  description: z.any(),
  category_id: z.number().optional(),
});

export type AskQuestionInput = z.infer<typeof askQuestionSchema>;
