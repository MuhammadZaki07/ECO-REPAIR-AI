import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Ticket, Info, Copy, Check } from "lucide-react";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

import { Input } from "@/components/ui/input";
import { LiquidButton } from "@/components/liquid-glass-button";
import { useVouchers } from "@/hooks/useVouchers";
import { useAuthContext } from "@/hooks/context/AuthContext";
import { useDebounce } from "@/hooks/useDebounce";
import { useToast } from "@/hooks/use-toast";

export default function VoucherTab({ search }: { search: string }) {
  const { userData } = useAuthContext();
  const [page, setPage] = useState(1);
  const { toast } = useToast();

  const debouncedSearch = useDebounce(search);

  const {
    vouchers,
    loading,
    claimingId,
    canClaim,
    claimVoucher,
    isEmpty,
    pages,
  } = useVouchers(userData?.id, debouncedSearch, page);

  const [voucherDialogOpen, setVoucherDialogOpen] = useState(false);
  const [selectedVoucherCode, setSelectedVoucherCode] = useState<string | null>(
    null
  );
  const [copied, setCopied] = useState(false);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClaim = async (voucherId: string) => {
    const result = await claimVoucher(voucherId);
    setSelectedVoucherCode(result.voucher_code);
    setVoucherDialogOpen(true);
    toast({
      title: "Voucher claimed",
      description: "Your voucher code is ready to use.",
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}

        {!loading && isEmpty && !debouncedSearch && (
          <div className="col-span-full py-20 text-center text-muted-foreground">
            Belum ada voucher
          </div>
        )}

        {!loading && isEmpty && debouncedSearch && (
          <div className="col-span-full py-20 text-center text-muted-foreground">
            Voucher tidak ditemukan
          </div>
        )}

        {!loading &&
          vouchers.map((v) => {
            const isMine = v.claimed_by === userData?.id;

            return (
              <Card key={v.id} className="group relative overflow-hidden p-0">
                <CardContent className="flex items-stretch p-0 h-32">
                  <div className="w-28 flex items-center justify-center bg-muted/20">
                    <Ticket className="w-12 h-12" strokeWidth={1} />
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-3 px-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-bold">{v.title}</h4>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Info className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Voucher Information
                              </AlertDialogTitle>
                              <AlertDialogDescription className="space-y-2">
                                <p>
                                  <strong>Type:</strong>{" "}
                                  {v.provider ?? "Digital"}
                                </p>
                                <p>
                                  <strong>Cost:</strong> {v.eco_coin_cost} EC
                                </p>
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogCancel>Close</AlertDialogCancel>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>

                      <Badge
                        variant="outline"
                        className="text-[10px] uppercase mt-1"
                      >
                        {v.provider ?? "Digital"}
                      </Badge>
                    </div>

                    <div className="flex items-end justify-between">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold">
                          {v.eco_coin_cost}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          EC
                        </span>
                      </div>

                      {isMine ? (
                        <div className="flex flex-col items-end gap-2">
                          <Badge>
                            Claimed
                          </Badge>
                          {v.voucher_code && (
                            <span className="text-xs font-mono text-muted-foreground">
                              {v.voucher_code}
                            </span>
                          )}
                        </div>
                      ) : (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <LiquidButton
                              size="sm"
                              disabled={
                                !canClaim(v.eco_coin_cost, v.id) ||
                                claimingId === v.id
                              }
                            >
                              {claimingId === v.id ? "Claiming..." : "Claim"}
                            </LiquidButton>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Confirm Voucher Claim
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Claim{" "}
                                <strong className="text-green-500">
                                  {v.title}
                                </strong>{" "}
                                for{" "}
                                <strong className="text-green-500">
                                  {v.eco_coin_cost} EC
                                </strong>
                                ?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className="mt-4 flex justify-end gap-2">
                              <Button onClick={() => handleClaim(v.id)}>
                                Yes, Claim
                              </Button>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                            </div>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
      </div>

      {!loading && pages > 1 && (
        <div className="mt-10 flex justify-center">
          <Pagination>
            <PaginationContent>
              {Array.from({ length: pages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={page === i + 1}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <Dialog open={voucherDialogOpen} onOpenChange={setVoucherDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Voucher Claimed
            </DialogTitle>
            <DialogDescription>Copy your voucher code below</DialogDescription>
          </DialogHeader>

          {selectedVoucherCode && (
            <div className="space-y-4">
              <div className="relative">
                <Input
                  value={selectedVoucherCode}
                  readOnly
                  className="text-center font-mono tracking-widest pr-10"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                  onClick={() => handleCopy(selectedVoucherCode)}
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>

              <Button
                className="w-full"
                onClick={() => handleCopy(selectedVoucherCode)}
              >
                {copied ? "Copied!" : "Copy Code"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
