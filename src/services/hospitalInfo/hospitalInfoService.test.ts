/**
 *  HospitalInfoService.test.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */

import { describe, expect, it, vi } from "vitest";
import { airtableService } from "../../mapping/airtableService";
import { hospitalInfoService } from "./hospitalInfoService";

describe("HospitalInfoService tests", () => {
  it("findAll", async () => {
    const mockRecords = [
      {
        id: "23456",
        fields: {
          "Hospital Name": "May Hospital",
          Status: "active",
          "Type of Organization": "A Organization",
          "Organization Notes / Description": "A Organization",
          "Kids Served / Year": 2024,
          Country: "US",
          State: "WA",
          ZIP: "ZIP12345",
          City: "Seattle",
          Address: "Type 2",
          Long: 1,
          Lat: 1,
          "Hospital Picture 1": [{ url: "pic1.com" }],
          ID: 1,
        },
      },
    ];
    const getTableRecordsSpy = vi
      .spyOn(airtableService, "getTableRecords")
      .mockResolvedValue(mockRecords as any);
    const result = await hospitalInfoService.findAll();
    expect(getTableRecordsSpy).toHaveBeenCalled();
    expect(result).toEqual([
      {
        id: "23456",
        recordId: "23456",
        name: "May Hospital",
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
        hospitalPictures: ["pic1.com"],
      },
    ]);
  });

});