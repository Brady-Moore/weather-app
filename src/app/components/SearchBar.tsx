"use client";

import { useRouter } from "next/navigation";
import { KeyboardEventHandler, useEffect, useRef, useState } from "react";
import { citySearch } from "../geodata/geodata";
import { CityDataRow } from "../geodata/geodata-types";
import { HiSearch } from "rocketicons/hi";
import { joinClassNames } from "../util/format";

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
  const autoSuggestVisible = autoSuggestions.length > 0 && searchHasFocus;

  const classNameBorderColor = searchHasFocus
    ? "border-yellow-600"
    : "border-neutral-600";
  const classNameSeperatorColor = "border-neutral-600";

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

  const runQuery = (query: string | undefined) => {
    searchDivRef.current?.focus();
    searchDivRef.current?.blur();
    updateAutoSuggestions(query || "");
    router.push(`/?city=${encodeURIComponent(query || "")}`);
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
      case "Enter":
        runQuery(searchBoxRef.current?.value);
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
    <div className={joinClassNames("", props.className)}>
      <div
        ref={searchDivRef}
        tabIndex={-1}
        onFocus={() => setSearchHasFocus(true)}
        onBlur={(event) =>
          !event.relatedTarget?.contains(event.target) &&
          setSearchHasFocus(false)
        }
        className="relative"
      >
        <div
          className={joinClassNames(
            "flex p-3 gap-3",
            classNameBorderColor,
            "border-2",
            autoSuggestVisible ? "rounded-t-xl border-b-0" : "rounded-xl"
          )}
        >
          <input
            type="search"
            ref={searchBoxRef}
            className="grow outline-none py-1"
            onChange={(event) => updateAutoSuggestions(event.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
          <div
            data-testid="search-button"
            className="inline-block outline-0"
            onClick={() => runQuery(searchBoxRef.current?.value)}
          >
            <HiSearch className="size-8" />
          </div>
        </div>

        {autoSuggestVisible ? (
          <div className="absolute w-full">
            <div
              className={joinClassNames(
                classNameBorderColor,
                "border-2 bg-black border-t-0 rounded-b-xl"
              )}
            >
              <div
                className={joinClassNames(
                  classNameSeperatorColor,
                  "border-t-2 mx-3"
                )}
              ></div>
              <div className="flex flex-col px-3 py-3 gap-2">
                {autoSuggestions.map((cityData, index) => (
                  <div
                    className={joinClassNames(
                      index == autoSuggestionSelected ? "bg-neutral-700" : ""
                    )}
                    key={cityData.name}
                    onClick={() => {
                      setAutoSuggestionSelected(index);
                      runQuery(
                        createAutoSuggestQueryFromCityDataRow(
                          autoSuggestions[index]
                        )
                      );
                    }}
                  >
                    {createAutoSuggestQueryFromCityDataRow(cityData)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
