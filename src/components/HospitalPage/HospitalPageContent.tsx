import { useContext } from "react";
import { LearnMoreHospitalContext } from "../../context/SelectedHospitalContext";
import HospitalPageBaseComponent from "./HospitalPageBaseComponent";

const HospitalPageContent = () => {
  const { hospital } = useContext(LearnMoreHospitalContext);

  return (
    <div>
      {/* Thank You Section */}
      {hospital?.status === "past" && hospital?.matchedFunded && (
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
      )}

      {/* Impact Section */}
      {hospital?.status === "past" && hospital?.matchedFunded && (
        <HospitalPageBaseComponent
          image={hospital?.matchedFunded?.impactPictures[0]}
          header={hospital?.matchedFunded?.impactTitle}
          shortParagraph={
            "This is the positive impact made possible with your donations!"
          }
          paragraph={hospital?.matchedFunded?.impactText}
          styles={{
            container: { backgroundColor: "#039BDC", padding: "5rem" },
            imageContainer: {},
            header: { color: "#fff", textAlign: "left", fontSize: "2rem" },
            paragraph: { color: "#fff", textAlign: "left" },
            shortParagraph: { color: "#F3C941", paddingBottom: "1rem" },
          }}
        />
      )}

      {/* About Our Health Organization Section */}
      <HospitalPageBaseComponent
        header="About Our Health Organization"
        shortParagraph={`Our mission at the organization`}
        paragraph={hospital?.description}
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
