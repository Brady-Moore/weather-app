import { render, screen } from "@testing-library/react";
import Home from "./page";
describe("Home Page", () => {
  test("renders SearchBar component", () => {
    render(Home());
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  test("renders Weather display components", () => {
    throw "placeholder";
  });
  test("doesn't render Weather display components if there's no search URL parameter", () => {
    throw "placeholder";
  });
  test("renders Error message and link to Sample Data when getWeatherData fails", () => {
    throw "placeholder";
  });
});
