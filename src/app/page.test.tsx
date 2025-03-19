import { render, screen } from "@testing-library/react";
import Home from "./page";
import { visualCrossingSampleData } from "./test/sample-data";
import Navigation from "next/navigation";

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useParams: jest.fn(),
}));

describe("Home Page", () => {
  test("renders SearchBar component", () => {
    render(Home());
    screen.getByRole("searchbox");
    screen.getByRole("button");
  });

  test("renders Weather display components when data is found", () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        statusText: "OK",
        json: () => Promise.resolve(visualCrossingSampleData),
      })
    ) as jest.Mock;
    jest.spyOn(Navigation, "useParams").mockReturnValue({ city: "cityname" });
    render(Home());
    screen.getByText(visualCrossingSampleData.days[0].temp);
  });
  test("renders Error message and link to Sample Data when getWeatherData fails", () => {
    render(Home());
    screen.getByText(
      "There was an error fetching the data from the Visual Crossing API. The query limit may have been reached."
    );
  });
});
