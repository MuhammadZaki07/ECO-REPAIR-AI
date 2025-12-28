import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { Session, User } from "@supabase/supabase-js";
import type {
  AuthContextType,
  AuthProviderProps,
  UserData,
} from "@/types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      setLoading(false);
    };

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession ?? null);
        setUser(newSession?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setUserData(null);
        return;
      }

      const cacheKey = `userData-${user.id}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        setUserData(JSON.parse(cached));
        return;
      }

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("auth_id", user.id)
        .single();

      if (!error && data) {
        localStorage.setItem(cacheKey, JSON.stringify(data));
        setUserData(data);
      }
    };

    fetchUserData();
  }, [user]);

  const updateUserData = (data: UserData) => {
    setUserData(data);
    if (user) {
      localStorage.setItem(`userData-${user.id}`, JSON.stringify(data));
    }
  };

  const clearUser = () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("userData-")) {
        localStorage.removeItem(key);
      }
    });

    setUser(null);
    setSession(null);
    setUserData(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        userData,
        loading,
        updateUserData,
        clearUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};
