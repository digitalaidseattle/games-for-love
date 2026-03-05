import { describe, expect, it } from "vitest";
import { parseDate, daysRemaining } from "./dateUtils";

// Helper to compare dates by ms value
const ms = (d?: Date) => (d ? d.getTime() : undefined);

describe("dateUtils", () => {
  it("parseDate should return undefined for nullish values", () => {
    expect(parseDate(undefined)).toBeUndefined();
    expect(parseDate(null)).toBeUndefined();
  });

  it("parseDate should accept Date instances", () => {
    const d = new Date("2024-01-01");
    expect(ms(parseDate(d))).toEqual(d.getTime());
  });

  it("parseDate should parse numeric and string inputs", () => {
    const dStr = "2024-01-02";
    const dNum = new Date(dStr).getTime();
    expect(ms(parseDate(dStr))).toEqual(dNum);
    expect(ms(parseDate(dNum))).toEqual(dNum);
  });

  it("parseDate should handle firestore-like objects", () => {
    const target = new Date("2024-01-03");
    const tsObj = { toDate: () => target };
    expect(ms(parseDate(tsObj))).toEqual(target.getTime());

    const plain = { seconds: Math.floor(target.getTime() / 1000), nanoseconds: 0 };
    expect(ms(parseDate(plain))).toEqual(target.getTime());

    // missing nanoseconds should also work
    const plain2 = { seconds: Math.floor(target.getTime() / 1000) };
    expect(ms(parseDate(plain2))).toEqual(target.getTime());
  });

  it("parseDate should return undefined for invalid inputs", () => {
    expect(parseDate({})).toBeUndefined();
    expect(parseDate({ foo: "bar" })).toBeUndefined();
    expect(parseDate("not a date")).toBeUndefined();
  });

  it("daysRemaining should compute difference correctly", () => {
    const future = new Date();
    future.setDate(future.getDate() + 5);
    const days = daysRemaining(future);
    expect(days).toBeGreaterThanOrEqual(4);
    expect(days).toBeLessThanOrEqual(6);
  });
});
