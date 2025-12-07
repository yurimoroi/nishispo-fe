import {
  countCharactersWithJapaneseConsidered,
  JP_ERROR_MESSAGE_ALT,
} from "@/components/feature/form";
import { replaceMaxAttribute } from "@/components/feature/form/lib/utils";
import { z } from "zod";

export const contributorFormSchema = z.object({
  authorName: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE_ALT.LOGIN_REQUIRED })
    .max(100, replaceMaxAttribute(JP_ERROR_MESSAGE_ALT.GENERIC_MAX_ERROR, 100)),
  rakutenID: z.string(),
  // As per Seima's request this is not required for Phase 1
  // .min(1, { message: JP_ERROR_MESSAGE_ALT.RAKUTEN_ID_REQUIRED })
  // .refine((val) => !(countCharactersWithJapaneseConsidered(val) > 255), {
  //   message: JP_ERROR_MESSAGE_ALT.GENERIC_MAX_ERROR.replace(
  //     ":attribute",
  //     String(255),
  //   ),
  // }),
});
