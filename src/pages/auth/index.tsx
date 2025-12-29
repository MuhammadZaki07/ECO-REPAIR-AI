import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Loader, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailOnlySchema } from "@/schemas/authSchemas";
import { Trans, useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { useAuth } from "@/hooks/useAuth";

export default function AuthPage() {
  const { t } = useTranslation("auth");
  const { toast } = useToast();
  const { signInWithEmail, signInWithGoogle, loading } = useAuth();

  const location = useLocation();
  const from = location.state?.from?.pathname;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(emailOnlySchema),
    mode: "onChange",
  });

  const onSubmit = async (data: { email: string }) => {
    try {
      await signInWithEmail(data.email);
      toast({
        title: t("checkEmailTitle"),
        description: t("checkEmailDesc"),
      });
    } catch {
      toast({
        title: t("loginFailedTitle"),
        description: t("loginFailedDesc"),
        variant: "destructive",
      });
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithGoogle(from);
    } catch {
      toast({
        title: t("loginFailedTitle"),
        variant: "destructive",
      });
    }
  };

  const words = t("welcomeEffectText");
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center p-8">
        <div className="mx-auto w-full max-w-xs space-y-6">
          <div className="space-y-2 text-center">
            <Logo className="mx-auto h-16 w-16 mb-10" />
            <h1 className="text-3xl font-semibold">{t("title")}</h1>
            <p className="text-muted-foreground">{t("subtitle")}</p>
          </div>

          <div className="space-y-5">
            <Button
              variant="outline"
              className="w-full justify-center gap-2 disabled:hover:cursor-progress"
              disabled={loading}
              onClick={handleGoogle}
            >
              {loading ? (
                <Loader className="animate-spin h-4 w-4" />
              ) : (
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                >
                  <path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z" />
                </svg>
              )}
              {t("googleButton")}
            </Button>

            <div className="flex items-center gap-2">
              <Separator className="flex-1" />
              <span className="text-sm text-muted-foreground">
                {t("orText")}
              </span>
              <Separator className="flex-1" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <div className="relative mt-2.5">
                  <Input
                    id="email"
                    placeholder={t("emailPlaceholder")}
                    type="email"
                    className={`ps-9 ${errors.email ? "border-red-500" : ""}`}
                    {...register("email")}
                  />
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-muted-foreground/80">
                    <Mail size={16} />
                  </div>
                </div>

                {errors.email && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center gap-2"
              >
                {isSubmitting ? (
                  <Loader className="animate-spin text-primary" size={16} />
                ) : (
                  t("submitButton")
                )}
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground mt-4">
              <Trans
                i18nKey="acknowledgePrivacy"
                ns="auth"
                components={{
                  link: (
                    <Link
                      to="/privacy"
                      className="underline text-blue-600 hover:text-blue-800"
                    />
                  ),
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-start justify-center dark:bg-neutral-950 bg-neutral-50">
        <div className="flex flex-col justify-between p-10 h-[500px]">
          <div>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-3xl font-bold">{t("welcomeTitle")}</h2>
              <Link to={"/"}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-white"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
              </Link>
            </div>

            <p className="mt-2 text-muted-foreground max-w-sm">
              {t("welcomeDesc")}
            </p>
          </div>

          <div className="self-center mt-4">
            <div className="flex gap-2 items-center">
              <div className="bg-red-500 rounded-full w-5 h-5" />
              <div className="bg-yellow-500 rounded-full w-5 h-5" />
              <div className="bg-green-500 rounded-full w-5 h-5" />
            </div>
            <TextGenerateEffect words={words} />
          </div>
        </div>
      </div>
    </div>
  );
}
