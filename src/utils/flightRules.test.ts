import { describe, it, expect } from "vitest";

import { flightRuleColor } from "./flightRules";

describe("flightRuleColor", () => {
  it("zwraca kolor dla znanej kategorii", () => {
    expect(flightRuleColor("VFR")).toBe("green");
  });

  it("zwraca gray dla nieznanej wartości", () => {
    expect(flightRuleColor("XXX")).toBe("gray");
  });
});
