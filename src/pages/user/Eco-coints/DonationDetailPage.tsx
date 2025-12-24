// DonationDetailPage.tsx
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/Card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Leaf, Users } from "lucide-react";

import { useAuthContext } from "@/hooks/context/AuthContext";
import { useDonationCampaigns } from "@/hooks/useDonationCampaigns";
import { useEcoWallet } from "@/hooks/useEcoWallet";
import { DonationService } from "@/services/DonationService";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { useDonationRecords } from "@/hooks/useDonationRecords";

export default function DonationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { userData } = useAuthContext();

  const { detail, fetchCampaigns, loading: detailLoading } = useDonationCampaigns();
  const { records, refetch: refetchRecords } = useDonationRecords(userData?.id);
  const { balance: userBalance } = useEcoWallet(userData?.id);

  useEffect(() => {
    if (id) fetchCampaigns(id);
  }, [id, fetchCampaigns]);

  const userHasDonated = () => records.some((r) => r.campaign_id === id);

  if (detailLoading || !detail) return <div className="p-6 text-center">Loading campaign...</div>;

  const progress = Math.min((detail.current_eco_coin / detail.goal_eco_coin) * 100, 100);
  const rupiah = detail.current_eco_coin * 1000;

  const handleDonateClick = async () => {
    const amount = 10;
    if ((userBalance ?? 0) < amount) return;

    await DonationService.donate(detail.id, userData?.id, amount);
    refetchRecords();
    fetchCampaignDetail(detail.id);
  };

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="flex justify-start">
        <Button className="mb-5" onClick={() => window.history.back()} variant="ghost">
          <ArrowLeft /> Back
        </Button>
      </div>

      <Card className="overflow-hidden mb-10 p-0">
        <div className="h-[360px] w-full bg-emerald-500/10 flex items-center justify-center text-7xl">IMG</div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Article */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-3">
            <Badge variant="outline" className="w-fit">
              <Leaf className="w-3 h-3 mr-1" />
              Eco Campaign
            </Badge>
            <h1 className="text-3xl font-bold leading-tight">{detail.title}</h1>
          </div>

          <article className="prose prose-neutral max-w-none text-muted-foreground">{detail.description}</article>

          {/* Donors */}
          <section className="pt-10 space-y-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-semibold">Donors ({detail.donors.length})</h3>
            </div>

            {detail.donors.length === 0 && <p className="text-sm text-muted-foreground">Be the first supporter 💚</p>}

            <div className="space-y-3">
              {detail.donors.map((d) => (
                <div key={d.id} className="flex items-center justify-between rounded-xl border p-4">
                  <div className="flex items-center gap-3">
                    <Avatar><AvatarFallback>{d.name[0]}</AvatarFallback></Avatar>
                    <span className="text-sm font-medium">{d.name}</span>
                  </div>
                  <span className="font-semibold text-emerald-600">{d.amount} EC</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 h-fit">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>{detail.current_eco_coin} / {detail.goal_eco_coin} EC</span>
                  <span className="font-semibold text-emerald-600">Rp {rupiah.toLocaleString("id-ID")}</span>
                </div>
              </div>

              {!userHasDonated() ? (
                <Button size="lg" className="w-full" onClick={handleDonateClick} disabled={(userBalance ?? 0) < 10}>
                  <Heart className="w-4 h-4 mr-2" /> Donate Now
                </Button>
              ) : (
                <Badge className="w-fit bg-emerald-500/10 text-emerald-600">You already donated 💚</Badge>
              )}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
