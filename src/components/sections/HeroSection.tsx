import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { Spotlight } from "../ui/spotlight-new";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ParticleCircle } from "../ui/particle-circle";
import { useTheme } from "next-themes";
import { Cover } from "../ui/cover";
import { Leaf } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

/**
 * HeroSection – Responsive, Clean, AI-themed
 * ---------------------------------------------------------------------------
 * Notes:
 * - Background effects use pointer-events-none to avoid interaction issues.
 * - Buttons override hover styles to prevent global grey hover.
 * - Grid is responsive: single-column on mobile/tablet, two-column on md+.
 * - ParticleCircle uses fixed size but can be made dynamic using clamp().
 * - Includes AI badge & neon styling.
 */

export function HeroSection() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const particleColors =
    theme === "dark"
      ? ["#aaff00", "#c6ff4c", "#e8ffb5", "#d9ff62", "#f2ffdf"]
      : ["#4caf50", "#81c784", "#a5d6a7", "#c8e6c9", "#e8f5e9"];

  return (
    <section className="relative w-full min-h-screen overflow-hidden px-6 md:px-12 lg:px-20 dark:bg-black bg-neutral-50">
      <BackgroundRippleEffect rows={10} cellSize={60} />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[clamp(40%,65%,85%)] z-10"
        style={{
          background: `radial-gradient(
      ellipse 110% 80% at 30% 100%,
      var(--bottom-fade-start),
      var(--bottom-fade-middle) 45%,
      var(--bottom-fade-end) 85%
    )`,
        }}
      />

      <Spotlight
        gradientFirst="radial-gradient(68% 68% at 55% 31%, hsla(210,100%,85%,0.18) 0, hsla(210,100%,55%,0.05) 50%, hsla(210,100%,45%,0) 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(210,100%,85%,0.12) 0, hsla(210,100%,55%,0.04) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(210,100%,85%,0.10) 0, hsla(210,100%,45%,0.03) 80%, transparent 100%)"
        width={600}
        height={1400}
        smallWidth={240}
        translateY={-380}
        duration={8}
        xOffset={80}
      />

      <div className={`relative ${i18n.language == "id" ? "lg:mt-0 top-25 lg:top-0 md:top-0" : "lg:mt-[30px] top-25 lg:-top-8 md:top-0"} z-20 lg:grid min-h-screen items-center gap-12 md:grid-cols-[1.2fr_0.8fr]`}>
        <div className="flex flex-col items-start max-w-2xl text-left lg:mt-20 md:mt-0">
          <div className="flex items-center gap-3 mb-5 lg:mb-0">
            <div className="h-1.5 w-20 rounded-full bg-[#aaff00] opacity-80 blur-[1px]" />
            <span className="w-10 h-10 text-xs font-bold text-primary bg-black rounded-full drop-shadow-[0_0_10px_#aaff0040] flex justify-center items-center">
              <Leaf strokeWidth={2} />
            </span>
          </div>

          <h1 className="text-4xl font-bold dark:text-white text-black leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-[6rem]">
            <span className="block drop-shadow-[0_0_30px_#aaff00aa] sm:text-5xl md:text-6xl lg:text-[5rem] mb-4 lg:mb-0">
              <Cover className="text-[#aaff00] dark:text-[#aaff00]">
                EcoRepair
              </Cover>
              <span className="dark:text-[#ffffff] text-black sm:text-5xl md:text-6xl lg:text-[7rem]">
                -AI
              </span>
            </span>
            <span className={`block ${i18n.language == "id" ? "sm:text-5xl md:text-6xl lg:text-[4rem] mt-4" : ""}`}>{t("hero.title_main")}</span>
          </h1>

          <p className="mt-6 lg:max-w-lg max-w-xs dark:text-neutral-300/80 text-neutral-900 text-base sm:text-lg md:text-xl leading-relaxed">
            {t("hero.description")}
          </p>

          <div className="mt-12 flex gap-4 flex-row">
            <Link to="/dashboard">
              <Button
                size="lg"
                className="cursor-pointer text-black hover:text-white hover:bg-primary/50 bg-[#aaff00]"
              >
                {t("hero.button_start")}
              </Button>
            </Link>

            <Link to="" target="_blank">
              <Button
                variant="outline"
                size="lg"
                className="
                cursor-pointer
                  border-neutral-500/50 dark:text-white text-black
                  backdrop-blur-sm
                  hover:bg-white/5
                  hover:border-neutral-300/80
                  transition-all duration-300
                  !hover:text-white
                "
              >
                {t("hero.button_sparepart")}
              </Button>
            </Link>
          </div>
        </div>

        {/* <div className="relative items-center justify-center pointer-events-none right-17 hidden lg:flex lg:right-0 md:right-0">
          <ParticleCircle
            particleCount={1600}
            shrinkDuration={11}
            growDuration={11}
            colors={particleColors}
            baseRadius={0.33}
            particleSize={[1.5, 6]}
            enableBlendMode={true}
            size={600}
          />
        </div> */}
      </div>
    </section>
  );
}
