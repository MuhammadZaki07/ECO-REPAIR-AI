import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { useEcoWallet } from "@/hooks/useEcoWallet";
import { useAuthContext } from "@/hooks/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { ENV } from "@/env";

export default function EcoWalletCard() {
  const { userData } = useAuthContext();
  const { balance, loading: walletLoading } = useEcoWallet(userData?.id);
  return (
    <Card className="p-8 flex flex-col justify-between relative overflow-hidden">
      <div>
        <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
          Eco Coin Balance
        </p>
        <h2 className="text-6xl font-black italic mt-2">
          {walletLoading ? (
            <Skeleton className="h-20 w-64" />
          ) : (
            <>{balance.toLocaleString("id-ID")}</>
          )}
          <span className="text-xs text-zinc-500 ml-2">EC</span>
        </h2>
      </div>

      <Link to={`${ENV.URL_USER}/ecocoin`}>
        <Button className="mt-6 w-full font-medium uppercase tracking-widest">
          Exchange Impact
        </Button>
      </Link>
    </Card>
  );
}
