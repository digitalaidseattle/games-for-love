/**
 *  main.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { PreviewBanner } from "./components/PreviewBanner.tsx";
import "./index.css";
import Providers from "./providers/Providers.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PreviewBanner />
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
