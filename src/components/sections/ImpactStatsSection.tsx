import { useTranslation } from "react-i18next";
import { MagicCard } from "@/components/ui/magic-card";
import { itemsImpact } from "../ImpactSection/itemsImpact";
import { AnimatedCounter } from "../ui/AnimatedCounter";
import { PointerHighlight } from "../ui/pointer-highlight";

export function ImpactStatsSection() {
  const { t } = useTranslation();

  const data = itemsImpact(t);

  return (
    <section id="impact" className="py-24 md:py-32 dark:bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight dark:text-white text-neutral-900 leading-tight">
            {t("impact_section.title.before")}{" "}
            <PointerHighlight
              rectangleClassName="bg-primary/20 dark:bg-neutral-700/30 border-neutral-300/30 dark:border-neutral-600"
              pointerClassName="text-yellow-400"
              containerClassName="inline-block"
            >
              <span className="text-primary">
                {t("impact_section.title.text_center")}
              </span>
            </PointerHighlight>
             {t("impact_section.title.highlight")}
          </h2>

          <p className="mt-4 text-base sm:text-lg dark:text-white/60 text-neutral-800/70 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed">
            {t("impact_section.description")}
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.slice(0, 3).map((item, idx) => (
              <MagicCard
                key={idx}
                className="p-8 flex flex-col items-center justify-center"
              >
                {item.icon}
                <div className="text-5xl font-bold tracking-tight dark:text-white text-neutral-900">
                  <AnimatedCounter
                    end={item.value}
                    duration={3}
                    suffix={item.suffix}
                  />
                </div>
                <p className="mt-5 text-sm dark:text-white/60 text-neutral-800 text-center">
                  {item.label}
                </p>
              </MagicCard>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
            {data.slice(3).map((item, idx) => (
              <MagicCard
                key={idx}
                className="p-8 flex flex-col items-center justify-center"
              >
                {item.icon}
                <div className="text-5xl font-bold tracking-tight dark:text-white text-neutral-900">
                  <AnimatedCounter
                    end={item.value}
                    duration={3}
                    suffix={item.suffix}
                  />
                </div>
                <p className="mt-5 text-sm dark:text-white/60 text-neutral-800 text-center">
                  {item.label}
                </p>
              </MagicCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
