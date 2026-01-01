import { useDonationDetail } from "@/hooks/useDonationDetail";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  Target,
  TrendingUp,
  Users,
  Coins,
  Trophy,
  X,
} from "lucide-react";
import { ErrorState } from "@/components/state/ErrorState";
import { EmptyState } from "@/components/state/EmptyState";

type DonationDetailModalProps = {
  campaignId?: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export default function DonationDetailModal({
  campaignId,
  isOpen,
  setIsOpen,
}: DonationDetailModalProps) {
  const { detail, loading, error } = useDonationDetail(campaignId);

  const progress = detail
    ? Math.min(
        100,
        Math.floor((detail.current_eco_coin / detail.goal_eco_coin) * 100)
      )
    : 0;

  const topDonors = detail?.donors
    ? [...detail.donors].sort((a, b) => b.amount - a.amount).slice(0, 3)
    : [];

  const LoadingSkeleton = () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-20 w-full" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-8 w-20" />
          </div>
        ))}
      </div>
    </div>
  );

  const getTrophyIcon = (rank: number) => {
    const colors = ["text-yellow-500", "text-gray-400", "text-amber-700"];
    return <Trophy className={`h-5 w-5 ${colors[rank - 1]} fill-current`} />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] lg:max-w-3xl p-0 gap-0 overflow-hidden max-h-[90vh]">
        <div className="relative p-6 border-b">
          <DialogHeader className="space-y-3">
            <div className="flex items-center gap-3">
              <DialogTitle className="text-2xl font-bold">
                {loading
                  ? "Loading Campaign..."
                  : detail?.title ?? "Donation Campaign"}
              </DialogTitle>
            </div>
          </DialogHeader>
        </div>

        <ScrollArea className="max-h-[calc(90vh-180px)]">
          <div className="p-6 space-y-6">
            {error && (
              <ErrorState
                title="Something went wrong"
                description="We couldn’t load the donation campaign details. Please try again."
                actionLabel="Try again"
                onAction={() => window.location.reload()}
              />
            )}

            {loading ? (
              <LoadingSkeleton />
            ) : (
              detail && (
                <>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">About Campaign</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {detail.description}
                    </p>
                  </div>

                  <Separator />

                  <Card className="overflow-hidden">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              Donation Progress
                            </p>
                            <p className="text-2xl font-bold">{progress}%</p>
                          </div>
                        </div>

                        <Badge
                          variant={progress >= 100 ? "default" : "outline"}
                          className="px-4 py-1.5 font-semibold"
                        >
                          {progress >= 100 ? (
                            <span className="flex items-center gap-1">
                              <Trophy className="h-4 w-4" />
                              Target Achieved!
                            </span>
                          ) : (
                            `${100 - progress}% left`
                          )}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <Progress value={progress} className="h-3" />
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                            <span className="font-semibold text-foreground">
                              {detail.current_eco_coin.toLocaleString()} Eco
                              Coins
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <span>of</span>
                            <span className="font-semibold text-foreground">
                              {detail.goal_eco_coin.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                          <div className="p-2">
                            <Users className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Total Donors
                            </p>
                            <p className="text-xl font-bold">
                              {detail.donors.length}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                          <div className="p-2">
                            <Coins className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Average
                            </p>
                            <p className="text-xl font-bold">
                              {detail.donors.length > 0
                                ? Math.floor(
                                    detail.current_eco_coin /
                                      detail.donors.length
                                  ).toLocaleString()
                                : 0}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {topDonors.length > 0 && (
                    <Card className="border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-background">
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 mb-4">
                          <Trophy className="h-5 w-5 text-amber-600 fill-amber-600" />
                          <h3 className="font-semibold text-lg">Top Donors</h3>
                        </div>
                        <div className="space-y-3">
                          {topDonors.map((donor, index) => (
                            <div
                              key={donor.id}
                              className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-amber-500/10"
                            >
                              <div className="relative">
                                <Avatar className="h-10 w-10 ring-2 ring-amber-500/20">
                                  <AvatarImage src={donor.avatar_url} />
                                  <AvatarFallback className="bg-gradient-to-br from-amber-500/20 to-amber-500/10 text-amber-700 font-bold">
                                    {donor.username?.[0]?.toUpperCase() ?? "?"}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-1 -right-1">
                                  {getTrophyIcon(index + 1)}
                                </div>
                              </div>
                              <span className="font-semibold flex-1">
                                {donor.username}
                              </span>
                              <Badge
                                variant="secondary"
                                className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-700 border-green-500/20 font-bold px-3 py-1"
                              >
                                <Coins className="h-3 w-3 mr-1" />
                                {donor.amount.toLocaleString()} Eco
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-lg">All Donors</h3>
                      </div>
                      <Badge variant="outline" className="rounded-full">
                        {detail.donors.length} people
                      </Badge>
                    </div>

                    {detail.donors.length === 0 ? (
                      <EmptyState
                        title="No donations yet"
                        description="Be the first one to support this campaign."
                        className="border-dashed"
                      />
                    ) : (
                      <div className="space-y-2">
                        {detail.donors.map((donor, index) => (
                          <Card
                            key={donor.id}
                            className="group hover:shadow-md transition-all duration-200 border-transparent hover:border-primary/20"
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center gap-4">
                                <div className="relative">
                                  <Avatar className="h-12 w-12 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
                                    <AvatarImage src={donor.avatar_url} />
                                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold">
                                      {donor.username?.[0]?.toUpperCase() ??
                                        "?"}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shadow-lg">
                                    {index + 1}
                                  </div>
                                </div>

                                <div className="flex-1">
                                  <p className="font-semibold group-hover:text-primary transition-colors">
                                    {donor.username}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Donor #{index + 1}
                                  </p>
                                </div>

                                <Badge
                                  variant="secondary"
                                  className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-700 border-green-500/20 font-bold px-4 py-2"
                                >
                                  <Coins className="h-4 w-4 mr-1.5" />
                                  {donor.amount.toLocaleString()} Eco
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )
            )}
          </div>
        </ScrollArea>

        <div className="p-6 border-t bg-muted/20 flex justify-end">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="min-w-[120px]"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
