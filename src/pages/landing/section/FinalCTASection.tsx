import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FlickeringGrid } from "../../../components/ui/flickering-grid";
import { Ripple } from "../../../components/ui/ripple";
import { LiquidButton } from "../../../components/liquid-glass-button";

export function FinalCTASection() {
  const { t } = useTranslation();

  return (
    <section
      id="final-cta"
      className="py-24 md:py-20 relative overflow-hidden w-full h-full"
    >
      <div className="absolute inset-0 w-full h-full pointer-events-none z-5">
        <div className="absolute inset-0 bg-gradient-to-b via-transparent to-transparent from-neutral-50 dark:from-black/90" />
      </div>

      <FlickeringGrid
        className="absolute inset-0 z-0 size-full mt-2"
        squareSize={3}
        gridGap={8}
        color="#6B7280"
        maxOpacity={0.8}
        flickerChance={0.1}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="relative p-12 md:p-20 dark:bg-black bg-neutral-50 text-center rounded-3xl border border-white/10 shadow-2xl ">
          <Ripple
            className="absolute inset-0 z-0 w-full h-full top-0"
            mainCircleOpacity={0.4}
            mainCircleSize={300}
          />

          <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter dark:text-neutral-200 text-neutral-800 max-w-4xl mx-auto">
              {t("final_cta.title")}
            </h2>

            <p className="mt-4 text-xl dark:text-white/70 text-neutral-700/50 max-w-3xl mx-auto">
              {t("final_cta.description")}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 w-full">
              <Link to={"/scan"} className="w-full sm:w-auto">
                <LiquidButton className="dark:text-white text-black cursor-pointer" size={'lg'}>{t("final_cta.cta_scan")}</LiquidButton>
              </Link>

              <Link to={"/dashboard/hubs"} className="w-full sm:w-auto">
                <LiquidButton className="dark:text-white text-black cursor-pointer" size={'lg'}>{t("final_cta.cta_reward")}</LiquidButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
