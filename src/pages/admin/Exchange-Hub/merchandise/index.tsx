import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useDebounce } from "@/hooks/useDebounce";
import { useToast } from "@/hooks/use-toast";
import MerchandiseModal from "./components/MerchandiseModal";
import { getMerchColumns } from "./components/columns";
import { useMerch } from "@/hooks/useMerchandise";
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
import type { MerchandiseInput } from "@/schemas/MerchandiseSchema";

export default function MerchandisePage() {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<any>("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { merch, loading, pages,updateMerchMutation,createMerchMutation, deleteMerch } =
    useMerch(debouncedSearch, page, sortBy, sortOrder , false);

  const { toast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingMerch, setEditingMerch] = useState<any>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [merchToDelete, setMerchToDelete] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!merchToDelete) return;
    try {
      await deleteMerch(merchToDelete);
      toast({
        title: "Deleted",
        description: "Merchandise deleted successfully.",
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message ?? "Something went wrong",
        variant: "destructive",
      });
    }
    setDeleteDialogOpen(false);
    setMerchToDelete(null);
  };

  const handleMerchSubmit = (
    data: MerchandiseInput,
    removeImage?: boolean,
    file?: File
  ) => {
    if (editingMerch?.id) {
      updateMerchMutation.mutate({
        merchId: editingMerch.id,
        payload: { ...data, image_file: file, remove_image: removeImage },
      });
    } else {
      createMerchMutation.mutate({ ...data, image_file: file });
    }

    setEditingMerch(null);
    setModalOpen(false);
  };

  const columns = useMemo(
    () =>
      getMerchColumns({
        openEditModal: (item: any) => {
          setEditingMerch(item);
          setModalOpen(true);
        },
        setMerchToDelete,
        setDeleteDialogOpen,
        sortBy,
        sortOrder,
        handleSort: (column) => {
          if (sortBy === column)
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
          else {
            setSortBy(column);
            setSortOrder("asc");
          }
          setPage(1);
        },
      }),
    [sortBy, sortOrder]
  );

  return (
    <div className="container lg:p-4 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="space-y-2 lg:space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Merchandise
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Manage all merchandise items in the system.
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingMerch(null);
            setModalOpen(true);
          }}
        >
          Add Merchandise
        </Button>
      </div>

      <DataTable
        onSearch={setSearch}
        columns={columns}
        data={merch}
        loading={loading}
        page={page}
        totalPages={pages}
        onPrev={() => setPage((p) => Math.max(p - 1, 1))}
        onNext={() => setPage((p) => Math.min(p + 1, pages))}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Merchandise?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this merchandise item? This action
              cannot be undone.
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

      <MerchandiseModal
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        initialData={editingMerch}
        onSubmit={handleMerchSubmit}
      />
    </div>
  );
}
