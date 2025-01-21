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
  let date1 = new Date();
  console.log(date1, date);

  // if date is undefined, throw error
  if (!date) {
    throw new Error("Invalid date format");
  }

  let date2 = typeof date === "string" ? new Date(date) : date;
  // One day Time in ms (milliseconds)
  let oneDay = 1000 * 60 * 60 * 24;

  // Calculate the number of days between two dates
  let Difference_In_Days = Math.floor(
    (date2.getTime() - date1.getTime()) / oneDay
  );

  return Difference_In_Days;
};
