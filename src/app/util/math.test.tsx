import { roundNumber } from "./math";

describe("roundNumber", () => {
  test("roundNumber rounds down", () => {
    expect(roundNumber(2.49)).toBe(2);
    expect(roundNumber(2.5)).toBe(3);
  });
});
