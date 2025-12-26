import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Heart,
  Leaf,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Info,
} from "lucide-react";
import { LiquidButton } from "@/components/liquid-glass-button";
import { useDonation } from "@/hooks/useDonation";
import { useDebounce } from "@/hooks/useDebounce";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import type { EcoDonationCampaign } from "@/types/donations";
import { Link } from "react-router-dom";
import { DynamicSkeleton } from "@/components/skeletons";

export default function DonationTab({ search }: { search: string }) {
  const debouncedSearch = useDebounce(search, 500);

  const {
    campaigns = [],
    records = [],
    balance,
    donate,
    loading,
    totalPages,
    page,
    setPage,
  } = useDonation(debouncedSearch);

  const [donationDialogOpen, setDonationDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] =
    useState<EcoDonationCampaign | null>(null);
  const [donationAmount, setDonationAmount] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleDonateClick = (item: EcoDonationCampaign) => {
    setSelectedDonation(item);
    setDonationAmount("");
    setAgreedToTerms(false);
    setDonationDialogOpen(true);
  };

  const handleConfirmDonation = async () => {
    if (!selectedDonation || !donationAmount || !agreedToTerms) return;
    setSubmitting(true);
    try {
      await donate(selectedDonation.id, Number(donationAmount));
      setDonationDialogOpen(false);
      setSuccessDialogOpen(true);
    } finally {
      setSubmitting(false);
    }
  };

  const getProgress = (current: number, goal: number) =>
    Math.min((current / goal) * 100, 100);
  const userHasDonated = (id: string) =>
    records.some((r) => r.campaign_id === id);

  if (loading) {
    return (
      <DynamicSkeleton
        preset="CARD_GRID"
        count={3}
        className="w-full space-y-4 grid grid-cols-3 gap-2"
      />
    );
  }
  if (!campaigns.length) return <p>No campaigns found</p>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((item) => {
          const progress = getProgress(
            item.current_eco_coin,
            item.goal_eco_coin
          );
          const alreadyDonated = userHasDonated(item.id);
          return (
            <Card key={item.id}>
              <CardContent className="space-y-4">
                <div className="h-32 rounded-2xl bg-muted/30 flex items-center justify-center text-5xl">
                  IMG
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Link to={`/user/ecocoin/donation/${item.id}`}>
                      <h4 className="font-bold text-lg hover:underline">
                        {item.title}
                      </h4>
                    </Link>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setSelectedDonation(item);
                        setInfoDialogOpen(true);
                      }}
                    >
                      <Info className="w-4 h-4" />
                    </Button>
                  </div>
                  <Badge variant="outline" className="text-[10px] w-fit">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Impact Driven
                  </Badge>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold">
                        {item.current_eco_coin} / {item.goal_eco_coin} EC
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <TrendingUp className="w-3.5 h-3.5 text-green-500" />{" "}
                      {progress.toFixed(0)}% funded
                    </div>
                  </div>
                </div>

                {alreadyDonated ? (
                  <Badge variant="secondary">You already donated</Badge>
                ) : (
                  <LiquidButton
                    size="xl"
                    className="w-full"
                    onClick={() => handleDonateClick(item)}
                  >
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4 mr-2" /> Donate Now
                    </span>
                  </LiquidButton>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {!loading && totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <Pagination>
            <PaginationContent>
              {Array.from({ length: totalPages }).map((_, i) => (
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

      <Dialog open={infoDialogOpen} onOpenChange={setInfoDialogOpen}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>{selectedDonation?.title}</DialogTitle>
            <DialogDescription>Campaign info & impact</DialogDescription>
          </DialogHeader>
          <Alert className="bg-green-500/5">
            <Leaf className="h-4 w-4 text-green-500" />
            <AlertDescription>
              Impact: 1 EC = Real environmental impact
            </AlertDescription>
          </Alert>
          <p className="text-sm text-muted-foreground">
            {selectedDonation?.description}
          </p>
        </DialogContent>
      </Dialog>

      <Dialog open={donationDialogOpen} onOpenChange={setDonationDialogOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Make a Donation</DialogTitle>
            <DialogDescription>
              Support {selectedDonation?.title}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Label>Donation Amount (EC)</Label>
            <Input
              type="number"
              min={10}
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              1 EC = Rp 1.000 • Min 10 EC • Your balance: {balance} EC
            </p>

            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <Checkbox
                checked={agreedToTerms}
                id="check"
                onCheckedChange={(v) => setAgreedToTerms(!!v)}
              />
              <Label htmlFor="check" className="text-sm">
                I agree that this donation will be securely recorded
              </Label>
            </div>

            <div className="flex gap-2">
              <Button
                className="flex-1"
                disabled={
                  submitting ||
                  !donationAmount ||
                  !agreedToTerms ||
                  Number(donationAmount) < 10 ||
                  (balance ?? 0) < Number(donationAmount)
                }
                onClick={handleConfirmDonation}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" /> Confirm Donation
              </Button>
              <Button
                variant="outline"
                onClick={() => setDonationDialogOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent className="sm:max-w-[400px] text-center">
          <div className="space-y-4 py-4">
            <CheckCircle2 strokeWidth={1} className="w-20 h-20 mx-auto" />
            <DialogHeader>
              <DialogTitle className="text-center">
                Donation Successful
              </DialogTitle>
              <DialogDescription className="text-center">
                Thank you for making a difference
              </DialogDescription>
            </DialogHeader>
            <p className="text-xl font-mono text-green-500">
              {donationAmount} EC
            </p>
            <Button
              className="w-full"
              onClick={() => setSuccessDialogOpen(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
