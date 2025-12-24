import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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

import { useRewards } from "@/hooks/useRewards";
import { useAuth } from "@/hooks/useAuth";

/** ======================
 *  UI TYPE
 *  ====================== */
interface UIMerch {
  id: string;
  title: string;
  cost: number;
  stock: number;
  description?: string;
  ecoImpact?: string;
}

export default function MerchTab({ search }: { search: string }) {
  const { user } = useAuth();
  const { rewards, loading } = useRewards("merchandise");

  const [merchDialogOpen, setMerchDialogOpen] = useState(false);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [selectedMerch, setSelectedMerch] = useState<UIMerch | null>(null);
  const [merchStep, setMerchStep] = useState<0 | 1 | 2>(0);
  const [merchNote, setMerchNote] = useState("");
  const [shippingProgress, setShippingProgress] = useState(0);

  /** ======================
   *  MAP DB → UI
   *  ====================== */
  const merchs: UIMerch[] = rewards
    .map((r) => ({
      id: r.id,
      title: r.title,
      cost: r.cost_eco_coin,
      stock: r.stock ?? 0,
      description: r.description,
      ecoImpact: "Eco-friendly product", // nanti bisa dari DB
    }))
    .filter((m) => m.title.toLowerCase().includes(search.toLowerCase()));

  /** ======================
   *  SHIPPING SIMULATION
   *  ====================== */
  const startMerchSimulation = () => {
    setOrderDialogOpen(false);
    setMerchDialogOpen(false);
    setMerchStep(1);
    setShippingProgress(0);

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

  const handleOrderClick = (item: UIMerch) => {
    setSelectedMerch(item);
    setOrderDialogOpen(true);
    setMerchNote("");
  };

  const handleInfoClick = (item: UIMerch) => {
    setSelectedMerch(item);
    setMerchDialogOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {merchs.map((item) => (
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
                  <Leaf className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{item.ecoImpact}</span>
                </div>

                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold">{item.cost}</span>
                  <span className="text-sm text-muted-foreground">EC</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => handleInfoClick(item)}>
                  View Details
                </Button>
                <Button onClick={() => handleOrderClick(item)}>
                  Order Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={merchDialogOpen} onOpenChange={setMerchDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedMerch?.title}</DialogTitle>
            <DialogDescription>Product details & eco impact</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {selectedMerch?.description}
            </p>

            <Alert className="border-emerald-500/30 bg-emerald-500/5">
              <Leaf className="h-4 w-4 text-emerald-500" />
              <AlertDescription>{selectedMerch?.ecoImpact}</AlertDescription>
            </Alert>

            <Button
              className="w-full"
              onClick={() => {
                setMerchDialogOpen(false);
                setOrderDialogOpen(true);
              }}
            >
              Proceed to Order
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={orderDialogOpen} onOpenChange={setOrderDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Complete Your Order</DialogTitle>
            <DialogDescription>Add shipping info & notes</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Your Phone</Label>
              <Input placeholder="085xxxxxxx" />
            </div>

            <div className="space-y-2">
              <Label>Your Address</Label>
              <Textarea placeholder="Full address" className="min-h-[100px]" />
            </div>

            <div className="space-y-2">
              <Label>
                Note <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Textarea
                value={merchNote}
                onChange={(e) => setMerchNote(e.target.value)}
                placeholder="e.g. size XL"
              />
            </div>

            <div className="flex gap-2">
              <Button className="flex-1" onClick={startMerchSimulation}>
                <Package className="w-4 h-4 mr-2" />
                Confirm & Ship
              </Button>
              <Button
                variant="outline"
                onClick={() => setOrderDialogOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {merchStep > 0 && (
        <Dialog open onOpenChange={() => setMerchStep(0)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {merchStep === 1 ? (
                  <>
                    <Truck className="animate-bounce text-emerald-500" />
                    Shipping in Progress
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="text-emerald-500" />
                    Order Completed
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
                <Alert className="bg-emerald-500/10">
                  <AlertDescription>
                    Order recorded on blockchain ✅
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {merchStep === 2 && (
              <Button className="w-full" onClick={() => setMerchStep(0)}>
                Close
              </Button>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
