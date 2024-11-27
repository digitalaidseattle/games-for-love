/**
 *  SelectedHospitalContext.tsx
 *
 *  Provides application-wide holder for a selected hospital
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { ReactNode, createContext, useState } from "react";
import { Hospital } from "../models/hospital";

interface HospitalContextType {
  hospital: Hospital | undefined;
  setHospital: (hospitals: Hospital | undefined) => void;
}

export const SelectedHospitalContext = createContext<HospitalContextType>({
  hospital: undefined,
  setHospital: () => {},
});

export const DonationHospitalContext = createContext<HospitalContextType>({
  hospital: undefined,
  setHospital: () => {},
});

export const LearnMoreHospitalContext = createContext<HospitalContextType>({
  hospital: undefined,
  setHospital: () => {},
});

export const SelectedHospitalContextProvider = (props: {
  children: ReactNode;
}) => {
  const [hospital, setHospital] = useState<Hospital>();
  return (
    <SelectedHospitalContext.Provider value={{ hospital, setHospital }}>
      {props.children}
    </SelectedHospitalContext.Provider>
  );
};

export const DonationHospitalContextProvider = (props: {
  children: ReactNode;
}) => {
  const [hospital, setHospital] = useState<Hospital>();
  return (
    <DonationHospitalContext.Provider value={{ hospital, setHospital }}>
      {props.children}
    </DonationHospitalContext.Provider>
  );
};
export const LearnMoreHospitalContextProvider = (props: {
  children: ReactNode;
}) => {
  const [hospital, setHospital] = useState<Hospital>();
  return (
    <LearnMoreHospitalContext.Provider value={{ hospital, setHospital }}>
      {props.children}
    </LearnMoreHospitalContext.Provider>
  );
};
