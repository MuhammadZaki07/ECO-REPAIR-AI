import { Header } from "@/components/layout/header/header";
import { Outlet } from "react-router-dom";
import { ReactNode } from "react";
import { Footer } from "@/components/layout/footer/Footer";

interface AuthLayout {
  children?: ReactNode;
}

export default function AuthLayouts({ children }: AuthLayout) {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-hidden">
      <Header scrollStkiyNav={false} headerAI/>
      <main className="flex-1">{children ?? <Outlet />}</main>
      <Footer/>
    </div>
  );
}
