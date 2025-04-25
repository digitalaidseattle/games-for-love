/**
 *  GeneralInfoContext.tsx
 *
 *  Provides application-wide holder for GeneralInfo
 *
 *  @copyright 2025 Digital Aid Seattle
 *
 */
import { createContext, ReactNode, useEffect, useState } from "react";
import { GeneralInfo } from "../models/generalInfo";
import { generalInfoService } from "../services/generalInfo/generalInfoService";

interface GeneralInfoContextType {
  generalInfo: GeneralInfo;
  setGeneralInfo: (generalInfo: GeneralInfo) => void;
}

export const EMPTY_INFO = {
  id: "",
  status: "",
  totalOpen: 0,
  totalFunded: 0,
  fundraiseUpCampaignId: "",
  fundraiseUpOrganizationId: "",
  corpPartners: [],
};

export const GeneralInfoContext = createContext<GeneralInfoContextType>({
  generalInfo: EMPTY_INFO,
  setGeneralInfo: () => { },
});

export const GeneralInfoContextProvider = (props: { children: ReactNode }) => {
  const [generalInfo, setGeneralInfo] = useState<GeneralInfo>(EMPTY_INFO);

  useEffect(() => {
    generalInfoService.findAll()
      .then(data => setGeneralInfo(data[0] || EMPTY_INFO));
  }, []);

  return (
    <GeneralInfoContext.Provider value={{ generalInfo, setGeneralInfo }} >
      {props.children}
    </GeneralInfoContext.Provider>
  );
};