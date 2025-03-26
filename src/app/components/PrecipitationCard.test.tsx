import { render, screen } from "@testing-library/react";
import PrecipitationCard from "./PrecipitationCard";

describe("PrecipitationCard", () => {
  test("displays precipitation amount properly", () => {
    render(<PrecipitationCard precip={2} tomorrowPrecip={4} />);
    expect(screen.getByText("2 mm")).toBeInTheDocument();
  });

  test("renders precipitation icon", () => {
    render(<PrecipitationCard precip={1.1} tomorrowPrecip={0} />);
    expect(screen.getByTestId("precipitation-icon")).toBeInTheDocument();
  });

  test("displays expected precipitation for tomorrow", () => {
    render(<PrecipitationCard precip={3} tomorrowPrecip={7} />);
    expect(screen.getByText("7 mm expected tomorrow.")).toBeInTheDocument();
  });

  test("displays rounded values", () => {
    render(<PrecipitationCard precip={1.6} tomorrowPrecip={3.2} />);

    expect(screen.getByText("2 mm")).toBeInTheDocument();
    expect(screen.getByText("3 mm expected tomorrow.")).toBeInTheDocument();
  });
});
