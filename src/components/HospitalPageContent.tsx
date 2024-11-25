import { useContext } from "react";
import { LearnMoreHospitalContext } from "../context/SelectedHospitalContext";
import HospitalPageBaseComponent from "./HospitalPageBaseComponent";

const HospitalPageContent = () => {
  const { hospital } = useContext(LearnMoreHospitalContext);

  return (
    <div>
      {/* Thank You Section */}
      <HospitalPageBaseComponent
        header={hospital?.matchedFunded?.thankYouNoteTitle}
        shortParagraph={hospital?.matchedFunded?.shortThankYou}
        paragraph={hospital?.matchedFunded?.thankYouNote}
        styles={{
          container: { backgroundColor: "#f9f9f9", padding: "6rem" },
          header: {
            color: "#333",
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "bold",
          },
          shortParagraph: { color: "#828282", textAlign: "center" },
          paragraph: { color: "#000", textAlign: "left" },
        }}
      />

      {/* Impact Section */}
      <HospitalPageBaseComponent
        image={hospital?.matchedFunded?.impactPicture1[0]?.url}
        header={hospital?.matchedFunded?.impactTitle}
        shortParagraph={"This is a short paragraph about the impact."}
        paragraph={`This is the positive impact made possible with your donations!
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}
        styles={{
          container: { backgroundColor: "#039BDC", padding: "5rem" },
          imageContainer: {},
          header: { color: "#fff", textAlign: "center", fontSize: "2rem" },
          paragraph: { color: "#fff" },
          shortParagraph: { color: "#F3C941" },
        }}
      />

      {/* About Our Health Organization Section */}
      <HospitalPageBaseComponent
        header="About Our Health Organization"
        shortParagraph={`This is a short paragraph about our health organization.`}
        paragraph={`Our mission at the organization: 
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}
        styles={{
          container: { backgroundColor: "#f9f9f9", padding: "5rem" },
          header: {
            color: "#000",
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "bold",
          },
          paragraph: { color: "#777", textAlign: "left" },
        }}
      />
    </div>
  );
};

export default HospitalPageContent;
