# METAR Weather Viewer ✈️

A small web app for checking current aviation weather (METAR) for any airport by its ICAO code. Enter a code and get the decoded conditions plus a color-coded flight category at a glance.

## Features

- Search METAR by ICAO code (e.g. `EPKT`, `EGLL`)
- Decoded conditions: temperature, wind (with gusts), and cloud layers
- Color-coded flight category (VFR / MVFR / IFR / LIFR)
- Request caching via TanStack Query — revisiting an airport is instant
- Raw METAR string shown alongside the decoded view

## Tech stack

- React + TypeScript
- Vite
- TanStack Query (server state and caching)
- AVWX REST API (decoded METAR data)

## Getting started

### Prerequisites

- Node.js (LTS)
- A free AVWX API token from https://avwx.rest

### Setup

1. Install dependencies:
   `npm install`
2. Create a `.env` file in the project root with your token:
   `VITE_AVWX_TOKEN=your-token-here`
3. Start the dev server:
   `npm run dev`

Open the URL shown in the terminal and enter an ICAO code.

## Notes

The AVWX token is read from `.env` (git-ignored). In a production deployment it would be proxied through a backend rather than exposed in the client bundle.

---

_Built as a learning project while refreshing modern React + TypeScript._
