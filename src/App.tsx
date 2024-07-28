import { Box, Container, Grid } from "@mui/material";

import "maplibre-gl/dist/maplibre-gl.css";
import { ReactNode, useEffect, useState } from "react";
import {
  FullscreenControl,
  Marker,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";

import Map from "react-map-gl/maplibre";

import { RedPin } from "./components/RedPin";
import { HospitalCardDetails } from "./components/HospitalCardDetails";
import { HospitalPopup } from "./components/HospitalPopup";
import { SearchAndSort } from "./components/SearchAndSort";
import { staticHospitals } from "./data/testData";
import { HospitalInfo } from "./mapping/hospitalInfo";
import "./App.css";

const MAP_HEIGHT = "100vh";

// Seattle
const DEFAULT_VIEW = {
  longitude: -122.4,
  latitude: 47.6061,
  zoom: 7,
};

function App() {
  const [viewState, setViewState] = useState(DEFAULT_VIEW);
  const [hospitals, setHospitals] = useState(staticHospitals);
  const [popupInfo, setPopupInfo] = useState<HospitalInfo | null>(null);
  const [pins, setPins] = useState<ReactNode[]>([]);

  useEffect(() => {
    setPins(
      hospitals.map((hospital, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={hospital.longitude}
          latitude={hospital.latitude}
          onClick={() => {
            setPopupInfo(hospital);
          }}
        >
          <RedPin />
        </Marker>
      ))
    );
  }, []);

  return (
    <Container sx={{ width: "100vw", height: "100vh" }}>
      <Grid container>
        <Grid item xs={12} lg={8}>
          <Box>
            <SearchAndSort />
            {hospitals.map((hospital) => (
              <HospitalCardDetails hospital={hospital} />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box width={"58vw"} height={MAP_HEIGHT}>
            <Map
              {...viewState}
              onMove={(evt) => setViewState(evt.viewState)}
              mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${
                import.meta.env.VITE_MAPTILER_API_KEY
              }`}
            >
              <FullscreenControl position="top-left" />
              <NavigationControl position="top-left" />
              <ScaleControl />
              {pins}
              {popupInfo && (
                <HospitalPopup
                  info={popupInfo}
                  onClose={() => setPopupInfo(null)}
                />
              )}
            </Map>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
