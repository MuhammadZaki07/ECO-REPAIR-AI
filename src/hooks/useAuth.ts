import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "@/hooks/context/AuthContext";
import { AuthService } from "@/services/AuthService";

export const useAuth = () => {
  const { clearUser } = useAuthContext();

  const signInWithEmail = useMutation({
    mutationFn: AuthService.signInWithEmail,
  });

  const signInWithGoogle = useMutation({
    mutationFn: (from?: string) => AuthService.signInWithGoogle(from),
  });

  const logout = useMutation({
    mutationFn: async () => {
      await AuthService.logout();
      clearUser();
    },
  });

  return {
    signInWithEmail: signInWithEmail.mutateAsync,
    signInWithGoogle: signInWithGoogle.mutateAsync,
    logout: logout.mutateAsync,

    loading:
      signInWithEmail.isPending ||
      signInWithGoogle.isPending ||
      logout.isPending,

    error: signInWithEmail.error || signInWithGoogle.error || logout.error,
  };
};
