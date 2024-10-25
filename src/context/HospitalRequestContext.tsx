/**
 *  HospitalRequestContext.tsx
 *
 *  Provides application-wide holder for hospitals
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { ReactNode, createContext, useEffect, useState } from "react";
import { HospitalRequest } from "../models/hospitalRequest";

interface HospitalRequestContextType {
  HospitalRequest: HospitalRequest[];
  setHospitalRequest: (hospitalRequest: HospitalRequest[]) => void;
}

export const HospitalRequestContext = createContext<HospitalRequestContextType>(
  {
    HospitalRequest: [],
    setHospitalRequest: () => {},
  }
);

export const HospitalRequestContexProvider = (props: {
  children: ReactNode;
}) => {
  const [HospitalRequest, setHospitalRequest] = useState<HospitalRequest[]>([]);

  return (
    <HospitalRequestContext.Provider
      value={{
        HospitalRequest,
        setHospitalRequest,
      }}
    >
      {props.children}
    </HospitalRequestContext.Provider>
  );
};
