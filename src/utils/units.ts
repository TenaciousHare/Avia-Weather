export function formatVisibility(vis: { repr: string; value: number }): string {
  return vis.repr === "CAVOK" ? "CAVOK" : `${vis.value} m`;
}

export function feetToMeters(ft: number): number {
  return Math.round(ft * 0.3048);
}
