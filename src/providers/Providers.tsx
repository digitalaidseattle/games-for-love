import { ReactNode } from "react";

import { FilterContextProvider } from "../context/FilterContext.tsx";

import { HospitalsContextProvider } from "../context/HospitalContext.tsx";
import { SelectedHospitalsContextProvider } from "../context/SelectedHospitalContext.tsx";

type ProvidersProps = { children: ReactNode };

const Providers = ({ children }: ProvidersProps) => {
  return (
    <SelectedHospitalsContextProvider>
      <HospitalsContextProvider>
        <FilterContextProvider>{children}</FilterContextProvider>
      </HospitalsContextProvider>
    </SelectedHospitalsContextProvider>
  );
};
export default Providers;
