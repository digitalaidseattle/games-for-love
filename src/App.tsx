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

import {
  DonationHospitalContextProvider,
  LearnMoreHospitalContextProvider,
  SelectedHospitalsContextProvider,
} from "./context/SelectedHospitalContext";
import { sortDirection } from "./types/fillterType";
import DonationDialog from "./components/DonationDialog";
import LearnMoreOverlay from "./components/LearnMoreOverlay";
import { HospitalsContext } from "./context/HospitalContext";
import { FilterContext } from "./context/FilterContext";
import { hospitalService } from "./services/hospital/hospitalService";

const HospitalList = () => {
  const { hospitals } = useContext(HospitalsContext);
  return hospitals?.map((hospital, idx: number) => (
    <HospitalCardDetails key={`h-${idx})`} hospital={hospital} />
  ));
};

function App() {
  const { setHospitals, setOriginals } = useContext(HospitalsContext);
  const { filters } = useContext(FilterContext);
  const [windowHeight, setWindowHeight] = useState<number>(400);

  const getCombinedHospital = async () => {
    hospitalService
      .combineHospitalInfoAndRequestAndFunded()
      .then((res) => setOriginals(res));
  };

  useEffect(() => {
    getCombinedHospital();

    setWindowHeight(window.innerHeight);

    function handleResize() {
      setWindowHeight(window.innerHeight);
    }
    window.addEventListener("resize", handleResize);
  }, []);

  const filterHospitals = async () => {
    const filteredHospitals =
      await hospitalService.combineHospitalInfoAndRequestAndFunded(filters);
    const sortedHospitals = hospitalService.sortingHospitals(
      filteredHospitals,
      filters.sortBy,
      filters.sortDirection
    );
    setHospitals(sortedHospitals);
  };

  useEffect(() => {
    if (filters.sortDirection !== sortDirection.UNDEFINED) {
      filterHospitals();
    }
  }, [filters.sortDirection]);

  return (
    <SelectedHospitalsContextProvider>
      <DonationHospitalContextProvider>
        <LearnMoreHospitalContextProvider>
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
          <LearnMoreOverlay />
          <DonationDialog />
        </LearnMoreHospitalContextProvider>
      </DonationHospitalContextProvider>
    </SelectedHospitalsContextProvider>
  );
}

export default App;
