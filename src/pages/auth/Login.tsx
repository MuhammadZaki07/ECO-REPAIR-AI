import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState, type JSX, type SVGProps } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/authSchemas";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase/client";
import { AuthService } from "@/services/auth/AuthService";
import type { LoginForm } from "@/types/auth";

const GoogleIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z" />
  </svg>
);

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    clearErrors,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onChange", // error hilang otomatis saat user isi input
  });

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const onSubmit = async (data: LoginForm) => {
    try {
      await AuthService.login({
        email: data.email,
        password: data.password,
      });

      toast({
        title: "Login Success",
        description: `Welcome back, ${data.email}`,
      });

      reset();
    } catch (err) {
      toast({
        title: "Login Failed",
        description: "Email or password is incorrect",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="mx-auto w-full max-w-xs space-y-6">
        <div className="space-y-2 text-center">
          <Logo className="mx-auto h-16 w-16" />
          <h1 className="text-3xl font-semibold">Welcome back</h1>
          <p className="text-muted-foreground">
            Sign in to access to your dashboard, settings and projects.
          </p>
        </div>

        <div className="space-y-5">
          <Button
            variant="outline"
            className="w-full justify-center gap-2 cursor-pointer"
            onClick={() =>
              supabase.auth.signInWithOAuth({ provider: "google" })
            }
          >
            <GoogleIcon className="h-4 w-4" />
            Sign in with Google
          </Button>

          <div className="flex items-center gap-2">
            <Separator className="flex-1" />
            <span className="text-sm text-muted-foreground">
              or sign in with email
            </span>
            <Separator className="flex-1" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* EMAIL */}
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-2.5">
                <Input
                  id="email"
                  className={`peer ps-9 ${
                    errors.email ? "border-destructive" : ""
                  }`}
                  placeholder="ephraim@blocks.so"
                  type="email"
                  {...register("email")}
                  onChange={(e) => {
                    register("email").onChange(e);
                    clearErrors("email");
                  }}
                />
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-muted-foreground/80">
                  <Mail size={16} aria-hidden="true" />
                </div>
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="text-sm dark:text-primary text-black hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              <div className="relative mt-2.5">
                <Input
                  id="password"
                  className={`ps-9 pe-9 ${
                    errors.password ? "border-destructive" : ""
                  }`}
                  placeholder="Enter your password"
                  type={isVisible ? "text" : "password"}
                  {...register("password")}
                  onChange={(e) => {
                    register("password").onChange(e);
                    clearErrors("password");
                  }}
                />

                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-muted-foreground/80">
                  <Lock size={16} aria-hidden="true" />
                </div>

                <button
                  className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 hover:text-foreground transition"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label={isVisible ? "Hide password" : "Show password"}
                >
                  {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full text-black cursor-pointer dark:hover:text-white"
              disabled={isSubmitting}
            >
              Sign in
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="text-center text-sm">
            No account?{" "}
            <Link
              to="/auth/register"
              className="dark:text-primary font-medium hover:underline"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
