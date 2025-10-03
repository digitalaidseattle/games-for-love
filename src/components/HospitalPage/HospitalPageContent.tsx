import { useContext } from "react";
import { LearnMoreHospitalContext } from "../../context/SelectedHospitalContext";
import HospitalPageBaseComponent from "./HospitalPageBaseComponent";

const HospitalPageContent = () => {
  const { hospital } = useContext(LearnMoreHospitalContext);
  const ABOUT_HEALTH_ORG_HEADER = "About Our Health Organization";
  const ABOUT_HEALTH_ORG_SHORT_PARAGRAPH = `Our mission at the organization`;

  return (
    <div>
      {/* About Our Health Organization Section */}
      <HospitalPageBaseComponent
        header={ABOUT_HEALTH_ORG_HEADER}
        shortParagraph={ABOUT_HEALTH_ORG_SHORT_PARAGRAPH}
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
