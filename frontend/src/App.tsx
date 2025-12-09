import { ThemeProvider } from "next-themes";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

import { ToastViewport } from "@/components/ui/toaster";
import { ToastProviderWrapper } from "./hooks/use-toast";
import AppRoutes from "./routes";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <I18nextProvider i18n={i18n}>
        <ToastProviderWrapper>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
          <ToastViewport />
        </ToastProviderWrapper>
      </I18nextProvider>
    </ThemeProvider>
  );
}

export default App;
