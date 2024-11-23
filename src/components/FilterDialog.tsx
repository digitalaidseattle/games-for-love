/**
 *  FilterDialog.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { FilterContext } from "../context/FilterContext";
import { HospitalsContext } from "../context/HospitalContext";
import { hospitalService } from "../services/hospital/hospitalService";
import ActionButton from "../styles/ActionButton";
import { DialogProps } from "../types/dialogProps";

const RadioOption = (props: { label: string, value: string }) => {
  return (
    <FormControlLabel
      value={props.value}
      control={
        <Radio />
      }
      label={props.label}
    />);
}

const CustomDialog = styled(Dialog)(() => ({
  "& .MuiDialog-paper": {
    width: "400px",
    maxWidth: "none",
    margin: "auto",
    borderRadius: "15px",
  },
}));

const FilterDialog: React.FC<DialogProps> = ({ open, handleClose }) => {

  const { setOriginals } = useContext(HospitalsContext);
  const { filters, setFilters } = useContext(FilterContext);
  const [locationValue, setLocationValue] = useState<string>("");
  const [locationChips, setLocationChips] = useState<string[]>(filters.location);
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState("hospitalName");

  useEffect(() => {
    if (filters) {
      setLocationChips(filters.location);
      setSortBy(filters.sortBy)
      setStatus(filters.status.length === 2 ? "all" : filters.status.length === 1 ? filters.status[0] : "hospitalName");
    }
  }, [filters]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && locationValue.trim() !== "") {
      setLocationChips((prevChips) => [...prevChips, locationValue.trim()]);
      setLocationValue("");
    }
  };

  const handleDeleteChip = (chipToDelete: string) => {
    setLocationChips((prevChips) =>
      prevChips.filter((chip) => chip !== chipToDelete)
    );
  };

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
  };

  const handleSortByChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSortBy(e.target.value);
  };

  const handleApplyFilters = async () => {
    const updated = Object.assign(filters, {
      sortBy: sortBy,
      location: locationChips,
      status: status === 'all' ? ["active", "past"] : [status]
    });
    hospitalService.findAll(updated)
      .then(hospitals => {
        setOriginals(hospitals)
        setFilters(updated);
        handleClose();
      })
  };

  const handleClearAll = async () => {
    setSortBy("fundingDeadline");
    setLocationChips([]);
    setStatus("all");
  };

  useEffect(() => {
    let initialStatus;
    if (
      filters.status.length === 2 ||
      (!filters.status.includes("active") && !filters.status.includes("past"))
    ) {
      initialStatus = "all";
    } else {
      initialStatus = filters.status[0];
    }
    setStatus(initialStatus);
  }, []);

  return (
    <CustomDialog
      onClose={handleClose}
      open={open}
      aria-labelledby="filter-hospital-dialog"
    >
      <DialogTitle
        sx={{ m: 0, p: 2, pl: 3, pb: 0, fontSize: 24 }}
        id="dialog-title"
      >
        Filters
      </DialogTitle>
      <IconButton
        onClick={handleClose}
        aria-label="close"
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Box sx={{ mt: 2, mb: 0.8 }}>
          <Typography
            sx={{ fontSize: "20px", fontWeight: "bold" }}
          >
            Location
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="City, state, or zip code"
            onChange={(e) => setLocationValue(e.target.value)}
            sx={{
              mt: 0,
              p: 0,
              "& .MuiInputBase-root": {
                backgroundColor: (theme) => theme.palette.grey[200],
                borderRadius: "10px",
                height: "36px",
                marginLeft: "0px",
              },
              "& .MuiInputAdornment-root": {
                margin: 0,
                padding: 0,
              },
              "& .MuiOutlinedInput-input": {
                padding: "0px",
                margin: "0px",
              },
              "& fieldset": {
                border: "none",
              },
            }}
            value={locationValue}
            onKeyDown={handleKeyDown}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box sx={{ mb: 4 }}>
          {locationChips.map((chip, index) => (
            <Chip
              label={chip}
              key={index}
              color="primary"
              onDelete={() => handleDeleteChip(chip)}
              sx={{
                m: 0.3,
              }}
            />
          ))}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormControl>
            <FormLabel
              component="legend"
              sx={{
                fontSize: "20px",
                fontWeight: "bold",
                "&.Mui-focused": {
                  color: "text.primary",
                },
              }}
            >
              Status
            </FormLabel>
            <RadioGroup
              value={status}
              onChange={handleStatusChange}
              aria-label="status"
            >
              <RadioOption value="all" label="All" />
              <RadioOption value="active" label="Active" />
              <RadioOption value="past" label="Past" />
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel
              component="legend"
              sx={{
                fontSize: "20px",
                color: "text.primary",
                fontWeight: "bold",
                "&.Mui-focused": {
                  color: "text.primary",
                },
              }}
            >
              Sort by
            </FormLabel>
            <RadioGroup
              value={sortBy}
              onChange={handleSortByChange}
              aria-label="status"
            >
              <RadioOption value="fundingDeadline" label="Funding deadline" />
              <RadioOption value="fundingLevel" label="Funding level" />
              <RadioOption value="hospitalName" label="Hospital name" />
            </RadioGroup>
          </FormControl>
        </Box>
      </DialogContent>
      <Divider sx={{ borderBottomWidth: 2.2 }} />
      <DialogActions
        sx={{
          mt: 3,
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <Button
          fullWidth
          onClick={handleClearAll}
          sx={{
            width: "20%",
            margin: "0 10px",
            backgroundColor: "transparent",
            color: "text.primary",
            textTransform: "none",
            fontWeight: "bold",
            border: "none",
            "&:hover": {
              backgroundColor: "transparent",
              color: "text.",
            },
            "&:focus": {
              outline: "none",
            },
            "&:active": {
              outline: "none",
              border: "none",
            },
            "&.MuiButton-root": {
              border: "none",
            },
          }}
        >
          Clear all
        </Button>
        <ActionButton
          onClick={handleApplyFilters}
          sx={{
            width: "50%",
          }}
        >
          Apply
        </ActionButton>
      </DialogActions>
    </CustomDialog>
  );
};

export default FilterDialog;
