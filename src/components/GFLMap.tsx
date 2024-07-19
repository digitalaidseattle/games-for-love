import { FullscreenControl, Marker, NavigationControl, ScaleControl } from "react-map-gl";
import { HospitalInfo } from "../models/hospitalInfo"
import Map from 'react-map-gl/maplibre';
import { PopupInfo } from "../models/popupInfo";
import { GFLPopup } from "./GFLPopup";

import React, { useEffect, useState } from "react";
import thumbnailData from "../../test/thumbnailData.json";
import { HospitalData } from "../models/hospitalData"

interface MapProps {
    hospitals : HospitalInfo[]
    viewState : {
        longitude: number,
        latitude: number,
        zoom: number
    }
    setViewState : (v:any) => void
    setPopupInfo : (p:PopupInfo | null) => void
    popupInfo : PopupInfo | null
}


export const GFLMap : React.FC<MapProps> = ({viewState, setViewState, setPopupInfo, popupInfo})=>{

  const [hospitals, setHospitals] = useState<HospitalData[]>([]);

  useEffect(() => {
    setHospitals(thumbnailData);
  }, []);

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
      key={hospital["ID"]}
      longitude={hospital["Longitude"]}
      latitude={hospital["Latitude"]}
      onClick={() =>
        setPopupInfo({
          hospitalInfo: {
            id: hospital["ID"],
            name: hospital["Hospital Name"],
            status: hospital["Status"],
            type: hospital["Type of Organization"],
            description: hospital["Organization Notes / Description"],
            year: hospital["Kids Served / Year"],
            country: hospital["Country"],
            state: hospital["State"],
            zip: hospital["ZIP"],
            city: hospital["City"],
            address: hospital["Address"],
            longitude: hospital["Longitude"],
            latitude: hospital["Latitude"],
            hospitalPicture1: hospital["Hospital Picture 1"].map(pic => pic.url),
            hospitalPicture2: [],
            hospitalPicture3: []
          }
        })
      }
    />
    ))}
    {popupInfo && (
      <div style={{display:'flex', justifyContent:'center'}}>
        <GFLPopup
        popupInfo={popupInfo}
        onClose={() => setPopupInfo(null)}
      />
      </div>
    )}
  </Map>
  )
}
