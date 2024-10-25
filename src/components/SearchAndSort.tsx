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
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import FilterListIcon from "@mui/icons-material/FilterList";

import FilterDialog from "./FilterDialog";
import { HospitalsContext } from "../context/HospitalsContext";
import { hospitalInfoService } from "../services/hospitalInfo/hospitalInfoService";

export const SearchAndSort = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [isDescending, setIsDescending] = useState(true);
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

  const handelOrderButton = () => {
    setIsDescending(!isDescending);
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
          endIcon={isDescending ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
          onClick={handelOrderButton}
          sx={{
            color: "#000",
            textTransform: "capitalize",
            padding: "0px", // 패딩을 제거하여 내부 여백 제거
            margin: "0px", // 외부 마진 제거
            width: "40px", // 너비를 고정
            height: "40px", // 높이를 고정 (정사각형)
            display: "flex", // 플렉스 박스로 아이콘 중앙 정렬
            alignItems: "center", // 세로 중앙 정렬
            justifyContent: "center", // 가로 중앙 정렬
            borderRadius: "12px",
            border: "1px solid #d9d9d9", // 외곽선 설정
            "&:hover": {
              border: "1px solid #d9d9d9",
            },
          }}
        >
          {isDescending ? "Des" : "Asc"}
        </Button>
      </Box>
      {showFilters && (
        <FilterDialog open={showFilters} handleClose={handleCloseFilters} />
      )}
    </Box>
  );
};
