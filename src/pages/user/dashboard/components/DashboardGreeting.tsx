import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Sparkles,
  TrendingUp,
  Zap,
  Sun,
  Moon,
  Cloud,
} from "lucide-react";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { useAuthContext } from "@/hooks/context/AuthContext";
import { useUserLevel } from "@/hooks/useUserLevel";

export default function DashboardGreeting() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { userData } = useAuthContext();
  const { level } = useUserLevel(userData?.id);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12)
      return {
        text: "Good Morning",
        icon: Sun,
        gradient: "from-amber-400 to-orange-500",
      };
    if (hour < 17)
      return {
        text: "Good Afternoon",
        icon: Cloud,
        gradient: "from-blue-400 to-cyan-500",
      };
    return {
      text: "Good Evening",
      icon: Moon,
      gradient: "from-indigo-400 to-purple-500",
    };
  };

  const greeting = getGreeting();
  const GreetingIcon = greeting.icon;

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <Card className="relative overflow-hidden border-none text-white">
      <DottedGlowBackground
        className="pointer-events-none mask-radial-to-80% mask-radial-at-center"
        opacity={1}
        gap={10}
        radius={1.6}
        colorLightVar="--color-neutral-500"
        glowColorLightVar="--color-neutral-600"
        colorDarkVar="--color-neutral-500"
        glowColorDarkVar="--color-sky-800"
        backgroundOpacity={0}
        speedMin={0.3}
        speedMax={1.6}
        speedScale={1}
      />

      <div className="relative z-10 p-8 lg:p-10">
        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 flex items-center justify-center shadow-lg`}
              >
                <GreetingIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-wider">
                  {greeting.text}
                </p>
                <p className="text-xs flex items-center gap-2 mt-0.5">
                  Ready to make an impact
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight">
                {userData?.username || "Eco Hero"}
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                <p className="text-xs text-neutral-100 uppercase tracking-[0.2em] font-semibold">
                  Let's create real impact today
                </p>
              </div>
            </div>

              <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-slate-400">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">
                    Streak
                  </p>
                  <p className="text-sm font-bold text-white">7 Days</p>
                </div>
              </div>

              <div className="w-px h-12 bg-slate-700" />

              <div className="flex items-center gap-2 text-slate-400">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">
                    Tasks
                  </p>
                  <p className="text-sm font-bold text-white">3 Active</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 items-end">
            <div className="p-6 min-w-[280px] space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium mb-1">
                    Today's Date
                  </p>
                  <p className="text-sm font-semibold text-white leading-tight">
                    {formatDate(currentTime)}
                  </p>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium mb-1">
                    Current Time
                  </p>
                  <p className="text-2xl font-bold text-white tabular-nums tracking-tight">
                    {formatTime(currentTime)}
                  </p>
                </div>
              </div>
            </div>

            {level && (
              <Card className="w-full p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-[10px] text-emerald-300/70 uppercase tracking-wider font-bold mb-0.5">
                        Current Level
                      </p>
                      <p className="text-lg font-black text-white">
                        {level?.level_id?.name}
                      </p>
                    </div>
                  </div>

                  <Badge className="bg-emerald-400/20 text-emerald-200 border-emerald-400/40 text-xs font-bold px-3 py-1.5 backdrop-blur-sm">
                    Lv. {level?.level_id?.badge || 5}
                  </Badge>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
