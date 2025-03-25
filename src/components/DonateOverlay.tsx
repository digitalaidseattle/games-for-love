import { useContext, useEffect } from "react";
import { DonationContext } from "../context/DonationContext";
import { Backdrop, Box, Theme } from "@mui/material";
import DialogCloseButton from "../styles/DialogCloseButton";
import { DonationHospitalContext } from "../context/SelectedHospitalContext";
import { useSearchParams } from "react-router-dom";

const FUNDRAISEUP_CAMPAIGN_CODE = import.meta.env
  .VITE_FUNDRAISEUP_CAMPAIGN_CODE;

if (!FUNDRAISEUP_CAMPAIGN_CODE) {
  throw new Error(
    "FUNDRAISEUP_CAMPAIGN_CODE is not set. Application cannot start."
  );
}

const FUNDRAISEUP_SELECTED_HOSPITAL_CAMPAIGN_CODE = import.meta.env
  .VITE_FUNDRAISEUP_SELECTED_HOSPITAL_CAMPAIGN_CODE;

if (!FUNDRAISEUP_SELECTED_HOSPITAL_CAMPAIGN_CODE) {
  throw new Error(
    "FUNDRAISEUP_SELECTED_HOSPITAL_CAMPAIGN_CODEE is not set. Application cannot start."
  );
}

export const DonateOverlay = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { donateOverlayOpen, setDonateOverlayOpen } =
    useContext(DonationContext);

  const { hospital } = useContext(DonationHospitalContext);

  useEffect(() => {
    if (!donateOverlayOpen) {
      handleRemoveDesignation();
    }
  }, [donateOverlayOpen]);

  const handleClose = () => {
    setDonateOverlayOpen(false);
    handleRemoveDesignation();
  };

  const handleRemoveDesignation = () => {
    const updatedParams = new URLSearchParams(searchParams);
    searchParams.delete("designation");
    setSearchParams(updatedParams);
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
        aria-hidden={!donateOverlayOpen}
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
            href={FUNDRAISEUP_CAMPAIGN_CODE}
            style={{ display: "none" }}
            id="fundraise-link"
          ></a>
        )}
      </Backdrop>
    )
  );
};
