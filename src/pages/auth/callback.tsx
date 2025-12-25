import { useAuthContext } from "@/hooks/context/AuthContext";
import { useEffect } from "react";

export default function AuthCallback() {
  const { userData } = useAuthContext();

  useEffect(() => {
    if (userData) {
      window.location.href = `/${userData.role}/dashboard`;
    }
  }, [userData]);

  return null;
}
