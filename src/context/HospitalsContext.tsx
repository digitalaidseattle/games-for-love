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

interface HospitalsContextType {
  hospitals: HospitalInfo[];
  setHospitals: (hospitals: HospitalInfo[]) => void;
  originals: HospitalInfo[];
  setOriginals: (hospitals: HospitalInfo[]) => void;
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
  const [originals, setOriginals] = useState<HospitalInfo[]>([]);
  const [hospitals, setHospitals] = useState<HospitalInfo[]>([]);

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
