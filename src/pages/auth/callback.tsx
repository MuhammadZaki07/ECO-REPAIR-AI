import { useEffect } from "react"
import { supabase } from "@/lib/supabase/client";

export default function AuthCallback() {
  useEffect(() => {
    supabase.auth.getSession().then(() => {
      window.location.href = "/admin/dashboard"
    })
  }, [])

  return <p>Logging you in...</p>
}
