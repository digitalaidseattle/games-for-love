import { Box, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { LearnMoreHospitalContext } from "../../context/SelectedHospitalContext";

const HospitalPageStatsSection = () => {
  const { hospital } = useContext(LearnMoreHospitalContext);
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    if (hospital && hospital.matchedRequest) {
      setStats([
        {
          startNumber: hospital.matchedRequest.play3Y ?? 0,
          endNumber: hospital.matchedRequest.play3Y ?? 0,
          label: "Play sessions in 3 years",
        },
        {
          startNumber: hospital.matchedRequest.equipReq ?? 0,
          endNumber: hospital.matchedRequest.equipReq ?? 0,
          label: "Equipment to be installed",
        },
        {
          startNumber: hospital.matchedRequest.kids3Y ?? 0,
          endNumber: hospital.matchedRequest.kids3Y ?? 0,
          label: "Kids impacted in 3 years",
        },
      ]);
    }
  }, [hospital]);

  return (stats.length > 0 && 
    <Box sx={{ padding: 4, textAlign: "center" }}>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        padding={4}
        sx={{ border: "1px solid black", backgroundColor: "#E9605A" }}
      >
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
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
                {stat.startNumber}{" "}
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
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HospitalPageStatsSection;
