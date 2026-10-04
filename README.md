# METAR Weather Viewer ✈️

[![CI](https://github.com/TenaciousHare/metar/actions/workflows/ci.yml/badge.svg)](https://github.com/TenaciousHare/metar/actions/workflows/ci.yml)

**[Live demo →](https://avia-weather.netlify.app/)**

A web app for checking current aviation weather for any airport by its ICAO code. Enter a code to get the fully decoded METAR — station details, conditions and a color-coded flight category — plus the TAF forecast broken down period by period.

## Features

- Search METAR by ICAO code (e.g. `EPKT`, `EGLL`)
- Station details: airport name, city/country and field elevation
- Decoded conditions:
  - temperature with **ISA deviation** (how far from the standard atmosphere)
  - dew point with **relative humidity** (Magnus formula)
  - wind as a cardinal direction and speed in m/s, including gusts
  - visibility and cloud layers
- Color-coded flight category (VFR / MVFR / IFR / LIFR)
- **Local Mean Time** of the observation, derived from the station's longitude
- **Freshness indicator** — the observation age is color-coded (green / orange / red) by how long ago the METAR was issued
- Request caching via TanStack Query — revisiting an airport is instant
- Raw METAR string shown alongside the decoded view
- **TAF forecast**, split into periods (FROM / BECMG / TEMPO) — each with its validity window (UTC), flight category, wind (incl. variable "VRB"), visibility and clouds, in metric units
- **Auto-refresh** every 5 minutes (TanStack Query), with a live, ticking observation-age indicator
- **Pressure trend** (rising ↑ / falling ↓ / steady →) derived from successive observations

## Tech stack

- React + TypeScript
- Vite
- TanStack Query (server state and caching)
- CSS Modules
- Vitest (unit tests)
- AVWX REST API (decoded METAR + station data)
- Netlify Functions (serverless proxy for the AVWX API)

## Getting started

### Prerequisites

- Node.js (LTS — see `.nvmrc`)
- A free AVWX API token from [https://avwx.rest](https://avwx.rest)

### Setup

1. Install dependencies: `npm install`
2. Create a `.env` file with your AVWX token (note: **no** `VITE_` prefix — it stays server-side): `AVWX_TOKEN=your-token-here`
3. Install the Netlify CLI once: `npm i -D netlify-cli`
4. Start the dev server (Vite + functions together): `npx netlify dev`

> Plain `npm run dev` runs only Vite, so the `/api/avwx` function won't be available. Use `netlify dev` locally.

## Tests

Pure utility functions (wind, atmosphere, time and unit helpers) are covered by Vitest unit tests:

```
npm run test       # watch mode
npm run test:run   # single run (used in CI)
```

39 tests covering cardinal wind conversion, knots→m/s, feet→m and visibility formatting, ISA deviation, relative humidity, flight-category colors (including the unknown-value fallback), observation age (with an injected clock for determinism), freshness thresholds, and local-time / UTC formatting.

## CI

Every push and pull request to `main` runs lint, tests and a production build via GitHub Actions.

## Notes

The AVWX token is never exposed to the browser. All requests are proxied through a Netlify Function (`/api/avwx`) that attaches the token server-side from the `AVWX_TOKEN` environment variable and validates the request against an allowlist before forwarding it to AVWX.

---

_Built as a learning project while refreshing modern React + TypeScript._
