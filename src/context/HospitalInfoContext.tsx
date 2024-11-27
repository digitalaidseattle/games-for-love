/**
 *  HospitalInfoContext.tsx
 *
 *  Provides application-wide holder for hospitals
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { ReactNode, createContext, useEffect, useState } from "react";
import { HospitalInfo } from "../models/hospitalInfo";

interface HospitalInfoContextType {
  hospitalInfo: HospitalInfo[];
  setHospitalInfo: (hospitals: HospitalInfo[]) => void;
  originalInfo: HospitalInfo[];
  setOriginalInfo: (hospitals: HospitalInfo[]) => void;
}

export const HospitalInfoContext = createContext<HospitalInfoContextType>({
  hospitalInfo: [],
  setHospitalInfo: () => {},
  originalInfo: [],
  setOriginalInfo: () => {},
});

export const HospitalInfoContextProvider = (props: { children: ReactNode }) => {
  const [originalInfo, setOriginalInfo] = useState<HospitalInfo[]>([]);
  const [hospitalInfo, setHospitalInfo] = useState<HospitalInfo[]>([]);

  useEffect(() => {
    setHospitalInfo(originalInfo);
  }, [originalInfo]);

  return (
    <HospitalInfoContext.Provider
      value={{
        hospitalInfo,
        setHospitalInfo,
        originalInfo,
        setOriginalInfo,
      }}
    >
      {props.children}
    </HospitalInfoContext.Provider>
  );
};
