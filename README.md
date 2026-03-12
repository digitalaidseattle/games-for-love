# Games For Love + Digital Aid Seattle

This web application provides an interactive visualization of where Games for Love's donations are allocated globally. It displays hospitals in need of equipment funding and tracks the progress of donations.

The application is designed to be embedded in a website via iframe.

## Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
git clone <repository>
cd games-for-love
npm install
```

### Configuration

Create a `.env.local` file with your Airtable credentials:

```bash
VITE_AIRTABLE_ANON_KEY=your_api_key
VITE_AIRTABLE_BASE_ID_GFL=your_base_id
VITE_AIRTABLE_TABLE_HOSPITAL_REFERENCE=Hospital Reference
VITE_AIRTABLE_TABLE_HOSPITAL_REQUEST_REFERENCE=Hospital Request Reference
VITE_AIRTABLE_TABLE_HOSPITAL_FUNDED_REFERENCE=Hospital Funded Reference
VITE_AIRTABLE_TABLE_GENERAL_REFERENCE=General Info
```

See [ENVIRONMENT_VARIABLES.md](ENVIRONMENT_VARIABLES.md) for detailed information.

### Development Server

```bash
npm run dev
```

Opens at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## Documentation

### Getting Started

- **[ENVIRONMENT_VARIABLES.md](ENVIRONMENT_VARIABLES.md)** — API keys, Airtable configuration, secrets
- **[ARCHITECTURE.md](ARCHITECTURE.md)** — High-level application design, data flow, component structure

### Core Concepts

- **[MODELS.md](MODELS.md)** — Data models, type definitions, Airtable field mappings
- **[SERVICES.md](SERVICES.md)** — Service layer, data transformation, business logic
- **[CONTEXTS.md](CONTEXTS.md)** — State management, React Context providers, data flow

---

## Features

### User Features

- 🗺️ **Interactive Map** — View hospitals globally using MapLibre GL
- 🔍 **Search & Filter** — Filter by location, funding status, sort by deadline or funding level
- 💖 **Donation Integration** — Donate to specific hospitals or general funding via FundraiseUp
- 📱 **Responsive Design** — Works on desktop, tablet, and mobile devices
- ℹ️ **Hospital Details** — View detailed hospital information, funding needs, impact stories

### Technical Features

- TypeScript for type safety
- React Context for state management
- Material-UI for consistent design
- Vite for fast development experience
- Vitest for unit testing
- ESLint for code quality

---

## Data Source

All data is sourced from Airtable tables:

1. **Hospital Reference** — Hospital locations, names, descriptions, coordinates
2. **Hospital Request Reference** — Equipment funding requests, deadlines, narratives
3. **Hospital Funded Reference** — Funding progress, thank you notes, impact photos
4. **General Info** — Site-wide statistics, corporate partners

The application fetches and merges these tables into a unified Hospital model for display.

---

## Technology Stack

| Component          | Technology                     |
| ------------------ | ------------------------------ |
| Frontend Framework | React 18 + TypeScript          |
| UI Components      | Material-UI 5                  |
| Styling            | Emotion, CSS                   |
| State Management   | React Context API              |
| Mapping            | React Map GL + MapLibre GL     |
| Data Source        | Airtable API                   |
| Build Tool         | Vite                           |
| Testing            | Vitest + React Testing Library |
| Linting            | ESLint                         |

---

## Project Structure

```
src/
├── components/        # React components
├── services/         # Business logic & data transformation
├── context/          # React Context providers
├── models/           # TypeScript type definitions
├── styles/           # Styling components
├── utils/            # Utility functions
├── mapping/          # Airtable API integration
└── App.tsx           # Main app component
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed folder structure.

---

## Available Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload

# Build
npm run build        # Build for production
npm run preview      # Preview production build

# Quality
npm run lint         # Check code style with ESLint
npm test            # Run tests with Vitest

# Utilities
npm run type-check  # Run TypeScript compiler check
```

---

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

**Note:** WebGL is required for the map component. A fallback banner is shown on unsupported browsers.

---

## Contributing

When adding features or fixing bugs:

1. Follow the existing code structure and patterns
2. Keep components small and focused
3. Document complex business logic
4. Write tests for utilities and services
5. Use TypeScript for type safety
6. Follow ESLint rules

---

## Deployment

### Firebase Hosting

```bash
npm run build
firebase deploy
```

### Vercel / Netlify

Connect your repository and set environment variables in the hosting platform's dashboard.

See [ENVIRONMENT_VARIABLES.md](ENVIRONMENT_VARIABLES.md) for configuration details.

---

## Performance

The application is optimized for:

- **Fast initial load** — Parallel data fetching
- **Client-side filtering** — No re-fetches when filters change
- **In-memory search** — Denormalized search strings
- **Responsive UI** — Mobile-first design

Known limitations:

- Limited to 100 records per Airtable table (can be increased)
- No offline support
- Client-side API key (read-only recommended)

---

## Security

⚠️ **Important:** The application embeds an Airtable API key in the client-side code.

Best Practices:

1. Use a **read-only** Personal Access Token
2. Create a **dedicated token** for this app
3. Monitor API usage
4. Rotate token periodically

For production, consider implementing a backend proxy to avoid exposing credentials.

See [ENVIRONMENT_VARIABLES.md](ENVIRONMENT_VARIABLES.md#security-considerations) for details.

---

## Troubleshooting

### "401 Unauthorized" when loading data

- Verify API key is correct and valid
- Key must have `data.records:read` scope
- Ensure the key hasn't expired

### "404 Table not found"

- Check Airtable table IDs match exactly
- Verify table IDs have correct base ID
- Ensure tables exist in the base

### WebGL not supported

- Fallback banner is shown
- User can still view hospital list but not interactive map

For more help, see [ENVIRONMENT_VARIABLES.md](ENVIRONMENT_VARIABLES.md#troubleshooting).

---

## Related Resources

- [Games for Love Official Site](https://games4love.org)
- [Digital Aid Seattle](https://digitalaidseattle.org)
- [Airtable API Docs](https://airtable.com/api)
- [React Documentation](https://react.dev)
- [Material-UI Documentation](https://mui.com)

---

## License

This project is developed for Games for Love and Digital Aid Seattle.

---

## Support

For questions or issues, please contact the development team or open an issue in the repository.
