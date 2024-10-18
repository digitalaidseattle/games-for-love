import { ReactNode } from "react";
import { HospitalsContextProvider } from "../context/HospitalsContext.tsx";
import { FilterContextProvider } from "../context/FilterContext.tsx";

type ProvidersProps = { children: ReactNode };

const Providers = ({ children }: ProvidersProps) => {
  return (
    <HospitalsContextProvider>
      <FilterContextProvider>{children}</FilterContextProvider>
    </HospitalsContextProvider>
  );
};
export default Providers;
