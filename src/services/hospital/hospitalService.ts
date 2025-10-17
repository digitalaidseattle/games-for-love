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

export const TEST_DONATION_HOSPTIAL = {
  address: "149 Thomas Dr",
  city: "Gadsden",
  country: "USA",
  description: "Eagle Rock Boys’ Home is a residential facility providing care and support to boys facing behavioral, emotional, or family challenges. Th…",
  fundingLevel: 0,
  fundraiseUpCampaignId: "FUNTTHDCELT",
  hospitalPictures: ["https://v5.airtableusercontent.com/v3/u/45/45/1757…Qxatv/yHdcua6KxO_KaILbkozW7yMdBKwaS_AcKIZxJjN-71A", "https://v5.airtableusercontent.com/v3/u/45/45/1757…7JnJF/gjaPUR-40rh9f-bPRMH9dEZ2aOEIgV0HzDErukRptBg", "https://v5.airtableusercontent.com/v3/u/45/45/1757…7JnJF/gjaPUR-40rh9f-bPRMH9dEZ2aOEIgV0HzDErukRptBg"],
  id: "recA4OgEi7CeYSNjf-test" + Math.random() * 100,
  latitude: 33.99793855437296,
  longitude: -86.0695,
  matchedFunded: {
    corporateFunding: 'undefined',
    equipmentShipped: 1,
    fundedPictures: ["https://v5.airtableusercontent.com/v3/u/45/45/1758945600000/e5lKdKKcrMAWc-IF1D1XBQ/EJ27sRGeaewx0ba2nxHC6VfkGIjVwF51ypOelBZSPLQhSocgm5rjiJtCDXJLIR89k49pKdSDxhTCu9fgi62jyFHCD8tbw0M1BKYhAhOCSenpVw1Q3ECyFI6yUUGDs-JNYhr6BKeLA2thcQmBZt-mnX2_ZnxgjntzCY-G0r7Xa9s/tJIQNFvKUnD05yXwmn3F1W-v6qXgONLfTQYgtiD4s5U", "https://v5.airtableusercontent.com/v3/u/45/45/1757…nCzRQ/6BCifc8ftqMR99OLU003gMIQS7SXNrgcSMaa0az7ZIw", "https://v5.airtableusercontent.com/v3/u/45/45/1757…XJwWI/LsLCIGHOcj_AKx6pxvf7e7th1uqgB1B4zZxk0-UaUEw", "https://v5.airtableusercontent.com/v3/u/45/45/1757…hbtUE/cnmj8EVwUkoM_vFwUJoUSVe5Q65JJ4twLW49fm1cITg", "https://v5.airtableusercontent.com/v3/u/45/45/1757…hbtUE/cnmj8EVwUkoM_vFwUJoUSVe5Q65JJ4twLW49fm1cITg"],
    funders: "224",
    fundingCompleted: 5000,
    fundingDeadline: undefined,
    hospital: "Eagle Rock Boy's Home",
    hospitalRequestId: "recplJAZsy4Bnbp4W",
    id: "rec94ZrE1t7hs2NS4",
    impactPictures: [
      "https://v5.airtableusercontent.com/v3/u/45/45/1759003200000/8a8rVtF4CrbEy0naFsCB7A/CQlTZF3sIb44LEY-vad6dvqtBmzl2qZ12wCNY_Zkh3AD72y5HSRI0QiUBZlJ9t_Wl6cCTTAPArF92uqgykR2SWbSqPfoQCarnGBNZyngKqWV3r_oxBN4uWFdZlJOUd5sENo_x6A04lr88Yd_bJCH94iDQxZgHlUNe7V9PdD7tGQ70kV9tt5mAcVcuczUkFHz/PiDwNrYymxKdrakI0uzX0nyZ-r23mMt1OBRCAkPtr1Y",
      "https://v5.airtableusercontent.com/v3/u/45/45/1759003200000/oTPFwDEOLuzSFZYRiDj5-Q/asKN2dt3SV8bbuoK-bh4jgk7Pvs2ul1TIPbUiPQW0vb8lOsE0mSo0LpXzk23LaypjH6B9t8T4-gl8U9rHapnPw_u15uBYZmHV-rVVg2d18ymZ0eAOnm3ysRJeI2W60Wt0WyHiGvHC9Ta2AqurozrzzkdNn3ayUgVikwPwleMa7kuekGTLncul8vv-VNSRe9AWi3bApfAxpPWp3cjHHCI71fIP2DvafDYtxKqqZGV-qFSIjTo0pxJQPpm7NC1sQSr/9AwE01_ugLygy-99GQRRv2D2ipw3KLmoQRNfc4z_qMM",
      "https://v5.airtableusercontent.com/v3/u/45/45/1759003200000/EWBfqDDOoVtR3hlNkKTGXg/Ke52JHHn50h0fAqnnf6PzYXG5PmoGkZUTXYKlouJBYdUeJO1TX9m735olOHxAfopkXnMEpzEc4XMZm_lpaUM9ZfR_8wQY4KapcDe5jGcX5f3a7YDRoD-B3Ifd4B51ArD3cfktYy4XjpdGrDHaXhP4A/svJz_5KYu5BaZz7lkTBv8XlijFdtn1fl-4Ty8TBbfTg",
      "https://v5.airtableusercontent.com/v3/u/45/45/1757…hbtUE/cnmj8EVwUkoM_vFwUJoUSVe5Q65JJ4twLW49fm1cITg",
      "https://v5.airtableusercontent.com/v3/u/45/45/1759003200000/HNVZRdKIamD0GZQ36tcJqQ/R-wRU9Kzw526b2k5F_7xPiCbJM1-gNxvNcUCDL5nXtY_iHhjrLVmBSB8DtQKm_6ly7KXX2-VA3tB5QiQMaQXOnUboCmJR0O21fryxobzwDx-S5NvwWIWtjgwpixweRaZfKPyCh8irNNNDB_R9g64IA/lAQzgek0vHPc9PnLujCicpOtZRbES5MM-jlGsP4_byk"],
    impactText: "At Eagle Rock Boys' Home, the gaming systems you’ve provided will impact over 50 boys annually, giving them a much-needed outlet fo…",
    impactTitle: "Gaming Brings Fun and Support to Eagle Rock Boys",
    orderID: "undefined",
    shortThankYou: "Thank you for bringing joy and connection to Eagle Rock boys!",
    thankYouNote: "Thanks to your incredible generosity, the boys at Eagle Rock now have access to gaming consoles that bring joy and connection into thei…",
    thankYouNoteTitle: "Thank You from Eagle Rock Boys' Home",
  },
  matchedRequest: {
    active: true,
    collected: 'undefined',
    corpPartners: [],
    equipReq: "1",
    funders: 'funders',
    fundingDeadline: new Date(),
    fundraiseUpCampaignCode: undefined,
    fundraiseUpCampaignId: 'balh',
    id: "recplJAZsy4Bnbp4W",
    kids3Y: 3000,
    name: "recA4OgEi7CeYSNjf",
    oppReqId: "Eagle Rock Boy's Home_12/31/2023",
    play3Y: '5000',
    recordId: "recplJAZsy4Bnbp4W",
    requestNarrative: "At Eagle Rock Boys' Home, we provide a safe and supportive environment for boys facing emotional and behavioral challenges. Introducin…",
    requestPictures: [],
    requested: 15000,
    titleRequestNarrative: "Gaming Gear to Support Boys at Eagle Rock"
  },
  name: "Eagle Rock Boy's Home (TEST)",
  searchTerm: "al.gadsden.usa.eagle rock boy's home",
  state: "AL",
  status: "active",
  type: "Support Facility",
  year: 2025,
  zip: "35904"
}

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
      if (import.meta.env.MODE === 'development') {
        hospitals.push(TEST_DONATION_HOSPTIAL);
        hospitals.push(TEST_DONATION_HOSPTIAL);
        hospitals.push(TEST_DONATION_HOSPTIAL);
        hospitals.push(TEST_DONATION_HOSPTIAL);
        hospitals.push(TEST_DONATION_HOSPTIAL);
      }
      return hospitals;
    });
  }

  filterPredicate(filter: FilterType) {
    return (hospital: Hospital) => {
      if (!filter) {
        return true;
      }
      if (filter.location.length === 0) {
        return filter.status.includes(
          hospital.status.toLowerCase() as FilterStatus
        );
      }
      const lowerLocations = filter.location.map((l) => l.toLowerCase());
      return (
        // this would allow partial (e.g. sea will find for Seattle Hospitals)
        // lowerLocations.find(l => hospital.searchTerm.includes(l)) &&
        (lowerLocations.includes(hospital.state?.toLowerCase()) ||
          lowerLocations.includes(hospital.city.toLowerCase()) ||
          lowerLocations.includes(hospital.zip.toLowerCase())) &&
        filter.status.includes(hospital.status.toLowerCase() as FilterStatus)
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
}

const hospitalService = new HospitalService();
export { hospitalService, HospitalService };
