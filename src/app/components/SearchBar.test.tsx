import { render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";
import mockRouter from "next-router-mock";

jest.mock("next/navigation", () => require("next-router-mock"));

describe("Search Bar", () => {
  test("navigates to the correct URL when Search button is clicked", async () => {
    render(<SearchBar />);
    const searchBox = screen.getByRole("searchbox") as HTMLInputElement;
    const searchButton = screen.getByRole("button");
    searchBox.setRangeText("cityname");
    searchButton.click();
    expect(mockRouter).toMatchObject({
      asPath: "/?city=cityname",
      pathname: "/",
      query: { city: "cityname" },
    });
  });
  test("renders button and textbox", () => {
    render(<SearchBar />);
    screen.getByRole("searchbox");
    screen.getByRole("button");
  });
});
