import { airtableService } from '../../mapping/airtableService';
import { HospitalInfo } from '../../models/hospitalInfo';


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
                const extractUrls = (attachments:any) => {
                    return attachments && attachments.length > 0 ? attachments.map((att:any) => att.url) : [];
                };

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

const hospitalInfoService = new HospitalInfoService();
export { hospitalInfoService };
