import { useEffect, useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import { Trash2, UserPlus } from "lucide-react";
import type { UserData } from "@/types/auth";
import { ENV } from "@/env";
import { useDebounce } from "@/hooks/useDebounce";
import { useToast } from "@/hooks/use-toast";
import { formatDateWithDay } from "@/utils/date";
import { useAuthContext } from "@/hooks/context/AuthContext";
import { AddAdminModal } from "../components/AddAdminModal";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { getUserColumnsWithDemote } from "../components/columns";

export default function UsersAdmin() {
  const { user, userData } = useAuthContext();
  const { toast } = useToast();

  const {
    users,
    total,
    page,
    setPage,
    loading,
    setSearchTerm,
    blockUser,
    unblockUser,
    deleteUser,
    refetch,
    restoreUser,
    setSort,
    setIncludeDeleted,
    includeDeleted,
  } = useUsers(ENV.PAGE_SIZE);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const [confirmName, setConfirmName] = useState("");

  const [addAdminDialogOpen, setAddAdminDialogOpen] = useState(false);

  const [sortBy, setSortBy] = useState<"created_at" | "email" | "username">(
    "created_at"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const isSelf = selectedUser?.auth_id === user?.id;

  useEffect(() => {
    setPage(1);
    setSearchTerm(debouncedSearch);
    setSort(sortBy, sortOrder);
  }, [debouncedSearch, sortBy, sortOrder]);

  const handleConfirmBlock = async () => {
    if (!selectedUser) return;

    if (isSelf) {
      toast({
        title: "Action not allowed",
        description: "You cannot block or unblock your own account.",
        variant: "destructive",
      });
      setBlockDialogOpen(false);
      return;
    }

    if (selectedUser.is_blocked) {
      await unblockUser(selectedUser.id);
      toast({
        title: "User Unblocked",
        description: "User access has been restored.",
      });
    } else {
      await blockUser(selectedUser.id);
      toast({
        title: "User Blocked",
        description: "User has been blocked from accessing the system.",
      });
    }

    setBlockDialogOpen(false);
    setSelectedUser(null);
    refetch();
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;

    if (isSelf) {
      toast({
        title: "Action not allowed",
        description: "You cannot delete your own account.",
        variant: "destructive",
      });
      return;
    }

    if (confirmName !== selectedUser.username) return;

    await deleteUser(selectedUser.id, user?.id);

    toast({
      title: "User Deleted",
      description: "User has been permanently removed.",
    });

    setDeleteDialogOpen(false);
    setSelectedUser(null);
    setConfirmName("");
    refetch();
  };

  const totalPages = Math.ceil(total / ENV.PAGE_SIZE);

  const columns = getUserColumnsWithDemote({
    page,
    ENV,
    user,
    userData,
    setSortBy,
    setSortOrder,
    setSelectedUser,
    setViewDialogOpen,
    setBlockDialogOpen,
    setRestoreDialogOpen,
    setConfirmName,
    setDeleteDialogOpen,
    toast,
    refetch,
  });

  return (
    <div className="container lg:p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Admins
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Manage admin accounts. Add new admins from existing users.
          </p>
        </div>
        <Button
          onClick={() => setAddAdminDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <UserPlus /> Add Admin
        </Button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          id="showDeleted"
          checked={includeDeleted}
          onChange={(e) => {
            setPage(1);
            setIncludeDeleted(e.target.checked);
          }}
        />
        <label htmlFor="showDeleted" className="text-sm">
          Show deleted admins
        </label>
      </div>

      <DataTable
        onSearch={(val) => setSearch(val)}
        columns={columns}
        data={users.filter((u) => u.role === "admin")}
        loading={loading}
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(p - 1, 1))}
        onNext={() => setPage((p) => Math.min(p + 1, totalPages))}
      />

      <AddAdminModal
        open={addAdminDialogOpen}
        onOpenChange={setAddAdminDialogOpen}
        onUpdateSuccess={refetch}
        currentUserId={userData?.id || ""}
      />

      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="items-center text-center space-y-3">
            <Avatar className="h-20 w-20">
              <AvatarImage src={selectedUser?.avatar_url ?? ""} />
            </Avatar>

            <DialogTitle className="text-xl">
              {selectedUser?.username}
            </DialogTitle>

            <p className="text-sm text-muted-foreground">
              {selectedUser?.email ?? "-"}
            </p>
          </DialogHeader>

          {selectedUser &&
            (() => {
              const isSelf = selectedUser?.auth_id === user?.id;

              return (
                <>
                  <div className="mt-6 space-y-4 text-center text-sm">
                    <div className="flex justify-center gap-2">
                      <Badge variant="outline">{selectedUser.role}</Badge>
                      {selectedUser.is_blocked ? (
                        <Badge variant="destructive">Blocked</Badge>
                      ) : (
                        <Badge className="bg-green-500/20 text-green-600">
                          Active
                        </Badge>
                      )}
                    </div>

                    <div className="text-muted-foreground">
                      Joined on{" "}
                      <span className="font-medium text-foreground">
                        {formatDateWithDay(selectedUser.created_at)}
                      </span>
                    </div>
                  </div>

                  {isSelf && (
                    <p className="mt-4 text-xs text-center text-muted-foreground">
                      You cannot manage your own account.
                    </p>
                  )}
                  <DialogFooter>
                    <div className="mt-5 flex justify-center gap-3">
                      <Button
                        variant={"outline"}
                        disabled={isSelf}
                        className={
                          selectedUser.is_blocked
                            ? "text-green-500"
                            : "text-red-500"
                        }
                        onClick={() => {
                          if (isSelf) {
                            toast({
                              title: "Action not allowed",
                              description: "You cannot block your own account.",
                              variant: "destructive",
                            });
                            return;
                          }
                          setViewDialogOpen(false);
                          setBlockDialogOpen(true);
                        }}
                      >
                        {selectedUser.is_blocked
                          ? "Unblock User"
                          : "Block User"}
                      </Button>
                      <Button
                        disabled={isSelf}
                        className="bg-red-500 text-white hover:bg-red-400"
                        onClick={() => {
                          if (isSelf) {
                            toast({
                              title: "Action not allowed",
                              description:
                                "You cannot delete your own account.",
                              variant: "destructive",
                            });
                            return;
                          }
                          setConfirmName("");
                          setViewDialogOpen(false);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setViewDialogOpen(false)}
                      >
                        Close
                      </Button>
                    </div>
                  </DialogFooter>
                </>
              );
            })()}
        </DialogContent>
      </Dialog>

      <AlertDialog open={blockDialogOpen} onOpenChange={setBlockDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedUser?.is_blocked ? "Unblock User?" : "Block User?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {selectedUser?.is_blocked
                ? "This will restore user access."
                : "This will prevent the user from accessing the system."}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmBlock}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Please type <b>{selectedUser?.username}</b> to confirm this
              action.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <Input
            value={confirmName}
            onChange={(e) => setConfirmName(e.target.value)}
            placeholder="Enter username"
          />

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 text-white hover:bg-red-400 disabled:bg-primary disabled:text-black"
              disabled={confirmName !== selectedUser?.username}
              onClick={handleConfirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={restoreDialogOpen} onOpenChange={setRestoreDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Restore User</AlertDialogTitle>
            <AlertDialogDescription>
              This will restore access for <b>{selectedUser?.username}</b>.
              <br />
              The user will be able to log in again.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (!selectedUser) return;

                await restoreUser(selectedUser.id);

                toast({
                  title: "User Restored",
                  description: "User account has been restored successfully.",
                });

                setRestoreDialogOpen(false);
                setSelectedUser(null);
              }}
            >
              Restore
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
