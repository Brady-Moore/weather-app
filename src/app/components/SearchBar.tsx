"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchBoxRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input type="search" ref={searchBoxRef} />
      <button
        type="button"
        onClick={() => router.push(`/?city=${searchBoxRef.current?.value}`)}
      >
        Search
      </button>
    </div>
  );
}
