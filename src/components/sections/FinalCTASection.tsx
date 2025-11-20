import { Link } from 'react-router-dom'; 
import { Button } from '../ui/button';

export function FinalCTASection() {
    return (
        <section className="py-24 md:py-32 bg-[#0A0A0A]">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* CTA Card Besar yang Menarik Perhatian */}
                <div 
                    className="p-12 md:p-20 text-center rounded-3xl border border-white/10 shadow-2xl"
                    style={{
                        // Background dengan Soft Green Gradient yang halus
                        background: 'radial-gradient(circle at center, rgba(74, 222, 128, 0.05) 0%, rgba(10, 10, 10, 1) 70%)',
                    }}
                >
                    <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-white max-w-4xl mx-auto">
                        Ready to Fix the Future?
                    </h2>
                    <p className="mt-4 text-xl text-white/70 max-w-3xl mx-auto">
                        Mulai diagnosis instan pertama Anda. Dapatkan panduan perbaikan berbasis AI, kumpulkan Eco-Coin, dan jadilah bagian dari revolusi perbaikan.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                        {/* Tombol Utama (Soft Green) */}
                        <Link to={"/scan"}>
                            <Button
                                size="lg" 
                                className="w-full sm:w-auto bg-[#4ade80] hover:bg-green-500 text-black font-semibold text-lg py-3 px-8 transition-colors duration-300"
                            >
                                Start Scanning Now
                            </Button>
                        </Link>

                        {/* Tombol Sekunder */}
                        <Link to={"/dashboard/hubs"}>
                            <Button 
                                variant="outline" 
                                size="lg" 
                                className="w-full sm:w-auto text-white border-white/30 hover:bg-white/10 font-semibold text-lg py-3 px-8 transition-colors duration-300"
                            >
                                Cek Reward Hub
                            </Button>
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}