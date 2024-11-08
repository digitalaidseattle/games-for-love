/**
 *  HospitalInfoService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */

import { FieldSet, Record } from "airtable";
import { airtableService } from "../../mapping/airtableService";
import { HospitalInfo } from "../../models/hospitalInfo";

const extractUrls = (attachments: any) => {
  return attachments ? attachments.map((att: any) => att.url) : [];
};

class HospitalInfoService {

  transform = (record: Record<FieldSet>): HospitalInfo => {
    return {
      id: record.id,
      recordId: record.id,
      name: `${record.fields["Hospital Name"]}`,
      type: record.fields["Type of Organization"],
      description: record.fields["Organization Notes / Description"],
      year: record.fields["Kids Served / Year"],
      country: record.fields["Country"],
      state: record.fields["State"],
      zip: record.fields["ZIP"],
      city: record.fields["City"],
      address: record.fields["Address"],
      longitude: record.fields["Long"],
      latitude: record.fields["Lat"],
      hospitalPictures: [
        extractUrls(record.fields["Hospital Picture 1"])[0],
        extractUrls(record.fields["Hospital Picture 2"])[0],
        extractUrls(record.fields["Hospital Picture 3"])[0],
      ].filter((u) => u !== undefined),
    } as HospitalInfo;
  }

  async findAll(): Promise<HospitalInfo[]> {
    const TABLE = import.meta.env.VITE_AIRTABLE_TABLE_HOSPITAL_REFERENCE;
    const MAX_RECORDS = 100;

    return airtableService
      .getTableRecords(TABLE, MAX_RECORDS)
      .then((records) => records.map((r) => this.transform(r)));
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
//           (filterecord.location.includes(hospital.state.toLowerCase()) ||
//             filterecord.location.includes(hospital.city.toLowerCase()) ||
//             filterecord.location.includes(hospital.zip.toLowerCase())) &&
//           filterecord.status.includes(hospital.status.toLowerCase())
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
