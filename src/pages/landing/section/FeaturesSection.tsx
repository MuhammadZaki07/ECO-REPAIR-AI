import { useTranslation } from "react-i18next";
import { PointerHighlight } from "../../../components/ui/pointer-highlight";
import Feature from "../components/Feature";

export function FeaturesSection() {
  const { t } = useTranslation();
  return (
    <section
      id="features"
      className="relative z-10 py-10 md:py-12 lg:py-32 w-full dark:bg-black bg-neutral-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold dark:text-white text-black tracking-tight">
            {t("features_section.title.before")}
            <PointerHighlight
              rectangleClassName="bg-primary/20 dark:bg-neutral-700/30 border-neutral-300/30 dark:border-neutral-600"
              pointerClassName="text-yellow-400"
              containerClassName="inline-block"
            >
              <span className="text-primary">
                {t("features_section.title.highlight")}
              </span>
            </PointerHighlight>
            {t("features_section.title.after")}
          </h2>
          <p className="mt-4 text-lg dark:text-white/70 text-neutral-800/50 max-w-3xl mx-auto">
            {t("features_section.description")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto lg:py-20 md:py-12">
          {t("features_section.features", { returnObjects: true }).map(
            (feature: any, index: number) => (
              <Feature key={feature.title} {...feature} index={index} />
            )
          )}
        </div>
      </div>
    </section>
  );
}
