# Architecture Overview

This document provides a high-level overview of the Games for Love application architecture, data flow, and component structure.

## Application Purpose

Games for Love is an interactive web application that visualizes hospital locations and their equipment funding needs on a global map. Users can:

- Browse hospitals by location and funding status
- View hospital details, funding requests, and impact stories
- Donate to specific hospitals or general funding
- Filter and sort hospitals by various criteria

The app is embedded in a website via iframe for the Games for Love organization.

---

## High-Level Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        AIRTABLE                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  • Hospital Reference (metadata, coordinates)             │  │
│  │  • Hospital Request Reference (funding needs, deadlines)  │  │
│  │  • Hospital Funded Reference (thank yous, impact)         │  │
│  │  • General Info Reference (totals, partners)              │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
                 ┌────────────────┐
                 │  AirtableAPI   │
                 │  (via fetch)   │
                 └────────┬───────┘
                          │
         ┌────────────────┼────────────────┐
         │                │                │
         ↓                ↓                ↓
   ┌─────────────┐ ┌─────────────┐ ┌────────────────┐
   │  Hospital   │ │  Hospital   │ │   Hospital     │
   │  InfoService│ │  Request    │ │   Funded       │
   │             │ │  Service    │ │   Service      │
   └──────┬──────┘ └──────┬──────┘ └────────┬───────┘
          │                │                │
          └────────┬───────┴────────┬───────┘
                   │                │
                   ↓                ↓
            ┌──────────────────────────────┐
            │  HospitalService             │
            │  (Merge, Filter, Sort)       │
            └┬─────────────────────────────┘
             │
             ↓
    ┌─────────────────────┐
    │  Hospital[] Data    │
    │ (Merged Models)     │
    └──────────┬──────────┘
               │
    ┌──────────┴──────────────┐
    │                         │
    ↓                         ↓
┌─────────────────┐  ┌──────────────────┐
│ HospitalsContext│  │ FilterContext    │
│ (cached data)   │  │ (filter prefs)   │
└────────┬────────┘  └────────┬─────────┘
         │                    │
         └────────┬───────────┘
                  │
             ┌────┴─────────┬──────────────────┐
             │              │                  │
             ↓              ↓                  ↓
        ┌─────────┐  ┌────────────┐  ┌──────────────┐
        │ GFLMap  │  │  Hospital  │  │   Search &   │
        │ (visual)│  │   Cards    │  │   Sort UI    │
        └─────────┘  │ (list)     │  └──────────────┘
                     └────────────┘

         User Interactions
        (click, filter, donate, etc)
