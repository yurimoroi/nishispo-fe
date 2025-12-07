import { fromUnixTime, format } from "date-fns";

export const formatUnixTimestamp = (timestamp: number) => {
  const date = fromUnixTime(timestamp);
  return format(date, "yyyy.MM.dd EE");
};
