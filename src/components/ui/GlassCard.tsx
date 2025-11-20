// src/components/ui/GlassCard.tsx

import React from 'react';
import { cn } from '@/lib/utils'; // Asumsi utilitas cn sudah ada

interface GlassCardProps extends React.ComponentPropsWithoutRef<'div'> {}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Base Glassmorphism style: Dark background, border, backdrop blur
      "rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl text-white shadow-lg transition-all duration-300",
      // Hover effect: Aksen Soft Green pada border
      "hover:border-[#4ade80]/50 hover:bg-white/[0.07]",
      className
    )}
    {...props}
  >
    {children}
  </div>
));

GlassCard.displayName = "GlassCard";
export { GlassCard };