import dayFromDate from "../util/dayFromDate";
import { formatTime } from "../util/format";
import { roundNumber } from "../util/math";
import CardBorder from "./CardBorder";
import {
  weatherConditionIcons,
  WeatherIconKey,
} from "../util/weatherconditionicons";

export interface CurrentConditionsCardProps {
  className?: string;
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
    <CardBorder className={props.className}>
      <div className="rounded-sm px-2 py-1">
        <div className="flex justify-between gap-1 text-sm">
          <span>{props.resolvedAddress}</span>
          <span className="text-neutral-300 text-xs text-right">
            As of {formatTime(props.time)}, {dayFromDate(props.date)}
          </span>
        </div>
        <div className="text-6xl flex justify-center items-center pt-3">
          {roundNumber(props.currentTemp)}°C
        </div>
        <div>
          <span className="text-lg">{props.conditions}</span>
          <WeatherIcon
            data-testid={props.icon}
            className="size-7 inline text-neutral-400"
          />
        </div>
        <div className="text-neutral-300">
          H: {roundNumber(props.tempmax)}°C L: {roundNumber(props.tempmin)}°C
        </div>
      </div>
    </CardBorder>
  );
}
