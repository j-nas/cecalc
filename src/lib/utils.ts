import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function feetToMeters(feet: number) {
  return feet * 0.3048;
}
export function metersToFeet(meters: number) {
  return meters / 0.3048;
}
