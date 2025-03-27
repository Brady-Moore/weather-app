import { render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";
import mockRouter from "next-router-mock";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => require("next-router-mock"));

describe("Search Bar", () => {
  test("navigates to the correct encoded URL when Search button is clicked", async () => {
    render(<SearchBar />);
    const searchBox = screen.getByRole("searchbox") as HTMLInputElement;
    const searchButton = screen.getByTestId("search-button");
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
    const searchButton = screen.getByTestId("search-button");
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
    screen.getByTestId("search-button");
  });

  test("renders autosuggest when query length >= 2 is entered", async () => {
    const { queryByText, getByRole } = render(<SearchBar />);
    const searchBox = getByRole("searchbox") as HTMLInputElement;
    expect(queryByText("Seattle, US")).toBeFalsy();
    await userEvent.type(searchBox, "S");
    expect(queryByText("Seattle, US")).toBeFalsy();
    await userEvent.type(searchBox, "e");
    expect(queryByText("Seattle, US")).toBeTruthy();
    await userEvent.type(searchBox, "a");
    expect(queryByText("Seattle, US")).toBeTruthy();
  });

  test("renders autosuggest with limited count", async () => {
    const { queryByText, getByRole } = render(
      <SearchBar
        autoSuggestLimit={1}
        autoSuggestSort="population"
        autoSuggestSortDesc
      />
    );
    const searchBox = getByRole("searchbox") as HTMLInputElement;
    await userEvent.type(searchBox, "Sea");
    expect(queryByText("Seattle, US")).toBeTruthy();
    expect(queryByText("Southend-on-Sea, GB")).toBeFalsy();
  });

  test("renders autosuggest with ascending name order by default", async () => {
    const { queryByText, getByRole } = render(
      <SearchBar autoSuggestLimit={1} />
    );
    const searchBox = getByRole("searchbox") as HTMLInputElement;
    await userEvent.type(searchBox, "Sea");
    expect(queryByText("Bexhill-on-Sea, GB")).toBeTruthy();
    expect(queryByText("Seattle, US")).toBeFalsy();
  });

  test("renders autosuggest with ascending name order", async () => {
    const { queryByText, getByRole } = render(
      <SearchBar autoSuggestLimit={1} autoSuggestSort="name" />
    );
    const searchBox = getByRole("searchbox") as HTMLInputElement;
    await userEvent.type(searchBox, "Sea");
    expect(queryByText("Bexhill-on-Sea, GB")).toBeTruthy();
    expect(queryByText("Seattle, US")).toBeFalsy();
  });

  test("renders autosuggest with ascending asciiname order", async () => {
    const { queryByText, getByRole } = render(
      <SearchBar autoSuggestLimit={1} autoSuggestSort="asciiname" />
    );
    const searchBox = getByRole("searchbox") as HTMLInputElement;
    await userEvent.type(searchBox, "Sea");
    expect(queryByText("Bexhill-on-Sea, GB")).toBeTruthy();
    expect(queryByText("Seattle, US")).toBeFalsy();
  });

  test("renders autosuggest with ascending population order", async () => {
    const { queryByText, getByRole } = render(
      <SearchBar autoSuggestLimit={1} autoSuggestSort="population" />
    );
    const searchBox = getByRole("searchbox") as HTMLInputElement;
    await userEvent.type(searchBox, "Sea");
    expect(queryByText("Seagoville, US")).toBeTruthy();
    expect(queryByText("Seattle, US")).toBeFalsy();
  });

  test("renders autosuggest with descending population order", async () => {
    const { queryByText, getByRole } = render(
      <SearchBar
        autoSuggestLimit={1}
        autoSuggestSort="population"
        autoSuggestSortDesc
      />
    );
    const searchBox = getByRole("searchbox") as HTMLInputElement;
    await userEvent.type(searchBox, "Sea");
    expect(queryByText("Seattle, US")).toBeTruthy();
    expect(queryByText("Seagoville, US")).toBeFalsy();
  });

  test("renders autosuggest with descending name order", async () => {
    const { queryByText, getByRole } = render(
      <SearchBar
        autoSuggestLimit={1}
        autoSuggestSort="name"
        autoSuggestSortDesc
      />
    );
    const searchBox = getByRole("searchbox") as HTMLInputElement;
    await userEvent.type(searchBox, "Sea");
    expect(queryByText("Southend-on-Sea, GB")).toBeTruthy();
    expect(queryByText("Seattle, US")).toBeFalsy();
  });

  test("renders autosuggest with descending asciiname order", async () => {
    const { queryByText, getByRole } = render(
      <SearchBar
        autoSuggestLimit={1}
        autoSuggestSort="asciiname"
        autoSuggestSortDesc
      />
    );
    const searchBox = getByRole("searchbox") as HTMLInputElement;
    await userEvent.type(searchBox, "Sea");
    expect(queryByText("Southend-on-Sea, GB")).toBeTruthy();
    expect(queryByText("Seattle, US")).toBeFalsy();
  });
});
