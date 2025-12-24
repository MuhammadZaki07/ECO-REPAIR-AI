import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { Coins, ShieldCheck, ArrowUpRight, Leaf } from "lucide-react";
import { Progress } from "@radix-ui/react-progress";
import { Button } from "@/components/liquid-glass-button";
import { Globe } from "@/components/ui/globe";
import { Skeleton } from "@/components/ui/skeleton";

interface TopCardsProps {
  balance: number;
  loading: boolean;
}

export default function TopCards({ balance, loading }: TopCardsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* WALLET CARD */}
      <Card className="lg:col-span-2 relative border-none bg-gradient-to-br from-emerald-900 via-emerald-950 to-black text-white shadow-2xl overflow-hidden min-h-[320px]">
        <div className="absolute top-0 right-0 w-full h-full opacity-50 pointer-events-none">
          <Globe className="absolute -right-20 -bottom-40 lg:-right-40 lg:-bottom-60 scale-125" />
        </div>

        <CardContent className="p-10 relative z-10 flex flex-col h-full justify-between">
          <div>
            <Badge variant="outline" className="mb-6 flex items-center">
              <ShieldCheck className="w-3 h-3 mr-2" />
              Impact Level: Eco-Guardian
            </Badge>

            <div className="space-y-1">
              <p className="text-emerald-200/50 font-medium tracking-[0.2em] uppercase text-[10px]">
                Available Contribution Credits
              </p>

              {loading ? (
                <Skeleton className="h-20 w-64 bg-white/10" />
              ) : (
                <div className="flex items-baseline gap-3">
                  <h2 className="text-7xl font-black tracking-tighter">
                    {balance.toLocaleString("id-ID")}
                  </h2>
                  <span className="text-2xl font-light text-emerald-500/80 italic">
                    EC
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* IMPACT MINING */}
      <Card className="border-none flex flex-col justify-between overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Leaf className="w-24 h-24 text-emerald-500" />
        </div>

        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <div className="p-2 bg-emerald-500/10 rounded-xl">
              <Coins className="w-4 h-4 text-emerald-500" />
            </div>
            Impact Mining
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 relative z-10">
          <Progress value={85} className="h-1.5 bg-emerald-500/10" />
          <p className="text-[11px] text-muted-foreground">
            You're <span className="font-bold">150 likes</span> away from
            earning a Premium Contributor Badge.
          </p>
          <Button variant="secondary" className="w-full rounded-xl">
            Claim Daily Reward <ArrowUpRight className="w-3 h-3 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
