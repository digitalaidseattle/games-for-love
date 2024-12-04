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

import DonationDialog from "./components/DonationDialog";
import LearnMoreOverlay from "./components/LearnMoreOverlay";
import { HospitalsContext } from "./context/HospitalContext";
import { hospitalService } from "./services/hospital/hospitalService";

const HospitalList = () => {
  const { hospitals } = useContext(HospitalsContext);
  return hospitals?.map((hospital, idx: number) => (
    <HospitalCardDetails key={`h-${idx})`} hospital={hospital} />
  ));
};

function App() {
  const { setOriginals } = useContext(HospitalsContext);
  const [windowHeight, setWindowHeight] = useState<number>(400);

  const getCombinedHospital = async () => {
    hospitalService
      .findAll()
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

  return (
    <>
      <Grid container>
        <Grid item xs={12} lg={7}>
          <Box sx={{ height: windowHeight, overflowY: "auto" }}>
            {/* <img
              src={GamesForLoveLogo}
              alt="Games For Love Logo"
              width={74}
              height={30}
              style={{ marginRight: "10px" }}
            /> */}
            <SearchAndSort />
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
    </>
  );
}

export default App;
