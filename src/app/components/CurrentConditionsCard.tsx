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
        <div className="flex justify-between ">
          <span>{props.resolvedAddress}</span>
          <span className="text-neutral-500">
            As of {formatTime(props.time)}, {dayFromDate(props.date)}
          </span>
        </div>
        <div>
          {props.currentTemp}°
          <WeatherIcon data-testid={props.icon} className="size-16 inline" />
        </div>
        <div>{props.conditions}</div>
        <div className="text-neutral-500">
          H: {roundNumber(props.tempmax)}° L: {roundNumber(props.tempmin)}°
        </div>
      </div>
    </CardBorder>
  );
}
