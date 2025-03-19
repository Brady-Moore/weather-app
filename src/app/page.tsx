28]Bady:
import { getWeatherData } from "./visual-crossing/visual-crossing-api";
import { SearchBar } from "./components/SearchBar";
import { WeatherDisplay } from "./components/WeatherDisplay";
import { useParams } from "next/navigation";

export default function Home() {
  const params = useParams<{ city: string }>();
  const weatherData = params.city ? getWeatherData(params.city) : undefined;
  return (
      <div>
        <SearchBar />
        {params.city ? <WeatherDisplay /> : null}
      </div>
    );
}