import { useState, useEffect, useRef } from "react";
import steps from "@/data/step.json";
import { iconMap } from "@/data/iconMap";
import { ProcessCard } from "../ProcessCard";
import { DotBackground } from "../ui/DotBackground";
import { PointerHighlight } from "../ui/pointer-highlight";
import { useTranslation } from "react-i18next";

/* ----------------------------------------------------------------------
  StepSection Component
  ----------------------------------------------------------------------

  Deskripsi Singkat:
  ------------------
  Komponen ini menampilkan visualisasi proses kerja secara bertahap 
  menggunakan animasi progres. Animasi berjalan otomatis setelah 
  pengguna memasuki area section (viewport) menggunakan IntersectionObserver.

  Tujuan Fungsional:
  ------------------
  1. Menunjukkan langkah-langkah proses dalam bentuk kartu (card) berurutan.
  2. Memberikan animasi progres dari 0%–100% untuk setiap step.
  3. Menunda animasi 3 detik setelah section masuk viewport (debounce).
  4. Menjalankan animasi hanya sekali, meskipun user scroll kembali.
  5. Menyediakan tombol “Restart Journey” untuk menjalankan ulang animasi.

  Alasan Penggunaan Logika:
  -------------------------
  • useState → Menyimpan state animasi (activeStep, progress, isComplete)  
  • useEffect → Menjalankan interval animasi serta observer viewport  
  • IntersectionObserver → Memastikan animasi berjalan hanya ketika dilihat  
  • Ref → Menandai elemen section untuk observer  
  • Interval → Mengatur progres animasi (50ms) & perpindahan step (1500ms)

  Alasan Struktur Visual:
  -----------------------
  Data steps ditata ulang menggunakan visualOrder agar menjadi tampilan zigzag:
  Baris 1 → 1 2 3 4  
  Baris 2 → 8 7 6 5  
  Tujuannya agar garis penghubung dan arah bacaan langkah terasa natural secara UI.

  Dampak Ke Performa:
  -------------------
  - Observer menambah efisiensi karena animasi tidak dijalankan ketika tidak terlihat.  
  - Interval dibersihkan otomatis pada unmount untuk menjaga memory leak.  

  ---------------------------------------------------------------------- */

export function StepSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [alreadyPlayedOnce, setAlreadyPlayedOnce] = useState(false);
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const INTERVAL_DURATION = 1500;

  /* ----------------------------------------------------------------------
    1) IntersectionObserver → deteksi saat section masuk viewport
    ----------------------------------------------------------------------
    - Observer hanya dijalankan jika animasi belum pernah berjalan.
    - Ketika section terlihat 40% (threshold: 0.4):
        → Jalankan delay 3 detik
        → Set hasStarted = true
        → Tandai bahwa animasi sudah berjalan sekali (alreadyPlayedOnce)
    ---------------------------------------------------------------------- */
  useEffect(() => {
    if (alreadyPlayedOnce) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          // Delay 3 detik sebelum animasi dimulai
          setTimeout(() => {
            setHasStarted(true);
            setAlreadyPlayedOnce(true); // hanya sekali
          }, 3000);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [alreadyPlayedOnce]);

  /* ----------------------------------------------------------------------
    2) Interval animasi → Progress bar & perpindahan step
    ----------------------------------------------------------------------
    - Eksekusi hanya jika animasi sudah dimulai.
    - Progress berjalan dari 0 → 100 setiap 50ms.
    - Step berpindah setiap INTERVAL_DURATION (1500ms).
    - Ketika mencapai step terakhir → set isComplete = true.
    ---------------------------------------------------------------------- */
  useEffect(() => {
    if (!hasStarted || isComplete) return;

    // progress 0–100
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 100 / (INTERVAL_DURATION / 50);
      });
    }, 50);

    // perpindahan step
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

  /* ----------------------------------------------------------------------
    4) Visual Order Zigzag
    ---------------------------------------------------------------------- */
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
      className="relative py-24 md:py-32 px-4 overflow-hidden dark:bg-black bg-neutral-100"
    >
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <DotBackground />

        {/* Gradient dari bawah ke atas */}
        <div
          className="absolute inset-0 
                  bg-gradient-to-t  via-transparent to-transparent 
                  dark:from-black/80 dark:via-transparent dark:to-transparent"
        ></div>

        {/* Gradient dari atas ke bawah */}
        <div
          className="absolute inset-0 
                  bg-gradient-to-b via-transparent to-transparent 
                  dark:from-black/80 dark:via-transparent dark:to-transparent"
        ></div>

        {/* Gradient dari kanan ke kiri */}
        <div
          className="absolute inset-0 
                  bg-gradient-to-l via-transparent to-transparent 
                  dark:from-black/80 dark:via-transparent dark:to-transparent"
        ></div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto">
        <div className="text-center lg:mb-20 mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            <PointerHighlight
              rectangleClassName="bg-primary/20 dark:bg-neutral-700/30 border-neutral-300/30 dark:border-neutral-600"
              pointerClassName="text-indigo-400"
              containerClassName="inline-block"
            >
              <span className="text-primary dark:text-primary">
                {t("how_it_works_section.how_it_works.title")}
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
                step={t("how_it_works_section.how_it_works.step")}
                title={t("how_it_works_section.how_it_works.title")}
                description={t("how_it_works_section.how_it_works.description")}
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
