import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useVouchers } from "@/hooks/useVouchers";
import { useDebounce } from "@/hooks/useDebounce";
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
import VoucherModal from "./components/VoucherModal";
import VoucherClaimModal from "./components/VoucherClaimModal";
import { getVoucherColumns } from "./components/getVoucherColumns";

export function VouchersPage() {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<"created_at" | "title">("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const {
    adminVouchers,
    adminLoading,
    createVoucher,
    updateVoucher,
    deleteVoucher,
    adminTotal,
  } = useVouchers(
    undefined,
    debouncedSearch,
    page,
    ENV.PAGE_SIZE,
    sortBy,
    sortOrder
  );

  const { toast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState<any>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [voucherToDelete, setVoucherToDelete] = useState<string | null>(null);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [voucherToView, setVoucherToView] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!voucherToDelete) return;
    await deleteVoucher(voucherToDelete);
    setDeleteDialogOpen(false);
    setVoucherToDelete(null);
    toast({
      title: "Deleted",
      description: "Voucher has been deleted successfully.",
    });
  };

  const handleSubmitVoucher = async (data: any) => {
    if (editingVoucher) {
      await updateVoucher({ voucherId: editingVoucher.id, payload: data });
    } else {
      await createVoucher(data);
    }
    setModalOpen(false);
    setEditingVoucher(null);
  };

  const columns = useMemo(
    () =>
      getVoucherColumns({
        openEditModal: (voucher: any) => {
          setEditingVoucher(voucher);
          setModalOpen(true);
        },
        openViewModal: (voucherId: string) => {
          setVoucherToView(voucherId);
          setViewModalOpen(true);
        },
        setVoucherToDelete,
        setDeleteDialogOpen,
        sortBy,
        sortOrder,
        handleSort: (column: "created_at" | "title") => {
          if (sortBy === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
          } else {
            setSortBy(column);
            setSortOrder("asc");
          }
          setPage(1); // reset page
        },
      }),
    [sortBy, sortOrder]
  );

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, page, sortBy, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(adminTotal / ENV.PAGE_SIZE));

  return (
    <div className="container lg:p-4 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="lg:space-y-4 space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Vouchers
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Manage all vouchers in the system.
          </p>
        </div>

        <Button
          onClick={() => {
            setModalOpen(true);
            setEditingVoucher(null);
          }}
        >
          Add Voucher
        </Button>
      </div>

      <DataTable
        onSearch={setSearch}
        columns={columns}
        data={adminVouchers}
        loading={adminLoading}
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(p - 1, 1))}
        onNext={() => setPage((p) => Math.min(p + 1, totalPages))}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Voucher?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this voucher? This action cannot
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

      <VoucherModal
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        initialData={editingVoucher}
        onSubmit={handleSubmitVoucher}
        onSuccess={() => {}}
      />

      <VoucherClaimModal
        isOpen={viewModalOpen}
        setIsOpen={setViewModalOpen}
        voucherId={voucherToView}
      />
    </div>
  );
}
