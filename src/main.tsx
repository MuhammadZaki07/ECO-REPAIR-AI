import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "@/hooks/context/AuthContext";
import { HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <HashRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </HashRouter>
  // </React.StrictMode>
);
