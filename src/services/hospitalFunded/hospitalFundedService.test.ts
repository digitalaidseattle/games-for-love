/**
 *  HospitalFundedService.test.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { describe, expect, it, vi } from 'vitest'
import { airtableService } from '../../mapping/airtableService'
import { hospitalFundedService } from "./hospitalFundedService";

describe("HospitalFundedService tests", () => {
    it("findAll", async () => {
        const mockRecords = [
            {
                fields: {
                    "Hospital Request ID (Linked)": "54321",
            
                    "Order ID": "12345",
                    "# Equipment Shipped": 10,
                    "$ Funding": 5000,
                    "# Funders": 5,
                    "$ Corporate Funding": 2000,
                    "Thank You Note Title" : "Thank You Note Title",
                    "Thank You Note": "Thank you for your support!",
                    "Thank You Picture 1": "pic1.jpg",
                    "Thank You Picture 2": "pic2.jpg",
                    "Thank You Picture 3": "pic3.jpg",
                    "Thank You Picture 4": "pic4.jpg",
                    "Thank You Picture 5": "pic5.jpg",
                    "Map Short Thank You": "Map Short Thank You",
                },
            }
        ];
        const getTableRecordsSpy = vi.spyOn(airtableService, "getTableRecords").mockResolvedValue(mockRecords as any);
        const result = await hospitalFundedService.findAll();
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
                shortThankYou: "Map Short Thank You",
                thankYouNoteTitle: "Thank You Note Title",
                hospitalRequestId: "54321",
            }
        ]);
    })
})