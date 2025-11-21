import {
  IconRecycle,
  IconCoins,
  IconUsers,
  IconMapPin,
  IconBolt,
} from "@tabler/icons-react";
import { AnimatedCounter } from "../ui/AnimatedCounter";
import { MagicCard } from "../ui/magic-card";

export function ImpactStatsSection() {
  return (
    <section className="py-24 md:py-32 dark:bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight dark:text-white text-neutral-900 leading-tight">
            The Impact <span className="text-primary">Measured</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg dark:text-white/60 text-neutral-800/70 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed">
            The real contribution of our Eco-Fixer community to the Circular
            Economy.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MagicCard
              className="p-8 flex flex-col items-center justify-center"
            >
              <IconRecycle
                className="w-10 h-10 text-[#4ade80] mb-4"
                strokeWidth={1.5}
              />
              <div className="text-5xl font-bold tracking-tight dark:text-white text-neutral-900">
                <AnimatedCounter end={2800} duration={3} suffix="+" />
              </div>
              <p className="mt-5 text-sm dark:text-white/60 text-neutral-800 text-center">
                Items Saved
              </p>
            </MagicCard>

            <MagicCard
              className="p-8 flex flex-col items-center justify-center"
            >
              <IconCoins
                className="w-10 h-10 text-[#4ade80] mb-4"
                strokeWidth={1.5}
              />
              <div className="text-5xl font-bold tracking-tight dark:text-white text-neutral-900">
                <AnimatedCounter end={1950} duration={3} suffix="K+" />
              </div>
              <p className="mt-5 text-sm dark:text-white/60 text-neutral-800 text-center">
                Eco-Coins Distributed
              </p>
            </MagicCard>

            <MagicCard
              className="p-8 flex flex-col items-center justify-center"
            >
              <IconUsers
                className="w-10 h-10 text-[#4ade80] mb-4"
                strokeWidth={1.5}
              />
              <div className="text-5xl font-bold tracking-tight dark:text-white text-neutral-900">
                <AnimatedCounter end={1500} duration={3} suffix="+" />
              </div>
              <p className="mt-5 text-sm dark:text-white/60 text-neutral-800 text-center">
                Eco-Fixers Joined
              </p>
            </MagicCard>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
            <MagicCard
              className="p-8 flex flex-col items-center justify-center"
            >
              <IconMapPin
                className="w-10 h-10 text-[#4ade80] mb-4"
                strokeWidth={1.5}
              />
              <div className="text-5xl font-bold tracking-tight dark:text-white text-neutral-900">
                <AnimatedCounter end={250} duration={3} suffix="+" />
              </div>
              <p className="mt-5 text-sm dark:text-white/60 text-neutral-800 text-center">
                SparePart Hubs Registered
              </p>
            </MagicCard>

            <MagicCard
              className="p-8 flex flex-col items-center justify-center"
            >
              <IconBolt
                className="w-10 h-10 text-[#4ade80] mb-4"
                strokeWidth={1.5}
              />
              <div className="text-5xl font-bold tracking-tight dark:text-white text-neutral-900">
                <AnimatedCounter end={5300} duration={3} suffix="+" />
              </div>
              <p className="mt-5 text-sm dark:text-white/60 text-neutral-800 text-center">
                Total AI Diagnoses
              </p>
            </MagicCard>
          </div>
        </div>
      </div>
    </section>
  );
}
