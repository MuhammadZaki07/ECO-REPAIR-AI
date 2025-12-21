import { useState } from "react";
import {
  Coins,
  Heart,
  Leaf,
  ShoppingBag,
  Ticket,
  ArrowUpRight,
  ShieldCheck,
  Info,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Globe } from "@/components/ui/globe";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const EcoCoints = () => {
  const [balance] = useState(12.375);

  return (
    <div className="p-4 space-y-8 bg-background h-screen">
      {/* 1. HEADER & WALLET SECTION (PREMIUM DESIGN) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 relative text-white shadow-2xl overflow-hidden group bg-background">
          {/* <div className="absolute right-0 bottom-0 p-8 group-hover:scale-110 transition-transform"> */}
          <Globe className="absolute lg:-right-180 -right-100 top-10" />
          {/* </div> */}
          <CardContent className="p-10 relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <Badge className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md px-4 py-1">
                <ShieldCheck className="w-3 h-3 mr-2 text-emerald-300" />
                Verified Impact Account
              </Badge>
            </div>

            <div className="space-y-1">
              <p className="text-emerald-200/70 font-medium tracking-widest uppercase text-xs">
                Total Contribution Assets
              </p>
              <div className="flex items-baseline gap-4">
                <h2 className="text-6xl font-bold tracking-tighter">
                  {balance.toLocaleString()}
                </h2>
                <span className="text-2xl font-light text-emerald-400">EC</span>
              </div>
              <p className="text-sm text-emerald-100/60 mt-4 flex items-center gap-2">
                Equivalent to 4.2kg Carbon Offset or 2 Emergency Food Packs
              </p>
            </div>

            <div className="flex gap-4 mt-10">
              <Button className="bg-emerald-400 hover:bg-emerald-300 text-[#022c22] font-bold px-8 rounded-full transition-all hover:scale-105">
                Redeem Assets
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 rounded-full border border-white/20"
              >
                <Info className="w-4 h-4 mr-2" /> Asset Valuation
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 2. MINING PROGRESS (LIKE TRACKER) */}
        <Card className="border-none bg-secondary/30 backdrop-blur-sm shadow-sm flex flex-col justify-between">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg">
                  <Coins className="w-4 h-4 text-emerald-600" />
                </div>
                Mining Progress
              </CardTitle>
              <Badge variant="outline" className="text-[10px]">
                Per 1,000 Likes
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>850 / 1,000 Likes</span>
                <span className="text-emerald-600">+0.125 EC</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed italic">
              "Your high-quality answers are generating social value. Keep
              helping the community to mine more coins."
            </p>
            <Button
              variant="outline"
              className="w-full text-xs rounded-xl border-dashed"
            >
              View Your Top Answers
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 3. REDEMPTION HUB (THE ECO-EXCHANGE) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold tracking-tight">
            Eco-Exchange Hub
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" /> Updated live from Blockchain
          </div>
        </div>

        <Tabs defaultValue="impact" className="w-full">
          <TabsList className="bg-muted/50 p-1 mb-6">
            <TabsTrigger value="impact" className="flex gap-2">
              <Heart className="w-4 h-4" /> Social Impact
            </TabsTrigger>
            <TabsTrigger value="nature" className="flex gap-2">
              <Leaf className="w-4 h-4" /> Nature
            </TabsTrigger>
            <TabsTrigger value="lifestyle" className="flex gap-2">
              <ShoppingBag className="w-4 h-4" /> Merchandise
            </TabsTrigger>
            <TabsTrigger value="vouchers" className="flex gap-2">
              <Ticket className="w-4 h-4" /> Vouchers
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="impact"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                title: "Flood Relief 2024",
                desc: "Emergency supplies for victims of the Central Coast flood.",
                icon: "🌊",
                cost: "5.000 EC",
                progress: 85,
              },
              {
                title: "Med-Kit Distribution",
                desc: "Providing first aid and essential medicine for remote villages.",
                icon: "🏥",
                cost: "2.500 EC",
                progress: 40,
              },
              {
                title: "Education Fund",
                desc: "Subsidizing technical repair courses for underprivileged youth.",
                icon: "🎓",
                cost: "10.000 EC",
                progress: 15,
              },
            ].map((item, i) => (
              <Card
                key={i}
                className="group hover:border-emerald-500/50 transition-all cursor-pointer overflow-hidden border-none shadow-md bg-card"
              >
                <CardContent className="p-0">
                  <div className="p-6">
                    <span className="text-4xl mb-4 block">{item.icon}</span>
                    <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                    <p className="text-xs text-muted-foreground mb-6 line-clamp-2">
                      {item.desc}
                    </p>
                    <div className="space-y-3">
                      <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                        <span>Funding Goal</span>
                        <span>{item.progress}%</span>
                      </div>
                      <Progress
                        value={item.progress}
                        className="h-1 bg-muted"
                      />
                    </div>
                  </div>
                  <Button className="w-full rounded-none bg-secondary hover:bg-emerald-600 hover:text-white text-secondary-foreground font-semibold border-t h-12">
                    Donate {item.cost}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Tab Content Nature (Contoh) */}
          <TabsContent
            value="nature"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <Card className="flex flex-row overflow-hidden border-none shadow-md">
              <div className="w-1/3 bg-emerald-100 flex items-center justify-center text-5xl">
                🌱
              </div>
              <div className="p-6 flex-1 space-y-4">
                <h4 className="font-bold">Plant a Mangrove Tree</h4>
                <p className="text-xs text-muted-foreground">
                  Your tree will be planted in Northern Coast Java. You'll
                  receive GPS coordinates & certificate.
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-emerald-600">3.500 EC</span>
                  <Button size="sm">Tukar Bibit</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* 4. TRANSACTION LEDGER (RECENT ACTIVITY) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8 border-t border-muted">
        <div className="lg:col-span-1">
          <h4 className="font-bold mb-2">Impact Ledger</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            All transactions are transparently recorded. Your contribution
            history builds your "Eco-Credibility" score.
          </p>
          <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
            <p className="text-[10px] font-bold uppercase text-emerald-600 mb-1">
              Total Impact Shared
            </p>
            <p className="text-2xl font-bold">
              142.500 <span className="text-xs font-normal">EC</span>
            </p>
          </div>
        </div>

        <div className="lg:col-span-3">
          <Card className="border-none bg-muted/20 shadow-none">
            <ScrollArea className="h-[300px] w-full p-4">
              {[
                {
                  label: "Donation: Flood Relief 2024",
                  date: "Dec 12, 2024",
                  type: "out",
                  amount: "2.500",
                },
                {
                  label: "Mining Reward: 1000 Likes reached",
                  date: "Dec 10, 2024",
                  type: "in",
                  amount: "0.125",
                },
                {
                  label: "Voucher Exchange: Fix-IT Store",
                  date: "Dec 05, 2024",
                  type: "out",
                  amount: "1.000",
                },
                {
                  label: "Mining Reward: High Impact Answer",
                  date: "Nov 28, 2024",
                  type: "in",
                  amount: "0.125",
                },
                {
                  label: "Nature: Mangrove Planting",
                  date: "Nov 25, 2024",
                  type: "out",
                  amount: "3.500",
                },
              ].map((log, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-4 border-b border-muted last:border-0 hover:bg-muted/50 px-4 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-full ${
                        log.type === "in"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      <ArrowUpRight
                        className={`w-4 h-4 ${
                          log.type === "out" ? "rotate-0" : "rotate-180"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{log.label}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {log.date}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`font-mono font-bold ${
                      log.type === "in" ? "text-emerald-500" : "text-red-500"
                    }`}
                  >
                    {log.type === "in" ? "+" : "-"}
                    {log.amount} EC
                  </span>
                </div>
              ))}
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EcoCoints;
