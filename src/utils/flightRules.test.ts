import { describe, it, expect } from "vitest";

import { flightRuleColor, describeFlightRules } from "./flightRules";

describe("flightRuleColor", () => {
  it("zwraca kolor dla znanej kategorii", () => {
    expect(flightRuleColor("VFR")).toBe("green");
  });

  it("zwraca gray dla nieznanej wartości", () => {
    expect(flightRuleColor("XXX")).toBe("gray");
  });
});

describe("describeFlightRules", () => {
  it("dla kodu VFR zwraca dobre warunki", () => {
    expect(describeFlightRules("VFR")).toBe("dobre warunki");
  });
  it("dla kodu IFR zwraca trudne warunki", () => {
    expect(describeFlightRules("IFR")).toBe("trudne warunki");
  });
  it("zwraca wynik niezależnie od wielkości liter", () => {
    expect(describeFlightRules("mvfr")).toBe("umiarkowane warunki");
  });
  it("fallback dla nieznanego kodu", () => {
    expect(describeFlightRules("XYZ")).toBe("XYZ");
  });
});
