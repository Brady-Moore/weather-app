import { roundNumber } from "../util/math";
import WeatherCard from "./WeatherCard";
import { WiRaindrop } from "rocketicons/wi";

interface HumidityCardProps {
  dew: number;
  humidity: number;
}

export default function humidityCard(props: HumidityCardProps) {
  return (
    <WeatherCard
      title="Humidity"
      icon={<WiRaindrop className="size-5 inline text-green-400" />}
      info={`${roundNumber(props.humidity)}%`}
      description={`The dew point is ${roundNumber(props.dew)}`}
    />
  );
}
