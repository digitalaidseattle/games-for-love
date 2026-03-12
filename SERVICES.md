# Services Layer Documentation

This document describes the service classes that handle data transformation, filtering, and business logic.

## Architecture

The service layer is responsible for:

1. **Fetching data** from Airtable via HTTP
2. **Transforming data** from Airtable format to application models
3. **Business logic** like filtering, sorting, and status calculations

```
Airtable API
    ↓
AirtableService (generic table fetching)
    ↓
Specialized Services (HospitalInfoService, etc.)
    ├── transform() — Convert Airtable record to model
    └── findAll() — Fetch and transform all records
    ↓
HospitalService (orchestration)
    ├── findAll(filter?) — Fetch all, transform, filter, sort
    ├── calcStatus() — Determine active/past
    ├── calcFundingLevel() — Calculate % funded
    └── filterPredicate(filter) — Apply filters
    ↓
Application Context/Components
```

## Service Classes

### HospitalInfoService

Fetches and transforms hospital metadata from Airtable.

**File:** `src/services/hospitalInfo/hospitalInfoService.ts`

**Methods:**

| Method              | Return         | Description                                         |
| ------------------- | -------------- | --------------------------------------------------- |
| `transform(record)` | HospitalInfo   | Converts Airtable record to HospitalInfo model      |
| `findAll()`         | HospitalInfo[] | Fetches all hospitals from Hospital Reference table |

**Airtable Mappings:**

- Reads from `VITE_AIRTABLE_TABLE_HOSPITAL_REFERENCE` table
- Maps Airtable fields: Hospital Name, Type, Description, Coordinates, etc.
- Extracts up to 3 hospital pictures from attachments
- Max records: 100

---

### HospitalRequestService

Fetches and transforms hospital funding requests from Airtable.

**File:** `src/services/hospitalRequest/hospitalRequestService.ts`

**Methods:**

| Method              | Return            | Description                                                |
| ------------------- | ----------------- | ---------------------------------------------------------- |
| `transform(record)` | HospitalRequest   | Converts Airtable record to HospitalRequest model          |
| `findAll()`         | HospitalRequest[] | Fetches all requests from Hospital Request Reference table |

**Airtable Mappings:**

- Reads from `VITE_AIRTABLE_TABLE_HOSPITAL_REQUEST_REFERENCE` table
- Extracts hospital name links, equipment description, funding goal, deadline
- Parses funding deadline to Date object
- Extracts up to 5 request pictures and 2 corporate partners
- Max records: 100

---

### HospitalFundedService

Fetches and transforms funding progress data from Airtable.

**File:** `src/services/hospitalFunded/hospitalFundedService.ts`

**Methods:**

| Method              | Return           | Description                                                     |
| ------------------- | ---------------- | --------------------------------------------------------------- |
| `transform(record)` | HospitalFunded   | Converts Airtable record to HospitalFunded model                |
| `findAll()`         | HospitalFunded[] | Fetches all funded records from Hospital Funded Reference table |

**Airtable Mappings:**

- Reads from `VITE_AIRTABLE_TABLE_HOSPITAL_FUNDED_REFERENCE` table
- Extracts funding amount, funder count, order ID
- Includes up to 5 thank you pictures and 5 impact pictures
- Max records: 100

---

### GeneralInfoService

Fetches site-wide aggregate information and corporate partners.

**File:** `src/services/generalInfo/generalInfoService.ts`

**Methods:**

| Method                       | Return        | Description                                              |
| ---------------------------- | ------------- | -------------------------------------------------------- |
| `transform(record)`          | GeneralInfo   | Converts Airtable record to GeneralInfo model            |
| `findAll()`                  | GeneralInfo[] | Fetches aggregate data from General Info Reference table |
| `hasCorporateSponsors(info)` | boolean       | Checks if GeneralInfo has corporate partners             |

**Special Notes:**

- Contains `TEST_PARTNER` constant with test data (Microsoft, Starbucks)
- Max records: 100

---

### HospitalService

**THE MAIN ORCHESTRATION SERVICE** — Fetches from multiple services, merges data, filters, and sorts.

**File:** `src/services/hospital/hospitalService.ts`

**Key Methods:**

#### `async findAll(filter?: FilterType): Hospital[]`

The main entry point. Orchestrates the complete hospital loading pipeline.

**Steps:**

1. Fetches HospitalInfo[], HospitalRequest[], and HospitalFunded[] in parallel
2. Merges them by matching request names to hospital recordIds
3. Transforms each matched triple into a Hospital object
4. Applies filter predicate (status + location)
5. Applies sort comparator
6. Concatenates mock hospitals for development
7. Returns filtered, sorted Hospital[]

**Example:**

```javascript
const hospitals = await hospitalService.findAll({
  location: ["CA", "seattle"],
  status: ["active"],
  sortBy: "fundingDeadline",
  sortDirection: "desc",
});
```

#### `transform(hi, matchedRequest, matchedFund, currentDate): Hospital`

Merges HospitalInfo, HospitalRequest, and HospitalFunded into complete Hospital object.

**Calculations:**

- `status` — Calls `calcStatus()`
- `fundingLevel` — Calls `calcFundingLevel()`
- `searchTerm` — Creates denormalized search string: `"state.city.zip.country.name"` (lowercase)
- `fundraiseUpCampaignId` — Uses hospital-specific or defaults to `"FUNTTHDCELT"`

