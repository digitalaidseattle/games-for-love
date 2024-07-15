import { airtableService } from '../../mapping/airtableService';
import { GeneralInfo } from '../../models/generalInfo';


class GeneralInfoService {

    async getGeneralInfo(): Promise<GeneralInfo[]> {
        const TABLE = import.meta.env.VITE_AIRTABLE_TABLE_GENERAL_REFERENCE;
        const MAX_RECORDS = 100;

        return airtableService.getTableRecords(TABLE, MAX_RECORDS)
        .then((records) => {
            console.log(records[0])
            return records;
        })
            .then(records => records.map(r => {
                return {
                    id: `${r.fields["ID"]}`,
                    status: r.fields["Status"],
                    totalOpen: r.fields["Total $ Open"],
                    totalFunded: r.fields["Total $ Funded"],
                    corpPartner1Name: r.fields["Corp Partner 1 Name"],
                    corpPartner1Logo: r.fields["Corp Partner 1 Logo"],
                    corpPartner1Type: r.fields["Corp Partner 1 Type"],
                    corpPartner2Name: r.fields["Corp Partner 2 Name"],
                    corpPartner2Logo: r.fields["Corp Partner 2 Logo"],
                    corpPartner2Type: r.fields["Corp Partner 2 Type"],
                    corpPartner3Name: r.fields["Corp Partner 3 Name"],
                    corpPartner3Logo: r.fields["Corp Partner 3 Logo"],
                    corpPartner3Type: r.fields["Corp Partner 3 Type"],
                } as GeneralInfo
            }));
    }
}

const generalInfoService = new GeneralInfoService();
export { generalInfoService };
