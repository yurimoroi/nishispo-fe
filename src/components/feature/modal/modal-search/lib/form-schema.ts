import { isBefore, isEqual, parse } from "date-fns";
import { z } from "zod";

export const searchFormSchema = z.object({
  searchTerm: z.string(),
  dateStart: z.string(),
  dateEnd: z.string(),
});
// Keeping this commented out for now - this just to check if End date is before start date
// .refine(
//   (data) => {
//     const startDate = parse(data.dateStart, "yyyy-MM-dd", new Date());
//     const endDate = parse(data.dateEnd, "yyyy-MM-dd", new Date());
//     return isBefore(startDate, endDate);
//   },
//   {
//     message: "Start date must be before end date",
//     path: ["dateEnd"],
//   },
// );
