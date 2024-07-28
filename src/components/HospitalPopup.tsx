import React from "react";
import { Popup } from "react-map-gl";
import { HospitalInfo } from "../mapping/hospitalInfo";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Avatar,
  Box,
  Button,
} from "@mui/material";

type Props = {
  info: HospitalInfo;
  onClose: () => void;
};

export const HospitalPopup: React.FC<Props> = ({ info, onClose }) => {
  return (
    <Popup
      longitude={info.longitude}
      latitude={info.latitude}
      closeButton={true}
      closeOnClick={false}
      onClose={onClose}
      anchor="top"
    >
      <Card
        sx={{
          maxWidth: "342",
          border: "none",
          marginTop: "10px",
          boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={info.hospitalPicture1}
            alt="hospital building"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {info.name}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              <span style={{ color: "black" }}>25k </span>
              raised of 100k -
              <span style={{ color: "#92c65e", fontStyle: "italic" }}>
                {" "}
                {info.status}
              </span>
            </Typography>

            <Typography variant="body2">{info.year}+ kids impacted</Typography>

            <Typography variant="body2">
              <Box component="span" display="flex" alignItems="center">
                Matched by
                <Avatar
                  alt="organizations"
                  src={info.hospitalPicture2}
                  sx={{ width: 20, height: 20, marginLeft: 1 }}
                />
                <Avatar
                  alt="organizations"
                  src={info.hospitalPicture3}
                  sx={{ width: 20, height: 20, marginLeft: 1 }}
                />
                +
              </Box>
            </Typography>

            <Button
              variant="contained"
              href="#donate"
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
        </CardActionArea>
      </Card>
    </Popup>
  );
};
