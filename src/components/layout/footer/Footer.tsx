// src/components/layout/Footer.tsx

export function Footer() {
    return (
        <footer className="bg-[#101010] border-t border-white/10 py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-6">
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    
                    {/* KOLOM 1: Visi & Logo */}
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="text-2xl font-bold text-[#4ade80]">EcoRepair AI</h3>
                        <p className="mt-2 text-sm text-white/60">
                            Fix It. Don't Trash It.
                        </p>
                        <p className="mt-4 text-xs text-white/40 max-w-xs">
                            Platform AI Multi-Modal untuk memandu Anda dalam Circular Economy.
                        </p>
                    </div>

                    {/* KOLOM 2: Platform Links */}
                    <div>
                        <h4 className="text-md font-semibold text-white mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm text-white/60">
                            <li><a href="/features" className="hover:text-[#4ade80] transition-colors">Features</a></li>
                            <li><a href="/flow" className="hover:text-[#4ade80] transition-colors">How It Works</a></li>
                            <li><a href="/rewards" className="hover:text-[#4ade80] transition-colors">Eco-Coin Rewards</a></li>
                            <li><a href="/community" className="hover:text-[#4ade80] transition-colors">Community</a></li>
                        </ul>
                    </div>
                    
                    {/* KOLOM 3: Legal & Docs */}
                    <div>
                        <h4 className="text-md font-semibold text-white mb-4">Legal & Docs</h4>
                        <ul className="space-y-2 text-sm text-white/60">
                            <li><a href="/privacy" className="hover:text-[#4ade80] transition-colors">Privacy Policy</a></li>
                            <li><a href="/terms" className="hover:text-[#4ade80] transition-colors">Terms of Service</a></li>
                            <li><a href="/docs" className="hover:text-[#4ade80] transition-colors">API Documentation</a></li>
                            <li><a href="/status" className="hover:text-[#4ade80] transition-colors">System Status</a></li>
                        </ul>
                    </div>

                    {/* KOLOM 4: Connect (KONTAK) */}
                    <div>
                        <h4 className="text-md font-semibold text-white mb-4">Connect</h4>
                        <ul className="space-y-2 text-sm text-white/60">
                            <li><a href="mailto:team@ecorepair.ai" className="hover:text-[#4ade80] transition-colors">team@ecorepair.ai</a></li>
                            <li><a href="https://github.com/ecorepair-project" className="hover:text-[#4ade80] transition-colors" target="_blank">GitHub Project</a></li>
                            <li><a href="https://linkedin.com/in/team-ecorepair" className="hover:text-[#4ade80] transition-colors" target="_blank">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>

                {/* COPYRIGHT LINE */}
                <div className="mt-12 pt-8 border-t border-white/10 text-center text-xs text-white/40">
                    &copy; {new Date().getFullYear()} EcoRepair AI. All rights reserved. Built for Traspac IT Competition.
                </div>
            </div>
        </footer>
    );
}