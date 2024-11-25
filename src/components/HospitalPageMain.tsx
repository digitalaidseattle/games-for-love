import { useContext } from "react";
import { LearnMoreHospitalContext } from "../context/SelectedHospitalContext";
import { Box, Grid, Typography } from "@mui/material";
import HospitalPageCarausel from "./HospitalPageCarousel";

const HospitalPageMain = () => {
  const { hospital } = useContext(LearnMoreHospitalContext);
  return (
    <Grid
      container
      spacing={2}
      sx={{ mt: 2, backgroundColor: "#F0F5FA", padding: "2rem" }}
    >
      {/* Name of the hospital */}
      <Grid item xs={12}>
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Typography variant="h4">
            Fundraiser for{" "}
            <Box component="span" sx={{ textTransform: "uppercase" }}>
              {hospital?.name}
            </Box>
          </Typography>
        </Box>
      </Grid>

      {/* Carousel of hospitals - 3 at a time */}
      <Grid item xs={12}>
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <HospitalPageCarausel />
        </Box>
      </Grid>
    </Grid>
  );
};

export default HospitalPageMain;
