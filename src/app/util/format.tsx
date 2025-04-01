export const formatTime = (time: string) => {
  const slice = time[0] === "0" ? time.slice(1, -3) : time.slice(0, -3); // Removes leading 0's and seconds from time string
  return slice;
};

export const joinClassNames = (...classNames: (string | undefined)[]) =>
  classNames.map((x) => x ?? "").join(" ");
