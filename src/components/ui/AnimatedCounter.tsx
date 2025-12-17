// src/components/ui/AnimatedCounter.tsx

import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number; // Durasi dalam detik (default: 2)
  decimals?: number; // Jumlah angka di belakang koma (default: 0)
  suffix?: string;   // Teks setelah angka (misal: '+', 'K+')
  prefix?: string;   // Teks sebelum angka
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2,
  decimals = 0,
  suffix = '',
  prefix = '',
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);

  // --- 1. Intersection Observer (Trigger Animation) ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      // Trigger saat 50% elemen masuk viewport
      { threshold: 0.5 } 
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // Membersihkan observer saat komponen di-unmount
        observer.unobserve(ref.current);
      }
    };
  }, []);


  // --- 2. Animation Logic (requestAnimationFrame) ---
  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const totalDurationMs = duration * 1000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / totalDurationMs, 1);
      
      // Easing function (Ease Out Quad for smoother finish)
      const easedProgress = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
      const currentValue = easedProgress * end;
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end); // Memastikan nilai akhir tepat
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  // Formatting the number
  const formattedCount = count.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref}>
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  );
};

export { AnimatedCounter };