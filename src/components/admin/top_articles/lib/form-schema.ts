import { z } from "zod";

// Define your error messages (can customize these based on your needs)
import {
  JP_ERROR_MESSAGE,
  JP_ERROR_MESSAGE_ALT,
} from "@/components/feature/form/lib/error-messages-map";

export const formAdminTopArticlesSchema = z
  .object({
    title: z.string(),
    articleContributor: z.string(),
    order: z.string(),
    displayPeriod: z.string(),
    publishedAt: z.date({
      required_error: JP_ERROR_MESSAGE_ALT.GENERIC_START_DATE_REQUIRED,
    }),
    publishEndedAt: z.date().optional(),
  })
  .refine(
    (data) => {
      if (data.publishEndedAt) {
        const publishedAtDate = new Date(data.publishedAt);
        const publishEndedAtDate = new Date(data.publishEndedAt);
        return publishedAtDate < publishEndedAtDate; // Validate only if publishEndedAt is provided
      }
      return true; // If no publishEndedAt, skip the check
    },
    {
      message: JP_ERROR_MESSAGE_ALT.ARTICLE_PUBLISH_END_AFTER,
      path: ["publishedAt"], // This is the field that will display the error message
    },
  );
