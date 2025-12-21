// hooks/useProfile.ts
import { useEffect, useState } from "react";
import { ProfileService } from "@/services/ProfileService";
import { useAuthContext } from "@/hooks/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

export const useProfile = () => {
  const { user, userData } = useAuthContext();
  const { toast } = useToast();

  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");

  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (userData) {
      setBio(userData.bio ?? "");
      setLocation(userData.location ?? "");
    }
  }, [userData]);

  const saveProfile = async () => {
    if (!user) return;
    setSaving(true);

    try {
      await ProfileService.updateProfile(user.id, { bio, location });

      toast({
        title: "Profile updated",
        description: "Your profile has been saved",
      });
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Unable to save profile",
      });
    } finally {
      setSaving(false);
    }
  };

  const exportData = async () => {
    if (!userData) return;
    setExporting(true);

    try {
      const data = await ProfileService.exportUserData(userData.id);

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
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Export failed",
        description: "Unable to export your data",
      });
    } finally {
      setExporting(false);
    }
  };

  const deleteAccount = async () => {
    setDeleting(true);
    try {
      await ProfileService.deleteAccount();
      toast({
        title: "Account deleted",
        description: "Goodbye 👋",
      });
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: "Unable to delete account",
      });
    } finally {
      setDeleting(false);
    }
  };

  return {
    bio,
    setBio,
    location,
    setLocation,

    saveProfile,
    exportData,
    deleteAccount,

    saving,
    exporting,
    deleting,
  };
};
