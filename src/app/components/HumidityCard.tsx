import { roundNumber } from "../util/math";
import WeatherCard from "./WeatherCard";
import { WiHumidity } from "rocketicons/wi";

export interface HumidityCardProps {
  dew: number;
  humidity: number;
}

export default function HumidityCard(props: HumidityCardProps) {
  return (
    <WeatherCard
      title="Humidity"
      icon={
        <WiHumidity
          className="size-5 inline text-green-400"
          data-testid="humidity-icon"
        />
      }
      info={`${roundNumber(props.humidity)}%`}
      description={`The dew point is ${roundNumber(props.dew)}°`}
    />
  );
}
