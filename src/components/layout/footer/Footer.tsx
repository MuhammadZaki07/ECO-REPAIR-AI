import Logo from "@/components/Logo";

export function Footer() {
  return (
    <footer className="dark:bg-black bg-neutral-200 border-t border-white/10 py-12 md:pt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1 flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <Logo className="w-12 h-12" />
              <span className="text-xl font-bold text-neutral-900 dark:text-primary/80">
                ECO REPAIR AI
              </span>
            </div>

            <p className="text-sm text-neutral-900 dark:text-white/60">
              Fix It. Don't Trash It.
            </p>

            <p className="mt-4 text-xs text-neutral-900 dark:text-white/40 max-w-xs">
              Platform AI Multi-Modal untuk memandu Anda dalam Circular Economy.
            </p>
          </div>

          <div>
            <h4 className="text-md font-semibold text-neutral-900 dark:text-white mb-4">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-neutral-900 dark:text-white/60">
              <li>
                <a
                  href="/features"
                  className="hover:text-[#4ade80] transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="/flow"
                  className="hover:text-[#4ade80] transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="/rewards"
                  className="hover:text-[#4ade80] transition-colors"
                >
                  Eco-Coin Rewards
                </a>
              </li>
              <li>
                <a
                  href="/community"
                  className="hover:text-[#4ade80] transition-colors"
                >
                  Community
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-semibold dark:text-white text-neutral-900 mb-4">
              Legal & Docs
            </h4>
            <ul className="space-y-2 text-sm text-neutral-900 dark:text-white/60">
              <li>
                <a
                  href="/privacy"
                  className="hover:text-[#4ade80] transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="hover:text-[#4ade80] transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/docs"
                  className="hover:text-[#4ade80] transition-colors"
                >
                  API Documentation
                </a>
              </li>
              <li>
                <a
                  href="/status"
                  className="hover:text-[#4ade80] transition-colors"
                >
                  System Status
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-semibold text-neutral-900 dark:text-white mb-4">
              Connect
            </h4>
            <ul className="space-y-2 text-sm text-neutral-900 dark:text-white/60">
              <li>
                <a
                  href="mailto:team@ecorepair.ai"
                  className="hover:text-[#4ade80] transition-colors"
                >
                  team@ecorepair.ai
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ecorepair-project"
                  className="hover:text-[#4ade80] transition-colors"
                  target="_blank"
                >
                  GitHub Project
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/team-ecorepair"
                  className="hover:text-[#4ade80] transition-colors"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t dark:border-white/10 border-e-neutral-500 text-neutral-900 dark:text-white/60 text-center text-xs">
          &copy; {new Date().getFullYear()} EcoRepair AI. All rights reserved.
          Built for Traspac IT Competition.
        </div>
      </div>
    </footer>
  );
}
