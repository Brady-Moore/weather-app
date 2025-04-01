import { render, screen } from "@testing-library/react";
import HourlyForecastCard from "./HourlyForecastCard";
import { visualCrossingSampleData } from "../test/sample-data";

jest.mock("rocketicons/wi", () => ({
  WiSnow: () => <svg data-testid="weather-icon" />,
  WiRain: () => <svg data-testid="weather-icon" />,
  WiFog: () => <svg data-testid="weather-icon" />,
  WiWindy: () => <svg data-testid="weather-icon" />,
  WiCloudy: () => <svg data-testid="weather-icon" />,
  WiDayCloudy: () => <svg data-testid="weather-icon" />,
  WiNightAltPartlyCloudy: () => <svg data-testid="weather-icon" />,
  WiDaySunny: () => <div data-testid="weather-icon">Clear Day Icon</div>,
  WiNightClear: () => <svg data-testid="weather-icon" />,
}));

jest.mock("rocketicons/rx", () => ({
  RxValueNone: () => <svg data-testid="weather-fallback-icon" />,
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

  test("renders fallback weather icons for invalid weather icon string", () => {
    render(
      <HourlyForecastCard
        hours={[
          { ...visualCrossingSampleData.days[0].hours[0], icon: "INVALID" },
        ]}
      />
    );
    screen.getByTestId("weather-fallback-icon");
  });
});
