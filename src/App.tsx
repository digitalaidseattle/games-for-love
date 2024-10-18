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
import { HospitalsContext } from "./context/HospitalsContext";
import { HospitalInfo } from "./models/hospitalInfo";
import { hospitalInfoService } from "./services/hospitalInfo/hospitalInfoService";
import { FilterType } from "./types/fillterType";
import { SelectedHospitalsContextProvider } from "./components/SelectedHospitalContext";

const HospitalList = () => {
  const { hospitals } = useContext(HospitalsContext);
  return hospitals.map((hospital, idx: number) => (
    <HospitalCardDetails key={`h-${idx})`} hospital={hospital} />
  ));
};

function App() {
  const { setOriginals } = useContext(HospitalsContext);
  const [windowHeight, setWindowHeight] = useState<number>(400);

  const getHospitalInfo = (filter?: FilterType) => {
    hospitalInfoService
      .getHospitalInfo(filter)
      .then((res: HospitalInfo[]) => {
        setOriginals(res);
      })
      .catch((error) => {
        console.error("An error occurred while fetching data:", error);
      });
  };

  useEffect(() => {
    getHospitalInfo();
    setWindowHeight(window.innerHeight);

    function handleResize() {
      setWindowHeight(window.innerHeight);
    }
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <SelectedHospitalsContextProvider>
      <Grid container>
        <Grid item xs={12} lg={5}>
          <Box sx={{ height: windowHeight, overflowY: "auto" }}>
            <Box padding={1}>
              <SearchAndSort />
            </Box>
            <Box padding={1}>
              <HospitalList />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} lg={7}>
          <Box height={windowHeight} data-testid="gfl-map-box">
            <GFLMap />
          </Box>
        </Grid>
      </Grid>
    </SelectedHospitalsContextProvider>
  );
}

export default App;
