import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PreviewBanner } from "./components/PreviewBanner.tsx";
import Providers from "./providers/Providers.tsx";
import { SelectedHospitalsContextProvider } from "./components/SelectedHospitalContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PreviewBanner />
    <Providers>
      <SelectedHospitalsContextProvider>
        <App />
      </SelectedHospitalsContextProvider>
    </Providers>
  </React.StrictMode>
);
