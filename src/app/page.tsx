import { getWeatherData } from "./visual-crossing/visual-crossing-api";
import SearchBar from "./components/SearchBar";
import { visualCrossingSampleData } from "./test/sample-data";
import SampleDataLink from "./components/SampleDataLink";
import ErrorMessage from "./components/ErrorMessage";
import FeelsLikeCard from "./components/FeelsLikeCard";

const feelsLikeDescription = (temp: number, feelslike: number) => {
  return temp > feelslike
    ? "Feels cooler than the actual temperature"
    : temp < feelslike
      ? "Feels warmer than the actal temperature"
      : "Feels about the same as the actual temperature";
};

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
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
          <div>
            <FeelsLikeCard
              temp={weatherDataResponse.data.days[0].temp}
              feelslike={weatherDataResponse.data.days[0].feelslike}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
