import { IconFlagDollar } from "@tabler/icons-react";
import { PointerHighlight } from "../ui/pointer-highlight";

export default function CardOne({ title, subtitle, description }: { title: string; subtitle: string; description: string }) {
  return (
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
            <span className="relative z-10">{title}</span>
          </PointerHighlight>
          {subtitle}
        </div>

        <p className="mt-4 text-sm text-neutral-500">{description}</p>
      </div>
    </div>
  );
}
