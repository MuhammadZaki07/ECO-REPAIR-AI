import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Leaf, Package, Truck, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/hooks/context/AuthContext";
import { useMerch, useMerchOrders } from "@/hooks/useMerchandise";
import { useEcoWallet } from "@/hooks/useEcoWallet";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDebounce } from "@/hooks/useDebounce";
import type { UIMerch } from "@/types/merchandise";
import {
  merchOrderSchema,
  type MerchOrderForm,
} from "@/schemas/merchOrderSchema";
import { Pagination } from "@/components/ui/pagination";
import { DynamicSkeleton } from "@/components/skeletons";

export default function MerchTab({ search }: { search: string }) {
  const { userData } = useAuthContext();
  const debouncedSearch = useDebounce(search, 1000);
  const [page, setPage] = useState(1);

  const {
    merch,
    loading: merchLoading,
    refetch,
    pages,
  } = useMerch(debouncedSearch, page);
  const {
    orders,
    orderMerch,
    loading: ordersLoading,
  } = useMerchOrders(userData?.id, debouncedSearch, page);
  const { balance: userBalance } = useEcoWallet(userData?.id);
  const { toast } = useToast();
  const [merchDialogOpen, setMerchDialogOpen] = useState(false);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [selectedMerch, setSelectedMerch] = useState<UIMerch | null>(null);
  const [merchStep, setMerchStep] = useState<0 | 1 | 2>(0);
  const [shippingProgress, setShippingProgress] = useState(0);
  const [hasToasted, setHasToasted] = useState(false);

  const form = useForm<MerchOrderForm>({
    resolver: zodResolver(merchOrderSchema),
    defaultValues: { phone: "", address: "", note: "" },
  });

  const handleOrderClick = (item: UIMerch) => {
    setSelectedMerch(item);
    setOrderDialogOpen(true);
    form.reset();
  };

  const handleInfoClick = (item: UIMerch) => {
    setSelectedMerch(item);
    setMerchDialogOpen(true);
  };

  const confirmOrder = async (data: MerchOrderForm) => {
    if (!selectedMerch || !userData) return;
    try {
      await orderMerch(selectedMerch.id, data.address, data.note || "");
      setOrderDialogOpen(false);
      startMerchSimulation();
    } catch {
      toast({ title: "Error", description: "Failed to order merchandise" });
    }
  };

  const startMerchSimulation = () => {
    setMerchStep(1);
    setShippingProgress(0);
    setHasToasted(false);
    refetch();
    const interval = setInterval(() => {
      setShippingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setMerchStep(2);
          return 100;
        }
        return prev + 2;
      });
    }, 120);
  };

  const filteredMerch: UIMerch[] = merch.map((m) => ({
    ...m,
    hasClaimed: orders.some((o) => o.merchandise_id === m.id),
  }));

  if (merchLoading || ordersLoading) {
    return (
      <DynamicSkeleton
        preset="CARD_GRID"
        count={3}
        className="w-full space-y-4 grid grid-cols-3 gap-2"
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMerch.map((item) => (
          <Card
            key={item.id}
            className="group relative overflow-hidden border-none"
          >
            <CardContent className="space-y-4">
              <div className="absolute top-7 right-8 z-10">
                <Badge variant="outline">{item.stock} in stock</Badge>
              </div>
              <div className="relative h-48 bg-muted/30 rounded-2xl flex items-center justify-center text-6xl">
                IMG
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-lg">{item.title}</h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Leaf className="w-3.5 h-3.5 text-green-500" />
                  <span>{item.eco_impact}</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold">
                    {item.cost_eco_coin}
                  </span>
                  <span className="text-sm text-muted-foreground">EC</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => handleInfoClick(item)}>
                  View Details
                </Button>
                {item.hasClaimed ? (
                  <Badge variant="secondary">Claimed</Badge>
                ) : (
                  <Button
                    onClick={() => handleOrderClick(item)}
                    disabled={
                      userBalance < item.cost_eco_coin ||
                      item.stock <= 0 ||
                      item.hasClaimed
                    }
                  >
                    Order Now
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Pagination currentPage={page} totalPages={pages} onChange={setPage} />
      </div>

      <Dialog open={merchDialogOpen} onOpenChange={setMerchDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedMerch?.title}</DialogTitle>
            <DialogDescription>Product details & eco impact</DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            {selectedMerch?.description}
          </p>
          <Alert className="border-green-500/30 bg-green-500/5">
            <Leaf className="h-4 w-4 text-green-500" />
            <AlertDescription>{selectedMerch?.eco_impact}</AlertDescription>
          </Alert>
          <Button
            className="w-full"
            onClick={() => {
              setMerchDialogOpen(false);
              setOrderDialogOpen(true);
              form.reset();
            }}
            disabled={
              selectedMerch
                ? userBalance < selectedMerch.cost_eco_coin ||
                  selectedMerch.hasClaimed
                : true
            }
          >
            Proceed to Order
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={orderDialogOpen} onOpenChange={setOrderDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Complete Your Order</DialogTitle>
            <DialogDescription>Add shipping info & notes</DialogDescription>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(confirmOrder)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label>Your Phone</Label>
              <Input {...form.register("phone")} placeholder="085xxxxxxx" />
              {form.formState.errors.phone && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.phone.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Your Address</Label>
              <Textarea
                {...form.register("address")}
                className="min-h-[100px]"
              />
              {form.formState.errors.address && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.address.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>
                Note <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Textarea {...form.register("note")} placeholder="e.g. size XL" />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                <Package className="w-4 h-4 mr-2" /> Confirm & Ship
              </Button>
              <Button
                variant="outline"
                onClick={() => setOrderDialogOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {merchStep > 0 && (
        <Dialog open onOpenChange={() => setMerchStep(0)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {merchStep === 1 ? (
                  <>
                    <Truck strokeWidth={1} className="text-green-500" />{" "}
                    Shipping in Progress
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="text-green-500" /> Order Completed
                  </>
                )}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {merchStep === 1 ? (
                <>
                  <Progress value={shippingProgress} />
                  <p className="text-sm text-center text-muted-foreground">
                    {shippingProgress}%
                  </p>
                </>
              ) : (
                <Alert className="bg-green-500/10">
                  <AlertDescription>
                    Thank you! Your order has been shipped
                  </AlertDescription>
                </Alert>
              )}
            </div>
            {merchStep === 2 && (
              <Button
                className="w-full"
                onClick={() => {
                  setMerchStep(0);
                  setHasToasted(false);
                }}
              >
                Close
              </Button>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
