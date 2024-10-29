import { ReactNode } from "react";
import { HospitalInfoContextProvider } from "../context/HospitalInfoContext.tsx";
import { FilterContextProvider } from "../context/FilterContext.tsx";
import { HospitalRequestContextProvider } from "../context/HospitalRequestContext.tsx";
import { HospitalFundedContextProvider } from "../context/HospitalFundedContext.tsx";
import { HospitalsContextProvider } from "../context/HospitalContext.tsx";

type ProvidersProps = { children: ReactNode };

const Providers = ({ children }: ProvidersProps) => {
  return (
    <HospitalInfoContextProvider>
      <HospitalRequestContextProvider>
        <HospitalFundedContextProvider>
          <HospitalsContextProvider>
            <FilterContextProvider>{children}</FilterContextProvider>
          </HospitalsContextProvider>
        </HospitalFundedContextProvider>
      </HospitalRequestContextProvider>
    </HospitalInfoContextProvider>
  );
};
export default Providers;
