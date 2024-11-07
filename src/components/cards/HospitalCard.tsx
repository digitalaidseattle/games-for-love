import { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Avatar,
  Button,
  Chip,
  IconButton,
} from "@mui/material";
import { PopupInfo } from "../../models/popupInfo";
import "./HospitalCard.style.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { styled } from "@mui/material/styles";
import { GeneralInfo } from "../../models/generalInfo";
import { OPEN_MARKER_COLOR, CLOSED_MARKER_COLOR } from "../../styles/theme";

import { hospitalService } from "../../services/hospital/hospitalService";
import { differenceInDays } from "date-fns";
import { generalInfoService } from "../../services/generalInfo/generalInfoService";
const CustomCancelIconButton = styled(IconButton)({
  opacity: 0.9,
  border: "none",
  boxShadow: "none",
  "& .MuiSvgIcon-root": {
    color: "white",
  },
  "&:focus": {
    outline: "none",
  },
});

const CustomAvatar = styled(Avatar)({
  width: 13,
  height: 13,
  marginLeft: 1,
  marginRight: 1,
  fontSize: 12,
  textTransform: "none",
});

interface HospitalCardProps {
  popupInfo: PopupInfo | null;
  onClose: () => void;
}

export const HospitalCard: React.FC<HospitalCardProps> = ({
  popupInfo,
  onClose,
}) => {
  const [generalInfo, setGeneralInfo] = useState<GeneralInfo | null>(null);

  const isOpen = hospitalService.isHospitalOpen(popupInfo?.hospital);
  const markerColor = isOpen ? OPEN_MARKER_COLOR : CLOSED_MARKER_COLOR;

  const getDonationMessage = () => {
    if (
      popupInfo?.hospital.status === "active" &&
      popupInfo.hospital.fundingDeadline
    ) {
      const currentDate = new Date();
      const deadlineDate = new Date(popupInfo.hospital.fundingDeadline);
      const daysLeft = differenceInDays(deadlineDate, currentDate);
      return daysLeft > 0
        ? `${daysLeft} days left to donate!`
        : "Donations closed";
    }
    return "Donations closed";
  };

  useEffect(() => {
    const fetchGeneralInfo = async () => {
      const [info] = await generalInfoService.getGeneralInfo();
      setGeneralInfo(info);
    };
    fetchGeneralInfo();
  }, []);

  const partnerName = generalInfo?.corpPartner1Name || "Unknown Partner";
  console.log("partnerName: ", partnerName); //GeneralDatabase is empty

  return (
    <Card
      sx={{
        width: "265px",
        height: "242px",
        border: "none",
        borderRadius: "10px",
        boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
      }}
    >
      <Box className="media-container">
        {popupInfo && popupInfo.hospital.hospitalPictures.length > 0 && (
          <>
            <Chip
              icon={<LocationOnIcon />}
              label={`${popupInfo?.hospital.city},${popupInfo?.hospital.state}`}
              sx={{
                "& .MuiChip-icon": {
                  color: markerColor,
                  fontSize: "15px",
                },
                color: "#454545",
                fontSize: "8px",
                height: "auto",
              }}
              className="chip"
              size="small"
            />
            <div className="close-btn-container">
              <CustomCancelIconButton
                aria-label="close"
                className="close-btn"
                onClick={onClose}
              >
                <CancelRoundedIcon />
              </CustomCancelIconButton>
            </div>
            <CardMedia
              component="img"
              height="90"
              image={popupInfo.hospital.hospitalPictures[0]}
              alt={popupInfo?.hospital.name}
              className="card-media"
            />
          </>
        )}
      </Box>
      <Box>
        <Typography sx={{ fontSize: "10px" }}>
          <Box
            component="span"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              backgroundColor: "#FFFCD8",
              width: "265px",
              height: "20px",
              visibility:
                popupInfo?.hospital.status === "active" ? "visible" : "hidden",
            }}
          >
            Matched by {partnerName}
            {/* <CustomAvatar src="/path/to/profile1.jpg" />
            <CustomAvatar src="/path/to/profile2.jpg" />+ */}
          </Box>
        </Typography>
      </Box>
      <CardContent
        sx={{
          padding: "8px 16px 8px 16px !important", // 상단 및 하단 padding을 줄이고 싶다면 "8px"로 설정
          marginTop: "-10px", // 추가로 위로 올리려면 marginTop 조정
        }}
      >
        <Typography gutterBottom component="div" sx={{ fontSize: "14px" }}>
          {popupInfo?.hospital.name}
        </Typography>

        <Typography color="text.secondary" sx={{ fontSize: "10px" }}>
          <span style={{ color: "#828282" }}>25K </span>
          raised of 100k -{" "}
          <span style={{ color: "#92c65e", fontStyle: "italic" }}>
            {popupInfo?.hospital.status === "active" && "Actively Funding"}
          </span>
        </Typography>
        <Typography sx={{ fontSize: "10px" }}>
          {popupInfo?.hospital.year}+ kids impacted
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            href="#"
            disableRipple
            sx={{
              backgroundColor: "black",
              marginTop: "8px",
              width: "112px",
              height: "26px",
              borderRadius: "10px",
              textTransform: "none",
              fontSize: "10px",
              marginRight: "2px",
              "&:hover": {
                backgroundColor: "transparent",
                color: "#000",
              },
            }}
          >
            Learn more
          </Button>

          <Button
            variant="contained"
            href="#"
            disableRipple
            disabled={popupInfo?.hospital.status !== "active"}
            sx={{
              backgroundColor:
                popupInfo?.hospital.status === "active" ? "black" : "grey",
              marginTop: "8px",
              width: "112px", // Donate 버튼과 동일한 너비 유지
              height: "26px",
              borderRadius: "10px",
              textTransform: "none",
              fontSize: "10px",
              marginLeft: "2px",
              color: popupInfo?.hospital.status === "active" ? "white" : "grey",
              "&:hover": {
                backgroundColor:
                  popupInfo?.hospital.status === "active"
                    ? "transparent"
                    : "grey",
                color:
                  popupInfo?.hospital.status === "active" ? "#000" : "white",
              },
            }}
          >
            Donate
          </Button>
        </Box>

        <Box sx={{ marginBottom: "5px" }}>
          <Typography
            textAlign={"center"}
            sx={{
              marginTop: "2px",
              // padding: "10px 0px 5px 0px",
              fontSize: "10px",
              color: "grey",
              fontWeight: "bold",
            }}
          >
            {/* 15 days left to donate! */}
            {getDonationMessage()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
