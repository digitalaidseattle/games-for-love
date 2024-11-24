import Slider from "react-slick";
import { Box, Grid } from "@mui/material";

// Import slick-carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HospitalPageCarausel = () => {
  // Settings for the slider
  const settings = {
    dots: true, // Enable dots for navigation
    infinite: true, // Infinite looping
    speed: 500, // Transition speed
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  // Slides data: 6 slides, each containing 3 images
  const slides = [
    ["https://via.placeholder.com/150?text=Image+1"],
    ["https://via.placeholder.com/150?text=Image+4"],
    ["https://via.placeholder.com/150?text=Image+7"],
    ["https://via.placeholder.com/150?text=Image+10"],
    ["https://via.placeholder.com/150?text=Image+13"],
    ["https://via.placeholder.com/150?text=Image+16"],
    ["https://via.placeholder.com/150?text=Image+10"],
    ["https://via.placeholder.com/150?text=Image+13"],
    ["https://via.placeholder.com/150?text=Image+16"],
  ];

  return (
    <Box
      sx={{
        width: "100%",
        margin: "40px auto",
        padding: "20px 0",
        // border: "1px solid black",
      }}
    >
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "40px",
            }}
          >
            <Grid container spacing={2} sx={{ alignItems: "center" }}>
              {slide.map((image, idx) => (
                <Grid item xs={4} key={idx}>
                  <Box
                    component="img"
                    src={image}
                    alt={`Slide ${index + 1} - Image ${idx + 1}`}
                    sx={{
                      width: "300px",
                      height: "auto",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default HospitalPageCarausel;
