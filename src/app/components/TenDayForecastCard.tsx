import { BiCalendar } from "rocketicons/bi";
import { roundNumber } from "../util/math";
import WeatherCard from "./WeatherCard";
import { WeatherDataDay } from "../visual-crossing/visual-crossing-api";
import dayFromDate from "../util/dayFromDate";
import { weatherConditionIcons, WeatherIconKey } from "./WeatherConditionIcons";

interface TenDayForecastCardProps {
  days: WeatherDataDay[];
}

export default function TenDayForecastCard(props: TenDayForecastCardProps) {
  return (
    <WeatherCard
      title="10-Day Forecast"
      icon={<BiCalendar className="size-5 inline" />}
    >
      <div>
        {props.days.map((day) => {
          const WeatherIcon = weatherConditionIcons[day.icon as WeatherIconKey];

          return (
            <div key={day.datetime} className="flex justify-between text-sm">
              <span>{dayFromDate(day.datetime)}</span>
              <WeatherIcon className="size-5" />
              <span>{roundNumber(day.tempmin)}°</span>
              <span>{roundNumber(day.tempmax)}°</span>
            </div>
          );
        })}
      </div>
    </WeatherCard>
  );
}
