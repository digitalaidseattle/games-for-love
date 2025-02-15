export type FilterType = {
  location: string[];
  status: FilterStatus[];
  sortBy: SortBy;
  sortDirection:
    | sortDirection.ASCENDING
    | sortDirection.DESCENDING
    | sortDirection.UNDEFINED;
};

export enum FilterStatus {
  ACTIVE = "active",
  PAST = "past"
}

export enum SortBy {
  FUNDING_DEADLINE = "fundingDeadline",
  FUNDING_LEVEL = "fundingLevel",
  HOSPITAL_HOME = "hospitalName",
}

export enum sortDirection {
  ASCENDING = "asc",
  DESCENDING = "desc",
  UNDEFINED = "",
}
