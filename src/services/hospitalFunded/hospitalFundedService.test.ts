import { describe, expect, it, vi } from 'vitest'
import { airtableService } from '../../mapping/airtableService'
import { hospitalFundedService } from "./hospitalFundedService";

describe("HospitalFundedService tests", () => {
    it("getHospitalFunded", async () => {
        const mockRecords = [
            {
                fields: {
                    "Order ID": "12345",
                    "# Equipment Shipped": 10,
                    "$ Funding": 5000,
                    "# Funders": 5,
                    "$ Corporate Funding": 2000,
                    "Thank You Note": "Thank you for your support!",
                    "Thank You Picture 1": "pic1.jpg",
                    "Thank You Picture 2": "pic2.jpg",
                    "Thank You Picture 3": "pic3.jpg",
                    "Thank You Picture 4": "pic4.jpg",
                    "Thank You Picture 5": "pic5.jpg",
                },
            }
        ];
        const getTableRecordsSpy = vi.spyOn(airtableService, "getTableRecords").mockResolvedValue(mockRecords as any);
        const result = await hospitalFundedService.getHospitalFunded();
        expect(getTableRecordsSpy).toHaveBeenCalledWith(import.meta.env.VITE_AIRTABLE_TABLE_HOSPITAL_FUNDED_REFERENCE, 100);
        expect(result).toEqual([
            {
                orderID: "12345",
                equipmentShipped: 10,
                fundingCompleted: 5000,
                funders: 5,
                corporateFunding: 2000,
                thankYouNote: "Thank you for your support!",
                fundedPicture1: "pic1.jpg",
                fundedPicture2: "pic2.jpg",
                fundedPicture3: "pic3.jpg",
                fundedPicture4: "pic4.jpg",
                fundedPicture5: "pic5.jpg",
                hospital: "undefined",
                id: undefined,
                impactPicture1: undefined,
                impactPicture2: undefined,
                impactPicture3: undefined,
                impactPicture4: undefined,
                impactPicture5: undefined,
                impactTitle: undefined,
            }
        ]);
    })
})
