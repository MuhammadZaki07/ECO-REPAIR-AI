import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout, AdminLayout } from "@/layouts/index";
import LandingPage from "./pages/landing/Index";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

function App() {
  console.log("Succes configration i18n");
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<LandingPage />} />
            </Route>
            <Route element={<AdminLayout />}>{/* admin routes */}</Route>
          </Routes>
        </BrowserRouter>
      </I18nextProvider>
    </ThemeProvider>
  );
}

export default App;
