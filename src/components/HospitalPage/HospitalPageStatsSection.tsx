import { Box, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { LearnMoreHospitalContext } from "../../context/SelectedHospitalContext";

const HospitalPageStatsSection = () => {
  const { hospital } = useContext(LearnMoreHospitalContext);
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    if (hospital && hospital.matchedRequest && hospital.matchedFunded) {

      // From Frank 4/24
      // 1. Equipment to be Installed =  Hospital_Fundraising[“#Equipment Shipped”] / Hospital_Request[“Equipment Requested”]
      // 2. Kids Impacted = (Fundraising reached / Fundraising sought) * Hospital_Request[“Kids 3Y”] ) / Hospital_Request[“Kids 3Y”]
      // 3. Play sessions = (Fundraising reached / Fundraising sought) * Hospital_Request[“Play 3Y”] ) / Hospital_Request[“Play 3Y”]

      const percentage = hospital.matchedFunded.fundingCompleted / hospital.matchedRequest.requested;
      setStats([
        {
          startNumber: percentage * parseInt(hospital.matchedRequest.play3Y),
          endNumber: hospital.matchedRequest.play3Y ?? 0,
          label: "play sessions in 3 years",
          background: "linear-gradient(135deg,  #FF6B6B,  #7B68EE)"
        },
        {
          startNumber: hospital.matchedFunded.equipmentShipped ?? 0,
          endNumber: hospital.matchedRequest.equipReq ?? 0,
          label: "equipment installed",
          background: "linear-gradient(135deg,  #2196F3,  #50E3C2)"

        },
        {
          startNumber: percentage * hospital.matchedRequest.kids3Y,
          endNumber: hospital.matchedRequest.kids3Y ?? 0,
          label: "kids impacted in 3 years",
          background: "linear-gradient(135deg,  #7ED321,  #F5D76E)"
        },
      ]);
    }
  }, [hospital]);

  return (stats.length > 0 &&
    <Box sx={{
      background: "linear-gradient(180deg,  #FFFFFF,  #D8ECFF)"
    }}>
      <Stack direction={"row"} justifyContent="space-evenly" padding={4}>
        {stats.map((stat, index) => (
          <Box key={index} sx={{ textAlign: "center" }}>
            {/* Circle with the number */}
            <Stack direction={'column'}
              sx={{
                width: 200,
                height: 120,
                borderRadius: "5px",
                background: stat.background,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="h4"
                sx={{ color: "white" }}>
                {stat.startNumber.toFixed(0)}
              </Typography>
              <Typography variant="body1"
                sx={{ color: "white", fontStyle: "italic" }}
              >
                of {stat.endNumber}
              </Typography>
              <Typography variant="body1"
                sx={{ color: "white" }}
              >
                {stat.label}
              </Typography>
            </Stack>
          </Box>
        ))}
      </Stack >
    </Box >
  );
};

export default HospitalPageStatsSection;
