import { render, screen } from "@testing-library/react";
import { getWeatherData } from "./fetch-weather-data";

const visualCrossingSample = {
  queryCost: 1,
  latitude: 30.4398,
  longitude: -84.2806,
  resolvedAddress: "Tallahassee, FL, United States",
  address: "tallahassee",
  timezone: "America/New_York",
  tzoffset: -4,
  description: "Similar temperatures continuing with a chance of rain Sunday.",
  days: [
    {
      datetime: "2025-03-13",
      datetimeEpoch: 1741838400,
      tempmax: 72.1,
      tempmin: 48.8,
      temp: 61.2,
      feelslikemax: 72.1,
      feelslikemin: 48.8,
      feelslike: 61.2,
      dew: 55.9,
      humidity: 83.9,
      precip: 0.21,
      precipprob: 46,
      precipcover: 25,
      preciptype: ["rain"],
      snow: 0,
      snowdepth: 0,
      windgust: 17.2,
      windspeed: 9.2,
      winddir: 175.9,
      pressure: 1015.7,
      cloudcover: 44.4,
      visibility: 9.7,
      solarradiation: 154.3,
      solarenergy: 13.3,
      uvindex: 5,
      severerisk: 10,
      sunrise: "07:49:00",
      sunriseEpoch: 1741866540,
      sunset: "19:44:26",
      sunsetEpoch: 1741909466,
      moonphase: 0.48,
      conditions: "Rain, Partially cloudy",
      description: "Partly cloudy throughout the day with afternoon rain.",
      icon: "rain",
      stations: ["K2J9", "KTLH", "KBGE", "1080W"],
      source: "comb",
      hours: [
        {
          datetime: "12:00:00",
          datetimeEpoch: 1741881600,
          temp: 69,
          feelslike: 69,
          humidity: 70.28,
          dew: 58.9,
          precip: 0,
          precipprob: 2,
          snow: 0,
          snowdepth: 0,
          preciptype: null,
          windgust: 13.9,
          windspeed: 6.9,
          winddir: 180,
          pressure: 1017,
          visibility: 10.1,
          cloudcover: 38,
          solarradiation: 391,
          solarenergy: 1.4,
          uvindex: 4,
          severerisk: 10,
          conditions: "Partially cloudy",
          icon: "partly-cloudy-day",
          stations: null,
          source: "fcst",
        },
        {
          datetime: "13:00:00",
          datetimeEpoch: 1741885200,
          temp: 71,
          feelslike: 71,
          humidity: 68.27,
          dew: 60,
          precip: 0,
          precipprob: 5,
          snow: 0,
          snowdepth: 0,
          preciptype: null,
          windgust: 16.1,
          windspeed: 8.1,
          winddir: 190,
          pressure: 1016,
          visibility: 10.1,
          cloudcover: 51,
          solarradiation: 436,
          solarenergy: 1.6,
          uvindex: 4,
          severerisk: 10,
          conditions: "Partially cloudy",
          icon: "partly-cloudy-day",
          stations: null,
          source: "fcst",
        },
      ],
    },
  ],
  alerts: [
    {
      event: "Flood Warning",
      headline:
        "Flood Warning issued March 12 at 9:11PM EDT until March 14 at 8:00AM EDT by NWS Tallahassee FL",
      ends: "2025-03-13T15:15:00",
      endsEpoch: 1741893300,
      onset: "2025-03-12T21:11:00",
      onsetEpoch: 1741828260,
      id: "urn:oid:2.49.0.1.840.0.974e9bde6f477dfa1fab901ba2ae0dbf10ef4928.001.1",
      language: "en",
      link: "http://www.weather.gov",
      description:
        "...The Flood Warning is extended for the following rivers in\nFlorida...\n\nSt. Marks River near Newport On Old Magnolia Rd affecting Wakulla\nand Leon Counties.\n\n* WHAT...Minor flooding is occurring and minor flooding is forecast.\n\n* WHERE...St. Marks River near Newport On Old Magnolia Rd.\n\n* WHEN...Until Friday morning.\n\n* IMPACTS...At 8.0 feet, Water begins to flood yards of some\nresidences of homes near Old Magnolia Road in Wakulla County.\n\n* ADDITIONAL DETAILS...\n- At 8:00 PM EDT Wednesday the stage was 8.2 feet.\n- Recent Activity...The maximum river stage in the 24 hours\nending at 8:00 PM EDT Wednesday was 8.2 feet.\n- Forecast...The river is expected to crest near 8.2 feet just\nafter midnight tonight. It will then fall below flood stage\ntomorrow evening.\n- Flood stage is 8.0 feet.\n- Flood History...This crest compares to a previous crest of\n8.2 feet on 01/05/2021.\n- http://www.weather.gov/safety/flood\n",
    },
  ],
  stations: {
    "0344W": {
      distance: 274,
      latitude: 30.44,
      longitude: -84.283,
      useCount: 0,
      id: "0344W",
      name: "Challenger Learning Center FL US WEATHERSTEM",
      quality: 0,
      contribution: 0,
    },
    "1080W": {
      distance: 191,
      latitude: 30.442,
      longitude: -84.28,
      useCount: 0,
      id: "1080W",
      name: "Ballard Partners FL US WEATHERSTEM",
      quality: 0,
      contribution: 0,
    },
    "0272W": {
      distance: 6911,
      latitude: 30.401,
      longitude: -84.337,
      useCount: 0,
      id: "0272W",
      name: "FSU Reservation FL US WEATHERSTEM",
      quality: 0,
      contribution: 0,
    },
    K2J9: {
      distance: 31392,
      latitude: 30.6,
      longitude: -84.55,
      useCount: 0,
      id: "K2J9",
      name: "K2J9",
      quality: 50,
      contribution: 0,
    },
    KTLH: {
      distance: 10862,
      latitude: 30.38,
      longitude: -84.37,
      useCount: 0,
      id: "KTLH",
      name: "KTLH",
      quality: 100,
      contribution: 0,
    },
    KBGE: {
      distance: 68314,
      latitude: 30.97,
      longitude: -84.64,
      useCount: 0,
      id: "KBGE",
      name: "KBGE",
      quality: 95,
      contribution: 0,
    },
  },
  currentConditions: {
    datetime: "05:10:00",
    datetimeEpoch: 1741857000,
    temp: 58.6,
    feelslike: 58.6,
    humidity: 65.8,
    dew: 47.2,
    precip: 0,
    precipprob: 0,
    snow: 0,
    snowdepth: 0,
    preciptype: null,
    windgust: 8.2,
    windspeed: 2,
    winddir: 55,
    pressure: 1015,
    visibility: 9.9,
    cloudcover: 0,
    solarradiation: 0,
    solarenergy: 0,
    uvindex: 0,
    conditions: "Clear",
    icon: "clear-night",
    stations: ["0272W", "KTLH", "0344W", "1080W"],
    source: "obs",
    sunrise: "07:49:00",
    sunriseEpoch: 1741866540,
    sunset: "19:44:26",
    sunsetEpoch: 1741909466,
    moonphase: 0.48,
  },
};

