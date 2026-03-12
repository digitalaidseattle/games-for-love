# Data Models Documentation

This document describes the core data models used throughout the Games for Love application.

## Hospital Models

### Hospital

The main model representing a hospital with complete information. This is a **merged model** combining data from HospitalInfo, HospitalRequest, and HospitalFunded.

**Source:** Created by `HospitalService.transform()`

| Field                   | Type            | Description                                                             |
| ----------------------- | --------------- | ----------------------------------------------------------------------- |
| `id`                    | string          | Unique identifier (from Airtable)                                       |
| `name`                  | string          | Hospital name                                                           |
| `type`                  | string          | Type of organization (e.g., "Hospital", "Clinic")                       |
| `description`           | string          | Organization notes or description                                       |
| `year`                  | number          | Number of kids served per year                                          |
| `country`               | string          | Country where hospital is located                                       |
| `state`                 | string          | State/province abbreviation (e.g., "CA", "NY")                          |
| `zip`                   | string          | ZIP/postal code                                                         |
| `city`                  | string          | City name                                                               |
| `address`               | string          | Full street address                                                     |
| `longitude`             | number          | Longitude coordinate for map placement                                  |
| `latitude`              | number          | Latitude coordinate for map placement                                   |
| `hospitalPictures`      | string[]        | URLs to hospital images (max 3, filtered)                               |
| `matchedRequest`        | HospitalRequest | Active funding request for this hospital                                |
| `matchedFunded`         | HospitalFunded  | Funding progress data                                                   |
| `status`                | string          | **"active"** (deadline not passed) or **"past"** (deadline passed)      |
| `fundingLevel`          | number          | Funding percentage as decimal (0-1): `fundingCompleted / requested`     |
| `searchTerm`            | string          | Denormalized search string: `"state.city.zip.country.name"` (lowercase) |
| `fundraiseUpCampaignId` | string?         | FundraiseUp campaign ID (defaults to "FUNTTHDCELT")                     |

### HospitalInfo

Hospital metadata and location information from the Hospital Reference table in Airtable.

**Source:** Airtable "Hospital Reference" table

| Field                   | Type     | Description                      |
| ----------------------- | -------- | -------------------------------- |
| `recordId`              | string   | Airtable record ID               |
| `id`                    | string   | Unique hospital identifier       |
| `name`                  | string   | Hospital organization name       |
| `type`                  | string   | Type of organization             |
| `description`           | string   | Organization notes from Airtable |
| `year`                  | number   | Kids served per year             |
| `country`               | string   | Country location                 |
| `state`                 | string   | State/province code              |
| `zip`                   | string   | ZIP/postal code                  |
| `city`                  | string   | City name                        |
| `address`               | string   | Full street address              |
| `longitude`             | number   | Longitude for mapping            |
| `latitude`              | number   | Latitude for mapping             |
| `hospitalPictures`      | string[] | Hospital images (max 3)          |
| `fundraiseUpCampaignId` | string?  | Optional FundraiseUp ID override |

### HospitalRequest

A hospital's equipment funding request from the Hospital Request Reference table.

**Source:** Airtable "Hospital Request Reference" table

| Field                     | Type                        | Description                       |
| ------------------------- | --------------------------- | --------------------------------- |
| `recordId`                | string                      | Airtable record ID                |
| `oppReqId`                | string                      | Hospital Request ID from Airtable |
| `name`                    | string \| string[]          | Linked hospital name(s)           |
| `requestNarrative`        | string                      | Detailed narrative about impact   |
| `titleRequestNarrative`   | string                      | Short title for maps/display      |
| `equipReq`                | string                      | Equipment being requested         |
| `requested`               | number                      | Dollar amount requested           |
| `fundingDeadline`         | Date \| string \| undefined | Deadline for funding              |
| `kids3Y`                  | number                      | Kids served in past 3 years       |
| `play3Y`                  | number                      | Kids who can play with equipment  |
| `collected`               | string?                     | Dollar amount collected so far    |
| `funders`                 | string?                     | Number of funders                 |
| `requestPictures`         | string[]                    | Request-related images (max 5)    |
| `corpPartners`            | CorporatePartner[]          | Corporate partners (max 2)        |
| `fundraiseUpCampaignId`   | string?                     | FundraiseUp campaign ID           |
| `active`                  | boolean                     | Publicly visible on map           |
| `fundraiseUpCampaignCode` | string?                     | FundraiseUp campaign code         |

