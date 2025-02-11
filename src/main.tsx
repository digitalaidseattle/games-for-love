/**
 *  main.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { PreviewBanner } from "./components/PreviewBanner.tsx";
import "./index.css";
import Providers from "./providers/Providers.tsx";
import Palette from "./styles/theme.ts";

const themes = Palette();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={themes}>
      <CssBaseline />
      <PreviewBanner />
      <Providers>
        <App />
      </Providers>
    </ThemeProvider>
  </React.StrictMode>
);
