import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Stack,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { PopupInfo } from "../../models/popupInfo";
import "./HospitalCard.style.css";

import { hospitalInfoService } from "../../services/hospitalInfo/hospitalInfoService";
import ActionButton from "../../styles/ActionButton";
import { CLOSED_MARKER_COLOR, OPEN_MARKER_COLOR } from "../../styles/theme";

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

const CustomAvatar = styled(Avatar)({
  width: 13,
  height: 13,
  marginLeft: 1,
  marginRight: 1,
  fontSize: 12,
  textTransform: "none",
});

interface HospitalCardProps {
  popupInfo: PopupInfo | null;
  onClose: () => void;
}

export const HospitalCard: React.FC<HospitalCardProps> = ({
  popupInfo,
  onClose,
}) => {
  const isOpen = hospitalInfoService.isHospitalOpen(popupInfo?.hospitalInfo);
  const markerColor = isOpen ? OPEN_MARKER_COLOR : CLOSED_MARKER_COLOR;

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
        {popupInfo && popupInfo.hospitalInfo.hospitalPictures.length > 0 && (
          <>
            <Chip
              icon={<LocationOnIcon />}
              label={`${popupInfo?.hospitalInfo.city},${popupInfo?.hospitalInfo.state}`}
              sx={{
                "& .MuiChip-icon": {
                  color: markerColor,
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
              image={popupInfo.hospitalInfo.hospitalPictures[0]}
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
            <CustomAvatar src="/path/to/profile1.jpg" />
            <CustomAvatar src="/path/to/profile2.jpg" />+
          </Box>
        </Typography>
        <Stack
          direction="row"
          marginTop={'8px'}
          gap={1}>
          <ActionButton
            sx={{
              height: "26px",
              borderRadius: "10px",
              fontSize: "10px"
            }}
            onClick={(evt: any) => { evt.stopPropagation(); alert('learn more') }}
          >
            Learn more
          </ActionButton>
          <ActionButton
            disabled={!isOpen}
            sx={{
              height: "26px",
              borderRadius: "10px",
              fontSize: "10px"
            }}
            onClick={(evt: any) => { evt.stopPropagation(); alert('donate') }}
          >
            Donate
          </ActionButton>
        </Stack>
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
