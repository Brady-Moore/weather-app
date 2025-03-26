import { getWeatherData } from "./visual-crossing/visual-crossing-api";
import SearchBar from "./components/SearchBar";
import { visualCrossingSampleData } from "./test/sample-data";
import SampleDataLink from "./components/SampleDataLink";
import ErrorMessage from "./components/ErrorMessage";
import FeelsLikeCard from "./components/FeelsLikeCard";
import HumidityCard from "./components/HumidityCard";
import VisibilityCard from "./components/VisibilityCard";
import UVIndexCard from "./components/UVIndexCard";
import PressureCard from "./components/PressureCard";
import PrecipitationCard from "./components/PrecipitationCard";

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
    <div className="p-5">
      <SearchBar />
      {weatherDataResponse?.error ? (
        <ErrorMessage error={weatherDataResponse.error} />
      ) : null}
      {!weatherDataResponse?.data ? <SampleDataLink /> : null}
      <div>
        {weatherDataResponse?.data ? (
          <div className="grid">
            <FeelsLikeCard
              temp={weatherDataResponse.data.days[0].temp}
              feelslike={weatherDataResponse.data.days[0].feelslike}
            />
            <HumidityCard
              dew={weatherDataResponse.data.days[0].temp}
              humidity={weatherDataResponse.data.days[0].humidity}
            />
            <VisibilityCard
              visibility={weatherDataResponse.data.days[0].visibility}
            />
            <UVIndexCard uvindex={weatherDataResponse.data.days[0].uvindex} />
            <PressureCard
              pressure={weatherDataResponse.data.days[0].pressure}
            />
            <PrecipitationCard
              precip={weatherDataResponse.data.days[0].precip}
              tomorrowPrecip={weatherDataResponse.data.days[1].precip}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
