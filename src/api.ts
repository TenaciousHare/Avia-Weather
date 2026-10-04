import type { Metar, Station, Taf } from "./types";

async function fetchAvwx<T>(type: string, icao: string): Promise<T> {
  const res = await fetch(`/api/avwx?type=${type}&icao=${icao}`);
  if (!res.ok) throw new Error(`Błąd API: ${res.status}`);
  return res.json();
}

export const fetchMetar = (icao: string) => fetchAvwx<Metar>("metar", icao);
export const fetchTaf = (icao: string) => fetchAvwx<Taf>("taf", icao);
export const fetchStation = (icao: string) =>
  fetchAvwx<Station>("station", icao);
