import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Ripple } from "../ui/ripple";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

export function FinalCTASection() {
  return (
    <section className="py-24 md:py-20 relative overflow-hidden w-full h-full">
      <FlickeringGrid
        className="absolute inset-0 z-0 size-full"
        squareSize={3}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.3}
        flickerChance={0.1}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="relative p-12 md:p-20 dark:bg-black bg-neutral-100 text-center rounded-3xl border border-white/10 shadow-2xl ">
          <Ripple
            className="absolute inset-0 z-0 w-full h-full top-0"
            mainCircleOpacity={0.4}
            mainCircleSize={300}
          />

          <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter dark:text-white text-neutral-800 max-w-4xl mx-auto">
                    Ready to Fix the Future?
            </h2>
            <p className="mt-4 text-xl dark:text-white/70 text-neutral-700/50 max-w-3xl mx-auto">
              Start your first instant diagnosis. Get AI-guided repair
              instructions, collect Eco-Coins, and join the repair revolution.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 w-full">   
              <Link to={"/scan"} className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full cursor-pointer sm:w-auto text-white border-white/30 dark:hover:bg-white/10 bg-neutral-600 font-semibold text-lg py-3 px-8 transition-colors duration-300"
                >
                 Start Scanning Now
                </Button>
              </Link>

              <Link to={"/dashboard/hubs"} className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full cursor-pointer sm:w-auto text-white border-white/30 dark:hover:bg-white/10 bg-neutral-600 font-semibold text-lg py-3 px-8 transition-colors duration-300"
                >
                  Check Reward Hub
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
