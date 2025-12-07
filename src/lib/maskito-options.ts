import { maskitoDateTimeOptionsGenerator } from "@maskito/kit";

export const dateFormat = maskitoDateTimeOptionsGenerator({
  dateMode: "yyyy/mm/dd",
  timeMode: "HH:MM",
  // dateTimeSeparator: "; ", //keeping for reference
  dateSeparator: "/",
});
