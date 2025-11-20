// Asumsi import yang dibutuhkan        
import { IconRecycle, IconCoins, IconUsers, IconMapPin, IconBolt } from "@tabler/icons-react";
import { AnimatedCounter } from "../ui/AnimatedCounter";
import { GlassCard } from "../ui/GlassCard";

export function ImpactStatsSection() {
    return (
        <section className="py-24 md:py-32 bg-[#0A0A0A]">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* JUDUL SECTION */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-semibold tracking-tight text-white">
                        The Impact. Measured.
                    </h2>
                    <p className="mt-3 text-lg text-white/60 max-w-3xl mx-auto">
                        Kontribusi nyata komunitas Eco-Fixer kami terhadap *Circular Economy*.
                    </p>
                </div>

                {/* STATS GRID (5 Kolom menggunakan 2 Baris: 3 + 2) */}
                <div className="flex flex-col gap-8">
                    
                    {/* BARIS 1: 3 STATISTIK UTAMA */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* 1. ITEMS SAVED */}
                        <GlassCard className="p-8 text-center flex flex-col items-center">
                            <IconRecycle className="w-10 h-10 text-[#4ade80] mb-4" strokeWidth={1.5} />
                            <div className="text-5xl font-bold tracking-tight text-white">
                                <AnimatedCounter end={2800} duration={3} suffix="+" />
                            </div>
                            <p className="mt-2 text-sm text-white/60">Items Saved</p>
                        </GlassCard>

                        {/* 2. ECO-COINS DISTRIBUTED */}
                        <GlassCard className="p-8 text-center flex flex-col items-center">
                            <IconCoins className="w-10 h-10 text-[#4ade80] mb-4" strokeWidth={1.5} />
                            <div className="text-5xl font-bold tracking-tight text-white">
                                <AnimatedCounter end={1950} duration={3} suffix="K+" />
                            </div>
                            <p className="mt-2 text-sm text-white/60">Eco-Coins Distributed</p>
                        </GlassCard>

                        {/* 3. ECO-FIXERS JOINED */}
                        <GlassCard className="p-8 text-center flex flex-col items-center">
                            <IconUsers className="w-10 h-10 text-[#4ade80] mb-4" strokeWidth={1.5} />
                            <div className="text-5xl font-bold tracking-tight text-white">
                                <AnimatedCounter end={1500} duration={3} suffix="+" />
                            </div>
                            <p className="mt-2 text-sm text-white/60">Eco-Fixers Joined</p>
                        </GlassCard>
                    </div>

                    {/* BARIS 2: 2 STATISTIK PENDUKUNG */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Kolom kosong untuk centering di desktop */}
                        <div className="hidden md:block"></div> 

                        {/* 4. SPAREPART HUBS REGISTERED */}
                        <GlassCard className="p-8 text-center flex flex-col items-center">
                            <IconMapPin className="w-10 h-10 text-[#4ade80] mb-4" strokeWidth={1.5} />
                            <div className="text-5xl font-bold tracking-tight text-white">
                                <AnimatedCounter end={250} duration={3} suffix="+" />
                            </div>
                            <p className="mt-2 text-sm text-white/60">SparePart Hubs Registered</p>
                        </GlassCard>
                        
                        {/* 5. TOTAL AI DIAGNOSES */}
                        <GlassCard className="p-8 text-center flex flex-col items-center">
                            <IconBolt className="w-10 h-10 text-[#4ade80] mb-4" strokeWidth={1.5} />
                            <div className="text-5xl font-bold tracking-tight text-white">
                                <AnimatedCounter end={5300} duration={3} suffix="+" />
                            </div>
                            <p className="mt-2 text-sm text-white/60">Total AI Diagnoses</p>
                        </GlassCard>
                        
                        {/* Kolom kosong untuk centering di desktop */}
                        <div className="hidden md:block"></div> 
                    </div>
                    
                </div>
            </div>
        </section>
    );
}