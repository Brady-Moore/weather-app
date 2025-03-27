import { formatTime } from "./formatTime";

describe("formatTime", () => {
  test("returns a valid time string without leading 0's or seconds", () => {
    expect(formatTime("09:12:32")).toBe("9:12");
    expect(formatTime("11:22:42")).toBe("11:22");
  });

  test("returns the same string when it's not a expected time string format (##:##:##)", () => {
    expect(() => {
      formatTime("abcdefgh");
    }).not.toThrow();
    expect(() => {
      formatTime("9:25");
    }).not.toThrow();
    expect(() => {
      formatTime("");
    }).not.toThrow();
  });
});
