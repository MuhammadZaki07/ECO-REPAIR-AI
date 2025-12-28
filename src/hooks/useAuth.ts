import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "@/hooks/context/AuthContext";
import { AuthService } from "@/services/AuthService";

export const useAuth = () => {
  const { user, clearUser } = useAuthContext();

  const signInWithEmail = useMutation({
    mutationFn: (email: string) =>
      AuthService.signInWithEmail(email),
  });

  const signInWithGoogle = useMutation({
    mutationFn: () =>
      AuthService.signInWithGoogle(),
  });

  const logout = useMutation({
    mutationFn: async () => {
      await AuthService.logout();

      if (user) {
        localStorage.removeItem(`userData-${user.id}`);
      }
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

    error:
      signInWithEmail.error ||
      signInWithGoogle.error ||
      logout.error,
  };
};
