/**
 * RewardSystemSection
 *
 * Halaman ini menampilkan sistem gamifikasi Eco-Coin.
 * Terdiri dari 3 card utama:
 *
 * 1. Earn Rewards
 *    – Menjelaskan cara pengguna mendapatkan Eco-Coin dari aktivitas reparasi.
 *
 * 2. Redeem Eco-Coin
 *    – Card interaktif dengan coin animasi, zig-zag lines, dan icon tujuan.
 *
 * 3. Environmental Score
 *    – Menunjukkan bahwa semakin banyak Eco-Coin, semakin tinggi kontribusi lingkungan.
 *
 * Semua elemen visual menggunakan animasi halus agar terasa “alive”.
 */

import { DotBackground } from "../ui/DotBackground";
import { PointerHighlight } from "../ui/pointer-highlight";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import CardOne from "../RewardSystem/CardOne";
import CardTwo from "../RewardSystem/CardTwo";
import CardThree from "../RewardSystem/CardThree";

export function RewardSystemSection() {
  const { t } = useTranslation();
  return (
    <section id="rewards" className="py-24 md:py-32 bg-black relative">
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <DotBackground />

        <div className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent dark:from-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b via-transparent to-transparent dark:from-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r via-transparent to-transparent dark:from-black/80" />
      </div>

      <div className="relative z-50 max-w-7xl mx-auto px-6">
        <div className="text-center mb-10 md:mb-16 px-4">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight dark:text-white flex ${
              i18n.language === "id" ? "flex-col" : "flex-row"
            } items-center gap-2 justify-center leading-tight`}
          >
            {t("rewards_section.title.before")}
            <PointerHighlight
              rectangleClassName="bg-primary/20 dark:bg-neutral-700/30 border-neutral-300/30 dark:border-neutral-600"
              pointerClassName="text-yellow-400"
              containerClassName="inline-block"
            >
              <span className="relative z-10 text-primary/90">
                {t("rewards_section.title.highlight")}
              </span>
            </PointerHighlight>
          </h2>

          <p className="mt-4 text-base sm:text-lg dark:text-white/60 text-neutral-800/70 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed">
            {t("rewards_section.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CardOne
            title={t("rewards_section.cards.one.title")}
            subtitle={t("rewards_section.cards.one.subtitle")}
            description={t("rewards_section.cards.one.description")}
          />
          <CardTwo
            title={t("rewards_section.cards.two.title")}
            subtitle={t("rewards_section.cards.two.subtitle")}
            description={t("rewards_section.cards.two.description")}
          />
          <CardThree
           title={t("rewards_section.cards.three.title")}
            subtitle={t("rewards_section.cards.three.subtitle")}
            description={t("rewards_section.cards.three.description")}
          />
        </div>
      </div>
    </section>
  );
}
