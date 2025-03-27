import { render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";
import mockRouter from "next-router-mock";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => require("next-router-mock"));

describe("Search Bar", () => {
  test("navigates to the correct encoded URL when Search button is clicked", async () => {
    render(<SearchBar />);
    const searchBox = screen.getByRole("searchbox") as HTMLInputElement;
    const searchButton = screen.getByRole("button");
    await userEvent.type(searchBox, "New York!@#$%^&*()_+");
    await userEvent.click(searchButton);
    expect(mockRouter).toMatchObject({
      asPath: "/?city=New+York%21%40%23%24%25%5E%26*%28%29_%2B",
      pathname: "/",
      query: { city: "New York!@#$%^&*()_+" },
    });
  }, 10000);

  test("navigates to the correct URL when search bar is empty and button is clicked", async () => {
    render(<SearchBar />);
    const searchBox = screen.getByRole("searchbox") as HTMLInputElement;
    const searchButton = screen.getByRole("button");
    await userEvent.click(searchButton);
    expect(mockRouter).toMatchObject({
      asPath: "/?city=",
      pathname: "/",
      query: { city: "" },
    });
  });

  test("renders button and textbox", () => {
    render(<SearchBar />);
    screen.getByRole("searchbox");
    screen.getByRole("button");
  });
});
