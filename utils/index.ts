import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getProgressPercentage = (
  currentStep: number,
  totalSteps: number
) => (totalSteps ? Math.round((currentStep / totalSteps) * 100) : 0);


export const truncateString = (str: string, count: number): string => {
  return str.length > count ? `${str.slice(0, count)}...` : str;
};