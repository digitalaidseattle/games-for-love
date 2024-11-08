/**
 *  GFLMap.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import {
  FullscreenControl,
  Marker,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import Map from "react-map-gl/maplibre";
import { PopupInfo } from "../models/popupInfo";
import { GFLPopup } from "./GFLPopup";

import { Room } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { siteService } from "../services/siteUtils";
import { SelectedHospitalContext } from "../context/SelectedHospitalContext";
import { HospitalsContext } from "../context/HospitalContext";
import { Hospital } from "../models/hospital";

const HospitalMarker = (props: {
  hospital: Hospital;
  selected: boolean;
  onClick: (h: Hospital) => void;
}) => {
  const hospital = props.hospital;
  return (
    <Marker
      key={hospital.id}
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
            color: props.selected
              ? "#FFFF00"
              : hospital.status === "past"
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
};

export const GFLMap = () => {
  // TODO figure out why useRef<MapRef> does not compile
  const markerRef = useRef<any>();
  const { hospitals } = useContext(HospitalsContext);
  const [viewState, setViewState] = useState(siteService.DEFAULT_VIEW);
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);
  const { hospital: selectedHospital, setHospital: setSelectedHospital } =
    useContext(SelectedHospitalContext);

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
      mapStyle={`${import.meta.env.VITE_MAP_STYLE}?key=${
        import.meta.env.VITE_MAPTILER_API_KEY
      }`}
    >
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />
      {hospitals
        ?.filter((h) => !isHospitalSelected(h))
        .map((hospital) => {
          return (
            <HospitalMarker
              hospital={hospital}
              selected={false}
              onClick={handleMarkerSelection}
            />
          );
        })}
      {selectedHospital && (
        <HospitalMarker
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
    </Map>
  );
};
