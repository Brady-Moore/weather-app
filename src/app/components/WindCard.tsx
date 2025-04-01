import { roundNumber } from "../util/math";
import WeatherCard from "./WeatherCard";
import { FiWind } from "rocketicons/fi";

interface WindCardProps {
  windspeed: number;
  windgust: number;
  winddir: number;
}

export default function WindCard(props: WindCardProps) {
  const windspeedRound = roundNumber(props.windspeed);
  const windgustRound = roundNumber(props.windgust);
  const winddirRound = roundNumber(props.winddir);
  const windArr = [
    { label: "Wind Speed", value: `${windspeedRound} m/s` },
    { label: "Gusts", value: `${windgustRound} m/s` },
    { label: "Direction", value: `${winddirRound}°` },
  ];
  return (
    <WeatherCard
      title="Wind"
      icon={<FiWind className="size-5 inline" data-testid="wind-icon" />}
    >
      <div>
        {windArr.map((item) => (
          <div key={item.label} className="flex justify-between text-sm">
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </WeatherCard>
  );
}
