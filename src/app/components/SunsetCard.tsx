import { formatTime } from "../util/formatTime";
import WeatherCard from "./WeatherCard";
import { LuSunset } from "rocketicons/lu";

interface SunsetCardProps {
  sunset: string;
  tomorrowSunrise: string;
}

export default function SunsetCard(props: SunsetCardProps) {
  const sunsetNoSec = formatTime(props.sunset);
  const tomorrowSunriseNoSec = formatTime(props.tomorrowSunrise);

  return (
    <WeatherCard
      title="Sunset"
      icon={
        <LuSunset
          className="size-5 inline text-red-400"
          data-testid="sunset-icon"
        />
      }
      info={sunsetNoSec}
      description={`Sunrise Tomorrow: ${tomorrowSunriseNoSec}`}
    />
  );
}
