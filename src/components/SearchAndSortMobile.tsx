import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { ChangeEvent, useContext, useState } from "react";

import GamesForLoveLogo from "../assets/games-for-love-logo.png";
import FilterDialog from "./FilterDialog";
import ToolbarButton from "../styles/ToolbarButton";

import { HospitalsContext } from "../context/HospitalContext";
import { DonationContext } from "../context/DonationContext";
import { hospitalService } from "../services/hospital/hospitalService";

import { mobileStyles } from "./SearchAndSortStyles";

export const SearchAndSortMobile = () => {
  const { originals, setHospitals } = useContext(HospitalsContext);
  const { setDonateOverlayOpen } = useContext(DonationContext);

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleDonateClick = () => {
    window.history.replaceState({}, "", window.location.pathname);
    setDonateOverlayOpen(true);
  };

  const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setSearchValue(v);
    setHospitals(hospitalService.filterHospitals(originals, v));
  };

  const closeSearchAndReset = () => {
    setSearchExpanded(false);
    setSearchValue("");
    setHospitals(originals);
  };

  return (
    <>
      <Box sx={mobileStyles.header}>
        <a href="https://gamesforlove.org">
          <img src={GamesForLoveLogo} alt="Games For Love Logo" height={32} />
        </a>

        {!searchExpanded ? (
          <Box sx={mobileStyles.rightRow}>
            <ToolbarButton onClick={() => setSearchExpanded(true)} sx={mobileStyles.iconSquareButton}>
              <SearchIcon fontSize="small" />
            </ToolbarButton>

            <ToolbarButton onClick={() => setMobileFilterOpen(true)} sx={mobileStyles.iconSquareButton}>
              <FilterListIcon fontSize="small" />
            </ToolbarButton>

            <ToolbarButton variant="contained" height="40px" width="6.5rem" onClick={handleDonateClick}>
              Donate
            </ToolbarButton>
          </Box>
        ) : (
          <Box sx={mobileStyles.expandedSearchRow}>
            <TextField
              autoFocus
              fullWidth
              value={searchValue}
              onChange={changeSearch}
              placeholder="Search hospitals"
              type="text"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={mobileStyles.adornment}>
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end" sx={mobileStyles.adornment}>
                    <IconButton size="small" onClick={closeSearchAndReset}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={mobileStyles.expandedSearchField}
            />
          </Box>
        )}
      </Box>

      <FilterDialog open={mobileFilterOpen} handleClose={() => setMobileFilterOpen(false)} />
    </>
  );
};
