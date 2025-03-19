import {
  getWeatherData,
  WeatherDataResponse,
} from "./visual-crossing/visual-crossing-api";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import { useParams } from "next/navigation";
import { visualCrossingSampleData } from "./test/sample-data";
import SampleDataLink from "./components/SampleDataLink";
import ErrorMessage from "./components/ErrorMessage";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

/* export const getServerSideProps = (async (context: any) => {
  //TODO: get city from query
  const city = context.query.city;

  const weatherDataResponse = await getWeatherData(city);

  return { props: { weatherDataResponse } };
}) satisfies GetServerSideProps<{
  weatherDataResponse: WeatherDataResponse;
}>; */

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { city, mode } = await searchParams;
  const weatherDataResponse =
    mode === "sample"
      ? { success: true, data: visualCrossingSampleData }
      : typeof city === "string"
        ? await getWeatherData(city)
        : undefined;
  return (
    <div>
      <SearchBar />
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
