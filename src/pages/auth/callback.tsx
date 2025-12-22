import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAuthContext } from "@/hooks/context/AuthContext";

export default function AuthCallback() {
    const { userData } = useAuthContext();
  useEffect(() => {
    supabase.auth.getSession().then(() => {
      window.location.href = `/${userData?.role}/dashboard`;
    });
  }, []);

  return;
}
