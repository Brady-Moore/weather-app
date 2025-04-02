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
import CurrentConditionsCard from "./components/CurrentConditionsCard";
import { isWeatherIconKey } from "./util/weatherconditionicons";
import TenDayForecastCard from "./components/TenDayForecastCard";
import HourlyForecastCard from "./components/HourlyForecastCard";
import { BsGithub } from "rocketicons/bs";
import Link from "next/link";

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
    <div className="flex flex-col gap-8 m-5 mb-7 ">
      <SearchBar
        autoSuggestLimit={10}
        autoSuggestSort="population"
        autoSuggestSortDesc
        className="max-w-xl"
      />
      {weatherDataResponse?.error ? (
        <ErrorMessage error={weatherDataResponse.error} />
      ) : null}
      {!weatherDataResponse?.data ? <SampleDataLink /> : null}
      <div>
        {weatherDataResponse?.data ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <CurrentConditionsCard
              className="col-span-2"
              date={weatherDataResponse.data.days[0].datetime}
              time={weatherDataResponse.data.currentConditions.datetime}
              currentTemp={weatherDataResponse.data.currentConditions.temp}
              feelslike={weatherDataResponse.data.days[0].windspeed}
              conditions={weatherDataResponse.data.currentConditions.conditions}
              icon={
                isWeatherIconKey(
                  weatherDataResponse.data.currentConditions.icon
                )
                  ? weatherDataResponse.data.currentConditions.icon
                  : "snow"
              }
              resolvedAddress={weatherDataResponse.data.resolvedAddress}
              tempmax={weatherDataResponse.data.days[0].tempmax}
              tempmin={weatherDataResponse.data.days[0].tempmin}
            />
            <HourlyForecastCard
              className="col-span-2 sm:order-3 sm:col-span-4"
              hours={weatherDataResponse.data.days[0].hours}
            />
            <TenDayForecastCard
              className="col-span-2 sm:row-span-3"
              days={weatherDataResponse.data.days}
            />
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
      <div>
        <BsGithub className="size-4 inline mr-2" />
        <Link
          className="underline"
          href="https://github.com/Brady-Moore/weather-app"
        >
          Repository
        </Link>
      </div>
    </div>
  );
}
