import WeatherCard from "./WeatherCard";
import { HiSun } from "rocketicons/hi";

interface UVIndexCardProps {
  uvindex: number;
}

const UVIndexDescription = (uvindex: number) => {
  return uvindex < 3 ? "Low" : uvindex < 6 ? "Moderate" : "High";
};

export default function UVIndexCard(props: UVIndexCardProps) {
  return (
    <WeatherCard
      title="UV Index"
      icon={<HiSun className="size-5 inline" data-testid="uv-index-icon" />}
      info={props.uvindex}
      description={UVIndexDescription(props.uvindex)}
    />
  );
}
