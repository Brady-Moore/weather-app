import { render, screen } from "@testing-library/react";
import UVIndexCard from "./UVIndexCard";

describe("UVIndexCard", () => {
  test("displays UV index properly", () => {
    render(<UVIndexCard uvindex={1} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Low")).toBeInTheDocument();
  });

  test("displays UV icon", () => {
    render(<UVIndexCard uvindex={2} />);
    expect(screen.getByTestId("uv-index-icon")).toBeInTheDocument();
  });
});
