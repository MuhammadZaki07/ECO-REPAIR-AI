import { z } from "zod";
import i18n from "@/i18n";

const t = i18n.getFixedT(null, "auth"); 

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, t("emailRequired"))
    .email(t("invalidEmail")),

  password: z
    .string()
    .min(1, t("passwordRequired")),
});
