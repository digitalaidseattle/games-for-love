import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { LearnMoreHospitalContext } from "../../context/SelectedHospitalContext";
import { useContext } from "react";
import DonationBarActive from "./DonationBarActive";

const DonationsRecievedProgressBar = styled(LinearProgress)({
  height: 40,
  borderRadius: 5,
  "& .MuiLinearProgress-bar": {
    backgroundColor: "#4A24E7", // Purple color
  },
});

const HospitalPageTitleRequestNarrative = () => {
  const { hospital } = useContext(LearnMoreHospitalContext);
  return (
    <>
      {/* Donations Received Section - active hospital */}
      {hospital?.status === "past" && (
        <Grid item>
          <DonationBarActive />
        </Grid>
      )}
      <Box sx={{ padding: "20px" }}>
        {/* Title Request Narrative & Request Narrative Section */}
        <Grid
          container
          spacing={4}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              padding: "20px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item>
              <Typography
                variant="body1"
                gutterBottom
                sx={{ color: "#8A8A8A" }}
              >
                {hospital?.matchedRequest?.titleRequestNarrative}
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="body1" gutterBottom>
                {hospital?.matchedRequest?.requestNarrative}
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item>
              {/* Donations Received Section - past hospital */}
              {hospital?.status === "active" && (
                <Box mt={2}>
                  <Typography variant="h6" sx={{ fontSize: "20px" }}>
                    Donations Received:
                    <span>150k raised out of 100k (150%)</span>
                  </Typography>

                  <Box mt={2}>
                    <DonationsRecievedProgressBar
                      variant="determinate"
                      value={100}
                    />
                  </Box>
                </Box>
              )}

              {/* Brand Partners Section */}
              <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  Brand Partners
                </Typography>
                <Grid container spacing={4} alignItems="center">
                  <Grid item xs={3}>
                    <img
                      src="https://via.placeholder.com/100" // Replace with actual image
                      alt="Partner Logo"
                      style={{ width: "100%", height: "auto", borderRadius: 8 }}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="h6">Partner Name</Typography>
                      <Typography variant="body2" mt={1}>
                        Match Amount: $25,000
                      </Typography>
                    </Box>
                    <Typography variant="body2" mt={1}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <img
                      src="https://via.placeholder.com/100" // Replace with actual image
                      alt="Partner Logo"
                      style={{ width: "100%", height: "auto", borderRadius: 8 }}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="h6">Partner Name</Typography>
                      <Typography variant="body2" mt={1}>
                        Match Amount: $25,000
                      </Typography>
                    </Box>
                    <Typography variant="body2" mt={1}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default HospitalPageTitleRequestNarrative;
