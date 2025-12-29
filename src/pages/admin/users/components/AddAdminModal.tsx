import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import { useEffect, useState } from "react";
import { UserService } from "@/services/UserService";
import { useDebounce } from "@/hooks/useDebounce";
import type { UserData } from "@/types/auth";
import { ENV } from "@/env";
import { useToast } from "@/hooks/use-toast";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { DynamicSkeleton } from "@/components/skeletons";
import { Badge } from "@/components/ui/badge";

interface AddAdminModalProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  onUpdateSuccess: () => void;
  currentUserId: string;
}

export function AddAdminModal({
  open,
  onOpenChange,
  onUpdateSuccess,
  currentUserId,
}: AddAdminModalProps) {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserData[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const totalPages = Math.ceil(total / ENV.PAGE_SIZE);
  const allSelected =
    users.length > 0 && users.every((u) => selectedUserIds.includes(u.id));

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await UserService.getUsers({
        page,
        pageSize: ENV.PAGE_SIZE,
        search: debouncedSearch,
        sortBy: "created_at",
        sortOrder: "desc",
        role: "user",
      });
      setUsers(res.data);
      setTotal(res.total);
      setSelectedUserIds([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) fetchUsers();
  }, [open, page, debouncedSearch]);

  const toggleSelectUser = (id: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(users.map((u) => u.id));
    }
  };

  const handleUpdateToAdmin = async () => {
    try {
      await Promise.all(
        selectedUserIds.map((uid) =>
          UserService.updateRoleToAdmin(uid, currentUserId)
        )
      );
      toast({
        title: "Updated",
        description: "Selected users are now admins.",
      });
      setSelectedUserIds([]);
      onOpenChange(false);
      onUpdateSuccess();
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to update roles.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Admin</DialogTitle>
            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="mt-2"
            />
          </DialogHeader>

          <div className="mt-4 max-h-[400px] overflow-y-auto">
            {loading ? (
              <DynamicSkeleton
                preset="LIST"
                count={ENV.PAGE_SIZE}
                className="w-full space-y-4"
              />
            ) : users.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground">
                No users found.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Checkbox
                        checked={allSelected}
                        onCheckedChange={toggleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Avatar</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedUserIds.includes(u.id)}
                          onCheckedChange={() => toggleSelectUser(u.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={u.avatar_url ?? ""} />
                        </Avatar>
                      </TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>
                        <Badge>{u.role}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>

          <div className="mt-2 flex justify-between items-center">
            <div>
              <Button
                variant="outline"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
              >
                Prev
              </Button>
              <Button
                variant="outline"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                className="ml-2"
              >
                Next
              </Button>
              <span className="ml-4 text-sm">
                Page {page} of {totalPages}
              </span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => setConfirmDialogOpen(true)}
                disabled={selectedUserIds.length === 0}
              >
                Update Role to Admin
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* --- AlertDialog Konfirmasi --- */}
      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Update</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to make <b>{selectedUserIds.length}</b>{" "}
              user(s) an admin?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleUpdateToAdmin}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
