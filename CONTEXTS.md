# Contexts & State Management Documentation

This document describes React Context providers that manage application state.

## Context Architecture

The application uses React Context API for state management. All contexts are wrapped in the `<Providers>` component which is placed at the root in `main.tsx`.

## Context Map

```
<Providers>
  ├── <HospitalsContextProvider>
  ├── <SelectedHospitalContextProvider>
  ├── <FilterContextProvider>
  ├── <LoadingContextProvider>
  ├── <DonationContextProvider>
  ├── <GeneralInfoContextProvider>
  ├── <HospitalInfoContextProvider>
  ├── <HospitalRequestContextProvider>
  ├── <HospitalFundedContextProvider>
  ├── <DrawerWidthContextProvider>
  └── <App />
</Providers>
```

## Core Contexts

### HospitalsContext

**File:** `src/context/HospitalContext.tsx`

Stores the complete list of hospitals and an unfiltered backup.

**Type:**

```typescript
interface HospitalsContextType {
  hospitals: Hospital[]; // Filtered/displayed hospitals
  setHospitals: (hospitals: Hospital[]) => void;
  originals: Hospital[]; // Unfiltered backup (for performance)
  setOriginals: (hospitals: Hospital[]) => void;
}
```

**Purpose:**

- `hospitals` — The currently displayed list (may be filtered by search/filters)
- `originals` — The original unfiltered list, kept in memory for fast re-filtering
- Prevents re-fetching from Airtable when user changes filters

**Who Sets It:**

- Initial load: App component calls `hospitalService.findAll()` and sets `originals`
- Filtering: `SearchAndSort` component filters `originals` and updates `hospitals`

**Usage:**

```typescript
const { hospitals, setHospitals, originals, setOriginals } =
  useContext(HospitalsContext);
```

---

### SelectedHospitalContext

**File:** `src/context/SelectedHospitalContext.tsx`

Tracks which hospital is currently selected (clicked) by the user.

**Type:**

```typescript
interface HospitalContextType {
  hospital: Hospital | undefined;
  setHospital: (hospital: Hospital | undefined) => void;
}
```

**Related Contexts:**

- `DonationHospitalContext` — Hospital selected for donating
- `LearnMoreHospitalContext` — Hospital selected in "learn more" overlay

**Purpose:**

- Synchronizes selection across map markers, cards, and detail views
- When selected, marker scales up and map flies to location
- Used by GFLMap, HospitalCardDetails, and HospitalDetailsPageModal

**Usage:**

```typescript
const { hospital, setHospital } = useContext(SelectedHospitalContext);

// Select hospital
setHospital(hospitalObject);

// Deselect
setHospital(undefined);
```

---

### FilterContext

**File:** `src/context/FilterContext.tsx`

Stores the current filter and sort criteria.

**Type:**

```typescript
interface FilterContextType {
  filters: FilterType;
  setFilters: (filters: FilterType) => void;
}

type FilterType = {
  location: string[];
  status: FilterStatus[];
  sortBy: SortBy;
  sortDirection: sortDirection;
};
```

**Default Filter:**

```typescript
{
  location: [],
  status: ["active", "past"],
  sortBy: "fundingDeadline",
  sortDirection: "desc"
}
```

**Purpose:**

- Stores user's applied filters and sort preferences
- When changed, triggers filtering of hospitals in HospitalsContext
- Persists filter state as user navigates

**Usage:**

```typescript
const { filters, setFilters } = useContext(FilterContext);

// Update filters
setFilters({
  ...filters,
  status: ["active"],
  location: ["seattle"],
});
```

**Who Updates It:**

- `FilterDialog` component — Filter dialog UI
- `SearchAndSort` mobile/desktop components — Search input

---

### LoadingContext

**File:** `src/context/LoadingContext.tsx`

Global loading state indicator.

**Type:**

```typescript
interface LoadingContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}
```

**Purpose:**

- Shows/hides loading spinner while data is fetching
- Set to true when hospitals are being loaded from Airtable
- Set to false when load completes

**Usage:**

```typescript
const { loading, setLoading } = useContext(LoadingContext);
```

---

### DonationContext

**File:** `src/context/DonationContext.tsx`

Controls visibility of the donation overlay modal.

**Type:**

```typescript
interface DonationContextType {
  donateOverlayOpen: boolean | undefined;
  setDonateOverlayOpen: (open: boolean | undefined) => void;
}
```

**Purpose:**

- Tracks whether donation overlay is shown
- Used by `DonateOverlay` component
- When true, renders FundraiseUp donation widget

**Usage:**

```typescript
const { donateOverlayOpen, setDonateOverlayOpen } = useContext(DonationContext);

// Open donation modal
setDonateOverlayOpen(true);
```

---

## Hospital Data Contexts

These contexts cache individual hospital data types to avoid repeated Airtable fetches.

### HospitalInfoContext

**File:** `src/context/HospitalInfoContext.tsx`

Caches HospitalInfo records from Airtable.

**Type:**

