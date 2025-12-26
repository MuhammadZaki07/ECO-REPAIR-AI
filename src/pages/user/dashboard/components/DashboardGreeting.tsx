import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Sun,
  Moon,
  Cloud,
} from "lucide-react";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { useAuthContext } from "@/hooks/context/AuthContext";
import { useUserLevel } from "@/hooks/useUserLevel";
import { Separator } from "@/components/ui/separator";
import { LiquidGlassCard } from "@/components/effects/liquid-glass";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardGreeting() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { userData } = useAuthContext();
  const { level , loading } = useUserLevel(userData?.id);

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

  if (loading) {
    return (
        <Skeleton className="w-full h-[400px]"/>
    );
  }

  return (
    <Card className="relative overflow-hidden border-none text-white bg-transparent shadow-none">
      <DottedGlowBackground
        className="pointer-events-none mask-radial-to-70% mask-radial-at-center"
        opacity={1}
        gap={10}
        radius={1.6}
        colorLightVar="--color-green-500"
        glowColorLightVar="--color-green-600"
        colorDarkVar="--color-green-500"
        glowColorDarkVar="--color-sky-800"
        backgroundOpacity={0}
        speedMin={0.3}
        speedMax={1.6}
        speedScale={1}
      />

      <div className="relative z-10 p-8 lg:p-10">
        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div className="space-y-6">
            <LiquidGlassCard className="w-60 relative dark:text-neutral-100 text-neutral-900 p-2">
              <div className="relative z-20 flex items-center gap-3">
                <div className={`w-12 h-12 flex items-center justify-center`}>
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
            </LiquidGlassCard>

            <div className="space-y-2">
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight dark:text-neutral-100 text-neutral-900">
                {userData?.username || "Eco Hero"}
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <p className="text-xs dark:text-neutral-100 text-neutral-900 uppercase tracking-[0.2em] font-semibold">
                  Let's create real impact today
                </p>
              </div>
            </div>

            {level && (
              <Card className="p-5 bg-transparent w-56 border-none shadow-none">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider font- font-medium mb-0.5">
                        Current Level
                      </p>
                      <p className="text-lg font-black dark:text-neutral-100 text-neutral-900">
                        {level?.level_id?.name}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>

          <div className="flex flex-col gap-6 items-end">
            <div className="p-6 min-w-[280px] space-y-4">
              <LiquidGlassCard className="relative p-4">
                <div className="relative z-20 flex items-center gap-3">
                  <div className="flex items-center justify-center">
                    <Calendar className="w-5 h-5 dark:text-neutral-100 text-neutral-900" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-1">
                      Today's Date
                    </p>
                    <p className="text-sm font-semibold dark:text-neutral-100 text-neutral-900 leading-tight">
                      {formatDate(currentTime)}
                    </p>
                  </div>
                </div>
              </LiquidGlassCard>

              <LiquidGlassCard className="relative p-4">
                <div className="relative z-20 flex items-center gap-3">
                  <div className="flex items-center justify-center">
                    <Clock className="w-5 h-5 dark:text-neutral-100 text-neutral-900" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-1">
                      Current Time
                    </p>
                    <p className="text-2xl font-bold dark:text-neutral-100 text-neutral-900 tabular-nums tracking-tight">
                      {formatTime(currentTime)}
                    </p>
                  </div>
                </div>
              </LiquidGlassCard>
            </div>
          </div>
        </div>
      </div>
      <Separator />
    </Card>
  );
}
