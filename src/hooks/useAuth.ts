import { useState } from "react";
import { AuthService, AuthCredentials } from "@/services/AuthService";
import { useAuthContext } from "@/context/AuthContext";

export const useAuth = () => {
  const { setUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // LOGIN
  const login = async (credentials: AuthCredentials) => {
    try {
      setLoading(true);
      setError(null);

      const data = await AuthService.login(credentials);

      // Auto-sync ke context
      setUser(data.user);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // REGISTER
  const register = async (credentials: AuthCredentials) => {
    try {
      setLoading(true);
      setError(null);

      const data = await AuthService.register(credentials);

      setUser(data.user);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE OAUTH
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

  // LOGOUT
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
