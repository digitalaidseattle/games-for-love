/**
 *  HospitalRequest.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */

import { CorporatePartner } from "./corporatePartner";

export type HospitalRequest = {
  recordId: string;
  oppReqId: string;
  name: string | string[];
  requestNarrative: string;
  titleRequestNarrative: string;
  equipReq: string;
  requested: number;
  fundingDeadline: Date | string | undefined;  // string to fix type checking
  kids3Y: number;
  play3Y: number;
  collected?: string;
  funders?: string;
  requestPictures: string[];
  corpPartners: CorporatePartner[];
  fundraiseUpCampaignId?: string,
  active: boolean,
  fundraiseUpCampaignCode?: string
};

