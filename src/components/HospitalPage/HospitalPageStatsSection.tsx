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

      const percentage = hospital.matchedFunded.fundingCompleted /hospital.matchedRequest.requested;
      setStats([
        {
          startNumber: percentage * parseInt(hospital.matchedRequest.play3Y),
          endNumber: hospital.matchedRequest.play3Y ?? 0,
          label: "Play sessions in 3 years",
        },
        {
          startNumber: hospital.matchedFunded.equipmentShipped ?? 0,
          endNumber: hospital.matchedRequest.equipReq ?? 0,
          label: "Equipment to be installed",
        },
        {
          startNumber: percentage * hospital.matchedRequest.kids3Y,
          endNumber: hospital.matchedRequest.kids3Y ?? 0,
          label: "Kids impacted in 3 years",
        },
      ]);
    }
  }, [hospital]);

  return (stats.length > 0 && 
    <Box sx={{
      border: "1px solid black",
      backgroundColor: "#E9605A",
    }}>
      <Stack direction={"row"} justifyContent="space-evenly" padding={4}>
        {stats.map((stat, index) => (
          <Box key={index} sx={{ textAlign: "center" }}>
            {/* Circle with the number */}
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                backgroundColor: "#4A24E7",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="h5" sx={{ color: "white" }}>
                {stat.startNumber.toFixed(0)}
                <Typography
                  variant="body1"
                  sx={{ color: "#F3C941", fontStyle: "italic" }}
                >
                  of {stat.endNumber}
                </Typography>
              </Typography>
            </Box>

            {/* Label below the circle */}
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ marginTop: 2 }}
            >
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default HospitalPageStatsSection;
