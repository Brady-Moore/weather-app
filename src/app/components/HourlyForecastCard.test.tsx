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
    expect(screen.getByText("Hourly Forecast")).toBeInTheDocument();
    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  test("renders each hourly forecast entry correctly", () => {
    render(<HourlyForecastCard hours={mockHours} />);

    expect(screen.getByText("12:00")).toBeInTheDocument();
    expect(screen.getByText("13:00")).toBeInTheDocument();

    expect(screen.getByText("23°")).toBeInTheDocument();
    expect(screen.getByText("25°")).toBeInTheDocument();

    const weatherIcons = screen.getAllByTestId("weather-icon");
    expect(weatherIcons.length).toBe(2);
  });
});
