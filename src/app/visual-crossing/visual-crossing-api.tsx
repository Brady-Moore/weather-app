interface WeatherDataDay {
  // datetime: "2025-03-18";
  // datetimeEpoch: 1742270400;
  // tempmax: 78;
  // tempmin: 38;
  // temp: 58.2;
  // feelslikemax: 78;
  // feelslikemin: 38;
  // feelslike: 58.2;
  // dew: 33.5;
  // humidity: 44.2;
  // precip: 0;
  // precipprob: 0;
  // precipcover: 0;
  // preciptype: null;
  // snow: 0;
  // snowdepth: 0;
  // windgust: 9.2;
  // windspeed: 4.9;
  // winddir: 42.7;
  // pressure: 1022.5;
  // cloudcover: 5.7;
  // visibility: 10;
  // solarradiation: 290;
  // solarenergy: 25.2;
  // uvindex: 9;
  // severerisk: 10;
  // sunrise: "07:42:57";
  // sunriseEpoch: 1742298177;
  // sunset: "19:47:39";
  // sunsetEpoch: 1742341659;
  // moonphase: 0.64;
  // conditions: "Clear";
  // description: "Clear conditions throughout the day.";
  // icon: "clear-day";
  // stations: ["K2J9", "KTLH", "KBGE", "1080W"];
  // source: "comb";
}

interface CurrentConditions {
  // datetime: "04:50:00";
  // datetimeEpoch: 1742287800;
  // temp: 53.7;
  // feelslike: 53.7;
  // humidity: 32.4;
  // dew: 24.9;
  // precip: 0;
  // precipprob: 0;
  // snow: 0;
  // snowdepth: 0;
  // preciptype: null;
  // windgust: 5;
  // windspeed: 2.6;
  // winddir: 328;
  // pressure: 1023;
  // visibility: 9.9;
  // cloudcover: 0;
  // solarradiation: 0;
  // solarenergy: 0;
  // uvindex: 0;
  // conditions: "Clear";
  // icon: "clear-night";
  // stations: ["KTLH", "0344W", "1080W"];
  // source: "obs";
  // sunrise: "07:42:57";
  // sunriseEpoch: 1742298177;
  // sunset: "19:47:39";
  // sunsetEpoch: 1742341659;
  // moonphase: 0.64;
}

interface WeatherData {
  latitude: number;
  longitude: number;
  resolvedAddress: string;
  address: string;
  timezone: string;
  tzoffset: number;
  description: string;
  days: WeatherDataDay[];
  // alerts: [];
  currentConditions: CurrentConditions;
}

interface WeatherApiError {
  message: string;
  httpStatus?: number;
  httpStatusText?: string;
}

interface WeatherDataResponse {
  success: boolean;
  data?: WeatherData;
  error?: WeatherApiError;
}

export async function getWeatherData(
  city: string
): Promise<WeatherDataResponse> {
  const key = process.env.VISUAL_CROSSING_API_KEY || "NO_KEY";
  let data: WeatherData;
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=${key}&contentType=json`
    );
    if (!response.ok) {
      return {
        success: false,
        error: {
          message:
            (await response.text()) ||
            "There was an HTTP error when processing the weather data",
          httpStatus: response.status,
          httpStatusText: response.statusText,
        },
      };
    }
    data = (await response.json()) as WeatherData;
  } catch (error: any) {
    return {
      success: false,
      error: {
        message:
          error.message || "There was an error processing the weather data",
      },
    };
  }
  return {
    success: true,
    data,
  };
}
