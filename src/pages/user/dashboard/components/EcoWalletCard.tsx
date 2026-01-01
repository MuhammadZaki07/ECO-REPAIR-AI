import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { useEcoWallet } from "@/hooks/useEcoWallet";
import { useAuthContext } from "@/hooks/context/AuthContext";
import { Link } from "react-router-dom";
import { ENV } from "@/env";
import { Skeleton } from "@/components/ui/skeleton";

export default function EcoWalletCard() {
  const { userData } = useAuthContext();
  const { balance, loading } = useEcoWallet(userData?.id);
  return (
    <>
      {loading ? (
        <Skeleton />
      ) : (
        <Card className="p-8 h-80 flex flex-col justify-between relative overflow-hidden dark:bg-black ">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
              Eco Coin Balance
            </p>
            <h2 className="text-6xl font-black italic mt-2">
              {balance.toLocaleString("id-ID")}{" "}
              <span className="text-xs text-muted-foreground ml-2">EC</span>
            </h2>
          </div>

          <Link to={`${ENV.URL_USER}/ecocoin`}>
            <Button className="mt-6 w-full font-medium uppercase tracking-widest">
              Exchange Impact
            </Button>
          </Link>
        </Card>
      )}
    </>
  );
}
