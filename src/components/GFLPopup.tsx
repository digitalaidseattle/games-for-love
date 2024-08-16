import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { PopupInfo } from "../models/popupInfo";
import { Popup } from "react-map-gl";
import { HospitalCard } from "./cards/HospitalCard";
import "./GFLPopup.style.css";
interface GFLPopupProps {
  popupInfo: PopupInfo | null;
  onClose: () => void;
}
export const GFLPopup: React.FC<GFLPopupProps> = ({
  popupInfo = null,
  onClose,
}) => {
  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    if (popupInfo) {
      setImages(popupInfo.hospitalInfo.hospitalPicture1);
    }
  }, [popupInfo]);
  return (
    popupInfo && (
      <Popup
        longitude={popupInfo.hospitalInfo.longitude}
        latitude={popupInfo.hospitalInfo.latitude}
        closeButton={false}
        closeOnClick={false}
        onClose={onClose}
        anchor="top"
        className="popup-style"
      >
        <HospitalCard popupInfo={popupInfo} images={images} onClose={onClose} />
      </Popup>
    )
  );
};
