/**
 *  GFLMap.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import {
  Marker,
  NavigationControl,
  ScaleControl
} from "react-map-gl";
import Map from "react-map-gl/maplibre";


import { PopupInfo } from "../models/popupInfo";
import { GFLPopup } from "./GFLPopup";

import { Room } from "@mui/icons-material";
import { Box, Theme } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { HospitalsContext } from "../context/HospitalContext";
import { SelectedHospitalContext } from "../context/SelectedHospitalContext";
import { Hospital } from "../models/hospital";
import { siteService } from "../services/siteUtils";
import { DonateOverlay } from "./DonateOverlay";
import FullWidthControl from "./FullWidthControl";
import LearnMoreOverlay from "./LearnMoreOverlay";
import SponsorPanel from "./SponsorPanel";

const HospitalMarker = (props: {
  hospital: Hospital;
  selected: boolean;
  onClick: (h: Hospital) => void;
}) => {
  const hospital = props.hospital;
  return (
    <Marker
      longitude={hospital.longitude}
      latitude={hospital.latitude}
      onClick={() => props.onClick(hospital)}
      anchor="bottom"
      style={{
        cursor: "pointer",
      }}
    >
      <div
        style={{
          position: "relative",
          transition: "transform 0.3s ease",
          transform: props.selected ? "scale(1.5)" : "scale(1)",
        }}
      >
        <Room
          sx={{
            color: (theme: Theme) =>
              props.selected
                ? theme.palette.hospital.selected
                : hospital.status === "past"
                  ? theme.palette.hospital.closed
                  : theme.palette.hospital.open,
            strokeWidth: "0.2px",
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
};

export const GFLMap = () => {
  // TODO figure out why useRef<MapRef> does not compile
  const markerRef = useRef<any>();
  const { hospitals } = useContext(HospitalsContext);
  const [viewState, setViewState] = useState(siteService.DEFAULT_VIEW);
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);
  const { hospital: selectedHospital, setHospital: setSelectedHospital } = useContext(SelectedHospitalContext);

  useEffect(() => {
    if (selectedHospital) {
      markerRef.current?.flyTo({
        center: [selectedHospital.longitude, selectedHospital.latitude],
        duration: 2000,
      });
      // Review: Should changing selectedHospital close the popup
      if (selectedHospital.id !== popupInfo?.hospital.id) {
        setPopupInfo(null);
      }
    } else {
      setPopupInfo(null);
    }
  }, [selectedHospital]);

  const isHospitalSelected = (hospital: Hospital): boolean => {
    return selectedHospital ? hospital.id === selectedHospital.id : false;
  };

  const handleMarkerSelection = (h: Hospital) => {
    setSelectedHospital(h);
    setPopupInfo({ hospital: h });
  };

  return (
    <Map
      {...viewState}
      ref={markerRef}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle={`${import.meta.env.VITE_MAP_STYLE}?key=${import.meta.env.VITE_MAPTILER_API_KEY}`}
    >
      <FullWidthControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />
      {hospitals &&
        hospitals.filter((h) => !isHospitalSelected(h))
          .map((hospital) => {
            return (
              <HospitalMarker
                key={hospital.id}
                hospital={hospital}
                selected={false}
                onClick={handleMarkerSelection}
              />
            );
          })}
      {selectedHospital && (
        <HospitalMarker
          key={selectedHospital.id}
          hospital={selectedHospital}
          selected={true}
          onClick={handleMarkerSelection}
        />
      )}
      {popupInfo && (
        <Box sx={{ display: "flex" }}>
          <GFLPopup popupInfo={popupInfo} onClose={() => setPopupInfo(null)} />
        </Box>
      )}
      <SponsorPanel />
      <LearnMoreOverlay />
      <DonateOverlay />
    </Map>
  );
};
