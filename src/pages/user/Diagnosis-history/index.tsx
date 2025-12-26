import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, FolderOpen, Search, Trash2 } from "lucide-react";

import { useAuthContext } from "@/hooks/context/AuthContext";
import { useDeleteDiagnosis, useDiagnosisHistory } from "@/hooks/useDiagnosis";
import { useToast } from "@/hooks/use-toast";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DynamicSkeleton } from "@/components/skeletons";
import { EmptyState } from "@/components/state/EmptyState";
import { ErrorState } from "@/components/state/ErrorState";
import { ENV } from "@/env";
import { useDebounce } from "@/hooks/useDebounce";

const DiagnosisHistoryPage: React.FC = () => {
  const { user } = useAuthContext();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 1000);

  const {
  data,
  isLoading,
  error,
  page,
  setPage,
  total,
  refetch
} = useDiagnosisHistory({
  userId: user?.id ?? "",
  pageSize: ENV.PAGE_SIZE,
  search: debouncedSearch,
});

  const totalPages = Math.ceil(total / ENV.PAGE_SIZE);

  const { remove, isDeleting } = useDeleteDiagnosis();
  const [open, setOpen] = useState(false);
  const [targetId, setTargetId] = useState<string | null>(null);

  const confirmDelete = async () => {
    if (!targetId) return;

    try {
      await remove(targetId);
      await refetch();

      toast({
        title: "History deleted",
        description: "Diagnosis history removed successfully",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setOpen(false);
      setTargetId(null);
    }
  };

  if (error) {
    return (
      <ErrorState
        title="Something went wrong"
        description={error}
        actionLabel="Try again"
        onAction={refetch}
      />
    );
  }

  return (
    <>
      <div className="space-y-8 lg:p-5">
        <div>
          <div className="flex items-center gap-3">
            <FolderOpen className="w-7 h-7 text-primary" />
            <h1 className="text-3xl font-bold">Diagnosis History</h1>
          </div>
          <p className="text-muted-foreground mt-3">
            A record of all diagnoses you have created.
          </p>
        </div>

        <Input
          className="max-w-xs bg-background"
          placeholder="Search diagnosis..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        {isLoading && (
          <DynamicSkeleton
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            preset="CARD_GRID"
            count={ENV.PAGE_SIZE}
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {!isLoading &&
            data.map((record) => (
              <Card key={record.id} className="relative rounded-2xl">
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-2 top-3 z-10 hover:text-destructive"
                  onClick={() => {
                    setTargetId(record.id);
                    setOpen(true);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>

                <Link
                  to={`/user/history/${record.id}`}
                  className="block"
                >
                  <CardHeader className="mb-3">
                    <CardTitle className="pr-6">{record.title}</CardTitle>
                    <div className="flex items-center text-xs text-muted-foreground gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(record.date).toLocaleDateString("en-US")}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-2 text-sm">
                    <p className="italic line-clamp-3">“{record.user_input}”</p>
                    <p className="font-medium line-clamp-2">{record.summary}</p>
                  </CardContent>
                </Link>
              </Card>
            ))}

          {!isLoading && data.length === 0 && (
            <div className="col-span-full">
              <EmptyState
                icon={<Search className="w-6 h-6" />}
                title="No history found"
                description="Try a different keyword or create a new diagnosis."
              />
            </div>
          )}
        </div>

        {!isLoading && totalPages > 1 && (
          <div className="flex justify-end gap-5 items-center">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </Button>
            <span className="text-sm text-muted-foreground">
              {page} / {totalPages}
            </span>
            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete history?</DialogTitle>
            <DialogDescription>
              This diagnosis history will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={isDeleting}
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DiagnosisHistoryPage;
