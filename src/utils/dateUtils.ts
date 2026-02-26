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

/**
 * Try to parse a wide range of inputs into a valid Date object.
 * Returns `undefined` when the value cannot be interpreted as a date.
 */
export const parseDate = (value?: unknown): Date | undefined => {
  if (value == null) return undefined;
  if (value instanceof Date) return isNaN(value.getTime()) ? undefined : value;

  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;

    // Firestore-like Timestamp with toDate()
    if (typeof obj.toDate === "function") {
      try {
        const d = (obj.toDate as () => Date)();
        return d instanceof Date && !isNaN(d.getTime()) ? d : undefined;
      } catch {
        return undefined;
      }
    }

    // Firestore-like plain object { seconds, nanoseconds }
    if (typeof obj.seconds === "number") {
      const seconds = obj.seconds as number;
      const nanoseconds =
        typeof obj.nanoseconds === "number"
          ? (obj.nanoseconds as number)
          : 0;
      const ms = seconds * 1000 + Math.round(nanoseconds / 1e6);
      const d = new Date(ms);
      return isNaN(d.getTime()) ? undefined : d;
    }
  }

  // String or number representation
  if (typeof value === "string" || typeof value === "number") {
    const d = new Date(value as string | number);
    return isNaN(d.getTime()) ? undefined : d;
  }

  return undefined;
};