describe("fetchWeatherData", () => {
  test("calls fetch with key from environment variables", async () => {
    process.env.VISUAL_CROSSING_API_KEY = "123456";
    global.fetch = jest.fn() as jest.Mock;
    await getWeatherData();
    expect((global.fetch as jest.Mock).mock.lastCall[0]).toContain(
      process.env.VISUAL_CROSSING_API_KEY
    );
  });
  test("returns error if fetch() throws", async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error("fetch failed"))
    ) as jest.Mock;
    const dataResponse = await getWeatherData();
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
    const dataResponse = await getWeatherData();
    expect(dataResponse.success).toBe(false);
    expect(dataResponse.error?.message).toBe("not a json");
  });

  test("return expected temperature data", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        statusText: "OK",
        json: () => Promise.resolve(visualCrossingSample),
      })
    ) as jest.Mock;
    const dataResponse = await getWeatherData();
    expect(dataResponse.success).toBe(true);
    expect(dataResponse.data).toBe(visualCrossingSample);
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
    const dataResponse = await getWeatherData();
    expect(dataResponse.success).toBe(false);
    expect(dataResponse.error?.message).toBe(sampleErrorText);
    expect(dataResponse.error?.httpStatus).toBe(sampleStatus);
    expect(dataResponse.error?.httpStatusText).toBe(sampleStatusText);
  });
});
