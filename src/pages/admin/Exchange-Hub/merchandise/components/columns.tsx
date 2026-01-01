import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { EcoMerch } from "@/types/merchandise";
import type { ColumnDef } from "@tanstack/react-table";
import fallback from "@/assets/images/image-dumy.png";
import { MoreHorizontal } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface MerchColumnOptions {
  openEditModal: (item: EcoMerch) => void;
  setMerchToDelete: (id: string) => void;
  setDeleteDialogOpen: (open: boolean) => void;
  sortBy: keyof EcoMerch;
  sortOrder: "asc" | "desc";
  handleSort: (column: keyof EcoMerch) => void;
}

export const getMerchColumns = (
  opts: MerchColumnOptions
): ColumnDef<EcoMerch>[] => [
  {
    id: "no",
    header: "No",
    cell: ({ row, table }) =>
      row.index +
      1 +
      table.getState().pagination.pageIndex *
        table.getState().pagination.pageSize,
  },
  {
    accessorKey: "image_url",
    header: "Image",
    cell: ({ row }) => {
      const merch = row.original;

      return (
        <div className="w-10 h-10 rounded-md overflow-hidden flex items-center justify-center">
          <img
            src={merch.image_url ?? fallback}
            alt={merch.title}
            className="w-full h-full object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => row.original.title,
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.is_active ? "default" : "destructive"}>
        {row.original.is_active ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => (
      <Badge className="font-medium text-sm" variant={"outline"}>
        {row.original.stock}
      </Badge>
    ),
  },
  {
    accessorKey: "created_at",
    header: () => (
      <Button
        variant="ghost"
        className="p-0"
        onClick={() => opts.handleSort("created_at")}
      >
        Created At{" "}
        {opts.sortBy === "created_at"
          ? opts.sortOrder === "asc"
            ? "↑"
            : "↓"
          : ""}
      </Button>
    ),
    cell: ({ row }) =>
      new Date(row.original.created_at).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => opts.openEditModal(row.original)}>
            View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => opts.openEditModal(row.original)}>
            Edit
          </DropdownMenuItem>
          <Separator />
          <DropdownMenuItem
          className="text-red-500"
            onClick={() => {
              opts.setMerchToDelete(row.original.id);
              opts.setDeleteDialogOpen(true);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
