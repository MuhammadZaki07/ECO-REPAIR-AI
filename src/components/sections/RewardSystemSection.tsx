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

import { IconFlagDollar } from "@tabler/icons-react";
import { motion } from "motion/react";
import { DotBackground } from "../ui/DotBackground";
import { PointerHighlight } from "../ui/pointer-highlight";
import ZigZagLine from "../ui/ZigZagLine";

function RewardSystemSection() {
  return (
    <section className="py-24 md:py-32 bg-black relative">
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <DotBackground />

        <div className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent dark:from-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b via-transparent to-transparent dark:from-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r via-transparent to-transparent dark:from-black/80" />
      </div>

      <div className="relative z-50 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold tracking-tight dark:text-white flex items-center gap-2 justify-center leading-none">
            Fix More. Earn More.
            <PointerHighlight
              rectangleClassName="bg-primary/20 dark:bg-neutral-700/30 border-neutral-300/30 dark:border-neutral-600"
              pointerClassName="text-yellow-400"
              containerClassName="inline-block"
            >
              <span className="relative z-10 text-primary/90">
                Impact Everything.
              </span>
            </PointerHighlight>
          </h2>

          <p className="mt-3 text-lg dark:text-white/60 text-neutral-800/50 max-w-3xl mx-auto">
            Eco-Coin is our gamification system designed to reward every repair
            action you take, turning your effort into valuable <i>rewards</i>{" "}
            and meaningful environmental impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-xl p-6 dark:bg-black bg-neutral-50 border border-black/10 dark:border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[length:18px_18px] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)]" />

            <div className="relative">
              <div className="h-44 w-full relative rounded-xl overflow-hidden border border-neutral-300/40 dark:border-neutral-700/40 shadow-[inset_0_0_20px_rgba(255,255,255,0.2)] bg-neutral-50/70 dark:bg-neutral-900/40 backdrop-blur-xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[length:18px_18px] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.06)_1px,transparent_1px)]" />
                <div className="absolute -top-10 -right-10 h-40 w-40 bg-yellow-300/30 dark:bg-yellow-500/20 blur-3xl rounded-full" />
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/20 via-transparent to-transparent dark:from-yellow-500/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/5 animate-[pulse_3s_infinite]" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 dark:from-yellow-600 dark:to-yellow-700 shadow-[0_0_30px_rgba(255,215,0,0.45)] animate-float flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.55),rgba(255,255,255,0)_45%)] dark:bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),rgba(255,255,255,0)_45%)]" />
                    <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 dark:from-yellow-700 dark:to-yellow-800" />
                    <div className="absolute inset-[6px] rounded-full bg-[radial-gradient(circle,rgba(255,230,150,0.8),rgba(255,200,80,1),rgba(220,160,40,1))] dark:bg-[radial-gradient(circle,rgba(255,230,150,0.25),rgba(180,140,50,0.8),rgba(150,110,30,1))]" />

                    <IconFlagDollar className="relative text-yellow-700 dark:text-yellow-200 text-3xl drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                  </div>
                </div>
              </div>

              <div className="mx-auto mt-4 max-w-lg text-base font-bold tracking-tight">
                <PointerHighlight
                  rectangleClassName="bg-neutral-200 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 leading-loose"
                  pointerClassName="text-yellow-500 h-3 w-3"
                  containerClassName="inline-block mr-1"
                >
                  <span className="relative z-10">Earn Rewards</span>
                </PointerHighlight>
                for every repair action you complete.
              </div>

              <p className="mt-4 text-sm text-neutral-500">
                Collect Eco-Coins by completing repairs, uploading Success
                Stories, or registering new SparePart Hubs.
              </p>
            </div>
          </div>

          <div className="rounded-xl p-6 dark:bg-black bg-neutral-50 border border-black/10 dark:border-white/10 relative overflow-hidden">
            <div className="relative z-10">
              <motion.div className="relative h-44 w-full rounded-2xl overflow-hidden bg-gradient-to-br dark:from-neutral-900/80 dark:to-neutral-950/80 from-neutral-500/80 to-neutral-900/80 backdrop-blur-xl shadow-2xl">
                <div className="absolute hidden dark:block inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60" />
                <div className="absolute dark:hidden block inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.080)_1px,transparent_1px)] bg-[size:36px_36px] opacity-90" />
                <div className="absolute top-1/2 left-12 -translate-y-1/2">
                  <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 dark:from-yellow-600 dark:to-yellow-700 shadow-[0_0_30px_rgba(255,215,0,0.45)] animate-float flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.55),rgba(255,255,255,0)_45%)] dark:bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),rgba(255,255,255,0)_45%)]" />
                    <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 dark:from-yellow-700 dark:to-yellow-800" />
                    <div className="absolute inset-[6px] rounded-full bg-[radial-gradient(circle,rgba(255,230,150,0.8),rgba(255,200,80,1),rgba(220,160,40,1))] dark:bg-[radial-gradient(circle,rgba(255,230,150,0.25),rgba(180,140,50,0.8),rgba(150,110,30,1))]" />

                    <IconFlagDollar className="relative text-yellow-700 dark:text-yellow-200 text-3xl drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                  </div>
                </div>

                <ZigZagLine
                  delay="0s"
                  className="absolute top-12 left-32 w-[52%]"
                />
                <ZigZagLine
                  delay="0.3s"
                  className="absolute top-1/2 left-35 -translate-y-1/2 w-[52%]"
                />
                <ZigZagLine
                  delay="0.6s"
                  className="absolute bottom-12 left-32 w-[52%]"
                />
              </motion.div>

              <div className="mx-auto mt-4 max-w-lg text-lg font-bold tracking-tight dark:text-white text-black">
                Redeem your{" "}
                <PointerHighlight
                  rectangleClassName="bg-yellow-100 dark:bg-yellow-900 border-yellow-300 dark:border-yellow-700 leading-loose"
                  pointerClassName="text-yellow-500 h-3 w-3"
                  containerClassName="inline-block ml-1"
                >
                  <span className="relative z-10">Eco-Coin</span>
                </PointerHighlight>{" "}
                for real impact.
              </div>
              <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
                Exchange them for discount vouchers, tree donations, or
                exclusive community badges.
              </p>
            </div>
          </div>

          <div className="rounded-xl p-6 dark:bg-black bg-neutral-50 border border-black/10 dark:border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/uploads/noise.png')] opacity-[0.18] dark:opacity-[0.12]" />

            <div className="relative">
              <div className="relative h-44 w-full rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                <div className="absolute top-1/2 left-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-300/30 dark:bg-green-500/20 blur-3xl animate-pulse" />

                <div className="absolute inset-0 flex items-center justify-center space-x-4 z-10">
                  <div className="h-16 w-3 bg-green-300 dark:bg-green-700 rounded-full" />
                  <div className="h-24 w-3 bg-green-400 dark:bg-green-500 rounded-full shadow" />
                  <div className="h-12 w-3 bg-green-300 dark:bg-green-700 rounded-full" />
                </div>

                <div className="absolute inset-3 rounded-xl border border-green-400/30 dark:border-green-700/30" />
              </div>

              <div className="mx-auto mt-4 max-w-lg text-base font-bold tracking-tight">
                Boost your
                <PointerHighlight
                  rectangleClassName="bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700 leading-loose"
                  pointerClassName="text-green-500 h-3 w-3"
                  containerClassName="inline-block ml-1"
                >
                  <span className="relative z-10">Environmental Score</span>
                </PointerHighlight>
                .
              </div>

              <p className="mt-4 text-sm text-neutral-500">
                The more Eco-Coins you earn, the more you contribute to the
                Circular Economy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RewardSystemSection;
