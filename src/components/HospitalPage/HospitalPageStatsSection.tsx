import { Box, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { LearnMoreHospitalContext } from "../../context/SelectedHospitalContext";
import arrow from "../../assets/handrawn-arrow.png";
import HospitalPageBaseComponent from "./HospitalPageBaseComponent";

const HospitalPageStatsSection = () => {
  const { hospital } = useContext(LearnMoreHospitalContext);
  type Stat = {
    startNumber: number;
    endNumber: string | number;
    label: string;
    background: string;
  };

  const [stats, setStats] = useState<Stat[]>([]);
  const IMPACT_OF_DONATION_HEADER = "The Impact of Your Donation";
  const IMPACT_MESSAGE = "This is the impact people like you have made";

  useEffect(() => {
    if (hospital && hospital.matchedRequest && hospital.matchedFunded) {
      // From Frank 4/24
      // 1. Equipment to be Installed =  Hospital_Fundraising[“#Equipment Shipped”] / Hospital_Request[“Equipment Requested”]
      // 2. Kids Impacted = (Fundraising reached / Fundraising sought) * Hospital_Request[“Kids 3Y”] ) / Hospital_Request[“Kids 3Y”]
      // 3. Play sessions = (Fundraising reached / Fundraising sought) * Hospital_Request[“Play 3Y”] ) / Hospital_Request[“Play 3Y”]

      const percentage =
        hospital.matchedFunded.fundingCompleted /
        hospital.matchedRequest.requested;
      setStats([
        {
          startNumber: percentage * parseInt(hospital.matchedRequest.play3Y),
          endNumber: hospital.matchedRequest.play3Y ?? 0,
          label: "play sessions in 3 years",
          background:
            "linear-gradient(142.35deg, #FF6B6B -16.18%, #7B68EE 132.26%)",
        },
        {
          startNumber: hospital.matchedFunded.equipmentShipped ?? 0,
          endNumber: hospital.matchedRequest.equipReq ?? 0,
          label: "equipment installed",
          background:
            "linear-gradient(141.64deg, #2196F3 -6.39%, #50E3C2 96.87%)",
        },
        {
          startNumber: percentage * hospital.matchedRequest.kids3Y,
          endNumber: hospital.matchedRequest.kids3Y ?? 0,
          label: "kids impacted in 3 years",
          background:
            "linear-gradient(156.77deg, #7ED321 -11.18%, #F5D76E 111.48%)",
        },
      ]);
    }
  }, [hospital]);

  return (
    stats.length > 0 && (
      <Box
        sx={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #D8ECFF 100%)",
          boxShadow: "0px 4px 4px 0px #0000000D",
        }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "inline-block" },
            position: "relative",
            top: { md: "-6em", lg: "-4em" },
            right: { md: "-33em", lg: "-56em", xl: "-62em" },
            width: "24em",
            transform: "rotate(-12deg)",
          }}
        >
          <img
            src={arrow}
            alt="decorative arrow pointing to impact statistics"
            style={{
              width: "5.5em",
              position: "absolute",
              left: "-5em",
              top: "4em",
              transform: "rotate(12deg)",
            }}
          />
          <Typography
            variant="h5"
            sx={{
              width: "13em",
              fontFamily: "'Gloria Hallelujah', cursive",
              textAlign: "center",
              lineHeight: 2,
            }}
          >
            {IMPACT_MESSAGE}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            height: { xs: "50em", lg: "30em" },
            alignItems: "center",
          }}
        >
          <Stack
            direction={{ xs: "column", lg: "row" }}
            justifyContent="space-evenly"
            sx={{
              width: "100%",
              height: "100%",
              padding: { xs: "1em", lg: "5em" },
            }}
          >
            {stats.map((stat, index) => (
              <Box key={index} sx={{ textAlign: "center" }}>
                <Stack
                  direction={"column"}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "24em",
                    height: "13.5em",
                    margin: "0 auto",
                    borderRadius: "1rem",
                    background: stat.background,
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{ color: "white", fontWeight: 700, lineHeight: 1.05 }}
                  >
                    {stat.startNumber.toFixed(0)}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "white",
                      fontSize: "1.3em",
                      fontStyle: "italic",
                      fontWeight: 700,
                    }}
                  >
                    of {stat.endNumber}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "white",
                      fontSize: "1.5em",
                      fontWeight: 700,
                      lineHeight: 2.25,
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Box>
        {/* Impact Section */}
        {hospital?.status === "past" && hospital?.matchedFunded && (
          <HospitalPageBaseComponent
            header={IMPACT_OF_DONATION_HEADER}
            image={hospital?.matchedFunded?.impactPictures[0]}
            paragraph={hospital?.matchedFunded?.impactText}
            styles={{
              header: { color: "#000" },
              paragraph: { margin: "0 2.5rem" },
            }}
          />
        )}
      </Box>
    )
  );
};

export default HospitalPageStatsSection;
