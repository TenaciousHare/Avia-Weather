import { describe, it, expect } from "vitest";
import { degreesToCardinal, knotsToMps } from "./wind";

describe("degreesToCardinal", () => {
  it("zamienia 0° na N", () => {
    expect(degreesToCardinal(0)).toBe("N");
  });

  it("zamienia 45° na NE", () => {
    expect(degreesToCardinal(45)).toBe("NE");
  });

  it("zamienia 90° na E", () => {
    expect(degreesToCardinal(90)).toBe("E");
  });

  it("zamienia 135° na SE", () => {
    expect(degreesToCardinal(135)).toBe("SE");
  });

  it("zamienia 180° na S", () => {
    expect(degreesToCardinal(180)).toBe("S");
  });

  it("zamienia 225° na SW", () => {
    expect(degreesToCardinal(225)).toBe("SW");
  });

  it("zamienia 270° na W", () => {
    expect(degreesToCardinal(270)).toBe("W");
  });

  it("zamienia 315° na NW", () => {
    expect(degreesToCardinal(315)).toBe("NW");
  });

  it("zamienia 360° na N", () => {
    expect(degreesToCardinal(360)).toBe("N");
  });
});

describe("knotsToMps", () => {
  it("przelicza wartość", () => {
    expect(knotsToMps(10)).toBe(5);
  });

  it("właściwie zaokrągla", () => {
    expect(knotsToMps(1)).toBe(1);
  });

  it("dobrze przelicza 0", () => {
    expect(knotsToMps(0)).toBe(0);
  });
});
