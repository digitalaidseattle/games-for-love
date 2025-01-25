import { useContext } from "react";
import { GeneralDonationContext } from "../context/GeneralDonationContext";
import { Backdrop, Theme } from "@mui/material";
import DialogCloseButton from "../styles/DialogCloseButton";

export const DonateOverlay = () => {
  const { donateOverlayOpen, setDonateOverlayOpen } = useContext(
    GeneralDonationContext
  );

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

        <a href="#XWQCRFLJ" style={{ display: "none" }} id="fundraise-link"></a>
      </Backdrop>
    )
  );
};
