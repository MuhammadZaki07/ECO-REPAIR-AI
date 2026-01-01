import { z } from "zod";

export const MerchandiseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  stock: z.number().min(0, "Stock cannot be less than 0"),
  cost_eco_coin: z.number().min(0, "cost cannot be less than 0"),
  is_active: z.boolean().optional(),
  image_file: z
    .any()
    .optional()
    .nullable()
    .refine((file) => !file || file instanceof File, "File must be valid"),
});

export type MerchandiseInput = z.infer<typeof MerchandiseSchema>;
