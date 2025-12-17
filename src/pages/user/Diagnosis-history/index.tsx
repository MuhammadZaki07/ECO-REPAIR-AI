import React, { useMemo, useState } from "react";
import { useDiagnosisHistory } from "@/hooks/useDiagnosis";
import { AlertTriangle, Clock, FolderOpen, Search, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteDiagnosis } from "@/services/diagnosis/diagnosisService";

const PAGE_SIZE = 6;

const SkeletonCard = () => (
  <Card className="rounded-2xl">
    <CardHeader className="space-y-2">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </CardHeader>
    <CardContent className="space-y-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-2/3" />
    </CardContent>
  </Card>
);

const DiagnosisHistoryPage: React.FC = () => {
  const { toast } = useToast();
  const { data = [], isLoading, error, refetch } = useDiagnosisHistory();

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const [open, setOpen] = useState(false);
  const [targetId, setTargetId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filteredRecords = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return data.filter((r) =>
      [r.title, r.user_input, r.summary].some((text) =>
        text.toLowerCase().includes(q)
      )
    );
  }, [data, searchTerm]);

  const totalPages = Math.ceil(filteredRecords.length / PAGE_SIZE);

  const paginatedRecords = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredRecords.slice(start, start + PAGE_SIZE);
  }, [filteredRecords, page]);

  const confirmDelete = async () => {
    if (!targetId) return;

    try {
      setDeleting(true);
      await deleteDiagnosis(targetId);
      await refetch();

      toast({
        title: "Riwayat dihapus",
        description: "Data berhasil dihapus",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Gagal menghapus",
      });
    } finally {
      setDeleting(false);
      setOpen(false);
      setTargetId(null);
    }
  };

  if (error) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center border rounded-2xl bg-red-50 text-red-700">
        <AlertTriangle className="h-6 w-6 mx-auto mb-3" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8 p-5">
        <div>
          <div className="flex items-center gap-3">
            <FolderOpen className="w-7 h-7 text-primary" />
            <h1 className="text-3xl font-bold">Riwayat Diagnosis</h1>
          </div>
          <p className="text-muted-foreground mt-3">
            Daftar seluruh diagnosis yang pernah Anda lakukan.
          </p>
        </div>

        <Input
          className="max-w-xs"
          placeholder="Cari diagnosis..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading &&
            Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}

          {!isLoading &&
            paginatedRecords.map((record) => (
              <Card key={record.id} className="relative rounded-2xl">
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-2 top-2 z-10 hover:text-destructive"
                  onClick={() => {
                    setTargetId(record.id);
                    setOpen(true);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>

                <Link to={`/user/history/${record.id}?question=${record.user_input}`} className="block">
                  <CardHeader>
                    <CardTitle className="pr-6">
                      {record.title}
                    </CardTitle>
                    <div className="flex items-center text-xs text-muted-foreground gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(record.date).toLocaleDateString("id-ID")}
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
            <div className="col-span-full text-center p-10 border rounded-2xl bg-secondary/30">
              <h1 className="text-2xl font-bold">Belum ada data</h1>
              <p className="text-muted-foreground mt-2">
                Kamu belum pernah melakukan diagnosis.
              </p>
            </div>
          )}

          {!isLoading && data.length > 0 && paginatedRecords.length === 0 && (
            <div className="col-span-full text-center p-10 border rounded-2xl bg-secondary/30">
              <Search className="w-6 h-6 mx-auto mb-3" />
              <h1 className="text-2xl font-bold">Data tidak ditemukan</h1>
              <p className="text-muted-foreground mt-2">
                Coba ubah kata kunci pencarian.
              </p>
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
            <DialogTitle>Hapus riwayat?</DialogTitle>
            <DialogDescription>
              Data ini akan dihapus permanen.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Batal
            </Button>
            <Button
              variant="destructive"
              disabled={deleting}
              onClick={confirmDelete}
            >
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DiagnosisHistoryPage;
