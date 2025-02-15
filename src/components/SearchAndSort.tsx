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
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { ChangeEvent, useContext, useState } from "react";
import GamesForLoveLogo from "../assets/games-for-love-logo.png";

import FilterDialog from "./FilterDialog";

import { FilterContext } from "../context/FilterContext";
import { HospitalsContext } from "../context/HospitalContext";
import { hospitalService } from "../services/hospital/hospitalService";
import ToolbarButton from "../styles/ToolbarButton";
import { sortDirection } from "../types/fillterType";
import { GeneralDonationContext } from "../context/GeneralDonationContext";

export const SearchAndSort = () => {
  const [showFilters, setShowFilters] = useState(false);

  const { originals, hospitals, setHospitals } = useContext(HospitalsContext);
  const { filters, setFilters } = useContext(FilterContext);
  const [isDisabled, setIsDisabled] = useState(false);

  const { setDonateOverlayOpen } = useContext(GeneralDonationContext);

  const handleDonateClick = () => {
    setDonateOverlayOpen(true);
  };

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
    <>
      <Box
        data-testid="search-and-sort-box"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          margin: "20px 5px 0px 5px ",
        }}
      >
        <a href="https://gamesforlove.org">
          <img
            src={GamesForLoveLogo}
            alt="Games For Love Logo"
            width={96}
            height={40}
          />
        </a>

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
        <ToolbarButton onClick={handleOpenFilters}>
          <FilterListIcon />
        </ToolbarButton>
        <ToolbarButton
          onClick={handelOrderButton}
          disabled={
            isDisabled || filters.sortDirection === sortDirection.UNDEFINED
          }
        >
          {filters.sortDirection === sortDirection.DESCENDING ? (
            <ArrowDownwardIcon />
          ) : (
            <ArrowUpwardIcon />
          )}
        </ToolbarButton>
        <ToolbarButton
          sx={{
            outline: "1px solid",
          }}
          onClick={handleDonateClick}
        >
          Donate
        </ToolbarButton>
      </Box>
      <FilterDialog open={showFilters} handleClose={handleCloseFilters} />
    </>
  );
};
