import { airtableService } from './airtableService';
import { HospitalInfo } from './hospitalInfo';


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
                    hospitalPicture1: r.fields["Hospital Picture 1"],
                    hospitalPicture2: r.fields["Hospital Picture 2"],
                    hospitalPicture3: r.fields["Hospital Picture 3"],
                    id: r.fields["ID"]
                } as HospitalInfo
            }));
    }
}

const hospitalInfoService = new HospitalInfoService();
export { hospitalInfoService };