#### `calcStatus(hospital, currentDate): "active" | "past"`

Determines if a hospital's request is still open or deadline passed.

**Logic:**

```javascript
if (fundingDeadline exists && currentDate > fundingDeadline)
  return "past"
else
  return "active"
```

#### `calcFundingLevel(hospital): number`

Calculates funding progress as decimal (0-1).

**Formula:**

```
fundingLevel = fundingCompleted / requested
```

Returns 0 if no matching request/funding.

#### `filterPredicate(filter): (hospital) => boolean`

Returns a filter function based on FilterType criteria.

**Filtering Logic:**

- **Status:** Hospital status must be in filter.status array
- **Location:** If location filters provided, hospital must match at least one location group
  - Location can be: state code (2 letters), city name, or zip code
  - Multiple terms separated by spaces/commas are treated as AND
  - Different location groups are treated as OR
  - Searches against hospital.searchTerm denormalized field

**Example Filters:**

```javascript
// Find hospitals in CA
{location: ["CA"], status: ["active"]}

// Find hospitals in CA or Washington
{location: ["CA", "WA"], status: ["active"]}

// Find hospitals in Seattle, CA
{location: ["seattle CA"], status: ["active"]}
```

#### Sorting Methods

- `fundingDeadlineComparator` — Sort by deadline (earliest first)
- `fundingLevelComparator` — Sort by % funded (lowest first)
- `hospitalNameComparator` — Sort alphabetically

#### Utility Methods

- `isHospitalOpen(hospital): boolean` — Returns true if status !== "past"
- `isEqual(test, selected): boolean` — Compares two hospitals by ID
- `filterHospitals(hospitals, searchTerm): Hospital[]` — Search by term against searchTerm field

---

### AirtableService

Low-level service for fetching records from any Airtable table.

**File:** `src/mapping/airtableService.ts`

**Methods:**

| Method              | Params                                 | Return    | Description                          |
| ------------------- | -------------------------------------- | --------- | ------------------------------------ |
| `getTableRecords()` | tableId, maxRecords?, filterByFormula? | Records[] | Fetches records from specified table |

**Parameters:**

- `tableId` — Airtable table ID (from environment variables)
- `maxRecords` — Maximum records to fetch (default: 100)
- `filterByFormula` — Optional Airtable filter formula

**Note:** No pagination support yet. Max 100 records per table.

---

### SiteService

Utility service for site-specific logic.

**File:** `src/services/siteUtils.ts`

**Methods:**

| Method                     | Description                                    |
| -------------------------- | ---------------------------------------------- |
| `extractUrls(attachments)` | Extracts URLs from Airtable attachment objects |

**Properties:**

- `DEFAULT_VIEW` — Default map view coordinates

---

### DonationService

Handles donation logic and currency conversions.

**File:** `src/services/donationService.ts`

**Type:** Currency

```javascript
{
  value: "USD" | "EUR" | "BTC" | "JPY",
  label: "$" | "€" | "฿" | "¥",
  exchange: number // conversion rate
}
```

**Currencies Supported:**

- USD (1.0)
- EUR (1.2)
- BTC (0.001)
- JPY (0.01)

**Methods:**

- `donate(opts)` — Initiates donation (currently shows alert)
- `convert(amount, currency)` — Converts amount using exchange rate

---

## Filter Type Reference

```typescript
type FilterType = {
  location: string[]; // Location filters
  status: FilterStatus[]; // "active" | "past"
  sortBy: SortBy; // "fundingDeadline" | "fundingLevel" | "hospitalName"
  sortDirection: sortDirection; // "asc" | "desc" | ""
};

enum FilterStatus {
  ACTIVE = "active",
  PAST = "past",
}

enum SortBy {
  FUNDING_DEADLINE = "fundingDeadline",
  FUNDING_LEVEL = "fundingLevel",
  HOSPITAL_HOME = "hospitalName",
}

enum sortDirection {
  ASCENDING = "asc",
  DESCENDING = "desc",
  UNDEFINED = "",
}
```

## Data Fetching Pipeline

```
App mounts
    ↓
hospitalService.findAll() called
    ↓
Parallel fetch:
  - hospitalInfoService.findAll() → HospitalInfo[]
  - hospitalRequestService.findAll() → HospitalRequest[]
  - hospitalFundedService.findAll() → HospitalFunded[]
    ↓
Merge by matching:
  - Match request.name[0] to hospitalInfo.recordId
  - Match funded.hospitalRequestId to request.recordId
    ↓
Transform to Hospital[]
    ↓
Apply filters & sort
    ↓
Add mock data (for development)
    ↓
Return filtered Hospital[]
    ↓
Store in HospitalsContext
    ↓
Components render with filtered hospitals
```

## Performance Notes

- **Parallel loading:** All three service.findAll() calls run in parallel using Promise.all()
- **Merged data:** Hospital model combines data from 3 Airtable tables
- **In-memory filtering:** Hospitals stored in memory, filter/sort happens client-side
- **Denormalized search:** searchTerm field enables fast string-based filtering
- **Max 100 records:** Current implementation limited to 100 records per table (no pagination)
