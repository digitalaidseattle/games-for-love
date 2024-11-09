/**
 *  FilterContext.tsx
 *
 *  Provides application-wide holder for hospitals
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { ReactNode, createContext, useState } from "react";
import { FilterType, sortDirection } from "../types/fillterType";

interface FilterContextType {
  filters: FilterType;
  setFilters: (filters: FilterType) => void;
}

export const FilterContext = createContext<FilterContextType>({
  filters: {
    location: [],
    status: [],
    sortBy: "fundingDeadline",
    sortDirection: sortDirection.ASCENDING,
  },
  setFilters: () => { },
});

export const FilterContextProvider = (props: { children: ReactNode }) => {
  const [filters, setFilters] = useState<FilterType>({
    location: [],
    status: [],
    sortBy: "fundingDeadline",
    sortDirection: sortDirection.ASCENDING,
  });


  return (
    <FilterContext.Provider value={{ filters, setFilters }} >
      {props.children}
    </FilterContext.Provider>
  );
};
