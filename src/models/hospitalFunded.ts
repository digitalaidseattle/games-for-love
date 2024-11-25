export type HospitalFunded = {
  id: string;
  hospitalRequestId: string;
  hospital: string;
  orderID: string;
  equipmentShipped: boolean;
  fundingCompleted: number;
  funders: string;
  corporateFunding: string;
  thankYouNote: string;
  fundedPicture1: string;
  fundedPicture2: string;
  fundedPicture3: string;
  fundedPicture4: string;
  fundedPicture5: string;
  impactPicture1: ImpactPictureType;
  impactPicture2: ImpactPictureType;
  impactPicture3: ImpactPictureType;
  impactPicture4: ImpactPictureType;
  impactPicture5: ImpactPictureType;
  shortThankYou: string;
  thankYouNoteTitle: string;
  impactTitle: string;
};


type ImpactPictureType = Array<{
  fileName: string;
  url: string;
  type: string;
  height: number;
  id: string;
  width: number;
}>