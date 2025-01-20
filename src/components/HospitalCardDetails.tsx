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

  return (
    <Box
      data-testid="hospital-detail-card"
      sx={{
        width: "100%",
        maxWidth: "100%",
        marginBottom: "16px",
        padding: "8px",
        display: "flex",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          cursor: "pointer",
          backgroundColor: backgroundColor,
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.02)",
          },
          width: "100%",
          overflow: "hidden",
        }}
        onClick={changeSelectedHospital}
      >
        {/* 이미지 섹션 */}
        <Box
          sx={{
            flex: 1,
            minWidth: "150px",
            maxWidth: "35%",
            height: "150px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
                sx={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
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
            flex: 2,
            padding: "16px",
          }}
        >
          <Typography variant="subtitle2" color="text.secondary">
            <Room sx={{ color: pinColor, fontSize: "1rem" }} />{" "}
            {[hospital.city, hospital.state].filter(Boolean).join(", ")}
          </Typography>
          <Typography variant="h6" noWrap>
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
              xs: "column", // 작은 화면에서는 세로 정렬
              sm: "column", // 작은 화면에서는 세로 정렬
              md: "column", // 중간 화면에서도 세로 정렬
              lg: "column", // 큰 화면에서는 가로 정렬
              xl: "row", // 아주 큰 화면에서도 가로 정렬
            }}
            gap={{
              xs: 1, // 작은 화면에서 버튼 간 간격
              sm: 1, // 작은 화면에서 버튼 간 간격
              md: 1.5, // 중간 화면에서 버튼 간 간격
              lg: 2, // 큰 화면에서 버튼 간 간격
              xl: 2, // 아주 큰 화면에서 버튼 간 간격
            }}
            marginTop={2}
            sx={{
              flexWrap: "nowrap", // 가로 정렬 시 버튼이 한 줄에 유지되도록 설정
              justifyContent: {
                xs: "center", // 작은 화면에서는 버튼 중앙 정렬
                sm: "center",
                md: "center",
                lg: "center", // 큰 화면에서는 왼쪽 정렬
                xl: "flex-start",
              },
              alignItems: {
                xs: "center", // 세로 정렬 시 중앙 정렬
                sm: "center",
                md: "center",
                lg: "center", // 큰 화면에서는 동일 선상에 정렬
                xl: "center",
              },
            }}
          >
            <ActionButton
              onClick={() => setLearnMoreHospital(hospital)}
              sx={{
                fontSize: {
                  xs: "0.7rem", // 가장 작은 화면에서 폰트 크기
                  sm: "0.8rem", // 작은 화면에서 폰트 크기
                  md: "0.9rem", // 중간 화면에서 폰트 크기
                  lg: "1rem", // 큰 화면에서 폰트 크기
                  xl: "1rem", // 아주 큰 화면에서 폰트 크기
                },
                padding: {
                  xs: "4px 6px", // 가장 작은 화면에서 패딩
                  sm: "4px 8px", // 작은 화면에서 패딩
                  md: "6px 10px", // 중간 화면에서 패딩
                  lg: "8px 16px", // 큰 화면에서 패딩
                  xl: "8px 16px", // 아주 큰 화면에서 패딩
                },
                minWidth: {
                  xs: "60px", // 가장 작은 화면에서 버튼 최소 너비
                  sm: "70px", // 작은 화면에서 버튼 최소 너비
                  md: "80px", // 중간 화면에서 버튼 최소 너비
                  lg: "100px", // 큰 화면에서 버튼 최소 너비
                  xl: "100px", // 아주 큰 화면에서 버튼 최소 너비
                },
                whiteSpace: "nowrap",
              }}
            >
              Learn more
            </ActionButton>
            <ActionButton
              disabled={!isOpen}
              onClick={() => setDonationHospital(hospital)}
              sx={{
                fontSize: {
                  xs: "0.7rem", // 가장 작은 화면에서 폰트 크기
                  sm: "0.8rem", // 작은 화면에서 폰트 크기
                  md: "0.9rem", // 중간 화면에서 폰트 크기
                  lg: "1rem", // 큰 화면에서 폰트 크기
                  xl: "1rem", // 아주 큰 화면에서 폰트 크기
                },
                padding: {
                  xs: "4px 6px", // 가장 작은 화면에서 패딩
                  sm: "4px 8px", // 작은 화면에서 패딩
                  md: "6px 10px", // 중간 화면에서 패딩
                  lg: "8px 16px", // 큰 화면에서 패딩
                  xl: "8px 16px", // 아주 큰 화면에서 패딩
                },
                minWidth: {
                  xs: "60px", // 가장 작은 화면에서 버튼 최소 너비
                  sm: "70px", // 작은 화면에서 버튼 최소 너비
                  md: "80px", // 중간 화면에서 버튼 최소 너비
                  lg: "100px", // 큰 화면에서 버튼 최소 너비
                  xl: "100px", // 아주 큰 화면에서 버튼 최소 너비
                },
              }}
            >
              Donate
            </ActionButton>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};
