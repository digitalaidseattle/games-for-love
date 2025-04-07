import { Box } from "@mui/material";
import { useContext } from "react";
import { LearnMoreHospitalContext } from "../../context/SelectedHospitalContext";
import HospitalPageContent from "./HospitalPageContent";
import HospitalPageMain from "./HospitalPageMain";
import HospitalPageSimilarDetailsSection from "./HospitalPageSimilarDetailsSection";
import HospitalPageStatsSection from "./HospitalPageStatsSection";
import HospitalPageTitleRequestNarrative from "./HospitalPageTitleRequestNarrative";
import HospitalPageFooter from "./HospitalPageFooter";

const HospitalDetailsPageModal = () => {
  const { hospital } = useContext(LearnMoreHospitalContext);
  return (
    <Box sx={{ padding: "20px" }}>
      <HospitalPageMain />
      <HospitalPageTitleRequestNarrative />
      <HospitalPageStatsSection />
      <HospitalPageContent />
      {hospital?.status === "past" && <HospitalPageSimilarDetailsSection />}
      <HospitalPageFooter />
    </Box>
  );
};

export default HospitalDetailsPageModal;
