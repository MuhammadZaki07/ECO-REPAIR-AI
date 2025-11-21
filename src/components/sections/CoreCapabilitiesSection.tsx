import { cn } from "@/lib/utils";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { items } from "@/components/core-capabilities/items";

export function CoreCapabilitiesSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold tracking-tight dark:text-white text-neutral-800">
            Core Platform Capabilities. <span className="text-primary">One Step Ahead.</span>
          </h2>
          <p className="mt-3 text-lg dark:text-white/60 text-neutral-800/50 max-w-3xl mx-auto">
            We combine Multi-Modal AI intelligence, gamification, and an
            integrated community network to transform the way you repair.
            Everything you need, all in one place.
          </p>
        </div>

        <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[20rem]">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={<span className="text-sm">{item.description}</span>}
              header={item.header}
              className={cn("[&>p:text-lg]", item.className)}
              icon={item.icon}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
