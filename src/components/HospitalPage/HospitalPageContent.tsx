import { useContext } from "react";
import { LearnMoreHospitalContext } from "../../context/SelectedHospitalContext";
import HospitalPageBaseComponent from "./HospitalPageBaseComponent";

const HospitalPageContent = () => {
	const { hospital } = useContext(LearnMoreHospitalContext);

	return (
		<div>
			{/* About Our Health Organization Section */}
			<HospitalPageBaseComponent
				header="About Our Health Organization"
				shortParagraph={`Our mission at the organization`}
				paragraph={hospital?.description}
				button
				styles={{
					container: {
						padding: "1rem 5rem",
					},
					header: {
						color: "#000",
						textAlign: "center",
					},
					shortParagraph: {
						color: "#828282",
					},
				}}
			/>
		</div>
	);
};

export default HospitalPageContent;
