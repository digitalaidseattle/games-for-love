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
  hospitals: Hospital[];
  setHospitals: (hospitals: Hospital[]) => void;
  originals: Hospital[];
  setOriginals: (hospitals: Hospital[]) => void;
}

export const HospitalsContext = createContext<HospitalsContextType>({
  hospitals: [],
  setHospitals: () => { },
  originals: [],
  setOriginals: () => { },
});

export const HospitalsContextProvider = (props: { children: ReactNode }) => {
  // originals held in memory for faster searching.
  // originals updated when Airtable is queried.
  const [originals, setOriginals] = useState<Hospital[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

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
