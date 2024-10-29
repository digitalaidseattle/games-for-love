/**
 *  HospitalsContext.tsx
 *
 *  Provides application-wide holder for hospitals
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { ReactNode, createContext, useEffect, useState } from "react";
import { Hospital } from "../models/hospital";

interface HospitalsContextType {
  hospitals: Hospital[] | undefined;
  setHospitals: (hospitals: Hospital[] | undefined) => void;
  originals: Hospital[] | undefined;
  setOriginals: (hospitals: Hospital[] | undefined) => void;
}

export const HospitalsContext = createContext<HospitalsContextType>({
  hospitals: [],
  setHospitals: () => {},
  originals: [],
  setOriginals: () => {},
});

export const HospitalsContextProvider = (props: { children: ReactNode }) => {
  // originals held in memory for faster searching.
  // originals updated when Airtable is queried.
  const [originals, setOriginals] = useState<Hospital[] | undefined>(undefined);
  const [hospitals, setHospitals] = useState<Hospital[] | undefined>(undefined);

  useEffect(() => {
    setHospitals(originals);
  }, [originals]);

  return (
    <HospitalsContext.Provider
      value={{
        hospitals,
        setHospitals,
        originals,
        setOriginals,
      }}
    >
      {props.children}
    </HospitalsContext.Provider>
  );
};
