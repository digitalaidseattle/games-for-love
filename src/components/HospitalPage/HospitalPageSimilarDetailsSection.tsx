import { Box, Grid, Typography, Button } from "@mui/material";
import HospitalPageInfoCard from "./HospitalPageInfoCard";

const HospitalPageSimilarDetailsSection = () => {
  return (
    <Box sx={{ padding: 6 }}>
      {/* Header */}
      <Typography variant="h5" sx={{ marginBottom: 4, textAlign: "center" }}>
        Other Similar Projects:
      </Typography>

      {/* Cards */}
      <Grid
        container
        spacing={4}
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        <HospitalPageInfoCard
          image="https://via.placeholder.com/345x180"
          title="Card Title 1"
          description="This is the description for Card 1. It provides more details about the content."
        />
        <HospitalPageInfoCard
          image="https://via.placeholder.com/345x180"
          title="Card Title 2"
          description="This is the description for Card 2. It provides additional information and context."
        />
        <HospitalPageInfoCard
          image="https://via.placeholder.com/345x180"
          title="Card Title 3"
          description="This is the description for Card 3. It showcases more details and insights."
        />
      </Grid>

      {/* See More Button */}
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#4A24E7",
            width: "50%",
            padding: "10px 20px",
            textTransform: "none",
          }}
        >
          See More
        </Button>
      </Box>
    </Box>
  );
};

export default HospitalPageSimilarDetailsSection;
