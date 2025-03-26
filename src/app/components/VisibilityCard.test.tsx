import { render, screen } from "@testing-library/react";
import VisibilityCard from "./VisibilityCard";

describe("VisibilityCard", () => {
  test("displays pressure units properly", () => {
    render(<VisibilityCard visibility={10.1} />);
    expect(screen.getByText("10 km")).toBeInTheDocument();
  });

  test("displays pressure icon", () => {
    render(<VisibilityCard visibility={12} />);
    expect(screen.getByTestId("visibility-icon")).toBeInTheDocument();
  });
});
