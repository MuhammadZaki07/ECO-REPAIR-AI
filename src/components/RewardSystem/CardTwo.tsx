import { IconFlagDollar } from "@tabler/icons-react";
import { motion } from "motion/react";
import ZigZagLine from "../ui/ZigZagLine";
import { PointerHighlight } from "../ui/pointer-highlight";
function CardTwo({
  title,
  subtitle,
  description,
}: {
  title: string;
  subtitle: string;
  description: string;
}) {
  return (
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

          <ZigZagLine delay="0s" className="absolute top-12 left-32 w-[52%]" />
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
          {title}
          <PointerHighlight
            rectangleClassName="bg-yellow-100 dark:bg-yellow-900 border-yellow-300 dark:border-yellow-700 leading-loose"
            pointerClassName="text-yellow-500 h-3 w-3"
            containerClassName="inline-block ml-1"
          >
            <span className="relative z-10">Eco-Coin</span>
          </PointerHighlight>{" "}
          {subtitle}
        </div>
        <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default CardTwo;
