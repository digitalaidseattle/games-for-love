import { airtableService } from "../../mapping/airtableService";
import { HospitalInfo } from "../../models/hospitalInfo";

import thumbnailData from "../../../test/thumbnailData.json";

const extractUrls = (attachments: any) => {
  return attachments ? attachments.map((att: any) => att.url) : [];
};

class HospitalInfoService {
  isHospitalOpen = (hospitalInfo: HospitalInfo | undefined) => {
    if (hospitalInfo === undefined) {
      throw new Error("hospitalInfo is undefined");
    } else {
      return hospitalInfo.status !== "Closed";
    }
  };
  async getHospitalInfo(): Promise<HospitalInfo[]> {
    const TABLE = import.meta.env.VITE_AIRTABLE_TABLE_HOSPITAL_REFERENCE;
    const MAX_RECORDS = 100;

    return airtableService.getTableRecords(TABLE, MAX_RECORDS).then((records) =>
      records.map((r) => {
        return {
          name: `${r.fields["Hospital Name"]}`,
          status: r.fields["Status"],
          type: r.fields["Type of Organization"],
          description: r.fields["Organization Notes / Description"],
          year: r.fields["Kids Served / Year"],
          country: r.fields["Country"],
          state: r.fields["State"],
          zip: r.fields["ZIP"],
          city: r.fields["City"],
          address: r.fields["Address"],
          longitude: r.fields["Longitude"],
          latitude: r.fields["Latitude"],
          hospitalPicture1: extractUrls(r.fields["Hospital Picture 1"]),
          id: r.fields["ID"],
        } as HospitalInfo;
      })
    );
  }
}
class MockHospitalInfoService extends HospitalInfoService {
  async getHospitalInfo(): Promise<HospitalInfo[]> {
    return thumbnailData.map((data) => {
      return {
        id: data["ID"],
        name: data["Hospital Name"],
        status: data["Status"],
        type: data["Type of Organization"],
        description: data["Organization Notes / Description"],
        year: data["Kids Served / Year"],
        country: data["Country"],
        state: data["State"],
        zip: data["ZIP"],
        city: data["City"],
        address: data["Address"],
        longitude: data["Longitude"],
        latitude: data["Latitude"],
        hospitalPicture1: extractUrls(data["Hospital Picture 1"]),
      } as HospitalInfo;
    });
  }
}

// const hospitalInfoService = new HospitalInfoService();
const hospitalInfoService = new MockHospitalInfoService();
export { hospitalInfoService, HospitalInfoService };
