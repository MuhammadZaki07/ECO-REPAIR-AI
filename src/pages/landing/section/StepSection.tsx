import { useState, useEffect, useRef } from "react";
import steps from "@/data/step.json";
import { ProcessCard } from "../../../components/ProcessCard";
import { DotBackground } from "../../../components/ui/DotBackground";
import { PointerHighlight } from "../../../components/ui/pointer-highlight";
import { useTranslation } from "react-i18next";
import { IconShieldLock } from "@tabler/icons-react";
import {
  Upload,
  Sparkles,
  BookOpen,
  ClipboardList,
  Users,
  Recycle,
  Camera,
} from "lucide-react";

const iconMap: Record<string, any> = {
  Upload,
  Sparkles,
  BookOpen,
  ClipboardList,
  Users,
  Recycle,
  IconShieldLock,
  Camera,
};

export function StepSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [alreadyPlayedOnce, setAlreadyPlayedOnce] = useState(false);
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const INTERVAL_DURATION = 1500;

  useEffect(() => {
    if (alreadyPlayedOnce) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          setTimeout(() => {
            setHasStarted(true);
            setAlreadyPlayedOnce(true);
          }, 3000);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [alreadyPlayedOnce]);

  useEffect(() => {
    if (!hasStarted || isComplete) return;
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 100 / (INTERVAL_DURATION / 50);
      });
    }, 50);
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= steps.length - 1) {
          setIsComplete(true);
          return prev;
        }
        return prev + 1;
      });
      setProgress(0);
    }, INTERVAL_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [hasStarted, isComplete]);

  const visualOrder = [
    steps[0],
    steps[1],
    steps[2],
    steps[3],
    steps[7],
    steps[6],
    steps[5],
    steps[4],
  ];

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-4 overflow-hidden dark:bg-black bg-neutral-50"
    >
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <DotBackground />

        <div
          className="absolute inset-0 
                  bg-gradient-to-t  via-transparent to-transparent 
                  dark:from-black/80 dark:via-transparent dark:to-transparent"
        ></div>
        <div
          className="absolute inset-0 
                  bg-gradient-to-b via-transparent to-transparent 
                  dark:from-black/80 dark:via-transparent dark:to-transparent"
        ></div>

        <div
          className="absolute inset-0 
                  bg-gradient-to-l via-transparent to-transparent 
                  dark:from-black/80 dark:via-transparent dark:to-transparent"
        ></div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto">
        <div className="text-center lg:mb-20 mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            {t("how_it_works_section.how_it_works.before")}
            <PointerHighlight
              rectangleClassName="bg-primary/20 dark:bg-neutral-700/30 border-neutral-300/30 dark:border-neutral-600"
              pointerClassName="text-indigo-400"
              containerClassName="inline-block"
            >
              <span className="text-primary dark:text-primary">
                {t("how_it_works_section.how_it_works.highlight")}
              </span>
            </PointerHighlight>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
            {t("how_it_works_section.how_it_works.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {visualOrder.map((item) => {
            const Icon = iconMap[item.icon];
            const index = item.step - 1;

            return (
              <ProcessCard
                key={item.step}
                step={item.step}
                title={t(`how_it_works_section.steps.${index}.title`)}
                description={t(
                  `how_it_works_section.steps.${index}.description`
                )}
                icon={Icon}
                index={index}
                isLast={index === steps.length - 1}
                isActive={index === activeStep}
                isCompleted={index < activeStep}
                progress={index === activeStep ? progress : 0}
              />
            );
          })}
        </div>

        {/* <TerminalStep
          key={hasStarted ? "terminal-started" : "terminal-wait"}
          hasStarted={hasStarted}
          alreadyPlayedOnce={alreadyPlayedOnce}
          activeStep={activeStep}
          steps={steps}
          isComplete={isComplete}
        /> */}
      </div>
    </section>
  );
}
