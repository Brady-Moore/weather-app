import dayFromDate from "../util/dayFromDate";
import { formatTime } from "../util/formatTime";
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
      <div className="flex justify-between">
        <span>{props.resolvedAddress}</span>
        <span>
          As of {formatTime(props.time)}, {dayFromDate(props.date)}
        </span>
      </div>
      <div>
        {props.currentTemp}°{" "}
        <WeatherIcon
          data-testid={props.icon}
          className="size-32 fill-amber-800"
        />
      </div>
      <div>Feels like: {props.feelslike}°</div>
      <div>{dayFromDate(props.date)}</div>
      <div>{props.conditions}</div>
      <div>
        H: {props.tempmax}° L: {props.tempmin}°
      </div>
    </CardBorder>
  );
}
