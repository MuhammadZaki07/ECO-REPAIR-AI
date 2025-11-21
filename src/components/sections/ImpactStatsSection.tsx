import {
  IconRecycle,
  IconCoins,
  IconUsers,
  IconMapPin,
  IconBolt,
} from "@tabler/icons-react";
import { AnimatedCounter } from "../ui/AnimatedCounter";
import SpotlightCard from "@/components/ui/SpotlightCard/SpotlightCard";

export function ImpactStatsSection() {
  return (
    <section className="py-24 md:py-32 dark:bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold tracking-tight dark:text-white text-neutral-900">
            The Impact <span className="text-primary">Measured</span>
          </h2>
          <p className="mt-3 text-lg dark:text-white/60 text-neutral-800/50 max-w-3xl mx-auto">
            The real contribution of our Eco-Fixer community to the Circular
            Economy.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SpotlightCard
              className="p-8 flex flex-col items-center justify-center"
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <IconRecycle
                className="w-10 h-10 text-[#4ade80] mb-4"
                strokeWidth={1.5}
              />
              <div className="text-5xl font-bold tracking-tight dark:text-white text-neutral-900">
                <AnimatedCounter end={2800} duration={3} suffix="+" />
              </div>
              <p className="mt-2 text-sm dark:text-white/60 text-neutral-800 text-center">
                Items Saved
              </p>
            </SpotlightCard>

            <SpotlightCard
              className="p-8 flex flex-col items-center justify-center"
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <IconCoins
                className="w-10 h-10 text-[#4ade80] mb-4"
                strokeWidth={1.5}
              />
              <div className="text-5xl font-bold tracking-tight dark:text-white text-neutral-900">
                <AnimatedCounter end={1950} duration={3} suffix="K+" />
              </div>
              <p className="mt-2 text-sm dark:text-white/60 text-neutral-800 text-center">
                Eco-Coins Distributed
              </p>
            </SpotlightCard>

            <SpotlightCard
              className="p-8 flex flex-col items-center justify-center"
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <IconUsers
                className="w-10 h-10 text-[#4ade80] mb-4"
                strokeWidth={1.5}
              />
              <div className="text-5xl font-bold tracking-tight dark:text-white text-neutral-900">
                <AnimatedCounter end={1500} duration={3} suffix="+" />
              </div>
              <p className="mt-2 text-sm dark:text-white/60 text-neutral-800 text-center">
                Eco-Fixers Joined
              </p>
            </SpotlightCard>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
            <SpotlightCard
              className="p-8 flex flex-col items-center justify-center"
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <IconMapPin
                className="w-10 h-10 text-[#4ade80] mb-4"
                strokeWidth={1.5}
              />
              <div className="text-5xl font-bold tracking-tight dark:text-white text-neutral-900">
                <AnimatedCounter end={250} duration={3} suffix="+" />
              </div>
              <p className="mt-2 text-sm dark:text-white/60 text-neutral-800 text-center">
                SparePart Hubs Registered
              </p>
            </SpotlightCard>

            <SpotlightCard
              className="p-8 flex flex-col items-center justify-center"
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <IconBolt
                className="w-10 h-10 text-[#4ade80] mb-4"
                strokeWidth={1.5}
              />
              <div className="text-5xl font-bold tracking-tight dark:text-white text-neutral-900">
                <AnimatedCounter end={5300} duration={3} suffix="+" />
              </div>
              <p className="mt-2 text-sm dark:text-white/60 text-neutral-800 text-center">
                Total AI Diagnoses
              </p>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
