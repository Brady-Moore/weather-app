import { getWeatherData } from "./visual-crossing/visual-crossing-api";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import { visualCrossingSampleData } from "./test/sample-data";
import SampleDataLink from "./components/SampleDataLink";
import ErrorMessage from "./components/ErrorMessage";
import { cityLoadIfNeeded } from "./geodata/geodata";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Preload city data for autocomplete
  await cityLoadIfNeeded();

  const { city, mode } = await searchParams;
  const weatherDataResponse =
    mode === "sample"
      ? { success: true, data: visualCrossingSampleData }
      : typeof city === "string" && city
        ? await getWeatherData(city)
        : undefined;
  return (
    <div>
      <SearchBar autoSuggestLimit={10} />
      {weatherDataResponse?.error ? (
        <ErrorMessage error={weatherDataResponse.error} />
      ) : null}
      {!weatherDataResponse?.data ? <SampleDataLink /> : null}
      {weatherDataResponse?.data ? (
        <WeatherDisplay data={weatherDataResponse.data} />
      ) : null}
    </div>
  );
}
