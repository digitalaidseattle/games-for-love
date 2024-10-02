import {
  FullscreenControl,
  Marker,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import Map from "react-map-gl/maplibre";
import { HospitalInfo } from "../models/hospitalInfo";
import { PopupInfo } from "../models/popupInfo";
import { GFLPopup } from "./GFLPopup";
import React, { useContext, useRef } from "react";
import { Box } from "@mui/material";
import { Room } from "@mui/icons-material";
import { SelectedHospitalContext } from "./SelectedHospitalContext";

interface MapProps {
  hospitals: HospitalInfo[];
  viewState: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
  setViewState: (v: any) => void;
  setPopupInfo: (p: PopupInfo | null) => void;
  popupInfo: PopupInfo | null;
}
export const GFLMap: React.FC<MapProps> = ({
  hospitals,
  viewState,
  setViewState,
  setPopupInfo,
  popupInfo
}) => {
  const markerRef = useRef<any>(null);
  const { selectedHospital } = useContext(SelectedHospitalContext);

  const isHosptialSelected = (hospital: HospitalInfo): boolean => {
    return selectedHospital ? hospital.id === selectedHospital.id : false;
  }

  return (
    <Map
      {...viewState}
      ref={markerRef}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle={`${import.meta.env.VITE_MAP_STYLE}?key=${import.meta.env.VITE_MAPTILER_API_KEY
        }`}
    >
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />
      {hospitals.map((hospital) => {
        const isAnimated = isHosptialSelected(hospital)
        return (
          <Marker
            key={hospital.id}
            longitude={hospital.longitude}
            latitude={hospital.latitude}
            onClick={() =>
              setPopupInfo({
                hospitalInfo: hospital,
              })
            }
            anchor="bottom"
            style={{
              cursor: "pointer",
            }}
          >
            <div
              style={{
                position: "relative",
                transition: "transform 0.3s ease",
                transform: isAnimated ? "scale(1.5)" : "scale(1)",
              }}
            >
              <Room
                sx={{
                  color: isAnimated
                    ? "#FFFF00"
                    : hospital.status === "Closed"
                      ? "#DB5757"
                      : "#92C65E",
                  strokeWidth: "0.2px",
                  stroke: "black",
                  fontSize: "3rem",
                  "& .MuiSvgIcon-root": {
                    outline: "1px solid red",
                    outlineOffset: "2px",
                  },
                }}
              />
            </div>
          </Marker>
        );
      })}

      {popupInfo && (
        <Box sx={{ display: "flex" }}>
          <GFLPopup popupInfo={popupInfo} onClose={() => setPopupInfo(null)} />
        </Box>
      )}
    </Map>
  );
};
