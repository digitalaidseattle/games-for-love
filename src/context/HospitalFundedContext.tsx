/**
 *  HospitalFundedContext.tsx
 *
 *  Provides application-wide holder for hospitals
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { ReactNode, createContext, useState } from "react";

import { HospitalFunded } from "../models/hospitalFunded";

interface HospitalFundedContextType {
  hospitalFunded: HospitalFunded[];
  setHospitalFunded: (hospitalFunded: HospitalFunded[]) => void;
}

export const HospitalFundedContext = createContext<HospitalFundedContextType>({
  hospitalFunded: [],
  setHospitalFunded: () => {},
});

export const HospitalFundedContextProvider = (props: {
  children: ReactNode;
}) => {
  const [hospitalFunded, setHospitalFunded] = useState<HospitalFunded[]>([]);

  return (
    <HospitalFundedContext.Provider
      value={{
        hospitalFunded,
        setHospitalFunded,
      }}
    >
      {props.children}
    </HospitalFundedContext.Provider>
  );
};
