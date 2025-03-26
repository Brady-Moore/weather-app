import { render, screen } from "@testing-library/react";
import SunsetCard from "./SunsetCard";

describe("SunsetCard", () => {
  test("displays sunset time for the day", () => {
    render(<SunsetCard sunset={"19:47:39"} tomorrowSunrise={"07:42:57"} />);
    expect(screen.getByText("19:47")).toBeInTheDocument();
  });

  test("displays sunrise time for tomorrow", () => {
    render(<SunsetCard sunset={"19:47:39"} tomorrowSunrise={"07:42:57"} />);
    expect(screen.getByText("Sunrise Tomorrow: 7:42")).toBeInTheDocument();
  });

  test("renders Sunset icon", () => {
    render(<SunsetCard sunset={63.7} tomorrowSunrise={18.4} />);
    expect(screen.getByTestId("sunset-icon")).toBeInTheDocument();
  });
});
