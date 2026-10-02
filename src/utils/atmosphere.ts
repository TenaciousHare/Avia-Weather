export function isaDeviation(tempC: number, elevationFt: number): number {
  const isaTemp = 15 - 1.98 * (elevationFt / 1000);
  return Math.round(tempC - isaTemp) || 0;
}

export function relativeHumidity(tempC: number, dewpointC: number): number {
  const a = 17.625;
  const b = 243.04;
  const nad = Math.exp((a * dewpointC) / (b + dewpointC));
  const pod = Math.exp((a * tempC) / (b + tempC));
  return Math.round(100 * (nad / pod));
}
