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

interface SelectedHospitalContextType {
  selectedHospital: Hospital | undefined;
  setSelectedHospital: (hospital: Hospital | undefined) => void;
}

export const SelectedHospitalContext =
  createContext<SelectedHospitalContextType>({
    selectedHospital: undefined,
    setSelectedHospital: () => {},
  });

export const SelectedHospitalsContextProvider = (props: {
  children: ReactNode;
}) => {
  const [selectedHospital, setSelectedHospital] = useState<
    Hospital | undefined
  >(undefined);
  return (
    <SelectedHospitalContext.Provider
      value={{ selectedHospital, setSelectedHospital }}
    >
      {props.children}
    </SelectedHospitalContext.Provider>
  );
};
