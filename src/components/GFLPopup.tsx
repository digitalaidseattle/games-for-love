import { Popup } from "react-map-gl";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { PopupInfo } from "../models/popupInfo";
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
        <HospitalCard popupInfo={popupInfo} onClose={onClose} />
      </Popup>
    )
  );
};
