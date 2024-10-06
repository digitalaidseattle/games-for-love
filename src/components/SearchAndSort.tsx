import { ChangeEvent, useContext, useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Button,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import FilterListIcon from "@mui/icons-material/FilterList";

import FilterDialog from "./FilterDialog";
import { HospitalsContext } from "../context/HospitalsContext";
import { hospitalInfoService } from "../services/hospitalInfo/hospitalInfoService";

export const SearchAndSort = () => {
  const [showFilters, setShowFilters] = useState(false);
  const { originals, setHospitals } = useContext(HospitalsContext);

  const handleOpenFilters = () => {
    setShowFilters(true);
  };

  const handleCloseFilters = () => {
    setShowFilters(false);
  };

  const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    //searching through originals
    setHospitals(
      hospitalInfoService.filterHospitals(originals, e.target.value)
    );
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
          sx={{
            padding: "10px",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            border: "1px solid #d9d9d9",
            height: "36px",
          }}
        >
          <FilterListIcon />
        </IconButton>

        <Button
          variant="outlined"
          endIcon={<ImportExportIcon />}
          sx={{
            color: "#000",
            textTransform: "capitalize",
            marginRight: "20px",
            borderRadius: "12px",
            border: "1px solid #d9d9d9",
            "&:hover": {
              border: "1px solid #d9d9d9",
            },
          }}
        >
          Sort by
        </Button>
      </Box>
      {showFilters && (
        <FilterDialog open={showFilters} handleClose={handleCloseFilters} />
      )}
    </Box>
  );
};
