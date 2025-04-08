"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import CardBorder from "./CardBorder";

export default function SampleDataLink() {
  const router = useRouter();

  return (
    <div className="mr-auto">
      <div className="flex flex-col gap-3">
        <div className="">
          Look up a city in the search bar above or use the link below to use
          some sample weather data!
        </div>

      </div>

      <div>
        <button
          className="bg-yellow-600 mt-10 rounded-xl border-0 p-0 cursor-pointer outline-offset-4 group"
          onClick={() => router.push("/?mode=sample")}
        >
          <span className="block py-2 px-6 rounded-xl text-lg bg-neutral-800 transform translate-y-[-3px] group-active:translate-y-[-1px]">
            Generate with sample weather data
          </span>
        </button>
      </div>
    </div>
  );
}
