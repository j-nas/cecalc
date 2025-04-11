import ampacityTables from "@/data/ampacity-tables.json";
import metersPerAmp from "@/data/meters-per-amp.json";
import distanceCorrectionFactors from "@/data/distance-correction-factors.json";
import type { MetersPerAmp } from "@/types/meters-per-amp";
import type { AmpacityTables } from "@/types/ampacity-tables";
import type { DistanceCorrectionFactors } from "@/types/distance-correction-factors";

type NominalVoltage = 120 | 208 | 240 | 277 | 347 | 480 | 600;

export function getDistanceCorrectionFactor(
  temperatue: keyof DistanceCorrectionFactors,
  ampacity: number,
  current: number,
): number {
  if (!distanceCorrectionFactors[temperatue]) {
    throw new Error("Invalid temperature rating");
  }
  const percentageOfAllowableAmapacity = (current / ampacity) * 100;
  if (percentageOfAllowableAmapacity > 100) {
    throw new Error("Current exceeds allowable ampacity");
  }
  if (percentageOfAllowableAmapacity <= 0) {
    throw new Error("Invalid percentage of allowable ampacity");
  }
  if (
    percentageOfAllowableAmapacity <= 100 &&
    percentageOfAllowableAmapacity > 90
  ) {
    return distanceCorrectionFactors[temperatue][100];
  }
  if (
    percentageOfAllowableAmapacity <= 90 &&
    percentageOfAllowableAmapacity > 80
  ) {
    return distanceCorrectionFactors[temperatue][90];
  }
  if (
    percentageOfAllowableAmapacity <= 80 &&
    percentageOfAllowableAmapacity > 70
  ) {
    return distanceCorrectionFactors[temperatue][80];
  }
  if (
    percentageOfAllowableAmapacity <= 70 &&
    percentageOfAllowableAmapacity > 60
  ) {
    return distanceCorrectionFactors[temperatue][70];
  }
  if (
    percentageOfAllowableAmapacity <= 60 &&
    percentageOfAllowableAmapacity > 50
  ) {
    return distanceCorrectionFactors[temperatue][60];
  }
  if (
    percentageOfAllowableAmapacity <= 50 &&
    percentageOfAllowableAmapacity > 40
  ) {
    return distanceCorrectionFactors[temperatue][50];
  }
  if (percentageOfAllowableAmapacity <= 40) {
    return distanceCorrectionFactors[temperatue][40];
  }

  throw new Error("Invalid percentage of allowable ampacity");
}

function lookupAmpacityTable(
  table: keyof AmpacityTables,
  conductorSize: keyof MetersPerAmp,
  temperatureRating: keyof DistanceCorrectionFactors,
): number {
  const ampacityTable = ampacityTables[table];
  if (!ampacityTable) {
    throw new Error("Invalid ampacity table");
  }
  const conductor = ampacityTable[conductorSize];
  if (!conductor) {
    throw new Error("Invalid conductor size");
  }
  const ampacity = conductor.ampacities[temperatureRating];
  if (ampacity === undefined) {
    throw new Error("Invalid temperature rating");
  }
  return ampacity;
}

export function getMaximumDistance(
  conductorSize: keyof MetersPerAmp,
  current: number,
  temperatureRating: keyof DistanceCorrectionFactors,
  allowableVoltageDrop: number,
  voltage: NominalVoltage,
  table: keyof AmpacityTables,
): number {
  const material = () => {
    if (table === "copperFreeAir" || table === "copperConduit") {
      return "cu";
    }
    if (table === "aluminumFreeAir" || table === "aluminumConduit") {
      return "al";
    }
    throw new Error("Invalid ampacity table");
  };
  if (!metersPerAmp[conductorSize]) {
    throw new Error("Invalid conductor size");
  }
  if (!distanceCorrectionFactors[temperatureRating]) {
    throw new Error("Invalid temperature rating");
  }

  const voltageFactor = voltage / 120;

  const ampacity = lookupAmpacityTable(table, conductorSize, temperatureRating);

  const distanceCorrectionFactor = getDistanceCorrectionFactor(
    temperatureRating,
    ampacity,
    current,
  );
  const maximumDistance =
    (metersPerAmp[conductorSize]?.[material()] ?? 0) *
    allowableVoltageDrop *
    distanceCorrectionFactor *
    voltageFactor;

  return maximumDistance;
}
