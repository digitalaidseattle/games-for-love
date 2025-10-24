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
    <Box sx={{ padding: "20px" }}>
      {hospital &&
        <>
          <HospitalPageMain />
          <Stack>
            <Divider variant="middle" sx={{ margin: 2 }} />
          </Stack>
          <Stack alignItems={'center'}>
            <Grid container width={'95%'}>
              <Grid item xs={7}>
                <HospitalPageTitleRequestNarrative />
              </Grid>
              <Grid item xs={5}>
                <HospitalPageStatusSection />
              </Grid>
            </Grid>
          </Stack>
          <HospitalPageStatsSection />
          <HospitalPageContent />
          {hospital.status === "past" && <HospitalPageSimilarDetailsSection />}
          {hospital.status === "active" && <ActiveHospitalRequestCarousel />}
        </>
      }
    </Box>
  );
};

export default HospitalDetailsPageModal;
