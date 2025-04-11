import { describe, it, expect } from "vitest";
import {
  getDistanceCorrectionFactor,
  getMaximumDistance,
} from "./voltage-drop";
import distanceCorrectionFactors from "@/data/distance-correction-factors.json";
describe("getDistanceCorrectionFactor", () => {
  it("should return the correct factor for percentage > 90 and <= 100", () => {
    const result = getDistanceCorrectionFactor(75, 100, 95);
    expect(result).toBe(0.96);
  });

  it("should return the correct factor for percentage > 80 and <= 90", () => {
    const result = getDistanceCorrectionFactor(75, 100, 85);
    expect(result).toBe(1);
  });

  it("should return the correct factor for percentage > 70 and <= 80", () => {
    const result = getDistanceCorrectionFactor(90, 100, 75);
    expect(result).toBe(distanceCorrectionFactors["90"][80]);
  });

  it("should return the correct factor for percentage > 60 and <= 70", () => {
    const result = getDistanceCorrectionFactor(60, 100, 65);
    expect(result).toBe(distanceCorrectionFactors[60][70]);
  });

  it("should return the correct factor for percentage > 50 and <= 60", () => {
    const result = getDistanceCorrectionFactor(110, 100, 55);
    expect(result).toBe(distanceCorrectionFactors[110][60]);
  });

  it("should return the correct factor for percentage > 40 and <= 50", () => {
    const result = getDistanceCorrectionFactor(125, 100, 45);
    expect(result).toBe(distanceCorrectionFactors[125][50]);
  });

  it("should return the correct factor for percentage <= 40", () => {
    const result = getDistanceCorrectionFactor(200, 100, 35);
    expect(result).toBe(distanceCorrectionFactors[200][40]);
  });

  it("should throw an error if current exceeds ampacity", () => {
    expect(() => getDistanceCorrectionFactor(75, 100, 105)).toThrow(
      "Current exceeds allowable ampacity",
    );
  });

  it("should throw an error for invalid percentage of allowable ampacity", () => {
    expect(() => getDistanceCorrectionFactor(75, 0, 50)).toThrow(
      "Invalid percentage of allowable ampacity",
    );
  });

  it("should throw an error for an invalid temperature rating", () => {
    expect(() =>
      // biome-ignore lint/suspicious/noExplicitAny: testing invalid input
      getDistanceCorrectionFactor("invalid" as any, 100, 50),
    ).toThrow("Invalid temperature rating");
  });

  it("should throw an error if percentage of allowable ampacity is <= 0", () => {
    expect(() => getDistanceCorrectionFactor(75, 100, 0)).toThrow(
      "Invalid percentage of allowable ampacity",
    );
  });

  it("should handle edge case where percentage is exactly 100", () => {
    const result = getDistanceCorrectionFactor(75, 100, 100);
    expect(result).toBe(distanceCorrectionFactors[75][100]);
  });

  it("should handle edge case where percentage is exactly 90", () => {
    const result = getDistanceCorrectionFactor(75, 100, 90);
    expect(result).toBe(distanceCorrectionFactors[75][90]);
  });

  it("should handle edge case where percentage is exactly 80", () => {
    const result = getDistanceCorrectionFactor(75, 100, 80);
    expect(result).toBe(distanceCorrectionFactors[75][80]);
  });

  it("should handle edge case where percentage is exactly 70", () => {
    const result = getDistanceCorrectionFactor(75, 100, 70);
    expect(result).toBe(distanceCorrectionFactors[75][70]);
  });

  it("should handle edge case where percentage is exactly 60", () => {
    const result = getDistanceCorrectionFactor(75, 100, 60);
    expect(result).toBe(distanceCorrectionFactors[75][60]);
  });

  it("should handle edge case where percentage is exactly 50", () => {
    const result = getDistanceCorrectionFactor(75, 100, 50);
    expect(result).toBe(distanceCorrectionFactors[75][50]);
  });

  it("should handle edge case where percentage is exactly 40", () => {
    const result = getDistanceCorrectionFactor(75, 100, 40);
    expect(result).toBe(distanceCorrectionFactors[75][40]);
  });
});
describe("getMaximumDistance", () => {
  it("should calculate the correct maximum distance for valid inputs", () => {
    const result = getMaximumDistance("12", 16, 90, 3, 240, "copperConduit");
    expect(result).toBe(38);
  });

  it("should throw an error for an invalid conductor size", () => {
    expect(() =>
      getMaximumDistance(
        // biome-ignore lint/suspicious/noExplicitAny: testing invalid input
        "invalid" as any,
        30,
        75,
        3,
        120,
        "copperConduit",
      ),
    ).toThrow("Invalid conductor size");
  });

  it("should throw an error for an invalid temperature rating", () => {
    expect(() =>
      getMaximumDistance(
        "10",
        30,
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        "invalid" as any,
        3,
        120,
        "copperConduit",
      ),
    ).toThrow("Invalid temperature rating");
  });

  it("should throw an error for an invalid ampacity table", () => {
    expect(() =>
      getMaximumDistance(
        "10",
        30,
        75,
        3,
        120,
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        "invalid" as any,
      ),
    ).toThrow("Invalid ampacity table");
  });

  it("should calculate the correct maximum distance for aluminum conductor", () => {
    const result = getMaximumDistance("10", 20, 75, 5, 240, "aluminumConduit");
    expect(result).toBeGreaterThan(0);
  });

  it("should handle edge case where allowable voltage drop is 0", () => {
    const result = getMaximumDistance("10", 20, 75, 0, 240, "copperConduit");
    expect(result).toBe(0);
  });

  it("should handle edge case where voltage is exactly 120", () => {
    const result = getMaximumDistance("10", 20, 75, 3, 120, "copperConduit");
    expect(result).toBeGreaterThan(0);
  });

  it("should throw an error if ampacity lookup fails", () => {
    expect(() =>
      getMaximumDistance("10", 30, 90, 3, 120, "copperConduit"),
    ).toThrow("Invalid temperature rating");
  });
});
