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

/**This is the starting point of the Hospital Details page */
const HospitalDetailsPageModal = () => {
  const { hospital } = useContext(LearnMoreHospitalContext);
  return (
    <Box>
      {hospital && (
        <>
          <HospitalPageMain />
          <Stack>
            <Divider variant="middle" sx={{ margin: 2 }} />
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
