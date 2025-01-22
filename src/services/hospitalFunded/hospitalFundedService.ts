/**
 *  HospitalFundedService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { FieldSet, Record } from "airtable";
import { airtableService } from "../../mapping/airtableService";
import { HospitalFunded } from "../../models/hospitalFunded";
import { extractUrls } from "../siteUtils";

class HospitalFundedService {
  transform = (record: Record<FieldSet>): HospitalFunded => {
    return {
      id: record.id,
      hospitalRequestId: `${record.fields["Hospital Request ID (Linked)"]}`,
      hospital: `${record.fields["Hospital Fundraising ID"]}`,
      orderID: `${record.fields["Order ID"]}`,
      equipmentShipped: record.fields["# Equipment Shipped"],
      fundingCompleted: record.fields["$ Funding"],
      fundingDeadline: record.fields["Funding Deadline"],
      funders: record.fields["# Funders"],
      corporateFunding: record.fields["$ Corporate Funding"],
      thankYouNote: record.fields["Thank You Note"],
      fundedPictures: [
        extractUrls(record.fields["Thank You Picture 1"])[0],
        extractUrls(record.fields["Thank You Picture 2"])[0],
        extractUrls(record.fields["Thank You Picture 3"])[0],
        extractUrls(record.fields["Thank You Picture 4"])[0],
        extractUrls(record.fields["Thank You Picture 5"])[0],
      ].filter((u) => u !== undefined),
      impactPictures: [
        extractUrls(record.fields["Impact Picture 1"])[0],
        extractUrls(record.fields["Impact Picture 2"])[0],
        extractUrls(record.fields["Impact Picture 3"])[0],
        extractUrls(record.fields["Impact Picture 4"])[0],
        extractUrls(record.fields["Impact Picture 5"])[0],
      ].filter((u) => u !== undefined),
      shortThankYou: record.fields["Map Short Thank You"],
      thankYouNoteTitle: record.fields["Thank You Note Title"],
      impactTitle: record.fields["Impact Title"],
      impactText: record.fields["Impact Text"],
    } as HospitalFunded;
  };

  async findAll(): Promise<HospitalFunded[]> {
    const TABLE = import.meta.env.VITE_AIRTABLE_TABLE_HOSPITAL_FUNDED_REFERENCE;
    const MAX_RECORDS = 100;

    return airtableService
      .getTableRecords(TABLE, MAX_RECORDS)
      .then((records) => records.map((r) => this.transform(r)));
  }
}

const hospitalFundedService = new HospitalFundedService();
export { hospitalFundedService };
