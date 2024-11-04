/**
 *  HospitalService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { Hospital } from "../../models/hospital";
import { HospitalFunded } from "../../models/hospitalFunded";
import { HospitalInfo } from "../../models/hospitalInfo";
import { HospitalRequest } from "../../models/hospitalRequest";
import { FilterType } from "../../types/fillterType";
import { hospitalFundedService } from "../hospitalFunded/hospitalFundedService";
import { hospitalInfoService } from "../hospitalInfo/hospitalInfoService";
import { hospitalRequestService } from "../hospitalRequest/hospitalRequestService";

class HospitalService {
  hospitalInfo: HospitalInfo[] = [];
  hospitalFunded: HospitalFunded[] = [];
  hospitalRequest: HospitalRequest[] = [];

  constructor() {
    this.init();
  }

  private async init() {
    await this.initializeHospitalInfo();
    await this.initializeHospitalRequest();
    await this.initializeHospitalFunded();
  }

  private async initializeHospitalInfo() {
    this.hospitalInfo = await hospitalInfoService.getHospitalInfo();
  }

  private async initializeHospitalRequest() {
    this.hospitalRequest = await hospitalRequestService.getHospitalRequest();
  }

  private async initializeHospitalFunded() {
    this.hospitalFunded = await hospitalFundedService.getHospitalFunded();
  }

  async combineHospitalInfoAndRequestAndFunded(
    filter?: FilterType
  ): Promise<Hospital[] | undefined> {
    await this.init();
    if (
      this.hospitalInfo.length === 0 ||
      this.hospitalFunded.length === 0 ||
      this.hospitalRequest.length === 0
    ) {
      return undefined;
    } else {
      const _hospitals = this.hospitalInfo.map((hi) => {
        const hospital: Hospital = {
          hospitalInfoRecordId: "",
          requestRecordId: undefined,
          name: "",
          status: "active",
          type: "",
          description: "",
          year: 0,
          country: "",
          state: "",
          zip: "",
          city: "",
          address: "",
          longitude: 0,
          latitude: 0,
          hospitalPictures: [],
          fundingDeadline: undefined,
          requested: undefined,
          fundingCompleted: undefined,
          id: "",
        };
        hospital.hospitalInfoRecordId = hi.recordId;
        hospital.name = hi.name;
        hospital.status = hi.status;
        hospital.type = hi.type;
        hospital.description = hi.description;
        hospital.year = hi.year;
        hospital.country = hi.country;
        hospital.state = hi.state;
        hospital.zip = hi.zip;
        hospital.city = hi.city;
        hospital.address = hi.address;
        hospital.longitude = hi.longitude;
        hospital.latitude = hi.latitude;
        hospital.hospitalPictures = hi.hospitalPictures;
        hospital.id = hi.id;

        const matchedRequest = this.hospitalRequest.find(
          (hr) => hr.name[0] === hi.recordId
        );
        if (matchedRequest) {
          hospital.requestRecordId = matchedRequest.recordId;
          hospital.requested = matchedRequest.requested;
          hospital.fundingDeadline = matchedRequest.fundingDeadline;
        }
        return hospital;
      });

      const hospitals = _hospitals.map((h) => {
        const matchedFund = this.hospitalFunded.find(
          (hf) => hf.hospitalRequestId === h.requestRecordId
        );
        if (matchedFund) {
          h.fundingCompleted = matchedFund.fundingCompleted;
        }
        return h;
      });

      if (filter) {
        const filtered_hospitals = hospitals.filter((hospital) =>
          filter.location.length === 0
            ? filter.status.includes(hospital.status.toLowerCase())
            : (filter.location.includes(hospital.state?.toLowerCase()) ||
                filter.location.includes(hospital.city.toLowerCase()) ||
                filter.location.includes(hospital.zip.toLowerCase())) &&
              filter.status.includes(hospital.status.toLowerCase())
        );
        return filtered_hospitals;
      } else {
        return hospitals;
      }
    }
  }

  isHospitalOpen = (hospital: Hospital | undefined) => {
    if (!hospital) {
      throw new Error("hospitalInfo is undefined");
    } else {
      return hospital.status !== "past";
    }
  };

  filterHospitals = (hospitals: Hospital[] | undefined, searchTerm: string) => {
    return hospitals?.filter(
      (h: Hospital) =>
        h.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    );
  };

  sortingHospitals = (
    hospitals: Hospital[] | undefined,
    sortBy: string,
    sortDirection: boolean
  ) => {
    console.log("sortingHospitla끼지 옴");
    let sortedHospitals;
    if (sortBy === "fundingDeadline") {
      sortedHospitals = hospitals?.sort((a, b) => {
        const dateA = new Date(a.fundingDeadline);
        const dateB = new Date(b.fundingDeadline);

        if (sortDirection) {
          return dateB.getTime() - dateA.getTime();
        } else {
          return dateA.getTime() - dateB.getTime();
        }
      });
    }
    if (sortBy === "hospitalName") {
      sortedHospitals = hospitals?.sort((a, b) => {
        if (sortDirection) {
          return b.name.localeCompare(a.name);
        } else {
          return a.name.localeCompare(b.name);
        }
      });
    }
    if (sortBy === "fundingLevel") {
      sortedHospitals = hospitals?.sort((a, b) => {
        const a_fundingLevel = a.requested
          ? (a.fundingCompleted || 0) / a.requested
          : 0;
        const b_fundingLevel = b.requested
          ? (b.fundingCompleted || 0) / b.requested
          : 0;

        if (sortDirection) {
          return b_fundingLevel - a_fundingLevel;
        } else {
          return a_fundingLevel - b_fundingLevel;
        }
      });
    }
    return sortedHospitals;
  };
}

const hospitalService = new HospitalService();
export { hospitalService, HospitalService };
