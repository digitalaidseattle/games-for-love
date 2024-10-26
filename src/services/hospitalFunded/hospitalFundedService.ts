/**
 *  HospitalFundedService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { airtableService } from "../../mapping/airtableService";
import { HospitalFunded } from "../../models/hospitalFunded";

class HospitalFundedService {
  async getHospitalFunded(): Promise<HospitalFunded[]> {
    const TABLE = import.meta.env.VITE_AIRTABLE_TABLE_HOSPITAL_FUNDED_REFERENCE;
    const MAX_RECORDS = 100;

    const hospitalsFunded = airtableService
      .getTableRecords(TABLE, MAX_RECORDS)
      .then((records) =>
        records.map((r) => {
          return {
            hospitalRequestId: `${r.fields["Hospital Request ID (Linked)"]}`,
            hospital: `${r.fields["Hospital Fundraising ID"]}`,
            orderID: `${r.fields["Order ID"]}`,
            equipmentShipped: r.fields["# Equipment Shipped"],
            fundingCompleted: r.fields["$ Funding"],
            funders: r.fields["# Funders"],
            corporateFunding: r.fields["$ Corporate Funding"],
            thankYouNote: r.fields["Thank You Note"],
            fundedPicture1: r.fields["Thank You Picture 1"],
            fundedPicture2: r.fields["Thank You Picture 2"],
            fundedPicture3: r.fields["Thank You Picture 3"],
            fundedPicture4: r.fields["Thank You Picture 4"],
            fundedPicture5: r.fields["Thank You Picture 5"],
            impactPicture1: r.fields["Impact Picture 1"],
            impactPicture2: r.fields["Impact Picture 2"],
            impactPicture3: r.fields["Impact Picture 3"],
            impactPicture4: r.fields["Impact Picture 4"],
            impactPicture5: r.fields["Impact Picture 5"],
            shortThankYou: r.fields["Map Short Thank You"],
            thankYouNoteTitle: r.fields["Thank You Note Title"],
            impactTitle: r.fields["Impact Title"],
          } as HospitalFunded;
        })
      );
    return hospitalsFunded;
  }
}

const hospitalFundedService = new HospitalFundedService();
export { hospitalFundedService };
