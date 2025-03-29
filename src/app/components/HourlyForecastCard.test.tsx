import { render, screen } from "@testing-library/react";
import HourlyForecastCard from "./HourlyForecastCard";

jest.mock("./WeatherConditionIcons", () => ({
  weatherConditionIcons: {
    "clear-day": (props: any) => (
      <div data-testid="weather-icon">Clear Day Icon</div>
    ),
  },
}));

describe("HourlyForecastCard component", () => {
  const mockHours = [
    { datetime: "12:00:00", temp: 23.4, icon: "clear-day" },
    { datetime: "13:00:00", temp: 24.6, icon: "clear-day" },
  ];

  test("renders WeatherCard with correct title and clock icon", () => {
    render(<HourlyForecastCard hours={mockHours} />);
    // Verify that the WeatherCard's title is rendered.
    expect(screen.getByText("Hourly Forecast")).toBeInTheDocument();
    // Verify that the clock icon is rendered (FiClock likely renders an <svg> element).
    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  test("renders each hourly forecast entry correctly", () => {
    render(<HourlyForecastCard hours={mockHours} />);

    // Check that each hour's formatted time is rendered.
    expect(screen.getByText("12:00")).toBeInTheDocument();
    expect(screen.getByText("13:00")).toBeInTheDocument();

    // Check that the rounded temperatures are rendered correctly.
    expect(screen.getByText("23°")).toBeInTheDocument(); // Math.round(23.4) === 23
    expect(screen.getByText("25°")).toBeInTheDocument(); // Math.round(24.6) === 25

    const weatherIcons = screen.getAllByTestId("weather-icon");
    expect(weatherIcons.length).toBe(2);
  });
});
