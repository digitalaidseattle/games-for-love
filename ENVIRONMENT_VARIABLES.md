# Environment Variables Documentation

This document describes all required and optional environment variables for running the Games for Love application.

## Configuration Files

### Development Environment

Create a `.env.local` file in the project root:

```bash
# .env.local
VITE_AIRTABLE_ANON_KEY=your_airtable_api_key
VITE_AIRTABLE_BASE_ID_GFL=your_base_id
VITE_AIRTABLE_TABLE_HOSPITAL_REFERENCE=Hospital Reference
VITE_AIRTABLE_TABLE_HOSPITAL_REQUEST_REFERENCE=Hospital Request Reference
VITE_AIRTABLE_TABLE_HOSPITAL_FUNDED_REFERENCE=Hospital Funded Reference
VITE_AIRTABLE_TABLE_GENERAL_REFERENCE=General Info
```

### Build-Time Environment

For production builds, add variables to your CI/CD pipeline or `.env` file.

---

## Required Variables

### `VITE_AIRTABLE_ANON_KEY`

**Type:** string  
**Required:** Yes  
**Description:** Airtable API key for anonymous/public access

**How to Get:**

1. Go to https://airtable.com/api
2. Select your base
3. Generate a Personal Access Token (PAT) with these scopes:
   - `data.records:read` — Read access to records
   - (No write access needed for this app)

**Note:** This key is embedded in the client-side code. Use a token with limited scopes (read-only recommended).

**Example:**

```
VITE_AIRTABLE_ANON_KEY=pat_1a2b3c4d5e6f7g8h9i0j
```

---

### `VITE_AIRTABLE_BASE_ID_GFL`

**Type:** string  
**Required:** Yes  
**Description:** Airtable base ID for Games for Love data

**How to Get:**

1. Open your Airtable base
2. Click "Help" → "API documentation"
3. Your base ID appears in the API documentation

**Format:** Usually starts with `app` (e.g., `appXxXxXxXxXxXxXx`)

**Example:**

```
VITE_AIRTABLE_BASE_ID_GFL=appXxXxXxXxXxXxXx
```

---

### `VITE_AIRTABLE_TABLE_HOSPITAL_REFERENCE`

**Type:** string  
**Required:** Yes  
**Description:** Table ID for hospital metadata (HospitalInfo records)

**Stores:** Hospital location, name, type, description, coordinates

**How to Get:**

1. Open your Airtable base
2. Click on the Hospital Reference table
3. Click "Help" → "Edit grid view settings"
4. The table ID appears in the URL or help docs

**Format:** Usually starts with `tbl` (e.g., `tblXxXxXxXxXxXxXx`)

**Example:**

```
VITE_AIRTABLE_TABLE_HOSPITAL_REFERENCE=tblHospitalData123
```

---

### `VITE_AIRTABLE_TABLE_HOSPITAL_REQUEST_REFERENCE`

**Type:** string  
**Required:** Yes  
**Description:** Table ID for hospital funding requests (HospitalRequest records)

**Stores:** Equipment requests, funding goals, deadlines, narratives, corporate partners

**Example:**

```
VITE_AIRTABLE_TABLE_HOSPITAL_REQUEST_REFERENCE=tblRequestData123
```

---

### `VITE_AIRTABLE_TABLE_HOSPITAL_FUNDED_REFERENCE`

**Type:** string  
**Required:** Yes  
**Description:** Table ID for completed funding data (HospitalFunded records)

**Stores:** Thank you notes, impact information, funding amounts, photos

**Example:**

```
VITE_AIRTABLE_TABLE_HOSPITAL_FUNDED_REFERENCE=tblFundedData123
```

---

### `VITE_AIRTABLE_TABLE_GENERAL_REFERENCE`

**Type:** string  
**Required:** Yes  
**Description:** Table ID for site-wide aggregate data (GeneralInfo records)

