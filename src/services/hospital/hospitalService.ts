/**
 *  HospitalService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { Hospital } from "../../models/hospital";
import { FilterType, sortDirection } from "../../types/fillterType";
import { hospitalFundedService } from "../hospitalFunded/hospitalFundedService";
import { hospitalInfoService } from "../hospitalInfo/hospitalInfoService";
import { hospitalRequestService } from "../hospitalRequest/hospitalRequestService";

class HospitalService {

  async findAll(filter?: FilterType): Promise<Hospital[]> {
    return Promise.all([
      hospitalInfoService.findAll(),
      hospitalRequestService.findAll(),
      hospitalFundedService.findAll()
    ]).then((resps) => {
      return resps[0]
        .map((hi) => {
          const matchedRequest = resps[1].find((hr) => hr.name[0] === hi.recordId);
          const matchedFund = resps[2].find((hf) => hf.hospitalRequestId === (matchedRequest ? matchedRequest.recordId : undefined));
          return {
            id: hi.id,
            hospitalInfoRecordId: hi.recordId,
            name: hi.name,
            type: hi.type,
            description: hi.description,
            year: hi.year,
            country: hi.country ?? "",
            state: hi.state ?? "",
            zip: hi.zip,
            city: hi.city ?? "",
            address: hi.address,
            longitude: hi.longitude,
            latitude: hi.latitude,
            hospitalPictures: hi.hospitalPictures,
            matchedRequest: matchedRequest,
            matchedFunded: matchedFund,
          } as Hospital;
        })
        .map(hospital => {
          const currentDate = new Date();
          hospital.status = this.calcStatus(hospital, currentDate);
          hospital.fundingLevel = this.calcFundingLevel(hospital);
          return hospital;
        })
        .filter((hospital) =>
          filter ?
            filter.location.length === 0
              ? filter.status.includes(hospital.status.toLowerCase())
              : (filter.location.includes(hospital.state?.toLowerCase()) ||
                filter.location.includes(hospital.city.toLowerCase()) ||
                filter.location.includes(hospital.zip.toLowerCase())) &&
              filter.status.includes(hospital.status.toLowerCase())
            : true
        )
        .sort(filter ? this.getSortComparator(filter.sortBy, filter?.sortDirection) : () => 0) as Hospital[];
    })
  }

  calcStatus(hospital: Hospital, currentDate: Date): string {
    if (hospital.matchedRequest && hospital.matchedRequest.fundingDeadline) {
      return currentDate > hospital.matchedRequest.fundingDeadline ? "past" : "active"
    }
    return "active";
  }

  calcFundingLevel(hospital: Hospital): number {
    if (hospital.matchedRequest && hospital.matchedFunded) {
      hospital.matchedRequest.requested
        ? (hospital.matchedFunded.fundingCompleted || 0) / hospital.matchedRequest.requested
        : 0;
    }
    return 0;
  }


  isHospitalOpen = (hospital: Hospital | undefined) => {
    if (!hospital) {
      throw new Error("hospitalInfo is undefined");
    } else {
      return hospital.status !== "past";
    }
  };

  filterHospitals = (hospitals: Hospital[], searchTerm: string) => {
    return hospitals.filter(
      (h: Hospital) =>
        h.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    );
  };

  fundingDeadlineComparator = (a: Hospital, b: Hospital): number => {
    const dateA = a.matchedRequest ? a.matchedRequest.fundingDeadline : undefined;
    const dateB = b.matchedRequest ? b.matchedRequest.fundingDeadline : undefined;
    if (!dateA) {
      return -1;
    }
    if (!dateB) {
      return 1;
    }
    return dateA.getTime() - dateB.getTime();
  };

  hospitalNameComparator = (a: Hospital, b: Hospital): number => {
    return a.name.localeCompare(b.name);
  }

  fundingLevelComparator = (a: Hospital, b: Hospital): number => {
    return a.fundingLevel - b.fundingLevel;
  }

  lookupComparator = (sortBy: string) => {
    switch (sortBy) {
      case "fundingDeadline":
        return this.fundingDeadlineComparator;
      case "fundingLevel":
        return this.fundingLevelComparator;
      case "hospitalName":
      default:
        return this.hospitalNameComparator;
    }
  }

  getSortComparator = (sortBy: string, sortDir: sortDirection) => {
    return (a: Hospital, b: Hospital) => (sortDir === sortDirection.DESCENDING ? -1 : 1) * this.lookupComparator(sortBy)(a, b);
  }
}

const hospitalService = new HospitalService();
export { hospitalService, HospitalService };
