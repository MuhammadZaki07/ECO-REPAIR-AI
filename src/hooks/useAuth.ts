import { useState } from "react";
import { useAuthContext } from "@/hooks/context/AuthContext";
import { AuthService } from "@/services/AuthService";

export const useAuth = () => {
  const { setUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInWithEmail = async (email: string) => {
    try {
      setLoading(true);
      setError(null);

      await AuthService.signInWithEmail(email);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);

      await AuthService.signInWithGoogle();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);

      await AuthService.logout();
      setUser(null);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    signInWithEmail,
    signInWithGoogle,
    logout,
    loading,
    error,
  };
};
