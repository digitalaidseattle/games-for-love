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

  // Hide map controls on mobile
  "& .maplibregl-ctrl": {
    display: "none",
  },
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

// WebGL banner styles
export const webglBannerContainer: SxProps<Theme> = {
  position: "absolute",
  inset: 0,                
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",     
  p: 3,                     
  pointerEvents: "none",    
  boxSizing: "border-box",
};

export const webglCardBlack: SxProps<Theme> = {
  width: "min(720px, 92vw)",
  maxWidth: "min(720px, calc(100% - 24px))", 
  borderRadius: 4,
  px: 1.5,
  py: 1.5,
  bgcolor: "#0B0B0E",
  color: "#FFFFFF",
  boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
  pointerEvents: "auto",
};

export const webglCardGrey: SxProps<Theme> = {
  width: "min(720px, 92vw)",
  maxWidth: "min(720px, calc(100% - 24px))", 
  borderRadius: 4,
  px: 1.5,
  py: 1.5,
  bgcolor: "#A7A7A7",
  color: "#111",
  boxShadow: "0 10px 26px rgba(0,0,0,0.18)",
  pointerEvents: "auto", 
};

export const webglIconDotRed: SxProps<Theme> = {
  width: 20,              
  height: 20,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: "#E5484D",
  flexShrink: 0,
};

export const webglIconOnDot: SxProps<Theme> = {
  fontSize: 25,
  lineHeight: 1,
  display: "block",
  color: "#FFFFFF",
};
export const webglTitleWhite: SxProps<Theme> = {
  fontSize: 22,
  fontWeight: 800,
  lineHeight: 1.15,
};

export const webglBodyWhite: SxProps<Theme> = {
  mt: 0.75,
  fontSize: 14,
  lineHeight: 1.55,
  color: "rgba(255,255,255,0.8)",
};

export const webglTitleDark: SxProps<Theme> = {
  fontSize: 20,
  fontWeight: 800,
  lineHeight: 1.15,
  color: "rgba(0,0,0,0.85)",
};

export const webglBodyDark: SxProps<Theme> = {
  mt: 0.75,
  fontSize: 14,
  lineHeight: 1.55,
  color: "rgba(0,0,0,0.78)",
};

export const webglMutedDark: SxProps<Theme> = {
  fontSize: 13,
  color: "rgba(0,0,0,0.65)",
};

export const webglEmphasisDark: SxProps<Theme> = {
  fontWeight: 800,
  color: "rgba(0,0,0,0.85)",
};

export const webglPrimaryBtn = (theme: Theme) => ({
  borderRadius: 2,
  textTransform: "none",
  fontWeight: 800,
  px: 3,
  bgcolor: theme.palette.primary.main, 
  "&:hover": { bgcolor: theme.palette.primary.dark },
});

export const webglSecondaryBtn: SxProps<Theme> = {
  borderRadius: 2,
  textTransform: "none",
  fontWeight: 700,
  px: 3,
  bgcolor: "rgba(255,255,255,0.12)", 
  color: "rgba(255,255,255,0.9)",
  boxShadow: "none",
  "&:hover": { bgcolor: "rgba(255,255,255,0.18)" },
};

export const webglCodePillGrey: SxProps<Theme> = {
  fontSize: 13,
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  bgcolor: "rgba(255,255,255,0.25)",
  color: "rgba(0,0,0,0.8)",
  px: 1,
  py: 0.4,
  borderRadius: 1.5,
};

export const webglCopyIconBtnGrey: SxProps<Theme> = {
  color: "rgba(0,0,0,0.75)",
  bgcolor: "rgba(255,255,255,0.18)",
  "&:hover": { bgcolor: "rgba(255,255,255,0.26)" },
};