```typescript
interface HospitalInfoContextType {
  hospitalInfo: HospitalInfo[];
  setHospitalInfo: (hospitals: HospitalInfo[]) => void;
  originalInfo: HospitalInfo[];
  setOriginalInfo: (hospitals: HospitalInfo[]) => void;
}
```

**Pattern:** Same as HospitalsContext (maintains original + filtered)

---

### HospitalRequestContext

**File:** `src/context/HospitalRequestContext.tsx`

Caches HospitalRequest records from Airtable.

**Type:**

```typescript
interface HospitalRequestContextType {
  hospitalRequest: HospitalRequest[];
  setHospitalRequest: (requests: HospitalRequest[]) => void;
}
```

---

### HospitalFundedContext

**File:** `src/context/HospitalFundedContext.tsx`

Caches HospitalFunded records from Airtable.

**Type:**

```typescript
interface HospitalFundedContextType {
  hospitalFunded: HospitalFunded[];
  setHospitalFunded: (funded: HospitalFunded[]) => void;
}
```

---

### GeneralInfoContext

**File:** `src/context/GeneralInfoContext.tsx`

Stores site-wide aggregate information (totals, corporate partners).

**Type:**

```typescript
interface GeneralInfoContextType {
  generalInfo: GeneralInfo;
  setGeneralInfo: (info: GeneralInfo) => void;
}
```

**Default (EMPTY_INFO):**

```typescript
{
  id: "",
  status: "",
  totalOpen: 0,
  totalFunded: 0,
  fundraiseUpCampaignId: "",
  fundraiseUpOrganizationId: "",
  corpPartners: []
}
```

**Special Notes:**

- Auto-loads on mount via useEffect
- Only stores one record (takes first result from findAll())

---

## UI State Contexts

### DrawerWidthContext

**File:** `src/context/DrawerWidthContext.tsx`

Manages the desktop sidebar drawer width and visibility.

**Type:**

```typescript
interface DrawerWidthContextType {
  drawerWidth: number;
  setLastDrawerWidth: (width: number) => void;
  toggle: () => void;
}
```

**Constants:**

```typescript
const START_WIDTH = 800; // Default drawer width in pixels
```

**Purpose:**

- Tracks drawer open/close state
- Allows user to resize drawer
- When closed, drawerWidth = 0
- When open, drawerWidth = 800 (or previously set width)

**Methods:**

- `setLastDrawerWidth()` — FIXME: Currently non-functional (see code comments)
- `toggle()` — Switch between open/closed

**Note:** Has a known issue with `setLastDrawerWidth` not working as expected.

**Usage:**

```typescript
const { drawerWidth, toggle } = useContext(DrawerWidthContext);

// Toggle drawer
toggle();

// Check if open
const isOpen = drawerWidth > 0;
```

---

## Context Usage Patterns

### 1. Reading from Multiple Contexts

```typescript
function Component() {
  const { hospitals } = useContext(HospitalsContext);
  const { filters } = useContext(FilterContext);
  const { hospital: selectedHospital } = useContext(SelectedHospitalContext);

  return <div>{hospitals.length} hospitals</div>;
}
```

### 2. Updating Filtered Hospitals

```typescript
// In SearchAndSort component:
const { originals } = useContext(HospitalsContext);
const { setHospitals } = useContext(HospitalsContext);
const { filters } = useContext(FilterContext);

useEffect(() => {
  // Apply filters to originals
  const filtered = hospitalService.findAll(filters);
  setHospitals(filtered);
}, [filters]);
```

### 3. Selecting a Hospital

```typescript
// In component:
const { setHospital } = useContext(SelectedHospitalContext);

const handleHospitalClick = (hospital: Hospital) => {
  setHospital(hospital); // This triggers map to fly to hospital
};
```

---

## Data Flow on App Start

```
App mounts
    ↓
All Providers initialize with defaults
    ↓
GeneralInfoContextProvider useEffect runs
    → Calls generalInfoService.findAll()
    → Sets generalInfo context
    ↓
App.tsx requests hospitals
    → Calls hospitalService.findAll()
    → Sets HospitalsContext.originals
    → Sets HospitalsContext.hospitals (initially unfiltered)
    ↓
User changes filters
    → FilterContext updates
    → SearchAndSort useEffect watches filters
    → Calls hospitalService.findAll(filters)
    → Updates HospitalsContext.hospitals
    ↓
User clicks hospital
    → SelectedHospitalContext updates
    → GFLMap responds (flies to location, closes popup if needed)
    ↓
User clicks donate
    → DonationContext.donateOverlayOpen = true
    → DonateOverlay renders FundraiseUp widget
```

---

## Best Practices

1. **Keep contexts focused** — One context per concern (hospitals, filters, loading, etc.)
2. **Use custom hooks** — Wrap context usage in hooks for cleaner components
3. **Avoid prop drilling** — Contexts eliminate need to pass props through many levels
4. **Original data pattern** — Keep filtered + original data to enable fast re-filtering
5. **Lazy loading** — GeneralInfoContext loads on mount, others loaded on demand
