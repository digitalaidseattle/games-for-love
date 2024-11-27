import Slider from "react-slick";
import { Box, Grid } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

// Import slick-carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useContext } from "react";
import { LearnMoreHospitalContext } from "../../context/SelectedHospitalContext";

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <ArrowForwardIosIcon
      className={className}
      style={{ ...style, color: "black" }}
      onClick={onClick}
      fontSize="large"
    />
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <ArrowBackIosIcon
      className={className}
      style={{ ...style, color: "black" }}
      onClick={onClick}
      fontSize="large"
    />
  );
}

const HospitalPageCarousel = () => {
  // Settings for the slider
  const settings = {
    dots: true, // Enable dots for navigation
    infinite: true, // Infinite looping
    speed: 500, // Transition speed
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { hospital } = useContext(LearnMoreHospitalContext);

  return (
    <Box
      sx={{
        width: "100%",
        margin: "40px auto",
        padding: "20px 0",
      }}
    >
      <Slider {...settings}>
        {hospital?.hospitalPictures.map((slide, index) => (
          <Grid
            container
            spacing={2}
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid
              item
              key={index}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                component="img"
                src={slide}
                alt={`Slide ${index + 1} - Image ${index + 1}`}
                sx={{
                  width: "300px",
                  height: "200px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Grid>
          </Grid>
        ))}
      </Slider>
    </Box>
  );
};

export default HospitalPageCarousel;
