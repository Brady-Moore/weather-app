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
  snow: <WiSnow data-testid="snow" />,
  rain: <WiRain data-testid="rain" />,
  fog: <WiFog data-testid="fog" />,
  wind: <WiWindy data-testid="wind" />,
  cloudy: <WiCloudy data-testid="cloudy" />,
  "partly-cloudy-day": <WiDayCloudy data-testid="partly-cloudy-day" />,
  "partly-cloudy-night": (
    <WiNightAltPartlyCloudy data-testid="partly-cloudy-night" />
  ),
  "clear-day": <WiDaySunny data-testid="clear-day" />,
  "clear-night": <WiNightClear data-testid="clear-night" />,
};
