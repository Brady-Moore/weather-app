import { roundNumber } from "../util/math";
import WeatherCard from "./WeatherCard";
import {
  isWeatherIconKey,
  weatherConditionIcons,
  WeatherIconKey,
} from "../util/WeatherConditionIcons";
import { FiClock } from "rocketicons/fi";
import { WeatherDataDayHour } from "../visual-crossing/visual-crossing-api";
import { formatTime } from "../util/format";
import { RxValueNone } from "rocketicons/rx";

interface HourlyForecastCardProps {
  className?: string;
  hours: WeatherDataDayHour[];
}

export default function HourlyForecastCard(props: HourlyForecastCardProps) {
  return (
    <WeatherCard
      title="Hourly Forecast"
      icon={<FiClock className="size-4.5 inline" />}
      className={props.className}
    >
      <div className="flex ml-2 gap-x-4 overflow-x-scroll w-full scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-950">
        {props.hours.map((hour) => {
          const WeatherIcon = isWeatherIconKey(hour.icon)
            ? weatherConditionIcons[hour.icon]
            : RxValueNone;

          return (
            <div
              key={hour.datetime}
              className="flex flex-col text-sm min-w-[60px] gap-y-2"
            >
              <div className="mx-auto">{formatTime(hour.datetime)}</div>
              <WeatherIcon className="size-6 mx-auto" />
              <div className="mx-auto mb-2">{roundNumber(hour.temp)}°</div>
            </div>
          );
        })}
      </div>
    </WeatherCard>
  );
}
