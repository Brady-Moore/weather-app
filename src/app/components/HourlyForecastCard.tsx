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
      icon={<FiClock className="size-4.5 inline" />}
    >
      <div className="flex space-x-4 overflow-x-scroll w-full">
        {props.hours.map((hour) => {
          const WeatherIcon =
            weatherConditionIcons[hour.icon as WeatherIconKey];

          return (
            <div
              key={hour.datetime}
              className="flex flex-col text-sm min-w-[60px]"
            >
              <div className="mx-auto">{formatTime(hour.datetime)}</div>
              <WeatherIcon className="size-6 mx-auto" />
              <div className="mx-auto">{roundNumber(hour.temp)}°</div>
            </div>
          );
        })}
      </div>
    </WeatherCard>
  );
}
