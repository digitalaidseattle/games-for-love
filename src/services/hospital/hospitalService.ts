/**
 *  HospitalService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { differenceInDays } from "date-fns";
import { Hospital } from "../../models/hospital";
import { HospitalFunded } from "../../models/hospitalFunded";
import { HospitalInfo } from "../../models/hospitalInfo";
import { HospitalRequest } from "../../models/hospitalRequest";
import { FilterType, sortDirection } from "../../types/fillterType";
import { hospitalFundedService } from "../hospitalFunded/hospitalFundedService";
import { hospitalInfoService } from "../hospitalInfo/hospitalInfoService";
import { hospitalRequestService } from "../hospitalRequest/hospitalRequestService";
class HospitalService {
  transform(
    hi: HospitalInfo,
    matchedRequest: HospitalRequest,
    matchedFund: HospitalFunded,
    currentDate: Date
  ): Hospital {
    const hospital = {
      id: hi.id,
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
    hospital.status = this.calcStatus(hospital, currentDate);
    hospital.fundingLevel = this.calcFundingLevel(hospital);
    hospital.searchTerm = `${hospital.state?.toLowerCase()}.${hospital.city?.toLowerCase()}.${hospital.country?.toLowerCase()}.${hospital.name?.toLowerCase()}`;
    return hospital;
  }

  async findAll(filter?: FilterType): Promise<Hospital[]> {
    const currentDate = new Date();
    return Promise.all([
      hospitalInfoService.findAll(),
      hospitalRequestService.findAll(),
      hospitalFundedService.findAll(),
    ]).then((resps) => {
      return resps[0]
        .map((hi) => {
          const matchedRequest = resps[1].find(
            (hr) => hr.name[0] === hi.recordId
          );
          const matchedFund = resps[2].find(
            (hf) =>
              hf.hospitalRequestId ===
              (matchedRequest ? matchedRequest.recordId : undefined)
          );
          return this.transform(hi, matchedRequest!, matchedFund!, currentDate);
        })
        .filter(this.filterPredicate(filter!))
        .sort(this.getSortComparator(filter!)) as Hospital[];
    });
  }

  filterPredicate(filter: FilterType) {
    return (hospital: Hospital) => {
      if (!filter) {
        return true;
      }
      if (filter.location.length === 0) {
        return filter.status.includes(hospital.status.toLowerCase());
      }
      const lowerLocations = filter.location.map((l) => l.toLowerCase());
      return (
        // this would allow partial (e.g. sea will find for Seattle Hospitals)
        // lowerLocations.find(l => hospital.searchTerm.includes(l)) &&
        (lowerLocations.includes(hospital.state?.toLowerCase()) ||
          lowerLocations.includes(hospital.city.toLowerCase()) ||
          lowerLocations.includes(hospital.zip.toLowerCase())) &&
        filter.status.includes(hospital.status.toLowerCase())
      );
    };
  }

  calcStatus(hospital: Hospital, currentDate: Date): string {
    if (hospital.matchedRequest && hospital.matchedRequest.fundingDeadline) {
      return currentDate > hospital.matchedRequest.fundingDeadline
        ? "past"
        : "active";
    }
    return "active";
  }

  calcFundingLevel(hospital: Hospital): number {
    if (hospital.matchedRequest && hospital.matchedFunded) {
      hospital.matchedRequest.requested
        ? (hospital.matchedFunded.fundingCompleted || 0) /
        hospital.matchedRequest.requested
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

  isEqual = (test: Hospital, selectedHospital: Hospital | undefined): boolean => {
    return selectedHospital !== undefined && test.id === selectedHospital.id
  }

  filterHospitals = (hospitals: Hospital[], searchTerm: string) => {
    const terms: string[] = searchTerm
      .toLowerCase()
      .split(" ")
      .filter((t) => t);
    return hospitals.filter((h: Hospital) =>
      terms.length === 0 || terms.find((term) => h.searchTerm.includes(term)) !==undefined
    );
  };

  fundingDeadlineComparator = (a: Hospital, b: Hospital): number => {
    const dateA = a.matchedRequest
      ? a.matchedRequest.fundingDeadline
      : undefined;
    const dateB = b.matchedRequest
      ? b.matchedRequest.fundingDeadline
      : undefined;
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
  };

  fundingLevelComparator = (a: Hospital, b: Hospital): number => {
    return a.fundingLevel - b.fundingLevel;
  };

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
  };

  getSortComparator = (filter: FilterType) => {
    if (!filter) {
      return () => 0;
    }
    return (a: Hospital, b: Hospital) =>
      (filter.sortDirection === sortDirection.DESCENDING ? -1 : 1) *
      this.lookupComparator(filter.sortBy)(a, b);
  };

  getDonationMessage = (hospital: Hospital) => {
    if (
      hospital.status === "active" &&
      hospital.matchedRequest &&
      hospital.matchedRequest.fundingDeadline
    ) {
      const currentDate = new Date();
      const deadlineDate = new Date(hospital.matchedRequest.fundingDeadline);
      const daysLeft = differenceInDays(deadlineDate, currentDate);
      return daysLeft > 0
        ? `${daysLeft} days left to donate!`
        : "Donations closed";
    }
    return "Donations closed";
  };
}

const hospitalService = new HospitalService();
export { hospitalService, HospitalService };
