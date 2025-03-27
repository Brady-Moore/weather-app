"use client";

import { useRouter } from "next/navigation";
import { KeyboardEventHandler, useEffect, useRef, useState } from "react";
import { citySearch } from "../geodata/geodata";
import { CityDataRow } from "../geodata/geodata-types";

type AutoSuggestSort = "name" | "asciiname" | "population";

function getCitySortCompare({
  sort,
  desc,
}: {
  sort?: AutoSuggestSort;
  desc?: boolean;
}): (a: CityDataRow, b: CityDataRow) => number {
  switch (sort) {
    case "asciiname":
      return (a, b) => a.asciiname.localeCompare(b.asciiname) * (desc ? -1 : 1);
    case "population":
      return (a, b) =>
        Number(BigInt(a.population) - BigInt(b.population)) * (desc ? -1 : 1);
    default: // name
      return (a, b) => a.name.localeCompare(b.name) * (desc ? -1 : 1);
  }
}

function createAutoSuggestQueryFromCityDataRow(cityData: CityDataRow) {
  return `${cityData.name}, ${cityData["country code"]}`;
}

export interface SearchBarProps {
  /**
   * replace the `className` on main div
   */
  className?: string;
  /**
   * replace the `className` on autoSuggest div
   */
  autoSuggestClassName?: string;
  /**
   * replace the `className` on autoSuggest selected div
   */
  autoSuggestSelectedClassName?: string;
  autoSuggestLimit?: number;
  autoSuggestSort?: AutoSuggestSort;
  /**
   * use descending sort order
   */
  autoSuggestSortDesc?: boolean;
}

export default function SearchBar(props: SearchBarProps) {
  const router = useRouter();
  const searchDivRef = useRef<HTMLDivElement>(null);
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const [autoSuggestions, setAutoSuggestions] = useState<CityDataRow[]>([]);
  const [autoSuggestionSelected, setAutoSuggestionSelected] = useState(-1);
  const [searchHasFocus, setSearchHasFocus] = useState(false);

  const updateAutoSuggestions = async (query: string) => {
    setAutoSuggestions(
      (await citySearch(query))
        .sort(
          getCitySortCompare({
            sort: props.autoSuggestSort,
            desc: props.autoSuggestSortDesc,
          })
        )
        .slice(0, props.autoSuggestLimit)
    );
    setAutoSuggestionSelected(-1);
  };

  const handleSearchKeyDown = ((event) => {
    switch (event.key) {
      case "ArrowDown":
        setAutoSuggestionSelected(
          Math.min(autoSuggestionSelected + 1, autoSuggestions.length - 1)
        );
        event.preventDefault();
        break;
      case "ArrowUp":
        setAutoSuggestionSelected(Math.max(autoSuggestionSelected - 1, 0));
        event.preventDefault();
        break;
      default:
        break;
    }
  }) as KeyboardEventHandler<HTMLInputElement>;

  useEffect(() => {
    if (
      searchBoxRef.current &&
      autoSuggestionSelected >= 0 &&
      autoSuggestionSelected < autoSuggestions.length
    ) {
      searchBoxRef.current.value = createAutoSuggestQueryFromCityDataRow(
        autoSuggestions[autoSuggestionSelected]
      );
    }
  }, [autoSuggestionSelected]);

  return (
    <div className={props.className}>
      <div
        ref={searchDivRef}
        tabIndex={-1}
        onFocus={() => setSearchHasFocus(true)}
        onBlur={(event) =>
          !event.relatedTarget?.contains(event.target) &&
          setSearchHasFocus(false)
        }
      >
        <input
          type="search"
          ref={searchBoxRef}
          className="outline-2 outline-red-400"
          onChange={(event) => updateAutoSuggestions(event.target.value)}
          onKeyDown={handleSearchKeyDown}
        />
        {autoSuggestions.length > 0 && searchHasFocus ? (
          <div className="absolute">
            <div className={props.autoSuggestClassName ?? "border-1 bg-white"}>
              {autoSuggestions.map((cityData, index) => (
                <div
                  className={
                    index == autoSuggestionSelected
                      ? (props.autoSuggestSelectedClassName ??
                        "bg-blue-950 text-white")
                      : ""
                  }
                  key={cityData.name}
                  onClick={() => setAutoSuggestionSelected(index)}
                >
                  {createAutoSuggestQueryFromCityDataRow(cityData)}
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <button
          type="button"
          onClick={() =>
            router.push(
              `/?city=${encodeURIComponent(searchBoxRef.current?.value || "")}`
            )
          }
        >
          Search
        </button>
      </div>
    </div>
  );
}
