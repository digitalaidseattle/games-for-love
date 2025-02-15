import { useContext } from "react";
import { DonationContext } from "../context/DonationContext";
import { Backdrop, Box, Theme } from "@mui/material";
import DialogCloseButton from "../styles/DialogCloseButton";
import { DonationHospitalContext } from "../context/SelectedHospitalContext";

const FUNDRAISEUP_CAMPAIGN_CODE = import.meta.env
  .VITE_FUNDRAISEUP_CAMPAIGN_CODE;

if (!FUNDRAISEUP_CAMPAIGN_CODE) {
  throw new Error(
    "FUNDRAISEUP_CAMPAIGN_CODE is not set. Application cannot start."
  );
}

export const DonateOverlay = () => {
  const { donateOverlayOpen, setDonateOverlayOpen } =
    useContext(DonationContext);

  const { hospital } = useContext(DonationHospitalContext);

  const handleClose = () => {
    setDonateOverlayOpen(false);
  };

  return (
    donateOverlayOpen && (
      <Backdrop
        sx={(theme) => ({
          zIndex: theme.zIndex.drawer + 1,
          overflowY: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        })}
        open={donateOverlayOpen}
      >
        <DialogCloseButton
          onClick={handleClose}
          sx={{
            backgroundColor: (theme: Theme) => theme.palette.grey[700],
            color: "white",
          }}
        />

        <a
          href={FUNDRAISEUP_CAMPAIGN_CODE}
          style={{ display: "none" }}
          id="fundraise-link"
        ></a>
      </Backdrop>
    )
  );
};
