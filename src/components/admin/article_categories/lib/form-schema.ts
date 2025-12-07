import {
  JP_ERROR_MESSAGE,
  JP_ERROR_MESSAGE_ALT,
} from "@/components/feature/form/lib/error-messages-map";

import { z } from "zod";

// Regex to match valid hex color (both 3 and 6 characters, with or without "#")
const hexColorRegex = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/;

export const formArticleCategoriesSchema = z.object({
  name: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE_ALT.ARTICLE_CATEGORY_NAME_REQUIRED }),
  shortName: z.string().max(100, {
    message: JP_ERROR_MESSAGE_ALT.ARTICLE_CATEGORY_SHORT_NAME_MAX,
  }),
  color: z
    .string()
    .min(1, { message: JP_ERROR_MESSAGE_ALT.ARTICLE_CATEGORY_COLOR_REQUIRED })
    .regex(hexColorRegex, {
      message: JP_ERROR_MESSAGE_ALT.ARTICLE_CATEGORY_COLOR_REGEX,
    }),
  showHeadFlg: z.number(),
  order: z.string(),
});
