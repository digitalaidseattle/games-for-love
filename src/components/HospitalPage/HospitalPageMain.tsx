import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";

import { Box, Divider, Stack, Typography } from "@mui/material";
import { LocationOnOutlined, EventOutlined } from "@mui/icons-material";
import { LearnMoreHospitalContext } from "../../context/SelectedHospitalContext";

const HospitalPageMain = () => {
  const { hospital } = useContext(LearnMoreHospitalContext);
  const [endDateText, setEndDateText] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    if (hospital) {
      setActive(hospital.status !== "past");
    }
  }, [hospital]);

  useEffect(() => {
    if (hospital) {
      setEndDateText(
        active
          ? `Campaign ends ${format(
              hospital.matchedRequest!.fundingDeadline!,
              "MMMM, d, yyyy"
            )}`
          : "Campaign closed"
      );
    }
  }, [hospital, active]);

  return (
    <Box sx={{ margin: "6rem 3rem 2rem 3rem" }}>
      <Stack sx={{ alignItems: "center", gap: 3 }}>
        {/* Name of the hospital */}
        <Stack>
          <Typography variant="h4" sx={{ fontSize: "2.5rem", fontWeight: 700 }}>
            Fundraiser for{" "}
            <Box component="span" sx={{ textTransform: "uppercase" }}>
              {hospital?.name}
            </Box>
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          sx={{
            gap: "2rem",
            alignItems: "center",
            fontWeight: 600,
          }}
        >
          <Box
            sx={{
              border: 1,
              borderRadius: "20px",
              pl: 1,
              pr: 1,
              fontSize: 12,
              color: active ? "#7ED321" : "#FF6B6B",
              backgroundColor: active
                ? "rgba(126, 211, 33, 0.10)"
                : "rgba(233,96,90,0.1)",
            }}
          >
            {active ? "Active" : "Past"} Campaign
          </Box>

          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
            }}
          >
            <LocationOnOutlined />
            {hospital?.city}, {hospital?.country}
          </Stack>
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
            }}
          >
            <EventOutlined />
            {endDateText}
          </Stack>
        </Stack>
      </Stack>
      <Divider variant="middle" sx={{ marginTop: "3rem" }} />
    </Box>
  );
};

export default HospitalPageMain;
