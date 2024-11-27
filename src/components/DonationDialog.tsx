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
  MenuItem,
  OutlinedInput,
  Select,
  Stack
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import { DonationHospitalContext } from "../context/SelectedHospitalContext";
import ActionButton from "../styles/ActionButton";
import DialogCloseButton from "../styles/DialogCloseButton";
import EmphasizedText from "../styles/EmphasizedText";
import { CURRENCIES, Currency, donationService } from "../services/donationService";

const CustomDialog = styled(Dialog)(() => ({
  "& .MuiDialog-paper": {
    width: "400px",
    maxWidth: "none",
    margin: "auto",
    borderRadius: "15px",
  },
}));

const DonationDialog = () => {
  const baseAmounts = [200, 130, 55, 35, 10, 5];
  const { hospital, setHospital } = useContext(DonationHospitalContext);
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('monthly');
  const [amounts, setAmmounts] = useState<string[]>(['$200', '$130', '$55', '$35', '$10', '$5']);
  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0]);
  const [amount, setAmount] = useState<number>(baseAmounts[0]);
  const [showCurrencies, setShowCurrencies] = useState<boolean>(false);
  const [hospitalPercent, setHospitalPercent] = useState<number>(100)
  const [generalPercent, setGeneralPercent] = useState<number>(0)

  useEffect(() => {
    if (currency) {
      setAmmounts(baseAmounts.map(amt => currency.label + donationService.convert(amt, currency)))
    }
  }, [currency]);

  const handleDonate = () => {
    donationService.donate({
      hospital: hospital!,
      frequency: frequency,
      amount: amount,
      currency: currency,
      hospitalPercent: hospitalPercent,
      generalPercent: generalPercent
    });
    handleClose();
  };

  const handleClose = (): void => {
    // Consider clearing all values
    setHospital(undefined)
  }

  const Frequency = () => {
    return (
      <Stack id='freq' direction='row' spacing="1rem" >
        <Button sx={{ width: '50%' }}
          variant={frequency === 'once' ? "contained" : "outlined"}
          onClick={() => setFrequency('once')}>Give once</Button>
        <Button sx={{ width: '50%' }}
          variant={frequency === 'monthly' ? "contained" : "outlined"}
          onClick={() => setFrequency('monthly')}>Monthly</Button>
      </Stack>
    )
  }

  const Amounts = () => {
    return (
      <Stack sx={{ gap: 1 }}>
        <Stack direction={'row'} sx={{ justifyContent: 'space-between' }} >
          <Button sx={{ width: '30%' }} variant="outlined"
            onClick={() => setAmount(baseAmounts[0])}
          >{amounts[0]}</Button>
          <Button sx={{ width: '30%' }} variant="outlined"
            onClick={() => setAmount(baseAmounts[1])}
          >{amounts[1]}</Button>
          <Button sx={{ width: '30%' }} variant="outlined"
            onClick={() => setAmount(baseAmounts[2])}
          >{amounts[2]}</Button>
        </Stack>
        <Stack direction={'row'} sx={{ justifyContent: 'space-between' }} >
          <Button sx={{ width: '30%' }} variant="outlined"
            onClick={() => setAmount(baseAmounts[3])}
          >{amounts[3]}</Button>
          <Button sx={{ width: '30%' }} variant="outlined"
            onClick={() => setAmount(baseAmounts[4])}
          >{amounts[4]}</Button>
          <Button sx={{ width: '30%' }} variant="outlined"
            onClick={() => setAmount(baseAmounts[5])}
          >{amounts[5]}</Button>
        </Stack>
      </Stack>
    )
  }

  const AmountInput = () => {

    const changeCurrency = (value: string): void => {
      setCurrency(CURRENCIES.find(cur => cur.value === value)!);
      setShowCurrencies(false)
    }

    return (
      <Stack sx={{ width: '100%' }}>
        <FormControl sx={{ m: 1, width: '100%', marginLeft: 0 }} variant="outlined">
          {!showCurrencies &&
            <OutlinedInput
              id="outlined-adornment-password"
              type={'text'}
              size='small'
              sx={{ textAlign: 'right' }}
              startAdornment={<InputAdornment position="start">{currency.label}</InputAdornment>}
              value={donationService.convert(amount, currency)}
              endAdornment={
                <InputAdornment position="end">
                  <Button variant='outlined' onClick={() => setShowCurrencies(true)}>{currency.value}</Button>
                </InputAdornment>
              }
            />
          }
          {showCurrencies &&
            <Select
              id="outlined-select-currency"
              size='small'
              defaultValue={currency.value}
              open={showCurrencies}
              onChange={(evt) => changeCurrency(evt.target.value)}
              onClose={() => setShowCurrencies(false)}
            >
              {CURRENCIES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          }
        </FormControl>
      </Stack>
    )
  }

  const Allocations = () => {

    const changeHospital = (value: string): void => {
      const newValue = Math.min(100, Math.max(0, Number(value)));
      setHospitalPercent(newValue);
      setGeneralPercent(100 - newValue);
    }

    return (
      <Stack sx={{ gap: 0.5 }}>
        <EmphasizedText textAlign='center'>I would like to send my donation to:</EmphasizedText>
        <FormControl sx={{ m: 1, width: '100%', marginLeft: 0 }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-password"
            type={'number'}
            size="small"
            sx={{ textAlign: 'right' }}
            inputProps={{ style: { textAlign: 'right' } }}
            startAdornment={<InputAdornment position="start">{hospital?.name}</InputAdornment>}
            endAdornment={
              <InputAdornment position="end">%</InputAdornment>
            }
            value={hospitalPercent}
            onChange={(evt) => changeHospital(evt.target.value)}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '100%', marginLeft: 0 }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-password"
            type={'number'}
            size="small"
            sx={{ textAlign: 'right' }}
            startAdornment={<InputAdornment position="start">General Fund</InputAdornment>}
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
      open={hospital !== undefined}
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
