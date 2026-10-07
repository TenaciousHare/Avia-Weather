import { describe, it, expect } from "vitest";

import { describeForecastType } from "./taf";

describe("describeForecastType", () => {
  it("dla kodu FROM zwraca od", () => {
    expect(describeForecastType("FROM")).toBe("od");
  });
  it("dla kodu TEMPO zwraca przejściowo", () => {
    expect(describeForecastType("TEMPO")).toBe("przejściowo");
  });
  it("zwraca wynik niezależnie od wielkości liter", () => {
    expect(describeForecastType("becmg")).toBe("stopniowa zmiana");
  });
  it("fallback dla nieznanego kodu", () => {
    expect(describeForecastType("XYZ")).toBe("XYZ");
  });
});
