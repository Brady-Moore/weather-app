import { WeatherApiError } from "../visual-crossing/visual-crossing-api";

interface ErrorMessageProps {
  error: WeatherApiError;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <div>
      There was an error fetching the data from the Visual Crossing API. Error:{" "}
      {error.message}
      {error.httpStatus}
      {error.httpStatusText}
    </div>
  );
}
