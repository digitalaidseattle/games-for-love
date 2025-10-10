/**
 *  HospitalPageTitleRequestNarrative.tsx
 *
 *  @copyright 2025 Digital Aid Seattle
 *
 */
import { useContext } from "react";
import { Box, CardMedia, Stack, Typography } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import { LearnMoreHospitalContext } from "../../context/SelectedHospitalContext";
import image_1 from "../../assets/istockphoto-1141330658-612x612.jpg";
import image_2 from "../../assets/istockphoto-1448093779-612x612.jpg";
import image_3 from "../../assets/istockphoto-1515280024-612x612.jpg";

const HospitalPageTitleRequestNarrative = () => {
  const { hospital } = useContext(LearnMoreHospitalContext);
  const photos = [image_1, image_2, image_3]

  return (
    <Stack
      gap={2}
      sx={{
        margin: "20px",
      }}
    >
      <Box>
        <Carousel
          showArrows={true}
          showThumbs={false}
          showStatus={true}
        >
          {photos.map((url, idx) => (
            <CardMedia
              key={idx}
              component="img"
              image={url}
              alt="Hospital Image"
              sx={{
                borderRadius: "15px",
                objectFit: 'cover'
              }}
            />
          ))}
        </Carousel>
      </Box>
      <Typography
        fontWeight={600}
      >
        Our request
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "#8A8A8A", paddingBottom: "1rem" }}
      >
        {hospital?.matchedRequest?.titleRequestNarrative}
      </Typography>

      <Typography variant="body1" >
        {hospital?.matchedRequest?.requestNarrative}
      </Typography>
    </Stack>
  );
};

export default HospitalPageTitleRequestNarrative;
