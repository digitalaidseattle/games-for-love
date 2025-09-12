/**
 *  DonationBarActive.tsx
 *
 *  @copyright 2025 Digital Aid Seattle
 *
 */
import React, { useContext, useEffect, useState } from "react";
import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import { EmojiEventsOutlined } from '@mui/icons-material';
import { format } from "date-fns";

import { DonationHospitalContext, LearnMoreHospitalContext } from "../../context/SelectedHospitalContext";
import { DonationContext } from "../../context/DonationContext";
import { Hospital } from "../../models/hospital";

const DonationBar: React.FC<{ hospital: Hospital }> = ({ hospital }) => {

  const { setDonateOverlayOpen } = useContext(DonationContext);
  const { setHospital: setLearnMoreHospital } = useContext(LearnMoreHospitalContext);
  const { setHospital: setDonationHospital } = useContext(DonationHospitalContext);
  const [percentage, setPercentage] = useState<number>(0);
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    if (hospital) {
      setActive(hospital.status !== 'Past');
    }
  }, [hospital]);

  useEffect(() => {
    if (hospital) {
      const amountRequested = hospital.matchedRequest?.requested ?? 0;
      const amountRaised = hospital.matchedFunded?.fundingCompleted ?? 0;
      const percentage = (amountRaised / amountRequested) * 100;
      setPercentage(percentage);
    }
  }, [hospital]);

  function handleDonate(): void {
    setDonationHospital(hospital);
    setDonateOverlayOpen(true);
    setLearnMoreHospital(undefined);
  }

  return (
    <Stack
      gap={2}
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "rgba(255, 107, 107, 0.1)",
        boxShadow: 2,
        borderRadius: "15px",
      }}
    >
      {!active &&
        <Stack alignItems={'center'}
          sx={{
            padding: 2,
            width: '100%',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            color: '#FFFFFF',
            background: "linear-gradient(105deg,  #7ED321,  #50E3C2)"
          }}>
          <EmojiEventsOutlined />
          <Typography marginTop={'1rem'} fontSize={20} fontWeight={600}>Campaign completed successfully!</Typography>
          <Typography fontSize={14}>Thank you to all the donors who made this possible</Typography>
        </Stack>
      }
      <Stack
        alignItems={'center'}
        sx={{
          marginTop: 1,
          padding: 2,
          width: '100%',
        }}>
        <LinearProgress
          variant="determinate"
          sx={{
            width: "100%",
            borderRadius: "10px",
            height: "18px",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#DB5757"
            },
            backgroundColor: "rgba(255, 107, 107, 0.1)",
          }}
          value={percentage} />

        {/* Donation Info */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
          }}
        >
          <Typography
            fontSize={14}
            fontWeight={600}
            color="#DB5757"
          >
            ${hospital!.matchedFunded?.fundingCompleted ?? 0} raised
          </Typography>
          <Typography
            fontSize={14} fontWeight={600}
            sx={{
              flex: 1,
            }}
          >
            &nbsp;of ${hospital!.matchedRequest?.requested ?? 0} goal
          </Typography>
          <Typography fontSize={12} fontWeight={600}>${percentage.toFixed(0)}%</Typography>
        </Box>



        {/* Donate Button */}
        {active &&
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#DB5757",
              color: "#FFFFFF",
              borderRadius: "12px",
              textTransform: "none",
              marginTop: "1rem",
              padding: "0.5rem 2rem",
            }}
            onClick={() => handleDonate()}
          >
            Donate now!
          </Button>
        }

        {/* Days Left */}
        <Typography variant="body2" marginTop={'1rem'} fontSize={14}>
          Expires {format(hospital!.matchedRequest!.fundingDeadline!, "MMMM d")}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default DonationBar;
