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
import { SelectedHospitalsContextProvider } from "./context/SelectedHospitalContext";
import { HospitalFundedContext } from "./context/HospitalFundedContext";
import { HospitalRequestContext } from "./context/HospitalRequestContext";

import { hospitalFundedService } from "./services/hospitalFunded/hospitalFundedService";
import { HospitalFunded } from "./models/hospitalFunded";
import { hospitalRequestService } from "./services/hospitalRequest/hospitalRequestService";
import { HospitalRequest } from "./models/hospitalRequest";

const HospitalList = () => {
  const { hospitals } = useContext(HospitalsContext);
  return hospitals.map((hospital, idx: number) => (
    <HospitalCardDetails key={`h-${idx})`} hospital={hospital} />
  ));
};

function App() {
  const { setOriginals } = useContext(HospitalsContext);
  const { hospitalFunded, setHospitalFunded } = useContext(
    HospitalFundedContext
  );
  const { HospitalRequest, setHospitalRequest } = useContext(
    HospitalRequestContext
  );

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

  const getHospitalFunded = () => {
    hospitalFundedService
      .getHospitalFunded()
      .then((res: HospitalFunded[]) => {
        setHospitalFunded(res);
      })
      .catch((error) => {
        console.error("An error occurred while fetching data:", error);
      });
  };

  const getHospitalRequest = () => {
    hospitalRequestService
      .getHospitalRequest()
      .then((res: HospitalRequest[]) => {
        setHospitalRequest(res);
      })
      .catch((error) => {
        console.error("An error occurred while fetching data:", error);
      });
  };

  useEffect(() => {
    getHospitalInfo();
    getHospitalFunded();
    getHospitalRequest();
    setWindowHeight(window.innerHeight);

    function handleResize() {
      setWindowHeight(window.innerHeight);
    }
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <SelectedHospitalsContextProvider>
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
    </SelectedHospitalsContextProvider>
  );
}

export default App;
