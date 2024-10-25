import Airtable, { FieldSet, Records } from "airtable";
import { airtableClient } from "./airtableClient";

class AirtableService {
  async getTableRecords(
    tableId: string,
    maxRecords?: number,
    filterByFormula?: string
  ): Promise<Records<FieldSet>> {
    const base: Airtable.Base = airtableClient.base(
      import.meta.env.VITE_AIRTABLE_BASE_ID_GFL
    );
    const table = base(tableId);

    try {
      const records = await table
        .select({
          maxRecords: maxRecords || 100, // default max records is 100, more than that and we will need to start using pagination
          filterByFormula: filterByFormula || "",
        })
        .all();
      return records;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Linked record의 ID로 병원 이름 조회
  async getHospitalNameById(hospitalId: string): Promise<string> {
    const base: Airtable.Base = airtableClient.base(
      import.meta.env.VITE_AIRTABLE_BASE_ID_GFL
    );

    const tableName = import.meta.env.VITE_AIRTABLE_TABLE_HOSPITAL_REFERENCE;

    if (!tableName) {
      throw new Error("Table name or table ID is required for Hospital Info.");
    }

    const hospitalInfoTable = base(tableName); // 테이블 ID 사용

    try {
      const hospitalRecord = await hospitalInfoTable.find(hospitalId);
      return hospitalRecord.fields["Hospital Name"] as string;
    } catch (error) {
      console.error("Failed to fetch hospital name:", error);
      throw error;
    }
  }

  // 예시: Hospital Request와 연결된 Hospital Name 조회
  async getHospitalRequestWithHospitalName(
    hospitalRequestId: string
  ): Promise<void> {
    const base: Airtable.Base = airtableClient.base(
      import.meta.env.VITE_AIRTABLE_BASE_ID_GFL
    );
    const requestTable = base(
      import.meta.env.VITE_AIRTABLE_TABLE_HOSPITAL_REQUEST_REFERENCE
    );

    try {
      const hospitalRequestRecord = await requestTable.find(hospitalRequestId);

      // Hospital Name (Linked) 필드에서 ID 추출
      const hospitalLinkedIds = hospitalRequestRecord.fields[
        "Hospital Name (LInked)"
      ] as string[];

      if (hospitalLinkedIds && hospitalLinkedIds.length > 0) {
        const hospitalName = await this.getHospitalNameById(
          hospitalLinkedIds[0]
        );
        console.log("Hospital Name~~~: ", hospitalName);
      } else {
        console.log("No linked hospital found.");
      }

      console.log("Hospital Request: ", hospitalRequestRecord);
    } catch (error) {
      console.error("Error fetching hospital request: ", error);
      throw error;
    }
  }
}

const airtableService = new AirtableService();

export { airtableService };

// 사용 예시
airtableService.getHospitalRequestWithHospitalName("recplJAZsy4Bnbp4W");
