import { roundNumber } from "../util/math";
import WeatherCard from "./WeatherCard";
import { TiEye } from "rocketicons/ti";

interface VisibilityCardProps {
  visibility: number;
}

export default function VisibilityCard(props: VisibilityCardProps) {
  const visibilityRound = roundNumber(props.visibility);
  return (
    <WeatherCard
      title="Visibility"
      icon={
        <TiEye
          className="size-5 inline text-yellow-400"
          data-testid="visibility-icon"
        />
      }
      info={`${visibilityRound} km`}
    />
  );
}
