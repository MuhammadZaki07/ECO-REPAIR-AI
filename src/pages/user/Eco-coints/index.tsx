import { useState } from "react";
import { useEcoWallet } from "@/hooks/useEcoWallet";
import TopCards from "./TopCards";
import ExchangeHub from "./ExchangeHub";
import History from "./components/History";
import { useAuthContext } from "@/hooks/context/AuthContext";

const EcoCoinsPage = () => {
  const { user } = useAuthContext();
  const { balance, loading: walletLoading } = useEcoWallet(user?.id);

  const [activeTab, setActiveTab] = useState("vouchers");
  const [search, setSearch] = useState("");

  return (
    <div className="p-6 space-y-8 bg-background min-h-screen pb-20">
      <TopCards balance={balance} loading={walletLoading} />

      <ExchangeHub
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        search={search}
        setSearch={setSearch}
      />

      <History />
    </div>
  );
};

export default EcoCoinsPage;
