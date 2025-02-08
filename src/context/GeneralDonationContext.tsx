/**
 *  GeneralDonationContextType.tsx
 *
 *  Provides application-wide holder for GeneralDonation
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { ReactNode, createContext, useState } from "react";

interface GeneralDonationContextType {
  donateOverlayOpen: boolean | undefined;
  setDonateOverlayOpen: (donateOverlayOpen: boolean | undefined) => void;
}

export const GeneralDonationContext = createContext<GeneralDonationContextType>(
  {
    donateOverlayOpen: false,
    setDonateOverlayOpen: () => {},
  }
);

export const GeneralDonationContextProvider = (props: {
  children: ReactNode;
}) => {
  const [donateOverlayOpen, setDonateOverlayOpen] = useState<boolean>();
  return (
    <GeneralDonationContext.Provider
      value={{ donateOverlayOpen, setDonateOverlayOpen }}
    >
      {props.children}
    </GeneralDonationContext.Provider>
  );
};
