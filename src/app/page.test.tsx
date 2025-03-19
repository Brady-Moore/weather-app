import { render, screen } from "@testing-library/react";
import Home from "./page";
import { visualCrossingSampleData } from "./test/sample-data";

jest.mock("next/navigation", () => require("next-router-mock"));

describe("Home Page", () => {
  test("renders SearchBar component", async () => {
    render(
      await Home({
        searchParams: Promise.resolve({
          city: "",
          mode: "",
        }),
      })
    );
    screen.getByRole("searchbox");
  });

  test("renders Weather display components when data is found", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        statusText: "OK",
        json: () => Promise.resolve(visualCrossingSampleData),
      })
    ) as jest.Mock;
    render(
      await Home({
        searchParams: Promise.resolve({
          city: "cityname",
          mode: "",
        }),
      })
    );
    screen.getByText(visualCrossingSampleData.days[0].temp);
  });

  test("renders Error message and link to Sample Data when getWeatherData fails", async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error("fetch failed"))
    ) as jest.Mock;
    render(
      await Home({
        searchParams: Promise.resolve({
          city: "chicago",
          mode: "",
        }),
      })
    );
    screen.getByText("There was an error", { exact: false });
  });
});
