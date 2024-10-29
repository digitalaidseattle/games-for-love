/**
 *  App.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { Box, Grid } from "@mui/material";
import "maplibre-gl/dist/maplibre-gl.css";
import { useContext, useEffect, useState } from "react";
import { GFLMap } from "./components/GFLMap";
import { HospitalCardDetails } from "./components/HospitalCardDetails";
import { SearchAndSort } from "./components/SearchAndSort";

import "./App.css";

import { FilterType } from "./types/fillterType";
import { hospitalService } from "./services/hospital/hospitalService";
import { Hospital } from "./models/hospital";
import { HospitalsContext } from "./context/HospitalContext";

const HospitalList = () => {
  const { hospitals } = useContext(HospitalsContext);
  return hospitals?.map((hospital, idx: number) => (
    <HospitalCardDetails key={`h-${idx})`} hospital={hospital} />
  ));
};

function App() {
  const { hospitals, setOriginals } = useContext(HospitalsContext);
  const [windowHeight, setWindowHeight] = useState<number>(400);

  const getCombinedHospital = async (filter?: FilterType) => {
    const _hospitals: Hospital[] | undefined =
      await hospitalService.combineHospitalInfoAndRequestAndFunded(filter);
    setOriginals(_hospitals);
  };

  useEffect(() => {
    getCombinedHospital();

    setWindowHeight(window.innerHeight);

    function handleResize() {
      setWindowHeight(window.innerHeight);
    }
    window.addEventListener("resize", handleResize);
  }, []);
  console.log("HOSPITALS", hospitals);

  return (
    <Grid container>
      <Grid item xs={12} lg={7}>
        <Box sx={{ height: windowHeight, overflowY: "auto" }}>
          <Box padding={1}>
            <SearchAndSort />
          </Box>
          <Box padding={1} data-testid="hospital-list">
            <HospitalList />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} lg={5}>
        <Box height={windowHeight} data-testid="gfl-map-box">
          <GFLMap />
        </Box>
      </Grid>
    </Grid>
  );
}

export default App;
