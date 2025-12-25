import { useState } from "react";
import TopCards from "./TopCards";
import ExchangeHub from "./ExchangeHub";
import History from "./components/History";

const EcoCoinsPage = () => {
  const [activeTab, setActiveTab] = useState("vouchers");
  const [search, setSearch] = useState("");

  return (
    <div className="p-6 space-y-8 bg-background min-h-screen pb-20">
      <TopCards/>

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
