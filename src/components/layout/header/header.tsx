import { Equal, X } from "@aliimam/icons";
import React from "react";
import { cn } from "@/lib/utils";
import menuItems from "@/data/MenuItemsNavbar.json";
import type { MenuItem } from "@/types/menu";
import Logo from "@/components/Logo";
import { Menus } from "./menus";
import { ModeToggle } from "./theme-switch";
import { ProfileMenu } from "@/components/ui/ProfileMenu";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { LoginButton } from "@/components/LoginButton";
import { useAuthContext } from "@/context/AuthContext";
import GitHubButton from "@/components/GitHubButton";

interface HeaderProps {
  headerAI?: boolean;
  scrollStkiyNav?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  headerAI = false,
  scrollStkiyNav = false,
}) => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { user } = useAuthContext();

  const menus: MenuItem[] = menuItems;

  React.useEffect(() => {
    if (!scrollStkiyNav) return;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 4);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollStkiyNav]);

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className={cn(
          scrollStkiyNav
            ? "fixed z-[999] w-full px-3 md:px-4 transition-colors duration-300"
            : "relative w-full px-3 md:px-4 transition-colors duration-300",
          isScrolled ? "border-transparent" : ""
        )}
      >
        <div
          className={cn(
            "mx-auto mt-2 transition-all duration-300",
            isScrolled &&
              "bg-[oklch(0.141 0.005 285.823)]/50 max-w-5xl rounded-2xl border backdrop-blur-xl px-3"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-3 py-2">
            <div className="flex w-full justify-between lg:w-auto">
              <a href="#" aria-label="home" className="flex gap-2 items-center">
                <Logo
                  variant="full"
                  height={50}
                  width={50}
                  className="h-10 z-10 w-full"
                />
              </a>

              <div className="flex gap-2">
                <button
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState ? "Close Menu" : "Open Menu"}
                  className="relative z-20 pr-4 block cursor-pointer p-2.5 lg:hidden"
                >
                  <Equal className="in-data-[state=active]:rotate-180 scale-120 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto duration-200" />
                  <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-120 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                </button>
              </div>
            </div>

            {!headerAI && (
              <div className="absolute inset-0 m-auto hidden lg:block size-fit">
                <Menus />
              </div>
            )}

            <div
              className={cn(
                "in-data-[state=active]:block lg:in-data-[state=active]:flex hidden w-full flex-wrap items-center justify-end space-y-8 rounded-sm p-3 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent"
              )}
            >
              {!headerAI && (
                <div className="lg:hidden block p-3">
                  <ul className="space-y-6 text-base">
                    {menus.map((item, index) => (
                      <li key={index}>
                        <a
                          href={item.href}
                          className="text-muted-foreground hover:text-primary text-sm block duration-150"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex w-full px-3 py-1 gap-3 items-center space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:gap-2 lg:gap-4">
                <ModeToggle />
                <LocaleSwitcher />
                <GitHubButton />
                {!headerAI && (
                  <div className="ml-auto sm:ml-0">
                    {user ? <ProfileMenu /> : <LoginButton />}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export { Header };
