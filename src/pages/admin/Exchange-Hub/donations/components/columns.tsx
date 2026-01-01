import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { formatDateWithDay } from "@/utils/date";
import fallback from "@/assets/images/image-dumy.png";

export const getDonationCampaignColumns = ({
  page,
  ENV,
  sortBy,
  sortOrder,
  handleSort,
  openEditModal,
  setCampaignToDelete,
  setDeleteDialogOpen,
  setViewModalCampaign,
}: {
  page: number;
  ENV: { PAGE_SIZE: number };
  sortBy: "created_at" | "title";
  sortOrder: "asc" | "desc";
  handleSort: (column: "created_at" | "title") => void;
  openEditModal: (campaign: any) => void;
  setCampaignToDelete: (id: string) => void;
  setDeleteDialogOpen: (open: boolean) => void;
  setViewModalCampaign: (id: string) => void;
}) => [
  {
    id: "no",
    header: () => <div className="text-center">No</div>,
    cell: ({ row }: any) => (
      <div className="text-center">
        {row.index + 1 + (page - 1) * ENV.PAGE_SIZE}
      </div>
    ),
  },
  {
    accessorKey: "image_url",
    header: () => <div className="text-center">Image</div>,
    cell: ({ row }: any) => {
      const imgSrc = row.original.image_url || fallback;

      return (
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-md overflow-hidden">
            <img
              src={imgSrc}
              alt={row.original.title}
              className="w-full h-full object-cover"
              onError={(e: any) => {
                e.currentTarget.src = fallback;
              }}
            />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: () => (
      <Button
        variant="ghost"
        className="px-0"
        onClick={() => handleSort("title")}
      >
        Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "goal_eco_coin",
    header: () => <div className="text-center">Progress</div>,
    cell: ({ row }: any) => {
      const { goal_eco_coin, current_eco_coin } = row.original;
      const percent = goal_eco_coin
        ? Math.min((current_eco_coin / goal_eco_coin) * 100, 100)
        : 0;

      return (
        <div className="flex flex-col gap-1 text-center">
          <Progress value={percent} className="h-2" />
          <span className="text-xs text-muted-foreground">
            {current_eco_coin} / {goal_eco_coin} ({percent.toFixed(0)}%)
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "is_active",
    header: () => <div className="text-center">Active</div>,
    cell: ({ row }: any) => (
      <div className="flex justify-center">
        <Badge variant={row.original.is_active ? "default" : "destructive"}>
          {row.original.is_active ? "Active" : "Inactive"}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: () => (
      <Button
        variant="ghost"
        className="px-0"
        onClick={() => handleSort("created_at")}
      >
        Created
        <ArrowUpDown
          className={`ml-2 h-4 w-4 ${
            sortBy === "created_at" ? "opacity-100" : "opacity-40"
          }`}
        />
      </Button>
    ),
    cell: ({ row }: any) => (
      <div className="text-center text-sm text-muted-foreground">
        {formatDateWithDay(row.original.created_at)}
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }: any) => {
      const campaign = row.original;

      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuItem
                onClick={() => setViewModalCampaign(campaign.id)}
              >
                View Detail
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => openEditModal(campaign)}>
                Edit
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="text-destructive"
                onClick={() => {
                  setCampaignToDelete(campaign.id);
                  setDeleteDialogOpen(true);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
