export function flightRuleColor(rules: string): string {
  const colors: Record<string, string> = {
    VFR: "green",
    MVFR: "blue",
    IFR: "red",
    LIFR: "purple",
  };
  return colors[rules] ?? "gray";
}

export function describeFlightRules(code: string): string {
  const flightRulesMap: Record<string, string> = {
    VFR: "dobre warunki",
    MVFR: "umiarkowane warunki",
    IFR: "trudne warunki",
    LIFR: "bardzo trudne warunki",
  };
  return flightRulesMap[code.toUpperCase()] ?? code;
}
