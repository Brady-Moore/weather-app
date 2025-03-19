import Link from "next/link";

export default function SampleDataLink() {
  return (
    <div>
      <Link href="/?mode=sample">Generate with sample weather data</Link>
    </div>
  );
}
