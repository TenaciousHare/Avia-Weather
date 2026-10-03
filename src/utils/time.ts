// Formatuje czas UTC jako Local Mean Time dla danej długości geograficznej.
// LMT = UTC + (longitude / 15) godzin.
export function formatLMT(utcIso: string, longitude: number): string {
  const utc = new Date(utcIso);
  const shifted = new Date(utc.getTime() + (longitude / 15) * 3600 * 1000);

  const d = shifted.getUTCDate();
  const m = shifted.getUTCMonth() + 1; // miesiące liczone od 0
  const y = shifted.getUTCFullYear();
  const hh = String(shifted.getUTCHours()).padStart(2, "0");
  const mm = String(shifted.getUTCMinutes()).padStart(2, "0");

  return `${d}.${m}.${y}, ${hh}:${mm} LMT`;
}

export function formatZulu(utcIso: string): string {
  const utc = new Date(utcIso);
  const d = utc.getUTCDate();
  const m = utc.getUTCMonth() + 1; // miesiące liczone od 0
  const y = utc.getUTCFullYear();
  const hh = String(utc.getUTCHours()).padStart(2, "0");
  const mm = String(utc.getUTCMinutes()).padStart(2, "0");
  return `${d}.${m}.${y}, ${hh}:${mm} UTC`;
}

export function minutesAgo(utcIso: string, now: Date = new Date()): number {
  const obs = new Date(utcIso);
  const diffMs = now.getTime() - obs.getTime();
  return Math.max(0, Math.round(diffMs / 60000)); // 60000 ms = 1 min
}

export function freshnessColor(minutes: number): string {
  if (minutes <= 60) return "green";
  if (minutes <= 120) return "orange";
  return "red";
}
