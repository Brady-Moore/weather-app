import {
  WiCloudy,
  WiDayCloudy,
  WiDaySunny,
  WiFog,
  WiNightAltPartlyCloudy,
  WiNightClear,
  WiRain,
  WiSnow,
  WiWindy,
} from "rocketicons/wi";

export const weatherConditionIcons = {
  snow: WiSnow,
  rain: WiRain,
  fog: WiFog,
  wind: WiWindy,
  cloudy: WiCloudy,
  "partly-cloudy-day": WiDayCloudy,
  "partly-cloudy-night": WiNightAltPartlyCloudy,
  "clear-day": WiDaySunny,
  "clear-night": WiNightClear,
};

export type WeatherIconKey = keyof typeof weatherConditionIcons;
