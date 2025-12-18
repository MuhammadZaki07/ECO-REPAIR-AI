import { 
  Heart, MessageSquare, HelpCircle, 
  Zap, History, TrendingUp 
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

const dataAktivitas = [
  { name: 'Sen', coins: 10, help: 2 },
  { name: 'Sel', coins: 25, help: 5 },
  { name: 'Rab', coins: 15, help: 3 },
  { name: 'Kam', coins: 45, help: 8 },
  { name: 'Jum', coins: 30, help: 6 },
  { name: 'Sab', coins: 60, help: 12 },
  { name: 'Min', coins: 50, help: 10 },
];

const UserDashboard = () => {
  return (
    <div className="text-white p-5 font-sans">
      <div className="space-y-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-zinc-900 pb-8">
          <div>
            <h1 className="text-5xl font-black italic tracking-tighter uppercase">Overview.</h1>
            <p className="text-zinc-500 font-mono text-[10px] tracking-[0.3em] uppercase mt-2">Personal Performance Index</p>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 py-1 px-4 rounded-lg font-bold text-[10px]">
              RANK: ELITE MECHANIC
            </Badge>
          </div>
        </div>

        {/* --- ROW 1: SOSIAL & AKTIVITAS CARDS --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Likes", val: "1.2k", icon: Heart, color: "text-rose-500", bg: "bg-rose-500/5" },
            { label: "Total Jawaban", val: "142", icon: MessageSquare, color: "text-blue-500", bg: "bg-blue-500/5" },
            { label: "Total Pertanyaan", val: "12", icon: HelpCircle, color: "text-amber-500", bg: "bg-amber-500/5" },
            { label: "Diagnosis History", val: "85", icon: History, color: "text-emerald-500", bg: "bg-emerald-500/5" },
          ].map((item, i) => (
            <Card key={i} className={`border-zinc-900 bg-[#0a0a0a] rounded-2xl p-6 transition-all hover:border-zinc-700`}>
              <div className={`p-2 w-fit rounded-lg ${item.bg} mb-4`}>
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{item.label}</p>
              <h3 className="text-3xl font-black italic mt-1">{item.val}</h3>
            </Card>
          ))}
        </div>

        {/* --- ROW 2: CHARTS & ECO COINS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Chart Tren Koin & Kontribusi */}
          <Card className="lg:col-span-2 bg-[#0a0a0a] border-zinc-900 rounded-3xl p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest italic flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500" /> Activity Growth
                </h3>
                <p className="text-[10px] text-zinc-600 mt-1">Weekly contribution performance</p>
              </div>
              <select className="bg-zinc-900 border-zinc-800 text-[10px] rounded-lg p-1 outline-none">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dataAktivitas}>
                  <defs>
                    <linearGradient id="colorCoins" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000', border: '1px solid #27272a', borderRadius: '8px', fontSize: '10px' }}
                    itemStyle={{ color: '#10b981' }}
                  />
                  <Area type="monotone" dataKey="coins" stroke="#10b981" fillOpacity={1} fill="url(#colorCoins)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Eco Coins Card (Fokus Utama) */}
          <Card className="bg-[#0a0a0a] border-zinc-900 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Zap className="w-20 h-20 text-emerald-500" />
            </div>
            <div className="space-y-1 relative z-10">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest italic">Available Assets</p>
              <h4 className="text-6xl font-black italic tracking-tighter">12.375 <span className="text-xs font-normal text-zinc-600">EC</span></h4>
            </div>
            
            <div className="space-y-4 pt-8 border-t border-zinc-900">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Est. Carbon Value</span>
                <span className="text-[10px] font-mono text-emerald-500">+$42.50</span>
              </div>
              <Button className="w-full bg-white text-black hover:bg-emerald-500 hover:text-white font-black text-[10px] uppercase tracking-widest py-6 rounded-xl transition-all">
                Exchange Impact
              </Button>
            </div>
          </Card>
        </div>

        {/* --- ROW 3: RIWAYAT DIAGNOSIS (Table Style) --- */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600">Recent Diagnosis Ledger</h3>
            <Button variant="link" className="text-[10px] uppercase font-bold text-zinc-500">View All Records</Button>
          </div>
          
          <div className="bg-[#0a0a0a] border border-zinc-900 rounded-2xl overflow-hidden">
             <div className="divide-y divide-zinc-900">
                {[
                  { case: "Faulty ECU - Honda Civic", date: "18 Dec 2024", status: "Resolved", reward: "+0.50 EC" },
                  { case: "Hybrid Battery Drain - Prius", date: "15 Dec 2024", status: "Ongoing", reward: "Pending" },
                  { case: "Brake Sensor Calibration", date: "12 Dec 2024", status: "Resolved", reward: "+0.15 EC" },
                ].map((item, i) => (
                  <div key={i} className="grid grid-cols-4 p-6 hover:bg-zinc-950/50 transition-all items-center">
                    <div className="col-span-2">
                      <p className="text-sm font-bold tracking-tight">{item.case}</p>
                      <p className="text-[9px] text-zinc-600 font-mono mt-1 uppercase">{item.date}</p>
                    </div>
                    <div>
                      <Badge variant="outline" className={`text-[8px] font-bold border-zinc-800 ${item.status === 'Resolved' ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {item.status}
                      </Badge>
                    </div>
                    <div className="text-right font-mono text-xs font-bold">
                      {item.reward}
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;