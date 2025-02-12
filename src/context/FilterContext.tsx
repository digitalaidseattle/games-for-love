/**
 *  FilterContext.tsx
 *
 *  Provides application-wide holder for hospitals
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { ReactNode, createContext, useState } from "react";
import { FilterStatus, FilterType, SortBy, sortDirection } from "../types/fillterType";

interface FilterContextType {
  filters: FilterType;
  setFilters: (filters: FilterType) => void;
}

export const DEFAULT_FILTER = {
  location: [],
  status: [FilterStatus.ACTIVE, FilterStatus.PAST],
  sortBy: SortBy.FUNDING_DEADLINE,
  sortDirection: sortDirection.DESCENDING,
};

export const FilterContext = createContext<FilterContextType>({
  filters: DEFAULT_FILTER,
  setFilters: () => { },
});

export const FilterContextProvider = (props: { children: ReactNode }) => {
  const [filters, setFilters] = useState<FilterType>(DEFAULT_FILTER);

  return (
    <FilterContext.Provider value={{ filters, setFilters }} >
      {props.children}
    </FilterContext.Provider>
  );
};