```

---

## Folder Structure

```
src/
├── App.tsx                          # Main app component (responsive layout)
├── main.tsx                         # Entry point, providers setup
├── components/                      # React components
│   ├── GFLMap.tsx                  # Mapbox map component
│   ├── SearchAndSort.tsx           # Filter/sort UI dispatcher
│   ├── SearchAndSortDesktop.tsx    # Desktop search/sort implementation
│   ├── SearchAndSortMobile.tsx     # Mobile search/sort implementation
│   ├── HospitalCardDetails.tsx     # Individual hospital card
│   ├── DonateOverlay.tsx           # Donation modal
│   ├── FilterDialog.tsx            # Filter options dialog
│   ├── HospitalCardDetails.tsx     # Hospital summary card
│   ├── HospitalCardDetails.tsx     # Hospital summary card
│   ├── HospitalPage/               # Hospital detail page components
│   │   ├── HospitalPageMain.tsx
│   │   ├── HospitalPageContent.tsx
│   │   ├── HospitalPageCarousel.tsx
│   │   ├── ActiveHospitalRequestCarousel.tsx
│   │   ├── DonationBar.tsx
│   │   └── ... (other detail components)
│   ├── GFLPopup.tsx                # Map popup
│   ├── LearnMoreOverlay.tsx        # Learn more modal
│   ├── SponsorPanel.tsx            # Corporate sponsors
│   ├── WebGLBlockedBanner.tsx      # WebGL support warning
│   ├── cards/
│   │   └── HospitalCard.tsx        # Hospital card styles
│   └── ... (other components)
│
├── services/                        # Business logic & data transformation
│   ├── hospital/
│   │   └── hospitalService.ts      # Main orchestration service
│   ├── hospitalInfo/
│   │   └── hospitalInfoService.ts  # Hospital metadata service
│   ├── hospitalRequest/
│   │   └── hospitalRequestService.ts  # Funding request service
│   ├── hospitalFunded/
│   │   └── hospitalFundedService.ts   # Funding progress service
│   ├── generalInfo/
│   │   └── generalInfoService.ts   # Site stats service
│   ├── donationService.ts          # Donation logic
│   ├── fundraiseUp.ts              # FundraiseUp widget integration
│   └── siteUtils.ts                # Utility functions
│
├── mapping/                         # Airtable integration
│   ├── airtableClient.ts           # Airtable API client
│   └── airtableService.ts          # Generic Airtable table fetching
│
├── context/                         # React Context providers
│   ├── HospitalContext.tsx         # Hospital list state
│   ├── SelectedHospitalContext.tsx # Selected hospital state
│   ├── FilterContext.tsx           # Filter preferences
│   ├── LoadingContext.tsx          # Loading indicator
│   ├── DonationContext.tsx         # Donation modal state
│   ├── GeneralInfoContext.tsx      # Site statistics
│   ├── HospitalInfoContext.tsx     # Hospital metadata cache
│   ├── HospitalRequestContext.tsx  # Request data cache
│   ├── HospitalFundedContext.tsx   # Funding data cache
│   └── DrawerWidthContext.tsx      # Sidebar width state
│
├── models/                          # TypeScript type definitions
│   ├── hospital.ts                 # Hospital merged model
│   ├── hospitalInfo.ts             # Hospital metadata model
│   ├── hospitalRequest.ts          # Funding request model
│   ├── hospitalFunded.ts           # Funding progress model
│   ├── generalInfo.ts              # Site stats model
│   ├── corporatePartner.ts         # Partner data model
│   ├── location.ts                 # Geographic location
│   ├── popupInfo.ts                # Popup data
│   └── teamMember.ts               # Team member data
│
├── types/                           # Utility types
│   ├── fillterType.ts              # Filter enums (note: filename typo)
│   └── dialogProps.ts              # Dialog component props
│
├── styles/                          # Styling
│   ├── theme.ts                    # MUI theme colors
│   ├── ActionButton.tsx            # Reusable button styles
│   ├── DialogCloseButton.tsx       # Dialog close button
│   ├── EmphasizedText.tsx          # Text styling
│   └── ToolbarButton.tsx           # Toolbar button styles
│
├── utils/                           # Utility functions
│   ├── dateUtils.ts                # Date manipulation
│   ├── dateUtils.test.ts           # Date utils tests
│   └── webglSupport.ts             # WebGL capability check
│
├── providers/
│   └── Providers.tsx               # Context provider wrapper
│
├── assets/                          # Static assets
├── App.css                          # Global app styles
├── index.css                        # Global styles
└── vite-env.d.ts                   # Vite config types
```

---

## Component Structure

### Responsive Layout (App.tsx)

The main `App.tsx` implements a responsive layout using `react-reflex`:

**Desktop View (≥md breakpoint):**

```
┌────────────────────────────────────────┐
│  Search & Sort (Desktop)               │
├────────────────────────────────────────┤
│  Hospital List      │                  │
│  (scrollable)       │                  │
│                     │                  │
│  [Hospital Cards]   │  GFLMap          │
│  [Hospital Cards]   │  (Mapbox)        │
│  [Hospital Cards]   │                  │
│                     │  Splitter (drag) │
└────────────────────────────────────────┘
```

**Mobile View (<md breakpoint):**

```
┌────────────────────┐
│ Toolbar +          │
│ Search/Sort Button │
├────────────────────┤
│ GFLMap             │
│ (fullscreen)       │
│                    │
│ [Swipe down]       │
├────────────────────┤
│ Hospital Cards     │
│ (bottom drawer)    │
└────────────────────┘
```

### Page Components Hierarchy

```
App.tsx
├── GFLMap (map visualization)
├── HospitalList (shared list renderer)
│   └── [Hospital Cards]
├── SearchAndSort (responsive dispatcher)
│   ├── SearchAndSortDesktop
│   └── SearchAndSortMobile
├── DonateOverlay (donation modal)
│   └── FundraiseUp Widget
├── LearnMoreOverlay (info modal)
├── SponsorPanel (corporate sponsorship)
├── FilterDialog (filter options)
└── WebGLBlockedBanner (if WebGL unavailable)
```

---

## Data Loading Sequence

### 1. App Initialization

```
Browser loads app
    ↓
main.tsx mounts Providers wrapper
    ↓
All Context providers initialize
    ↓
App.tsx component mounts
```

### 2. Initial Data Fetch

```
App.tsx mounts
    ↓
useEffect calls hospitalService.findAll()
    ↓
HospitalService.findAll():
  - Calls 3 services in parallel (Promise.all):
    • hospitalInfoService.findAll()
    • hospitalRequestService.findAll()
    • hospitalFundedService.findAll()
  - Matches records by IDs
  - Creates Hospital[] (merged models)
  - Applies default filters & sort
  - Concatenates mock data
    ↓
Results stored in HospitalsContext
```

### 3. Filter/Sort Updates

```
User changes filter or search term
    ↓
FilterContext updates
    ↓
SearchAndSort component (watching filters)
    ↓
Calls hospitalService.findAll(newFilters)
    ↓
