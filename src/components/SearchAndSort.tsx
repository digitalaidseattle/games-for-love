/**
 *  SearchAndSort.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */

import { useMediaQuery, useTheme } from "@mui/material";
import { SearchAndSortDesktop } from "./SearchAndSortDesktop";
import { SearchAndSortMobile } from "./SearchAndSortMobile";

export const SearchAndSort = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return isMobile ? <SearchAndSortMobile /> : <SearchAndSortDesktop />;
};
