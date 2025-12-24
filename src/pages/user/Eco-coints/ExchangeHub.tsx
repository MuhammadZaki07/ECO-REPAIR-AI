import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import VoucherTab from "./components/tabs/VoucherTab";
import MerchTab from "./components/tabs/MerchTab";
import DonationTab from "./components/tabs/DonationTab";
interface ExchangeHubProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
}

export default function ExchangeHub({
  activeTab,
  setActiveTab,
  search,
  setSearch,
}: ExchangeHubProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="space-y-2">
          <h3 className="text-3xl font-bold tracking-tight">Eco-Exchange Hub</h3>
          <p className="text-sm text-muted-foreground">
            Convert your positive impact into tangible rewards.
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Tabs defaultValue="vouchers" className="w-auto" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full md:w-[400px] h-11 bg-muted/50 backdrop-blur-md border border-white/5">
              <TabsTrigger value="vouchers" className="text-xs">Vouchers</TabsTrigger>
              <TabsTrigger value="merch" className="text-xs">Merchandise</TabsTrigger>
              <TabsTrigger value="donasi" className="text-xs">Donation</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div>
        {activeTab === "vouchers" && <VoucherTab search={search} />}
        {activeTab === "merch" && <MerchTab search={search} />}
        {activeTab === "donasi" && <DonationTab search={search} />}
      </div>
    </div>
  );
}
