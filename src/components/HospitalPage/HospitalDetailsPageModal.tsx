/**
 *  HospitalDetailsPageModal.tsx
 *
 *  @copyright 2025 Digital Aid Seattle
 *
 */
import { Box, Divider, Grid, Stack } from "@mui/material";
import { useContext } from "react";
import { LearnMoreHospitalContext } from "../../context/SelectedHospitalContext";
import ActiveHospitalRequestCarousel from "./ActiveHospitalRequestCarousel";
import HospitalPageContent from "./HospitalPageContent";
import HospitalPageMain from "./HospitalPageMain";
import HospitalPageSimilarDetailsSection from "./HospitalPageSimilarDetailsSection";
import HospitalPageStatsSection from "./HospitalPageStatsSection";
import HospitalPageTitleRequestNarrative from "./HospitalPageTitleRequestNarrative";
import HospitalPageStatusSection from "./HospitalPageStatusSection";
import DialogCloseButton from "../../styles/DialogCloseButton";

/**This is the starting point of the Hospital Details page */
const HospitalDetailsPageModal = () => {
  const { hospital, setHospital } = useContext(LearnMoreHospitalContext);

  const handleClose = () => {
    setHospital(undefined);
  };

  return (
    <Box sx={{ position: "relative" }}>
      {/* Mobile Close Button */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <DialogCloseButton
          onClick={handleClose}
          sx={{
            position: "fixed",
            top: 16,
            right: 16,
            zIndex: 10,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 1)",
            },
          }}
        />
      </Box>
      {hospital && (
        <>
          <HospitalPageMain />
          <Stack>
            <Divider
              variant="middle"
              sx={{ margin: 2, display: { xs: "none", md: "block" } }}
            />
          </Stack>
          <Stack alignItems={"center"} paddingX={{ xs: "1rem", md: "6rem" }}>
            <Grid container spacing={{ md: 3 }}>
              <Grid item xs={12} md={7}>
                <HospitalPageTitleRequestNarrative />
              </Grid>
              <Grid item xs={12} md={5}>
                <HospitalPageStatusSection />
              </Grid>
            </Grid>
          </Stack>
          <HospitalPageStatsSection />
          <HospitalPageContent />
          {hospital.status === "past" && <HospitalPageSimilarDetailsSection />}
          {hospital.status === "active" && <ActiveHospitalRequestCarousel />}
        </>
      )}
    </Box>
  );
};

export default HospitalDetailsPageModal;
