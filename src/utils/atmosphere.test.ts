import { describe, it, expect } from "vitest";

import { isaDeviation, relativeHumidity } from "./atmosphere";

describe("isaDeviation", () => {
  it("oblicza poprawnie dzień wzorcowy na poziomie morza", () => {
    expect(isaDeviation(15, 0)).toBe(0);
  });
  it("oblicza poprawnie cieplej niż standard", () => {
    expect(isaDeviation(20, 0)).toBe(5);
  });
  it("oblicza poprawnie chłodniej niż standard", () => {
    expect(isaDeviation(5, 0)).toBe(-10);
  });
  it("oblicza poprawnie sytuację z wysokością w grze", () => {
    expect(isaDeviation(20, 1000)).toBe(7);
  });
  it("oblicza poprawnie sytuacje nietypowe", () => {
    expect(isaDeviation(14.6, 0)).toBe(0);
  });
});

describe("relativeHumidity", () => {
  it("poprawnie oblicza  100% wilgotność przy temperaturze równej punktowi rosy", () => {
    expect(relativeHumidity(10, 10)).toBe(100);
  });
  it("poprawnie oblicza wilgotność", () => {
    expect(relativeHumidity(7, 6)).toBe(93);
  });
  it("poprawnie wypada w porównaniu różnych wartości", () => {
    expect(relativeHumidity(20, 5)).toBeLessThan(relativeHumidity(20, 15));
  });
});
