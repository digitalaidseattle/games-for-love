/**
 *  HospitalPageSimilarDetailsSection.tsx
 *
 *  @copyright 2025 Digital Aid Seattle
 *
 */
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
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
      setSimilarHospitals(
        hospitalService.getSimilarProjects(hospital, originals)
      );
    }
  }, [originals, hospital]);

  useEffect(() => {
    setViewableIndex(0);
    setViewableHospitals(
      similarHospitals.slice(0, 0 + VIEWABLE_HOSPITAL_COUNT)
    );
  }, [similarHospitals]);

  useEffect(() => {
    setViewableHospitals(
      similarHospitals.slice(
        viewableIndex,
        viewableIndex + VIEWABLE_HOSPITAL_COUNT
      )
    );
  }, [viewableIndex, similarHospitals]);

  return (
    <Box sx={{ padding: 6, backgroundColor: "#92C65E" }}>
      {/* Header */}
      <Stack
        id="asdf"
        direction={{ md: "row" }}
        justifyContent="space-between"
        marginBottom={4}
      >
        <Typography
          variant="h4"
          sx={{
            justifyContent: "flex-start",
            textAlign: { xs: "center", md: "left" },
            fontWeight: { xs: 700, md: 600 },
            fontSize: { xs: "2.5rem", lg: "3rem" },
          }}
        >
          Similar projects
          <Box component="span" sx={{ display: { xs: "none", md: "inline" } }}>
            :
          </Box>
        </Typography>
        <Box
          justifySelf={"flex-end"}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <IconButton
            disabled={viewableIndex === 0}
            onClick={() => setViewableIndex(viewableIndex - 1)}
          >
            <ArrowCircleLeftOutlinedIcon fontSize="large" />
          </IconButton>
          <IconButton
            disabled={
              viewableIndex ===
              similarHospitals.length - VIEWABLE_HOSPITAL_COUNT
            }
            onClick={() => setViewableIndex(viewableIndex + 1)}
          >
            <ArrowCircleRightOutlinedIcon fontSize="large" />
          </IconButton>
        </Box>
      </Stack>
      {/* Cards */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-evenly"
        spacing={{ xs: 4, md: 2 }}
      >
        {viewableHospitals.map((hosp, idx) => (
          <HospitalPageInfoCard key={hosp.id + idx} hospital={hosp} />
        ))}
      </Stack>
    </Box>
  );
};

export default HospitalPageSimilarDetailsSection;