**Stores:** Total funding open/funded, corporate partners, FundraiseUp organization ID

**Example:**

```
VITE_AIRTABLE_TABLE_GENERAL_REFERENCE=tblGeneralInfo123
```

---

## Optional Variables

### FundraiseUp Integration

Future documentation when FundraiseUp variables are added.

---

## Environment Validation

The application does NOT currently validate missing environment variables on startup. If a variable is missing, you will see runtime errors when that data is fetched.

**Recommended:** Add validation in `src/main.tsx` or create an `.env.example` file listing all required variables.

---

## Development vs Production

### Local Development (.env.local)

```
VITE_AIRTABLE_ANON_KEY=your_dev_key
VITE_AIRTABLE_BASE_ID_GFL=your_dev_base_id
VITE_AIRTABLE_TABLE_*=your_table_ids
```

### Production (CI/CD Pipeline)

Set these as secrets in your deployment environment (GitHub Actions, Vercel, Firebase, etc.):

Example for Firebase Deploy:

```bash
firebase functions:config:set airtable.key="your_prod_key" airtable.base="your_prod_base_id"
```

Example for GitHub Actions:

```yaml
env:
  VITE_AIRTABLE_ANON_KEY: ${{ secrets.AIRTABLE_KEY }}
  VITE_AIRTABLE_BASE_ID_GFL: ${{ secrets.AIRTABLE_BASE_ID }}
```

---

## Security Considerations

### ⚠️ Important: Client-Side API Key

This application embeds the Airtable API key in the client-side code. This means:

**Risks:**

- Anyone viewing the app's source code can see the API key
- Users could potentially use the key to abuse your Airtable API quota
- Key is visible in browser DevTools

**Mitigation:**

1. Use a **personal access token** with **only `data.records:read` scope** (no write, delete, or schema modification)
2. Create a **dedicated Airtable user** or token for this app
3. Monitor your Airtable API usage
4. Consider implementing API rate limiting at the base level
5. Rotate the token periodically

### Best Practice: Backend Proxy

For production, consider proxying Airtable requests through your backend:

- Backend authenticates with Airtable using a server-side key
- Frontend calls your backend API (no key exposure)
- Backend forwards filtered data to frontend

---

## Troubleshooting

### "Cannot read property of undefined" errors

**Likely cause:** Missing or incorrect environment variable
**Fix:**

1. Verify all `VITE_` variables are set
2. Check spelling matches exactly (case-sensitive)
3. Restart dev server after changing .env files

### "401 Unauthorized" errors

**Likely cause:** Invalid or expired API key
**Fix:**

1. Regenerate your Airtable API key
2. Verify the key has `data.records:read` scope
3. Confirm the key is not using IP restrictions

### "404 Table not found" errors

**Likely cause:** Incorrect table ID or base ID
**Fix:**

1. Double-check table IDs match exactly
2. Verify you're using the correct base ID
3. Ensure tables exist in the base

---

## .env.example

Create this file to document required variables for other developers:

```bash
# Airtable Configuration
VITE_AIRTABLE_ANON_KEY=<your_airtable_api_key>
VITE_AIRTABLE_BASE_ID_GFL=<your_airtable_base_id>
VITE_AIRTABLE_TABLE_HOSPITAL_REFERENCE=<hospital_reference_table_id>
VITE_AIRTABLE_TABLE_HOSPITAL_REQUEST_REFERENCE=<hospital_request_table_id>
VITE_AIRTABLE_TABLE_HOSPITAL_FUNDED_REFERENCE=<hospital_funded_table_id>
VITE_AIRTABLE_TABLE_GENERAL_REFERENCE=<general_info_table_id>

# FundraiseUp Configuration (Future)
# VITE_FUNDRAISEUP_ORG_ID=<organization_id>
# VITE_FUNDRAISEUP_GENERAL_CAMPAIGN=<general_campaign_id>
```

Add to `.gitignore`:

```
.env.local
.env.*.local
```
