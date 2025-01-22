/**
 * dateUtils.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 */

/**
 * The below function returns the number of days between two dates
 * @param date - the date to compare
 * @returns the number of days between two dates
 *
 */

import { differenceInDays } from "date-fns";

export const daysRemaining = (date: string | Date): number => {
  const date1 = new Date();

  // if date is undefined, throw error
  if (!date) {
    throw new Error("Invalid date format");
  }

  const date2 = typeof date === "string" ? new Date(date) : date;

  // Calculate the number of days between two dates
  const numberOfDays = differenceInDays(date2, date1);

  return numberOfDays;
};
