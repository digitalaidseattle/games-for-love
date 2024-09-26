import {
  FullscreenControl,
  Marker,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import Map from "react-map-gl/maplibre";
import { PopupInfo } from "../models/popupInfo";
import { GFLPopup } from "./GFLPopup";

import { useContext, useState } from "react";
import { Box } from "@mui/material";
import { siteService } from "../services/siteUtils";
import { HospitalsContext } from "../context/HospitalsContext";

export const GFLMap = () => {
  const { hospitals } = useContext(HospitalsContext);
  const [viewState, setViewState] = useState(siteService.DEFAULT_VIEW);
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);
  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle={`${import.meta.env.VITE_MAP_STYLE}?key=${
        import.meta.env.VITE_MAPTILER_API_KEY
      }`}
    >
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />
      {hospitals.map((hospital) => (
        <Marker
          color={hospital.status === "past" ? "#DB5757" : "#92C65E"}
          key={hospital.id}
          longitude={hospital.longitude}
          latitude={hospital.latitude}
          onClick={() =>
            setPopupInfo({
              hospitalInfo: hospital,
            })
          }
        />
      ))}
      {popupInfo && (
        <Box sx={{ display: "flex" }}>
          <GFLPopup popupInfo={popupInfo} onClose={() => setPopupInfo(null)} />
        </Box>
      )}
    </Map>
  );
};
