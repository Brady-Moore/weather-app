"use client";

import { useRouter } from "next/navigation";
import { ChangeEventHandler, useRef, useState } from "react";
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

export interface SearchBarProps {
  /**
   * replace the `className` on main div
   */
  className?: string;
  /**
   * replace the `className` on autoSuggest div
   */
  autoSuggestClassName?: string;
  autoSuggestLimit?: number;
  autoSuggestSort?: AutoSuggestSort;
  /**
   * use descending sort order
   */
  autoSuggestSortDesc?: boolean;
}

export default function SearchBar(props: SearchBarProps) {
  const router = useRouter();
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const [autoSuggestions, setAutoSuggestions] = useState<CityDataRow[]>([]);

  const handleInputChange = (async (event) => {
    setAutoSuggestions(
      (await citySearch(event.target.value))
        .sort(
          getCitySortCompare({
            sort: props.autoSuggestSort,
            desc: props.autoSuggestSortDesc,
          })
        )
        .slice(0, props.autoSuggestLimit)
    );
  }) as ChangeEventHandler<HTMLInputElement>;

  return (
    <div className={props.className}>
      <div>
        <input type="search" ref={searchBoxRef} onChange={handleInputChange} />
        <button
          type="button"
          onClick={() => router.push(`/?city=${searchBoxRef.current?.value}`)}
        >
          Search
        </button>
      </div>
      {autoSuggestions.length > 0 ? (
        <div className="absolute">
          <div className={props.autoSuggestClassName || "border-1 bg-white"}>
            {autoSuggestions.map((cityData) => (
              <div
                key={cityData.name}
              >{`${cityData.name}, ${cityData["country code"]}`}</div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
