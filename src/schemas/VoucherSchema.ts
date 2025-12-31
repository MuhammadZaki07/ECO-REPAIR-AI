import { z } from "zod";

export const VoucherSchema = z.object({
  title: z.string().min(3, "Title minimum 3 characters"),
  eco_coin_cost: z.number().min(0, "Cost must be 0 or more").optional(),
  provider: z.string().optional(),
  active: z.boolean().optional(),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
});

export type VoucherInput = z.infer<typeof VoucherSchema>;
