import type { Timeframe } from "@/types/forum"

export const timeframeToDays = (tf: Timeframe): number => {
  switch (tf) {
    case "1d": return 1
    case "7d": return 7
    case "30d": return 30
    case "90d": return 90
    default: return 7
  }
}
