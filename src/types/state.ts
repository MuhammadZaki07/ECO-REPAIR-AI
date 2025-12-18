import type { ReactNode } from "react";

export interface LoadingStateProps {
  children: ReactNode;
  fullPage?: boolean;
  className?: string;
}

export type SkeletonBlock =
  | { type: "text"; width?: string; height?: number }
  | { type: "box"; height: number }
  | { type: "spacer"; height: number };

export type SkeletonPreset = SkeletonBlock[];
