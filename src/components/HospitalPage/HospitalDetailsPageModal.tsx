import { Box } from "@mui/material";
import HospitalPageFooter from "./HospitalPageFooter";
import HospitalPageContent from "./HospitalPageContent";
import HospitalPageStatsSection from "./HospitalPageStatsSection";
import HospitalPageMain from "./HospitalPageMain";
import HospitalPageSimilarDetailsSection from "./HospitalPageSimilarDetailsSection";
import HospitalPageTitleRequestNarrative from "./HospitalPageTitleRequestNarrative";
import { useContext } from "react";
import { LearnMoreHospitalContext } from "../../context/SelectedHospitalContext";

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
