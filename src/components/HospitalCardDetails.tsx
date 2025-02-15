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

import { Directions, Room } from "@mui/icons-material";
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
import { DonationContext } from "../context/DonationContext";

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

  const { setDonateOverlayOpen } = useContext(DonationContext);

  useEffect(() => {
    if (hospital) {
      setBackgroundColor(
        hospitalService.isEqual(hospital, selectedHospital)
          ? theme.palette.action.selected
          : theme.palette.background.paper
      );
      setPinColor(
        hospitalService.isEqual(hospital, selectedHospital)
          ? theme.palette.hospital.selected
          : hospital.status === "past"
            ? theme.palette.hospital.closed
            : theme.palette.hospital.open
      );
      setIsOpen(hospitalService.isHospitalOpen(hospital));
    }
  }, [hospital, selectedHospital]);

  const changeSelectedHospital = () => {
    if (selectedHospital?.id === hospital.id) {
      setSelectedHospital(undefined);
    } else {
      setSelectedHospital(hospital);
    }
  };

  useEffect(() => {
    const fetchGeneralInfo = async () => {
      const [info] = await generalInfoService.findAll();
      if (info?.corpPartners?.length > 0) {
        setPartnerName(info.corpPartners[0].name || "Unknown Partner");
      }
    };
    fetchGeneralInfo();
  }, []);

  const handleLearnMore = (evt: any) => {
    evt.stopPropagation();
    setLearnMoreHospital(hospital);
  };

  const handleDonate = (evt: any) => {
    evt.stopPropagation();
    setDonationHospital(hospital);
    setDonateOverlayOpen(true);
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
    <Box
      data-testid="hospital-detail-card"
      sx={{
        // width: "100%",
        width: {
          xs: "100%",
          sm: "100%",
          md: "100%",
          lg: "100%",
          xl: "100%",
        },
        maxWidth: "100%",
        marginBottom: "16px",
        // padding: "8px",
        display: "flex",
        // overflow: "hidden",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "row", sm: "row" },
          alignItems: "center",
          cursor: "pointer",
          backgroundColor: backgroundColor,
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.02)",
          },
          // width: "100%",
          overflow: "hidden",
        }}
        onClick={changeSelectedHospital}
      >
        <Box
          sx={{
            flex: 7,
            display: "flex",
            maxWidth: "70%",
            height: "100%",
            flexDirection: "row",
          }}
        >
          {/* 이미지 섹션 */}
          <Box
            sx={{
              flex: 4,
              display: "flex",
              // width: "50%",
              minWidth: "120px",
              maxWidth: "200px",
              height: "200px",
              alignItems: "center",
              justifyContent: "center",
              // backgroundColor: "blue",
            }}
          >
            <Carousel
              showStatus={false}
              showThumbs={false}
              infiniteLoop
              emulateTouch
            >
              {hospital.hospitalPictures.map((url, idx) => (
                <CardMedia
                  key={idx}
                  component="img"
                  className="cardWrapper"
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "3rem",
                      md: "4rem",
                      lg: "5rem",
                      xl: "100%",
                    },
                    height: {
                      xs: "0rem",
                      sm: "3rem",
                      md: "4rem",
                      lg: "5rem",
                      xl: "100%",
                    },
                    objectFit: "cover", // 이미지를 박스 크기에 맞게 자름
                    borderRadius: "8px", // 둥근 모서리 설정
                  }}
                  image={url}
                  alt="Hospital Image"
                />
              ))}
            </Carousel>
          </Box>

          {/* 텍스트 섹션 */}
          <CardContent
            sx={{
              flex: 6,
              padding: "3px 3px 3px 8px !important",
              overflow: "hidden",
            }}
          >
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{
                fontSize: {
                  xs: "0.85rem",
                  sm: "0.85rem",
                  md: "0.85rem",
                  lg: "0.95rem",
                  xl: "1rem",
                },
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "noWrap",
              }}
            >
              <Room
                sx={{
                  color: pinColor,
                  fontSize: {
                    xs: "0.85rem",
                    sm: "0.85rem",
                    md: "0.85rem",
                    lg: "0.95rem",
                    xl: "1rem",
                  },
                  whiteSpace: "noWrap",
                }}
              />{" "}
              {[hospital.city, hospital.state].filter(Boolean).join(", ")}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {hospital.name}
            </Typography>
            <EmphasizedText
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {hospital.description}
            </EmphasizedText>
            <Stack
              direction={{
                xs: "column",
                sm: "column",
                md: "column",
                lg: "row",
              }}
              gap={1}
              marginTop={2}
            >
              <ActionButton
                onClick={handleLearnMore}
                sx={{
                  fontSize: {
                    xs: "0.6rem",
                    sm: "0.75rem",
                    md: "0.75rem",
                    lg: "0.65rem",
                    xl: "0.75rem",
                  },
                  whiteSpace: "noWrap",
                }}
              >
                Learn more
              </ActionButton>
              <ActionButton
                disabled={!isOpen}
                onClick={handleDonate}
                sx={{
                  fontSize: {
                    xs: "0.6rem",
                    sm: "0.75rem",
                    md: "0.75rem",
                    lg: "0.65rem",
                    xl: "0.75rem",
                  },
                  whiteSpace: "noWrap",
                }}
              >
                Donate
              </ActionButton>
            </Stack>
          </CardContent>
        </Box>

        <Box
          sx={{
            flex: 3,
            display: "flex",
            flexDirection: "column",
            maxWidth: "30%",
            // backgroundColor: "red",
          }}
        >
          {/* <CardContent
            sx={{
              flex: 1,
              display: "flex",
              width: "100%",
              padding: "0px 0px 10px 1px !important",
              flexDirection: "column",
              gap: 0.5,
            }}
          > */}
          <Box
            display="flex"
            alignItems="center"
            marginTop={1}
            sx={{
              backgroundColor: (theme: Theme) =>
                theme.palette.background.highlighted,
              borderRadius: "8px",
              padding: "2px 2px 2px 2px",
              margin: "1px 3px 1px 3px",
            }}
          >
            <Typography
              variant="body2"
              marginRight={1}
              color="textSecondary"
              sx={{
                fontSize: {
                  xs: "0.65rem",
                  sm: "0.75rem",
                  md: "0.75rem",
                  lg: "0.75rem",
                  xl: "0.75rem",
                },
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "noWrap",
              }}
            >
              Matched by {partnerName}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: {
                xs: "0.65rem",
                sm: "0.75rem",
                md: "0.75rem",
                lg: "0.75rem",
                xl: "0.75rem",
              },
              overflow: "hidden",
              // whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            ${Math.round(hospital.matchedFunded?.fundingCompleted || 0)} raised
            of ${Math.round(hospital.matchedRequest?.requested || 0)} -{" "}
            <EmphasizedText
              sx={{
                color: (theme: Theme) =>
                  hospital?.status === "past"
                    ? theme.palette.hospital.closed
                    : theme.palette.hospital.open,
              }}
            >
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
          {/* </CardContent> */}
        </Box>
      </Card>
    </Box>
  );
};
