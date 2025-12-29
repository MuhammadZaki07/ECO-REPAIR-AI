import { useState } from "react";
import { Trash2 } from "lucide-react";

import { useAuthContext } from "@/hooks/context/AuthContext";
import { useProfile } from "@/hooks/useProfile";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export default function ProfileContent() {
  const { user, userData } = useAuthContext();
  const {
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
  } = useProfile();

  const [deleteInput, setDeleteInput] = useState("");

  const isVerified =
    user?.identities?.[0]?.identity_data?.email_verified === true;

  return (
    <Tabs defaultValue="personal" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
      </TabsList>

      <TabsContent value="personal" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your bio and location.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>First Name</Label>
                <Input
                  readOnly
                  value={user?.user_metadata?.full_name?.split(" ")[0] ?? ""}
                />
              </div>

              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input
                  readOnly
                  value={user?.user_metadata?.full_name?.split(" ")[1] ?? ""}
                />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input readOnly value={user?.email ?? ""} />
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Bio</Label>
              <Textarea
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <Button onClick={saveProfile} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="account" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account preferences.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Account Status</Label>
                <p className="text-muted-foreground text-sm">
                  {isVerified ? "Active" : "Not verified"}
                </p>
              </div>
              <Badge
                variant="outline"
                className={
                  isVerified
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-yellow-200 bg-yellow-50 text-yellow-700"
                }
              >
                {isVerified ? "Active" : "Unverified"}
              </Badge>
            </div>

            <Separator />

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" disabled={exporting}>
                  {exporting ? "Exporting..." : "Export Data"}
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Export your data</AlertDialogTitle>
                  <AlertDialogDescription>
                    Your data will be downloaded as a JSON file.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={exportData}>
                    Export
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Separator />

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete account</AlertDialogTitle>
                  <AlertDialogDescription>
                    Type <strong>I agree</strong> to permanently delete your
                    account. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <Input
                  value={deleteInput}
                  onChange={(e) => setDeleteInput(e.target.value)}
                />

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={deleteInput !== "I agree" || deleting}
                    onClick={deleteAccount}
                  >
                    {deleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
