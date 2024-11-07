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
  async combineHospitalInfoAndRequestAndFunded(
    filter?: FilterType
  ): Promise<Hospital[] | undefined> {
    return Promise.all([
      hospitalInfoService.getHospitalInfo(),
      hospitalRequestService.getHospitalRequest(),
      hospitalFundedService.getHospitalFunded(),
    ]).then((resps) => {
      return resps[0]
        .map((hi) => {
          const currentDate = new Date();
          const matchedRequest = resps[1].find(
            (hr) => hr.name[0] === hi.recordId
          );
          const matchedFund = resps[2].find(
            (hf) =>
              hf.hospitalRequestId ===
              (matchedRequest ? matchedRequest.recordId : undefined)
          );
          return {
            id: hi.id,
            hospitalInfoRecordId: hi.recordId,
            requestRecordId: matchedRequest
              ? matchedRequest.recordId
              : undefined,
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
            fundingDeadline: matchedRequest
              ? matchedRequest.fundingDeadline
              : "",
            requested: matchedRequest ? matchedRequest.requested : undefined,
            fundingCompleted: matchedFund
              ? matchedFund.fundingCompleted
              : undefined,
            status:
              currentDate >
              new Date(matchedRequest ? matchedRequest.fundingDeadline : "")
                ? "past"
                : "active",
          };
        })
        .filter((hospital) =>
          filter
            ? filter.location.length === 0
              ? filter.status.includes(hospital.status.toLowerCase())
              : (filter.location.includes(hospital.state?.toLowerCase()) ||
                  filter.location.includes(hospital.city.toLowerCase()) ||
                  filter.location.includes(hospital.zip.toLowerCase())) &&
                filter.status.includes(hospital.status.toLowerCase())
            : true
        ) as Hospital[];
    });
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
    sortDir: string
  ) => {
    let sortedHospitals;
    if (sortBy === "fundingDeadline") {
      sortedHospitals = hospitals?.sort((a, b) => {
        const dateA = new Date(a.fundingDeadline);
        const dateB = new Date(b.fundingDeadline);

        if (sortDir === sortDirection.DESCENDING) {
          return dateB.getTime() - dateA.getTime();
        } else {
          return dateA.getTime() - dateB.getTime();
        }
      });
    }
    if (sortBy === "hospitalName") {
      sortedHospitals = hospitals?.sort((a, b) => {
        if (sortDir === sortDirection.DESCENDING) {
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

        if (sortDir === sortDirection.DESCENDING) {
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
