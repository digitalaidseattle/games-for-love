import { useContext, useEffect } from "react";
import { DonationContext } from "../context/DonationContext";
import { Backdrop, Box, Theme } from "@mui/material";
import DialogCloseButton from "../styles/DialogCloseButton";
import { DonationHospitalContext } from "../context/SelectedHospitalContext";

const FUNDRAISEUP_GENERAL_CAMPAIGN_CODE =
  import.meta.env.VITE_FUNDRAISEUP_CAMPAIGN_CODE || "#XWQCRFLJ";

const FUNDRAISEUP_SELECTED_HOSPITAL_CAMPAIGN_CODE =
  import.meta.env.VITE_FUNDRAISEUP_CAMPAIGN_CODE || "#XLGBZUGV";

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

        {hospital ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
            minHeight={50}
          >
            <h2>Donate to {hospital.name}</h2>
            <a
              href={FUNDRAISEUP_SELECTED_HOSPITAL_CAMPAIGN_CODE}
              style={{ display: "none" }}
              id="fundraise-link"
            ></a>
          </Box>
        ) : (
          <a
            href={FUNDRAISEUP_GENERAL_CAMPAIGN_CODE}
            style={{ display: "none" }}
            id="fundraise-link"
          ></a>
        )}
      </Backdrop>
    )
  );
};
