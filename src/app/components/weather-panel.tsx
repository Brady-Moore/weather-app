export default async function WeatherPanel() {
  const key = process.env.VISUAL_CROSSING_API_KEY || "NO_KEY";
  let data;
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/tallahassee?unitGroup=us&key=${key}&contentType=json`
    );
    if (!response.ok) {
      console.log("if block");
      return <div>{await response.text()}</div>;
    }
    data = await response.json();
  } catch (error: any) {
    console.log("catch block");
    console.log(error.message + error.name);
    return (
      <div>
        There was an error processing the weather data from Visual Crossing.
      </div>
    );
  }
  return <div>{data.days[0].temp}</div>;
}
