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
import {
  FilterStatus,
  FilterType,
  sortDirection,
} from "../../types/fillterType";
import { hospitalFundedService } from "../hospitalFunded/hospitalFundedService";
import { hospitalInfoService } from "../hospitalInfo/hospitalInfoService";
import { hospitalRequestService } from "../hospitalRequest/hospitalRequestService";
import { CorporatePartner } from "../../models/corporatePartner";
import MOCK_HOSPITALS from '../../../test/mockHospitals.json';


class HospitalService {
  transform(
    hi: HospitalInfo,
    matchedRequest: HospitalRequest,
    matchedFund: HospitalFunded,
    currentDate: Date
  ): Hospital {
    const DEFAULT_FUNDRAISEUP_CAMPAIGN_ID = "FUNTTHDCELT"; // default fundraiseup ID
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
      fundraiseUpCampaignId:
        hi.fundraiseUpCampaignId || DEFAULT_FUNDRAISEUP_CAMPAIGN_ID,
    } as Hospital;
    hospital.status = this.calcStatus(hospital, currentDate);
    hospital.fundingLevel = this.calcFundingLevel(hospital);
    hospital.searchTerm = `${hospital.state?.toLowerCase()}.${hospital.city?.toLowerCase()}.${hospital.zip?.toLowerCase()}.${hospital.country?.toLowerCase()}.${hospital.name?.toLowerCase()}`;
    return hospital;
  }

  async findAll(filter?: FilterType): Promise<Hospital[]> {
    const currentDate = new Date();
    return Promise.all([
      hospitalInfoService.findAll(),
      hospitalRequestService.findAll(),
      hospitalFundedService.findAll(),
    ]).then((resps) => {
      const hospitals = resps[0]
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
      // Adding mock data here
      return hospitals
        .concat(MOCK_HOSPITALS)
        .filter(h => this.isValid(h));
    });
  }

  filterPredicate(filter: FilterType) {
    return (hospital: Hospital) => {
      if (!filter) return true;
  
      const matchesStatus = filter.status.includes(
        hospital.status.toLowerCase() as FilterStatus
      );
  
      if (!filter.location || filter.location.length === 0) return matchesStatus;
  
      const locationGroups = filter.location
        .map((chip) =>
          chip
            .toLowerCase()
            .split(/[\s,]+/)
            .map((t) => t.trim())
            .filter(Boolean)
        )
        .filter((chipTokens) => chipTokens.length > 0);
  
      const matchesLocation =
        locationGroups.length === 0 ||
        locationGroups.some((chipTokens) =>
          chipTokens.every((t) => hospital.searchTerm?.includes(t))
        );
  
      return matchesStatus && matchesLocation;
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
      return hospital.matchedRequest.requested
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

  isEqual = (
    test: Hospital,
    selectedHospital: Hospital | undefined
  ): boolean => {
    return selectedHospital !== undefined && test.id === selectedHospital.id;
  };

  filterHospitals = (hospitals: Hospital[], searchTerm: string) => {
    const terms: string[] = searchTerm
      .toLowerCase()
      .split(" ")
      .filter((t) => t);
    return hospitals.filter(
      (h: Hospital) =>
        terms.length === 0 ||
        terms.find((term) => h.searchTerm.includes(term)) !== undefined
    );
  };

  fundingDeadlineComparator = (a: Hospital, b: Hospital): number => {
    const dateA = a.matchedRequest
      ? a.matchedRequest.fundingDeadline as Date
      : undefined;
    const dateB = b.matchedRequest
      ? b.matchedRequest.fundingDeadline as Date
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

  isValid = (hospital: Hospital): boolean => {
    return hospital.latitude !== undefined && hospital.longitude !== undefined;
  };

  getCorporatePartner = (hospital: Hospital): CorporatePartner | undefined => {
    if (hospital) {
      if (hospital.matchedRequest) {
        if (hospital.matchedRequest.corpPartners) {
          if (hospital.matchedRequest.corpPartners.length > 0) {
            return hospital.matchedRequest.corpPartners[0];
          }
        }
      }
    }
    return undefined;
  };

  // Below is the euclidean formula to calculate distance between two points
  // We are omitting the square root to keep the function simple
  // Since we care about relative distances for sorting purposes
  // if a<b  then √a < √b so sorting by squared distance or true distance gives the same result
  getEuclideanDistanceNoRoot = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    return (lat1 - lat2) * (lat1 - lat2) + (lon1 - lon2) * (lon1 - lon2);
  };

  getSimilarProjects(hospital: Hospital, hospitals: Hospital[]): Hospital[] {
    return hospitals
      .filter((h) => h.status.toLowerCase() === "active" && h.id !== hospital?.id) // Excluding current
      .map((h) => ({
        ...h,
        distanceSq: hospitalService.getEuclideanDistanceNoRoot(
          hospital.latitude ?? 0,
          hospital.longitude ?? 0,
          h.latitude ?? 0,
          h.longitude ?? 0
        ),
      }))
      .sort((a, b) => a.distanceSq - b.distanceSq) // Closest first
  }

  fundingStatusMessage(hospital: Hospital) {
    const percentage = Math.round(this.calcFundingLevel(hospital) * 100);
    return `${this.getUSCurrencyString(hospital.matchedFunded?.fundingCompleted! / 1000, 2)}k raised (${percentage}%)`;
  }

  getFundingCompletedMessage(hospital: Hospital): string {
    const fundingCompleted = this.getUSCurrencyString(hospital.matchedFunded?.fundingCompleted || 0);
    const fundingRequested = this.getUSCurrencyString(hospital.matchedRequest?.requested || 0);
    return `${fundingCompleted} raised of ${fundingRequested} - `
  }

  getUSCurrencyString(amount: number, decimal?: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: decimal ?? 0,
      maximumFractionDigits: decimal ?? 0,
    }).format(amount);
  }
}

const hospitalService = new HospitalService();
export { hospitalService, HospitalService };
