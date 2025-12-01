import { supabase } from "@/lib/supabase/client";
import type {
  AuthCredentials,
  AuthResponse,
  RegisterCredentials,
} from "@/types/auth";

export class AuthService {
 static async register({
  email,
  password,
  username,
  firstName,
  lastName,
}: RegisterCredentials) {
  // Sign up user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  const user = data.user;

  if (!user) {
    throw new Error("User registration failed, no user returned from Supabase");
  }

  // Insert user profile ke tabel 'users'
  const { error: insertError } = await supabase
    .from("users")
    .insert({
      auth_id: user.id,
      username,
      first_name: firstName,
      last_name: lastName,
    });

  if (insertError) throw new Error(insertError.message);

  return user;
}


  static async login({
    email,
    password,
  }: AuthCredentials): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    return {
      user: data.user,
      session: data.session,
    };
  }

  static async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }

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

  static async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw new Error(error.message);

    return data.session;
  }
}
