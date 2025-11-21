/**
 * IND:
 * Komponen ini menampilkan card proses (step-by-step) dalam sebuah alur kerja.
 * Pada mobile & tablet, seluruh step otomatis dianggap aktif penuh tanpa animasi,
 * sehingga tampil vertikal, rapi, dan konsisten.
 * Pada desktop, komponen tetap menggunakan layout zigzag 4 kolom dengan garis
 * konektor dinamis dan animasi progress.
 *
 * ENG:
 * This component displays step-by-step process cards inside a workflow.
 * On mobile & tablet, all steps are automatically treated as fully active with
 * no animations, resulting in a clean vertical flow.
 * On desktop, it keeps the 4-column zigzag layout with dynamic connector lines
 * and animated progress logic.
 */

import { useEffect, useState } from "react";
import type { ProcessCardProps } from "@/types/Step";

export const ProcessCard = ({
  title,
  description,
  icon: Icon,
  index,
  isLast,
  isActive = false,
  isCompleted = false,
  progress = 0,
}: ProcessCardProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const mobileActive = isMobile ? true : isActive;
  const mobileCompleted = isMobile ? true : isCompleted;
  const mobileProgress = isMobile ? 100 : progress;

  return (
    <div
      className={`relative flex flex-col items-center group ${
        mobileActive || mobileCompleted ? "" : "pointer-events-none"
      }`}
    >
      <div className="relative z-10 mb-6 hidden lg:block">
        <div
          className="w-20 h-20 rounded-2xl dark:bg-black bg-neutral-500 border dark:border-muted/50 flex items-center justify-center dark:shadow-lg shadow-primary/30 dark:shadow-primary/20 transition-all duration-300 group-hover:scale-110"
          style={{
            opacity: mobileActive || mobileCompleted ? 1 : 0.5,
          }}
        >
          <Icon
            className="w-10 h-10 text-emerald-50 dark:text-emerald-100 dark:group-hover:text-primary"
            strokeWidth={1}
          />
        </div>
      </div>

      <div
        className="bg-white dark:bg-black w-[350px] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-neutral-800 hover:border-primary lg:w-full h-full dark:group-hover:scale-105"
        style={{
          opacity: mobileActive || mobileCompleted ? 1 : 0.5,
          filter: mobileActive || mobileCompleted ? "none" : "blur(1.5px)",
        }}
      >
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center">
          {description}
        </p>
      </div>

      {!isLast && index % 4 !== 3 && (
        <div
          className="absolute hidden lg:block top-10 w-full h-0.5 z-0"
          style={{
            opacity: mobileActive || mobileCompleted ? 1 : 0.5,
            left: index < 4 ? "50%" : undefined,
            right: index >= 4 ? "50%" : undefined,
          }}
        >
          <div className="absolute inset-0 border-t-2 border-primary/40 border-dotted dark:border-neutral-700" />

          <div
            className="absolute top-0 h-full border-dotted border-t-2 border-primary/60 transition-all duration-100"
            style={{
              opacity: mobileActive || mobileCompleted ? 1 : 0.3,
              left: index < 4 ? 0 : undefined,
              right: index >= 4 ? 0 : undefined,
              width: mobileCompleted
                ? "100%"
                : mobileActive
                ? `${mobileProgress}%`
                : "0%",
            }}
          />
        </div>
      )}

      {!isLast && index % 4 === 3 && (
        <div className="absolute hidden lg:block bottom-[-2rem] left-1/2 w-0.5 h-8 z-0">
          <div
            className="absolute top-2 inset-0 border-l-2 border-dotted border-primary/40 dark:border-neutral-700"
            style={{
              opacity: mobileActive || mobileCompleted ? 1 : 0.3,
            }}
          />
          <div
            className="absolute top-2 left-0 w-full border-dotted  border-l-2 border-primary/60 transition-all duration-100"
            style={{
              opacity: mobileActive || mobileCompleted ? 1 : 0.3,
              height: mobileCompleted
                ? "100%"
                : mobileActive
                ? `${mobileProgress}%`
                : "0%",
            }}
          />
        </div>
      )}
    </div>
  );
};
