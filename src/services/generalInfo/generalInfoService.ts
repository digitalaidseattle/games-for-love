/**
 *  GeneralInfoService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { FieldSet, Record } from "airtable";
import { airtableService } from "../../mapping/airtableService";
import { GeneralInfo } from "../../models/generalInfo";

class GeneralInfoService {

  transform = (r: Record<FieldSet>): GeneralInfo => {
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
  }

  async findAll(): Promise<GeneralInfo[]> {
    const TABLE = import.meta.env.VITE_AIRTABLE_TABLE_GENERAL_REFERENCE;
    const MAX_RECORDS = 100;

    return airtableService
      .getTableRecords(TABLE, MAX_RECORDS)
      .then((records) => records.map((r) => this.transform(r)));
  }

}


import microsoft from "../../../test/microsoft.svg";
import starbucks from "../../../test/starbucks.svg";
import apple from "../../../test/apple.svg";
class MockGeneralInfoService extends GeneralInfoService {
  async findAll(): Promise<GeneralInfo[]> {
    return [{
      id: 'gen1',
      status: 'active',
      totalOpen: 120000,
      totalFunded: 10000,
      corpPartners:
        [{
          name: 'Starbucks',
          logo: starbucks,
          type: 'type1'
        },
        {
          name: 'Microsoft',
          logo: microsoft,
          type: 'type2'
        },
        {
          name: 'Apple',
          logo: apple,
          type: 'type3'
        }]
    }]
  }
}

// const generalInfoService = new GeneralInfoService();
const generalInfoService = new MockGeneralInfoService();
export { generalInfoService };
