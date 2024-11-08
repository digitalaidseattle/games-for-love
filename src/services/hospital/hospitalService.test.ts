/**
 *  HospitalService.test.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */

import { describe, expect, it, vi } from "vitest";
import { Hospital } from "../../models/hospital";
import { HospitalInfo } from "../../models/hospitalInfo";
import { hospitalFundedService } from "../hospitalFunded/hospitalFundedService";
import { hospitalInfoService } from "../hospitalInfo/hospitalInfoService";
import { hospitalRequestService } from "../hospitalRequest/hospitalRequestService";
import { hospitalService } from "./hospitalService";

describe("HospitalService tests", () => {
  it("comnbineHospitalInfoAndRequestFunded", async () => {
    const hospitalInfos = [
      {
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
      } as HospitalInfo,
    ];
    const getHospitalInfoSpy = vi
      .spyOn(hospitalInfoService, "getHospitalInfo")
      .mockResolvedValue(hospitalInfos);
    const getHospitalRequestSpy = vi
      .spyOn(hospitalRequestService, "getHospitalRequest")
      .mockResolvedValue([]);
    const getHospitalFundedSpy = vi
      .spyOn(hospitalFundedService, "getHospitalFunded")
      .mockResolvedValue([]);

    const result = await hospitalService.combineHospitalInfoAndRequestAndFunded();

    expect(getHospitalInfoSpy).toHaveBeenCalled();
    expect(getHospitalRequestSpy).toHaveBeenCalled();
    expect(getHospitalFundedSpy).toHaveBeenCalled();

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
        hospitalPictures: ["pic1.com"],
        id: undefined,
        fundingCompleted: undefined,
        fundingDeadline: "",
        hospitalInfoRecordId: undefined,
        requestRecordId: undefined,
        requested: undefined,
      },
    ]);
  });

  it("should return true if hospital status is active", () => {
    const mockHospitalInfo: Hospital = {
      id: "Hopsital_1",
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
      hospitalPictures: ["pic1.com"],
      hospitalInfoRecordId: "",
      requestRecordId: undefined,
      fundingDeadline: "",
      requested: undefined,
      fundingCompleted: undefined
    };

    const result = hospitalService.isHospitalOpen(mockHospitalInfo);
    expect(result).toBeTruthy();
  });

  it("should return true if hospital status is past", () => {
    const hospital: Hospital = {
      id: "Hopsital_1",
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
      hospitalPictures: ["pic1.com"],
      hospitalInfoRecordId: "",
      requestRecordId: undefined,
      fundingDeadline: "",
      requested: undefined,
      fundingCompleted: undefined
    };
    const result = hospitalService.isHospitalOpen(hospital);
    expect(result).toBeFalsy();
  });

  it("should throw error if hospital status is undefined", () => {
    const mockHospitalInfo = undefined;
    expect(() => {
      hospitalService.isHospitalOpen(mockHospitalInfo);
    }).toThrow("hospitalInfo is undefined");
  });


});