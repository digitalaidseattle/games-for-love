import { ChangeEvent, useContext, useEffect, useState } from "react";
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
  RadioGroup,
  Radio,
  FormControlLabel,
  DialogActions,
  Button,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { InputAdornment } from "@mui/material";
import { hospitalInfoService } from "../services/hospitalInfo/hospitalInfoService";
import { HospitalsContext } from "../context/HospitalsContext";
import { FilterContext } from "../context/FilterContext";
import { DialogProps } from "../types/dialogProps";

const CustomDialog = styled(Dialog)(() => ({
  "& .MuiDialog-paper": {
    width: "400px",
    height: "730px",
    maxWidth: "none",
    margin: "auto",
    borderRadius: "15px",
  },
}));

const FilterDialog: React.FC<DialogProps> = ({ open, handleClose }) => {
  const { setOriginals } = useContext(HospitalsContext);
  const { setOriginalFilters, filters } = useContext(FilterContext);
  const [locationValue, setLocationValue] = useState<string>("");
  const [locationChips, setLocationChips] = useState<string[]>(
    filters.location
  );

  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState("fundingDeadline");

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

  const handleSortbyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSortBy(e.target.value);
  };

  const handleApplyFilters = () => {
    if (filters.location.length === 0 && filters.status.length === 0) {
      hospitalInfoService.getHospitalInfo().then((res) => setOriginals(res));
    } else {
      hospitalInfoService
        .getHospitalInfo(filters)
        .then((res) => setOriginals(res));
    }
    handleClose();
  };

  const handleClearAll = () => {
    setLocationChips([]), setLocationValue("");
    setStatus("all");
    setOriginalFilters({
      location: [],
      status: [],
    });
    hospitalInfoService.getHospitalInfo().then((res) => setOriginals(res));
  };

  useEffect(() => {
    setOriginalFilters({
      location: locationChips.map((chip) => chip.toLowerCase()),
      status: [status],
    });
  }, [locationChips, status]);

  useEffect(() => {
    setStatus(
      filters.status.includes("active")
        ? "active"
        : filters.status.includes("past")
        ? "past"
        : "all"
    );
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
            sx={{ fontSize: "20px", color: "#000", fontWeight: "bold" }}
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
          <RadioGroup
            value={status}
            onChange={handleStatusChange}
            aria-label="status"
          >
            <FormControlLabel
              value="all"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      color: "#000",
                    },
                  }}
                />
              }
              label="All"
            />
            <FormControlLabel
              value="active"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      color: "#000",
                    },
                  }}
                />
              }
              label="Active"
            />
            <FormControlLabel
              value="past"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      color: "#000",
                    },
                  }}
                />
              }
              label="Past"
            />
          </RadioGroup>
        </FormControl>

        <FormControl sx={{ mt: 4 }}>
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
            Sort by
          </FormLabel>
          <RadioGroup
            value={sortBy}
            onChange={handleSortbyChange}
            aria-label="status"
          >
            <FormControlLabel
              value="fundingDeadline"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      color: "#000",
                    },
                  }}
                />
              }
              label="Funding deadline"
            />
            <FormControlLabel
              value="sortingFundingLevelHighToLow"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      color: "#000",
                    },
                  }}
                />
              }
              label="Sorting funding level high to low"
            />
            <FormControlLabel
              value="hospitalName"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      color: "#000",
                    },
                  }}
                />
              }
              label="Hospital name"
            />
          </RadioGroup>
        </FormControl>
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
            color: "#000",
            textTransform: "none",
            fontWeight: "bold",
            border: "none",
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
          Clear all
        </Button>

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
          Apply
        </Button>
      </DialogActions>
    </CustomDialog>
  );
};

export default FilterDialog;
