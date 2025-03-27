import { render, screen } from "@testing-library/react";
import UVIndexCard from "./UVIndexCard";

describe("UVIndexCard", () => {
  test("displays UV index and 'Low' when UV Index", () => {
    render(<UVIndexCard uvindex={1} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Low")).toBeInTheDocument();
  });
  test("displays 'Moderate' when 3 < UV Index < 6", () => {
    render(<UVIndexCard uvindex={3} />);
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("Moderate")).toBeInTheDocument();
  });
  test("displays UV index properly", () => {
    render(<UVIndexCard uvindex={6} />);
    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.getByText("High")).toBeInTheDocument();
  });

  test("displays UV icon", () => {
    render(<UVIndexCard uvindex={2} />);
    expect(screen.getByTestId("uv-index-icon")).toBeInTheDocument();
  });
});
