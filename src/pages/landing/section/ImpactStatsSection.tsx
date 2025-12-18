import { useTranslation } from "react-i18next";
import { itemsImpact } from "../../../components/ImpactSection/itemsImpact";
import { PointerHighlight } from "../../../components/ui/pointer-highlight";
import {
  SpotLightItem,
  Spotlight,
} from "@/components/ui/SpotlightCard/Spotlight-new";

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

        <Spotlight
          className="
    grid gap-3 
    grid-rows-2 
    grid-cols-3 
    auto-rows-fr
  "
        >
          {data?.map((box, index) => (
            <SpotLightItem
              key={index}
              className={`
        ${index === 3 ? "col-start-1 col-end-3" : ""}
        ${index === 4 ? "col-start-3 col-end-4" : ""}
      `}
            >
              <div className="relative z-10 rounded-lg bg-linear-to-b dark:from-[#0c0c0c] dark:to-[#252525] bg-neutral-300 w-full h-full">
                <div className="rounded-lg grid place-content-center h-full 2xl:p-3 p-0 w-full">
                  <div className="absolute rounded-lg top-0 left-0 h-full w-full -z-10 bg-center bg-cover" />
                  <div className="mx-auto">{box.icon}</div>
                  <h1 className="text-center xl:text-2xl lg:text-xl text-2xl font-semibold">
                    {box?.value} {box?.suffix}
                  </h1>
                  <p className="text-center lg:text-base text-xs">
                    {box?.label}
                  </p>
                </div>
              </div>
            </SpotLightItem>
          ))}
        </Spotlight>
      </div>
    </section>
  );
}
