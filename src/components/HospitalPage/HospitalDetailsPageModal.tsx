import { Box } from "@mui/material";
import { useContext } from "react";
import { LearnMoreHospitalContext } from "../../context/SelectedHospitalContext";
import ActiveHospitalRequestCarousel from "./ActiveHospitalRequestCarousel";
import DonationBarActive from "./DonationBarActive";
import HospitalPageContent from "./HospitalPageContent";
import HospitalPageMain from "./HospitalPageMain";
import HospitalPageSimilarDetailsSection from "./HospitalPageSimilarDetailsSection";
import HospitalPageStatsSection from "./HospitalPageStatsSection";
import HospitalPageTitleRequestNarrative from "./HospitalPageTitleRequestNarrative";

/**This is the starting point of the Hospital Details page */
const HospitalDetailsPageModal = () => {
	const { hospital } = useContext(LearnMoreHospitalContext);
	return (
		<Box>
			{hospital && (
				<>
					<HospitalPageMain />
					{hospital.status === "active" && <DonationBarActive />}
					<HospitalPageTitleRequestNarrative />
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
