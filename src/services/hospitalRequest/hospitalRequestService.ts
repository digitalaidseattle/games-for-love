/**
 *  HospitalRequestService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { FieldSet, Record } from "airtable";
import { airtableService } from "../../mapping/airtableService";
import { HospitalRequest } from "../../models/hospitalRequest";
import { extractUrls } from "../siteUtils";

class HospitalRequestService {

  transform = (record: Record<FieldSet>): HospitalRequest => {
    return {
      id: record.id,
      recordId: record.id,
      oppReqId: `${record.fields["Hospital Request ID"]}`,
      name: record.fields["Hospital Name (LInked)"],
      requestNarrative: record.fields["Request Narrative"],
      titleRequestNarrative: record.fields["Title Request Narrative"],
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
      requestPictures: [
        extractUrls(record.fields["Request Picture 1"])[0],
        extractUrls(record.fields["Request Picture 2"])[0],
        extractUrls(record.fields["Request Picture 3"])[0],
        extractUrls(record.fields["Request Picture 4"])[0],
        extractUrls(record.fields["Request Picture 5"])[0],
      ].filter((u) => u !== undefined),
      corpPartners: [
        {
          name: record.fields["Corp Partner 1 Name"],
          logo: record.fields["Corp Partner 1 Logo"],
          type: record.fields["Corp Partner 1 Type"]
        },
        {
          name: record.fields["Corp Partner 2 Name"],
          logo: record.fields["Corp Partner 2 Logo"],
          type: record.fields["Corp Partner 2 Type"]
        }
      ].filter((u) => u.name !== undefined),
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
