# Avia Weather — METAR & TAF ✈️

[![CI](https://github.com/TenaciousHare/metar/actions/workflows/ci.yml/badge.svg)](https://github.com/TenaciousHare/metar/actions/workflows/ci.yml)

**[Live demo →](https://avia-weather.netlify.app/)**

A web app for checking current aviation weather for any airport. Enter an **ICAO or IATA** code to get a fully decoded METAR — station details, conditions and a color-coded flight category — plus the TAF forecast, period by period. Aviation shorthand (cloud cover, flight rules, TAF change types) is translated into plain language, with metric units and a dark mode for night use.

## Features

- Search by **ICAO** (`EPKT`, `EGLL`) or **IATA** (`KTW`, `KRK`) code
- Station details: airport name, city/country and field elevation
- Decoded conditions:
  - temperature with **ISA deviation** (how far from the standard atmosphere)
  - dew point with **relative humidity** (Magnus formula)
  - wind as a cardinal direction and speed in m/s, including gusts (variable wind shown as "zmienny")
  - visibility and cloud layers
- **Plain-language decoding** — cloud cover (`BKN`, `SCT`…), flight rules (`VFR`/`IFR`…) and TAF change types (`TEMPO`/`BECMG`…) shown with human-readable descriptions next to the raw codes
- Color-coded flight category (VFR / MVFR / IFR / LIFR)
- **Local Mean Time** of the observation, derived from the station's longitude
- **Freshness indicator** — observation age color-coded (green / orange / red) by how long ago the METAR was issued
- Request caching via TanStack Query — revisiting an airport is instant
- Raw METAR string shown alongside the decoded view
- **TAF forecast**, split into periods (FROM / BECMG / TEMPO) — each with its validity window (UTC), flight category, wind, visibility and clouds, in metric units
- **Auto-refresh** every 5 minutes, with a live, ticking observation-age indicator
- **Pressure trend** (rising ↑ / falling ↓ / steady →) derived from successive observations
- **Dark mode** — toggle with a persisted preference, applied before first paint (no flash)

## Tech stack

- React + TypeScript
- Vite
- TanStack Query (server state and caching)
- CSS Modules (theming via CSS custom properties)
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

Pure utility functions (wind, atmosphere, time, unit helpers and the code decoders) are covered by Vitest unit tests:

```
npm run test       # watch mode
npm run test:run   # single run (used in CI)
```

51 tests covering cardinal wind conversion, knots→m/s, feet→m and visibility formatting, ISA deviation, relative humidity, flight-category colors, observation age (with an injected clock for determinism), freshness thresholds, local-time / UTC formatting, and the plain-language decoders (cloud cover, flight rules, TAF change types) — each including the unknown-value fallback and case-insensitivity.

## CI

Every push and pull request to `main` runs lint, tests and a production build via GitHub Actions.

## Notes

The AVWX token is never exposed to the browser. All requests are proxied through a Netlify Function (`/api/avwx`) that attaches the token server-side from the `AVWX_TOKEN` environment variable and validates the station code (3–4 letters, ICAO/IATA) against an allowlist before forwarding it to AVWX.

---

_Built as a learning project while refreshing modern React + TypeScript. I document the process on my blog: [zajac-na-froncie.netlify.app](https://zajac-na-froncie.netlify.app)._
