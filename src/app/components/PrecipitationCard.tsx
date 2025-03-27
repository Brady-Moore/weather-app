import { roundNumber } from "../util/math";
import WeatherCard from "./WeatherCard";
import { WiRaindrops } from "rocketicons/wi";

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
        <WiRaindrops
          className="size-5 inline text-red-600"
          data-testid="precipitation-icon"
        />
      }
      info={`${precipRound} mm`}
      description={`${tomorrowPrecipRound} mm expected tomorrow.`}
    />
  );
}
