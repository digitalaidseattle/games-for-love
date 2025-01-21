/**
 *  HospitalFunded.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
export type HospitalFunded = {
  id: string;
  hospitalRequestId: string;
  hospital: string;
  orderID: string;
  equipmentShipped: number;
  fundingCompleted: number;
  funders: string;
  corporateFunding: string;
  thankYouNote: string;
  fundedPictures: string[];
  impactPictures: string[];
  shortThankYou: string;
  thankYouNoteTitle: string;
  impactTitle: string;
  impactText: string;
};
