import { describe, expect, it, vi } from 'vitest'
import { airtableService } from '../../mapping/airtableService'
import { hospitalInfoService } from "./hospitalInfoService";

describe("HospitalInfoService tests",()=>{
    it("getHospitalInfo", async()=>{
        const mockRecords = [
            {
                fields: {
                    "Hospital Name": "May Hospital",
                    "Status": "Open",
                    "Type of Organization": "A Organization",
                    "Organization Notes / Description":"A Organization",
                    "Kids Served / Year": 2024,
                    "Country": "US",
                    "State": "WA",
                    "ZIP": "ZIP12345",
                    "City": "Seattle",
                    "Address": "Type 2",
                    "Longitude": 1,
                    "Latitude": 1,
                    "Hospital Picture 1": "pic1.com",
                    "Hospital Picture 2": "pic2.com",
                    "Hospital Picture 3": "pic3.com",
                    "ID": 1
                },
            }
        ];
        const getTableRecordsSpy = vi.spyOn(airtableService, "getTableRecords").mockResolvedValue(mockRecords as any)
        const result = await hospitalInfoService.getHospitalInfo()
        expect(getTableRecordsSpy).toHaveBeenCalled();
        expect(result).toEqual([
            {
                name: "May Hospital",
                status: "Open",
                type: "A Organization",
                description: "A Organization",
                year: 2024,
                country: "US",
                state: "WA",
                zip: "ZIP12345",
                city: "Seattle",
                address: "Type 2",
                longitude: 1,
                latitude: 1,
                hospitalPicture1: "pic1.com",
                hospitalPicture2: "pic2.com",
                hospitalPicture3: "pic3.com",
                id: 1 
            }
        ]);
    })
})
