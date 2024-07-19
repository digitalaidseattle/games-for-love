import { FullscreenControl, Marker, NavigationControl, ScaleControl } from "react-map-gl";
import Map from 'react-map-gl/maplibre';
import { HospitalInfo } from "../models/hospitalInfo";
import { PopupInfo } from "../models/popupInfo";
import { GFLPopup } from "./GFLPopup";

import React from "react";

interface MapProps {
  hospitals: HospitalInfo[]
  viewState: {
    longitude: number,
    latitude: number,
    zoom: number
  }
  setViewState: (v: any) => void
  setPopupInfo: (p: PopupInfo | null) => void
  popupInfo: PopupInfo | null
}

export const GFLMap: React.FC<MapProps> = ({ hospitals, viewState, setViewState, setPopupInfo, popupInfo }) => {
  return (
    <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      mapStyle={`${import.meta.env.VITE_MAP_STYLE}?key=${import.meta.env.VITE_MAPTILER_API_KEY}`}
    >
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />
      {hospitals.map(hospital => (
        <Marker
          key={hospital.id}
          longitude={hospital.longitude}
          latitude={hospital.latitude}
          onClick={() =>
            setPopupInfo({
              hospitalInfo: hospital
            })
          }
        />
      ))}
      {popupInfo && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <GFLPopup
            popupInfo={popupInfo}
            onClose={() => setPopupInfo(null)}
          />
        </div>
      )}
    </Map>
  )
}
