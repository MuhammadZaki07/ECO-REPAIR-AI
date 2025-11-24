// src/pages/RewardDashboard.tsx

import React from 'react';
import { IconCoins, IconTrophy, IconUser, IconHistory, IconChevronRight } from '@tabler/icons-react';
// Asumsi Anda memiliki GlassCard dan Button yang sudah dibuat
import { GlassCard } from '@/components/ui/GlassCard'; 
import { Button } from '@/components/ui/Button'; 

// Data dummy untuk Redemption Center
const rewardItems = [
    { name: "EcoRepair Starter Kit", cost: 1500, description: "Set alat dasar untuk perbaikan elektronik ringan." },
    { name: "Voucher SparePart Rp50k", cost: 2500, description: "Diskon untuk pembelian di toko sparepart mitra." },
    { name: "E-Book Guide Expert", cost: 1000, description: "Panduan perbaikan lanjutan dari komunitas Eco-Fixer." },
];

export function RewardDashboard() {
  const userBalance = 5250; // Contoh saldo pengguna

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* 1. HEADER DASHBOARD & SALDO UTAMA */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <h1 className="text-4xl font-extrabold tracking-tight text-white flex items-center">
                <IconTrophy className="w-8 h-8 text-[#4ade80] mr-3" />
                Reward Hub Dashboard
            </h1>
            <div className="text-right">
                <p className="text-sm text-white/60">Saldo Eco-Coin Anda:</p>
                <div className="flex items-center justify-end text-5xl font-bold text-[#4ade80] mt-1">
                    {userBalance.toLocaleString()} <IconCoins className="w-8 h-8 ml-2" />
                </div>
            </div>
        </div>

        {/* 2. MAIN GRID LAYOUT (3 Panel) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* PANEL KIRI: Quick Stats & Profile (Col-span 1) */}
            <div className="lg:col-span-1 space-y-6">
                <GlassCard className="p-6">
                    <div className="flex flex-col items-center space-y-3">
                        <div className="w-16 h-16 rounded-full bg-[#4ade80]/20 flex items-center justify-center">
                            <IconUser className="w-8 h-8 text-[#4ade80]" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">John Doe (Eco-Fixer Level 5)</h3>
                        <p className="text-sm text-white/60">35 Items Saved</p>
                    </div>
                </GlassCard>

                {/* Quick Link ke History */}
                <Link to="/history">
                    <button className="w-full text-left p-4 bg-[#161616] rounded-xl text-white/80 hover:bg-[#161616]/80 transition-colors flex justify-between items-center">
                        View Full Repair History
                        <IconChevronRight className="w-5 h-5" />
                    </button>
                </Link>
            </div>
            
            {/* PANEL TENGAH: Redemption Center (Marketplace) (Col-span 2) */}
            <div className="lg:col-span-2 space-y-6">
                <h2 className="text-2xl font-semibold text-white">Redemption Center</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {rewardItems.map((item) => (
                        <GlassCard key={item.name} className="p-5 flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-white">{item.name}</h3>
                                <p className="text-sm text-white/60 mt-2">{item.description}</p>
                            </div>
                            <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                                <div className="flex items-center text-lg font-bold text-[#4ade80]">
                                    {item.cost.toLocaleString()} <IconCoins className="w-5 h-5 ml-1" />
                                </div>
                                <Button 
                                    disabled={userBalance < item.cost}
                                    className="bg-[#4ade80] hover:bg-green-500 text-black text-sm"
                                >
                                    {userBalance < item.cost ? 'Koin Kurang' : 'Tukar Sekarang'}
                                </Button>
                            </div>
                        </GlassCard>
                    ))}
                    
                    {/* Placeholder untuk item reward lainnya */}
                    <div className="p-5 bg-white/5 border border-dashed border-white/20 rounded-xl flex items-center justify-center text-white/50 text-center">
                        More exciting rewards coming soon!
                    </div>
                </div>
            </div>
            
            {/* PANEL KANAN: Recent Activity (Col-span 1) */}
            <div className="lg:col-span-1 space-y-6">
                <h2 className="text-2xl font-semibold text-white flex items-center space-x-2">
                    <IconHistory className="w-6 h-6 text-[#4ade80]" />
                    <span>Aktivitas Terbaru</span>
                </h2>
                
                <div className="space-y-3">
                    {/* Contoh Item Aktivitas */}
                    <GlassCard className="p-4 flex justify-between items-center bg-white/5">
                        <p className="text-sm text-white/80">Fixed: Coffee Maker</p>
                        <span className="text-sm font-semibold text-[#4ade80]">+250</span>
                    </GlassCard>
                    <GlassCard className="p-4 flex justify-between items-center bg-white/5">
                        <p className="text-sm text-white/80">Diagnosed: Laptop Screen</p>
                        <span className="text-sm font-semibold text-[#4ade80]">+100</span>
                    </GlassCard>
                     <GlassCard className="p-4 flex justify-between items-center bg-white/5">
                        <p className="text-sm text-white/80">Redeemed: E-Book Guide</p>
                        <span className="text-sm font-semibold text-red-400">-1000</span>
                    </GlassCard>
                    {/* Tambahkan lebih banyak item... */}
                </div>
            </div>
            
        </div>
      </div>
    </div>
  );
}