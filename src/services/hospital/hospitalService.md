# Hospital Service API

Source: `src/services/hospital/hospitalService.ts`

## Exports

- `hospitalService`: singleton instance of `HospitalService`
- `HospitalService`: class export

## Class: `HospitalService`

### `transform(hi, matchedRequest, matchedFund, currentDate): Hospital`
- Builds a `Hospital` from `HospitalInfo`, `HospitalRequest`, and `HospitalFunded`.
- Computes:
  - `status` via `calcStatus`
  - `fundingLevel` via `calcFundingLevel`
  - `searchTerm` as lowercased `state.city.zip.country.name`
- Applies default campaign id: `"FUNTTHDCELT"` when `fundraiseUpCampaignId` is missing.

### `findAll(filter?): Promise<Hospital[]>`
- Loads:
  - `hospitalInfoService.findAll()`
  - `hospitalRequestService.findAll()`
  - `hospitalFundedService.findAll()`
- Matches request/funding records per hospital, transforms each record, applies filtering/sorting.
- Appends mock hospitals from `test/mockHospitals.json`.
- Returns only valid hospitals (`latitude` and `longitude` defined).

### `filterPredicate(filter): (hospital) => boolean`
- Filters by status (`filter.status`).
- Optional location filtering:
  - each location chip is split into tokens by spaces/commas
  - 2-letter tokens are treated as exact state-code matches
  - other tokens are matched against `hospital.searchTerm`
- Hospital matches when status matches and at least one chip’s tokens all match.

### `calcStatus(hospital, currentDate): string`
- Returns:
  - `"past"` if `currentDate` is after `matchedRequest.fundingDeadline`
  - `"active"` otherwise

### `calcFundingLevel(hospital): number`
- Returns `fundingCompleted / requested` when request + funded records exist and `requested` is non-zero.
- Returns `0` otherwise.

### `isHospitalOpen(hospital): boolean`
- Throws if hospital is `undefined`.
- Returns `true` when `hospital.status !== "past"`.

### `isEqual(test, selectedHospital): boolean`
- Returns `true` when `selectedHospital` exists and ids match.

### `filterHospitals(hospitals, searchTerm): Hospital[]`
- Splits search text by spaces and lowercases tokens.
- Returns hospitals where at least one token is found in `hospital.searchTerm`.

### `fundingDeadlineComparator(a, b): number`
- Sort comparator by `matchedRequest.fundingDeadline`.
- Hospitals missing a deadline sort before ones with deadlines.

### `hospitalNameComparator(a, b): number`
- Sort comparator by `name` (locale compare).

### `fundingLevelComparator(a, b): number`
- Sort comparator by numeric `fundingLevel`.

### `lookupComparator(sortBy)`
- Supported `sortBy` values:
  - `"fundingDeadline"`
  - `"fundingLevel"`
  - `"hospitalName"` (default)
- Returns the comparator function.

### `getSortComparator(filter)`
- Returns a comparator using:
  - `filter.sortBy`
  - `filter.sortDirection` (`ASC`/`DESC`)
- Returns no-op comparator when no filter is provided.

### `getDonationMessage(hospital): string`
- For active hospitals with a funding deadline:
  - returns `"{n} days left to donate!"` when `n > 0`
  - returns `"Donations closed"` otherwise
- Returns `"Donations closed"` in all other cases.

### `isValid(hospital): boolean`
- Returns `true` when both `latitude` and `longitude` are defined.

### `getCorporatePartner(hospital): CorporatePartner | undefined`
- Returns first corporate partner from `hospital.matchedRequest.corpPartners`.
- Returns `undefined` when unavailable.

### `getEuclideanDistanceNoRoot(lat1, lon1, lat2, lon2): number`
- Returns squared Euclidean distance: `(lat1-lat2)^2 + (lon1-lon2)^2`.
- Used for relative distance sorting without square root.

### `getSimilarProjects(hospital, hospitals): Hospital[]`
- Keeps only active hospitals with different ids.
- Adds computed `distanceSq` from target hospital.
- Sorts closest-first by `distanceSq`.

### `fundingStatusMessage(hospital): string`
- Returns formatted progress:
  - `"$<completed/1000>k raised (<percentage>%)"`
- Percentage is rounded from `calcFundingLevel(hospital) * 100`.

### `getFundingCompletedMessage(hospital): string`
- Returns:
  - `"$<fundingCompleted> raised of $<fundingRequested> - "`

### `getUSCurrencyString(amount, decimal?): string`
- Formats currency using `Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })`.
- Uses `decimal` for both min/max fraction digits (default `0`).
