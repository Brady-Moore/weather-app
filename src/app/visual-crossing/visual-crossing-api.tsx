// https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/#response-section
export interface WeatherDataDay {
  // datetime: "2025-03-18";
  // datetimeEpoch: 1742270400;
  tempmax: number; // eg. 38
  tempmin: number; // eg. 38
  temp: number; // eg. 62.1
  // feelslikemax: 78;
  // feelslikemin: 38;
  feelslike: number; // eg. 58.2;
  dew: number; // eg. 33.5
  humidity: number; // eg. 44.2
  precip: number; // eg. 1.1
  // precipprob: 0;
  // precipcover: 0;
  preciptype: string[] | null; // eg. ["rain"];
  // snow: 0;
  // snowdepth: 0;
  windgust: number; // eg. 9.2
  windspeed: number; // eg. 4.9
  winddir: number; // eg. 42.7
  pressure: number; // eg. 1022.5
  // cloudcover: 5.7;
  visibility: number; // eg. 10
  // solarradiation: 290;
  // solarenergy: 25.2;
  uvindex: number; // eg. 9
  // severerisk: 10;
  sunrise: string; // eg. "07:42:57"
  // sunriseEpoch: 1742298177;
  sunset: string; // eg. "19:47:39"
  // sunsetEpoch: 1742341659;
  // moonphase: 0.64;
  conditions: string; // eg "Clear"
  // description: "Clear conditions throughout the day.";
  icon: string; // eg ""clear-day""
  // stations: ["K2J9", "KTLH", "KBGE", "1080W"];
  // source: "comb";
  // "hours": [
  //   {
  //    "datetime": "12:00:00",
  //    "datetimeEpoch": 1742486400,
  //    "temp": 63.9,
  //    "feelslike": 63.9,
  //    "humidity": 67.48,
  //    "dew": 53,
  //    "precip": 0.012,
  //    "precipprob": 2,
  //    "snow": 0,
  //    "snowdepth": 0,
  //    "preciptype": [
  //     "rain"
  //    ],
  //    "windgust": 23,
  //    "windspeed": 11.4,
  //    "winddir": 290,
  //    "pressure": 1015,
  //    "visibility": 10.1,
  //    "cloudcover": 68,
  //    "solarradiation": 260,
  //    "solarenergy": 0.9,
  //    "uvindex": 3,
  //    "severerisk": 10,
  //    "conditions": "Partially cloudy",
  //    "icon": "partly-cloudy-day",
  //    "stations": null,
  //    "source": "fcst"
  //   },
  //   {
  //    "datetime": "13:00:00",
  //    "datetimeEpoch": 1742490000,
  //    "temp": 69,
  //    "feelslike": 69,
  //    "humidity": 48.95,
  //    "dew": 49,
  //    "precip": 0,
  //    "precipprob": 0,
  //    "snow": 0,
  //    "snowdepth": 0,
  //    "preciptype": null,
  //    "windgust": 24.2,
  //    "windspeed": 13.9,
  //    "winddir": 280,
  //    "pressure": 1015,
  //    "visibility": 10.1,
  //    "cloudcover": 20,
  //    "solarradiation": 741,
  //    "solarenergy": 2.7,
  //    "uvindex": 7,
  //    "severerisk": 10,
  //    "conditions": "Clear",
  //    "icon": "clear-day",
  //    "stations": null,
  //    "source": "fcst"
  //   }
  //  ]
}

export interface CurrentConditions {
  datetime: string; // eg. "04:50:00"
  // datetimeEpoch: 1742287800;
  temp: number; // eg. 53.7
  feelslike: number; // eg. 53.7
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
  conditions: string; // eg. "Clear"
  icon: string; // eg. "clear-night"
  // stations: ["KTLH", "0344W", "1080W"];
  // source: "obs";
  // sunrise: "07:42:57";
  // sunriseEpoch: 1742298177;
  // sunset: "19:47:39";
  // sunsetEpoch: 1742341659;
  // moonphase: 0.64;
}

export interface WeatherData {
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

export interface WeatherApiError {
  message: string;
  httpStatus?: number;
  httpStatusText?: string;
}

export interface WeatherDataResponse {
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
    const encodedCity = encodeURIComponent(city);
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodedCity}?unitGroup=metric&key=${key}&contentType=json`
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
