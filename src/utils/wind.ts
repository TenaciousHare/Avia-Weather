// 1. Stopnie -> 8-punktowa róża wiatrów
export function degreesToCardinal(deg: number): string {
  const cardinals = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return cardinals[Math.round(deg / 45) % 8];
}

// 2. Węzły -> m/s
export function knotsToMps(kt: number): number {
  return Math.round(kt * 0.514);
}
