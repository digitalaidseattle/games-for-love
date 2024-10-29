/**
 *  FilterContext.tsx
 *
 *  Provides application-wide holder for hospitals
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { ReactNode, createContext, useEffect, useState } from "react";
import { FilterType } from "../types/fillterType";

interface FilterContextType {
  filters: FilterType;
  setFilters: (filters: FilterType) => void;
  originalFilters: FilterType;
  setOriginalFilters: (filters: FilterType) => void;
}

export const FilterContext = createContext<FilterContextType>({
  filters: { location: [], status: [] },
  setFilters: () => {},
  originalFilters: { location: [], status: [] },
  setOriginalFilters: () => {},
});

export const FilterContextProvider = (props: { children: ReactNode }) => {
  const [filters, setFilters] = useState<FilterType>({
    location: [],
    status: [],
  });

  const [originalFilters, setOriginalFilters] = useState<FilterType>({
    location: [],
    status: [],
  });

  useEffect(() => {
    let filters: FilterType;
    if (originalFilters.status[0] === "all") {
      filters = { ...originalFilters, status: [] };
      setFilters(filters);
    } else {
      setFilters(originalFilters);
    }
  }, [originalFilters]);

  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters,
        originalFilters,
        setOriginalFilters,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};
