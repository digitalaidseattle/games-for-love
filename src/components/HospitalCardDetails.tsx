/**
 *  HospitalCardDetails.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import { Room } from "@mui/icons-material";
import { Carousel } from "react-responsive-carousel";
import {
  DonationHospitalContext,
  LearnMoreHospitalContext,
  SelectedHospitalContext,
} from "../context/SelectedHospitalContext";
import { Hospital } from "../models/hospital";
import ActionButton from "../styles/ActionButton";
import { hospitalService } from "../services/hospital/hospitalService";

export const HospitalCardDetails: React.FC<{ hospital: Hospital }> = ({
  hospital,
}) => {
  const { hospital: selectedHospital, setHospital: setSelectedHospital } =
    useContext(SelectedHospitalContext);
  const { setHospital: setDonationHospital } = useContext(
    DonationHospitalContext
  );
  const { setHospital: setLearnMoreHospital } = useContext(
    LearnMoreHospitalContext
  );

  const [backgroundColor, setBackgroundColor] = useState<string>();
  const [pinColor, setPinColor] = useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    if (hospital) {
      setBackgroundColor(
        selectedHospital
          ? hospital.id === selectedHospital.id
            ? "#F0F5FA"
            : ""
          : ""
      );
      setPinColor(
        selectedHospital && hospital.id === selectedHospital.id
          ? "#FFFF00"
          : hospital.status === "past"
          ? "#DB5757"
          : "#92C65E"
      );
      setIsOpen(hospitalService.isHospitalOpen(hospital));
    }
  }, [hospital, selectedHospital]);

  const changeSelectedHospital = () => {
    if (selectedHospital) {
      if (hospital.id === selectedHospital.id) {
        setSelectedHospital(undefined);
      } else {
        setSelectedHospital(hospital);
      }
    } else {
      setSelectedHospital(hospital);
    }
  };

  const handleCarousel = (evt: any) => {
    if (selectedHospital) {
      if (hospital.id === selectedHospital.id) {
        evt.stopPropagation();
      } else {
        setSelectedHospital(hospital);
      }
    } else {
      setSelectedHospital(hospital);
    }
  };

  const handleLearnMore = (evt: any) => {
    evt.stopPropagation();
    setLearnMoreHospital(hospital);
  };

  const handleDonate = (evt: any) => {
    evt.stopPropagation();
    setDonationHospital(hospital);
  };

  return (
    <div data-testid="hospital-detail-card">
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          margin: "10px 0",
          cursor: "pointer",
          backgroundColor: backgroundColor,
        }}
        onClick={changeSelectedHospital}
      >
        <CardActionArea
          sx={{
            display: "flex",
            padding: 2,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            "&:focus": {
              outline: "none",
            },
            "&:focus-visible": {
              outline: "none",
            },
            "& .MuiCardActionArea-focusHighlight": {
              background: "transparent",
            },
          }}
        >
          <Stack direction={"row"}>
            <CardContent
              sx={{
                flex: 1,
              }}
            >
              <Box onClick={handleCarousel}>
                <Carousel showStatus={false} showThumbs={false}>
                  {hospital.hospitalPictures.map((url, idx) => (
                    <CardMedia
                      key={"p" + idx}
                      component="img"
                      sx={{ width: 135, height: 150, borderRadius: 2 }}
                      image={url}
                      alt="Hospital Image"
                    />
                  ))}
                </Carousel>
              </Box>
            </CardContent>

            <CardContent
              sx={{
                flex: 2,
                padding: "0 16px",
                borderRight: "1px solid #d9d9d9",
              }}
            >
              <Typography variant="subtitle2" color="textSecondary">
                <Room
                  sx={{
                    color: pinColor,
                    strokeWidth: "0.2px",
                    stroke: "black",
                    fontSize: "1rem",
                    "& .MuiSvgIcon-root": {
                      outline: "1px solid red",
                      outlineOffset: "2px",
                    },
                  }}
                />{" "}
                {hospital?.city}, {hospital?.state}
              </Typography>

              <Typography variant="h6" component="div">
                {hospital?.name}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontStyle: "italic",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "4",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {hospital?.description}
              </Typography>

              <Stack direction={"row"} gap={1} marginTop={2}>
                <ActionButton onClick={handleLearnMore}>
                  Learn more
                </ActionButton>
                <ActionButton disabled={!isOpen} onClick={handleDonate}>
                  Donate
                </ActionButton>
              </Stack>
            </CardContent>
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="body2" color="textSecondary">
                <span style={{ color: "black" }}>25k </span> raised of 100k -{" "}
                <Typography
                  variant="body2"
                  component="span"
                  color="success.main"
                  sx={{ fontStyle: "italic", color: "#92c65e" }}
                >
                  {hospital?.status}
                </Typography>
              </Typography>

              <Typography variant="body2" color="textSecondary">
                400+ kids impacted
              </Typography>

              <Box display="flex" alignItems="center" marginTop={1}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  marginRight={1}
                >
                  Matched by
                </Typography>
                <Avatar
                  alt="Organization Logo"
                  src="/path/to/profile1.jpg"
                  sx={{ width: 20, height: 20, marginLeft: 1 }}
                />
                <Avatar
                  alt="Organization Logo"
                  src="/path/to/profile2.jpg"
                  sx={{ width: 20, height: 20, marginLeft: 1 }}
                />
                +
              </Box>
              <Typography
                variant="body2"
                color="textSecondary"
                align="center"
                sx={{ marginTop: 1 }}
              >
                15 days left to donate!
              </Typography>
            </CardContent>
          </Stack>
        </CardActionArea>
      </Card>
    </div>
  );
};
