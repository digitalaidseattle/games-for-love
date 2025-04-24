/**
 *  Providers.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
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
import { GeneralInfoContextProvider } from "../context/GeneralInfoContext.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Palette from "../styles/theme";

const themes = Palette();
type ProvidersProps = { children: ReactNode };

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider theme={themes}>
      <CssBaseline />
      <GeneralInfoContextProvider>
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
      </GeneralInfoContextProvider>
    </ThemeProvider>
  );
};
export default Providers;
