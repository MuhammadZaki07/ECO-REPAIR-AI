import { supabase } from "@/lib/supabase/client";

export interface AuthCredentials {
  email: string;
  password: string;
}

export class AuthService {
  // REGISTER
  static async register({ email, password }: AuthCredentials) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:5173/auth/login",
      },
    });

    if (error) throw new Error(error.message);
    return data;
  }

  // LOGIN
  static async login({ email, password }: AuthCredentials) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    return data;
  }

  // LOGOUT
  static async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }

  // LOGIN WITH GOOGLE
  static async loginWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/auth/login",
      },
    });

    if (error) throw new Error(error.message);
    return data;
  }

  // GET CURRENT SESSION
  static async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw new Error(error.message);
    return data.session;
  }
}
