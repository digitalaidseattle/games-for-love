/**
 *  SearchAndSort.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { ChangeEvent, useContext, useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Button,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import FilterListIcon from "@mui/icons-material/FilterList";

import FilterDialog from "./FilterDialog";

import { HospitalsContext } from "../context/HospitalContext";
import { hospitalService } from "../services/hospital/hospitalService";
import { FilterContext } from "../context/FilterContext";
import { sortDirection } from "../types/fillterType";

export const SearchAndSort = () => {
  const [showFilters, setShowFilters] = useState(false);
  const { originals, setHospitals } = useContext(HospitalsContext);
  const { filters, setOriginalFilters } = useContext(FilterContext);
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
    if (filters.sortDirection === sortDirection.DESCENDING) {
      setOriginalFilters({
        ...filters,
        sortDirection: sortDirection.ASCENDING,
      });
    } else {
      setOriginalFilters({
        ...filters,
        sortDirection: sortDirection.DESCENDING,
      });
    }
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
            backgroundColor: "#ededed",
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
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            border: "1px solid #d9d9d9",
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
            color: "#000",
            textTransform: "capitalize",
            padding: "0px",
            margin: "0px",
            width: "40px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "12px",
            border: "1px solid #d9d9d9",
            backgroundColor: "white",
            "&:hover": {
              border: "1px solid #d9d9d9",
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
