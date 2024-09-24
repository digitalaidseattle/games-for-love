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
import { HospitalsContext } from "./components/HospitalsContext";
import { HospitalInfo } from "./models/hospitalInfo";
import { generalInfoService } from "./services/generalInfo/generalInfoService";
import { hospitalFundedService } from "./services/hospitalFunded/hospitalFundedService";
import { hospitalInfoService } from "./services/hospitalInfo/hospitalInfoService";
import { hospitalRequestService } from "./services/hospitalRequest/hospitalRequestService";

const HospitalList = () => {
  const { hospitals } = useContext(HospitalsContext);
  return (hospitals.map((hospital, idx: number) => (
    <HospitalCardDetails key={`h-${idx})`} hospital={hospital} />
  )))
}

function App() {
  const { setOriginals } = useContext(HospitalsContext);
  const [windowHeight, setWindowHeight] = useState<number>(400);

  const getHospitalInfo = () => {
    hospitalInfoService
      .getHospitalInfo()
      .then((res: HospitalInfo[]) => setOriginals(res))
      .catch((error) => console.error("An error occurred while fetching data:", error));
  };

  useEffect(() => {
    getHospitalInfo();
    generalInfoService.getGeneralInfo().then((res) => console.log(res));
    hospitalRequestService.getHospitalRequest().then((res) => console.log(res));
    hospitalFundedService.getHospitalFunded().then((res) => console.log(res));

    setWindowHeight(window.innerHeight);
    function handleResize() {
      setWindowHeight(window.innerHeight);
    }
    window.addEventListener("resize", handleResize);
  }, []);

  return (
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
        <Box height={windowHeight}>
          <GFLMap />
        </Box>
      </Grid>
    </Grid>
  );
}

export default App;
