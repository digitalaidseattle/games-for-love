/**
 *  SearchAndSortDesktop.tsx
 *
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
import ToolbarButton from "../styles/ToolbarButton";

import { FilterContext } from "../context/FilterContext";
import { HospitalsContext } from "../context/HospitalContext";
import { DonationContext } from "../context/DonationContext";
import { hospitalService } from "../services/hospital/hospitalService";
import { sortDirection } from "../types/fillterType";

import { desktopStyles } from "./SearchAndSortStyles";

export const SearchAndSortDesktop = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const { originals, hospitals, setHospitals } = useContext(HospitalsContext);
  const { filters, setFilters } = useContext(FilterContext);
  const { setDonateOverlayOpen } = useContext(DonationContext);

  const handleDonateClick = () => {
    window.history.replaceState({}, "", window.location.pathname);
    setDonateOverlayOpen(true);
  };

  const handleOpenFilters = () => setShowFilters(true);
  const handleCloseFilters = () => setShowFilters(false);

  const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setHospitals(hospitalService.filterHospitals(originals, v));
    setIsDisabled(v !== "");
  };

  const handelOrderButton = () => {
    const updated = {
      ...filters,
      sortDirection:
        filters.sortDirection === sortDirection.DESCENDING
          ? sortDirection.ASCENDING
          : sortDirection.DESCENDING,
    };
    setHospitals(hospitals.sort(hospitalService.getSortComparator(updated)).slice());
    setFilters(updated);
  };

  return (
    <>
      <Box data-testid="search-and-sort-box" sx={desktopStyles.root}>
        <a href="https://gamesforlove.org">
          <img src={GamesForLoveLogo} alt="Games For Love Logo" width={96} height={40} />
        </a>

        <TextField
          placeholder="Search"
          onChange={changeSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={desktopStyles.iconAdornment}>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={desktopStyles.searchField}
        />

        <ToolbarButton onClick={handleOpenFilters} sx={desktopStyles.iconButtonBase}>
          <FilterListIcon />
        </ToolbarButton>

        <ToolbarButton
          onClick={handelOrderButton}
          sx={desktopStyles.iconButtonBase}
          disabled={isDisabled || filters.sortDirection === sortDirection.UNDEFINED}
        >
          {filters.sortDirection === sortDirection.DESCENDING ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
        </ToolbarButton>

        <ToolbarButton variant="contained" height="2.7rem" width="8rem" onClick={handleDonateClick}>
          Donate
        </ToolbarButton>
      </Box>

      <FilterDialog open={showFilters} handleClose={handleCloseFilters} />
    </>
  );
};
