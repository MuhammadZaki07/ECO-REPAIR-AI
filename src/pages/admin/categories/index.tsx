import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useCategories } from "@/hooks/useCategories";
import { useDebounce } from "@/hooks/useDebounce";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
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
import CategoryModal from "./components/CategoryModal";
import { ENV } from "@/env";
import { formatDateID } from "@/utils/date";

export default function CategoryPage() {
  const {
    categories,
    total,
    page,
    setPage,
    loading,
    deleteCategory,
    setSearchTerm,
    createCategory,
    updateCategory,
    refetch,
  } = useCategories(ENV.PAGE_SIZE);
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search, 500);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingCategory, setEditingCategory] = React.useState<{
    id: number;
    name: string;
  } | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [categoryToDelete, setCategoryToDelete] = React.useState<number | null>(
    null
  );

  useEffect(() => {
    setPage(1);
    setSearchTerm(debouncedSearch);
  }, [debouncedSearch, setSearchTerm, setPage]);

  const handleDelete = async () => {
    if (categoryToDelete !== null) {
      await deleteCategory(categoryToDelete);
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
      refetch();
    }
  };

  const openEditModal = (category: { id: number; name: string }) => {
    setEditingCategory(category);
    setModalOpen(true);
  };

  const columns = [
    {
      id: "no",
      header: "No",
      cell: ({ row }: any) => row.index + 1 + (page - 1) * ENV.PAGE_SIZE,
    },
    { accessorKey: "name", header: "Name" },
    {
      accessorKey: "created_at",
      header: "Created",
      cell: ({ row }: any) => {
        const date = row.original.created_at;
        return (
          <span className="text-sm text-muted-foreground">
            {date ? formatDateID(date) : "-"}
          </span>
        );
      },
    },
    {
      accessorKey: "id",
      header: "Actions",
      cell: ({ row }: any) => {
        const cat = row.original;
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
                  setCategoryToDelete(cat.id);
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

  const totalPages = Math.ceil(total / ENV.PAGE_SIZE);

  return (
    <div className="container lg:p-4 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="lg:space-y-4 space-y-2">
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-sm text-muted-foreground">
            Manage and organize your categories here.
          </p>
        </div>

        <Button
          onClick={() => {
            setModalOpen(true);
            setEditingCategory(null);
          }}
        >
          Add Category
        </Button>
      </div>

      <DataTable
        onSearch={(val) => setSearch(val)}
        columns={columns}
        data={categories}
        loading={loading}
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(p - 1, 1))}
        onNext={() => setPage((p) => Math.min(p + 1, totalPages))}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this category? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-end space-x-2">
            <AlertDialogCancel asChild>
              <Button variant="outline">Cancel</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button className="bg-red-500 text-white" onClick={handleDelete}>
                Delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <CategoryModal
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        initialData={editingCategory}
        onSuccess={() => {
          setModalOpen(false);
          setEditingCategory(null);
          refetch();
        }}
        onSubmit={async (name) => {
          if (editingCategory)
            await updateCategory({ id: editingCategory.id, name });
          else await createCategory(name);
        }}
      />
    </div>
  );
}
