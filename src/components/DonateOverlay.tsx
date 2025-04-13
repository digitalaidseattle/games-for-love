import { useContext, useEffect, useCallback } from "react";
import { DonationContext } from "../context/DonationContext";
import { Backdrop, Box, Theme } from "@mui/material";
import DialogCloseButton from "../styles/DialogCloseButton";
import { DonationHospitalContext } from "../context/SelectedHospitalContext";
import { FUNDRAISUP_CONFIG, cleanupFundraiseUp } from "../config/fundraisupConfig";

// Add FundraisUp type definition
declare global {
  interface Window {
    FundraiseUp?: {
      widget: {
        show: (options: { elementId: string; designationId?: string; campaign?: string }) => void;
        hide: () => void;
        destroy?: () => void;
      };
      configure: (options: { token: string }) => void;
    };
    FundraiseUpQ?: Array<() => void>;
  }
}

export const DonateOverlay = () => {
  const { donateOverlayOpen, setDonateOverlayOpen } = useContext(DonationContext);
  const { hospital, setHospital } = useContext(DonationHospitalContext);

  const handleClose = useCallback(() => {
    // First cleanup the widget
    cleanupFundraiseUp();

    // Reset hospital selection
    setHospital(undefined);

    // Close the overlay
    setDonateOverlayOpen(false);
  }, [setDonateOverlayOpen, setHospital]);

  const getWidgetConfig = () => {
    // Default config for general donation
    const defaultConfig = {
      elementId: FUNDRAISUP_CONFIG.DEFAULT_ELEMENT_ID,
      campaign: FUNDRAISUP_CONFIG.CAMPAIGN_ID,
    };

    // If no hospital selected or if it's General Donation, return default config
    if (!hospital?.name || hospital.name === "General Donation") {
      return defaultConfig;
    }

    // For specific hospitals
    const normalizedName = hospital.name.trim();
    const hospitalConfig = Object.entries(FUNDRAISUP_CONFIG.HOSPITALS).find(
      ([key]) => key.toLowerCase() === normalizedName.toLowerCase()
    );

    if (hospitalConfig) {
      const [, config] = hospitalConfig;
      return {
        elementId: config.elementId,
        designationId: config.designationId,
        campaign: FUNDRAISUP_CONFIG.CAMPAIGN_ID,
      };
    }

    // Fallback to default if hospital not found
    return defaultConfig;
  };

  useEffect(() => {
    if (donateOverlayOpen) {
      // Initialize FundraiseUp queue
      window.FundraiseUpQ = window.FundraiseUpQ || [];

      const widgetConfig = getWidgetConfig();

      // Add configuration to queue BEFORE loading script
      window.FundraiseUpQ.push(() => {
        window.FundraiseUp?.configure({
          token: FUNDRAISUP_CONFIG.ORGANIZATION_ID,
        });
      });

      // Add show widget to queue
      window.FundraiseUpQ.push(() => {
        window.FundraiseUp?.widget.show(widgetConfig);
      });

      // Now load the script
      const script = document.createElement("script");
      script.src = `https://cdn.fundraiseup.com/widget/${FUNDRAISUP_CONFIG.ORGANIZATION_ID}`;
      script.async = true;
      script.onerror = () => {
        console.error("Failed to load FundraiseUp script");
        handleClose();
      };
      document.body.appendChild(script);

      return () => {
        cleanupFundraiseUp();
      };
    }
  }, [donateOverlayOpen, hospital, handleClose]);

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
          width="100%"
          maxWidth="800px"
          padding="20px"
        >
          {hospital && <h2>Donate to {hospital.name}</h2>}
          {/* FundraiseUp anchor tag */}
          <a href={`#${getWidgetConfig().elementId}`} style={{ display: "none" }} />
        </Box>
      </Backdrop>
    )
  );
};
