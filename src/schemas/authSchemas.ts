import { z } from "zod";
import i18n from "@/i18n";

const t = i18n.getFixedT(null, "auth");

export const loginSchema = z.object({
  email: z.string().min(1, t("emailRequired")).email(t("invalidEmail")),
  password: z.string().min(1, t("passwordRequired")),
});

export const registerSchema = z.object({
  firstName: z.string().min(1, t("firstNameRequired")),
  lastName: z.string().min(1, t("lastNameRequired")),
  username: z.string().min(3, t("usernameMin")),
  email: z.string().email(t("invalidEmail")),
  password: z.string().min(6, t("passwordMin")),
  terms: z.boolean().refine((v) => v === true, {
    message: t("termsRequired"),
  }),
});
