import { roundNumber } from "../util/math";
import WeatherCard from "./WeatherCard";
import { WiBarometer } from "rocketicons/wi";

interface PressureCardProps {
  pressure: number;
}

export default function PressureCard(props: PressureCardProps) {
  const pressureRound = roundNumber(props.pressure);
  return (
    <WeatherCard
      title="Pressure"
      icon={
        <WiBarometer className="size-5 inline" data-testid="pressure-icon" />
      }
      info={`${pressureRound} hPa`}
    />
  );
}
