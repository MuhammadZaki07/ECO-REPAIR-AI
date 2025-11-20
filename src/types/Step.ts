export interface ProcessCardProps {
  step: number;
  title: string;
  description: string;
  icon: React.ElementType;
  index: number;
  isLast: boolean;
  // Props baru untuk autoplay
  isActive?: boolean;
  isCompleted?: boolean;
  progress?: number;
}