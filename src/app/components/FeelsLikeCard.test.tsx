import FeelsLikeCard from "./FeelsLikeCard";
import { render, screen } from "@testing-library/react";

describe("FeelsLikeCard component", () => {
  test("shows 'Feels cooler' when temp > feelslike", () => {
    render(<FeelsLikeCard temp={25} feelslike={22} />);
    expect(screen.getByText("22°C")).toBeInTheDocument();
    expect(
      screen.getByText("Feels cooler than the actual temperature")
    ).toBeInTheDocument();
  });

  test("shows 'Feels warmer' when temp < feelslike", () => {
    render(<FeelsLikeCard temp={18} feelslike={21} />);
    expect(screen.getByText("21°C")).toBeInTheDocument();
    expect(
      screen.getByText("Feels warmer than the actual temperature")
    ).toBeInTheDocument();
  });

  test("shows 'Feels about the same' when temp = feelslike", () => {
    render(<FeelsLikeCard temp={13} feelslike={13} />);
    expect(screen.getByText("13°C")).toBeInTheDocument();
    expect(
      screen.getByText("Feels about the same as the actual temperature")
    ).toBeInTheDocument();
  });

  test("shows 'Feels warmer' when temp < feelslike", () => {
    render(<FeelsLikeCard temp={19.6} feelslike={20.4} />);
    expect(screen.getByText("20°C")).toBeInTheDocument();
    expect(
      screen.getByText("Feels about the same as the actual temperature")
    ).toBeInTheDocument();
  });

  test("renders thermometer icon", () => {
    render(<FeelsLikeCard temp={25} feelslike={22.3} />);
    const icon = screen.getByTestId("thermometer-icon");
    expect(icon).toBeInTheDocument();
  });
});
