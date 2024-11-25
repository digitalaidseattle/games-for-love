import { HospitalFunded } from "./hospitalFunded";
import { HospitalRequest } from "./hospitalRequest";

export type Hospital = {
  id: string;
  name: string;
  type: string;
  description: string;
  year: number;
  country: string;
  state: string;
  zip: string;
  city: string;
  address: string;
  longitude: number;
  latitude: number;
  hospitalPictures: string[];
  matchedRequest: HospitalRequest | undefined;
  matchedFunded: HospitalFunded | undefined;
  status: string;
  fundingLevel: number;
  searchTerm: string;
};