### HospitalFunded

Funding progress and outcomes for a completed request from the Hospital Funded Reference table.

**Source:** Airtable "Hospital Funded Reference" table

| Field               | Type     | Description                           |
| ------------------- | -------- | ------------------------------------- |
| `id`                | string   | Airtable record ID                    |
| `hospitalRequestId` | string   | Reference to HospitalRequest.recordId |
| `hospital`          | string   | Hospital fundraising ID               |
| `orderID`           | string   | Equipment order ID                    |
| `equipmentShipped`  | number   | Quantity of items shipped             |
| `fundingCompleted`  | number   | Total dollar amount funded            |
| `funders`           | string   | Number of individual funders          |
| `corporateFunding`  | string?  | Corporate funding amount/description  |
| `thankYouNote`      | string   | Full thank you note from hospital     |
| `fundedPictures`    | string[] | Thank you photos (max 5)              |
| `impactPictures`    | string[] | Impact photos showing use (max 5)     |
| `shortThankYou`     | string   | Short quote for map display           |
| `thankYouNoteTitle` | string   | Title for thank you section           |
| `impactTitle`       | string   | Title for impact section              |
| `impactText`        | string   | Detailed impact description           |

## Supporting Models

### CorporatePartner

Corporate partner or funder information.

| Field         | Type    | Description                                     |
| ------------- | ------- | ----------------------------------------------- |
| `name`        | string  | Company/partner name                            |
| `logo`        | string  | URL or path to logo image                       |
| `type`        | string  | Partner type (e.g., "Matching Gift", "Sponsor") |
| `description` | string? | Optional partnership description                |
| `match`       | number? | Optional matching gift amount                   |

### Location

Geographic location with coordinates.

| Field       | Type   | Description                            |
| ----------- | ------ | -------------------------------------- |
| `name`      | string | Location name (city, region, landmark) |
| `latitude`  | number | Latitude coordinate                    |
| `longitude` | number | Longitude coordinate                   |

### PopupInfo

Data structure for hospital popup on the map.

| Field      | Type     | Description                       |
| ---------- | -------- | --------------------------------- |
| `hospital` | Hospital | Hospital data to display in popup |

### GeneralInfo

Site-wide aggregate information from the General Info table.

**Source:** Airtable "General Info Reference" table

| Field                       | Type               | Description                                   |
| --------------------------- | ------------------ | --------------------------------------------- |
| `id`                        | string             | Airtable record ID                            |
| `status`                    | string             | Status indicator (e.g., "active")             |
| `totalOpen`                 | number             | Total unfunded request amount                 |
| `totalFunded`               | number             | Total funded amount across all hospitals      |
| `fundraiseUpCampaignId`     | string             | FundraiseUp campaign ID for general donations |
| `fundraiseUpOrganizationId` | string             | FundraiseUp organization ID                   |
| `corpPartners`              | CorporatePartner[] | Site-wide corporate partners (max 3)          |

## Data Flow

```
Airtable Tables
    ↓
Services (transform to models)
    ├── HospitalInfoService → HospitalInfo[]
    ├── HospitalRequestService → HospitalRequest[]
    ├── HospitalFundedService → HospitalFunded[]
    └── GeneralInfoService → GeneralInfo[]
    ↓
HospitalService.transform()
    ↓
Hospital[] (merged models)
    ↓
Contexts & Components
```

## Key Relationships

- **Hospital** combines one **HospitalInfo** + one **HospitalRequest** + one **HospitalFunded**
- **Hospital.matchedRequest** links to **HospitalRequest** via hospital name matching
- **Hospital.matchedFunded** links to **HospitalFunded** via request recordId
- **HospitalRequest** can have up to 2 **CorporatePartner** records
- **GeneralInfo** contains global **CorporatePartner** records (up to 3)
