/**
 *  HospitalRequestService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { FieldSet, Record } from "airtable";
import { airtableService } from "../../mapping/airtableService";
import { HospitalRequest } from "../../models/hospitalRequest";

class HospitalRequestService {

  transform = (record: Record<FieldSet>): HospitalRequest => {
    return {
      id: record.id,
      recordId: record.id,
      oppReqId: `${record.fields["Hospital Request ID"]}`,
      name: record.fields["Hospital Name (LInked)"],
      requestNarrative: record.fields["Request Narrative"],
      equipReq:
        record.fields[
        "# Equipment Requested (TBD if we show single brands + extras)"
        ],
      requested: record.fields["$ Requested"],
      fundingDeadline: record.fields["Funding Deadline"] ? new Date(record.fields["Funding Deadline"] as string) : undefined,
      kids3Y: record.fields["Kids 3Y"],
      play3Y: record.fields["Play 3Y"],
      collected: record.fields["$ Collected"],
      funders: record.fields["# Funders"],
      requestPicture1: record.fields["Request Picture 1"],
      requestPicture2: record.fields["Request Picture 2"],
      requestPicture3: record.fields["Request Picture 3"],
      requestPicture4: record.fields["Request Picture 4"],
      requestPicture5: record.fields["Request Picture 5"],
      corpPartner1Name: record.fields["Corp Partner 1 Name"],
      corpPartner1Logo: record.fields["Corp Partner 1 Logo"],
      corpPartner1Type: record.fields["Corp Partner 1 Type"],
      corpPartner2Name: record.fields["Corp Partner 2 Name"],
      corpPartner2Logo: record.fields["Corp Partner 2 Logo"],
      corpPartner2Type: record.fields["Corp Partner 2 Type"],
    } as HospitalRequest;
  }

  async findAll(): Promise<HospitalRequest[]> {
    const TABLE = import.meta.env.VITE_AIRTABLE_TABLE_HOSPITAL_REQUEST_REFERENCE;
    const MAX_RECORDS = 100;

    return airtableService
      .getTableRecords(TABLE, MAX_RECORDS)
      .then((records) => records.map((r) => this.transform(r)));
  }
}

const hospitalRequestService = new HospitalRequestService();
export { hospitalRequestService };
