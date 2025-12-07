import {
  JP_ERROR_MESSAGE_ALT,
  maxLengthWithJapaneseConsidered,
} from "@/components/feature/form";
import { z } from "zod";

const COMMON_MAX_LENGTH = 255;

export const provisionalLoginFormSchema = z.object({
  yearOfBirth: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE_ALT.EMAIL_REQUIRED }),
  gender: z.string(),
  favoriteSport: maxLengthWithJapaneseConsidered(COMMON_MAX_LENGTH),
  favoriteGourmet: maxLengthWithJapaneseConsidered(COMMON_MAX_LENGTH),
});
