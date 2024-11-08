export type FilterType = {
  location: string[];
  status: string[];
  sortBy: string;
  sortDirection:
    | sortDirection.ASCENDING
    | sortDirection.DESCENDING
    | sortDirection.UNDEFINED;
};

export enum sortDirection {
  ASCENDING = "asc",
  DESCENDING = "desc",
  UNDEFINED = "",
}
