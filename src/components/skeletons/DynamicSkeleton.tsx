import { Skeleton } from "@/components/ui/skeleton";
import { skeletonPresets } from "./presets";
import type { SkeletonPreset } from "@/types/state";

interface DynamicSkeletonProps {
  preset: keyof typeof skeletonPresets;
  count?: number;
  className?: string;
}

export const DynamicSkeleton = ({
  preset,
  count = 1,
  className = "space-y-3",
}: DynamicSkeletonProps) => {
  const layout: SkeletonPreset = skeletonPresets[preset];

  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="space-y-2">
          {layout.map((block, i) => {
            if (block.type === "spacer") {
              return <div key={i} style={{ height: block.height }} />;
            }

            if (block.type === "text") {
              return (
                <Skeleton
                  key={i}
                  style={{
                    width: block.width ?? "100%",
                    height: block.height ?? 16,
                  }}
                />
              );
            }

            return (
              <Skeleton
                key={i}
                className="w-full rounded-xl"
                style={{ height: block.height }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