Updates HospitalsContext.hospitals (filtered)
    ↓
Components re-render with new results
```

### 4. Hospital Selection

```
User clicks hospital card or map marker
    ↓
setHospital() in SelectedHospitalContext
    ↓
GFLMap responds:
  - Flies to coordinates
  - Scales up marker
  - Resets popup
    ↓
HospitalCardDetails highlights selected card
```

---

## State Management Tree

```
App State
├── HospitalsContext
│   ├── hospitals[] (filtered/displayed)
│   └── originals[] (unfiltered backup)
├── SelectedHospitalContext
│   └── hospital? (currently selected)
├── FilterContext
│   ├── location[]
│   ├── status[]
│   ├── sortBy
│   └── sortDirection
├── LoadingContext
│   └── loading (boolean)
├── DonationContext
│   └── donateOverlayOpen (boolean)
├── DrawerWidthContext
│   └── drawerWidth (pixels)
├── GeneralInfoContext
│   └── generalInfo (site stats)
├── HospitalInfoContext
│   ├── hospitalInfo[]
│   └── originalInfo[]
├── HospitalRequestContext
│   └── hospitalRequest[]
├── HospitalFundedContext
│   └── hospitalFunded[]
└── (DonationHospitalContext, LearnMoreHospitalContext)
    └── hospital? (context-specific selection)
```

---

## Service Layer

```
Component Layer
    ↓
HospitalService (Orchestration)
    ├── findAll() - Main entry point
    ├── transform() - Merge models
    ├── calcStatus() - Determine active/past
    ├── calcFundingLevel() - Calculate %
    ├── filterPredicate() - Apply filters
    ├── getSortComparator() - Apply sort
    └── utility methods (isEqual, filterHospitals, etc)
    ↓
Specialized Services
├── HospitalInfoService (metadata)
├── HospitalRequestService (requests)
├── HospitalFundedService (funding data)
└── GeneralInfoService (site stats)
    ↓
AirtableService (Generic)
└── getTableRecords() - Fetch any table
    ↓
Airtable API
```

---

## Key Design Patterns

### 1. Service + Context Pattern

- **Services** handle business logic and data transformation
- **Contexts** cache results and provide to components
- Separation of concerns: services don't depend on React

### 2. Merged Data Model

- Hospital = HospitalInfo + HospitalRequest + HospitalFunded
- Merged in service layer, not in component layer
- Simplifies component code

### 3. Denormalized Search

- `Hospital.searchTerm` pre-computes searchable string
- Avoids repeated string manipulation in filters
- Fast in-memory filtering

### 4. Original Data Pattern

- Keep `originals` (unfiltered) + `hospitals` (filtered)
- When filter changes, re-filter from originals
- No need to re-fetch from Airtable

### 5. Responsive Component Dispatcher

- `SearchAndSort` chooses desktop or mobile UI based on viewport
- Single component, two implementations
- Simplifies layout management

---

## Technology Stack

| Layer                | Technology                     |
| -------------------- | ------------------------------ |
| **UI Framework**     | React 18 with TypeScript       |
| **State Management** | React Context API              |
| **Styling**          | Material-UI (MUI) 5, Emotion   |
| **Mapping**          | React Map GL + MapLibre GL     |
| **Data Source**      | Airtable API                   |
| **Donations**        | FundraiseUp widget             |
| **Build Tool**       | Vite                           |
| **Testing**          | Vitest + React Testing Library |
| **Linting**          | ESLint                         |

---

## Performance Considerations

### Optimizations

- **Parallel loading:** All 3 data services called in parallel
- **In-memory filtering:** No re-fetches for filter changes
- **Denormalized search:** Fast string-based filtering
- **Max 100 records:** Per-table limit (can be increased)

### Known Limitations

- **No pagination:** Limited to 100 records per table
- **Client-side API key:** Security risk (read-only token recommended)
- **No offline support:** Requires internet connection
- **Map loading:** Large number of markers may impact performance

---

## Testing Strategy

Tests are located in files ending with `.test.ts` or `.test.tsx`:

- `src/utils/dateUtils.test.ts` — Date utility tests
- `src/services/generalInfo/generalInfoService.test.ts` — Service tests

Run tests with:

```bash
npm test
```

---

## Deployment

The app is deployed as a static site (Vite build output):

**Build:**

```bash
npm run build
```

**Output:** `dist/` folder ready for deployment

**Deployment Options:**

- Firebase Hosting
- Vercel
- Netlify
- Any static hosting

**Build Optimization:**

```bash
npm run lint
```

---

## Development Workflow

```
npm install              # Install dependencies
npm run dev             # Start dev server (localhost:5173)
npm run build           # Build for production
npm run preview         # Preview production build
npm test               # Run tests
npm run lint           # Check code style
```

Vite hot reloads on file changes during development.
