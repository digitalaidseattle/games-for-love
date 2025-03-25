/**
 * App.tsx
 */

import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";

import { GFLMap } from "./components/GFLMap";
import { HospitalCardDetails } from "./components/HospitalCardDetails";
import { SearchAndSort } from "./components/SearchAndSort";

import { HospitalsContext } from "./context/HospitalContext";
import { hospitalService } from "./services/hospital/hospitalService";
import { SelectedHospitalContext } from "./context/SelectedHospitalContext";
import { useSearchParams } from "react-router-dom";

import "maplibre-gl/dist/maplibre-gl.css";
import "react-reflex/styles.css";
import "./App.css";

const FUNDRAISEUP_WIDGET_URL = import.meta.env.VITE_FUNDRAISEUP_WIDGET_URL;
import { FilterContext } from "./context/FilterContext";

const HospitalList = ({ setSearchParams }: { setSearchParams: any }) => {
  const { hospitals } = useContext(HospitalsContext);
  const { setHospital } = useContext(SelectedHospitalContext);
  return hospitals?.map((hospital, idx: number) => (
    <HospitalCardDetails
      key={`h-${idx}`}
      hospital={hospital}
      setSearchParams={setSearchParams}
      onDonate={() => setHospital(hospital)}
    />
  ));
};

function App() {
  const { filters } = useContext(FilterContext);
  const { hospitals, setOriginals } = useContext(HospitalsContext);
  const { hospital, setHospital } = useContext(SelectedHospitalContext);
  const [windowHeight, setWindowHeight] = useState<number>(400);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    function handleResize() {
      setWindowHeight(window.innerHeight);
    }
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const designationId = searchParams.get("designation");

    if (!designationId) {
      setHospital(undefined);
      return;
    }

    if (hospitals.length > 0) {
      const selectedHospital = hospitals.find((h) => h.id === designationId);
      if (selectedHospital) {
        console.log("🏥 Setting hospital to:", selectedHospital.name);
        setHospital(selectedHospital);
      } else {
        console.warn("⚠ Hospital not found for ID:", designationId);
      }
    }
  }, [searchParams, hospitals, setHospital]);

  useEffect(() => {
    if (!hospital) {
      const fundraiseWidget = document.querySelector(
        ".fundraiseup-widget select"
      ) as HTMLSelectElement | null;

      if (fundraiseWidget instanceof HTMLSelectElement) {
        fundraiseWidget.value = "";
      }

      return;
    }

    const fundraiseWidget = document.querySelector(
      ".fundraiseup-widget select"
    ) as HTMLSelectElement | null;

    if (fundraiseWidget instanceof HTMLSelectElement) {
      fundraiseWidget.value = hospital.id;
      fundraiseWidget.dispatchEvent(new Event("change", { bubbles: true }));
      console.log("🔄 Updated FundraiseUp designation to:", hospital.name);
    } else {
      console.warn("⚠ FundraiseUp widget not found, reloading script...");

      const widgetUrl = `${FUNDRAISEUP_WIDGET_URL}&designation=${hospital.id}`;

      document
        .querySelectorAll(`script[src*="fundraiseup.com"]`)
        .forEach((script) => script.remove());

      const script = document.createElement("script");
      script.src = widgetUrl;
      script.async = true;
      script.onload = () =>
        console.log("✅ Fundraise Up script loaded for:", hospital.name);
      script.onerror = () =>
        console.error("❌ Failed to load Fundraise Up script");
      document.head.appendChild(script);
    }
  }, [hospital]);

  useEffect(() => {
    if (!hospital) return;

    const fundraiseWidget = document.querySelector(
      ".fundraiseup-widget select"
    ) as HTMLSelectElement | null;

    if (fundraiseWidget) {
      fundraiseWidget.value = hospital.id;
      fundraiseWidget.dispatchEvent(new Event("change", { bubbles: true }));
      console.log("🔄 Updated FundraiseUp designation to:", hospital.name);
    } else {
      console.warn("⚠ FundraiseUp widget not found, reloading script...");

      const widgetUrl = ` ${FUNDRAISEUP_WIDGET_URL}&designation=${hospital.id}`;

      document
        .querySelectorAll(`script[src*="fundraiseup.com"]`)
        .forEach((script) => script.remove());

      const script = document.createElement("script");
      script.src = widgetUrl;
      script.async = true;
      script.onload = () =>
        console.log("✅ Fundraise Up script loaded for:", hospital.name);
      script.onerror = () =>
        console.error("❌ Failed to load Fundraise Up script");
      document.head.appendChild(script);
    }
  }, [hospital]);

  useEffect(() => {
    if (filters) {
      hospitalService.findAll(filters).then((res) => setOriginals(res));
    }
  }, [filters]);

  return (
    <>
      <ReflexContainer orientation="vertical">
        <ReflexElement>
          <Box sx={{ height: windowHeight, overflowY: "auto" }}>
            <SearchAndSort />
            <Box padding={1} data-testid="hospital-list">
              <HospitalList setSearchParams={setSearchParams} />
            </Box>
          </Box>
        </ReflexElement>

        <ReflexSplitter>
          <Box height={windowHeight} width={5}></Box>
        </ReflexSplitter>

        <ReflexElement>
          <Box height={windowHeight} data-testid="gfl-map-box">
            <GFLMap />
          </Box>
        </ReflexElement>
      </ReflexContainer>
    </>
  );
}

export default App;
