import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { PopupInfo } from "../models/popupInfo";

interface GFLPopupProps {
  popupInfo: PopupInfo | null;
  onClose: () => void;
}

export const GFLPopup: React.FC<GFLPopupProps> = ({
  popupInfo = null,
  onClose,
}) => {

  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    if (popupInfo) {
      setImages(popupInfo.hospitalInfo.hospitalPicture1);
    };
  }, [popupInfo])


  return (
    popupInfo && <Box
      sx={{
        position: "fixed",
        bottom: 10,
        width: "60%",
        backgroundColor: "white",
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "15px",
        zIndex: 1000,
        // p: 2,
        mb: 2,
      }}
    >
      <Box sx={{ width: "100%", display: "flex", flexDirection: "row", }}>
        <Box
          sx={{
            width: "40%",
            // p: 1,
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {images.length > 0 && (
            <Carousel
              showThumbs={false}
              showIndicators={false}
              showArrows={true}
              renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    style={arrowPrevStyles}
                  >
                    <ArrowBackIosIcon style={arrowIconStyles} />
                  </button>
                )
              }
              renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    style={arrowNextStyles}
                  >
                    <ArrowForwardIosIcon style={arrowIconStyles} />
                  </button>
                )
              }
            >
              {images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`${popupInfo.hospitalInfo.name} Picture`}
                    style={{ width: "100%", height: "100%", borderTopLeftRadius: "15px", borderBottomLeftRadius: "15px" }}
                  />
                </div>
              ))}
            </Carousel>
          )}
        </Box>
        <Box
          sx={{
            width: "60%",
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Stack spacing={1}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocationOnIcon color="primary" />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {popupInfo.hospitalInfo.city}, {popupInfo.hospitalInfo.state}
              </Typography>
            </Box>
            <Typography fontWeight={600}>
              {popupInfo.hospitalInfo.name}
            </Typography>
            <Typography variant="body2" sx={{ fontStyle: "italic" }}>
              "{popupInfo.hospitalInfo.description}"
            </Typography>
          </Stack>
          <Button variant="contained" color="primary" onClick={onClose}>
            Learn more
          </Button>
        </Box>
        <Box
          sx={{
            width: "30%",
            p: 2,
            borderLeft: "1px solid #ddd",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Stack spacing={2}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* who is gonna be 'Avatar'? */}
              <Avatar
                src="/path/to/profile1.jpg"
                sx={{ width: 24, height: 24, mr: 1 }}
              />
              <Avatar
                src="/path/to/profile2.jpg"
                sx={{ width: 24, height: 24, mr: 1 }}
              />
              <Avatar sx={{ width: 24, height: 24 }}>+</Avatar>
            </Box>
            <Typography variant="body2">
              {/* which data is 'Donations received'? */}
              Donations received: <strong>150k</strong>
            </Typography>
            {/* which data is 'kids impacted'? */}
            <Typography variant="body2">400+ kids impacted</Typography>
          </Stack>
          <Button variant="contained" color="primary" onClick={onClose}>
            Donate
          </Button>
        </Box>
        <Button
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          X
        </Button>
      </Box>
    </Box>
  );
};

const arrowButtonStyles: React.CSSProperties = {
  position: 'absolute',
  zIndex: 2,
  top: 'calc(50% - 10px)',
  background: 'none',
  border: 'none',
  color: 'white',
  cursor: 'pointer',
  padding: 0,
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '30px',
  height: '30px',
  outline: 'none',
};

const arrowPrevStyles = {
  ...arrowButtonStyles,
  left: 10,
};

const arrowNextStyles = {
  ...arrowButtonStyles,
  right: 10,
};

const arrowIconStyles: React.CSSProperties = {
  fontSize: '20px',
};
