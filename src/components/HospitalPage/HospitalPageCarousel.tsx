import { Box } from "@mui/material";
import { useContext } from "react";
import { LearnMoreHospitalContext } from "../../context/SelectedHospitalContext";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HospitalPageCarousel = () => {
  const { hospital } = useContext(LearnMoreHospitalContext);

  // 3 images per slide
  const slides = [];
  if (hospital?.hospitalPictures) {
    for (let i = 0; i < hospital.hospitalPictures.length; i += 3) {
      slides.push(hospital.hospitalPictures.slice(i, i + 3));
    }
  }

  return (
    <Box
      sx={{
        width: "100%",
        margin: "40px auto",
        padding: "20px 0",
        "& .control-dots": {
          bottom: "-10px",
        },
        "& .control-dots .dot": {
          width: "10px",
          height: "10px",
        },
      }}
    >
      <Carousel
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={3000}
        swipeable={true}
        emulateTouch={true}
        dynamicHeight={false}
        centerMode={false}
      >
        {slides.map((slide, slideIndex) => (
          <Box
            key={slideIndex}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px",
            }}
          >
            {slide.map((image, index) => (
              <Box
                key={index}
                sx={{
                  flex: "1",
                  margin: "0 10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src={image}
                  alt={`Slide ${slideIndex + 1} - Image ${index + 1}`}
                  sx={{
                    width: "100%",
                    maxWidth: "300px",
                    height: "200px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </Box>
            ))}
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default HospitalPageCarousel;
