type ConductorSize =
  | "14"
  | "12"
  | "10"
  | "8"
  | "6"
  | "4"
  | "3"
  | "2"
  | "1"
  | "0"
  | "00"
  | "000"
  | "0000";

export type MetersPerAmp = {
  [key in ConductorSize]: {
    al: number;
    cu: number;
  };
};
