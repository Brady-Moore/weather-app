import { timeFormat } from "./string";

describe("timeFormat", () => {
  test("returns a valid time string without leading 0's or seconds", () => {
    expect(timeFormat("09:12:32")).toBe("9:12");
    expect(timeFormat("11:22:42")).toBe("11:22");
  });

  test("returns the same string when it's not a expected time string format (##:##:##)", () => {
    expect(timeFormat("abcdefgh")).toBe("abcdefgh"); // same string length, but not valid
    expect(timeFormat("9:25")).toBe("9:25");
    expect(timeFormat("")).toBe("");
  });
});
