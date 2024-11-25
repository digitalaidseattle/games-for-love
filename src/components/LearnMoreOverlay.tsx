/**
 *  LearnMoreOverlay.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import {
  AppBar,
  Backdrop,
  Box,
  Button,
  Container,
  Toolbar,
  useTheme,
} from "@mui/material";
import { useContext } from "react";
import { LearnMoreHospitalContext } from "../context/SelectedHospitalContext";
import DialogCloseButton from "../styles/DialogCloseButton";
import GamesForLoveLogo from "../assets/488c5a7cd5735fe0aa7ca0e7a31867e1.png";
import HospitalDetailsPageModal from "./HospitalPage/HospitalDetailsPageModal";

const LearnMoreContent = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        margin: 0,
        overflow: "auto",
        height: "100%",
      }}
    >
      <AppBar
        position="static"
        sx={{
          background: "#fff",
          color: "#000",
          minHeight: "100px",
          display: "flex",
          justifyContent: "center",
        }}
        elevation={0}
      >
        <Toolbar>
          {/* Logo / Title Image */}
          <Box sx={{ flexGrow: 1 }}>
            <img
              src={GamesForLoveLogo}
              alt="Games For Love Logo"
              width={120}
              height={50}
              style={{ marginRight: "10px" }}
            />
          </Box>

          {/* Desktop Navigation Buttons */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button color="inherit">Page</Button>
            <Button color="inherit">Page</Button>
            <Button color="inherit">Page</Button>
            <Button
              sx={{ color: "#4A24E7", outline: "1px solid #4A24E7" }}
              variant="outlined"
            >
              Donate
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <HospitalDetailsPageModal />
    </Container>
  );
};

const LearnMoreOverlay = () => {
  const theme = useTheme();
  const { hospital, setHospital } = useContext(LearnMoreHospitalContext);

  const handleClose = (): void => {
    setHospital(undefined);
  };

  return (
    hospital && (
      <Backdrop
        sx={(theme) => ({
          zIndex: theme.zIndex.drawer + 1,
          background: "#fff",
          overflowY: "auto",
          display: "block",
        })}
        open={hospital !== undefined}
      >
        <DialogCloseButton
          onClick={handleClose}
          sx={{ color: theme.palette.primary.main }}
        />
        <Box sx={{ width: "100%" }}>
          <LearnMoreContent />
        </Box>
      </Backdrop>
    )
  );
};

export default LearnMoreOverlay;
