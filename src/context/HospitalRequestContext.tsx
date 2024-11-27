/**
 *  HospitalRequestContext.tsx
 *
 *  Provides application-wide holder for hospitals
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { ReactNode, createContext, useState } from "react";
import { HospitalRequest } from "../models/hospitalRequest";

interface HospitalRequestContextType {
  hospitalRequest: HospitalRequest[];
  setHospitalRequest: (hospitalRequest: HospitalRequest[]) => void;
}

export const HospitalRequestContext = createContext<HospitalRequestContextType>(
  {
    hospitalRequest: [],
    setHospitalRequest: () => {},
  }
);

export const HospitalRequestContextProvider = (props: {
  children: ReactNode;
}) => {
  const [hospitalRequest, setHospitalRequest] = useState<HospitalRequest[]>([]);

  return (
    <HospitalRequestContext.Provider
      value={{
        hospitalRequest,
        setHospitalRequest,
      }}
    >
      {props.children}
    </HospitalRequestContext.Provider>
  );
};
