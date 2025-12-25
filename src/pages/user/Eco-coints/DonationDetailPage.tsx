import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/Card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Heart,
  Leaf,
  Users,
  Calendar,
  Share2,
  CheckCircle2,
} from "lucide-react";
import { useDonationDetail } from "@/hooks/useDonationDetail";
import { formatDateID } from "@/utils/date";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";

export default function DonationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { detail, balance, donate, userHasDonated, loading } =
    useDonationDetail(id);

  if (loading || !detail)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading campaign...</p>
        </div>
      </div>
    );

  const progress = Math.min(
    (detail.current_eco_coin / detail.goal_eco_coin) * 100,
    100
  );
  const rupiah = detail.current_eco_coin * 1000;
  const goalRupiah = detail.goal_eco_coin * 1000;
  const remainingEC = detail.goal_eco_coin - detail.current_eco_coin;

  const handleDonateClick = async () => {
    const amount = 10;
    if ((balance ?? 0) < amount) return;
    await donate(amount);
  };

  const handleShareClick = () => {
    const shareData = {
      title: detail?.title || "Eco Campaign",
      text: `Check out this campaign: ${detail?.title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("Campaign shared successfully"))
        .catch((err) => console.error("Share failed:", err));
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="h-screen px-4 sm:px-3 lg:px-4 py-6 sm:py-8">
      <div className="flex items-center justify-between mb-6">
        <Button onClick={() => window.history.back()} variant="ghost">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Back to Campaigns</span>
          <span className="sm:hidden">Back</span>
        </Button>

        <Button
          onClick={handleShareClick}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Share</span>
        </Button>
      </div>

      <Card className="overflow-hidden mb-8 border-0">
        <div className="relative h-[280px] sm:h-[360px] lg:h-[420px] w-fulL flex items-center justify-center">
          <div className="relative z-10 text-center text-white space-y-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto border-4 border-white/30">
              <Leaf className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>
            <Badge className="bg-white/90 text-green-700 hover:bg-white border-0">
              <Leaf className="w-3 h-3 mr-1" />
              Eco Campaign
            </Badge>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                {detail.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Started {formatDateID(detail.created_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{detail.donors?.length || 0} Supporters</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="prose prose-lg prose-neutral max-w-none">
              <p className="text-base sm:text-lg leading-relaxed">
                {detail.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Raised
                    </p>
                    <p className="text-2xl font-bold">
                      {detail.current_eco_coin} EC
                    </p>
                    <p className="text-xs mt-1">
                      Rp {rupiah.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Goal
                    </p>
                    <p className="text-2xl font-bold">
                      {detail.goal_eco_coin} EC
                    </p>
                    <p className="text-xs mt-1">
                      Rp {goalRupiah.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Remaining
                    </p>
                    <p className="text-2xl font-bold">{remainingEC} EC</p>
                    <p className="text-xs mt-1">
                      {progress.toFixed(1)}% Complete
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-100">
                  Our Supporters
                </h2>
                <p className="text-sm text-muted-foreground">
                  {detail.donors?.length || 0} amazing people supporting this
                  cause
                </p>
              </div>
            </div>

            {detail.donors?.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Heart className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    Be the First Supporter
                  </h3>
                  <p className="text-muted-foreground">
                    Start the momentum and inspire others to join this eco
                    campaign
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {detail.donors.map((donor) => (
                  <Card key={donor.id} className="w-full">
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-14 w-14 ring-2">
                          {donor.avatar_url ? (
                            <AvatarImage
                              loading="lazy"
                              src={donor.avatar_url}
                              alt={donor.username ?? "unknown"}
                            />
                          ) : (
                            <AvatarFallback className="text-lg bg-green-100 text-green-700">
                              {donor.username?.[0] ?? "U"}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">
                            {donor.username}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-sm font-medium">
                              {donor.amount} EC
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Rp {(donor.amount * 1000).toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 h-fit">
          <Card className="border-0 shadow-xl overflow-hidden pt-0">
            <div className="bg-green-500 p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Campaign Progress</h3>
              <p className="text-green-50 text-sm">Help us reach our goal</p>
            </div>

            <CardContent className="p-6 space-y-6">
              <div className="space-y-3">
                <Progress value={progress} className="h-3" />
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-2xl font-bold text-green-600">
                      {detail.current_eco_coin} EC
                    </p>
                    <p className="text-xs text-muted-foreground">
                      of {detail.goal_eco_coin} EC goal
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      Rp {rupiah.toLocaleString("id-ID")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {progress.toFixed(1)}% funded
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Your Balance</span>
                  <span className="font-semibold">{balance ?? 0} EC</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Donation Amount</span>
                  <span className="font-semibold text-green-600">10 EC</span>
                </div>
              </div>

              {userHasDonated() ? (
                <Card className="text-center">
                  <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold">Thank You!</p>
                  <p className="text-sm mt-1">
                    You've already supported this campaign
                  </p>
                </Card>
              ) : (
                <Button
                  size="lg"
                  variant={"default"}
                  className="w-full"
                  onClick={handleDonateClick}
                  disabled={(balance ?? 0) < 10}
                >
                  <Heart className="w-5 h-5 mr-2 fill-white" />
                  Donate 10 EC Now
                </Button>
              )}

              {(balance ?? 0) < 10 && !userHasDonated() && (
                <p className="text-xs text-center text-amber-600 bg-amber-50 p-3 rounded-lg">
                  Insufficient balance. You need at least 10 EC to donate.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-black">
            <CardContent className="space-y-3">
              <h4 className="font-semibold text-green-500 flex items-center gap-2">
                <Leaf className="w-4 h-4" />
                Why Support This?
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>100% of donations go to the project</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Transparent fund management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Make a real environmental impact</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
