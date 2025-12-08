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
  Stack,
  styled,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
  LearnMoreHospitalContext
} from "../../context/SelectedHospitalContext";
import { Hospital } from "../../models/hospital";
import { hospitalService } from "../../services/hospital/hospitalService";

interface DonationProgressProps {
  height?: number;
}

const DonationProgress = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== "height",   // prevent passing the custom prop to DOM
})<DonationProgressProps>(({ height = 30 }) => ({
  height,
  borderRadius: 20,
  boxShadow: "none",
  backgroundColor: "#C3EF96",
  "& .MuiLinearProgress-bar": {
    borderRadius: 20,
    backgroundColor: "#3B7600",
  }
}));

type Props = {
  key: string,
  hospital: Hospital;
};

const HospitalPageInfoCard = ({ key, hospital }: Props) => {
  const theme = useTheme();
  const { setHospital: setLearnMoreHospital } = useContext(LearnMoreHospitalContext);

  const location = `${hospital.city}, ${hospital.state}`;
  const [percentage, setPercentage] = useState<number>(25);
  const [imageUrl, setImageUrl] = useState<string>("");

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (hospital) {
      setPercentage(Math.round(hospitalService.calcFundingLevel(hospital) * 100));
      setImageUrl(getImageUrl());
    }
  }, [hospital]);

  // REVIEW still using impact pics.  Should we use others?
  function getImageUrl(): string {
    const randomImpact = Math.round(Math.random() * (hospital.matchedFunded!.impactPictures.length));
    return hospital.matchedFunded!.impactPictures![randomImpact] || "";
  }

  const handleLearnMore = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    setLearnMoreHospital(hospital);
  };

  const MobileCard = () => {
    return (
      <Box
        key={key}
        sx={{
          gap: 0,
          width: "100%",
          borderRadius: 5,
          boxShadow: "none",
          backgroundColor: "#70A040", // default background
          transition: "background-color 0.3s ease", // smooth transition
          "&:hover": {
            backgroundColor: "#70A040", // hover background
          },
        }}>

        {/* Content */}
        <Box sx={{ display: "flex", flexDirection: "row", padding: 0, height: '100%' }}>
          <Box sx={{ padding: 1.5 }}>
            <Stack direction={'row'}>
              <img
                // component="img"
                height="98"
                width="98"
                src={imageUrl}
                alt={hospital.name}
                style={{ borderRadius: "12px", maxWidth: "98" }}
              />
              <Box sx={{ padding: 1 }}>
                <Chip
                  icon={<RoomIcon />}
                  label={location}
                  size="small"
                  sx={{
                    marginBottom: 1.5,
                    opacity: 0.75,
                    backgroundColor: "#000000",
                    color: "#FFFFFF",
                    fontWeight: 500,
                    fontSize: 10,
                    "& .MuiChip-icon": { color: "#92C65E" }
                  }}
                />
                {hospital.matchedRequest && (
                  <Typography fontWeight={600} fontSize={12}>
                    Support "{hospital.matchedRequest.titleRequestNarrative}"
                  </Typography>
                )}
                <Typography fontSize={12}>
                  {hospital.name}
                </Typography>
              </Box>
            </Stack>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <DonationProgress
                height={12}
                variant="determinate"
                value={Math.min(100, percentage)} />
              <Typography fontStyle={'italic'} fontSize={10}>
                ${(hospital!.matchedFunded?.fundingCompleted! / 1000).toFixed(2)}k raised ({percentage}%)
              </Typography>
            </Box>
          </Box>
          <Box sx={{
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            backgroundColor: '#1D3A01',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <ArrowForwardIosIcon sx={{ color: "#C3EF96" }} />
          </Box>
        </Box>
      </Box >);
  }

  const DesktopCard = () => {
    return (
      <Card sx={{
        padding: 2,
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
              height="220"
              image={imageUrl}
              alt={hospital.name}
              sx={{ borderRadius: "12px" }}
            />
            <Chip
              icon={<RoomIcon />}
              label={location}
              size="small"
              sx={{
                position: "absolute",
                top: 8,
                left: 8,
                opacity: 0.75,
                backgroundColor: "#000000",
                color: "#FFFFFF",
                fontWeight: 500,
                "& .MuiChip-icon": { color: "#92C65E" }
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
                value={Math.min(100, percentage)} />
              <Typography fontStyle={'italic'}>
                ${(hospital!.matchedFunded?.fundingCompleted! / 1000).toFixed(2)}k raised ({percentage}%)
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>);
  }

  return (
    isMobile ? <MobileCard /> : <DesktopCard />
  );
};

export default HospitalPageInfoCard;
