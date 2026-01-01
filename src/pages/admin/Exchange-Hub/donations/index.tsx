import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useDonation } from "@/hooks/useDonation";
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
import DonationCampaignModal from "./components/DonationCampaignModal";
import { getDonationCampaignColumns } from "./components/columns";
import { donationCampaignSchema } from "@/schemas/donationCampaignSchema";
import DonationDetailModal from "./components/DonationDetailModal";

export default function DonationPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [viewModalCampaign, setViewModalCampaign] = useState<string | null>(
    null
  );
  const [viewModalOpen, setViewModalOpen] = useState(false);

  useEffect(() => {
    if (viewModalCampaign) setViewModalOpen(true);
  }, [viewModalCampaign]);

  const { toast } = useToast();

  const {
    campaigns,
    balance,
    loading,
    error,
    totalPages,
    setPage: setHookPage,
    setSearch: setHookSearch,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    createCampaign,
    updateCampaign,
    deleteCampaign,
  } = useDonation(debouncedSearch, page);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<any>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!campaignToDelete) return;
    try {
      await deleteCampaign(campaignToDelete);
      setDeleteDialogOpen(false);
      setCampaignToDelete(null);
      toast({
        title: "Deleted",
        description: "Donation campaign has been deleted successfully.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete campaign.",
        variant: "destructive",
      });
    }
  };

  const handleSubmitCampaign = async (data: any) => {
    try {
      if (editingCampaign) {
        await updateCampaign({
          campaignId: editingCampaign.id,
          payload: data,
        });

        toast({
          title: "Campaign updated",
          description: "Donation campaign updated successfully.",
        });
      } else {
        await createCampaign(data);

        toast({
          title: "Campaign created",
          description: "Donation campaign created successfully.",
        });
      }

      setModalOpen(false);
      setEditingCampaign(null);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.message ?? "Failed to save campaign.",
        variant: "destructive",
      });
    }
  };

  const columns = useMemo(
    () =>
      getDonationCampaignColumns({
        page,
        ENV,
        openEditModal: (campaign) => {
          setEditingCampaign(campaign);
          setModalOpen(true);
        },
        setCampaignToDelete,
        setDeleteDialogOpen,
        setViewModalCampaign,
        sortBy,
        sortOrder,
        handleSort: (column: "created_at" | "title") => {
          if (sortBy === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
          } else {
            setSortBy(column);
            setSortOrder("asc");
          }
          setPage(1);
          setHookPage(1);
        },
      }),
    [
      page,
      sortBy,
      sortOrder,
      setSortBy,
      setSortOrder,
      setPage,
      setHookPage,
      setEditingCampaign,
      setModalOpen,
      setCampaignToDelete,
      setDeleteDialogOpen,
    ]
  );

  useEffect(() => {
    setPage(1);
    setHookPage(1);
    setHookSearch(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="container lg:p-4 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="lg:space-y-4 space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Donation Campaigns
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Manage all donation campaigns in the system.
          </p>
        </div>

        <Button
          onClick={() => {
            setModalOpen(true);
            setEditingCampaign(null);
          }}
        >
          Add Campaign
        </Button>
      </div>

      <DataTable
        onSearch={setSearch}
        columns={columns}
        data={campaigns}
        loading={loading}
        page={page}
        totalPages={totalPages}
        onPrev={() => {
          setPage((p) => Math.max(p - 1, 1));
          setHookPage((p) => Math.max(p - 1, 1));
        }}
        onNext={() => {
          setPage((p) => Math.min(p + 1, totalPages));
          setHookPage((p) => Math.min(p + 1, totalPages));
        }}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Campaign?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this donation campaign? This
              action cannot be undone.
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

      <DonationCampaignModal
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        initialData={editingCampaign}
        onSubmit={handleSubmitCampaign}
        schema={donationCampaignSchema}
        onSuccess={() => {}}
      />

      <DonationDetailModal
        campaignId={viewModalCampaign ?? undefined}
        isOpen={viewModalOpen}
        setIsOpen={(open) => {
          setViewModalOpen(open);
          if (!open) setViewModalCampaign(null);
        }}
      />
    </div>
  );
}
