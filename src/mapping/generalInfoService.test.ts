import { describe, expect, it, vi } from 'vitest'
import { airtableService } from './airtableService'
import { generalInfoService } from "./generalInfoService";

describe("generalInfoService tests",()=>{
    it("getGeneralInfo", async()=>{
        const mockRecords = [
            {
                fields: {
                    "ID": "1",
                    "Status": "Open",
                    "Total $ Open": 1000,
                    "Total $ Funded": 500,
                    "Corp Partner 1 Name": "Partner 1",
                    "Corp Partner 1 Logo": "logo1.png",
                    "Corp Partner 1 Type": "Type 1",
                    "Corp Partner 2 Name": "Partner 2",
                    "Corp Partner 2 Logo": "logo2.png",
                    "Corp Partner 2 Type": "Type 2",
                    "Corp Partner 3 Name": "Partner 3",
                    "Corp Partner 3 Logo": "logo3.png",
                    "Corp Partner 3 Type": "Type 3",
                },
            }
        ];
        const getTableRecordsSpy = vi.spyOn(airtableService, "getTableRecords").mockResolvedValue(mockRecords as any)
        const result = await generalInfoService.getGeneralInfo()
        expect(getTableRecordsSpy).toHaveBeenCalled();
        expect(result).toEqual([
            {
                id: "1",
                status: "Open",
                totalOpen: 1000,
                totalFunded: 500,
                corpPartner1Name: "Partner 1",
                corpPartner1Logo: "logo1.png",
                corpPartner1Type: "Type 1",
                corpPartner2Name: "Partner 2",
                corpPartner2Logo: "logo2.png",
                corpPartner2Type: "Type 2",
                corpPartner3Name: "Partner 3",
                corpPartner3Logo: "logo3.png",
                corpPartner3Type: "Type 3",
            }
        ]);
    })
})

//toHaveBeenCalledWith 
//필드값을 가져오는 것
//mocking 
//결과 어디서 봄?
