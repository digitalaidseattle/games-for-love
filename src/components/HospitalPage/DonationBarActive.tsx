import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { daysRemaining } from "../../utils/dateUtils";
import { LearnMoreHospitalContext } from "../../context/SelectedHospitalContext";
import { useContext } from "react";

const DonationProgress = styled(LinearProgress)(({ theme }) => ({
  height: 30,
  borderRadius: 5,
  backgroundColor: theme.palette.grey[300],
  "& .MuiLinearProgress-bar": {
    backgroundColor: theme.palette.primary.main,
  },
}));

const DonationBarActive = () => {
  const { hospital } = useContext(LearnMoreHospitalContext);
  const amountRequested = hospital?.matchedRequest?.requested ?? 0;
  const amountRaised = hospital?.matchedFunded?.fundingCompleted ?? 0;
  const percentage = (amountRaised / amountRequested) * 100;
  const daysLeft = daysRemaining(
    hospital?.matchedRequest?.fundingDeadline ??
      new Date().toLocaleTimeString("en-US")
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#F3C941",
        padding: "2rem 4rem",
        boxShadow: 2,
        marginTop: "16px",
      }}
    >
      {/* Donation Info */}
      <Box sx={{ flex: 1, marginRight: "16px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            width: "100%",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              marginBottom: "0.4rem",
              flex: 1,
            }}
          >
            Donations received:
          </Typography>
          <Typography
            variant="body2"
            sx={{
              borderRadius: "4px",
              marginBottom: "0.1rem",
              flex: 1,
            }}
          >
            {`$${(amountRaised / 1000).toFixed(1)}k raised out of $${(
              amountRequested / 1000
            ).toFixed(1)}k (${percentage.toFixed(0)}%)`}
          </Typography>
        </Box>

        <DonationProgress variant="determinate" value={percentage} />
      </Box>

      {/* Days Left */}
      <Box sx={{ textAlign: "center", marginRight: "16px" }}>
        <Typography
          variant="body2"
          sx={{ fontStyle: "italic", fontWeight: "bold" }}
        >
          {daysLeft} days left to donate
        </Typography>
      </Box>

      {/* Donate Button */}
      <Button
        variant="contained"
        color="primary"
        sx={{
          backgroundColor: "#4A24E7",
          color: "#FFFFFF",
          borderRadius: "12px",
          textTransform: "capitalize",
          padding: "0.5rem 2rem",
        }}
      >
        Donate
      </Button>
    </Box>
  );
};

export default DonationBarActive;
