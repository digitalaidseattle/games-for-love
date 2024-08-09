import { airtableService } from "../../mapping/airtableService";
import { HospitalFunded } from "../../models/hospitalFunded";

class HospitalFundedService {
  async getHospitalFunded(): Promise<HospitalFunded[]> {
    const TABLE = import.meta.env.VITE_AIRTABLE_TABLE_HOSPITAL_FUNDED_REFERENCE;
    const MAX_RECORDS = 100;

    return airtableService
      .getTableRecords(TABLE, MAX_RECORDS)
      .then((records) => {
        return records;
      })
      .then((records) =>
        records.map((r) => {
          return {
            orderID: `${r.fields["Order ID"]}`,
            equipmentShipped: r.fields["# Equipment Shipped"],
            fundingCompleted: r.fields["$ Funding Completed"],
            funders: r.fields["# Funders"],
            corporateFunding: r.fields["$ Corporate Funding"],
            thankYouNote: r.fields["Thank You Note"],
            fundedPicture1: r.fields["Funded Picture 1"],
            fundedPicture2: r.fields["Funded Picture 2"],
            fundedPicture3: r.fields["Funded Picture 3"],
            fundedPicture4: r.fields["Funded Picture 4"],
            fundedPicture5: r.fields["Funded Picture 5"],
          } as HospitalFunded;
        })
      );
  }
}

const hospitalFundedService = new HospitalFundedService();
export { hospitalFundedService };
