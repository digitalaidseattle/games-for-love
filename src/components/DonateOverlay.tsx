/**
 *  DonateOverlay.tsx
 *
 *  @copyright 2025 Digital Aid Seattle
 *
 */

import { Backdrop, Box, Theme } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { loadFundraiseUpWidget, cleanupFundraiseUp, FundraiseUpWidgetConfig } from "../services/fundraiseUp";
import { DonationContext } from "../context/DonationContext";
import { GeneralInfoContext } from "../context/GeneralInfoContext";
import { DonationHospitalContext } from "../context/SelectedHospitalContext";
import DialogCloseButton from "../styles/DialogCloseButton";

// FundraisUp campaign and element configuration
const FUNDRAISEUP_CONFIG = {
  GENERAL_ELEMENT_ID: "XAAQRAAL",
  HOSPITAL_ELEMENT_ID: "XEABHHQN",
} as const;

// DAS configuration for FundraiseUp elements
// const FUNDRAISEUP_CONFIG = {
//   GENERAL_ELEMENT_ID: "XWQCRFLJ",
//   HOSPITAL_ELEMENT_ID: "XHEMMJEY",
// } as const;


export const DonateOverlay = () => {
  const { generalInfo } = useContext(GeneralInfoContext);
  const { donateOverlayOpen, setDonateOverlayOpen } = useContext(DonationContext);
  const { hospital, setHospital } = useContext(DonationHospitalContext);
  const [widgetConfig, setWidgetConfig] = useState<FundraiseUpWidgetConfig>();

  useEffect(() => {
    if (donateOverlayOpen && generalInfo) {
      if (hospital && hospital.matchedRequest) {
        setWidgetConfig({
          elementId: FUNDRAISEUP_CONFIG.HOSPITAL_ELEMENT_ID,
          campaign: hospital.matchedRequest.fundraiseUpCampaignId
        });
      } else {
        setWidgetConfig({
          elementId: FUNDRAISEUP_CONFIG.GENERAL_ELEMENT_ID,
          campaign: generalInfo.fundraiseUpCampaignId
        });
      }
    }
  }, [donateOverlayOpen, hospital, generalInfo]);

  useEffect(() => {
    if (widgetConfig) {
      loadFundraiseUpWidget(generalInfo.fundraiseUpOrganizationId, widgetConfig, handleClose);
      return () => {
        cleanupFundraiseUp();
      };
    }
  }, [widgetConfig]);

  const handleClose: () => void = useCallback(() => {
    cleanupFundraiseUp();
    setHospital(undefined);
    setDonateOverlayOpen(false);
  }, [setDonateOverlayOpen, setHospital]);

  return (
    donateOverlayOpen && (
      <Backdrop
        sx={(theme: Theme) => ({
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
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: (theme: Theme) => theme.zIndex.drawer + 2,
          }}
        />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          minHeight={50}
          borderRadius="15px"
          padding="20px"
          bgcolor={(theme: Theme) => theme.palette.background.paper}
        >
          {hospital && <h2>Donate to {hospital.name}</h2>}
          <a
            href={`#${widgetConfig ? widgetConfig.elementId : ''}`}
            style={{ display: "none" }}
          />
        </Box>
      </Backdrop>
    )
  );
};
