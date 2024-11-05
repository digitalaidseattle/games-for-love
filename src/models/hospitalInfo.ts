export type HospitalInfo = {
  id: string;
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
  hospitalPictures: string[];
};
