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

import "maplibre-gl/dist/maplibre-gl.css";
import "react-reflex/styles.css";
import "./App.css";

const HospitalList = () => {
  const { hospitals } = useContext(HospitalsContext);
  return hospitals?.map((hospital, idx: number) => (
    <HospitalCardDetails key={`h-${idx}`} hospital={hospital} />
  ));
};

function App() {
  const { setOriginals } = useContext(HospitalsContext);
  const [windowHeight, setWindowHeight] = useState<number>(400);

  const getCombinedHospital = async () => {
    hospitalService.findAll().then((res) => setOriginals(res));
  };

  useEffect(() => {
    getCombinedHospital();

    setWindowHeight(window.innerHeight);

    function handleResize() {
      setWindowHeight(window.innerHeight);
    }
    window.addEventListener("resize", handleResize);

    // Fundraise Up 설치 스크립트 동적으로 추가
    const script = document.createElement("script");
    script.src = "https://cdn.fundraiseup.com/widget/AWALQQAB";
    script.async = true;
    script.onload = () =>
      console.log("Fundraise Up script loaded successfully");
    script.onerror = () => console.error("Failed to load Fundraise Up script");
    document.head.appendChild(script);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <ReflexContainer orientation="vertical">
        <ReflexElement>
          <Box sx={{ height: windowHeight, overflowY: "auto" }}>
            <SearchAndSort />
            <Box padding={1} data-testid="hospital-list">
              <HospitalList />
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
