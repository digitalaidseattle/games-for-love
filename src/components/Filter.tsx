import { ChangeEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Typography,
  TextField,
  Chip,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  DialogActions,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FilterType } from "../types/fillterType";
import { styled } from "@mui/material/styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { InputAdornment } from "@mui/material";

const BootstrapDialog = styled(Dialog)(() => ({
  "& .MuiDialog-paper": {
    width: "400px",
    height: "480px",
    maxWidth: "none",
    margin: "auto",
    borderRadius: "15px",
  },
}));

interface FilterProps {
  open: boolean;
  handleClose: () => void;
  applyFilters: (filterValues: FilterType) => void;
}

const Filter: React.FC<FilterProps> = ({ open, handleClose, applyFilters }) => {
  const [locationValue, setLocationValue] = useState<string>("");
  const [locationChips, setLocationChips] = useState<string[]>([]);
  const [status, setStatus] = useState({
    active: false,
    past: false,
    all: false,
  });
  const [filterValues, setFilterValues] = useState<FilterType>({
    location: [],
    status: [],
  });
  const [checkedStatus, setCheckedStatus] = useState<string[]>([]);

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

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "all") {
      setStatus({
        active: e.target.checked,
        past: e.target.checked,
        [e.target.name]: e.target.checked,
      });
    } else {
      setStatus({ ...status, [e.target.name]: e.target.checked });
    }
  };

  const handleApplyFilters = () => {
    applyFilters(filterValues);
    handleClose();
  };

  useEffect(() => {
    const updatedCheckedStatus = Object.keys(status).filter(
      (key) => key !== "all" && status[key as keyof typeof status]
    );
    setCheckedStatus(updatedCheckedStatus);
  }, [status]);

  useEffect(() => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      location: locationChips.map((chip) => chip.toLowerCase()),
      status: checkedStatus.map((status) => status.toLowerCase()),
    }));
  }, [locationChips, checkedStatus]);

  return (
    <BootstrapDialog
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
      <DialogContent sx={{}}>
        <Box sx={{ mt: 2, mb: 0.8 }}>
          <Typography
            // variant="h6"
            sx={{ fontSize: "20px", color: "#000", fontWeight: "bold" }}
          >
            Location
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder=" City, state, or zip code"
            onChange={(e) => setLocationValue(e.target.value)}
            sx={{
              mt: 0,
              p: 0,
              "& .MuiInputBase-root": {
                backgroundColor: "#ededed",
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
              onDelete={() => handleDeleteChip(chip)}
              sx={{
                m: 0.3,
                backgroundColor: "#000",
                color: "#fff",
                ".MuiChip-deleteIcon": {
                  color: "#fff",
                },
              }}
            />
          ))}
        </Box>

        <FormControl>
          <FormLabel
            component="legend"
            sx={{
              fontSize: "20px",
              color: "#000",
              fontWeight: "bold",
              "&.Mui-focused": {
                color: "#000",
              },
            }}
          >
            Status
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name="active"
                  checked={status.active}
                  onChange={handleCheckbox}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      color: "#000",
                      "&.Mui-checked": {
                        color: "#000",
                      },
                      "&.Mui-focusVisible": {
                        outline: "2px solid #000",
                      },
                    },
                  }}
                />
              }
              label="Active"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="past"
                  checked={status.past}
                  onChange={handleCheckbox}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      color: "#000",
                      "&.Mui-focusVisible": {
                        outline: "2px solid #000",
                      },
                      "&.Mui-checked": {
                        color: "#000",
                      },
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    },
                  }}
                />
              }
              label="Past"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="all"
                  checked={status.all}
                  onChange={handleCheckbox}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      color: "#000",
                      "&.Mui-checked": {
                        color: "#000",
                      },
                      "&.Mui-focusVisible": {
                        outline: "2px solid #000",
                      },
                    },
                  }}
                />
              }
              label="All"
            />
          </FormGroup>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ mt: 3, mb: 2 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleApplyFilters}
          sx={{
            width: "50%",
            margin: "0 auto",
            backgroundColor: "#000",
            borderRadius: "15px",
            textTransform: "capitalize",
            "&:hover": {
              backgroundColor: "transparent",
              color: "#000",
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
          Apply filters
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default Filter;
