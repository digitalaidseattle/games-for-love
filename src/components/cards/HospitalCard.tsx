import {
  Box,
  Card,
  CardContent,
  CardMedia,
  // Avatar,
  Chip,
  IconButton,
  Stack,
  styled,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { PopupInfo } from "../../models/popupInfo";

import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useContext } from "react";
import {
  DonationHospitalContext,
  LearnMoreHospitalContext,
} from "../../context/SelectedHospitalContext";
import ActionButton from "../../styles/ActionButton";

import { differenceInDays } from "date-fns";
import { Carousel } from "react-responsive-carousel";
import { generalInfoService } from "../../services/generalInfo/generalInfoService";
import { hospitalService } from "../../services/hospital/hospitalService";
import EmphasizedText from "../../styles/EmphasizedText";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./HospitalCard.style.css";

const CustomCancelIconButton = styled(IconButton)({
  opacity: 0.9,
  border: "none",
  boxShadow: "none"
});

// const CustomAvatar = styled(Avatar)({
//   width: 13,
//   height: 13,
//   marginLeft: 1,
//   marginRight: 1,
//   fontSize: 12,
//   textTransform: "none",
// });

interface HospitalCardProps {
  popupInfo: PopupInfo | null;
  onClose: () => void;
}

export const HospitalCard: React.FC<HospitalCardProps> = ({
  popupInfo,
  onClose,
}) => {
  const theme = useTheme();

  const { setHospital: setDonationHospital } = useContext(
    DonationHospitalContext
  );
  const { setHospital: setLearnMoreHospital } = useContext(
    LearnMoreHospitalContext
  );

  const [partnerName, setPartnerName] = useState<string>("Unknown Partner");

  const isOpen = hospitalService.isHospitalOpen(popupInfo?.hospital);
  const markerColor = isOpen ? theme.palette.hospital.open : theme.palette.hospital.closed;

  const getDonationMessage = () => {
    if (
      popupInfo?.hospital.status === "active" &&
      popupInfo.hospital.matchedRequest &&
      popupInfo.hospital.matchedRequest.fundingDeadline
    ) {
      const currentDate = new Date();
      const deadlineDate = new Date(
        popupInfo.hospital.matchedRequest.fundingDeadline
      );
      const daysLeft = differenceInDays(deadlineDate, currentDate);
      return daysLeft > 0
        ? `${daysLeft} days left to donate!`
        : "Donations closed";
    }
    return "Donations closed";
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
    <Card
      sx={{
        height: "242px",
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

            <Carousel
              showStatus={false}
              showThumbs={false}
              showIndicators={false}
            >
              {popupInfo?.hospital.hospitalPictures.map((url, idx) => (
                <CardMedia
                  key={"p" + idx}
                  component="img"
                  sx={{ height: 90 }}
                  image={url}
                  alt="Hospital Image"
                />
              ))}
            </Carousel>
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
              backgroundColor: (theme: Theme) => theme.palette.background.highlighted,
              width: "265px",
              height: "20px",
              visibility:
                popupInfo?.hospital.status === "active"
                  ? "visible"
                  : "hidden",
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
          padding:
            popupInfo?.hospital.status === "active"
              ? "21px 16px 8px 16px"
              : "8px 16px",
          marginTop: "-10px",
        }}
      >
        <Typography gutterBottom component="div" sx={{ fontSize: "14px" }}>
          {popupInfo?.hospital.name}
        </Typography>

        <Typography color="text.secondary" sx={{ fontSize: "10px" }}>
          ${popupInfo?.hospital.matchedFunded?.fundingCompleted || 0}{" "}
          raised of ${popupInfo?.hospital.matchedRequest?.requested} -{" "}
          <EmphasizedText
            sx={{
              color: theme.palette.hospital.open,
              fontSize: "10px"
            }}>
            {popupInfo?.hospital.status === "active" && "Actively Funding"}
          </EmphasizedText>
        </Typography>
        <Typography sx={{ fontSize: "10px" }}>
          {popupInfo?.hospital.year}+ kids impacted
        </Typography>

        <Stack
          direction="row"
          marginTop={"8px"}
          gap={1}
          paddingTop={
            popupInfo?.hospital.status === "active" ? "0px" : "19px"
          }
        >
          <ActionButton
            sx={{
              height: "26px",
              borderRadius: "10px",
              fontSize: "10px",
            }}
            onClick={(evt: any) => {
              evt.stopPropagation();
              setLearnMoreHospital(popupInfo?.hospital);
            }}
            s
          >
            Learn more
          </ActionButton>
          <ActionButton
            disabled={!isOpen}
            sx={{
              height: "26px",
              borderRadius: "10px",
              fontSize: "10px",
            }}
            onClick={(evt: any) => {
              evt.stopPropagation();
              setDonationHospital(popupInfo?.hospital);
            }}
          >
            Donate
          </ActionButton>
        </Stack>
        <Box sx={{ marginBottom: "5px" }}>
          <Typography
            textAlign={"center"}
            sx={{
              marginTop:
                popupInfo?.hospital.status === "active" ? "8px" : "5px",
              fontSize: "10px",
              color: "grey",
              fontWeight: "bold",
            }}
          >
            {getDonationMessage()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
