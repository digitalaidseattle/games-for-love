import { airtableService } from '../../mapping/airtableService';
import { HospitalRequest } from '../../models/hospitalRequest';

class HospitalRequestService {

    async getHospitalRequest(): Promise<HospitalRequest[]> {
        const TABLE = import.meta.env.VITE_AIRTABLE_TABLE_HOSPITAL_REQUEST_REFERENCE;
        const MAX_RECORDS = 100;

        return airtableService.getTableRecords(TABLE, MAX_RECORDS)
        .then((records) => {
            console.log(records[0])
            return records;
        })
            .then(records => records.map(r => {
                return {
                    oppReqId: `${r.fields["Opportunities/Requests ID"]}`,
                    name: r.fields["Hospital Name (LInked)"],
                    requestNarrative: r.fields["Request Narrative"],
                    equipReq: r.fields["# Equipment Requested (TBD if we show single brands + extras)"],
                    requested: r.fields["$ Requested"],
                    kids3Y: r.fields["Kids 3Y"],
                    play3Y: r.fields["Play 3Y"],
                    collected: r.fields["$ Collected"],
                    funders: r.fields["# Funders"],
                    requestPicture1: r.fields["Request Picture 1"],
                    requestPicture2: r.fields["Request Picture 2"],
                    requestPicture3: r.fields["Request Picture 3"],
                    requestPicture4: r.fields["Request Picture 4"],
                    requestPicture5: r.fields["Request Picture 5"],
                    corpPartner1Name: r.fields["Corp Partner 1 Name"],
                    corpPartner1Logo: r.fields["Corp Partner 1 Logo"],
                    corpPartner1Type: r.fields["Corp Partner 1 Type"],
                    corpPartner2Name: r.fields["Corp Partner 2 Name"],
                    corpPartner2Logo: r.fields["Corp Partner 2 Logo"],
                    corpPartner2Type: r.fields["Corp Partner 2 Type"],

                } as HospitalRequest
            }));
    }
}

const hospitalRequestService = new HospitalRequestService();
export { hospitalRequestService };
