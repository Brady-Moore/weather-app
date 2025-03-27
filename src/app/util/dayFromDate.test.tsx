import { dayFromDate } from "./dayFromDate";

describe("dayFromDate", () => {
  test("returns the correct day of the week as a string", () => {
    expect(dayFromDate("2025-03-26")).toBe("Wednesday");
    expect(dayFromDate("2025-03-25")).toBe("Tuesday");
    expect(dayFromDate("2025-03-24")).toBe("Monday");
    expect(dayFromDate("2025-03-23")).toBe("Sunday");
    expect(dayFromDate("2025-03-22")).toBe("Saturday");
    expect(dayFromDate("2025-03-21")).toBe("Friday");
    expect(dayFromDate("2025-03-20")).toBe("Thursday");
  });
});
