import type { SkeletonPreset } from "@/types/state";
export const skeletonPresets: Record<string, SkeletonPreset> = {
  DETAIL_PAGE: [
    { type: "text", width: "40%", height: 24 },
    { type: "text", width: "75%", height: 36 },
    { type: "text", width: "50%", height: 16 },
    { type: "spacer", height: 16 },
    { type: "box", height: 180 },
    { type: "box", height: 280 },
  ],

  LIST: [
    { type: "text", width: "60%", height: 20 },
    { type: "text", width: "90%", height: 14 },
  ],

  CARD_GRID: [
    { type: "box", height: 160 },
    { type: "text", width: "80%", height: 16 },
    { type: "text", width: "50%", height: 14 },
  ],

  FORM: [
    { type: "text", width: "30%", height: 16 },
    { type: "box", height: 40 },
    { type: "box", height: 40 },
    { type: "box", height: 120 },
  ],
};
