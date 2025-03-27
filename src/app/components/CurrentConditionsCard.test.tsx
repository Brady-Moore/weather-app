import { getByTestId, render, screen } from "@testing-library/react";
import CurrentConditionsCard from "./CurrentConditionsCard";

describe("CurrentConditionsCard", () => {
  test("displays current conditions weather data properly", () => {
    render(<CurrentConditionsCard />);
    expect(screen.getByText("Sunday")).toBeInTheDocument();
    expect(screen.getByText("12:39")).toBeInTheDocument();
    expect(screen.getByText("Tallahassee")).toBeInTheDocument();
    expect(screen.getByText("10°")).toBeInTheDocument();
    expect(screen.getByText("Rain")).toBeInTheDocument();
    expect(screen.getByText("H: 11°")).toBeInTheDocument();
    expect(screen.getByText("L: 10°")).toBeInTheDocument();
  });

  test("displays snow weather icon when its snowy conditions", () => {
    render(<CurrentConditionsCard />);
    expect(screen.getByTestId("snow")).toBeInTheDocument();
  });
  test("displays rain weather icon when its rainy conditions", () => {
    render(<CurrentConditionsCard />);
    expect(screen.getByTestId("rain")).toBeInTheDocument();
  });
  test("displays fog weather icon when its foggy conditions", () => {
    render(<CurrentConditionsCard />);
    expect(screen.getByTestId("fog")).toBeInTheDocument();
  });
  test("displays wind weather icon when its windy conditions", () => {
    render(<CurrentConditionsCard />);
    expect(screen.getByTestId("wind")).toBeInTheDocument();
  });
  test("displays cloud weather icon when its cloudy conditions", () => {
    render(<CurrentConditionsCard />);
    expect(screen.getByTestId("cloud")).toBeInTheDocument();
  });
  test("displays partly-cloudy-day weather icon when its partly-cloudy-day conditions", () => {
    render(<CurrentConditionsCard />);
    expect(screen.getByTestId("partly-cloudy-day")).toBeInTheDocument();
  });
  test("displays partly-cloudy-night weather icon when its partly-cloudy-night conditions", () => {
    render(<CurrentConditionsCard />);
    expect(screen.getByTestId("partly-cloudy-night")).toBeInTheDocument();
  });
  test("displays clear-day weather icon when its clear-day conditions", () => {
    render(<CurrentConditionsCard />);
    expect(screen.getByTestId("clear-day")).toBeInTheDocument();
  });
  test("displays clear-night weather icon when its clear-night conditions", () => {
    render(<CurrentConditionsCard />);
    expect(screen.getByTestId("clear-night")).toBeInTheDocument();
  });
});
