/**
 *  HospitalCardDetails.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Theme,
  Typography,
  useTheme,
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
import { generalInfoService } from "../services/generalInfo/generalInfoService";
import { hospitalService } from "../services/hospital/hospitalService";
import ActionButton from "../styles/ActionButton";
import EmphasizedText from "../styles/EmphasizedText";

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
  const [partnerName, setPartnerName] = useState<string>("Unknown Partner");

  const theme = useTheme();

  useEffect(() => {
    if (hospital) {
      setBackgroundColor(
        hospitalService.isEqual(hospital, selectedHospital)
          ? theme.palette.action.selected
          : ""
      );
      setPinColor(
        hospitalService.isEqual(hospital, selectedHospital)
          ? theme.palette.hospital.selected
          : hospital.status === "past"
            ? theme.palette.hospital.closed
            : theme.palette.hospital.open);
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

  useEffect(() => {
    const fetchGeneralInfo = async () => {
      const [info] = await generalInfoService.findAll();
      if (info.corpPartners.length > 0) {
        setPartnerName(info.corpPartners[0].name || "Unknown Partner");
      }
    };
    fetchGeneralInfo();
  }, []);


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
                borderRight: (theme: Theme) => "1px solid " + theme.palette.grey[400]
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                <Room
                  sx={{
                    color: pinColor,
                    strokeWidth: "0.2px",
                    fontSize: "1rem",
                    "& .MuiSvgIcon-root": {
                      outline: "1px solid red",
                      outlineOffset: "2px",
                    },
                  }}
                />{" "}
                {
                  [hospital?.city, hospital?.state]
                    .filter(s => s)
                    .join(', ')
                }
              </Typography>

              <Typography variant="h6" component="div">
                {hospital?.name}
              </Typography>
              <EmphasizedText
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "4",
                  WebkitBoxOrient: "vertical"
                }}>
                {hospital?.description}

              </EmphasizedText>
              <Stack direction={"row"} gap={1} marginTop={2}>
                <ActionButton onClick={handleLearnMore}>
                  Learn more
                </ActionButton>
                <ActionButton disabled={!isOpen} onClick={handleDonate}>
                  Donate
                </ActionButton>
              </Stack>
            </CardContent>
            <CardContent
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 0.8,
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                marginTop={1}
                sx={{
                  backgroundColor: (theme: Theme) => theme.palette.background.highlighted,
                  borderRadius: "8px",
                  padding: "2px 10px 2px 10px",
                  width: "245px",
                }}
              >
                <Typography
                  variant="body2"
                  marginRight={1}
                  color="textSecondary"
                >
                  Matched by {partnerName}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                ${Math.round(hospital.matchedFunded?.fundingCompleted || 0)}{" "}
                {" "}
                raised of $
                {Math.round(hospital.matchedRequest?.requested || 0)} -{" "}
                <EmphasizedText
                  sx={{
                    color: (theme: Theme) => hospital?.status === "past" ? theme.palette.hospital.closed : theme.palette.hospital.open
                  }}>
                  {hospital?.status}
                </EmphasizedText>
              </Typography>

              <Typography variant="body2" color={theme.palette.text.secondary}>
                {hospital.year}+ kids impacted
              </Typography>
              <EmphasizedText
                align="center"
                sx={{
                  marginTop: 5,
                  fontWeight: "bold",
                  color: (theme: Theme) => theme.palette.text.secondary,
                }}
              >
                {hospitalService.getDonationMessage(hospital)}
              </EmphasizedText>
            </CardContent>
          </Stack>
        </CardActionArea>
      </Card>
    </div>
  );
};
