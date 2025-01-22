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
  name: string;
  requestNarrative: string;
  titleRequestNarrative: string;
  equipReq: string;
  requested: number;
  fundingDeadline: Date | undefined;
  kids3Y: number;
  play3Y: string;
  collected: string;
  funders: string;
  requestPictures: string[];
  corpPartners: CorporatePartner[];
};

