const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const dayFromDate = (datetime: string) => {
  return days[new Date(datetime).getDay()];
};
