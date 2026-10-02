import type { Metar, Station } from "./types";

export async function fetchMetar(station: string): Promise<Metar> {
  const res = await fetch(`https://avwx.rest/api/metar/${station}`, {
    headers: { Authorization: `BEARER ${import.meta.env.VITE_AVWX_TOKEN}` },
  });
  if (!res.ok) throw new Error(`Błąd API: ${res.status}`);
  return res.json();
}

export async function fetchStation(icao: string): Promise<Station> {
  const res = await fetch(`https://avwx.rest/api/station/${icao}`, {
    headers: { Authorization: `BEARER ${import.meta.env.VITE_AVWX_TOKEN}` },
  });
  if (!res.ok) throw new Error(`Błąd API (station): ${res.status}`);
  return res.json();
}
