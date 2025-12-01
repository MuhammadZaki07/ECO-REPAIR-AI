import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import type { RegisterCredentials } from "@/types/auth";
import { AuthService } from "@/services/auth/AuthService";

export const useAuth = () => {
  const { setUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      setLoading(true);
      setError(null);

      const { user } = await AuthService.login(credentials);
      setUser(user);

      return user;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      setLoading(true);
      setError(null);

      const { user } = await AuthService.register(credentials);
      setUser(user);

      return user;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);

      await AuthService.loginWithGoogle();
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
    login,
    register,
    loginWithGoogle,
    logout,
    loading,
    error,
  };
};

