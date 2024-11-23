/**
 *  SearchAndSort.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Theme
} from "@mui/material";
import { ChangeEvent, useContext, useState } from "react";

import FilterDialog from "./FilterDialog";

import { FilterContext } from "../context/FilterContext";
import { HospitalsContext } from "../context/HospitalContext";
import { hospitalService } from "../services/hospital/hospitalService";
import { sortDirection } from "../types/fillterType";

export const SearchAndSort = () => {
  const [showFilters, setShowFilters] = useState(false);
  const { originals, hospitals, setHospitals } = useContext(HospitalsContext);
  const { filters, setFilters } = useContext(FilterContext);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleOpenFilters = () => {
    setShowFilters(true);
  };

  const handleCloseFilters = () => {
    setShowFilters(false);
  };

  const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    //searching through originals
    setHospitals(hospitalService.filterHospitals(originals, e.target.value));
    if (e.target.value !== "") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };

  const handelOrderButton = () => {
    const updated = {
      ...filters,
      sortDirection:
        filters.sortDirection === sortDirection.DESCENDING
          ? sortDirection.ASCENDING
          : sortDirection.DESCENDING,
    };
    setHospitals(
      hospitals.sort(hospitalService.getSortComparator(updated)).slice()
    );
    setFilters(updated);
  };

  return (
    <Box data-testid="search-and-sort-box">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "20px",
        }}
      >
        <TextField
          placeholder="Search"
          onChange={changeSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            backgroundColor: (theme) => theme.palette.grey[200],
            flex: 1,
            height: "40px",
            border: "none",
            borderRadius: "10px",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiOutlinedInput-root": {
              border: "none",
              borderRadius: "10px",
              height: "40px",
            },
          }}
        />
        <IconButton
          onClick={handleOpenFilters}
          disabled={isDisabled}
          sx={{
            padding: "10px",
            borderRadius: "12px",
            border: (theme: Theme) => "1px solid " + theme.palette.grey[400],
            height: "36px",
            width: "64px",
          }}
        >
          <FilterListIcon />
        </IconButton>

        <Button
          variant="outlined"
          onClick={handelOrderButton}
          disabled={
            isDisabled || filters.sortDirection === sortDirection.UNDEFINED
          }
          sx={{
            color: "black",
            textTransform: "capitalize",
            padding: "0px",
            margin: "0px",
            width: "40px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "12px",
            border: (theme: Theme) => "1px solid " + theme.palette.grey[400],
            backgroundColor: "white",
            "&:hover": {
              border: (theme: Theme) => "1px solid " + theme.palette.grey[400]
            },
          }}
        >
          {filters.sortDirection === sortDirection.DESCENDING ? (
            <ArrowDownwardIcon />
          ) : (
            <ArrowUpwardIcon />
          )}
        </Button>
      </Box>
      {showFilters && (
        <FilterDialog open={showFilters} handleClose={handleCloseFilters} />
      )}
    </Box>
  );
};
