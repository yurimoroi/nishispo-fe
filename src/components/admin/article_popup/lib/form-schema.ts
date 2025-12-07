import {
  JP_ERROR_MESSAGE,
  JP_ERROR_MESSAGE_ALT,
} from "@/components/feature/form/lib/error-messages-map";

import { z } from "zod";

export const formPopupArticleListSchema = z
  .object({
    status: z.string().optional(),
    freeWord: z.string().optional(),
    categoryItems: z.array(z.string()).optional(),
    publishedAt: z.string().optional(),
    publishEndedAt: z.string().optional(),
  })
  .refine(
    (data) => {
      const publishedAtDate = new Date(data.publishedAt as string);
      const publishEndedAtDate = data.publishEndedAt
        ? new Date(data.publishEndedAt as string)
        : null;
      return publishEndedAtDate ? publishedAtDate < publishEndedAtDate : true;
    },
    {
      message: JP_ERROR_MESSAGE_ALT.ARTICLE_PUBLISH_END_AFTER,
      path: ["publishedAt"], // This is the field that will display the error message
    },
  );
