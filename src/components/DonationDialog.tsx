/**
 *  DonationDialog.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import { DonationHospitalContext } from "../context/SelectedHospitalContext";
import ActionButton from "../styles/ActionButton";
import DialogCloseButton from "../styles/DialogCloseButton";

const CustomDialog = styled(Dialog)(() => ({
  "& .MuiDialog-paper": {
    width: "400px",
    height: "480px",
    maxWidth: "none",
    margin: "auto",
    borderRadius: "15px",
  },
}));

const DonationDialog = () => {
  const { hospital: donationHospital, setHospital: setDonationHospital } = useContext(DonationHospitalContext);

  const handleDonate = () => {
    alert('Donate action')
    handleClose();
  };

  const handleClose = (): void => {
    setDonationHospital(undefined)
  }

  return (
    <CustomDialog
      onClose={handleClose}
      open={donationHospital !== undefined}
      aria-labelledby="donation-dialog"
    >
      <DialogTitle
        sx={{ m: 0, p: 2, pl: 3, pb: 0, fontSize: 24 }}
        id="dialog-title"
      >
        Donations
      </DialogTitle>
      <DialogCloseButton onClick={handleClose} />
      <DialogContent sx={{}}>
        <Stack>
          <Typography>Frequency</Typography>
          <Typography>Amount Choices</Typography>
          <Typography>Amount Input</Typography>
          <Typography>Donation allocation</Typography>
        </Stack>
      </DialogContent>
      <Divider sx={{ borderBottomWidth: 2.2 }} />
      <DialogActions sx={{ margin: 1 }} >
        <ActionButton onClick={handleDonate}>
          Donate and Support
        </ActionButton>
      </DialogActions>
    </CustomDialog>
  );
};

export default DonationDialog;
