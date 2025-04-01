import { roundNumber } from "../util/math";
import WeatherCard from "./WeatherCard";
import { SiRainmeter } from "rocketicons/si";

interface PrecipitationCardProps {
  precip: number;
  tomorrowPrecip: number;
}

export default function PrecipitationCard(props: PrecipitationCardProps) {
  const precipRound = roundNumber(props.precip);
  const tomorrowPrecipRound = roundNumber(props.tomorrowPrecip);
  return (
    <WeatherCard
      title="Precipitation"
      icon={
        <SiRainmeter
          className="size-5 inline"
          data-testid="precipitation-icon"
        />
      }
      info={`${precipRound} mm`}
      description={`${tomorrowPrecipRound} mm expected tomorrow.`}
    />
  );
}
