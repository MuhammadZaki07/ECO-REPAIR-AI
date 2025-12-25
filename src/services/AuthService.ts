import { supabase } from "@/lib/supabase/client";

export class AuthService {
  static async signInWithEmail(email: string) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "http://localhost:5173/auth/callback",
      },
    });

    if (error) throw new Error(error.message);
    return data;
  }

  static async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/auth/callback",
      },
    });

    if (error) throw new Error(error.message);
    return data;
  }

  static async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw new Error(error.message);
    return data.session;
  }

  static async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }
}
