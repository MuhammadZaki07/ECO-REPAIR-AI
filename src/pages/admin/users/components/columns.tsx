import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal, Undo } from "lucide-react"
import { Avatar, AvatarImage } from "@/components/ui/Avatar"
import { formatDateWithDay } from "@/utils/date"
import type { User } from "@supabase/supabase-js"
import { UserService } from "@/services/UserService"

export const getUserColumns = ({
  page,
  ENV,
  user,
  setSortBy,
  setSortOrder,
  setSelectedUser,
  setViewDialogOpen,
  setBlockDialogOpen,
  setRestoreDialogOpen,
  setConfirmName,
  setDeleteDialogOpen,
  toast,
}: {
  page: number
  ENV: { PAGE_SIZE: number }
  user: User | null
  setSortBy: (key: string) => void
  setSortOrder: (order: "asc" | "desc") => void
  setSelectedUser: (user: User) => void
  setViewDialogOpen: (open: boolean) => void
  setBlockDialogOpen: (open: boolean) => void
  setRestoreDialogOpen: (open: boolean) => void
  setConfirmName: (val: string) => void
  setDeleteDialogOpen: (open: boolean) => void
  toast: any
}) => [
  {
    id: "no",
    header: "No",
    cell: ({ row }: any) => row.index + 1 + (page - 1) * ENV.PAGE_SIZE,
  },
  {
    accessorKey: "avatar_url",
    header: "Avatar",
    cell: ({ row }: any) => (
      <Avatar>
        <AvatarImage src={row.original.avatar_url ?? ""} />
      </Avatar>
    ),
  },
  {
    accessorKey: "username",
    header: "Name",
    cell: ({ row }: any) => row.original.username ?? "-",
  },
  {
    accessorKey: "email",
    header: () => (
      <Button
        variant="ghost"
        className="px-0"
        onClick={() => {
          setSortBy("email")
          setSortOrder((p) => (p === "asc" ? "desc" : "asc"))
        }}
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }: any) =>
      row.original.role === "admin" ? (
        <Badge className="bg-yellow-300 text-black">admin</Badge>
      ) : (
        <Badge variant="outline">user</Badge>
      ),
  },
  {
    accessorKey: "is_blocked",
    header: "Status",
    cell: ({ row }: any) =>
      row.original.is_blocked ? (
        <Badge variant="destructive">Blocked</Badge>
      ) : (
        <Badge className="bg-green-500/20 text-green-600">Active</Badge>
      ),
  },
  {
    accessorKey: "created_at",
    header: () => (
      <Button
        variant="ghost"
        className="px-0"
        onClick={() => {
          setSortBy("created_at")
          setSortOrder((p) => (p === "asc" ? "desc" : "asc"))
        }}
      >
        Created
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }: any) => (
      <span className="text-sm text-muted-foreground">
        {row.original.created_at
          ? formatDateWithDay(row.original.created_at)
          : "-"}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }: any) => {
      const target = row.original
      const isSelfRow = target.auth_id === user?.id
      const isTargetDeleted = !!target.deleted_at

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            {isTargetDeleted ? (
              <DropdownMenuItem
                className="text-blue-500 hover:text-blue-500"
                disabled={isSelfRow}
                onClick={() => {
                  if (isSelfRow) {
                    toast({
                      title: "Action not allowed",
                      description:
                        "You cannot restore your own account.",
                      variant: "destructive",
                    })
                    return
                  }
                  setSelectedUser(target)
                  setRestoreDialogOpen(true)
                }}
              >
                <Undo className="text-blue-500 hover:text-blue-500" /> Restore
                User
              </DropdownMenuItem>
            ) : (
              <>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedUser(target)
                    setViewDialogOpen(true)
                  }}
                >
                  View Details
                </DropdownMenuItem>

                <DropdownMenuItem
                  disabled={isSelfRow}
                  onClick={() => {
                    if (isSelfRow) {
                      toast({
                        title: "Action not allowed",
                        description:
                          "You cannot block your own account.",
                        variant: "destructive",
                      })
                      return
                    }
                    setSelectedUser(target)
                    setBlockDialogOpen(true)
                  }}
                >
                  {target.is_blocked ? "Unblock User" : "Block User"}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="text-destructive"
                  disabled={isSelfRow}
                  onClick={() => {
                    if (isSelfRow) {
                      toast({
                        title: "Action not allowed",
                        description:
                          "You cannot delete your own account.",
                        variant: "destructive",
                      })
                      return
                    }
                    setSelectedUser(target)
                    setConfirmName("")
                    setDeleteDialogOpen(true)
                  }}
                >
                  Delete User
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export const getUserColumnsWithDemote = ({
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
}: {
  page: number
  ENV: { PAGE_SIZE: number }
  user: User | null
  userData: User | null
  setSortBy: (key: string) => void
  setSortOrder: (order: "asc" | "desc") => void
  setSelectedUser: (user: User) => void
  setViewDialogOpen: (open: boolean) => void
  setBlockDialogOpen: (open: boolean) => void
  setRestoreDialogOpen: (open: boolean) => void
  setConfirmName: (val: string) => void
  setDeleteDialogOpen: (open: boolean) => void
  toast: any
  refetch: () => void
}) => [
  {
    id: "no",
    header: "No",
    cell: ({ row }: any) => row.index + 1 + (page - 1) * ENV.PAGE_SIZE,
  },
  {
    accessorKey: "avatar_url",
    header: "Avatar",
    cell: ({ row }: any) => (
      <Avatar>
        <AvatarImage src={row.original.avatar_url ?? ""} />
      </Avatar>
    ),
  },
  {
    accessorKey: "username",
    header: "Name",
    cell: ({ row }: any) => row.original.username ?? "-",
  },
  {
    accessorKey: "email",
    header: () => (
      <Button
        variant="ghost"
        className="px-0"
        onClick={() => {
          setSortBy("email")
          setSortOrder((p) => (p === "asc" ? "desc" : "asc"))
        }}
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }: any) => (
      <Badge className="bg-yellow-300 text-black">{row.original.role}</Badge>
    ),
  },
  {
    accessorKey: "is_blocked",
    header: "Status",
    cell: ({ row }: any) =>
      row.original.is_blocked ? (
        <Badge variant="destructive">Blocked</Badge>
      ) : (
        <Badge className="bg-green-500/20 text-green-600">Active</Badge>
      ),
  },
  {
    accessorKey: "created_at",
    header: () => (
      <Button
        variant="ghost"
        className="px-0"
        onClick={() => {
          setSortBy("created_at")
          setSortOrder((p) => (p === "asc" ? "desc" : "asc"))
        }}
      >
        Created
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }: any) => (
      <span className="text-sm text-muted-foreground">
        {row.original.created_at
          ? formatDateWithDay(row.original.created_at)
          : "-"}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }: any) => {
      const target = row.original
      const isSelfRow = target.auth_id === user?.id
      const isTargetDeleted = !!target.deleted_at

      const handleDemote = async () => {
        if (!target) return
        try {
          await UserService.updateRoleToUser(target.id, userData?.id)
          toast({
            title: "Role Updated",
            description: `${target.username} is now a regular user.`,
          })
          refetch()
        } catch (err) {
          console.error(err)
          toast({
            title: "Error",
            description: "Failed to demote user.",
            variant: "destructive",
          })
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            {isTargetDeleted ? (
              <DropdownMenuItem
                className="text-blue-500 hover:text-blue-500"
                disabled={isSelfRow}
                onClick={() => {
                  if (isSelfRow) return
                  setSelectedUser(target)
                  setRestoreDialogOpen(true)
                }}
              >
                Restore User
              </DropdownMenuItem>
            ) : (
              <>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedUser(target)
                    setViewDialogOpen(true)
                  }}
                >
                  View Details
                </DropdownMenuItem>

                <DropdownMenuItem
                  disabled={isSelfRow || target.role !== "admin"}
                  onClick={() => {
                    if (isSelfRow) return
                    setSelectedUser(target)
                    setBlockDialogOpen(true)
                  }}
                >
                  {target.is_blocked ? "Unblock User" : "Block User"}
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={handleDemote}
                  disabled={isSelfRow || target.role !== "admin"}
                  className="text-green-500 hover:text-green-500"
                >
                  Demote to User
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="text-destructive"
                  disabled={isSelfRow}
                  onClick={() => {
                    if (isSelfRow) return
                    setSelectedUser(target)
                    setConfirmName("")
                    setDeleteDialogOpen(true)
                  }}
                >
                  Delete User
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
