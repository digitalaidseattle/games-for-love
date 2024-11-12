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
import { FilterType, sortDirection } from "../../types/fillterType";

describe("HospitalService tests", () => {
    it("findAll", async () => {
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
            .spyOn(hospitalInfoService, "findAll")
            .mockResolvedValue(hospitalInfos);
        const getHospitalRequestSpy = vi
            .spyOn(hospitalRequestService, "findAll")
            .mockResolvedValue([]);
        const getHospitalFundedSpy = vi
            .spyOn(hospitalFundedService, "findAll")
            .mockResolvedValue([]);

        const result = await hospitalService.findAll();

        expect(getHospitalInfoSpy).toHaveBeenCalled();
        expect(getHospitalRequestSpy).toHaveBeenCalled();
        expect(getHospitalFundedSpy).toHaveBeenCalled();

        expect(result).toEqual([
            {
                id: undefined,
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
                matchedRequest: undefined,
                matchedFunded: undefined,
                fundingLevel: 0,
                searchTerm: "wa.seattle.zip12345.may hospital",
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
            matchedFunded: undefined,
            matchedRequest: undefined,
            fundingLevel: 0,
            searchTerm: "wa.seattle.zip12345.may hospital"
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
            matchedRequest: undefined,
            matchedFunded: undefined,
            fundingLevel: 0,
            searchTerm:  "wa.seattle.zip12345"
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

    it("fundingLevelComparator", () => {
        const hospitalA: Hospital = {
            id: "Hopsital_1",
            name: "May Hospital",
            fundingLevel: 0,
        } as Hospital;
        const hospitalB: Hospital = {
            id: "Hopsital_2",
            name: "May Hospital",
            fundingLevel: 10,
        } as Hospital;
        expect(hospitalService.fundingLevelComparator(hospitalA, hospitalB)).toEqual(-10);
    });

    it("hospitalNameComparator", () => {
        const hospitalA: Hospital = {
            id: "Hopsital_1",
            name: "May Hospital",
            fundingLevel: 0,
        } as Hospital;
        const hospitalB: Hospital = {
            id: "Hopsital_2",
            name: "Jeff Hospital",
            fundingLevel: 10,
        } as Hospital;
        expect(hospitalService.hospitalNameComparator(hospitalA, hospitalB)).toEqual(1);
    });

    it("fundingDeadlineComparator", () => {
        const hospitalA: Hospital = {
            id: "Hopsital_1",
            name: "May Hospital",
            matchedRequest: {
                fundingDeadline: new Date("2024-01-31"),
            }
        } as Hospital;
        const hospitalB: Hospital = {
            id: "Hopsital_2",
            name: "Jeff Hospital",
            matchedRequest: {
                fundingDeadline: new Date("2023-01-31"),
            }
        } as Hospital;
        expect(hospitalService.fundingDeadlineComparator(hospitalA, hospitalB)).toBeGreaterThan(0);
    });

    it("sortingHospitals", () => {
        const hospitalA: Hospital = {
            id: "Hopsital_1",
            name: "May Hospital",
            matchedRequest: {
                fundingDeadline: new Date("2024-01-31"),
            }
        } as Hospital;
        const hospitalB: Hospital = {
            id: "Hopsital_2",
            name: "Jeff Hospital",
            matchedRequest: {
                fundingDeadline: new Date("2023-01-31"),
            }
        } as Hospital;
        expect([hospitalA, hospitalB].sort(hospitalService.getSortComparator({ sortBy: "hospitalName", sortDirection: sortDirection.DESCENDING } as FilterType))).toEqual([hospitalA, hospitalB]);
        expect([hospitalA, hospitalB].sort(hospitalService.getSortComparator({ sortBy: "hospitalName", sortDirection: sortDirection.ASCENDING } as FilterType))).toEqual([hospitalB, hospitalA]);
    });
});