import { useState } from "react";
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

<<<<<<< HEAD
import Filter from "../components/Filter";
import { FilterType } from "../types/fillterType";

interface SearchAndSortProps {
  getHospitalInfo: (filter?: FilterType) => void;
}

export const SearchAndSort: React.FC<SearchAndSortProps> = ({
  getHospitalInfo,
}) => {
=======
import { FilterComponent } from "./FilterComponent";

export const SearchAndSort = () => {
>>>>>>> 12355d481d7926915055d18a8150cac79b1196f0
  const [showFilters, setShowFilters] = useState(false);

  const handleOpenFilters = () => {
    setShowFilters(true);
  };

  const handleCloseFilters = () => {
    setShowFilters(false);
  };

  return (
    <Box>
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
<<<<<<< HEAD
        <Filter
          open={showFilters}
          handleClose={handleCloseFilters}
          applyFilters={getHospitalInfo}
=======
        <FilterComponent
          onClose={handleCloseFilters}
>>>>>>> 12355d481d7926915055d18a8150cac79b1196f0
        />
      )}
    </Box>
  );
};
