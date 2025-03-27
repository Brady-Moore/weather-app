import { roundNumber } from "../util/math";
import WeatherCard from "./WeatherCard";
import { WiThermometer } from "rocketicons/wi";

export interface FeelsLikeCardProps {
  temp: number;
  feelslike: number;
}

const feelsLikeDescription = (temp: number, feelslike: number) => {
  const tempRound = roundNumber(temp);
  const feelslikeRound = roundNumber(feelslike);

  return tempRound > feelslikeRound
    ? "Feels cooler than the actual temperature"
    : tempRound < feelslikeRound
      ? "Feels warmer than the actual temperature"
      : "Feels about the same as the actual temperature";
};

export default function FeelsLikeCard(props: FeelsLikeCardProps) {
  const feelslikeRound = roundNumber(props.feelslike);
  return (
    <WeatherCard
      title="Feels like"
      icon={
        <WiThermometer
          className="size-5 inline text-yellow-400"
          data-testid="thermometer-icon"
        />
      }
      info={`${feelslikeRound}°`}
      description={feelsLikeDescription(props.temp, props.feelslike)}
    />
  );
}
