import type { Session, User } from "@supabase/supabase-js";
import type { ReactNode } from "react";

export interface UserData {
  id: string;
  full_name?: string;
  avatar_url?: string;
  role?: string;
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  userData: UserData | null;
  loading: boolean;
}

export interface AuthProviderProps {
  children: ReactNode;
}
