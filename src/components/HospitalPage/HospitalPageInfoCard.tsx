/**
 *  HospitalPageInfoCard.tsx
 *
 *  @copyright 2025 Digital Aid Seattle
 *
 */
import { useContext, useEffect, useState } from "react";
import RoomIcon from "@mui/icons-material/Room";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  LinearProgress,
  styled,
  Typography
} from "@mui/material";
import {
  LearnMoreHospitalContext
} from "../../context/SelectedHospitalContext";
import { Hospital } from "../../models/hospital";
import { hospitalService } from "../../services/hospital/hospitalService";

const DonationProgress = styled(LinearProgress)(({ theme }) => ({
  height: 30,
  borderRadius: 20,
  boxShadow: "none",
  backgroundColor: "#C3EF96",
  "& .MuiLinearProgress-bar": {
    borderRadius: 20,
    backgroundColor: "#3B7600",
  },
}));

type Props = {
  hospital: Hospital;
};

const HospitalPageInfoCard = ({ hospital }: Props) => {
  const { setHospital: setLearnMoreHospital } = useContext(LearnMoreHospitalContext);

  const location = `${hospital.city}, ${hospital.state}`;
  const imageUrl = hospital.hospitalPictures?.[0] || "";
  const [percentage, setPercentage] = useState<number>(25);

  useEffect(() => {
    if (hospital) {
      setPercentage(Math.round(hospitalService.calcFundingLevel(hospital) * 100));
    }
  }, [hospital]);

  const handleLearnMore = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    setLearnMoreHospital(hospital);
  };

  return (
    <Card sx={{
      width: "100%",
      borderRadius: 3,
      boxShadow: "none",
      backgroundColor: "#92C65E", // default background
      transition: "background-color 0.3s ease", // smooth transition
      "&:hover": {
        backgroundColor: "#70A040", // hover background
      },
    }}>
      <CardActionArea onClick={handleLearnMore}>
        {/* Header Image with Location */}
        <Box position="relative">
          <CardMedia
            component="img"
            height="160"
            image={imageUrl}
            alt={hospital.name}
            sx={{ borderRadius: "12px 12px 0 0" }}
          />
          <Chip
            icon={<RoomIcon />}
            label={location}
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              backgroundColor: "#EAF4EB",
              color: "#333",
              fontWeight: 500,
            }}
          />
        </Box>

        {/* Content */}
        <CardContent sx={{ p: 1.5, display: "flex", flexDirection: "column", gap: 3 }}>
          {hospital.matchedRequest && (
            <Typography fontWeight={600} fontSize={20}>
              Support "{hospital.matchedRequest.titleRequestNarrative}"
            </Typography>
          )}
          <Typography fontSize={20}>
            {hospital.name}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <DonationProgress
              variant="determinate"
              value={percentage} />
            <Typography fontStyle={'italic'}>
              ${hospital!.matchedFunded?.fundingCompleted! / 1000}k raised ({percentage}%)
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default HospitalPageInfoCard;
