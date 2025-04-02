import { BiCalendar } from "rocketicons/bi";
import { roundNumber } from "../util/math";
import WeatherCard from "./WeatherCard";
import { WeatherDataDay } from "../visual-crossing/visual-crossing-api";
import dayFromDate from "../util/dayFromDate";
import {
  isWeatherIconKey,
  weatherConditionIcons,
} from "../util/weatherconditionicons";
import { RxValueNone } from "rocketicons/rx";

interface TenDayForecastCardProps {
  days: WeatherDataDay[];
  className?: string;
}

export default function TenDayForecastCard(props: TenDayForecastCardProps) {
  return (
    <WeatherCard
      title="10-Day Forecast"
      icon={<BiCalendar className="size-5 inline" />}
      className={props.className}
    >
      <div className="flex flex-col md:gap-3">
        <div className="grid grid-cols-4 gap-2 items-center ml-1.5">
          <span className="text-left font-extralight text-neutral-400"></span>
          <span className="text-right font-extralight text-neutral-400">
            Condition
          </span>
          <span className="text-right font-extralight text-neutral-400">
            Min
          </span>
          <span className="text-right font-extralight text-neutral-400">
            Max
          </span>
        </div>
        {props.days.map((day) => {
          const WeatherIcon = isWeatherIconKey(day.icon)
            ? weatherConditionIcons[day.icon]
            : RxValueNone;

          return (
            <div
              key={day.datetime}
              className="grid grid-cols-4 gap-2 items-center ml-1.5"
            >
              <span className="text-left text-neutral-400">
                {dayFromDate(day.datetime)}
              </span>
              <div className="flex justify-end">
                <WeatherIcon className="w-5 h-5" />
              </div>
              <span className="text-right">{roundNumber(day.tempmin)}°</span>
              <span className="text-right">{roundNumber(day.tempmax)}°</span>
            </div>
          );
        })}
      </div>
    </WeatherCard>
  );
}
