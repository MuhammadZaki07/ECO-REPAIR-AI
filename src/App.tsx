import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout, AdminLayout } from "@/layouts/index";
import LandingPage from "./pages/landing/Index";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPage />} />
          </Route>
          <Route element={<AdminLayout />}>{/* admin routes */}</Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
