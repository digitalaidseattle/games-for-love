import { describe, expect, it, vi } from "vitest";
import { airtableService } from "../../mapping/airtableService";
import { hospitalInfoService } from "./hospitalInfoService";
import { HospitalInfo } from "../../models/hospitalInfo";

describe("HospitalInfoService tests", () => {
  it("getHospitalInfo", async () => {
    const mockRecords = [
      {
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
          Longitude: 1,
          Latitude: 1,
          "Hospital Picture 1": [{ url: "pic1.com" }],
          ID: 1,
        },
      },
    ];
    const getTableRecordsSpy = vi
      .spyOn(airtableService, "getTableRecords")
      .mockResolvedValue(mockRecords as any);
    const result = await hospitalInfoService.getHospitalInfo();
    expect(getTableRecordsSpy).toHaveBeenCalled();
    expect(result).toEqual([
      {
        name: "May Hospital",
        status: "active",
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
        hospitalPicture1: ["pic1.com"],
        id: 1,
      },
    ]);
  });
  it("should return true if hospital status is active", () => {
    const mockHospitalInfo: HospitalInfo = {
      id: 1,
      name: "May Hospital",
      status: "active",
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
      hospitalPicture1: ["pic1.com"],
    };
    const result = hospitalInfoService.isHospitalOpen(mockHospitalInfo);
    expect(result).toBeTruthy();
  });

  it("should return true if hospital status is past", () => {
    const mockHospitalInfo: HospitalInfo = {
      id: 1,
      name: "May Hospital",
      status: "past",
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
      hospitalPicture1: ["pic1.com"],
    };
    const result = hospitalInfoService.isHospitalOpen(mockHospitalInfo);
    expect(result).toBeFalsy();
  });

  it("should throw error if hospital status is undefined", () => {
    const mockHospitalInfo = undefined;
    expect(() => {
      hospitalInfoService.isHospitalOpen(mockHospitalInfo);
    }).toThrow("hospitalInfo is undefined");
  });
});
