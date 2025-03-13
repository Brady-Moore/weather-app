import { render, screen } from "@testing-library/react";
import WeatherPanel from "./weather-panel";

describe("WeatherPanel", () => {
  test("calls fetch with key from environment variables", () => {
    process.env.VISUAL_CROSSING_API_KEY = "123456";
    global.fetch = jest.fn() as jest.Mock;
    render(<WeatherPanel />);
    expect((global.fetch as jest.Mock).mock.lastCall[0]).toContain(
      process.env.VISUAL_CROSSING_API_KEY
    );
  });
  test("displays error HTML if fetch() throws", async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error("fetch failed"))
    ) as jest.Mock;
    /* global.fetch = jest.fn(async () => {
      throw "fetch failed";
    }) as jest.Mock; */
    render(await WeatherPanel());
    await screen.findByText(
      "There was an error processing the weather data from Visual Crossing."
    );
  });

  test.skip("displays error HTML if response.json() throws", () => {});
  test.skip("displays expected temperature data", () => {});
  test.skip("displays error HTML if fetch() returns error status", () => {});
});
