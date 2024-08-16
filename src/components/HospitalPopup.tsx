import React, { useEffect, useState } from "react";
import { Popup } from "react-map-gl";
import { PopupInfo } from "../models/popupInfo";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  Box,
  Button
} from "@mui/material";

interface HospitalPopupProps {
  popupInfo: PopupInfo | null;
  onClose: () => void;
}

export const HospitalPopup: React.FC<HospitalPopupProps> = ({
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
    popupInfo && (
      <Popup
        longitude={popupInfo.hospitalInfo.longitude}
        latitude={popupInfo.hospitalInfo.latitude}
        closeButton={true}
        closeOnClick={false}
        onClose={onClose}
        anchor="top"
      >
        <Card
          sx={{
            maxWidth: "342px",
            border: "none",
            marginTop: "10px",
            boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image={images[0]}
            alt={popupInfo.hospitalInfo.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {popupInfo.hospitalInfo.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <span style={{ color: "black" }}>
                25K{" "}
              </span>
              raised of 100k -{" "}
              <span style={{ color: "#92c65e", fontStyle: "italic" }}>
                {popupInfo.hospitalInfo.status}
              </span>
            </Typography>
            <Typography variant="body2">
              {popupInfo.hospitalInfo.year}+ kids impacted
            </Typography>
            <Typography variant="body2">
              <Box component="span" display="flex" alignItems="center">
                Matched by
                <Avatar
                  alt="organization"
                  src="/path/to/profile1.jpg"
                  sx={{ width: 20, height: 20, marginLeft: 1 }}
                />
                <Avatar
                  alt="organization"
                  src="/path/to/profile2.jpg"
                  sx={{ width: 20, height: 20, marginLeft: 1 }}
                />
                +
              </Box>
            </Typography>
            <Button
              variant="contained"
              href="#"
              sx={{
                backgroundColor: "black",
                marginTop: "20px",
                width: "100%",
                borderRadius: "40px",
                textTransform: "capitalize",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#000",
                },
              }}
            >
              Donate
            </Button>
            <Typography variant="body2" textAlign={"center"}>
              15 days left to donate!
            </Typography>
          </CardContent>
        </Card>
      </Popup>
    )
  );
};



