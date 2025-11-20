import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  children?: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl bg-white text-black border border-black/10 shadow-xl transition-all duration-300",
        "dark:bg-[#161616] dark:text-white dark:border-white/10",
        "hover:border-[#4ade80]/50 hover:shadow-2xl hover:shadow-[#4ade80]/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

Card.displayName = "Card";
export { Card };
