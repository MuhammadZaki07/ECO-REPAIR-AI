import { supabase } from "@/lib/supabase/client";

const redirectUrl = `${window.location.origin}/auth/callback`;

export class AuthService {
  static async signInWithEmail(email: string) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectUrl },
    });

    if (error) throw error;
    return data;
  }

  static async signInWithGoogle(from?: string) {
    const redirect = from ? `${redirectUrl}?from=${from}` : redirectUrl;

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: redirect },
    });

    if (error) throw error;
    return data;
  }

  static async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  }

  static async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
}
