/**
 *  FilterContext.tsx
 *
 *  Provides application-wide holder for hospitals
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { ReactNode, createContext, useEffect, useState } from "react";
import { FilterType, sortDirection } from "../types/fillterType";

interface FilterContextType {
  filters: FilterType;
  setFilters: (filters: FilterType) => void;
  originalFilters: FilterType;
  setOriginalFilters: (filters: FilterType) => void;
  clearFilters: () => void;
}

export const FilterContext = createContext<FilterContextType>({
  filters: {
    location: [],
    status: [],
    sortBy: "fundingDeadline",
    sortDirection: sortDirection.ASCENDING,
  },
  setFilters: () => {},
  originalFilters: {
    location: [],
    status: [],
    sortBy: "fundingDeadline",
    sortDirection: sortDirection.ASCENDING,
  },

  setOriginalFilters: () => {},
  clearFilters: () => {},
});

export const FilterContextProvider = (props: { children: ReactNode }) => {
  const [filters, setFilters] = useState<FilterType>({
    location: [],
    status: [],
    sortBy: "fundingDeadline",
    sortDirection: sortDirection.UNDEFINED,
  });

  const [originalFilters, setOriginalFilters] = useState<FilterType>({
    location: [],
    status: [],
    sortBy: "fundingDeadline",
    sortDirection: sortDirection.UNDEFINED,
  });

  const clearFilters = () => {
    setFilters({
      location: [],
      status: [],
      sortBy: "fundingDeadline",
      sortDirection: sortDirection.UNDEFINED,
    });
  };

  useEffect(() => {
    setFilters(originalFilters);
  }, [originalFilters]);

  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters,
        originalFilters,
        setOriginalFilters,
        clearFilters,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};
