import * as z from "zod";

export const donationCampaignSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),

  goal_eco_coin: z
    .number({ invalid_type_error: "Goal Eco Coin must be a number" })
    .int("Goal Eco Coin must be an integer")
    .min(1, "Goal Eco Coin must be at least 1"),

  image_file: z
    .any()
    .optional()
    .refine((file) => !file || file instanceof File, "Invalid file")
    .refine(
      (file) => !file || file.size <= 2_000_000,
      "Image must be less than 2MB"
    ),
});
