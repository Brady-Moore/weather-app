import { getWeatherData } from "./visual-crossing/visual-crossing-api";
import SearchBar from "./components/SearchBar";
import { visualCrossingSampleData } from "./test/sample-data";
import SampleDataLink from "./components/SampleDataLink";
import ErrorMessage from "./components/ErrorMessage";
import { cityDataLoadIfNeeded } from "./geodata/geodata";
import FeelsLikeCard from "./components/FeelsLikeCard";
import HumidityCard from "./components/HumidityCard";
import VisibilityCard from "./components/VisibilityCard";
import UVIndexCard from "./components/UVIndexCard";
import PressureCard from "./components/PressureCard";
import PrecipitationCard from "./components/PrecipitationCard";
import SunsetCard from "./components/SunsetCard";
import WindCard from "./components/WindCard";

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
  // Preload city data for autocomplete
  await cityDataLoadIfNeeded();

  const { city, mode } = await searchParams;
  const weatherDataResponse =
    mode === "sample"
      ? { success: true, data: visualCrossingSampleData }
      : typeof city === "string" && city
        ? await getWeatherData(city)
        : undefined;

  return (
    <div className="p-5">
      <SearchBar
        autoSuggestLimit={10}
        autoSuggestSort="population"
        autoSuggestSortDesc
      />
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
            <SunsetCard
              sunset={weatherDataResponse.data.days[0].sunset}
              tomorrowSunrise={weatherDataResponse.data.days[1].sunrise}
            />
            <WindCard
              windspeed={weatherDataResponse.data.days[0].windspeed}
              windgust={weatherDataResponse.data.days[0].windgust}
              winddir={weatherDataResponse.data.days[0].winddir}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
