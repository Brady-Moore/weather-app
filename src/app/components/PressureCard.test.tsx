import { roundNumber } from "../util/math";
import { render, screen } from "@testing-library/react";

describe("PressureCard", () => {
  test("displays atmospheric pressure properly", () => {
    render(<PressureCard pressure={999.7} />);
    expect(screen.getByText("999 hPa")).toBeInTheDocument();
  });

  test("displays UV icon", () => {
    render(<PressureCard pressure={2} />);
    expect(screen.getByTestId("pressure-icon")).toBeInTheDocument();
  });
});
