import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout, AdminLayout } from "@/layouts";
import LandingPage from "./pages/landing/Index";
import Dashboard from "./pages/admin/Dashboard";
import NotFound from "./pages/errors/NotFound";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ScanPage } from "./pages/scan/ScanPage";
import { SparePartHubPage } from "./pages/SparePart/SparePartHubPage";
import AuthLayouts from "./layouts/AuthLayouts";
import { RouterProgress } from "./components/router/RouterProgress";
import AuthCallback from "./pages/auth/callback";

import { ToastViewport } from "@/components/ui/toaster";
import { ToastProviderWrapper } from "./hooks/use-toast";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <I18nextProvider i18n={i18n}>
        <ToastProviderWrapper>
          <BrowserRouter>
            {/* <RouterProgress /> */}
            <Routes>
              <Route element={<MainLayout />}>
                <Route index path="/" element={<LandingPage />} />
              </Route>

              <Route path="/scan" element={<ScanPage />} />
              <Route path="/sparepart" element={<SparePartHubPage />} />
              <Route path="/auth/callback" element={<AuthCallback />} />

              <Route path="admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
              </Route>

              <Route path="auth" element={<AuthLayouts />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <ToastViewport />
        </ToastProviderWrapper>
      </I18nextProvider>
    </ThemeProvider>
  );
}

export default App;
