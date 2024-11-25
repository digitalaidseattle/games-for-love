import { Box } from "@mui/material";
import HospitalPageFooter from "./HospitalPageFooter";
import HospitalPageContent from "./HospitalPageContent";
import HospitalPageStatsSection from "./HospitalPageStatsSection";
import HospitalPageMain from "./HospitalPageMain";
import HospitalPageSimilarDetailsSection from "./HospitalPageSimilarDetailsSection";
import HospitalPageTitleRequestNarrative from "./HospitalPageTitleRequestNarrative";

const HospitalDetailsPageModal = () => {
  return (
    <Box sx={{ padding: "20px" }}>
      <HospitalPageMain />
      <HospitalPageTitleRequestNarrative />
      <HospitalPageStatsSection />
      <HospitalPageContent />
      <HospitalPageSimilarDetailsSection />
      <HospitalPageFooter />
    </Box>
  );
};

export default HospitalDetailsPageModal;
