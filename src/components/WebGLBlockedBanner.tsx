import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import React from "react";
import * as styles from "../AppStyles";

export function WebGLBlockedBanner({
  isMobileView,
}: {
  isMobileView: boolean;
}) {
  const [showFix, setShowFix] = React.useState(false);

  const isChrome =
    /Chrome/.test(navigator.userAgent) && !/Edg|OPR|Brave/.test(navigator.userAgent);

  const chromeSettingsPath = "chrome://settings/system";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(chromeSettingsPath);
    } catch {}
  };

  return (
    <Box sx={styles.webglBannerContainer}>
      <Stack spacing={2} sx={{ width: "100%" }}>

        {/* Map is unavailable card */}
        <Card sx={styles.webglCardBlack} elevation={0}>
          <CardHeader
            avatar={
              <Box sx={styles.webglIconDotRed}>
                <ErrorOutlineRoundedIcon sx={styles.webglIconOnDot} />
              </Box>
            }
            title="Map unavailable"
            titleTypographyProps={{
              sx: styles.webglTitleWhite,
            }}
          />

          <CardContent sx={{ pt: 0 }}>
            <Typography sx={styles.webglBodyWhite}>
              We couldn’t load it in this browser. Try refreshing the page or
              opening this page in another browser.
            </Typography>

            <Stack direction="row" spacing={1.25} sx={{ mt: 2 }} flexWrap="wrap">
              <Button
                onClick={() => window.location.reload()}
                variant="contained"
                sx={styles.webglPrimaryBtn}
              >
                Retry
              </Button>

              {!isMobileView && (
                <Button
                  onClick={() => setShowFix((v) => !v)}
                  variant="contained"
                  disableElevation
                  sx={styles.webglSecondaryBtn}
                >
                  {showFix ? "Hide fix" : "Learn how to fix it"}
                </Button>
              )}
            </Stack>
          </CardContent>
        </Card>

        {/* Learn how to fix it card */}
        {!isMobileView && showFix && (
          <Card sx={styles.webglCardGrey} elevation={0}>
            <CardHeader
              avatar={
                <Box sx={styles.webglIconDotRed}>
                  <ErrorOutlineRoundedIcon sx={styles.webglIconOnDot} />
                </Box>
              }
              title="Map can’t load (WebGL disabled)"
              titleTypographyProps={{
                sx: styles.webglTitleDark,
              }}
            />

            <CardContent sx={{ pt: 0 }}>
              <Typography sx={styles.webglBodyDark}>
                This site needs WebGL (GPU acceleration).
              </Typography>

              {isChrome ? (
                <>
                  <Typography sx={{ ...styles.webglBodyDark, mt: 1 }}>
                    In Chrome, enable{" "}
                    <Box component="span" sx={styles.webglEmphasisDark}>
                      “Use graphic acceleration”
                    </Box>{" "}
                    when available and restart Chrome.
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    flexWrap="wrap"
                    sx={{ mt: 1.25 }}
                  >
                    <Typography sx={styles.webglMutedDark}>Open:</Typography>

                    <Typography sx={styles.webglCodePillGrey}>
                      chrome://settings/?search=accel
                    </Typography>

                    <IconButton
                      onClick={handleCopy}
                      size="small"
                      sx={styles.webglCopyIconBtnGrey}
                    >
                      <ContentCopyRoundedIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </>
              ) : (
                <Typography sx={{ ...styles.webglBodyDark, mt: 1 }}>
                  Enable hardware acceleration / WebGL in your browser settings
                  and restart the browser.
                </Typography>
              )}

              <Button
                onClick={() => window.location.reload()}
                variant="contained"
                sx={[styles.webglPrimaryBtn, { mt: 2 }]}
              >
                Retry
              </Button>
            </CardContent>
          </Card>
        )}
      </Stack>
    </Box>
  );
}
