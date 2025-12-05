// src/app/user/scan/components/chat/EcoCoinRewardCard.tsx

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";

export const EcoCoinRewardCard = ({
  reward,
  onClaim,
}: {
  reward: number;
  onClaim: () => void;
}) => {
  return (
    <div className="flex justify-center mt-6">
      <Card className="w-full max-w-lg border-emerald-500/40 bg-emerald-950/50 backdrop-blur-xl text-white">
        <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
          <Coins className="size-12 text-emerald-400" />
          <p className="text-xl font-semibold text-emerald-300">POTENSI REWARD ANDA!</p>
          <p className="text-3xl font-bold text-emerald-100">
            +{reward} Eco Coins
          </p>
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold tracking-wide"
            onClick={onClaim}
          >
            Perbaikan Selesai, Klaim Koin
          </Button>
          <p className="text-xs text-white/70">Koin akan segera masuk ke saldo Anda setelah konfirmasi.</p>
        </CardContent>
      </Card>
    </div>
  );
};