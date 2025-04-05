import { render, screen } from "@testing-library/react";
import WindCard from "./WindCard";

describe("WindCard", () => {
  test("display wind speed, gust, and direction", () => {
    render(<WindCard windspeed={19} windgust={39} winddir={347} />);
    expect(screen.getByText("Wind")).toBeInTheDocument();
    expect(screen.getByText("Gusts")).toBeInTheDocument();
    expect(screen.getByText("Direction")).toBeInTheDocument();
    expect(screen.getByText("19 m/s")).toBeInTheDocument();
    expect(screen.getByText("39 m/s")).toBeInTheDocument();
    expect(screen.getByText("347°C")).toBeInTheDocument();
  });

  test("displays rounded values", () => {
    render(<WindCard windspeed={19.6} windgust={37.2} winddir={42.7} />);

    expect(screen.getByText("20 m/s")).toBeInTheDocument();
    expect(screen.getByText("37 m/s")).toBeInTheDocument();
    expect(screen.getByText("43°C")).toBeInTheDocument();
  });

  test("renders WiHumidity icon", () => {
    render(<WindCard windspeed={19.6} windgust={37.7} winddir={42.7} />);
    expect(screen.getByTestId("wind-icon")).toBeInTheDocument();
  });
});
