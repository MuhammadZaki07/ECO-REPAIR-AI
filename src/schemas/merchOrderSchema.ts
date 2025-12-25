import { z } from "zod";

export const merchOrderSchema = z.object({
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .max(15, "Phone must be at most 15 digits")
    .regex(/^\d+$/, "Phone must be numeric"),
  address: z.string().min(5, "Address is required"),
  note: z.string().max(200, "Note cannot exceed 200 characters").optional(),
});

export type MerchOrderForm = z.infer<typeof merchOrderSchema>;
