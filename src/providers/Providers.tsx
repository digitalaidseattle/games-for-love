import { ReactNode } from "react";

import { FilterContextProvider } from "../context/FilterContext.tsx";

import { HospitalsContextProvider } from "../context/HospitalContext.tsx";
import {
  DonationHospitalContextProvider,
  LearnMoreHospitalContextProvider,
  SelectedHospitalContextProvider,
} from "../context/SelectedHospitalContext.tsx";
import { DonationContextProvider } from "../context/DonationContext.tsx";
import { DrawerWidthContextProvider } from "../context/DrawerWidthContext.tsx";

type ProvidersProps = { children: ReactNode };

const Providers = ({ children }: ProvidersProps) => {
  return (
    <DrawerWidthContextProvider>
      <DonationContextProvider>
        <HospitalsContextProvider>
          <SelectedHospitalContextProvider>
            <DonationHospitalContextProvider>
              <LearnMoreHospitalContextProvider>
                <FilterContextProvider>{children}</FilterContextProvider>
              </LearnMoreHospitalContextProvider>
            </DonationHospitalContextProvider>
          </SelectedHospitalContextProvider>
        </HospitalsContextProvider>
      </DonationContextProvider>
    </DrawerWidthContextProvider>
  )
};
export default Providers;
