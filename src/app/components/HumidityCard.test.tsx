import { render, screen } from "@testing-library/react";
import HumidityCard from "./HumidityCard";

describe("HumidityCard", () => {
  test("renders rounded humidity and dew point", () => {
    render(<HumidityCard humidity={63.7} dew={18.4} />);
    expect(screen.getByText("64%")).toBeInTheDocument();
    expect(screen.getByText("The dew point is 18°")).toBeInTheDocument();
  });

  test("renders WiHumidity icon", () => {
    render(<HumidityCard humidity={70} dew={15} />);
    expect(screen.getByTestId("humidity-icon")).toBeInTheDocument();
  });

  test("displays exact values after rounding", () => {
    render(<HumidityCard humidity={59.5} dew={12.9} />);

    expect(screen.getByText("60%")).toBeInTheDocument();
    expect(screen.getByText("The dew point is 13°")).toBeInTheDocument();
  });
});
