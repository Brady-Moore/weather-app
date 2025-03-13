import { render } from "@testing-library/react";
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
});
