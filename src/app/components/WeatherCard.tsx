import { WeatherData } from "../visual-crossing/visual-crossing-api";

interface WeatherCardProps {
  data: WeatherData;
}
export default function WeatherCard(props: WeatherCardProps) {
  return <div>{props.data.days[0].temp}</div>;
}
