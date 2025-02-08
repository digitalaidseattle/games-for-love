import { ReactNode } from "react";

import { FilterContextProvider } from "../context/FilterContext.tsx";

import { HospitalsContextProvider } from "../context/HospitalContext.tsx";
import {
  DonationHospitalContextProvider,
  LearnMoreHospitalContextProvider,
  SelectedHospitalContextProvider,
} from "../context/SelectedHospitalContext.tsx";
import { GeneralDonationContextProvider } from "../context/GeneralDonationContext.tsx";

type ProvidersProps = { children: ReactNode };

const Providers = ({ children }: ProvidersProps) => {
  return (
    <GeneralDonationContextProvider>
      <HospitalsContextProvider>
        <SelectedHospitalContextProvider>
          <DonationHospitalContextProvider>
            <LearnMoreHospitalContextProvider>
              <FilterContextProvider>{children}</FilterContextProvider>
            </LearnMoreHospitalContextProvider>
          </DonationHospitalContextProvider>
        </SelectedHospitalContextProvider>
      </HospitalsContextProvider>
    </GeneralDonationContextProvider>
  );
};
export default Providers;
