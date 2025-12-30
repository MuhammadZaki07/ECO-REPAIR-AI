import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { formatDateWithDay } from "@/utils/date"

export const getCategoryColumns = ({
  page,
  ENV,
  openEditModal,
  setCategoryToDelete,
  setDeleteDialogOpen,
}: {
  page: number
  ENV: { PAGE_SIZE: number }
  openEditModal: (category: { id: number; name: string }) => void
  setCategoryToDelete: (id: number) => void
  setDeleteDialogOpen: (open: boolean) => void
}) => [
  {
    id: "no",
    header: "No",
    cell: ({ row }: any) => row.index + 1 + (page - 1) * ENV.PAGE_SIZE,
  },
  { accessorKey: "name", header: "Name" },
  {
    accessorKey: "created_at",
    header: ({ setSortBy, setSortOrder }: any) => (
      <Button
        variant="ghost"
        className="px-0"
        onClick={() => {
          setSortBy("created_at")
          setSortOrder((prev: "asc" | "desc") => (prev === "asc" ? "desc" : "asc"))
        }}
      >
        Created
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }: any) => {
      const date = row.original.created_at
      return (
        <span className="text-sm text-muted-foreground">
          {date ? formatDateWithDay(date) : "-"}
        </span>
      )
    },
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }: any) => {
      const cat = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => openEditModal(cat)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => {
                setCategoryToDelete(cat.id)
                setDeleteDialogOpen(true)
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
