/**
 *  HospitalInfoService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { airtableService } from "../../mapping/airtableService";
import { HospitalInfo } from "../../models/hospitalInfo";

import { FilterType } from "../../types/fillterType";

const extractUrls = (attachments: any) => {
  return attachments ? attachments.map((att: any) => att.url) : [];
};

class HospitalInfoService {
  isHospitalOpen = (hospitalInfo: HospitalInfo | undefined) => {
    if (hospitalInfo === undefined) {
      throw new Error("hospitalInfo is undefined");
    } else {
      return hospitalInfo.status !== "past";
    }
  };

  filterHospitals = (hospitals: HospitalInfo[], searchTerm: string) => {
    return hospitals.filter(
      (h: HospitalInfo) =>
        h.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    );
  };

  async getHospitalInfo(filter?: FilterType): Promise<HospitalInfo[]> {
    const TABLE = import.meta.env.VITE_AIRTABLE_TABLE_HOSPITAL_REFERENCE;
    const MAX_RECORDS = 100;

    const hospitals = airtableService
      .getTableRecords(TABLE, MAX_RECORDS)
      .then((records) =>
        records.map((r) => {
          const hospitalData = {
            recordId: r.id,
            name: `${r.fields["Hospital Name"]}`,
            status: Math.random() * 10 > 5 ? "active" : "past", //r.fields["Status"],
            type: r.fields["Type of Organization"],
            description: r.fields["Organization Notes / Description"],
            year: r.fields["Kids Served / Year"],
            country: r.fields["Country"],
            state: r.fields["State"],
            zip: r.fields["ZIP"],
            city: r.fields["City"],
            address: r.fields["Address"],
            longitude: r.fields["Long"],
            latitude: r.fields["Lat"],
            hospitalPictures: [
              extractUrls(r.fields["Hospital Picture 1"])[0],
              extractUrls(r.fields["Hospital Picture 2"])[0],
              extractUrls(r.fields["Hospital Picture 3"])[0],
            ].filter((u) => u !== undefined),
            id: r.fields["ID"],
          } as HospitalInfo;
          return hospitalData;
        })
      );

    if (filter) {
      const filtered_hospitals = (await hospitals).filter(
        (hospital) =>
          (filter.location.includes(hospital.state.toLowerCase()) ||
            filter.location.includes(hospital.city.toLowerCase()) ||
            filter.location.includes(hospital.zip.toLowerCase())) &&
          filter.status.includes(hospital.status.toLowerCase())
      );
      return filtered_hospitals;
    } else {
      return hospitals;
    }
  }
}

// import thumbnailData from "../../../test/thumbnailData.json";
// class MockHospitalInfoService extends HospitalInfoService {
//   async getHospitalInfo(filter?: FilterType): Promise<HospitalInfo[]> {
//     const hospitals = thumbnailData.map((data) => {
//       return {
//         id: data["ID"],
//         name: data["Hospital Name"],
//         status: data["Status"],
//         type: data["Type of Organization"],
//         description: data["Organization Notes / Description"],
//         year: data["Kids Served / Year"],
//         country: data["Country"],
//         state: data["State"],
//         zip: data["ZIP"],
//         city: data["City"],
//         address: data["Address"],
//         longitude: data["Longitude"],
//         latitude: data["Latitude"],
//         hospitalPictures: extractUrls(data["Hospital Picture 1"]),
//       } as HospitalInfo;
//     });
//     if (filter) {
//       const filtered_hospitals = hospitals.filter(
//         (hospital) =>
//           (filter.location.includes(hospital.state.toLowerCase()) ||
//             filter.location.includes(hospital.city.toLowerCase()) ||
//             filter.location.includes(hospital.zip.toLowerCase())) &&
//           filter.status.includes(hospital.status.toLowerCase())
//       );
//       return filtered_hospitals;
//     } else {
//       return hospitals;
//     }
//   }
// }

const hospitalInfoService = new HospitalInfoService();
// const hospitalInfoService = new MockHospitalInfoService();
export { hospitalInfoService, HospitalInfoService };
