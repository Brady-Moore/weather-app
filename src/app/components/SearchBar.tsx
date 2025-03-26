"use client";

import { useRouter } from "next/navigation";
import { ChangeEventHandler, useRef, useState } from "react";
import { citySearch } from "../geodata/geodata";

export default function SearchBar() {
  const router = useRouter();
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const [autoSuggestions, setAutoSuggestions] = useState<string[]>([]);

  const handleInputChange = (async (event) => {
    setAutoSuggestions(
      (await citySearch(event.target.value)).map((cityRow) => cityRow.name)
    );
  }) as ChangeEventHandler<HTMLInputElement>;

  return (
    <div>
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
        <div className="border-1 inline-block">
          {autoSuggestions.map((sug) => (
            <div key={sug}>{sug}</div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
