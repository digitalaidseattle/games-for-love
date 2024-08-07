import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Avatar,
  Button,
  Chip,
  IconButton,
} from "@mui/material";
import { PopupInfo } from "../../models/popupInfo";
import "./HospitalCard.style.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { styled } from "@mui/material/styles";

const CustomCancelIconButton = styled(IconButton)({
  opacity: 0.9,
  border: "none",
  boxShadow: "none",
  "& .MuiSvgIcon-root": {
    color: "white",
  },
  "&:focus": {
    outline: "none",
  },
});

interface HospitalCardProps {
  popupInfo: PopupInfo | null;
  images: string[];
  onClose: () => void;
}

export const HospitalCard: React.FC<HospitalCardProps> = ({
  popupInfo,
  images,
  onClose,
}) => {
  return (
    <Card
      sx={{
        width: "265px",
        height: "242px",
        border: "none",
        borderRadius: "10px",
        boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
      }}
    >
      <Box className="media-container">
        {images.length > 0 && (
          <>
            <Chip
              icon={<LocationOnIcon />}
              label={`${popupInfo?.hospitalInfo.city},${popupInfo?.hospitalInfo.state}`}
              sx={{
                "& .MuiChip-icon": {
                  color: "#92C65E",
                  fontSize: "15px",
                },
                color: "#454545",
                fontSize: "8px",
                height: "auto",
              }}
              className="chip"
              size="small"
            />
            <div className="close-btn-container">
              <CustomCancelIconButton
                aria-label="close"
                className="close-btn"
                onClick={onClose}
              >
                <CancelRoundedIcon />
              </CustomCancelIconButton>
            </div>
            <CardMedia
              component="img"
              height="90"
              image={images[0]}
              alt={popupInfo?.hospitalInfo.name}
              className="card-media"
            />
          </>
        )}
      </Box>
      <CardContent>
        <Typography gutterBottom component="div" sx={{ fontSize: "14px" }}>
          {popupInfo?.hospitalInfo.name}
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: "10px" }}>
          <span style={{ color: "#828282" }}>25K </span>
          raised of 100k -{" "}
          <span style={{ color: "#92c65e", fontStyle: "italic" }}>
            {popupInfo?.hospitalInfo.status}
          </span>
        </Typography>
        <Typography sx={{ fontSize: "10px" }}>
          {popupInfo?.hospitalInfo.year}+ kids impacted
        </Typography>
        <Typography sx={{ fontSize: "10px" }}>
          <Box component="span" display="flex" alignItems="center">
            Matched by
            <Avatar
              // alt="organization"
              src="/path/to/profile1.jpg"
              sx={{
                width: 13,
                height: 13,
                marginLeft: 1,
                fontSize: 12,
                textTransform: "none",
              }}
            />
            <Avatar
              // alt="organization"
              src="/path/to/profile2.jpg"
              sx={{
                width: 13,
                height: 13,
                marginLeft: 1,
                marginRight: 1,
                fontSize: 12,
                textTransform: "none",
              }}
            />
            +
          </Box>
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            href="#"
            sx={{
              backgroundColor: "black",
              marginTop: "8px",
              width: "112px",
              height: "26px",
              borderRadius: "10px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "transparent",
                color: "#000",
              },
            }}
          >
            Learn more
          </Button>
          <Button
            variant="contained"
            href="#"
            sx={{
              backgroundColor: "black",
              marginTop: "8px",
              width: "112px",
              height: "26px",
              borderRadius: "10px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "transparent",
                color: "#000",
              },
            }}
          >
            Donate
          </Button>
        </Box>
        <Box sx={{ marginBottom: "5px" }}>
          <Typography
            textAlign={"center"}
            sx={{
              marginTop: "2px",
              fontSize: "10px",
              color: "grey",
              fontWeight: "bold",
            }}
          >
            15 days left to donate!
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
