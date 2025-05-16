/**
 *  DonateOverlay.tsx
 *
 *  @copyright 2025 Digital Aid Seattle
 *
 */

import { useContext, useEffect, useCallback } from "react";
import { DonationContext } from "../context/DonationContext";
import { Backdrop, Box, Theme } from "@mui/material";
import DialogCloseButton from "../styles/DialogCloseButton";
import { DonationHospitalContext } from "../context/SelectedHospitalContext";
import {
  FUNDRAISUP_CONFIG,
  cleanupFundraiseUp,
} from "../config/fundraisupConfig";
import { GeneralInfoContext } from "../context/GeneralInfoContext";

declare global {
  interface Window {
    FundraiseUp?: {
      widget: {
        show: (options: {
          elementId: string;
          designationId?: string;
          campaign?: string;
        }) => void;
        hide: () => void;
        destroy?: () => void;
      };
      configure: (options: { token: string }) => void;
    };
    FundraiseUpQ?: Array<() => void>;
  }
}

export const DonateOverlay = () => {
  const { generalInfo } = useContext(GeneralInfoContext);
  const { donateOverlayOpen, setDonateOverlayOpen } =
    useContext(DonationContext);
  const { hospital, setHospital } = useContext(DonationHospitalContext);

  const handleClose = useCallback(() => {
    cleanupFundraiseUp();
    setHospital(undefined);
    setDonateOverlayOpen(false);
  }, [setDonateOverlayOpen, setHospital]);

  const getWidgetConfig = () => {
    if (!hospital) {
      return {
        elementId: FUNDRAISUP_CONFIG.GENERAL_ELEMENT_ID,
        campaign: generalInfo.fundraiseUpCampaignId,
      };
    } else {
      return {
        elementId: FUNDRAISUP_CONFIG.HOSPITAL_ELEMENT_ID,
        campaign: hospital.matchedRequest?.fundraiseUpCampaignId,
      };
    }
  };

  useEffect(() => {
    if (donateOverlayOpen) {
      console.log("Effect triggered with: ", {
        contextOrgId: generalInfo.fundraiseUpOrganizationId,
        configOrgId: FUNDRAISUP_CONFIG.ORGANIZATION_ID,
        generalInfo: generalInfo,
      });

      window.FundraiseUpQ = window.FundraiseUpQ || [];
      const widgetConfig = getWidgetConfig();

      window.FundraiseUpQ.push(() => {
        window.FundraiseUp?.configure({
          token: generalInfo.fundraiseUpOrganizationId,
        });
      });

      window.FundraiseUpQ.push(() => {
        window.FundraiseUp?.widget.show(widgetConfig);
      });

      const script = document.createElement("script");

      script.src = `https://cdn.fundraiseup.com/widget/${FUNDRAISUP_CONFIG.ORGANIZATION_ID}`;
      script.async = true;
      script.setAttribute("as", "script");
      script.setAttribute("importance", "high");
      script.onerror = () => {
        console.error("Failed to load FundraiseUp script");
        handleClose();
      };
      document.body.appendChild(script);

      return () => {
        cleanupFundraiseUp();
      };
    }
  }, [donateOverlayOpen, hospital, generalInfo, handleClose]);

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
            href={`#${getWidgetConfig().elementId}`}
            style={{ display: "none" }}
          />
        </Box>
      </Backdrop>
    )
  );
};
