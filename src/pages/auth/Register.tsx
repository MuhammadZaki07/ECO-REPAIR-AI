import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { AuthService } from "@/services/auth/AuthService";
import { registerSchema } from "@/schemas/authSchemas";
import { useToast } from "@/hooks/use-toast";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    terms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async () => {
    setErrors({});

    const result = registerSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      await AuthService.register({
        email: form.email,
        password: form.password,
        username: form.username,
        firstName: form.firstName,
        lastName: form.lastName,
      });

      toast({
        title: "Register Success",
        description: "Account created successfully!",
      });
    } catch (err: any) {
      toast({
        title: "Register Failed",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md mb-20">
        <CardHeader className="flex flex-col items-center space-y-1.5 pb-4 pt-6">
          <Logo className="w-12 h-12" />
          <div className="space-y-0.5 flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-foreground">
              Create an account
            </h2>
            <p className="text-muted-foreground">
              Welcome! Create an account to get started.
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 px-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                value={form.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                className={
                  errors.firstName
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                value={form.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                className={
                  errors.lastName
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={form.username}
              onChange={(e) => updateField("username", e.target.value)}
              className={
                errors.username
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={
                errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
              }
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                className={`pr-10 ${
                  errors.password
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={form.terms}
              onCheckedChange={(val) => updateField("terms", Boolean(val))}
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground">
              I agree to the{" "}
              <Link to="#" className="dark:text-primary hover:underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="#" className="dark:text-primary hover:underline">
                Conditions
              </Link>
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-sm">{errors.terms}</p>
          )}

          {/* SUBMIT */}
          <Button
            className="w-full bg-primary text-black dark:hover:text-white cursor-pointer"
            onClick={handleSubmit}
          >
            Create free account
          </Button>
        </CardContent>

        <CardFooter className="flex justify-center !py-4">
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="dark:text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </div>
    </div>
  );
}
