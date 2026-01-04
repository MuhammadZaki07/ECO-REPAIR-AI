import { ThemeProvider } from "next-themes";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

import { ToastViewport } from "@/components/ui/toaster";
import { ToastProviderWrapper } from "./hooks/use-toast";
import AppRoutes from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,
      gcTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <I18nextProvider i18n={i18n}>
        <ToastProviderWrapper>
          <QueryClientProvider client={queryClient}>
            {/* <BrowserRouter> */}
            <AppRoutes />
            {/* </BrowserRouter> */}
          </QueryClientProvider>
          <ToastViewport />
        </ToastProviderWrapper>
      </I18nextProvider>
    </ThemeProvider>
  );
}

export default App;
