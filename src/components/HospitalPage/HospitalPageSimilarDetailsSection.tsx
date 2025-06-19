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
import { LearnMoreHospitalContext } from "../../context/SelectedHospitalContext";
import { hospitalService } from "../../services/hospital/hospitalService";

const HospitalPageSimilarDetailsSection = () => {
  const { originals } = useContext(HospitalsContext);
  const { hospital } = useContext(LearnMoreHospitalContext);
  const [activeHospitals, setActiveHospitals] = useState<Hospital[]>([]);

  const currentLat = hospital?.latitude;
  const currentLon = hospital?.longitude;

  useEffect(() => {
    // Filter out the current hospital and sort others by distance
    const similarHospitals = originals
      .filter(
        (h) => h.status.toLowerCase() === "active" && h.id !== hospital?.id
      ) // Excluding current
      .map((h) => ({
        ...h,
        distanceSq: hospitalService.getEuclideanDistanceNoRoot(
          currentLat ?? 0,
          currentLon ?? 0,
          h.latitude ?? 0,
          h.longitude ?? 0
        ),
      }))
      .sort((a, b) => a.distanceSq - b.distanceSq) // Closest first
      .slice(0, 3); // Pick top 3

    setActiveHospitals(similarHospitals);
  }, [originals]);

  return (
    <Box sx={{ padding: 6 }}>
      {/* Header */}
      <Typography variant="h5" sx={{ marginBottom: 4, textAlign: "center" }}>
        Other Similar Projects:
      </Typography>

      {/* Cards */}
      <Stack
        direction={"row"}
        justifyContent="space-evenly"
        spacing={2}
        padding={4}
        sx={{
          width: "calc(100% - 32px)",
        }}
      >
        {activeHospitals.map((hosp) => (
          <HospitalPageInfoCard key={hosp.id} hospital={hosp} />
        ))}
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
