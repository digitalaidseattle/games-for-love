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

  useEffect(() => {
    if (hospital) {
      setActiveHospitals(hospitalService.getSimilarProjects(hospital, originals));
    }
  }, [originals]);

  return (
    <Box sx={{ padding: 6, backgroundColor: "#92C65E" }}>
      {/* Header */}
      <Typography variant="h4" sx={{
        marginBottom: 4,
        textAlign: "left",
        fontWeight: 600
      }}>
        Similar projects:
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
    </Box>
  );
};

export default HospitalPageSimilarDetailsSection;
