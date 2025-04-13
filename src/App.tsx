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

import { FilterContext } from "./context/FilterContext";
import { DrawerWidthContext } from "./context/DrawerWidthContext";
import { DonateOverlay } from "./components/DonateOverlay";

const HospitalList = () => {
  const { hospitals } = useContext(HospitalsContext);
  return hospitals?.map((hospital, idx: number) => (
    <HospitalCardDetails key={`h-${idx})`} hospital={hospital} />
    // <PrevHospitalCardDetails key={`h-${idx})`} hospital={hospital} />
  ));
};

const SizeAwareReflexElement = (props: {
  windowHeight: number;
  dimensions?: any;
}) => {
  const { setLastDrawerWidth } = useContext(DrawerWidthContext);

  useEffect(() => {
    setLastDrawerWidth(props.dimensions.width);
  }, [props]);

  return (
    <Box id="drawer" sx={{ height: props.windowHeight, overflowY: "auto" }}>
      <SearchAndSort />
      <Box data-testid="hospital-list">
        <HospitalList />
      </Box>
    </Box>
  );
};

function App() {
  const { filters } = useContext(FilterContext);
  const { setOriginals } = useContext(HospitalsContext);
  const { drawerWidth } = useContext(DrawerWidthContext);
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    function handleResize() {
      setWindowHeight(window.innerHeight);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (filters) {
      hospitalService
        .findAll(filters)
        .then((res) =>
          setOriginals(
            res.filter((hospital) => hospitalService.isValid(hospital))
          )
        );
    }
  }, [filters]);

  return (
    <>
      <ReflexContainer orientation="vertical">
        <ReflexElement size={drawerWidth} propagateDimensions={true}>
          <SizeAwareReflexElement windowHeight={windowHeight} />
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
      <DonateOverlay />
    </>
  );
}

export default App;
