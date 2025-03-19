interface WeatherDataDay {
  maxtemp: number;
  mintemp: number;
  temp: number;
}

interface ComplicatedDay extends WeatherDataDay {
  loveindex: number;
}

interface WeatherData {
  location: string;
  latitude: string;
  longitude: string;
  datetime: string;
  days: WeatherDataDay[];
}

interface WeatherApiError {
  httpStatus?: number;
  messageText?: string;
}

interface WeatherDataResponse {
  success: boolean;
  data?: WeatherData;
  error?: WeatherApiError;
}

export async function getWeatherData(
  city: string
): Promise<WeatherDataResponse> {
  const key = process.env.VISUAL_CROSSING_API_KEY || "NO_KEY>";
  let data;
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=${key}&contentType=json`
    );
    if (!response.ok) {
      return {
        success: false,
        error: { httpStatus: response.status, messageText: "blah" },
      };
    }
    data = await response.json();
  } catch (error: any) {
    return { success: false };
  }
  return { success: true, data: data };
}
