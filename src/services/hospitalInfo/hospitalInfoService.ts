import { airtableService } from '../../mapping/airtableService';
import { HospitalInfo } from '../../models/hospitalInfo';

import thumbnailData from "../../../test/thumbnailData.json";

const extractUrls = (attachments: any) => {
    return attachments && attachments.length > 0 ? attachments.map((att: any) => att.url) : [];
};

class MockHospitalInfoService {
    async getHospitalInfo(): Promise<HospitalInfo[]> {
        return thumbnailData.map(data => {
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
                hospitalPicture1: extractUrls(data["Hospital Picture 1"][0]),
                hospitalPicture2: extractUrls(data["Hospital Picture 1"][1]),
                hospitalPicture3: extractUrls(data["Hospital Picture 1"][2]),
            } as HospitalInfo
        });
    }
}

class HospitalInfoService {

    async getHospitalInfo(): Promise<HospitalInfo[]> {
        const TABLE = import.meta.env.VITE_AIRTABLE_TABLE_HOSPITAL_REFERENCE;
        const MAX_RECORDS = 100;

        return airtableService.getTableRecords(TABLE, MAX_RECORDS)
            .then((records) => {
                console.log(records[0])
                return records;
            })
            .then(records => records.map(r => {

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
                    hospitalPicture2: extractUrls(r.fields["Hospital Picture 2"]),
                    hospitalPicture3: extractUrls(r.fields["Hospital Picture 3"]),
                    id: r.fields["ID"]
                } as HospitalInfo
            }));
    }
}

// const hospitalInfoService = new HospitalInfoService();
const hospitalInfoService = new MockHospitalInfoService();
export { hospitalInfoService, HospitalInfoService };
