export function flightRuleColor(rules: string): string {
  const colors: Record<string, string> = {
    VFR: "green",
    MVFR: "blue",
    IFR: "red",
    LIFR: "purple",
  };
  return colors[rules] ?? "gray";
}
