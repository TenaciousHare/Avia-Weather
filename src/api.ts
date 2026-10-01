import type { Metar } from "./types";

export async function fetchMetar(station: string): Promise<Metar> {
  const res = await fetch(`https://avwx.rest/api/metar/${station}`, {
    headers: { Authorization: `BEARER ${import.meta.env.VITE_AVWX_TOKEN}` },
  });
  if (!res.ok) throw new Error(`Błąd API: ${res.status}`);
  return res.json();
}
