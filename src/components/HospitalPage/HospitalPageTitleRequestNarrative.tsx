import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import { styled } from "@mui/system";

const PurpleProgressBar = styled(LinearProgress)({
  height: 40,
  borderRadius: 5,
  "& .MuiLinearProgress-bar": {
    backgroundColor: "#4A24E7", // Purple color
  },
});

const HospitalPageTitleRequestNarrative = () => {
  return (
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
            <Typography variant="h6" gutterBottom sx={{ color: "#8A8A8A" }}>
              Title Request Narrative
            </Typography>
            <Typography variant="body1" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="h6" gutterBottom sx={{ color: "#8A8A8A" }}>
              Request Narrative
            </Typography>
            <Typography variant="body1" mt={2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid item>
            {/* Donations Received Section */}
            <Box mt={2}>
              <Typography variant="h6" sx={{ fontSize: "20px" }}>
                Donations Received:
                <span>150k raised out of 100k (150%)</span>
              </Typography>

              <Box mt={2}>
                <PurpleProgressBar variant="determinate" value={100} />
              </Box>
            </Box>
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HospitalPageTitleRequestNarrative;
