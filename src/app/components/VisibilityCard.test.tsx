import { render, screen } from "@testing-library/react";

describe("VisibilityCard", () => {
  test("displays pressure units properly", () => {
    render(<VisibilityCard visibility={10.1} />);
    expect(screen.getByText("10 km")).toBeInTheDocument();
  });

  test("displays pressure icon", () => {
    render(<VisibilityCard />);
    expect(screen.getByTestId("visibility-icon")).toBeInTheDocument();
  });
});
