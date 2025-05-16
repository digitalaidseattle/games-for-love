/**
 *  HospitalPageSimilarDetailsSection.tsx
 *
 *  @copyright 2025 Digital Aid Seattle
 *
 */
import { Box, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { HospitalsContext } from "../../context/HospitalContext";
import { Hospital } from "../../models/hospital";
import HospitalPageInfoCard from "./HospitalPageInfoCard";

const HospitalPageSimilarDetailsSection = () => {

  const { originals } = useContext(HospitalsContext);
  const [activeHospitals, setActiveHospitals] = useState<Hospital[]>([]);

  useEffect(() => {
    setActiveHospitals(originals.filter(hosp => hosp.status = 'Active').slice(0, 3))
  }, [originals]);

  return (
    <Box sx={{ padding: 6 }}>
      {/* Header */}
      <Typography variant="h5" sx={{ marginBottom: 4, textAlign: "center" }}>
        Other Similar Projects:
      </Typography>

      {/* Cards */}
      <Stack direction={"row"} justifyContent="space-evenly" spacing={8} padding={4}>
        {activeHospitals.map(hosp =>
          <HospitalPageInfoCard
            key={hosp.id}
            hospital={hosp}
          />
        )}
      </Stack>

      {/* See More Button - removing until we get instructions on behavior */}
      {/* <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#4A24E7",
            width: "50%",
            padding: "10px 20px",
            textTransform: "none",
          }}
        >
          See More
        </Button>
      </Box> */}
    </Box>
  );
};

export default HospitalPageSimilarDetailsSection;
