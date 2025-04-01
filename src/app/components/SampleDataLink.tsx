import Link from "next/link";

export default function SampleDataLink() {
  return (
    <div>
      <Link className="text-neutral-50" href="/?mode=sample">
        Generate with sample weather data
      </Link>
    </div>
  );
}
