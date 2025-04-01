import { getByTestId, render, screen } from "@testing-library/react";
import CurrentConditionsCard from "./CurrentConditionsCard";

describe("CurrentConditionsCard", () => {
  test("displays current conditions weather data properly", () => {
    render(
      <CurrentConditionsCard
        date={"2025-03-23"}
        time={"12:39:23"}
        currentTemp={10.4}
        feelslike={8}
        conditions={"Rainy"}
        icon={"rain"}
        resolvedAddress={"Tallahassee, FL, United States"}
        tempmax={11}
        tempmin={10}
      />
    );
    expect(screen.getByText("As of 12:39, Sunday")).toBeInTheDocument();
    expect(
      screen.getByText("Tallahassee, FL, United States")
    ).toBeInTheDocument();
    expect(screen.getByText("10°")).toBeInTheDocument();
    expect(screen.getByText("Rainy")).toBeInTheDocument();
    expect(screen.getByText("H: 11° L: 10°")).toBeInTheDocument();
  });
});
