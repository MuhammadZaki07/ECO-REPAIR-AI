import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import type { EcoVoucher } from "@/types/voucher";
import { formatDateID, formatDateWithDay } from "@/utils/date";

interface GetVoucherColumnsProps {
  openEditModal: (voucher: EcoVoucher) => void;
  openViewModal: (voucherId: string) => void;
  setVoucherToDelete: (id: string) => void;
  setDeleteDialogOpen: (open: boolean) => void;
  sortBy: keyof EcoVoucher;
  sortOrder: "asc" | "desc";
  handleSort: (column: keyof EcoVoucher) => void;
}

export const getVoucherColumns = ({
  openEditModal,
  openViewModal,
  setVoucherToDelete,
  setDeleteDialogOpen,
  sortBy,
  sortOrder,
  handleSort,
}: GetVoucherColumnsProps): ColumnDef<EcoVoucher>[] => [
  {
    id: "no",
    header: () => <div className="text-center w-full font-semibold">No</div>,
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
  },
  {
    accessorKey: "title",
    header: () => (
      <Button
        variant="ghost"
        className="px-0 font-semibold flex justify-center mx-auto"
        onClick={() => handleSort("title")}
      >
        Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.getValue<string>("title")}
      </div>
    ),
  },
  {
    accessorKey: "eco_coin_cost",
    header: () => <span className="font-semibold text-center">Cost</span>,
    cell: ({ row }) => (
      <Badge variant="secondary" className="mx-auto bg-yellow-300 text-black">
        {row.getValue<number>("eco_coin_cost")} Coins
      </Badge>
    ),
  },
  {
    accessorKey: "active",
    header: () => <span className="font-semibold text-center">Status</span>,
    cell: ({ row }) => {
      const active = row.getValue<boolean>("active");
      return (
        <Badge variant={active ? "default" : "destructive"} className="mx-auto">
          {active ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "start_date",
    header: () => <div className="font-semibold text-center">Start Date</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {row.getValue<string>("start_date")
          ? formatDateID(row.getValue<string>("start_date"))
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "end_date",
    header: () => <div className="font-semibold text-center">End Date</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {row.getValue<string>("end_date")
          ? formatDateID(row.getValue<string>("end_date"))
          : "-"}
      </div>
    ),
  },

  {
    accessorKey: "created_at",
    header: () => (
      <Button
        variant="ghost"
        className="px-0 font-semibold flex justify-center mx-auto"
        onClick={() => handleSort("created_at")}
      >
        Created At
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        {formatDateWithDay(row.getValue<string>("created_at"))}
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <span className="text-center font-semibold">Actions</span>,
    cell: ({ row }) => {
      const voucher = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => openViewModal(voucher.id)}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => openEditModal(voucher)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => {
                setVoucherToDelete(voucher.id);
                setDeleteDialogOpen(true);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
