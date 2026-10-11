import { describe, it, expect } from "vitest";
import { describeCloudCover } from "./clouds";

describe("describeCloudCover", () => {
  it("zamienia BKN na zachmurzenie duże", () => {
    expect(describeCloudCover("BKN")).toBe("zachmurzenie duże");
  });
  it("zamienia OVC na zachmurzenie całkowite", () => {
    expect(describeCloudCover("OVC")).toBe("zachmurzenie całkowite");
  });
  it("zamienia kod chmur na tekst, bez względu na wielkość liter", () => {
    expect(describeCloudCover("clr")).toBe("bezchmurnie");
  });
  it("fallback dla nieznanego kodu", () => {
    expect(describeCloudCover("XYZ")).toBe("XYZ");
  });
});
