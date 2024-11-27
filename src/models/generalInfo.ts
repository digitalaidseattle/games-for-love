/**
 *  GeneralInfo.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { CorporatePartner } from "./corporatePartner";

export type GeneralInfo = {
    id: string;
    status: string;
    totalOpen: number;
    totalFunded: number;
    corpPartners: CorporatePartner[];
}
