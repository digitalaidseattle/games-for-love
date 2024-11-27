/**
 *  GeneralInfoService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { airtableService } from "../../mapping/airtableService";
import { GeneralInfo } from "../../models/generalInfo";

class GeneralInfoService {
  async getGeneralInfo(): Promise<GeneralInfo[]> {
    const TABLE = import.meta.env.VITE_AIRTABLE_TABLE_GENERAL_REFERENCE;
    const MAX_RECORDS = 100;

    return airtableService.getTableRecords(TABLE, MAX_RECORDS).then((records) =>
      records.map((r) => {
        return {
          id: `${r.fields["ID"]}`,
          status: r.fields["Status"],
          totalOpen: r.fields["Total $ Open"],
          totalFunded: r.fields["Total $ Funded"],
          corpPartners: [
            {
              name: r.fields["Corp Partner 1 Name"],
              logo: r.fields["Corp Partner 1 Logo"],
              type: r.fields["Corp Partner 1 Type"]
            },
            {
              name: r.fields["Corp Partner 2 Name"],
              logo: r.fields["Corp Partner 2 Logo"],
              type: r.fields["Corp Partner 2 Type"]
            },
            {
              name: r.fields["Corp Partner 3 Name"],
              logo: r.fields["Corp Partner 3 Logo"],
              type: r.fields["Corp Partner 3 Type"]
            }
          ].filter((u) => u.name !== undefined)          
        } as GeneralInfo;
      })
    );
  }
}

const generalInfoService = new GeneralInfoService();
export { generalInfoService };
