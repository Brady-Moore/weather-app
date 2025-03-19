import { WeatherData } from "../visual-crossing/visual-crossing-api";

interface WeatherDisplayProps {
  data: WeatherData;
}
export default function WeatherDisplay(props: WeatherDisplayProps) {
  return <div>{props.data.days[0].temp}</div>;
}
