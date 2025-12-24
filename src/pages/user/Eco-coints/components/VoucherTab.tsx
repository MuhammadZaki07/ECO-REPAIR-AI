import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { LiquidButton } from "@/components/liquid-glass-button";
import { useVouchers } from "@/hooks/useVouchers";
import { useAuth } from "@/hooks/useAuth";

/** ======================
 *  UI TYPE
 *  ====================== */
interface UIVoucher {
  id: string;
  title: string;
  cost: number;
  type: string;
  voucherCode?: string | null;
}

export default function VoucherTab({ search }: { search: string }) {
  const { user } = useAuth();
  const { vouchers, claimVoucher, claimingId } = useVouchers(user?.id);

  const [voucherDialogOpen, setVoucherDialogOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] =
    useState<UIVoucher | null>(null);
  const [copied, setCopied] = useState(false);

  /** ======================
   *  MAP DB → UI
   *  ====================== */
  const uiVouchers: UIVoucher[] = vouchers
    .map((v) => ({
      id: v.id,
      title: v.title,
      cost: v.eco_coin_cost,
      type: v.provider ?? "Digital",
      voucherCode: v.voucher_code,
    }))
    .filter((v) =>
      v.title.toLowerCase().includes(search.toLowerCase())
    );

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClaim = async (voucher: UIVoucher) => {
    const code = await claimVoucher(voucher.id);

    setSelectedVoucher({
      ...voucher,
      voucherCode: code,
    });

    setVoucherDialogOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {uiVouchers.map((item) => (
          <Card key={item.id} className="group relative overflow-hidden p-0">
            <CardContent className="flex items-stretch p-0 h-32">
              <div className="w-28 flex items-center justify-center bg-muted/20">
                <Ticket className="w-12 h-12" strokeWidth={1} />
              </div>

              <div className="flex-1 flex flex-col justify-between py-3 px-4">
                {/* HEADER */}
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold">{item.title}</h4>

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
                              <strong>Type:</strong> {item.type}
                            </p>
                            <p>
                              <strong>Cost:</strong> {item.cost} EC
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Voucher hanya bisa diklaim sekali.
                            </p>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogCancel>Close</AlertDialogCancel>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>

                  <Badge variant="outline" className="text-[10px] uppercase mt-1">
                    {item.type}
                  </Badge>
                </div>

                {/* FOOTER */}
                <div className="flex items-end justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold">{item.cost}</span>
                    <span className="text-xs text-muted-foreground">EC</span>
                  </div>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <LiquidButton
                        size="sm"
                        disabled={claimingId === item.id}
                      >
                        {claimingId === item.id ? "Claiming..." : "Claim"}
                      </LiquidButton>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Confirm Voucher Claim
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Claim{" "}
                          <strong className="text-emerald-500">
                            {item.title}
                          </strong>{" "}
                          for{" "}
                          <strong className="text-emerald-500">
                            {item.cost} EC
                          </strong>
                          ?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="mt-4 flex justify-end gap-2">
                        <Button onClick={() => handleClaim(item)}>
                          Yes, Claim
                        </Button>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                      </div>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* SUCCESS DIALOG */}
      <Dialog open={voucherDialogOpen} onOpenChange={setVoucherDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Voucher Claimed
            </DialogTitle>
            <DialogDescription>
              Copy your voucher code below
            </DialogDescription>
          </DialogHeader>

          {selectedVoucher?.voucherCode && (
            <div className="space-y-4">
              <div className="relative">
                <Input
                  value={selectedVoucher.voucherCode}
                  readOnly
                  className="text-center font-mono tracking-widest pr-10"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                  onClick={() =>
                    handleCopy(selectedVoucher.voucherCode!)
                  }
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>

              <Button
                className="w-full"
                onClick={() =>
                  handleCopy(selectedVoucher.voucherCode!)
                }
              >
                {copied ? "Copied!" : "Copy Code"}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Code expires in 24 hours
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
