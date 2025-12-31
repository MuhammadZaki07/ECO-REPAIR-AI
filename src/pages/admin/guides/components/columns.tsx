import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowUpDown,
  Eye,
  MoreHorizontal,
  PencilIcon,
  Trash,
} from "lucide-react";
import ImageDumy from "@/assets/images/image-dumy.png";
import type { Guide } from "@/types/Guide";
import { Badge } from "@/components/ui/badge";

export const columns = (
  page: number,
  onView: (guide: Guide) => void,
  onEdit: (guide: Guide) => void,
  setGuideToDelete: (guide: Guide) => void,
  setDeleteDialogOpen: (open: boolean) => void
) => [
  {
    id: "no",
    header: "No",
    cell: ({ row }: any) => row.index + 1 + (page - 1) * 10,
  },
  {
    accessorKey: "image_url",
    header: "Image",
    cell: ({ row }: any) =>
      row.original.image_url ? (
        <img
          src={row.original.image_url}
          alt={row.original.title ?? "Guide image"}
          className="w-16 h-16 object-cover rounded"
          loading="lazy"
        />
      ) : (
        <img
          src={ImageDumy}
          alt={row.original.title ?? "No Image"}
          loading="lazy"
          className="w-16 h-16 object-cover rounded"
        />
      ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      return <div className="max-w-[260px] truncate font-medium">{title}</div>;
    },
  },
  {
    accessorKey: "categories.name",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original?.categories?.name;

      if (!category) return <span className="text-muted-foreground">-</span>;

      return <Badge variant="secondary">{category}</Badge>;
    },
  },
  {
    accessorKey: "created_at",
    header: () => (
      <Button variant="ghost" className="px-0">
        Created <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }: any) => (
      <span className="text-sm text-muted-foreground">
        {row.original.created_at
          ? new Date(row.original.created_at).toLocaleDateString()
          : "-"}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }: any) => {
      const guide = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem onClick={() => onView(guide)}>
              <Eye className="mr-2 h-4 w-4" /> View
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => onEdit(guide)}>
              <PencilIcon className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-destructive"
              onClick={() => {
                setGuideToDelete(guide);
                setDeleteDialogOpen(true);
              }}
            >
              <Trash className="mr-2 h-4 w-4 text-destructive" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
