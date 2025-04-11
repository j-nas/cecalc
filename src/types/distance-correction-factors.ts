type InsulationTemperature = 60 | 75 | 90 | 110 | 125 | 200;

export type DistanceCorrectionFactors = {
  [key in InsulationTemperature]: {
    "100": number;
    "90": number;
    "80": number;
    "70": number;
    "60": number;
    "50": number;
    "40": number;
  };
};
