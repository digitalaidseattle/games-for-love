import { Box, Grid, LinearProgress, Typography } from "@mui/material";

const HospitalPageDetails = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={4}>
        {/* Request Narrative Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Title: Request Narrative
          </Typography>
          <Typography variant="body1" gutterBottom>
            Request Narrative
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
            <br />
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Typography>
        </Grid>

        {/* Donations Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Donations Received:
          </Typography>
          <Typography variant="body1">
            150k raised out of 100k (150%)
          </Typography>
          <Box sx={{ marginY: 2 }}>
            <LinearProgress variant="determinate" value={150} />
          </Box>

          <Typography variant="h6" gutterBottom>
            Brand Partners:
          </Typography>

          {/* Partner 1 */}
          <Typography variant="body1">Partner Name</Typography>
          <Typography variant="body2" color="textSecondary">
            Match amount: 25k
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>

          <Box sx={{ marginY: 2 }} />

          {/* Partner 2 */}
          <Typography variant="body1">Partner Name</Typography>
          <Typography variant="body2" color="textSecondary">
            Match amount: 25k
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HospitalPageDetails;
