import type { Session, User } from "@supabase/supabase-js";
import type { ReactNode } from "react";

export interface UserData {
  id: string;
  auth_id?:string;
  username?: string;
  avatar_url?: string;
  role?: string;
  bio?:string;
  location?:string;
  is_blocked?:boolean | string;
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  userData: UserData | null;
  loading: boolean;
  clearUser: () => void
  updateUserData: any
}

export interface AuthProviderProps {
  children: ReactNode;
}
