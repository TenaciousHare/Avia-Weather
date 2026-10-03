import { describe, it, expect } from "vitest";

import { feetToMeters, formatVisibility } from "./units";

describe("feetToMeters", () => {
  it("przelicza stopy na metry z zaokrągleniem", () => {
    expect(feetToMeters(4000)).toBe(1219);
  });

  it("zwraca 0 dla 0", () => {
    expect(feetToMeters(0)).toBe(0);
  });
});

describe("formatVisibility", () => {
  it("zwraca CAVOK bez zmian", () => {
    expect(formatVisibility({ repr: "CAVOK", value: 9999 })).toBe("CAVOK");
  });

  it("formatuje liczbę w metrach", () => {
    expect(formatVisibility({ repr: "0600", value: 600 })).toBe("600 m");
  });
});
