/**
 *  HospitalsContext.tsx
 *
 *  Provides application-wide holder for hospitals
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { ReactNode, createContext, useEffect, useState } from "react";
import { HospitalInfo } from "../models/hospitalInfo";
import { FilterType } from "../types/fillterType";

interface HospitalsContextType {
  hospitals: HospitalInfo[];
  setHospitals: (hospitals: HospitalInfo[]) => void;
  originals: HospitalInfo[];
  setOriginals: (hospitals: HospitalInfo[]) => void;
  filters: FilterType;
  setFilters: (filters: FilterType) => void;
  originalFilters: FilterType;
  setOriginalFilters: (filters: FilterType) => void;
}

export const HospitalsContext = createContext<HospitalsContextType>({
  hospitals: [],
  setHospitals: () => {},
  originals: [],
  setOriginals: () => {},
  filters: { location: [], status: [] },
  setFilters: () => {},
  originalFilters: { location: [], status: [] },
  setOriginalFilters: () => {},
});

export const HospitalsContextProvider = (props: { children: ReactNode }) => {
  // originals held in memory for faster searching.
  // originals updated when Airtable is queried.
  const [originals, setOriginals] = useState<HospitalInfo[]>([]);
  const [hospitals, setHospitals] = useState<HospitalInfo[]>([]);

  const [filters, setFilters] = useState<FilterType>({
    location: [],
    status: [],
  });

  const [originalFilters, setOriginalFilters] = useState<FilterType>({
    location: [],
    status: [],
  });

  useEffect(() => {
    setHospitals(originals);
  }, [originals]);

  useEffect(() => {
    setFilters(originalFilters);
  }, [originalFilters]);

  return (
    <HospitalsContext.Provider
      value={{
        hospitals,
        setHospitals,
        originals,
        setOriginals,
        filters,
        setFilters,
        originalFilters,
        setOriginalFilters,
      }}
    >
      {props.children}
    </HospitalsContext.Provider>
  );
};
