/**
 *  HospitalRequestService.test.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { describe, expect, it, vi } from "vitest";
import { airtableService } from "../../mapping/airtableService";
import { hospitalRequestService } from "./hospitalRequestService";

describe("HospitalRequestService tests", () => {
  it("findAll", async () => {
    const mockRecords = [
      {
        id: "12345",
        fields: {
          "Hospital Request ID": "REQ12345",
          "Opportunities/Requests ID": "REQ12345",
          "Hospital Name (LInked)": "May's Hospital",
          "Request Narrative": "Request for new equipment",
          "# Equipment Requested (TBD if we show single brands + extras)": 10,
          "$ Requested": 5000,
          "Kids 3Y": 300,
          "Play 3Y": 200,
          "$ Collected": 4000,
          "# Funders": 5,
          "Request Picture 1": [{ url: "pic1.jpg" }],
          "Request Picture 2": [{ url: "pic2.jpg" }],
          "Request Picture 3": [{ url: "pic3.jpg" }],
          "Request Picture 4": [{ url: "pic4.jpg" }],
          "Request Picture 5": [{ url: "pic5.jpg" }],
          "Corp Partner 1 Name": "Partner 1",
          "Corp Partner 1 Logo": "logo1.png",
          "Corp Partner 1 Type": "Type 1",
          "Corp Partner 2 Name": "Partner 2",
          "Corp Partner 2 Logo": "logo2.png",
          "Corp Partner 2 Type": "Type 2",
          "Funding Deadline": "2024/12/31"
        },
      },
    ];
    const getTableRecordsSpy = vi
      .spyOn(airtableService, "getTableRecords")
      .mockResolvedValue(mockRecords as any);

    const result = await hospitalRequestService.findAll();

    expect(getTableRecordsSpy).toHaveBeenCalled();

    expect(result).toEqual([
      {
        id: "12345",
        recordId: "12345",
        oppReqId: "REQ12345",
        name: "May's Hospital",
        requestNarrative: "Request for new equipment",
        equipReq: 10,
        requested: 5000,
        kids3Y: 300,
        play3Y: 200,
        collected: 4000,
        funders: 5,
        requestPictures: ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg", "pic5.jpg"],
        corpPartners: [{
          name: "Partner 1",
          logo: "logo1.png",
          type: "Type 1"
        },
        {
          name: "Partner 2",
          logo: "logo2.png",
          type: "Type 2"
        }],
        fundingDeadline: new Date("2024/12/31"),
      },
    ]);
  });
});