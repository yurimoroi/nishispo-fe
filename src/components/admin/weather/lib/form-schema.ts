import { JP_ERROR_MESSAGE_ALT } from "@/components/feature/form";
import { z } from "zod";

export const weatherFormSchema = z.object({
  prefectureCode: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE_ALT.WEATHER_AREA_CODE_REQUIRED }),
  areaCode: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE_ALT.WEATHER_AREA_CODE_REQUIRED }),
});
