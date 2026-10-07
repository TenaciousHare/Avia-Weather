export function describeForecastType(code: string): string {
  const forecastTypeMap: Record<string, string> = {
    FROM: "od",
    BECMG: "stopniowa zmiana",
    TEMPO: "przejściowo",
    INTER: "okresowo",
  };
  return forecastTypeMap[code.toUpperCase()] ?? code;
}
