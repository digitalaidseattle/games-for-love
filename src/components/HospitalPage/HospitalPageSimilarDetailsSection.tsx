/**
 *  HospitalPageSimilarDetailsSection.tsx
 *
 *  @copyright 2025 Digital Aid Seattle
 *
 */
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { HospitalsContext } from "../../context/HospitalContext";
import { LearnMoreHospitalContext } from "../../context/SelectedHospitalContext";
import { Hospital } from "../../models/hospital";
import { hospitalService } from "../../services/hospital/hospitalService";
import HospitalPageInfoCard from "./HospitalPageInfoCard";

const VIEWABLE_HOSPITAL_COUNT = 3;

const HospitalPageSimilarDetailsSection = () => {
  const { originals } = useContext(HospitalsContext);
  const { hospital } = useContext(LearnMoreHospitalContext);
  const [similarHospitals, setSimilarHospitals] = useState<Hospital[]>([]);
  const [viewableHospitals, setViewableHospitals] = useState<Hospital[]>([]);
  const [viewableIndex, setViewableIndex] = useState<number>(0);

  useEffect(() => {
    if (hospital) {
      setSimilarHospitals(hospitalService.getSimilarProjects(hospital, originals));
    }
  }, [originals]);

  useEffect(() => {
    setViewableIndex(0);
    setViewableHospitals(similarHospitals.slice(viewableIndex, viewableIndex + VIEWABLE_HOSPITAL_COUNT));
  }, [similarHospitals]);


  useEffect(() => {
    setViewableHospitals(similarHospitals.slice(viewableIndex, viewableIndex + VIEWABLE_HOSPITAL_COUNT));
  }, [viewableIndex]);

  return (
    <Box sx={{ padding: 6, backgroundColor: "#92C65E" }}>
      {/* Header */}
      <Stack id='asdf'
        direction={"row"}
        justifyContent="space-between"
        marginBottom={4}
      >
        <Typography variant="h4" sx={{
          justifyContent: "flex-start",
          textAlign: "left",
          fontWeight: 600
        }}>
          Similar projects:
        </Typography>
        <Box justifySelf={"flex-end"}>
          <IconButton
            disabled={viewableIndex === 0}
            onClick={() => setViewableIndex(viewableIndex - 1)}>
            <ArrowCircleLeftOutlinedIcon fontSize='large' />
          </IconButton>
          <IconButton
            disabled={viewableIndex === similarHospitals.length - VIEWABLE_HOSPITAL_COUNT}
            onClick={() => setViewableIndex(viewableIndex + 1)}>
            <ArrowCircleRightOutlinedIcon fontSize='large' />
          </IconButton>
        </Box>
      </Stack>
      {/* Cards */}
      <Stack
        direction={"row"}
        justifyContent="space-evenly"
        spacing={2}
      >
        {viewableHospitals.map((hosp, idx) => (
          <HospitalPageInfoCard key={hosp.id + idx} hospital={hosp} />
        ))}
      </Stack>
    </Box >
  );
};

export default HospitalPageSimilarDetailsSection;
