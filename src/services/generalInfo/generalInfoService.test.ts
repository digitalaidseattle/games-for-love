import { describe, expect, it, vi } from 'vitest'
import { airtableService } from '../../mapping/airtableService'
import { generalInfoService } from "./generalInfoService";

describe("generalInfoService tests", () => {
    it("getGeneralInfo", async () => {
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
        const result = await generalInfoService.findAll()
        expect(getTableRecordsSpy).toHaveBeenCalled();
        expect(result).toEqual([
            {
                id: "1",
                status: "Open",
                totalOpen: 1000,
                totalFunded: 500,
                corpPartners: [
                    {
                        name: "Partner 1",
                        logo: "logo1.png",
                        type: "Type 1"
                    },
                    {
                        name: "Partner 2",
                        logo: "logo2.png",
                        type: "Type 2"
                    },
                    {
                        name: "Partner 3",
                        logo: "logo3.png",
                        type: "Type 3"
                    }
                ]
            }
        ]);
    })
})
