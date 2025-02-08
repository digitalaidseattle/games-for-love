/**
 *  DonationContextType.tsx
 *
 *  Provides application-wide holder for Donation
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { ReactNode, createContext, useState } from "react";

interface DonationContextType {
  donateOverlayOpen: boolean | undefined;
  setDonateOverlayOpen: (donateOverlayOpen: boolean | undefined) => void;
}

export const DonationContext = createContext<DonationContextType>({
  donateOverlayOpen: false,
  setDonateOverlayOpen: () => {},
});

export const DonationContextProvider = (props: { children: ReactNode }) => {
  const [donateOverlayOpen, setDonateOverlayOpen] = useState<boolean>();
  return (
    <DonationContext.Provider
      value={{ donateOverlayOpen, setDonateOverlayOpen }}
    >
      {props.children}
    </DonationContext.Provider>
  );
};
