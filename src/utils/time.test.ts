import { describe, it, expect } from "vitest";

import { minutesAgo, formatLMT, freshnessColor } from "./time";

const now = new Date("2026-10-02T12:00:00Z"); // nasza "teraźniejszość"

describe("minutesAgo", () => {
  it("Podaje poprawnie czas - 30 minut temu", () => {
    expect(minutesAgo("2026-10-02T11:30:00Z", now)).toBe(30);
  });
  it("Podaje poprawnie czas - teraz", () => {
    expect(minutesAgo("2026-10-02T12:00:00Z", now)).toBe(0);
  });
  it("Nie pokazuje przyszłości - 30 minut w przyszłość", () => {
    expect(minutesAgo("2026-10-02T12:30:00Z", now)).toBe(0);
  });
});

describe("freshnessColor", () => {
  it("Koloruje czas na zielono dla niskich wartości czasu", () => {
    expect(freshnessColor(0)).toBe("green");
  });
  it("Koloruje czas na zielono dla granicznej wartości 60 minut", () => {
    expect(freshnessColor(60)).toBe("green");
  });
  it("Koloruje czas na pomarańczowo dla granicznej wartości 61 minut", () => {
    expect(freshnessColor(61)).toBe("orange");
  });
  it("Koloruje czas na pomarańczowo dla granicznej wartości 120 minut", () => {
    expect(freshnessColor(120)).toBe("orange");
  });
  it("Koloruje czas na czerwono dla granicznej wartości 121 minut", () => {
    expect(freshnessColor(121)).toBe("red");
  });
});

describe("formatLMT", () => {
  it("bez przesunięcia dla długości 0°", () => {
    expect(formatLMT("2026-10-02T12:00:00Z", 0)).toBe("2.10.2026, 12:00 LMT");
  });
  it("z przesunięciem dla długości +1h°", () => {
    expect(formatLMT("2026-10-02T12:00:00Z", 15)).toBe("2.10.2026, 13:00 LMT");
  });
  it("brzeg - przeskok doby + wiodące zero", () => {
    expect(formatLMT("2026-10-02T23:30:00Z", 15)).toBe("3.10.2026, 00:30 LMT");
  });
});
