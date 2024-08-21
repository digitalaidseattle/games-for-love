/**
 *  App.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { Box, Grid } from "@mui/material";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useState } from "react";
import { GFLMap } from "./components/GFLMap";
import { HospitalCardDetails } from "./components/HospitalCardDetails";
import { SearchAndSort } from "./components/SearchAndSort";

import "./App.css";
import { HospitalInfo } from "./models/hospitalInfo";
import { PopupInfo } from "./models/popupInfo";
import { generalInfoService } from "./services/generalInfo/generalInfoService";
import { hospitalFundedService } from "./services/hospitalFunded/hospitalFundedService";
import { hospitalInfoService } from "./services/hospitalInfo/hospitalInfoService";
import { hospitalRequestService } from "./services/hospitalRequest/hospitalRequestService";


// Seattle
const DEFAULT_VIEW = {
  longitude: -122.4,
  latitude: 47.6061,
  zoom: 10,
};

function App() {
  const [viewState, setViewState] = useState(DEFAULT_VIEW);
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);
  const [hospitals, setHospitals] = useState<HospitalInfo[]>([]);
  const [windowHeight, setWindowHeight] = useState<number>(400);

  useEffect(() => {
    hospitalInfoService.getHospitalInfo().then((res: HospitalInfo[]) => {
      setHospitals(res);
    });
    generalInfoService.getGeneralInfo().then((res) => console.log(res));
    hospitalRequestService.getHospitalRequest().then((res) => console.log(res));
    hospitalFundedService.getHospitalFunded().then((res) => console.log(res));
    setWindowHeight(window.innerHeight);

    function handleResize() {
      setWindowHeight(window.innerHeight);
    }
    window.addEventListener('resize', handleResize)
  }, []);

  return (
    <Grid container>
      <Grid item xs={12} lg={5}>
        <Box sx={{ height: windowHeight, overflowY: 'auto' }}>
          <Box padding={1} >
            <SearchAndSort />
          </Box>
          <Box padding={1} >
            {hospitals.map((hospital, idx: number) => (
              <HospitalCardDetails key={`h-${idx})`} hospital={hospital} />
            ))}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} lg={7}>
        <Box height={windowHeight}>
          <GFLMap
            hospitals={hospitals}
            viewState={viewState}
            setViewState={setViewState}
            setPopupInfo={setPopupInfo}
            popupInfo={popupInfo}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default App;
