import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
} from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import { Hospital } from "../../models/hospital";
import { useContext } from "react";
import {
  DonationHospitalContext,
  LearnMoreHospitalContext,
} from "../../context/SelectedHospitalContext";
import { DonationContext } from "../../context/DonationContext";

type Props = {
  hospital: Hospital;
};

const HospitalPageInfoCard = ({ hospital }: Props) => {
  const { setHospital: setLearnMoreHospital } = useContext(
    LearnMoreHospitalContext
  );

  const { setDonateOverlayOpen } = useContext(DonationContext);
  const { setHospital: setDonationHospital } = useContext(
    DonationHospitalContext
  );

  const { matchedRequest } = hospital;
  const isActive = matchedRequest?.active;
  const amountRaised = hospital.fundingLevel || 0;
  const fundingGoal = matchedRequest?.requested || 0;
  const kidsImpacted = matchedRequest?.kids3Y || 0;
  const fundingNote = matchedRequest?.titleRequestNarrative || "";
  const partnerName = matchedRequest?.corpPartners?.[0]?.name;
  const location = `${hospital.city}, ${hospital.state}`;
  const imageUrl = hospital.hospitalPictures?.[0] || "";

  const handleLearnMore = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    setLearnMoreHospital(hospital);
  };

  const handleDonate = (evt: any) => {
    evt.stopPropagation();
    setDonationHospital(hospital);
    setDonateOverlayOpen(true);
  };

  const daysLeft = matchedRequest?.fundingDeadline
    ? Math.max(
        0, // Ensuring daysLeft is non-negative
        Math.ceil(
          (new Date(matchedRequest.fundingDeadline).getTime() -
            new Date().getTime()) /
            (1000 * 60 * 60 * 24)
        )
      )
    : null;

  return (
    <Card sx={{ width: "100%", borderRadius: 3, boxShadow: 3 }}>
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

        {/* Matched Info */}
        {partnerName && (
          <Box
            sx={{
              backgroundColor: "#FFF9D9",
              py: 0.5,
              textAlign: "center",
              fontSize: 14,
              fontWeight: 500,
              color: "#555",
            }}
          >
            Matched by {partnerName}
          </Box>
        )}

        {/* Content */}
        <CardContent sx={{ pb: 1.5 }}>
          <Typography variant="h6" gutterBottom>
            {hospital.name}
          </Typography>

          <Typography variant="body2" sx={{ mb: 0.5 }}>
            <strong>{amountRaised}k</strong> raised of{" "}
            <strong>{fundingGoal}k</strong> –{" "}
            <span style={{ color: "#43A047" }}>
              {isActive ? "Actively Funding" : "Inactive"}
            </span>
          </Typography>

          <Typography variant="body2" sx={{ mb: 1 }}>
            {kidsImpacted}+ kids impacted
          </Typography>

          <Typography
            variant="body2"
            sx={{ fontStyle: "italic", color: "#555" }}
          >
            {fundingNote}
          </Typography>

          {/* Buttons */}
          <Box mt={2} display="flex" gap={2}>
            <Button
              onClick={handleLearnMore}
              variant="contained"
              sx={{
                backgroundColor: "#000",
                color: "#fff",
                flex: 1,
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              Learn more
            </Button>
            <Button
              onClick={handleDonate}
              variant="contained"
              sx={{
                backgroundColor: "#000",
                color: "#fff",
                flex: 1,
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              Donate
            </Button>
          </Box>

          {/* Deadline */}
          {daysLeft !== null && (
            <Typography
              variant="caption"
              display="block"
              textAlign="center"
              mt={2}
              sx={{ color: "#777", fontWeight: 600 }}
            >
              {daysLeft} days left to donate!
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default HospitalPageInfoCard;
