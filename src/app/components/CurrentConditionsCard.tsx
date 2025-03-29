import dayFromDate from "../util/dayFromDate";
import { formatTime } from "../util/formatTime";
import { roundNumber } from "../util/math";
import CardBorder from "./CardBorder";
import { weatherConditionIcons, WeatherIconKey } from "./WeatherConditionIcons";

export interface CurrentConditionsCardProps {
  date: string;
  time: string;
  currentTemp: number;
  feelslike: number;
  conditions: string;
  icon: WeatherIconKey;
  resolvedAddress: string;
  tempmax: number;
  tempmin: number;
}

export default function CurrentConditionsCard(
  props: CurrentConditionsCardProps
) {
  const WeatherIcon = weatherConditionIcons[props.icon];
  return (
    <CardBorder>
      <div className="bg-neutral-950 rounded-sm text-neutral-50">
        <div className="flex justify-between alig px-2 text-sm">
          <span>{props.resolvedAddress}</span>
          <span className="text-neutral-500 text-xs">
            As of {formatTime(props.time)}, {dayFromDate(props.date)}
          </span>
        </div>
        <div className="text-4xl flex justify-center items-center pt-2">
          {props.currentTemp}°
        </div>
        <div className="text-neutral-500">
          H: {roundNumber(props.tempmax)}° L: {roundNumber(props.tempmin)}°
        </div>
        <div>
          <span className="text-xs">{props.conditions}</span>
          <WeatherIcon data-testid={props.icon} className="size-5 inline" />
        </div>
      </div>
    </CardBorder>
  );
}
