/**
 * dateUtils.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 */

/**
 * The below function returns the number of days between two dates
 * @param date
 * @returns
 */
export const daysRemaining = (date: string | Date): number => {
  const date1 = new Date();

  // if date is undefined, throw error
  if (!date) {
    throw new Error("Invalid date format");
  }

  const date2 = typeof date === "string" ? new Date(date) : date;
  // One day Time in ms (milliseconds)
  const oneDay = 1000 * 60 * 60 * 24;

  // Calculate the number of days between two dates
  const differenceInDays = Math.floor(
    (date2.getTime() - date1.getTime()) / oneDay
  );

  return differenceInDays;
};
