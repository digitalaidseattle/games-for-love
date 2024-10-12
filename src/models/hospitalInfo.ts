export type HospitalInfo = {
  id: number;
  name: string;
  status: "active" | "past";
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
  hospitalPicture1: string[];
};
