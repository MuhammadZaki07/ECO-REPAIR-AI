import type { loginSchema } from "@/schemas/authSchemas";
import type { Session, User } from "@supabase/supabase-js";
import { z } from "zod";

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export type LoginForm = z.infer<typeof loginSchema>;

export interface RegisterForm {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  terms: boolean;
}


export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User | null;
  session: Session | null;
}
