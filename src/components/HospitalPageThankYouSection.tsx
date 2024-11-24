import { Box, Typography, Container } from "@mui/material";

const HospitalPageThankYouSection = () => {
  return (
    <Box sx={{ backgroundColor: "#f9f9f9", padding: 6 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Typography variant="h4" align="center" gutterBottom>
          Thank you for your donation!
        </Typography>

        {/* Paragraph */}
        <Typography variant="body1" color="textSecondary" align="center">
          <strong>Our mission and how your donation will help us:</strong>
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
          <br />
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>
      </Container>
    </Box>
  );
};

export default HospitalPageThankYouSection;
