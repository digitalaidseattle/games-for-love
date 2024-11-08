/**
 *  FilterDialog.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
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
import { FilterContext } from "../context/FilterContext";
import { DialogProps } from "../types/dialogProps";
import ActionButton from "../styles/ActionButton";
import { hospitalService } from "../services/hospital/hospitalService";
import { HospitalsContext } from "../context/HospitalContext";
import { FilterType, sortDirection } from "../types/fillterType";

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
  const { filters, clearFilters, setOriginalFilters } =
    useContext(FilterContext);
  const [locationValue, setLocationValue] = useState<string>("");
  const [locationChips, setLocationChips] = useState<string[]>(
    filters.location
  );

  const [status, setStatus] = useState("all");

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
    setOriginalFilters({ ...filters, sortBy: e.target.value });
  };

  const handleApplyFilters = async () => {
    setOriginalFilters({ ...filters, sortDirection: sortDirection.ASCENDING });
    handleClose();
  };

  const handleClearAll = async () => {
    setLocationChips([]), setLocationValue("");
    setStatus("all");
    clearFilters();
    const hospitals =
      await hospitalService.combineHospitalInfoAndRequestAndFunded();
    setOriginals(hospitals);
  };

  useEffect(() => {
    const oldFilter: FilterType = {
      location: locationChips.map((chip) => chip.toLowerCase()),
      status: [status],
      sortBy: filters.sortBy,
      sortDirection: sortDirection.UNDEFINED,
    };
    const newFilter =
      status === "all"
        ? { ...oldFilter, status: ["active", "past"] }
        : oldFilter;

    setOriginalFilters(newFilter);
  }, [status, filters.sortBy, locationChips]);

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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
              Sort by
            </FormLabel>
            <RadioGroup
              value={filters.sortBy}
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
                value="fundingLevel"
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        color: "#000",
                      },
                    }}
                  />
                }
                label="Funding level"
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
