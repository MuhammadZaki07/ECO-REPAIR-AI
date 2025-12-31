import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useGuides } from "@/hooks/useGuides";
import { DataTable } from "@/components/ui/data-table";
import GuideModal from "./components/GuideModal";
import { Button } from "@/components/ui/button";
import type { Guide, GuideForm } from "@/types/Guide";
import { columns } from "./components/columns";
import { guideSchema } from "@/schemas/guideSchema";
import { useCategories } from "@/hooks/useCategories";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { slugify } from "@/utils/slugify";
import { ENV } from "@/env";
import { useDebounce } from "@/hooks/useDebounce";

export default function GuidesPage() {
  const { toast } = useToast();
  const { categories } = useCategories();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const debounceSearch = useDebounce(search, 500);
  const { guides, total, isLoading, createGuide, updateGuide, deleteGuide } =
    useGuides(debounceSearch, page, ENV.PAGE_SIZE);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingGuide, setEditingGuide] = useState<Guide | null>(null);
  const [deleteGuideData, setDeleteGuideData] = useState<Guide | null>(null);

  const handleSubmitGuide = async (form: GuideForm) => {
    try {
      guideSchema.parse(form);

      if (editingGuide) {
        await updateGuide({
          id: editingGuide.id,
          payload: form,
          oldImageUrl: editingGuide.image_url,
        });

        toast({
          title: "Guide updated",
          description: "Your changes have been saved successfully.",
        });
      } else {
        await createGuide(form);

        toast({
          title: "Guide created",
          description: "A new guide has been published and is ready to use.",
        });
      }

      setModalOpen(false);
      setEditingGuide(null);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!deleteGuideData) return;

    await deleteGuide({
      id: deleteGuideData.id,
      imageUrl: deleteGuideData.image_url,
    });

    toast({
      title: "Guide deleted",
      description: "The guide has been removed successfully.",
    });

    setDeleteGuideData(null);
    setDeleteDialogOpen(false);
  };

  const totalPages = Math.ceil(total / ENV.PAGE_SIZE);

  return (
    <div className="container lg:p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Guides
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            All your guides in one place. Create and keep them updated.
          </p>
        </div>

        <Button
          onClick={() => {
            setEditingGuide(null);
            setModalOpen(true);
          }}
        >
          Add Guide
        </Button>
      </div>

      <DataTable
        data={guides}
        loading={isLoading}
        page={page}
        totalPages={totalPages}
        onSearch={setSearch}
        onPrev={() => setPage((p) => Math.max(p - 1, 1))}
        onNext={() => setPage((p) => Math.min(p + 1, totalPages))}
        columns={columns(
          page,
          (guide) =>
            navigate(`/admin/guides/${guide.id}/${slugify(guide.title)}`),
          (guide) => {
            setEditingGuide({ ...guide, editable: true });
            setModalOpen(true);
          },
          setDeleteGuideData,
          setDeleteDialogOpen
        )}
      />

      <GuideModal
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        initialData={editingGuide}
        onSubmit={handleSubmitGuide}
        schema={guideSchema}
        categories={categories}
        onSuccess={() => {
          setModalOpen(false);
          setEditingGuide(null);
        }}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete guide?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The guide will be permanently
              removed.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
