import { render, screen } from "@testing-library/react";
import TenDayForecastCard from "./TenDayForecastCard";
import { WeatherDataDay } from "../visual-crossing/visual-crossing-api";

jest.mock("rocketicons/bi", () => ({
  BiCalendar: () => <svg data-testid="calendar-icon" />,
}));

jest.mock("../util/dayFromDate", () => ({
  __esModule: true,
  default: (dateStr: string) => `Day-${dateStr}`,
}));

jest.mock("./WeatherConditionIcons", () => ({
  weatherConditionIcons: {
    "clear-day": (props: any) => <svg data-testid="weather-icon" {...props} />,
    cloudy: (props: any) => <svg data-testid="weather-icon" {...props} />,
    snow: (props: any) => <svg data-testid="fallback-icon" {...props} />,
  },
  isWeatherIconKey: (key: string) => ["clear-day", "cloudy"].includes(key),
}));

const mockDays: WeatherDataDay[] = [
  {
    datetime: "2025-03-28",
    tempmax: 15.8,
    tempmin: 5.2,
    temp: 10.5,
    feelslike: 10.1,
    dew: 2.1,
    humidity: 40,
    precip: 0,
    preciptype: ["rain"],
    windgust: 7,
    windspeed: 5,
    winddir: 180,
    pressure: 1010,
    visibility: 10,
    uvindex: 5,
    sunrise: "06:15:00",
    sunset: "18:25:00",
    conditions: "Clear",
    icon: "clear-day",
    hours: [{ datetime: "12:00:00", temp: 11, icon: "clear-day" }],
  },
  {
    datetime: "2025-03-29",
    tempmax: 18.6,
    tempmin: 7.3,
    temp: 12.5,
    feelslike: 12.1,
    dew: 3.2,
    humidity: 45,
    precip: 0.1,
    preciptype: ["rain"],
    windgust: 9,
    windspeed: 6,
    winddir: 200,
    pressure: 1008,
    visibility: 9,
    uvindex: 6,
    sunrise: "06:14:00",
    sunset: "18:26:00",
    conditions: "Cloudy",
    icon: "cloudy",
    hours: [{ datetime: "12:00:00", temp: 11, icon: "clear-day" }],
  },
];

describe("TenDayForecastCard", () => {
  test("renders the title and calendar icon", () => {
    render(<TenDayForecastCard days={mockDays} />);
    expect(screen.getByText("10-Day Forecast")).toBeInTheDocument();
    expect(screen.getByTestId("calendar-icon")).toBeInTheDocument();
  });

  test("renders one forecast row per day", () => {
    render(<TenDayForecastCard days={mockDays} />);
    const rows = screen.getAllByText(/Day-2025/);
    expect(rows).toHaveLength(2);
  });

  test("displays the correct date and rounded temperatures", () => {
    render(<TenDayForecastCard days={mockDays} />);
    expect(screen.getByText("Day-2025-03-28")).toBeInTheDocument();
    expect(screen.getByText("5°")).toBeInTheDocument();
    expect(screen.getByText("16°")).toBeInTheDocument();

    expect(screen.getByText("Day-2025-03-29")).toBeInTheDocument();
    expect(screen.getByText("7°")).toBeInTheDocument();
    expect(screen.getByText("19°")).toBeInTheDocument();
  });

  test("renders weather icons for each day", () => {
    render(<TenDayForecastCard days={mockDays} />);
    const icons = screen.getAllByTestId("weather-icon");
    expect(icons).toHaveLength(2);
  });
});
