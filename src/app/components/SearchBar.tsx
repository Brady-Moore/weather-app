"use client";

import { useRouter } from "next/navigation";
import { ChangeEventHandler, useRef, useState } from "react";
import { citySearch } from "../geodata/geodata";
import { CityDataRow } from "../geodata/geodata-types";

export interface SearchBarProps {
  autoSuggestLimit?: number;
  /**
   * replace the `className` on main div
   */
  className?: string;
  /**
   * replace the `className` on autoComplete div
   */
  classNameAutoComplete?: string;
}

export default function SearchBar(props: SearchBarProps) {
  const router = useRouter();
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const [autoSuggestions, setAutoSuggestions] = useState<CityDataRow[]>([]);

  const handleInputChange = (async (event) => {
    setAutoSuggestions(
      (await citySearch(event.target.value))
        .sort((a, b) => Number(BigInt(b.population) - BigInt(a.population)))
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
          <div className={props.classNameAutoComplete || "border-1 bg-white"}>
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
