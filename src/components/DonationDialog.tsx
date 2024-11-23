/**
 *  DonationDialog.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Stack
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext, useState } from "react";
import { DonationHospitalContext } from "../context/SelectedHospitalContext";
import ActionButton from "../styles/ActionButton";
import DialogCloseButton from "../styles/DialogCloseButton";
import EmphasizedText from "../styles/EmphasizedText";

const CustomDialog = styled(Dialog)(() => ({
  "& .MuiDialog-paper": {
    width: "400px",
    maxWidth: "none",
    margin: "auto",
    borderRadius: "15px",
  },
}));

const DonationDialog = () => {
  const { hospital: donationHospital, setHospital: setDonationHospital } = useContext(DonationHospitalContext);
  const [amounts] = useState<string[]>(['$200', '$130', '$55', '$35', '$10', '$5']);

  const handleDonate = () => {
    alert('Donate action')
    handleClose();
  };

  const handleClose = (): void => {
    setDonationHospital(undefined)
  }

  const Frequency = () => {
    return (
      <Stack id='freq' direction='row' spacing="1rem" >
        <Button sx={{ width: '50%' }} variant="outlined">Give once</Button>
        <Button sx={{ width: '50%' }} variant="outlined">Monthly</Button>
      </Stack>
    )
  }

  const Amounts = () => {
    return (
      <Stack sx={{ gap: 1 }}>
        <Stack direction={'row'} sx={{ justifyContent: 'space-between' }} >
          <Button sx={{ width: '30%' }} variant="outlined">{amounts[0]}</Button>
          <Button sx={{ width: '30%' }} variant="outlined">{amounts[1]}</Button>
          <Button sx={{ width: '30%' }} variant="outlined">{amounts[2]}</Button>
        </Stack>
        <Stack direction={'row'} sx={{ justifyContent: 'space-between' }} >
          <Button sx={{ width: '30%' }} variant="outlined">{amounts[3]}</Button>
          <Button sx={{ width: '30%' }} variant="outlined">{amounts[4]}</Button>
          <Button sx={{ width: '30%' }} variant="outlined">{amounts[5]}</Button>
        </Stack>
      </Stack>
    )
  }

  const AmountInput = () => {
    const [currency] = useState<string>("$")
    return (
      <Stack sx={{ width: '100%' }}>
        <FormControl sx={{ m: 1, width: '100%', marginLeft: 0 }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-password"
            type={'text'}
            size='small'
            sx={{ textAlign: 'right' }}
            startAdornment={<InputAdornment position="start">{currency}</InputAdornment>}
            endAdornment={
              <InputAdornment position="end">
                <Button onClick={() => alert('show menu')}>USD</Button>
              </InputAdornment>
            }
          />
        </FormControl>
      </Stack>
    )
  }

  const Allocations = () => {
    const [hospital] = useState<string>("St. Charles")
    const [hospitalPercent] = useState<number>(100)
    const [generalPercent] = useState<number>(100)

    return (
      <Stack sx={{ gap: 1 }}>
        <EmphasizedText>I would like to send my donation to:</EmphasizedText>
        <FormControl sx={{ m: 1, width: '100%', marginLeft: 0 }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-password"
            type={'number'}
            size="small"
            sx={{ textAlign: 'right' }}
            inputProps={{ style: { textAlign: 'right' } }}
            startAdornment={<InputAdornment position="start">{hospital}</InputAdornment>}
            endAdornment={
              <InputAdornment position="end">%</InputAdornment>
            }
            value={hospitalPercent}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '100%', marginLeft: 0 }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-password"
            type={'number'}
            size="small"
            sx={{ textAlign: 'right' }}
            startAdornment={<InputAdornment position="start">GeneralFund</InputAdornment>}
            inputProps={{ style: { textAlign: 'right' } }}
            endAdornment={
              <InputAdornment position="end">%</InputAdornment>
            }
            value={generalPercent}
          />
        </FormControl>
      </Stack>
    )
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
        <Stack gap={2}>
          <Frequency />
          <Amounts />
          <AmountInput />
          <Allocations />
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
