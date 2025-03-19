import { getWeatherData } from "./visual-crossing/visual-crossing-api";
import { SearchBar } from "./components/SearchBar";
import { WeatherDisplay } from "./components/WeatherDisplay";

export default function Home() {
  return (
    <div>
      <SearchBar />
      <WeatherDisplay />
    </div>
  );
}
