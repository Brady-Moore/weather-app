import { getWeatherData } from "./visual-crossing/visual-crossing-api";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { visualCrossingSampleData } from "./test/sample-data";
import SampleDataLink from "./components/SampleDataLink";
import ErrorMessage from "./components/ErrorMessage";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { city, mode } = await searchParams;
  const weatherDataResponse =
    mode === "sample"
      ? { success: true, data: visualCrossingSampleData }
      : typeof city === "string" && city
        ? await getWeatherData(city)
        : undefined;
  return (
    <div>
      <SearchBar />
      {weatherDataResponse?.error ? (
        <ErrorMessage error={weatherDataResponse.error} />
      ) : null}
      {!weatherDataResponse?.data ? <SampleDataLink /> : null}
      <div className="weather-display-container">
        {weatherDataResponse?.data ? (
          <WeatherCard data={weatherDataResponse.data} />
        ) : null}
      </div>
    </div>
  );
}
