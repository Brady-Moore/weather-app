const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function dayFromDate(datetime: string) {
  return days[new Date(datetime).getDay()];
}
