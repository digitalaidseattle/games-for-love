import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Avatar,
} from "@mui/material";

import { Pin } from "../components/Pin";
import { HospitalInfo } from "../models/hospitalInfo";

interface HospitalDetailsProps {
  hospital: HospitalInfo | null;
}

export const HospitalCardDetails: React.FC<HospitalDetailsProps> = ({ hospital }) => {
  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    if (hospital) {
      setImages(hospital.hospitalPicture1);
    }
  }, [hospital]);
  return (
    <>
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          padding: 2,
          margin: "10px 0",
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 120, height: 120, borderRadius: 2 }}
          image={images[0]}
          alt="Hospital Image"
        />
        <CardContent
          sx={{ flex: 1, padding: "0 16px", borderRight: "1px solid #d9d9d9" }}
        >
          <Typography variant="subtitle2" color="textSecondary">
            <Pin /> {hospital?.city}, {hospital?.state}
          </Typography>

          <Typography variant="h6" component="div">
            {hospital?.name}
          </Typography>

          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontStyle: "italic" }}
          >
            {hospital?.description}
          </Typography>

          <Typography
            variant="body2"
            color="primary"
            sx={{ marginTop: 1, color: "#2293C4" }}
          >
            LEARN MORE &gt;
          </Typography>
        </CardContent>

        <CardContent sx={{ flex: 1 }}>
          <Typography variant="body2" color="textSecondary">
            <span style={{ color: "black" }}>25k </span> raised of 100k -{" "}
            <Typography
              variant="body2"
              component="span"
              color="success.main"
              sx={{ fontStyle: "italic", color: "#92c65e" }}
            >
              {hospital?.status}
            </Typography>
          </Typography>

          <Typography variant="body2" color="textSecondary">
            400+ kids impacted
          </Typography>

          <Box display="flex" alignItems="center" marginTop={1}>
            <Typography variant="body2" color="textSecondary" marginRight={1}>
              Matched by
            </Typography>
            <Avatar
              alt="Organization Logo"
              src="/path/to/profile1.jpg"
              sx={{ width: 20, height: 20, marginLeft: 1 }}
            />
            <Avatar
              alt="Organization Logo"
              src="/path/to/profile2.jpg"
              sx={{ width: 20, height: 20, marginLeft: 1 }}
            />
            +
          </Box>

          <Button
            variant="contained"
            color="primary"
            sx={{
              marginTop: 2,
              width: "100%",
              backgroundColor: "#000",
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

          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            sx={{ marginTop: 1 }}
          >
            15 days left to donate!
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
