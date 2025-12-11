import { SxProps, Theme } from "@mui/material";

export const hospitalCardBox = (isMobileView: boolean): SxProps<Theme> => ({
  minWidth: isMobileView ? "90vw" : "100%",
  maxWidth: isMobileView ? "90vw" : "100%",
  flexShrink: 0,
  borderRadius: isMobileView ? 3 : 0,
  overflow: "hidden",
  boxShadow: isMobileView ? 4 : "none",
  bgcolor: "background.paper",
});

export const drawerBox = (windowHeight: number): SxProps<Theme> => ({
  height: windowHeight,
  overflowY: "auto",
  overflowX: "hidden",
});

export const mobileRootBox: SxProps<Theme> = {
  position: "relative",
  width: "100%",
  height: "100vh",
  overflow: "hidden",
};

export const mobileMapBox: SxProps<Theme> = {
  position: "absolute",
  inset: 0,
};

export const mobileToolbarWrapperBox: SxProps<Theme> = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1,
  pointerEvents: "none",
};

export const mobileToolbarInnerBox: SxProps<Theme> = {
  pointerEvents: "auto",
};

export const mobileHospitalOverlayBox: SxProps<Theme> = {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  pb: 1,
  pt: 1.5,
  background:
    "linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0.0))",
  pointerEvents: "none",
};

export const mobileHospitalListBox: SxProps<Theme> = {
  pointerEvents: "auto",
  mx: 1.5,
  mb: 0.5,
  borderRadius: 3,
  bgcolor: "transparent",
  display: "flex",
  flexDirection: "row",
  overflowX: "auto",
  gap: 2,
  px: 0.5,
  py: 0.75,
  "&::-webkit-scrollbar": { display: "none" },
  scrollbarWidth: "none",
};

