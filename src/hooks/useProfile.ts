import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserService } from "@/services/UserService";
import { useAuthContext } from "@/hooks/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

export const useProfile = () => {
  const { user, userData } = useAuthContext();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");

  const { data: profileData, refetch: refetchProfile } = useQuery({
    queryKey: ["user-profile", userData?.id || user?.id],
    queryFn: () => UserService.getUserById(userData!.id ?? user!.id),
    enabled: !!userData || !!user,
    onSuccess: (data) => {
      if (!data) return;
      setBio(data.bio ?? "");
      setLocation(data.location ?? "");
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Fetch failed",
        description: "Unable to fetch profile",
      });
    },
  });

  useEffect(() => {
    if (userData) {
      setBio(userData.bio ?? "");
      setLocation(userData.location ?? "");
    }
  }, [userData]);

  const saveProfileMutation = useMutation({
    mutationFn: () => UserService.updateProfile(user!.id, { bio, location }),
    onSuccess: () => {
      toast({
        title: "Profile updated",
        description: "Your profile has been saved",
      });
      // Refetch agar state terbaru muncul
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      refetchProfile();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Unable to save profile",
      });
    },
  });

  const exportDataMutation = useMutation({
    mutationFn: () => UserService.exportUserData(user!.id),
    onSuccess: (data) => {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "my_data.json";
      a.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Export success",
        description: "Your data has been downloaded",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Export failed",
        description: "Unable to export your data",
      });
    },
  });

  const deleteAccountMutation = useMutation({
    mutationFn: () => UserService.deleteAccount(userData!.id, userData!.id),
    onSuccess: () => {
      toast({
        title: "Account deleted",
        description: "Goodbye 👋",
      });
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      window.location.href = "/";
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: "Unable to delete account",
      });
    },
  });

  return {
    bio,
    setBio,
    location,
    setLocation,

    saveProfile: saveProfileMutation.mutate,
    exportData: exportDataMutation.mutate,
    deleteAccount: deleteAccountMutation.mutate,

    saving: saveProfileMutation.isPending,
    exporting: exportDataMutation.isPending,
    deleting: deleteAccountMutation.isPending,

    refetch: refetchProfile,
  };
};
