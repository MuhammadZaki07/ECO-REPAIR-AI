import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProfileService } from "@/services/ProfileService";
import { useAuthContext } from "@/hooks/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

export const useProfile = () => {
  const { user, userData } = useAuthContext();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (userData) {
      setBio(userData.bio ?? "");
      setLocation(userData.location ?? "");
    }
  }, [userData]);

  const saveProfileMutation = useMutation({
    mutationFn: () =>
      ProfileService.updateProfile(user!.id, { bio, location }),
    onSuccess: () => {
      toast({
        title: "Profile updated",
        description: "Your profile has been saved",
      });
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
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
    mutationFn: () => ProfileService.exportUserData(userData!.id),
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
    mutationFn: ProfileService.deleteAccount,
    onSuccess: () => {
      toast({
        title: "Account deleted",
        description: "Goodbye 👋",
      });
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
  };
};
