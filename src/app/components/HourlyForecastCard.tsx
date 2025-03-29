import { roundNumber } from "../util/math";
import WeatherCard from "./WeatherCard";
import { weatherConditionIcons, WeatherIconKey } from "./WeatherConditionIcons";
import { FiClock } from "rocketicons/fi";
import { WeatherDataDayHour } from "../visual-crossing/visual-crossing-api";
import { formatTime } from "../util/formatTime";

interface HourlyForecastCardProps {
  hours: WeatherDataDayHour[];
}

export default function HourlyForecastCard(props: HourlyForecastCardProps) {
  return (
    <WeatherCard
      title="Hourly Forecast"
      icon={<FiClock className="size-5 inline" />}
    >
      <div>
        {props.hours.map((hour) => {
          const WeatherIcon =
            weatherConditionIcons[hour.icon as WeatherIconKey];

          return (
            <div key={hour.datetime} className="flex justify-between text-sm">
              <span>{formatTime(hour.datetime)}</span>
              <WeatherIcon className="size-5" />
              <span>{roundNumber(hour.temp)}°</span>
            </div>
          );
        })}
      </div>
    </WeatherCard>
  );
}
