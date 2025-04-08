import { getWeatherData } from "./visual-crossing-api";
import { visualCrossingSampleData } from "../sampledata/sample-data";

describe("fetchWeatherData", () => {
  const sampleCityName = "samplecityname";
  test("calls fetch with key from environment variables", async () => {
    process.env.VISUAL_CROSSING_API_KEY = "123456";
    global.fetch = jest.fn() as jest.Mock;
    await getWeatherData(sampleCityName);
    expect((global.fetch as jest.Mock).mock.lastCall[0]).toContain(
      process.env.VISUAL_CROSSING_API_KEY
    );
  });

  test("calls fetch with city from passed city parameter", async () => {
    global.fetch = jest.fn() as jest.Mock;
    await getWeatherData(sampleCityName);
    expect((global.fetch as jest.Mock).mock.lastCall[0]).toContain(
      sampleCityName
    );
  });

  test("returns error if fetch() throws", async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error("fetch failed"))
    ) as jest.Mock;
    const dataResponse = await getWeatherData(sampleCityName);
    expect(dataResponse.success).toBe(false);
    expect(dataResponse.error?.message).toBe("fetch failed");
  });

  test("returns error if response.json() throws", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.reject(new Error("not a json")),
        ok: true,
      })
    ) as jest.Mock;
    const dataResponse = await getWeatherData(sampleCityName);
    expect(dataResponse.success).toBe(false);
    expect(dataResponse.error?.message).toBe("not a json");
  });

  test("return expected temperature data", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        statusText: "OK",
        json: () => Promise.resolve(visualCrossingSampleData),
      })
    ) as jest.Mock;
    const dataResponse = await getWeatherData(sampleCityName);
    expect(dataResponse.success).toBe(true);
    expect(dataResponse.data).toBe(visualCrossingSampleData);
  });

  test("returns error if fetch() returns error status", async () => {
    const sampleErrorText = "404: Data does not exist";
    const sampleStatus = 404;
    const sampleStatusText = "Not Found";
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve(sampleErrorText),
        ok: false,
        status: sampleStatus,
        statusText: sampleStatusText,
      })
    ) as jest.Mock;
    const dataResponse = await getWeatherData(sampleCityName);
    expect(dataResponse.success).toBe(false);
    expect(dataResponse.error?.message).toBe(sampleErrorText);
    expect(dataResponse.error?.httpStatus).toBe(sampleStatus);
    expect(dataResponse.error?.httpStatusText).toBe(sampleStatusText);
  });
});
